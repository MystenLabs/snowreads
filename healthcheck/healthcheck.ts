import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { IAllPapers, IPaperTrimmed } from '../app/src/interfaces/IAllPapers';

const execAsync = promisify(exec);

type BlobIdResponse = {
    blobId: string,
    file: string,
    unencodedLength: number;
};
type PermanentBlobStatusResponse = {
    blobId: string;
    status: {
        permanent: {
            endEpoch: number;
            isCertified: boolean;
            statusEvent: {
                txDigest: string;
                eventSeq: number;
            };
            deletableCounts: {
                count_deletable_total: number;
                count_deletable_certified: number;
            };
            initialCertifiedEpoch: number;
        };
    };
};

type Abs = {
    id: string;
    title: string;
    authors: string;
    authorsParsed: string[][];
    versions: {
        version: string;
        created: string;
    }[];
    abstract: string;
    subjects: string[];
    license: string;
    blobId: string;
    pdfSize: number;
    objectId?: string;
    registeredEpoch?: number;
    certifiedEpoch?: number;
    startEpoch?: number;
    endEpoch?: number;
}

const allowedLicenses = [
    'http://creativecommons.org/licenses/by-sa/4.0/',
    'http://creativecommons.org/licenses/by/4.0/',
    'http://creativecommons.org/publicdomain/zero/1.0/',
    'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    'http://creativecommons.org/licenses/by-nc-nd/4.0/'
];

/* Checks 
 * 1. that all entries in papers/cat/subcat/*.json have an abs file uploaded.
 * 2. that all entries in index.json have a corresponding abs.json
 * 3. that all abs have a valid license
 * 4. that all abs have a blobId
 * 5. that all abs point to an uploaded pdf
 */
