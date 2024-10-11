import fs from 'fs';

const COLLECTIONS_JSON = '../app/public/collections.json';
const ABS_DIR = '../app/public/abs';

let collections = JSON.parse(fs.readFileSync(COLLECTIONS_JSON, 'utf8'));

for (let collection in collections) {
    if (typeof collections[collection] !== 'object') {
        console.log(`Collection ${collection} is not an object`);
        break;
    }
    for (const paper of collections[collection].papers) {
        const paperId = paper.id;
        const absJson = JSON.parse(fs.readFileSync(`${ABS_DIR}/${paperId}.json`, 'utf8'));
        collections[collection].size += parseInt(absJson.pdfSize);
    }
}

fs.writeFileSync(COLLECTIONS_JSON, JSON.stringify(collections));
