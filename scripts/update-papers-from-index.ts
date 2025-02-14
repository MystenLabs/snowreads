import * as fs from 'fs/promises';
import * as path from 'path';
import { z } from 'zod';

const PAPERS_DIR = `${__dirname}/../app/public/papers`;
const INDEX_PATH = `${__dirname}/../app/public/index.json`;

const ZShortEntry = z.object({
    id: z.string(),
    title: z.string(),
    authorsParsed: z.array(z.array(z.string())),
    timestamp: z.number(),
    metadataBlobId: z.string()
});

const ZShortEntryList = z.array(ZShortEntry);

/// Updates metadataBlobId in app/public/papers to match the one specified in index.json
async function run() {
    const index: Record<string, string> = JSON.parse(await fs.readFile(INDEX_PATH, 'utf8'));
    let categories = await fs.readdir(PAPERS_DIR, { withFileTypes: true });

    await Promise.all(categories.map(async (category) => {
        if (!category.isDirectory()) { return; }

        let subCategories = await fs.readdir(path.join(category.parentPath, category.name), { withFileTypes: true });

        let uniqueLicenses = {};
        for (const subCategory of subCategories) {
            console.log(`Category: ${category.name}/${subCategory.name}`);
            if (!subCategory.isFile() || !subCategory.name.endsWith('json')) { continue; }

            const data = await fs.readFile(path.join(subCategory.parentPath, subCategory.name), { encoding: 'utf8' });

            const papersRes = ZShortEntryList.safeParse(JSON.parse(data));
            if (!papersRes.success) {
                throw papersRes.error;
            }
            const papers = papersRes.data;
            for (const paper of papers) {

                const withUnderscore = paper.id.replace('.', '_');
                if (paper.metadataBlobId != index[withUnderscore]) {
                    console.log(`updating ${paper.id}`);
                    paper.metadataBlobId = index[withUnderscore];
                }
            }
            await fs.writeFile(path.join(subCategory.parentPath, subCategory.name), JSON.stringify(papers));
        }

        console.log("Unique licenses found:", uniqueLicenses);
    }));
}

run();

