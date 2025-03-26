import * as fs from 'fs';
import { OAI_METADATA_ENTRY, PDF_STORE_ENTRY } from './abs.interface';
import { parseCategory } from './parse-category';

// Load JSON files
const pdfStorePath: string = 'pdf-store.json';
const metadataPath: string = '../data/oai-metadata.json';

// Read and parse JSON files
const pdfStoreData: PDF_STORE_ENTRY[] = JSON.parse(fs.readFileSync(pdfStorePath, 'utf-8'));

if (!pdfStoreData.length) {
    console.log("No pdfStoreData parsed");
}

const metadataData: Record<string, OAI_METADATA_ENTRY> = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

// Function to extract ID from filename
const extractIdFromPath = (path: string): string => {
  // return path.basename(path, '.pdf');
  return path.split('/').pop()?.replace('.pdf', '') || '';
};

const generateCategoriesJson = () => {
    let categoriesObj: any = { count: 0 };

    pdfStoreData.forEach((entry: PDF_STORE_ENTRY) => {
        const id: string = extractIdFromPath(entry.path);

        if (!id) {  console.log("No id found for entry", entry); };

        const metadataEntry: OAI_METADATA_ENTRY | undefined = metadataData[id];
        if (!metadataEntry) { console.log("No metadata entry found for id", id); };

        const subjects: string[] = metadataEntry["categories"].split(" ");
        if (!subjects.length) {
            console.log("No categories found for id", id);
        }
        const { mainCategory, subCategory, path } = parseCategory(subjects[0]);

        categoriesObj.count++;
        if (!categoriesObj[mainCategory]) {
            categoriesObj[mainCategory] = { count: 0 };
        }
        if (!categoriesObj[mainCategory][subCategory]) {
            categoriesObj[mainCategory][subCategory] = { count: 0, papers: [], path };
        }

        categoriesObj[mainCategory][subCategory].count++;
        categoriesObj[mainCategory].count++;

        const versions: any[] = metadataEntry["versions"];
        let publishedDate = versions.find((version) => version["version"] === "v1")?.created;
        if (!publishedDate) {
            console.log("No published date found for entry", metadataEntry["id"]);
        }
        const pubDate: Date = new Date(Date.parse(publishedDate));
        const timestamp = pubDate.valueOf();
        if (isNaN(timestamp)) {
            console.log("Invalid timestamp found for entry", metadataEntry["id"]);
        }

        const paperTrimmed = {
            id: id,
            title: metadataEntry["title"],
            authorsParsed: metadataEntry["authors_parsed"],
            timestamp 
        };
        categoriesObj[mainCategory][subCategory].papers.push(paperTrimmed);

    });

    fs.writeFileSync("categories.json", JSON.stringify(categoriesObj), 'utf8');
}

generateCategoriesJson();
console.log("Done");
