import * as fs from 'fs';
import index from '../app/public/index.json';
import hashes from '../app/hashes.json';

type Dictionary = {
    [key: string]: string;
}

type WsResources = {
    pre_built: PrebuiltEntry[];
}

type PrebuiltEntry = {
    path: string;
    headers: Dictionary;
    blob_id: string;
    blob_hash: string;
    range: null
}

const absToBlobId: Dictionary = index;
const absToHash: Dictionary = hashes;

const pre_built: PrebuiltEntry[] = Object.entries(absToBlobId).map(([idUnderscored, blobId]) => {
    const arxivId = idUnderscored.replace("_", ".");
    console.log(arxivId);
    const blob_hash = absToHash[idUnderscored];
    return {
        path: `/abs/${arxivId}.json`,
        headers: {
            'Content-Type': 'application/json'
        },
        blob_id: blobId,
        blob_hash,
        range: null
    };
});

const wsResources: WsResources = {
    pre_built
};

fs.writeFileSync('ws-resources.json', JSON.stringify(wsResources));

