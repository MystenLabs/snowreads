import * as fs from "fs";

import { ABS } from "./abs.interface";

const ABS_DIR = `${__dirname}/../data/abs`;
const PDF_STORE_PATH = `${__dirname}/pdf-store.json`;

type StoreResp = {
  blobStoreResult: {
    newlyCreated?: {
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
          storageSize: number;
        };
        deletable: false;
      };
      resourceOperation: {
        reuseRegistration: {
          encodedLength: number;
        };
      };
      cost: number;
    };
    alreadyCertified?: {
      blobId: string;
      event: {
        txDigest: string;
        eventSeq: string;
      };
      endEpoch: number;
    };
  };
  path: string;
};

function run() {
  const absFiles = fs.readdirSync(ABS_DIR);
  const pdfStore: StoreResp[] = JSON.parse(
    fs.readFileSync(PDF_STORE_PATH, "utf8")
  );

  for (const pdfStoreResp of pdfStore) {
    const filename = pdfStoreResp.path.split("/").at(-1);
    if (!filename) {
      throw Error("unexpected empty path");
    }
    const id = filename.replace(/\.pdf$/, "");
    const absFile = absFiles.find((f) => f.startsWith(id));
    if (!absFile) {
      throw Error(`Missing abs file for ${id}`);
    }
    let abs: ABS = JSON.parse(fs.readFileSync(`${ABS_DIR}/${absFile}`, "utf8"));

    let pdfStoreBlobId: string = pdfStoreResp.blobStoreResult.newlyCreated
      ? pdfStoreResp.blobStoreResult.newlyCreated.blobObject.blobId
      : pdfStoreResp.blobStoreResult.alreadyCertified.blobId;

    if (
      abs.blobId !== pdfStoreBlobId
    ) {
      console.log(
        `Updating ${abs.id}: ${abs.blobId} -> ${pdfStoreBlobId}`
      );
    }

    abs.blobId = pdfStoreBlobId;
    fs.writeFileSync(`${ABS_DIR}/${absFile}`, JSON.stringify(abs));
  }
}

run();
