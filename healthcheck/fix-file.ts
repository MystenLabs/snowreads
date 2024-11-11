import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { AllPapers, IPaperTrimmed } from '../app/src/interfaces/IAllPapers';

const PDF_DIR = `${__dirname}/../data/pdf-bak`
const ABS_DIR = `${__dirname}/../data/abs`
const INDEX_FILE = `${__dirname}/../app/public/index.json`

const ALLOWED_LICENSES = [
  'http://creativecommons.org/licenses/by-sa/4.0/',
  'http://creativecommons.org/licenses/by/4.0/',
  'http://creativecommons.org/publicdomain/zero/1.0/',
  'http://creativecommons.org/licenses/by-nc-sa/4.0/',
  'http://creativecommons.org/licenses/by-nc-nd/4.0/'
];

type BlobIdResponse = {
  blobId: string,
  file: string,
  unencodedLength: number;
};

type PermanentBlobStatusResponse = {
  blobId: string;
  status: {
    permanent: {
      endEpoch: number;
      isCertified: boolean;
      statusEvent: {
        txDigest: string;
        eventSeq: number;
      };
      deletableCounts: {
        count_deletable_total: number;
        count_deletable_certified: number;
      };
      initialCertifiedEpoch: number;
    };
  };
};

type Abs = {
  id: string;
  title: string;
  authors: string;
  authorsParsed: string[][];
  versions: {
    version: string;
    created: string;
  }[];
  abstract: string;
  subjects: string[];
  license: string;
  blobId: string;
  pdfSize: number;
  objectId?: string;
  registeredEpoch?: number;
  certifiedEpoch?: number;
  startEpoch?: number;
  endEpoch?: number;
}

const execAsync = promisify(exec);
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("ERROR: No arguments provided.");
  process.exit(1);
}

const indexFile = fs.readFileSync(INDEX_FILE, 'utf-8');
const index: {
  [key: string]: string
} = JSON.parse(indexFile);
let allPapers: AllPapers = JSON.parse(fs.readFileSync(`${__dirname}/../app/public/papers.json`, 'utf-8'));
for (const category of allPapers.categories) {
  for (const subCategory of category.subCategories) {
    subCategory.papers = JSON.parse(fs.readFileSync(`${__dirname}/../app/public${subCategory.data}`, 'utf-8'));
  }
}

function findPaperInAllPapers(arxivId: string): { data: string; paper: IPaperTrimmed, papers: IPaperTrimmed[] } | undefined {
  for (const cat of allPapers.categories) {
    for (const subCat of cat.subCategories) {
      const paper = subCat.papers.find((paper) => paper.id === arxivId);
      if (paper) {
        return { data: subCat.data, paper, papers: subCat.papers };
      }
    }
  }
}

