import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const allowedLicenses = [
    'http://creativecommons.org/licenses/by-sa/4.0/',
    'http://creativecommons.org/licenses/by/4.0/',
    'http://creativecommons.org/publicdomain/zero/1.0/',
    'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    'http://creativecommons.org/licenses/by-nc-nd/4.0/'
];

/* Checks 
 * 1. that all files in abs folder also exist in index.json
 * 2. that all entries in index.json have a corresponding abs.json
 * 3. that all abs have a valid license
 * 4. that all abs have a blobId
 */
function checkIndexMetadataAndLicense(absDirectory: string, indexFile: string) {
    // Step 1: Read the directory
    const files = fs.readdirSync(absDirectory);

    // Step 2: Filter JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const indexContent = fs.readFileSync(indexFile, 'utf-8');
    const index = JSON.parse(indexContent);

    for (const file of jsonFiles) {
        const filePath = path.join(absDirectory, file);

        // Step 3: Read the file contents
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Step 4: Parse the JSON content
        const jsonData = JSON.parse(fileContent);

        if (!allowedLicenses.includes(jsonData["license"])) {
            console.log(`ERROR: ${file} license: ${jsonData["license"]}`);
        }
        if (!jsonData["blobId"]) {
            console.log(`ERROR: ${file} does not have a blobId`);
        }
        const arxivId = file.replace(".json", "");
        const withUnderscore = arxivId.replace(".", "_");
        if (!index[withUnderscore]) {
            console.log(`ERROR: ${file} does not exist in index.json`);
        }
    }

    for (const [withUndersocre, _] of Object.entries(index)) {
        const arxivId = withUndersocre.replace("_", ".");
        if (!fs.existsSync(`${absDirectory}/${arxivId}.json`)) {
            console.log(`ERROR: ${arxivId} does not have a respective ${arxivId}.json`);
        }
    }
}

/* Checks that all entries to the index.json point to a valid metadata blob
 */
async function checkMetadataBlob(indexFile: string) {

    const fileContent = fs.readFileSync(indexFile, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    let progress = 0;
    const nArxivs = Object.keys(jsonData).length;
    for (const [arxivId, blobId] of Object.entries(jsonData)) {
        try {
            const absResp = await fetch(`https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`);
            await absResp.json();
        } catch {
            console.log(`ERROR: Could not parse metadata for ${arxivId}`);
        }

        progress++;
        if (progress % 100 === 0) {
            console.log(`${progress * 100. / nArxivs}%`);
        }
    }
}

/** Checks
 * 1. That a pdf exists in the pdfDirectory for every abs.json
 * 2. That the blob written in the abs.json is indeed stored in walrus
 * @note: Run with RUST_LOG="off" to not fill the output with tracing details
 */
async function checkPdfBlob(absDirectory: string, pdfDirectory: string) {
    const absFiles = fs.readdirSync(absDirectory);
    const pdfFiles = fs.readdirSync(pdfDirectory);

    const jsonFiles = absFiles.filter(file => file.endsWith('.json'));
    let progress = 0;
    const nArxivs = jsonFiles.length;
    for (const file of jsonFiles) {
        progress++;
        if (progress % 100 === 0) {
            console.log(`${progress * 100. / nArxivs}%`);
        }
        const pdfFile = file.replace(".json", ".pdf");

        if (!pdfFiles.includes(pdfFile)) {
            console.log(`ERROR: No ${pdfFile}. Will continue checking for the blobId...`);
        }
        const filePath = path.join(absDirectory, file);

        const contents = fs.readFileSync(filePath, 'utf-8');

        const data = JSON.parse(contents);

        const blobId = data["blobId"];
        if (!blobId) {
            console.log(`ERROR: No blobId in ${file}`);
            continue;
        }

        const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobStatus":{"blobId":"${blobId}"}}}'`);
        if (stderr) {
            if (!stderr.startsWith("[warn] Client/Server api version mismatch")) {
                console.log(`stderr: ${stderr}`);
                continue;
            }
        }
        let respJson;
        try {
            respJson = JSON.parse(stdout);
        } catch (e) {
            console.log(`ERROR: Parsing 'walrus json blob-status' response`);
            console.log(e);
        }
        if (!respJson) {
            return;
        }
        if (!respJson.status) {
            console.log(`ERROR: 'walrus json blob-status' for ${file} returned:\n${JSON.stringify(respJson)}`);
            return;
        }
        if (!respJson.status.permanent) {
            console.log(`ERROR: 'walrus json blob-status' for ${file} returned:\n${JSON.stringify(respJson)}`);
        }
    }
}

const absDirectory = `${__dirname}/../data/abs`;
const pdfDirectory = `${__dirname}/../data/pdf-bak`;
const indexFile = `${__dirname}/../app/public/index.json`;
// checkIndexMetadataAndLicense(absDirectory, indexFile);
// checkMetadataBlob(indexFile);
checkPdfBlob(absDirectory, pdfDirectory);
