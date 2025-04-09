import * as fs from 'fs';

const NEW_INDEX_PATH = `${__dirname}/../app/public/new-index.json`;
const ABS_STORE_RESP_PATH = `${__dirname}/abs-store.json`;

type StoreResp = {
    blobStoreResult: {
        newlyCreated: {
            blobObject: {
                id: string;
                registeredEpoch: number;
                blobId: string;
                size: number;
                encodingType: string;
                certifiedEpoch: number;
                storage: {
                    id: string;
                    startEpoch: number;
                    endEpoch: number;
                    storageSize: number
                };
                deletable: false
            };
            resourceOperation: {
                reuseRegistration: {
                    encodedLength: number
                }
            };
            cost: number
        },
	alreadyCertified: {
        blobId: string,
        event: {
          txDigest: string,
          eventSeq: string
        },
        endEpoch: number 
      }

    };
    path: string
};

type Index = Record<`${string}_${string}`, string>;

/// Updates index.json from the output of the store command when storing chunks
function run() {
    const absStore: StoreResp[] = JSON.parse(fs.readFileSync(ABS_STORE_RESP_PATH, 'utf8'));
    let index: Index = {};
    for (const storeResp of absStore) {
        const filename = storeResp.path.split('/').at(-1);
        if (!filename) { throw Error("unexpected empty path") }
        const withUnderscore = filename.replace(/\.json$/, "").replace('.', '_');
	if (storeResp.blobStoreResult && storeResp.blobStoreResult.newlyCreated) {
        	index[withUnderscore] = storeResp.blobStoreResult.newlyCreated.blobObject.blobId;
	} else {
        	index[withUnderscore] = storeResp.blobStoreResult.alreadyCertified.blobId;
	}
    }

    fs.writeFileSync(NEW_INDEX_PATH, JSON.stringify(index));
}

run();