async function checkArxivId(arxivId: string): Promise<{ error: 0 | 1 }> {

  const withUnderscore = arxivId.replace(".", "_");
  const metadataBlobIdInIndex = index[withUnderscore];

  // Read abs.json
  const absFilePath = `${ABS_DIR}/${arxivId}.json`;
  if (!fs.existsSync(absFilePath)) { // If not available download from walrus
    try {
      const resp = await fetch(`https://aggregator.walrus-testnet.walrus.space/v1/${metadataBlobIdInIndex}`);
      const data = await resp.json();
      fs.writeFileSync(absFilePath, JSON.stringify(data));
    } catch (err) {
      console.log(`ERROR: Something went wrong fetching metadataBlob from walrus and writing to ${arxivId}.json`);
      console.log(err);
      return { error: 1 };
    }
  }
  let abs: Abs = JSON.parse(fs.readFileSync(absFilePath, 'utf-8'));
  if (!ALLOWED_LICENSES.includes(abs.license)) {
    console.log(`ERROR: File you are trying to fix does not have a valid license.`);
    console.log(abs.license);
    return { error: 1 };
  }


  // Check pdf blob-id
  const pdfFilePath = `${PDF_DIR}/${arxivId}.pdf`;
  if (!fs.existsSync(pdfFilePath)) { // If not available download from arXiv
    try {
      const pdfResp = await fetch(`https://arxiv.org/pdf/${arxivId}`);
      const pdfData = await pdfResp.arrayBuffer();
      fs.writeFileSync(pdfFilePath, Buffer.from(pdfData));
    } catch (err) {
      console.log(`ERROR: Something went wrong downloading pdf file from arXiv for ${arxivId}`);
      console.log(err);
      return { error: 1 };
    }
  }
  let mismatch = false;
  try {
    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobId":{"file":"${pdfFilePath}"}}}'`);
    if (stderr && !stderr.startsWith("[warn] Client/Server api version mismatch")) {
      console.log(`ERROR: Something went wrong with getting pdf-blobId for ${arxivId}`);
      console.log(`stderr: ${stderr}`);
      return { error: 1 };
    }
    const blobIdResponse: BlobIdResponse = JSON.parse(stdout);
    if (blobIdResponse.blobId !== abs.blobId) {
      mismatch = true;
      console.log(`Discrepancy found: pdf-blob-id doesn't match to the one written in ${arxivId}.json`);
      console.log(`Fixing pdf-blob-id ${arxivId}.json points to`);
      abs.blobId = blobIdResponse.blobId;
      fs.writeFileSync(absFilePath, JSON.stringify(abs));
    }
  } catch (err) {
    console.log(`ERROR: Something went wrong checking blob-id for ${arxivId}.pdf`);
    console.log(err);
    return { error: 1 };
  }

  // Check pdf is uploaded to walrus
  try {
    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobStatus":{"file":"${pdfFilePath}"}}}'`);
    if (stderr && !stderr.startsWith("[warn] Client/Server api version mismatch")) {
      console.log(`ERROR: Something went wrong with getting pdf-blobStatus for ${arxivId}`);
      console.log(`stderr: ${stderr}`);
      return { error: 1 };
    }
    const blobStatusResponse: PermanentBlobStatusResponse = JSON.parse(stdout);
    if (!blobStatusResponse || !blobStatusResponse.status.permanent) {
      console.log(`Discrepancy found: pdf-blobStatusResponse: ${JSON.stringify(blobStatusResponse, null, 2)}`);
      console.log(`Fixing: storing ${pdfFilePath} to walrus for 200 epochs`);
      await execAsync(`walrus store ${pdfFilePath} --epochs 200`);
    }
  } catch (err) {
    console.log(`ERROR: Could not parse walrus pdf-blobStatus response for ${arxivId}`);
    console.log(err);
    return { error: 1 };
  }

  // Check json blob-id
  try {
    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobId":{"file":"${absFilePath}"}}}'`);
    if (stderr && !stderr.startsWith("[warn] Client/Server api version mismatch")) {
      console.log(`ERROR: Something went wrong with getting abs-blobId for ${arxivId}`);
      console.log(`stderr: ${stderr}`);
      return { error: 1 };
    }
    const blobIdResponse: BlobIdResponse = JSON.parse(stdout);
    // Check index.json
    if (blobIdResponse.blobId !== metadataBlobIdInIndex) {
      if (!mismatch) {
        console.log(`Discrepancy found: index[${withUnderscore}] does not point to the correct ${arxivId}.json`);
      }
      console.log(`Fixing abs-blob-id index.json points to`);
      index[withUnderscore] = blobIdResponse.blobId;
      fs.writeFileSync(INDEX_FILE, JSON.stringify(index));
    }
    // Check paper-trimmed inside papers folder
    const found = findPaperInAllPapers(arxivId);
    if (!found) {
      console.log(`Discrepancy found: paper ${arxivId} not found in app/public/papers`);

      const versions: any[] = abs.versions;
      let publishedDate = versions.find((version) => version["version"] === "v1")?.created;
      if (!publishedDate) {
        console.log(`ERROR: No published date found for ${arxivId}`);
        return { error: 1 };
      }
      const pubDate: Date = new Date(Date.parse(publishedDate));
      const timestamp = pubDate.valueOf();
      if (isNaN(timestamp)) {
        console.log(`ERROR: Invalid timestamp found for entry ${arxivId}`);
        return { error: 1 };
      }
      const paper: IPaperTrimmed = {
        id: arxivId,
        title: abs.title,
        authorsParsed: abs.authorsParsed,
        timestamp,
        metadataBlobId: blobIdResponse.blobId
      }
      console.log(`ERROR: Unimplemented: Fetching primary/secondary category for ${arxivId}. Please fix manually.`);
      console.log("Paper to add to correct subcategory:");
      console.log(JSON.stringify(paper, null, 2));
      return { error: 1 };
    }
    // Check paper-trimmed points to the correct blob-id
    const { data, paper, papers } = found;
    if (blobIdResponse.blobId !== paper.metadataBlobId) {
      console.log(`Discrepancy found: app/public/papers${data} pointing to a wrong metadataBlobId for ${arxivId}`);
      console.log(`Fixing /app/public/papers${data}`);
      paper.metadataBlobId = blobIdResponse.blobId;
      fs.writeFileSync(`${__dirname}/../app/public${data}`, JSON.stringify(papers));
    }
  } catch (err) {
    console.log(`ERROR: Something went wrong fixing metadata-blob-id for ${arxivId}`);
    console.log(err);
    return { error: 1 }
  }

  // Check abs is uploaded to walrus
  try {
    const { stdout, stderr } = await execAsync(`walrus json '{"command":{"blobStatus":{"file":"${absFilePath}"}}}'`);
    if (stderr && !stderr.startsWith("[warn] Client/Server api version mismatch")) {
      console.log(`ERROR: Something went wrong with getting abs-blobStatus for ${arxivId}`);
      console.log(`stderr: ${stderr}`);
      return { error: 1 };
    }
    const blobStatusResponse: PermanentBlobStatusResponse = JSON.parse(stdout);
    if (!blobStatusResponse || !blobStatusResponse.status.permanent) {
      console.log(`Discrepancy found: abs-blobStatusResponse: ${JSON.stringify(blobStatusResponse, null, 2)}`);
      console.log(`Fixing: storing ${absFilePath} to walrus for 200 epochs`);
      await execAsync(`walrus store ${absFilePath} --epochs 200`);
    }
  } catch (err) {
    console.log(`ERROR: Something went wrong checking or uploading abs for ${arxivId}`);
    console.log(err);
    return { error: 1 };
  }
  return { error: 0 }
}

async function run() {
  for (const arxivId of args) {
    const { error } = await checkArxivId(arxivId);
    if (error) break;
  }
}

run();
