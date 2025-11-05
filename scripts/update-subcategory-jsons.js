#!/usr/bin/env node

/**
 * Update subcategory JSON files to add pdfPath field
 *
 * For each paper in subcategory JSONs:
 * 1. Read the corresponding abs file
 * 2. Extract the blobId for the PDF
 * 3. Look up the PDF path in the blob mapping
 * 4. Add pdfPath field to the paper entry
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../app/public');
const ABS_DIR = path.join(PUBLIC_DIR, 'abs');
const PAPERS_DIR = path.join(PUBLIC_DIR, 'papers');
const MAPPING_FILE = path.join(__dirname, '../blob-id-to-path-mapping.json');

console.log('Updating subcategory JSON files...');

// Load the blob mapping
let mapping;
try {
  mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  console.log(`Loaded mapping with ${Object.keys(mapping.pdfs).length} PDF entries`);
} catch (error) {
  console.error('Error loading mapping file:', error.message);
  process.exit(1);
}

// Find all subcategory JSON files recursively
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
console.log(`Found ${subcategoryFiles.length} subcategory JSON files`);

let stats = {
  filesProcessed: 0,
  papersProcessed: 0,
  papersUpdated: 0,
  pdfPathsAdded: 0,
  errors: []
};

// Process each subcategory file
subcategoryFiles.forEach(subcategoryFile => {
  try {
    const content = fs.readFileSync(subcategoryFile, 'utf-8');
    const papers = JSON.parse(content);

    if (!Array.isArray(papers)) {
      console.warn(`Skipping ${subcategoryFile} - not an array`);
      return;
    }

    let fileModified = false;

    papers.forEach((paper, index) => {
      stats.papersProcessed++;

      // Get arxiv ID and read abs file
      const arxivId = paper.id;
      if (!arxivId) {
        stats.errors.push({
          file: subcategoryFile,
          paper: index,
          error: 'No arxiv ID'
        });
        return;
      }

      // Read the abs file to get the PDF blob ID
      const absPath = path.join(ABS_DIR, `${arxivId}.json`);
      if (!fs.existsSync(absPath)) {
        stats.errors.push({
          file: subcategoryFile,
          paper: arxivId,
          error: 'Abs file not found'
        });
        return;
      }

      try {
        const absContent = fs.readFileSync(absPath, 'utf-8');
        const absData = JSON.parse(absContent);

        // Get PDF path from mapping
        if (absData.blobId && mapping.pdfs[absData.blobId]) {
          paper.pdfPath = mapping.pdfs[absData.blobId];
          stats.pdfPathsAdded++;
          fileModified = true;
        }

        // Also add abs path for convenience
        paper.absPath = `/abs/${arxivId}.json`;
        stats.papersUpdated++;
        fileModified = true;

      } catch (error) {
        stats.errors.push({
          file: subcategoryFile,
          paper: arxivId,
          error: `Error reading abs file: ${error.message}`
        });
      }
    });

    // Write back if modified in compact format (no pretty-printing)
    if (fileModified) {
      fs.writeFileSync(subcategoryFile, JSON.stringify(papers));
      stats.filesProcessed++;
    }

    if (stats.filesProcessed % 10 === 0) {
      console.log(`Processed ${stats.filesProcessed}/${subcategoryFiles.length} files...`);
    }

  } catch (error) {
    stats.errors.push({
      file: subcategoryFile,
      error: error.message
    });
  }
});

console.log('\nUpdate complete!');
console.log(`Files processed: ${stats.filesProcessed}`);
console.log(`Papers processed: ${stats.papersProcessed}`);
console.log(`Papers updated: ${stats.papersUpdated}`);
console.log(`PDF paths added: ${stats.pdfPathsAdded}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\nFirst 10 errors:');
  stats.errors.slice(0, 10).forEach(err => {
    console.log(`  ${err.paper || err.file}: ${err.error}`);
  });
}
