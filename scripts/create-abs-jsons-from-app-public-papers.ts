import * as fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { z } from 'zod';
import { parseCategory } from './parse-category';

// Promisify the exec function
const execPromise = promisify(exec);

const ABS_DIR = `${__dirname}/../data/abs-new-new`;
const PAPERS_DIR = `${__dirname}/../app/public/papers`;
const OAI_JSON = `${__dirname}/../data/oai-metadata.json`;
const PDF_DIR = `${__dirname}/../data/pdf/`;

type BlobIdOutput = {
    blobId: string;
    file: string;
    unencodedLength: number;
};

const ZShortEntry = z.object({
    id: z.string(),
    title: z.string(),
    authorsParsed: z.array(z.array(z.string())),
    timestamp: z.number(),
    metadataBlobId: z.string()
});

const ZShortEntryList = z.array(ZShortEntry);

type OAIEntry = {
    submitter: string;
    authors: string;
    title: string;
    comments: any
    "journal-ref": any;
    doi: any;
    "report-no": any;
    categories: string;
    license: string;
    abstract: string;
    versions: {
        version: string;
        created: string
    }[];
    update_date: string;
    authors_parsed: string[][]
};

/// Reads app/public/papers and data/oai-metadata.json in order to create the abs .json files.
/// If the abs.json doesn't match app/public/papers/category/sub-category.json, it updates it and stores it as app/public/papers/category/sub-category.json.changed
async function run() {
    const oaiData: Record<string, OAIEntry> = JSON.parse(await fs.readFile(OAI_JSON, { encoding: 'utf8' }));
    let categories = await fs.readdir(PAPERS_DIR, { withFileTypes: true });

    await Promise.all(categories.map(async (category) => {
        if (!category.isDirectory()) { return; }

        let subCategories = await fs.readdir(path.join(category.parentPath, category.name), { withFileTypes: true });

        let uniqueLicenses = {};
        for (const subCategory of subCategories) {
            console.log(`Category: ${category.name}/${subCategory.name}`);
            if (!subCategory.isFile() || !subCategory.name.endsWith('json')) { continue; }

            const data = await fs.readFile(path.join(subCategory.parentPath, subCategory.name), { encoding: 'utf8' });

            const papersRes = ZShortEntryList.safeParse(JSON.parse(data));
            if (!papersRes.success) {
                throw papersRes.error;
            }
            const papers = papersRes.data;
            let changed = false
            for (const paper of papers) {
                const absFilename = `${ABS_DIR}/${paper.id}.json`;
                // check if file already exists
                try {
                    await fs.access(absFilename)
                    continue;
                } catch {
                }
                const oaiEntry = oaiData[paper.id];
                if (!oaiEntry) {
                    throw `OAIEntry for ${paper.id} not found!`;
                }
                if (!oaiEntry["license"]) {
                    console.log("No license found for entry", oaiEntry["id"]);
                    // TODO: Delete pdf from public folder?
                    if (!uniqueLicenses["No license found"]) {
                        uniqueLicenses["No license found"] = 1;
                    } else {
                        uniqueLicenses["No license found"]++;
                    }
                    throw "License";
                }
                if (!uniqueLicenses[oaiEntry["license"]]) {
                    uniqueLicenses[oaiEntry["license"]] = 1;
                } else {
                    uniqueLicenses[oaiEntry["license"]]++;
                }
                if (oaiEntry["license"] === "") {
                    console.log("Empty license found for entry", oaiEntry["id"]);
                    throw "License";
                }

                if (JSON.stringify(paper.authorsParsed) !== JSON.stringify(oaiEntry.authors_parsed)) {
                    console.log(paper.authorsParsed);
                    console.log(oaiEntry.authors_parsed);
                    throw `authorsParsed for ${paper.id} do not match`;
                }
                let subjects = oaiEntry["categories"].split(" ");
                subjects = subjects.map((subject: string) => {
                    let categs = parseCategory(subject);
                    return `${categs.mainCategory}/${categs.subCategory}`;
                });
                const pdfFilename = `${PDF_DIR}/${paper.id}.pdf`;
                let size = (await fs.stat(pdfFilename)).size;

                const { stdout, stderr } = await execPromise(
                    `walrus json '{"command":{"blobId":{"file":"${pdfFilename}"}}}'`
                );

                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    throw `Error getting the blob id for ${pdfFilename}`;
                }

                const blobIdOut: BlobIdOutput = JSON.parse(stdout);
                if (size !== blobIdOut.unencodedLength) {
                    throw `Different size reported by walrus and fs stat for ${paper.id}`;
                }

                const abs = {
                    id: paper.id,
                    title: paper.title,
                    authors: oaiEntry.authors,
                    authorsParsed: paper.authorsParsed,
                    versions: oaiEntry.versions,
                    updateDate: oaiEntry.update_date,
                    timestamp: paper.timestamp,
                    abstract: oaiEntry.abstract,
                    subjects,
                    license: oaiEntry.license,
                    blobId: blobIdOut.blobId,
                    pdfSize: size.toString(),
                };

                await fs.writeFile(absFilename, JSON.stringify(abs), { encoding: 'utf8' });

                const { stdout: absStdout, stderr: absStderr } = await execPromise(
                    `walrus json '{"command":{"blobId":{"file":"${absFilename}"}}}'`
                );

                if (absStderr) {
                    console.error(`Stderr: ${absStderr}`);
                    throw `Error getting the blob id for ${absFilename}`;
                }

                const metadatablobIdOut: BlobIdOutput = JSON.parse(absStdout);
                if (size !== blobIdOut.unencodedLength) {
                    throw `Different size reported by walrus and fs stat for ${paper.id}`;
                }
                if (metadatablobIdOut.blobId != paper.metadataBlobId) {
                    paper.metadataBlobId = metadatablobIdOut.blobId;
                    changed = true;
                }
            }
            if (changed) {
                await fs.writeFile(path.join(subCategory.parentPath, `${subCategory.name}.changed`), JSON.stringify(papers), { encoding: 'utf8' });
            }
        }

        console.log("Unique licenses found:", uniqueLicenses);
    }));
}

run();

// "2103.16737"
// "2104.12573"
// "2203.02217"
// "2203.16630"
// "2203.16648"
// "2203.17095"
// "2209.05633"
// "2210.13016"
// "2302.00418"
// "2302.02325"
// "2306.17316"
// "2309.12713"
// "2309.12715"
// "2402.01427"
// "2405.19088"
// "2405.20956"
// "2406.10522"
// "2406.13564"
// "2406.16051"
// "2409.10322"
