#!/usr/bin/env node

/**
 * Clean up collections.json - remove metadataBlobId fields
 *
 * This removes obsolete metadataBlobId fields from all papers in collections.json
 * and converts to compact JSON format.
 */

const fs = require('fs');
const path = require('path');

const COLLECTIONS_FILE = path.join(__dirname, '../app/public/collections.json');

console.log('Cleaning up collections.json...\n');

try {
  // Read the collections file
  const content = fs.readFileSync(COLLECTIONS_FILE, 'utf-8');
  const data = JSON.parse(content);

  let stats = {
    collectionsProcessed: 0,
    papersProcessed: 0,
    metadataBlobIdsRemoved: 0
  };

  // Process each collection
  Object.keys(data).forEach(key => {
    if (key === 'size') return; // Skip the top-level size field

    const collection = data[key];
    if (collection.papers && Array.isArray(collection.papers)) {
      stats.collectionsProcessed++;

      collection.papers.forEach(paper => {
        stats.papersProcessed++;

        if (paper.metadataBlobId !== undefined) {
          delete paper.metadataBlobId;
          stats.metadataBlobIdsRemoved++;
        }
      });
    }
  });

  // Write back to file in compact format
  fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(data));

  console.log('✅ Cleanup complete!');
  console.log(`Collections processed: ${stats.collectionsProcessed}`);
  console.log(`Papers processed: ${stats.papersProcessed}`);
  console.log(`metadataBlobId fields removed: ${stats.metadataBlobIdsRemoved}`);
  console.log(`\nFile: ${COLLECTIONS_FILE}`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
