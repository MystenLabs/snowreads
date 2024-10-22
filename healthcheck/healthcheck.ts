import * as fs from 'fs';
import * as path from 'path';

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
 */
function checkIndexMetadataAndLicense(directoryPath: string, indexFile: string) {
    // Step 1: Read the directory
    const files = fs.readdirSync(directoryPath);

    // Step 2: Filter JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const indexContent = fs.readFileSync(indexFile, 'utf-8');
    const index = JSON.parse(indexContent);

    for (const file of jsonFiles) {
        const filePath = path.join(directoryPath, file);

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
        if (!fs.existsSync(`${directoryPath}/${arxivId}.json`)) {
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
        if (progress % 100) {
            console.log(`${progress*100./nArxivs}%`);
        }
    }
}

const absDirectory = '/Users/nikos/Projects/Internal/wal-papers/data/abs';
const indexFile = "/Users/nikos/Projects/Internal/wal-papers/app/public/index.json";
checkIndexMetadataAndLicense(absDirectory, indexFile);
// checkMetadataBlob(indexFile);
