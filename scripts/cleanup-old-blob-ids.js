#!/usr/bin/env node

/**
 * Remove obsolete blob IDs from abs/*.json files
 *
 * This script removes fields that were used in the pre-quilts migration:
 * - blobId (old direct Walrus upload ID for PDFs)
 * - Any other obsolete Walrus metadata fields
 *
 * Keeps:
 * - pdfPath (new local path)
 * - All paper metadata (id, title, authors, etc.)
 */

const fs = require('fs');
const path = require('path');

const ABS_DIR = path.join(__dirname, '../app/public/abs');

console.log('Cleaning up old blob IDs from abs files...\n');

// Get all abs files
const absFiles = fs.readdirSync(ABS_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${absFiles.length} abs files`);

let stats = {
  filesProcessed: 0,
  blobIdRemoved: 0,
  objectIdRemoved: 0,
  epochFieldsRemoved: 0,
  errors: []
};

// Fields to remove (obsolete Walrus metadata from direct uploads)
const FIELDS_TO_REMOVE = [
  'blobId',           // Old PDF blob ID
  'objectId',         // Old Walrus object ID
  'registeredEpoch',  // Old epoch data
  'certifiedEpoch',
  'startEpoch',
  'endEpoch'
];

absFiles.forEach((absFile, index) => {
  try {
    const absPath = path.join(ABS_DIR, absFile);
    const content = fs.readFileSync(absPath, 'utf-8');
    const data = JSON.parse(content);

    let modified = false;

    // Remove obsolete fields
    FIELDS_TO_REMOVE.forEach(field => {
      if (data[field] !== undefined) {
        delete data[field];
        modified = true;

        if (field === 'blobId') stats.blobIdRemoved++;
        if (field === 'objectId') stats.objectIdRemoved++;
        if (field.includes('Epoch')) stats.epochFieldsRemoved++;
      }
    });

    if (modified) {
      // Write back to file in compact format (no pretty-printing)
      fs.writeFileSync(absPath, JSON.stringify(data));
      stats.filesProcessed++;
    }

    if ((index + 1) % 1000 === 0) {
      console.log(`Processed ${index + 1}/${absFiles.length} files...`);
    }
  } catch (error) {
    stats.errors.push({
      file: absFile,
      error: error.message
    });
  }
});

console.log('\n✅ Cleanup complete!');
console.log(`Files modified: ${stats.filesProcessed}`);
console.log(`  - blobId fields removed: ${stats.blobIdRemoved}`);
console.log(`  - objectId fields removed: ${stats.objectIdRemoved}`);
console.log(`  - epoch fields removed: ${stats.epochFieldsRemoved}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\nErrors:', stats.errors.slice(0, 10));
}
