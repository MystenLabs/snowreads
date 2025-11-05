#!/usr/bin/env node

/**
 * Restore subcategory JSONs from backup and update with pdfPath/absPath
 *
 * Strategy:
 * 1. Copy original subcategory JSONs from dist_bak/papers/
 * 2. For each paper, read the corresponding abs file to get pdfPath
 * 3. Add pdfPath and absPath fields
 * 4. Remove metadataBlobId field
 * 5. Save in compact JSON format
 */

const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../app/dist_bak/papers');
const OUTPUT_DIR = path.join(__dirname, '../app/public/papers');
const ABS_DIR = path.join(__dirname, '../backup_full_data/abs'); // Use full backup abs files

console.log('============================================================');
console.log('Restoring subcategory JSONs from backup');
console.log('============================================================\n');

// Check if backup exists
if (!fs.existsSync(BACKUP_DIR)) {
  console.error('❌ Error: Backup directory not found:', BACKUP_DIR);
  process.exit(1);
}

if (!fs.existsSync(ABS_DIR)) {
  console.error('❌ Error: Abs directory not found:', ABS_DIR);
  console.error('   Make sure backup_full_data/abs exists');
  process.exit(1);
}

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
  papersProcessed: 0,
  papersUpdated: 0,
  metadataBlobIdRemoved: 0,
  pdfPathsAdded: 0,
  absPathsAdded: 0,
  missingAbs: [],
  errors: []
};

// Process each backup file
backupFiles.forEach(backupFile => {
  try {
    // Read backup file
    const content = fs.readFileSync(backupFile, 'utf-8');
    const papers = JSON.parse(content);

    if (!Array.isArray(papers)) {
      console.warn(`Skipping ${backupFile} - not an array`);
      return;
    }

    let fileModified = false;

    // Process each paper
    papers.forEach((paper, index) => {
      stats.papersProcessed++;

      const arxivId = paper.id;
      if (!arxivId) {
        stats.errors.push({
          file: backupFile,
          error: `Paper at index ${index} has no ID`
        });
        return;
      }

      // Remove metadataBlobId if present
      if (paper.metadataBlobId !== undefined) {
        delete paper.metadataBlobId;
        stats.metadataBlobIdRemoved++;
        fileModified = true;
      }

      // Read abs file to get pdfPath
      const absPath = path.join(ABS_DIR, `${arxivId}.json`);
      if (!fs.existsSync(absPath)) {
        stats.missingAbs.push(arxivId);
        // Still add absPath even if abs file missing
        paper.absPath = `/abs/${arxivId}.json`;
        stats.absPathsAdded++;
        fileModified = true;
        return;
      }

      try {
        const absData = JSON.parse(fs.readFileSync(absPath, 'utf-8'));

        // Get pdfPath from abs file
        if (absData.pdfPath) {
          paper.pdfPath = absData.pdfPath;
          stats.pdfPathsAdded++;
          fileModified = true;
        }

        // Add absPath
        paper.absPath = `/abs/${arxivId}.json`;
        stats.absPathsAdded++;
        stats.papersUpdated++;
        fileModified = true;

      } catch (error) {
        stats.errors.push({
          file: backupFile,
          paper: arxivId,
          error: `Error reading abs file: ${error.message}`
        });
      }
    });

    if (fileModified) {
      // Determine output path (preserve directory structure)
      const relativePath = path.relative(BACKUP_DIR, backupFile);
      const outputPath = path.join(OUTPUT_DIR, relativePath);

      // Create output directory if needed
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write compact JSON
      fs.writeFileSync(outputPath, JSON.stringify(papers));
      stats.filesProcessed++;
    }

    if (stats.filesProcessed % 20 === 0 && stats.filesProcessed > 0) {
      console.log(`  Processed ${stats.filesProcessed}/${backupFiles.length} files...`);
    }

  } catch (error) {
    stats.errors.push({
      file: backupFile,
      error: error.message
    });
  }
});

console.log('\n============================================================');
console.log('✅ Restoration complete!');
console.log('============================================================');
console.log(`Files processed: ${stats.filesProcessed}`);
console.log(`Papers processed: ${stats.papersProcessed}`);
console.log(`Papers updated: ${stats.papersUpdated}`);
console.log(`  - metadataBlobId removed: ${stats.metadataBlobIdRemoved}`);
console.log(`  - pdfPath added: ${stats.pdfPathsAdded}`);
console.log(`  - absPath added: ${stats.absPathsAdded}`);
console.log(`Missing abs files: ${stats.missingAbs.length}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.missingAbs.length > 0) {
  console.log('\n⚠️  First 10 papers with missing abs files:');
  console.log(stats.missingAbs.slice(0, 10).join(', '));
}

if (stats.errors.length > 0) {
  console.log('\n❌ Errors:');
  stats.errors.slice(0, 10).forEach(err => {
    console.log(`  ${err.file}: ${err.error}`);
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
