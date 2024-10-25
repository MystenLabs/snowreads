import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function readJsonFile(filePath: string): any {
    const jsonData = fs.readFileSync(filePath, 'utf8');  // Read the file
    return JSON.parse(jsonData);  // Parse and return the JSON content
}

const allowedLicenses = [
    'http://creativecommons.org/licenses/by-sa/4.0/',
    'http://creativecommons.org/licenses/by/4.0/',
    'http://creativecommons.org/publicdomain/zero/1.0/',
    'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    'http://creativecommons.org/licenses/by-nc-nd/4.0/'
];

const argv = yargs(hideBin(process.argv))
    .command(
        '$0 <arxiv_id>',
        `Checks the license of a paper is among ${allowedLicenses}`,
        (yargs) => {
            yargs.positional('arxiv_id', {
                describe: 'The arXiv ID of the paper to check the license of',
                type: 'string',
                demandOption: true
            });
        }
    )
    .help()
    .argv as {
        _: any[],
        '$0': string,
        arxiv_id: string
    }

const arxivId = argv.arxiv_id;

const oaiData = readJsonFile(`${__dirname}/../data/oai-metadata.json`);
const paper = oaiData[arxivId];
if (!paper) {
    console.log('Not allowed');
    process.exit(0);
}

if (!paper.license || !allowedLicenses.includes(paper.license)) {
    console.log(`License: ${paper.license} is not allowed`);
    process.exit(0);
}
console.log("Allowed");
process.exit(0);

