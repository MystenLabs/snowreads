import fs from 'fs';
import path from 'path';

const categoriesPath = 'categories.json';
const absFixedFolder = 'abs-fixed';
const outputPath = '../app/public/papers-new.json';

// Helper function to read JSON files
const readJsonFile = (filePath: string): any => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}:`, error);
        return null;
    }
};

// Load categories.json
const categoriesData = readJsonFile(categoriesPath);
if (!categoriesData) process.exit(1);

const result = {
    count: 0,
    size: 0,
    categories: [] as {
        name: string;
        count: number;
        size: number;
        subCategories: {
            name: string;
            count: number;
            size: number;
            data: string;
        }[];
    }[],
};

for (const mainCategory in categoriesData) {
    if (mainCategory === 'count') continue;
    
    const mainCategoryData = categoriesData[mainCategory];
    let mainCategoryCount = 0;
    let mainCategorySize = 0;
    const subCategories: any[] = [];

    for (const subCategory in mainCategoryData) {
        if (subCategory === 'count') continue;

        const subCategoryData = mainCategoryData[subCategory];
        const papers = subCategoryData.papers || [];
        let subCategorySize = 0;

        for (const paper of papers) {
            const paperFile = path.join(absFixedFolder, `${paper.id}.json`);
            const paperData = readJsonFile(paperFile);

            if (paperData && paperData.pdfSize) {
                subCategorySize += parseInt(paperData.pdfSize, 10) || 0;
            }
        }

        mainCategoryCount += subCategoryData.count;
        mainCategorySize += subCategorySize;

        subCategories.push({
            name: subCategory,
            count: subCategoryData.count,
            size: subCategorySize,
            data: `papers/${subCategoryData.path}.json`, // Updated to use "path"
        });
    }

    result.categories.push({
        name: mainCategory,
        count: mainCategoryCount,
        size: mainCategorySize,
        subCategories,
    });

    result.count += mainCategoryCount;
    result.size += mainCategorySize;
}

// Write to papers.json
fs.writeFileSync(outputPath, JSON.stringify(result));
console.log(`Generated ${outputPath}`);

