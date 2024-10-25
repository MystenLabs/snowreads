
import * as fs from 'fs';

const ABS_DIR = `${__dirname}/../data/abs/`
const PAPERS_JSON = `${__dirname}/../app/public/papers.json`
const NEW_PAPERS_JSON = `${__dirname}/../app/public/new_papers.json`

let allPapers = JSON.parse(fs.readFileSync(PAPERS_JSON, 'utf8'));  // Read the file

for (const category in allPapers) {
    if (category === 'count' || category === 'size') {
        continue;
    }
    const subCategories = allPapers[category];
    for (const subCategory in subCategories) {
        if (subCategory === 'count' || subCategory === 'size') {
            continue;
        }
        const papers = subCategories[subCategory].papers;
        const uniquePapers = papers.filter((paper, index, self) =>
            index === self.findIndex((t) => t.id === paper.id)
        );
        subCategories[subCategory].papers = uniquePapers;
    }
}
fs.writeFileSync(NEW_PAPERS_JSON, JSON.stringify(allPapers));
