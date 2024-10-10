
const fs = require('fs');

const ABS_DIR = `${__dirname}/../app/public/abs/`
const PAPERS_JSON = `${__dirname}/../app/public/papers.json`

let allPapers = JSON.parse(fs.readFileSync(PAPERS_JSON, 'utf8'));  // Read the file

allPapers.size = 0;
for (const category in allPapers) {
    if (category === 'count' || category === 'size') {
        continue;
    }
    allPapers[category].size = 0;
    const subCategories = allPapers[category];
    for (const subCategory in subCategories) {
        if (subCategory === 'count' || subCategory === 'size') {
            continue;
        }
        allPapers[category][subCategory].size = 0;
        const papers = subCategories[subCategory].papers;
        for (const paper of papers) {
            const filePath = `${ABS_DIR}${paper.id}.json`;
            const absData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const size = absData.pdfSize;
            allPapers[category][subCategory].size += parseInt(size);
            allPapers[category].size += parseInt(size);
            allPapers.size += parseInt(size);
        }
    }
}

fs.writeFileSync(PAPERS_JSON, JSON.stringify(allPapers));
