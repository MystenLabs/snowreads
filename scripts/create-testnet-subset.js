#!/usr/bin/env node

/**
 * Create testnet subset: ~1000 papers for testing
 *
 * Strategy:
 * 1. Keep ALL collection papers (33 papers) - GUARANTEED
 * 2. Sample from subcategories (excluding collections) to reach ~1000 total
 * 3. Update subcategory JSONs with only selected papers
 * 4. Remove unneeded PDFs and abs files
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../app/public');
const COLLECTIONS_FILE = path.join(PUBLIC_DIR, 'collections.json');
const PAPERS_DIR = path.join(PUBLIC_DIR, 'papers');
const ABS_DIR = path.join(PUBLIC_DIR, 'abs');
const PDFS_DIR = path.join(PUBLIC_DIR, 'pdfs');

const TARGET_TOTAL = 1000;

console.log('Creating testnet subset (~1000 papers)...\n');

// Step 1: Get all collection paper IDs (GUARANTEED to be included)
console.log('Step 1: Reading collection papers (GUARANTEED)...');
const collections = JSON.parse(fs.readFileSync(COLLECTIONS_FILE, 'utf-8'));
const collectionPaperIds = new Set();

Object.keys(collections).forEach(key => {
  if (key !== 'size' && collections[key].papers) {
    collections[key].papers.forEach(paper => {
      collectionPaperIds.add(paper.id);
    });
  }
});

console.log(`  ✅ ${collectionPaperIds.size} collection papers GUARANTEED`);

// Step 2: Read all subcategory JSONs
console.log('\nStep 2: Reading all subcategory papers...');

function findJsonFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  });

  return files;
}

const subcategoryFiles = findJsonFiles(PAPERS_DIR);
const allSubcategoryPapers = [];

subcategoryFiles.forEach(file => {
  const papers = JSON.parse(fs.readFileSync(file, 'utf-8'));
  papers.forEach(paper => {
    allSubcategoryPapers.push({
      ...paper,
      sourceFile: file
    });
  });
});

console.log(`  Found ${allSubcategoryPapers.length} total subcategory papers`);

// Step 3: Sample papers to reach target (EXCLUDING collection papers)
console.log('\nStep 3: Selecting additional papers...');

const neededFromSubcategories = TARGET_TOTAL - collectionPaperIds.size;
console.log(`  Need ${neededFromSubcategories} more papers from subcategories`);

// Filter out papers that are already in collections
const nonCollectionPapers = allSubcategoryPapers.filter(
  paper => !collectionPaperIds.has(paper.id)
);

console.log(`  Available non-collection papers: ${nonCollectionPapers.length}`);

// Shuffle and take first N papers
const shuffled = nonCollectionPapers.sort(() => Math.random() - 0.5);
const selectedSubcategoryPapers = shuffled.slice(0, neededFromSubcategories);

// Create set of all selected paper IDs (collections + sampled)
const selectedPaperIds = new Set([
  ...collectionPaperIds,  // GUARANTEED
  ...selectedSubcategoryPapers.map(p => p.id)
]);

console.log(`  ✅ Total selected: ${selectedPaperIds.size} papers`);
console.log(`     - Collections: ${collectionPaperIds.size} (guaranteed)`);
console.log(`     - Additional: ${selectedSubcategoryPapers.length} (sampled)`);

// Step 4: Update subcategory JSONs
console.log('\nStep 4: Updating subcategory JSON files...');

const fileUpdates = {};

// Group selected papers by source file
allSubcategoryPapers.forEach(paper => {
  if (selectedPaperIds.has(paper.id)) {
    if (!fileUpdates[paper.sourceFile]) {
      fileUpdates[paper.sourceFile] = [];
    }
    fileUpdates[paper.sourceFile].push(paper);
  }
});

let filesUpdated = 0;
let filesEmptied = 0;

subcategoryFiles.forEach(file => {
  if (fileUpdates[file]) {
    // Update with selected papers only
    const papers = fileUpdates[file].map(p => {
      const { sourceFile, ...paperData } = p;
      return paperData;
    });
    fs.writeFileSync(file, JSON.stringify(papers));
    filesUpdated++;
  } else {
    // No papers selected from this file - write empty array
    fs.writeFileSync(file, JSON.stringify([]));
    filesEmptied++;
  }
});

console.log(`  Updated: ${filesUpdated} files (with papers)`);
console.log(`  Emptied: ${filesEmptied} files (no papers selected)`);

// Step 5: Remove unneeded PDFs and abs files
console.log('\nStep 5: Removing unneeded files...');

const absFiles = fs.readdirSync(ABS_DIR).filter(f => f.endsWith('.json'));
const pdfFiles = fs.readdirSync(PDFS_DIR).filter(f => f.endsWith('.pdf'));

let absRemoved = 0;
let pdfsRemoved = 0;

absFiles.forEach(absFile => {
  const arxivId = absFile.replace('.json', '');
  if (!selectedPaperIds.has(arxivId)) {
    fs.unlinkSync(path.join(ABS_DIR, absFile));
    absRemoved++;
  }
});

pdfFiles.forEach(pdfFile => {
  const match = pdfFile.match(/^(\d+\.\d+)/);
  if (match) {
    const arxivId = match[1];
    if (!selectedPaperIds.has(arxivId)) {
      fs.unlinkSync(path.join(PDFS_DIR, pdfFile));
      pdfsRemoved++;
    }
  }
});

console.log(`  Removed ${absRemoved} abs files`);
console.log(`  Removed ${pdfsRemoved} PDF files`);

// Step 6: Final stats
console.log('\n' + '='.repeat(60));
console.log('✅ Testnet subset created successfully!');
console.log('='.repeat(60));
console.log(`Total papers: ${selectedPaperIds.size}`);
console.log(`  - Collections (guaranteed): ${collectionPaperIds.size}`);
console.log(`  - Subcategories (sampled): ${selectedSubcategoryPapers.length}`);
console.log(`\nRemaining files:`);
console.log(`  - PDFs: ${pdfFiles.length - pdfsRemoved}`);
console.log(`  - Abs: ${absFiles.length - absRemoved}`);
console.log('\n📝 Note: Full backup saved in backup_full_data/');
console.log('    Restore with: cp -r backup_full_data/pdfs backup_full_data/abs app/public/\n');
