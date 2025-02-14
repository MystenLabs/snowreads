import * as fs from 'fs';

const INDEX_PATH = `${__dirname}/../app/public/index.json`;
const COLLECTION_PATH = `${__dirname}/../app/public/collections.json`;

type Collections = {
    size: number;
} & Record<string, Collection>;

type Collection = {
    size: number;
    count: number;
    papers: {
        id: `${string}.${string}`;
        title: string;
        authorsParsed: string[][];
        timestamp: number;
        metadataBlobId: string;
    }[];
}

type Index = Record<`${string}_${string}`, string>;


function run() {
    const index: Index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
    const collections: Collections = JSON.parse(fs.readFileSync(COLLECTION_PATH, 'utf8'));
    for (const [collectionName, collection] of Object.entries(collections)) {
        if (typeof collection === 'number' || collectionName === 'size') {
            continue;
        }
        for (const paper of collection.papers) {
            const withUnderscore = paper.id.replace('.', '_');
            if (!index[withUnderscore]) {
                throw `Expected every paper in index.json. ${paper.id}`;
            }
            if (paper.metadataBlobId !== index[withUnderscore]) {
                paper.metadataBlobId = index[withUnderscore];
            }
        }
    }
    console.log(JSON.stringify(collections));
}

run();
