import * as fs from 'fs';
import { IPaperTrimmed } from "../app/src/interfaces/IAllPapers";

type Collections = {
  size: number;
  "Mysten Labs Research": {
    size: number;
    count: number,
    papers: IPaperTrimmed[];
  };
  "Scientific Wonder of Pop Culture": {
    size: number;
    count: number;
    papers: IPaperTrimmed[];
  };
  "The Science of Everyday Decisions": {
    size: number;
    count: number;
    papers: IPaperTrimmed[];
  };

  "Is AI Fun": {
    size: number;
    count: number;
    papers: IPaperTrimmed[];
  };
};

const COLLECTIONS_FILE = `${__dirname}/../app/public/collections.json`;
const INDEX_FILE = `${__dirname}/../app/public/index.json`;

const collections: Collections = JSON.parse(fs.readFileSync(COLLECTIONS_FILE, 'utf-8'));
const index: {
  [key: string]: string
} = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));

for (const paper of collections['Mysten Labs Research'].papers) {
  const withUnderscore = paper.id.replace(".", "_");
  if (paper.metadataBlobId !== index[withUnderscore]) {
    console.log(`Discrepancy found. ${paper.id}`);
    paper.metadataBlobId = index[withUnderscore];
  }
}
for (const paper of collections['Scientific Wonder of Pop Culture'].papers) {
  const withUnderscore = paper.id.replace(".", "_");
  if (paper.metadataBlobId !== index[withUnderscore]) {
    console.log(`Discrepancy found. ${paper.id}`);
    paper.metadataBlobId = index[withUnderscore];
  }
}
for (const paper of collections['The Science of Everyday Decisions'].papers) {
  const withUnderscore = paper.id.replace(".", "_");
  if (paper.metadataBlobId !== index[withUnderscore]) {
    console.log(`Discrepancy found. ${paper.id}`);
    paper.metadataBlobId = index[withUnderscore];
  }
}
for (const paper of collections['Is AI Fun'].papers) {
  const withUnderscore = paper.id.replace(".", "_");
  if (paper.metadataBlobId !== index[withUnderscore]) {
    console.log(`Discrepancy found. ${paper.id}`);
    paper.metadataBlobId = index[withUnderscore];
  }
}
fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(collections));

