import * as fs from 'fs';
import * as readline from 'readline';
import {LeanPaper, Paper} from "./types";

let buffer = '';
let fullPapers: Paper[] = [];

let filename = process.argv[2];
let cutoffDateParam = process.argv[3];
let cutoffDate: Date;

const outputFilename = 'leanPapers.json';

const DEFAULT_CUTOFF_DATE = new Date('1996-06-30');


if (!filename) {
    console.error('No filename given, using test file: test.json');
    filename = 'test.json';
}

if(!cutoffDateParam) {
    console.error('No cutoff date given, using default cutoff date: 1996-06-30');
    cutoffDate = DEFAULT_CUTOFF_DATE;
}else {
    cutoffDate = new Date(cutoffDateParam);
}

console.log(`Reading file: ${filename}`);
console.log(`Cutoff date: ${cutoffDate}`);

const readStream = fs.createReadStream(filename, { encoding: 'utf-8' });
const rl = readline.createInterface({
    input: readStream,
    output: process.stdout,
    terminal: false,
});

rl.on('line', (line: string) => {
    buffer += line.trim(); // Add each line to the buffer

    try {
        // Try parsing the accumulated buffer
        const parsedObject: Paper = JSON.parse(buffer);

        const paperCreationDate = new Date(parsedObject.versions[0].created);

        if(paperCreationDate > cutoffDate) {
            fullPapers.push(parsedObject);
        }

        // Reset the buffer after successful parse
        buffer = '';
    } catch (err) {
        // Continue buffering lines if the object is incomplete
        // The error here indicates that the JSON is not fully received yet
    }
});

rl.on('close', () => {
    console.log('Finished processing the file.');

    const leanPapers: LeanPaper[] = fullPapers.map((paper) => ({
        id: paper.id,
        authors: paper.authors,
        title: paper.title,
        doi: paper.doi,
        categories: paper.categories,
    }));

    // Output the transformed lean papers
    console.log('Lean papers:', leanPapers.length);

    fs.writeFile(outputFilename, JSON.stringify(leanPapers, null, 2), (err) => {
        if (err) {
            console.error('Error writing to output file:', err);
        } else {
            console.log(`Lean papers written to ${outputFilename}`);
        }
    });

});
