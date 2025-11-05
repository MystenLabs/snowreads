#!/usr/bin/env node

/**
 * Remove obsolete metadataBlobId from subcategory JSON files
 *
 * This script removes fields that were used in the pre-quilts migration:
 * - metadataBlobId (old direct Walrus upload ID for abs/*.json files)
 * - blobId (if it refers to old PDF blob IDs)
 *
 * Keeps:
 * - pdfPath (new local path to PDF)
 * - absPath (new local path to abs JSON)
 * - All paper metadata (arxiv_id, title, etc.)
 */

const fs = require('fs');
const path = require('path');

const PAPERS_DIR = path.join(__dirname, '../app/public/papers');

console.log('Cleaning up old blob IDs from subcategory JSONs...\n');

let stats = {
  filesProcessed: 0,
  metadataBlobIdRemoved: 0,
  blobIdRemoved: 0,
  totalPapersProcessed: 0,
  errors: []
};

// Recursively find all JSON files in papers directory
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

const jsonFiles = findJsonFiles(PAPERS_DIR);
console.log(`Found ${jsonFiles.length} subcategory JSON files\n`);

jsonFiles.forEach(jsonPath => {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(content);

    let modified = false;

    // Process each paper in the array
    if (Array.isArray(data)) {
      data.forEach(paper => {
        // Remove metadataBlobId
        if (paper.metadataBlobId !== undefined) {
          delete paper.metadataBlobId;
          stats.metadataBlobIdRemoved++;
          modified = true;
        }

        // Remove blobId (old PDF blob ID)
        if (paper.blobId !== undefined) {
          delete paper.blobId;
          stats.blobIdRemoved++;
          modified = true;
        }

        stats.totalPapersProcessed++;
      });

      if (modified) {
        // Write back to file in compact format (no pretty-printing)
        fs.writeFileSync(jsonPath, JSON.stringify(data));
        stats.filesProcessed++;
      }
    }
  } catch (error) {
    stats.errors.push({
      file: jsonPath,
      error: error.message
    });
  }
});

console.log('✅ Cleanup complete!');
console.log(`Files modified: ${stats.filesProcessed}`);
console.log(`Total papers processed: ${stats.totalPapersProcessed}`);
console.log(`  - metadataBlobId fields removed: ${stats.metadataBlobIdRemoved}`);
console.log(`  - blobId fields removed: ${stats.blobIdRemoved}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\nErrors:', stats.errors.slice(0, 10));
}
