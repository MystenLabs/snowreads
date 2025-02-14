import * as fs from 'fs/promises';
import * as path from 'path';
import { Dirent } from 'fs';

const PDF_DIR = `${__dirname}/../data/pdf`
const ABS_DIR = `${__dirname}/../data/abs`
const MAX_TOTAL_BLOB_SIZE = 1073741824;
const MAX_FILES_PER_COMMAND = 100;
const MAX_EPOCHS = 183;

type FileData = {
    size: number;
}

async function filterFilesInDir(dir: string, filterFn: (dirEntry: Dirent) => boolean): Promise<Record<string, FileData>> {

    let entries = await fs.readdir(dir, { withFileTypes: true });
    entries = entries.filter((dirEntry) => {
        return filterFn(dirEntry);
    });
    let pathToSize: Record<string, FileData> = {};
    for (const entry of entries) {
        const filePath = path.join(dir, entry.name);
        const stats = await fs.stat(filePath);
        pathToSize[filePath] = {
            size: stats.size
        };
    }

    return pathToSize;
}

function chunksBySize(pdfs: Record<string, FileData>, maxChunkSize: number, maxChunkCount: number) {
    let chunks: string[][] = [];
    let currentChunk: string[] = [];
    let currentChunkSize = 0;
    for (const [pdf, data] of Object.entries(pdfs)) {
        if (currentChunkSize + data.size >= maxChunkSize || currentChunk.length > maxChunkCount) {
            chunks.push(currentChunk);
            currentChunk = [pdf];
            currentChunkSize = data.size;
            continue;
        }
        currentChunk.push(pdf);
        currentChunkSize += data.size;
    }
    chunks.push(currentChunk);

    return chunks;
}

function toWalrusJsonStoreCmd(chunk: string[]) {
    return `RUST_LOG=off walrus json '{"ignoreResources":true,"gasBudget":5000000000,"command":{"store":{"epochs":${MAX_EPOCHS},"files":${JSON.stringify(chunk)}}}}'`;
}

async function runPdf() {
    let filesToStore = await filterFilesInDir(PDF_DIR, (dirEntry) => {
        return dirEntry.isFile() && dirEntry.name.endsWith(".pdf");
    });
    const chunks = chunksBySize(filesToStore, MAX_TOTAL_BLOB_SIZE / 2, MAX_FILES_PER_COMMAND);

    for (const chunk of chunks) {
        console.log(toWalrusJsonStoreCmd(chunk));
    }
}

async function runAbs() {
    let filesToStore = await filterFilesInDir(ABS_DIR, (dirEntry) => {
        return dirEntry.isFile() && dirEntry.name.endsWith(".json");
    });
    const chunks = chunksBySize(filesToStore, MAX_TOTAL_BLOB_SIZE / 2, MAX_FILES_PER_COMMAND);

    for (const chunk of chunks) {
        console.log(toWalrusJsonStoreCmd(chunk));
    }
}

runPdf();
runAbs();

