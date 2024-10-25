
import * as fs from 'fs';
import { parseCategory } from './parse-category';

// First run with these parameters to store 2407 to new categories.json
const MONTH = "2407";
const N_FILES = 21795;
let categoryObj: any = { count: 0 };

// Then with these to append 2408 to categories.json
// const MONTH = "2408";
// const N_FILES = 17452;
// let categoryObj = readJsonFile("categories.json");

function readJsonFile(filePath: string): any {
    const jsonData = fs.readFileSync(filePath, 'utf8');  // Read the file
    return JSON.parse(jsonData);  // Parse and return the JSON content
}

const oaiData = readJsonFile(`${__dirname}/../data/oai-metadata.json`);
const arxivData = readJsonFile(`combined-${MONTH}.json`);
let uniqueLicenses: any = {};
for (let i = 1; i < N_FILES; i++) {
    // let absObj
    const paddedNumber = i.toString().padStart(5, '0');
    // console.log(paddedNumber);
    let oaiEntry = oaiData[`${MONTH}.${paddedNumber}`];
    let arxivEntry = arxivData[`${MONTH}.${paddedNumber}`];
    // console.log(arxivData);
    if (!arxivEntry) {
        console.log("arxiv entry not found");
        continue;
    }
    if (!oaiEntry) {
        console.log("oai entry not found");
        continue;
    }
    // console.log(arxivEntry);

    if (!arxivEntry["arxiv"]["entry"]["arxiv:primary_category"][0]["$"]["term"]) {
        console.log("primary category not found");
        continue;
    }

    const category = arxivEntry["arxiv"]["entry"]["arxiv:primary_category"][0]["$"]["term"];
    if (!category || category.length === 0) {
        console.log("No category found for entry", arxivEntry["arxiv"]["entry"]["id"][0]);
        continue;
    }

    const { mainCategory, subCategory } = parseCategory(category);
    
    if (!oaiEntry["license"]) {
        console.log("No license found for entry", oaiEntry["id"]);
        // TODO: Delete pdf from public folder?
        if (!uniqueLicenses["No license found"]) {
            uniqueLicenses["No license found"] = 1;
        } else {
            uniqueLicenses["No license found"]++;
        }
        continue;
    }
    if (!uniqueLicenses[oaiEntry["license"]]) {
        uniqueLicenses[oaiEntry["license"]] = 1;
    } else {
        uniqueLicenses[oaiEntry["license"]]++;
    }
    if (oaiEntry["license"] === "") {
        console.log("Empty license found for entry", oaiEntry["id"]);
        continue;
    }

    categoryObj["count"]++;
    if (!categoryObj[mainCategory]) {
        categoryObj[mainCategory] = {};
        categoryObj[mainCategory]["count"] = 0;
    }
    if (!categoryObj[mainCategory][subCategory]) {
        categoryObj[mainCategory][subCategory] = { papers: [], count: 0};
    }
    categoryObj[mainCategory]["count"]++;
    categoryObj[mainCategory][subCategory]["count"]++;

    // Data needed for landing and category-list page
    const versions: any[] = oaiEntry["versions"];
    let publishedDate = versions.find((version) => version["version"] === "v1")?.created;
    if (!publishedDate) {
        console.log("No published date found for entry", oaiEntry["id"]);
        continue;
    }
    const pubDate: Date = new Date(Date.parse(publishedDate));
    const timestamp = pubDate.valueOf();
    if (isNaN(timestamp)) {
        console.log("Invalid timestamp found for entry", oaiEntry["id"]);
        continue;
    }

    const paperTrimmed = {
        id: `${MONTH}.${paddedNumber}`,
        title: oaiEntry["title"],
        authorsParsed: oaiEntry["authors_parsed"],
        timestamp,
    };
    categoryObj[mainCategory][subCategory].papers.push(paperTrimmed);

    let subjects = oaiEntry["categories"].split(" ");
    subjects = subjects.map((subject: string) => {
        let categs = parseCategory(subject);
        return `${categs.mainCategory}/${categs.subCategory}`;
    });

    // get filesize of corresponding pdf:
    // const pdfPath = `../../../data/pdf/${oaiEntry["id"]}.pdf`;
    // const pdfSize = fs.statSync(pdfPath).size;

    const paper = {
        id: `${MONTH}.${paddedNumber}`,
        title: oaiEntry["title"],
        authors: oaiEntry["authors"],
        authorsParsed: oaiEntry["authors_parsed"],
        versions,
        updateDate: oaiEntry["update_date"],
        timestamp,
        // .. New data
        abstract: oaiEntry["abstract"],
        subjects,
        license: oaiEntry["license"],
        // blobId
        // objectId
        // pdfSize
    };
    // write to file in ../data
    fs.writeFileSync(`../../../data/abs/${MONTH}.${paddedNumber}.json`, JSON.stringify(paper), 'utf8');

}

fs.writeFileSync("categories.json", JSON.stringify(categoryObj), 'utf8');

console.log("Unique licenses found:", uniqueLicenses);
console.log("Done");


