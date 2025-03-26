import * as fs from "fs";
import * as path from "path";

// Paths to input files
const CATEGORIES_FILE = "categories.json";
const METADATA_DIR = "abs-fixed";
const INDEX_FILE = "../app/public/new-index.json";
const OUTPUT_DIR = "../app/public/papers-fixed";

// Ensure directory exists
const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Load JSON file safely
const loadJSON = <T>(filePath: string): T | null => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return null;
  }
};

type Paper = {
  id: string;
  title: string;
  authorsParsed: string[][];
  timestamp: number;
};

type SubCategory = {
  count: number;
  papers: Paper[];
  path: string;
};

type MainCategory = {
  count: number;
  [subCategory: string]: SubCategory | number; // Includes "count" and actual subcategories
};

type Categories = {
  count: number;
  [mainCategory: string]: MainCategory | number; // Includes "count" and actual main categories
};


// Load required JSON files
const categories = loadJSON<Categories>(CATEGORIES_FILE);
const indexMap = loadJSON<Record<string, string>>(INDEX_FILE);

if (!categories || !indexMap) {
  console.error("Failed to load categories.json or index.json.");
  process.exit(1);
}

// Create the output directory
ensureDir(OUTPUT_DIR);

// Process categories
Object.entries(categories).forEach(([mainCategory, mainData]) => {
  if (mainCategory === "count") return;

  Object.entries(mainData).forEach(([subCategory, subData]) => {
    if (subCategory === "count" || !subData.path) return;

    // Extract folder and filename from the "path" field
    const fullPath = path.join(OUTPUT_DIR, subData.path);
    const folderPath = path.dirname(fullPath);
    const fileName = path.basename(fullPath, path.extname(fullPath)) + ".json";

    ensureDir(folderPath);

    const outputFilePath = path.join(folderPath, fileName);
    const papersList: any[] = [];

    if (subData.papers) {
      subData.papers.forEach((paper: any) => {
        const metadataFilePath = path.join(METADATA_DIR, `${paper.id}.json`);
        const metadata = loadJSON<Record<string, any>>(metadataFilePath);
        const withUnderscore = metadata.id.replace('.','_');

        if (metadata) {
          papersList.push({
            id: metadata.id,
            title: metadata.title,
            authorsParsed: metadata.authorsParsed,
            timestamp: metadata.timestamp,
            metadataBlobId: indexMap[withUnderscore] || "",
          });
        }
      });
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(papersList));
    console.log(`Created ${outputFilePath}`);
  });
});

console.log("Processing complete.");

