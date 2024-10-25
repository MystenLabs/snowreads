import fs from 'fs';

const COLLECTIONS_JSON = '../app/public/collections.json';
const ABS_DIR = '../data/abs';

let collections = JSON.parse(fs.readFileSync(COLLECTIONS_JSON, 'utf8'));

for (let collection in collections) {
    if (typeof collections[collection] !== 'object') {
        console.log(`Collection ${collection} is not an object`);
        break;
    }
    collections[collection].size = 0;
    let paperCount = 0;
    for (const paper of collections[collection].papers) {
        const paperId = paper.id;
        const absJson = JSON.parse(fs.readFileSync(`${ABS_DIR}/${paperId}.json`, 'utf8'));
        collections[collection].size += parseInt(absJson.pdfSize);
        paperCount++;
    }

    if (paperCount != 10) {
        console.log(`Collection ${collection} has ${paperCount} papers`);
    }
}

fs.writeFileSync(COLLECTIONS_JSON, JSON.stringify(collections));
