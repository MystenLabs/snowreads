const fs = require('fs');

const PDF_DIR = `${__dirname}/../app/public/pdf/`
const ABS_DIR = `${__dirname}/../app/public/abs/`
const PAPERS_JSON = `${__dirname}/../app/public/papers.json`

let allPapers = JSON.parse(fs.readFileSync(PAPERS_JSON, 'utf8'));  // Read the file


const pdfs = fs.readdirSync(PDF_DIR);
const ids = pdfs.map((pdf) => pdf.substring(0, pdf.length - 4));

// Remove abstract.json files that don't have a corresponding pdf
const abs = fs.readdirSync(ABS_DIR);
const absToRemove = abs.filter((abs) => {return !ids.includes(abs.substring(0, abs.length - 5))});
absToRemove.forEach((abs) => {
    fs.rmSync(`${ABS_DIR}/${abs}`);
});


for (const category in allPapers) {
    // Skip "count" at the top level
    if (category === "count") continue;

    // Ensure category is valid
    const categoryObj = allPapers[category];

    if (typeof categoryObj !== "object") {
        console.error(`Category ${category} is not an object`);
        continue;
    }
    for (const subCategory in categoryObj) {
        // Skip "count" in subcategories
        if (subCategory === "count") continue;

        if (typeof categoryObj[subCategory] !== "object") {
            console.error(`Subcategory ${subCategory} in category ${category} is not an object`);
            continue;
        }
        const subCat = (categoryObj[subCategory]);

        subCat.papers = subCat.papers.filter((paper) => ids.includes(paper.id));
        const oldCount = subCat.count;
        subCat.count = subCat.papers.length;
        categoryObj.count -= (oldCount - subCat.count);
        allPapers.count -= (oldCount - subCat.count);
    }
}

fs.writeFileSync(PAPERS_JSON, JSON.stringify(allPapers));
