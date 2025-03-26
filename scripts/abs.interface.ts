export interface Version {
  version: string;
  created: string;
}

export const LICENCE_VALUE = {
  BY_SA_4: 'http://creativecommons.org/licenses/by-sa/4.0/',
  BY_4: 'http://creativecommons.org/licenses/by/4.0/',
  PUBLICDOMAIN_ZERO_1: 'http://creativecommons.org/publicdomain/zero/1.0/',
  BY_NC_SA_4: 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
  BY_NC_ND_4: 'http://creativecommons.org/licenses/by-nc-nd/4.0/'
} as const;

export type LICENCE = (typeof LICENCE_VALUE)[keyof typeof LICENCE_VALUE];

export interface ABS {
  id: string;
  title: string;
  authors: string;
  authorsParsed: string[][];
  versions: Version[];
  updateDate: string;
  timestamp: number;
  abstract: string;
  subjects: string[];
  license: string;
  blobId: string;
  pdfSize: string;
}

export interface StorageMeta {
  id: string;
  startEpoch: number;
  endEpoch: number;
  storageSize: number;
}

export interface BlobObject {
  id: string;
  registeredEpoch: number;
  blobId: string;
  size: number;
  encodingType: "RedStuff"
  certifiedEpoch: number;
  storage: StorageMeta;
  deletable: boolean;
}

export interface ResourceOperation {
  registerFromScratch: {
    encodedLength: number;
    epochsAhead: number;
  }
}

export interface PDF_STORE_ENTRY {
  path: string;
  blobStoreResult: {
    newlyCreated: {
      blobObject: BlobObject;
      resourceOperation: ResourceOperation;
      cost: number;
    };
  }
}

export interface OAI_METADATA_ENTRY {
  id: string;
  submitter: string;
  authors: string;
  title: string;
  comments: string | null;
  "journal-ref": string | null;
  doi: string | null;
  "report-no": string | null;
  categories: string;
  license: string;
  abstract: string;
  versions: Version[];
  update_date: string;
  authors_parsed: string[][];
}

