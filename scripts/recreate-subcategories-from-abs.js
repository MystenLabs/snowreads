#!/usr/bin/env node

/**
 * Recreate subcategory JSONs from abs files
 *
 * Strategy:
 * 1. Read original subcategory structure from dist_bak/papers/
 * 2. For each paper ID in the backup, check if abs file exists in backup_full_data/abs/
 * 3. Extract necessary fields from abs file (id, title, authorsParsed, timestamp, pdfPath)
 * 4. Add absPath
 * 5. Save in compact JSON format
 */

const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../app/dist_bak_/papers');
const OUTPUT_DIR = path.join(__dirname, '../app/public/papers');
const ABS_DIR = path.join(__dirname, '../backup_full_data/abs');

console.log('============================================================');
console.log('Recreating subcategory JSONs from abs files');
console.log('============================================================\n');

// Find all JSON files recursively
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

const backupFiles = findJsonFiles(BACKUP_DIR);
console.log(`Found ${backupFiles.length} backup subcategory files\n`);

let stats = {
  filesProcessed: 0,
  papersInBackup: 0,
  papersIncluded: 0,
  papersExcluded: 0,
  errors: []
};

// Process each backup file
backupFiles.forEach(backupFile => {
  try {
    // Read backup file to get paper IDs
    const content = fs.readFileSync(backupFile, 'utf-8');
    const backupPapers = JSON.parse(content);

    if (!Array.isArray(backupPapers)) {
      console.warn(`Skipping ${backupFile} - not an array`);
      return;
    }

    const updatedPapers = [];

    // For each paper ID, read from abs file
    backupPapers.forEach(backupPaper => {
      stats.papersInBackup++;

      const arxivId = backupPaper.id;
      if (!arxivId) {
        stats.errors.push({ file: backupFile, error: 'Paper has no ID' });
        return;
      }

      // Check if abs file exists
      const absPath = path.join(ABS_DIR, `${arxivId}.json`);
      if (!fs.existsSync(absPath)) {
        // Paper not in our dataset - exclude
        stats.papersExcluded++;
        return;
      }

      try {
        const absData = JSON.parse(fs.readFileSync(absPath, 'utf-8'));

        // Create paper entry with fields needed for subcategory JSON
        const paper = {
          id: absData.id,
          title: absData.title,
          authorsParsed: absData.authorsParsed,
          timestamp: absData.timestamp,
          pdfPath: absData.pdfPath,
          absPath: `/abs/${arxivId}.json`
        };

        updatedPapers.push(paper);
        stats.papersIncluded++;

      } catch (error) {
        stats.errors.push({
          file: backupFile,
          paper: arxivId,
          error: `Error reading abs: ${error.message}`
        });
      }
    });

    // Write output file (preserve directory structure)
    const relativePath = path.relative(BACKUP_DIR, backupFile);
    const outputPath = path.join(OUTPUT_DIR, relativePath);

    // Create output directory
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write compact JSON
    fs.writeFileSync(outputPath, JSON.stringify(updatedPapers));
    stats.filesProcessed++;

    if (stats.filesProcessed % 20 === 0) {
      console.log(`  Processed ${stats.filesProcessed}/${backupFiles.length} files...`);
    }

  } catch (error) {
    stats.errors.push({ file: backupFile, error: error.message });
  }
});

console.log('\n============================================================');
console.log('✅ Recreation complete!');
console.log('============================================================');
console.log(`Files processed: ${stats.filesProcessed}`);
console.log(`Papers in backup: ${stats.papersInBackup}`);
console.log(`  - Included (exist in dataset): ${stats.papersIncluded}`);
console.log(`  - Excluded (not in dataset): ${stats.papersExcluded}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\n❌ First 10 errors:');
  stats.errors.slice(0, 10).forEach(err => {
    console.log(`  ${err.file || 'Unknown'}: ${err.error}`);
  });
}

console.log('\n📝 Next steps:');
console.log('1. Restore full PDFs and abs:');
console.log('   cp -r backup_full_data/pdfs backup_full_data/abs app/public/');
console.log('2. Build for mainnet:');
console.log('   cd app/ && pnpm build');
console.log('3. Deploy with quilts:');
console.log('   walrus-sites publish --network mainnet dist/');
console.log('');
