#!/usr/bin/env node

/**
 * Update abs JSON files to add pdfPath field
 *
 * For each abs file:
 * 1. Read the file
 * 2. Look up the PDF path from the blob mapping
 * 3. Add pdfPath field
 * 4. Write back to file
 */

const fs = require('fs');
const path = require('path');

const ABS_DIR = path.join(__dirname, '../app/public/abs');
const PDFS_DIR = path.join(__dirname, '../app/public/pdfs');
const MAPPING_FILE = path.join(__dirname, '../blob-id-to-path-mapping.json');

console.log('Updating abs files with pdfPath...');

// Load the blob mapping
let mapping;
try {
  mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  console.log(`Loaded mapping with ${Object.keys(mapping.pdfs).length} PDF entries`);
} catch (error) {
  console.error('Error loading mapping file:', error.message);
  process.exit(1);
}

// Get all PDF files for lookup
const pdfFiles = fs.readdirSync(PDFS_DIR).filter(f => f.endsWith('.pdf'));
const pdfLookup = {};
pdfFiles.forEach(pdfFile => {
  const match = pdfFile.match(/^(\d+\.\d+)/);
  if (match) {
    const arxivId = match[1];
    pdfLookup[arxivId] = pdfFile;
  }
});

// Get all abs files
const absFiles = fs.readdirSync(ABS_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${absFiles.length} abs files`);

let stats = {
  filesProcessed: 0,
  pdfPathsAdded: 0,
  missingPdfs: [],
  errors: []
};

// Process each abs file
absFiles.forEach((absFile, index) => {
  try {
    const absPath = path.join(ABS_DIR, absFile);
    const content = fs.readFileSync(absPath, 'utf-8');
    const data = JSON.parse(content);

    // Extract arxiv ID from filename
    const arxivId = absFile.replace('.json', '');

    // Get PDF path - try from mapping first, then from lookup
    let pdfPath = null;

    if (data.blobId && mapping.pdfs[data.blobId]) {
      pdfPath = mapping.pdfs[data.blobId];
    } else if (pdfLookup[arxivId]) {
      pdfPath = `/pdfs/${pdfLookup[arxivId]}`;
    }

    if (pdfPath) {
      data.pdfPath = pdfPath;
      stats.pdfPathsAdded++;

      // Write back to file in compact format (no pretty-printing)
      fs.writeFileSync(absPath, JSON.stringify(data));
      stats.filesProcessed++;
    } else {
      stats.missingPdfs.push(arxivId);
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

console.log('\nUpdate complete!');
console.log(`Files processed: ${stats.filesProcessed}`);
console.log(`PDF paths added: ${stats.pdfPathsAdded}`);
console.log(`Missing PDFs: ${stats.missingPdfs.length}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.missingPdfs.length > 0) {
  console.log('\nFirst 10 missing PDFs:', stats.missingPdfs.slice(0, 10));
}

if (stats.errors.length > 0) {
  console.log('\nErrors:', stats.errors);
}
