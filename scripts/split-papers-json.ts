import * as fs from 'fs';

const PAPERS_JSON_PATH = `${__dirname}/../app/public/papers.json`
const NEW_PAPERS_JSON = `${__dirname}/../app/public/new_papers.json`

type Papers = {
    count: number,
    size: number,
} & {
  [key: string]: Category;
};

type Category = {
    count: number,
    size: number,
} & {
  [key: string]: SubCategory;
};

type SubCategory = {
    count: number,
    size: number,
    papers: PaperTrimmed[];
}

type PaperTrimmed = {
  id: string;
  title: string;
  authorsParsed: string[][];
  timestamp: number;
  metadataBlobId?: string | null;
}

type NewPapers = {
    count: number;
    size: number;
    categories: NewCategory[];
};

type NewCategory = {
    name: string;
    count: number;
    size: number;
    subCategories: NewSubCategory[];
}

type NewSubCategory = {
    name: string;
    count: number;
    size: number;
    data: string;
}


const allPapers: Papers = JSON.parse(fs.readFileSync(PAPERS_JSON_PATH, 'utf8'));  // Read the file
let newPapers: NewPapers = {
    count: allPapers.count,
    size: allPapers.size,
    categories: []
}

fs.mkdirSync(`${__dirname}/../app/public/papers`);
for (const categoryName in allPapers) {
    if (categoryName === 'count' || categoryName === 'size') {
        continue;
    }
    const category: Category = allPapers[categoryName];
    newPapers.categories.push({
        name: categoryName,
        count: category.count,
        size: category.size,
        subCategories: []
    });
    const categoryPart = categoryName.toLowerCase().replace(" ","-");
    fs.mkdirSync(`${__dirname}/../app/public/papers/${categoryPart}`);

    for (const subCategoryName in category) {
        if (subCategoryName === 'count' || subCategoryName === 'size') {
            continue;
        }
        const subCategory: SubCategory = category[subCategoryName];
        const subCategoryPart = subCategoryName.toLowerCase().replace(" ","-") + '.json';
        let newCategory = newPapers.categories.find((newCategory) => newCategory.name === categoryName);
        if (!newCategory) {
            throw new Error(`Something went wrong. Could not find ${categoryName}`);
        }
        const data = `papers/${categoryPart}/${subCategoryPart}`;
        newCategory.subCategories.push({
            name: subCategoryName,
            count: subCategory.count,
            size: subCategory.size,
            data
        });
        fs.writeFileSync(`${__dirname}/../app/public/${data}`, JSON.stringify(subCategory.papers));
    }
}
fs.writeFileSync(NEW_PAPERS_JSON, JSON.stringify(newPapers));