async function checkIndexMetadataAndLicense(absDirectory: string, pdfDirectory: string, indexFile: string, papersFile: string) {
    const indexContent = fs.readFileSync(indexFile, 'utf-8');
    const index = JSON.parse(indexContent);
    const allPapers: IAllPapers = JSON.parse(fs.readFileSync(papersFile, 'utf-8'));
    const nPapers = allPapers.count;

    let progress = 0;
    for (const category of allPapers.categories) {
        for (const subCategory of category.subCategories) {
            const papers: IPaperTrimmed[] = JSON.parse(fs.readFileSync(`${__dirname}/../app/public${subCategory.data}`, 'utf-8'));
            for (const paper of papers) {
                progress++;
                if (progress * 100. / nPapers < 16.3) {
                    continue;
                }
                const absFile = `${paper.id}.json`;
                const filePath = path.join(absDirectory, absFile);
                if (!fs.existsSync(filePath)) {
                    console.log(`Did not find ${absFile}. Downloading from walrus`);
                    try {
                        const absFromWalrus = await fetch(`https://aggregator.walrus-testnet.walrus.space/v1/${paper.metadataBlobId}`);
                        const abs = await absFromWalrus.json();
                        fs.writeFileSync(filePath, JSON.stringify(abs));
                    } catch (e) {
                        console.log(`ERROR: During fetching ${absFile} from walrus`);
                        console.log(e);
                        continue;
                    }

                }

                let absFileOut: string, absFileErr: string;
                try { 
                    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobId":{"file":"${filePath}"}}}'`);
                    absFileOut = stdout;
                    absFileErr= stderr;
                } catch(e) {
                    console.log(`ERROR: walrus json blob-id ${filePath} threw`);
                    console.log(e);
                    continue;
                }
                if (absFileErr) {
                    if (!absFileErr.startsWith("[warn] Client/Server api version mismatch")) {
                        console.log(`ERROR: Something went wrong with getting blobId for ${filePath}`);
                        console.log(`absFileErr: ${absFileErr}`);
                        continue;
                    }
                }
                let blobIdResponse: BlobIdResponse;
                try {
                    blobIdResponse = JSON.parse(absFileOut);
                } catch (e) {
                    console.log(`ERROR: Could not parse walrus blobId response for ${absFile}`);
                    continue;
                }

                if (blobIdResponse.blobId !== paper.metadataBlobId) {
                    console.log(`ERROR: blob-id mismatch between ${absFile} and ${papersFile}`);
                }

                let blobStatusStdout: string, blobStatusStderr: string;
                try {
                    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobStatus":{"blobId":"${paper.metadataBlobId}"}}}'`);
                    blobStatusStdout = stdout;
                    blobStatusStderr = stderr;
                } catch (e) {
                    console.log(`ERROR: blobStatus command for paper ${paper.id} threw error`);
                    console.log(e);
                    continue;
                }
                if (blobStatusStderr) {
                    if (!blobStatusStderr.startsWith("[warn] Client/Server api version mismatch")) {
                        console.log(`ERROR: Something went wrong with getting blobStatus for ${absFile}`);
                        console.log(`stderr: ${blobStatusStderr}`);
                        continue;
                    }
                }
                let blobStatusResponse: PermanentBlobStatusResponse | undefined = undefined;
                try {
                    blobStatusResponse = JSON.parse(blobStatusStdout);
                } catch (e) {
                    console.log(`ERROR: Could not parse walrus blobStatus response for ${absFile}`);
                }
                if (!blobStatusResponse || !blobStatusResponse.status.permanent) {
                    console.log(`ERROR: blobStatusResponse: ${blobStatusResponse}`);
                }

                // Step 3: Read the file contents
                const fileContent = fs.readFileSync(filePath, 'utf-8');

                // Step 4: Parse the JSON content
                const absData: Abs = JSON.parse(fileContent);

                if (absData.id !== paper.id) {
                    console.log(`ERROR: ${absFile} has different id than its name`);
                }
                if (!allowedLicenses.includes(absData.license)) {
                    console.log(`ERROR: ${absFile} license: ${absData["license"]}`);
                }
                if (!absData.blobId) {
                    console.log(`ERROR: ${absFile} does not have a blobId`);
                }

                let pdfBlobStatus: string, pdfStatusStderr: string;
                try {
                    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobStatus":{"blobId":"${absData.blobId}"}}}'`);
                    pdfBlobStatus = stdout;
                    pdfStatusStderr = stderr;
                } catch (e) {
                    console.log(`ERROR: blobStatus for pdf for paper ${absData.id} threw error`);
                    console.log(e);
                    continue;
                }

                if (pdfStatusStderr) {
                    if (!pdfStatusStderr.startsWith("[warn] Client/Server api version mismatch")) {
                        console.log(`ERROR: Something went wrong with getting blobStatus for ${absFile}`);
                        console.log(`stderr: ${pdfStatusStderr}`);
                        continue;
                    }
                }
                let pdfStatusResponse: PermanentBlobStatusResponse | undefined = undefined;
                try {
                    pdfStatusResponse = JSON.parse(pdfBlobStatus);
                } catch (e) {
                    console.log(`ERROR: Could not parse walrus blobStatus response for ${absFile}`);
                }
                if (!pdfStatusResponse || !pdfStatusResponse.status.permanent) {
                    console.log(`ERROR: pdfStatusResponse: ${pdfStatusResponse}`);
                }
                let pdfFile = path.join(pdfDirectory, `${paper.id}.pdf`);
                if (fs.existsSync(pdfFile)) {
                    let pdfBlobIdOut: string, pdfBlobIdErr: string;
                    try {
                        const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobId":{"file":"${pdfFile}"}}}'`);
                        pdfBlobIdOut = stdout;
                        pdfBlobIdErr = stderr;
                    } catch(e) {
                        console.log(`ERROR: walrus json blob-id for ${pdfFile} threw`);
                        console.log(e);
                        continue;
                    }
                    if (pdfBlobIdErr) {
                        if (!pdfBlobIdErr.startsWith("[warn] Client/Server api version mismatch")) {
                            console.log(`ERROR: Something went wrong with getting blobId for ${filePath}`);
                            console.log(`pdfBlobIdErr: ${pdfBlobIdErr}`);
                            continue;
                        }
                    }
                    let blobIdResponse: BlobIdResponse;
                    try {
                        blobIdResponse = JSON.parse(pdfBlobIdOut);
                    } catch (e) {
                        console.log(`ERROR: Could not parse walrus blobId response for ${pdfFile}`);
                        continue;
                    }

                    if (blobIdResponse.blobId !== absData.blobId) {
                        console.log(`ERROR: blob-id mismatch between ${pdfFile} and ${absFile}`);
                    }
                } else {
                    console.log(`ERROR: ${pdfFile} does not exist`);
                }

                const arxivId = paper.id;
                const withUnderscore = arxivId.replace(".", "_");
                if (!index[withUnderscore]) {
                    console.log(`ERROR: ${arxivId} does not exist in index.json`);
                }
                if (progress % 100 === 2) { // Mod is simply here to not spam
                    console.log(`${progress * 100. / nPapers}%`);
                }
            }
        }
    }

    for (const [withUnderscore, _] of Object.entries(index)) {
        const arxivId = withUnderscore.replace("_", ".");
        if (!fs.existsSync(`${absDirectory}/${arxivId}.json`)) {
            console.log(`ERROR: ${arxivId} in index.json does not have a respective abs/${arxivId}.json`);
        }
    }
}

const ABS_DIRECTORY = `${__dirname}/../data/abs`;
const PDF_DIRECTORY = `${__dirname}/../data/pdf`;
const INDEX_FILE = `${__dirname}/../app/public/index.json`;
const PAPERS_FILE = `${__dirname}/../app/public/papers.json`;
checkIndexMetadataAndLicense(ABS_DIRECTORY, PDF_DIRECTORY, INDEX_FILE, PAPERS_FILE);

