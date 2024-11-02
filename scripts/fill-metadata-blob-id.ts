import * as fs from 'fs';

type Dictionary = {
    [key: string]: string;
}

export interface Papers {
  count: number;
  size: number;
  categories: Category[];
};


type SubCategory = {
  name: string;
  count: number;
  size: number;
  data: string;
}

type Category = {
  name: string;
  count: number;
  size: number;
  subCategories: SubCategory[];
}

type PaperTrimmed = {
  id: string;
  title: string;
  authorsParsed: string[][];
  timestamp: number;
  metadataBlobId?: string | null;
}

const INDEX_JSON = `${__dirname}/../app/public/index.json`
const PAPERS_JSON = `${__dirname}/../app/public/papers.json`

const indexData: Dictionary = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));  // Parse and return the JSON content
const papers: Papers = JSON.parse(fs.readFileSync(PAPERS_JSON, 'utf8'));  // Parse and return the JSON content

for (const category of papers.categories) {
  for (const subCategory of category.subCategories) {
    const filePath = `${__dirname}/../app/public/${subCategory.data}`;
    const papers: PaperTrimmed[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (let paper of papers) {
      if (!paper.metadataBlobId) {
        console.log(`Filling metadataBlobId for paper ${paper.id}`);
        const withUnderscore = paper.id.replace(".", "_");
        paper.metadataBlobId = indexData[withUnderscore];
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(papers));
  }
}



