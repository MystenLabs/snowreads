#!/usr/bin/env node

/**
 * Extract old Walrus blob IDs to a separate mapping file
 *
 * This preserves the old blob IDs for Walruscan links,
 * while keeping the abs/*.json files clean.
 *
 * Creates: app/public/arxiv-to-blobid-map.json (published with site)
 *
 * Structure:
 * {
 *   "arxiv_id": {
 *     "pdfBlobId": "old_blob_id_for_pdf"
 *   }
 * }
 */

const fs = require('fs');
const path = require('path');

const ABS_DIR = path.join(__dirname, '../app/public/abs');
const OUTPUT_FILE = path.join(__dirname, '../app/public/arxiv-to-blobid-map.json');

console.log('Extracting Walrus metadata from abs files...\n');

// Get all abs files
const absFiles = fs.readdirSync(ABS_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${absFiles.length} abs files`);

const metadata = {};
let stats = {
  filesProcessed: 0,
  withBlobId: 0,
  withObjectId: 0,
  withEpochData: 0,
  errors: []
};

absFiles.forEach((absFile, index) => {
  try {
    const absPath = path.join(ABS_DIR, absFile);
    const content = fs.readFileSync(absPath, 'utf-8');
    const data = JSON.parse(content);

    const arxivId = absFile.replace('.json', '');
    const entry = {};

    // Extract old Walrus metadata
    if (data.blobId) {
      entry.pdfBlobId = data.blobId;
      stats.withBlobId++;
    }

    if (data.objectId) {
      entry.objectId = data.objectId;
      stats.withObjectId++;
    }

    if (data.registeredEpoch) {
      entry.registeredEpoch = data.registeredEpoch;
      stats.withEpochData++;
    }

    if (data.certifiedEpoch) entry.certifiedEpoch = data.certifiedEpoch;
    if (data.startEpoch) entry.startEpoch = data.startEpoch;
    if (data.endEpoch) entry.endEpoch = data.endEpoch;

    // Only add entry if it has any metadata
    if (Object.keys(entry).length > 0) {
      metadata[arxivId] = entry;
    }

    stats.filesProcessed++;

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

// Write metadata file in compact format (optimize file size)
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata));

console.log('\n✅ Extraction complete!');
console.log(`Metadata file: ${OUTPUT_FILE}`);
console.log(`Files processed: ${stats.filesProcessed}`);
console.log(`  - Papers with pdfBlobId: ${stats.withBlobId}`);
console.log(`  - Papers with objectId: ${stats.withObjectId}`);
console.log(`  - Papers with epoch data: ${stats.withEpochData}`);
console.log(`Total metadata entries: ${Object.keys(metadata).length}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\nErrors:', stats.errors.slice(0, 10));
}

console.log('\n📝 Note: This file is in app/public/ and WILL be published with the site.');
console.log('   After quilts deployment, query the chain for new blob IDs,');
console.log('   update this file, and re-publish (only this one file will be re-uploaded).');
