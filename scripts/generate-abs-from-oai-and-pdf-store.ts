import * as fs from 'fs';
import { ABS, LICENCE_VALUE, OAI_METADATA_ENTRY, PDF_STORE_ENTRY } from './abs.interface';
import path from 'path';
import { parseCategory } from './parse-category';

// Load JSON files
const pdfStorePath: string = 'pdf-store.json';
const metadataPath: string = '../data/oai-metadata.json';
const outputDir: string = 'abs-fixed';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read and parse JSON files
const pdfStoreData: PDF_STORE_ENTRY[] = JSON.parse(fs.readFileSync(pdfStorePath, 'utf-8'));
const metadataData: Record<string, OAI_METADATA_ENTRY> = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

// Function to extract ID from filename
const extractIdFromPath = (path: string): string => {
  // return path.basename(path, '.pdf');
  return path.split('/').pop()?.replace('.pdf', '') || '';
};


// Process pdf-store.json and generate individual JSON files asynchronously
const generateJsonFiles = async () => {
    await Promise.all(pdfStoreData.map(async (entry: PDF_STORE_ENTRY) => {
        const id: string = extractIdFromPath(entry.path);
        const blobId: string | undefined = entry.blobStoreResult?.newlyCreated?.blobObject?.blobId;
        const pdfSize: string | undefined = entry.blobStoreResult?.newlyCreated?.blobObject?.size.toString();
        
        if (!id || !blobId || !pdfSize) return;

        const metadataEntry: OAI_METADATA_ENTRY | undefined = metadataData[id];
        if (!metadataEntry) return;

	let subjects = metadataEntry["categories"].split(" ");

    	subjects = subjects.map((subject: string) => {
        	let categs = parseCategory(subject);
        	return `${categs.mainCategory}/${categs.subCategory}`;
    	});

        const outputJson: ABS= {
            id: metadataEntry.id,
            title: metadataEntry.title,
            authors: metadataEntry.authors,
            authorsParsed: metadataEntry.authors_parsed,
            versions: metadataEntry.versions,
            updateDate: metadataEntry.update_date,
            timestamp: new Date(metadataEntry.versions[0].created).getTime(),
            abstract: metadataEntry.abstract,
            subjects,
            license: metadataEntry.license,
            blobId,
            pdfSize
        };

        const outputFilePath = path.join(outputDir, `${id}.json`);
        await fs.promises.writeFile(outputFilePath, JSON.stringify(outputJson), 'utf-8');

        console.log(`Generated JSON file: ${outputFilePath}`);
    }));

    console.log('All JSON files have been generated successfully.');
};

generateJsonFiles().catch(console.error);
