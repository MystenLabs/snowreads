#!/usr/bin/env node

/**
 * Create blob-id-to-path mapping from abs files
 *
 * Reads all abs JSON files and creates a mapping of:
 * - metadataBlobId -> abs file path
 * - pdfBlobId -> pdf file path (with version detection)
 */

const fs = require('fs');
const path = require('path');

const ABS_DIR = path.join(__dirname, '../app/public/abs');
const PDFS_DIR = path.join(__dirname, '../app/public/pdfs');
const OUTPUT_FILE = path.join(__dirname, '../blob-id-to-path-mapping.json');

console.log('Creating blob-id-to-path mapping...');
console.log('Reading abs files from:', ABS_DIR);
console.log('Checking PDFs in:', PDFS_DIR);

// Get all abs files
const absFiles = fs.readdirSync(ABS_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${absFiles.length} abs files`);

// Get all PDF files
const pdfFiles = fs.readdirSync(PDFS_DIR).filter(f => f.endsWith('.pdf'));
console.log(`Found ${pdfFiles.length} PDF files`);

// Create PDF lookup map (arxiv_id -> pdf filename)
const pdfLookup = {};
pdfFiles.forEach(pdfFile => {
  // Extract arxiv ID from filename (e.g., "2412.00023v1.pdf" -> "2412.00023")
  const match = pdfFile.match(/^(\d+\.\d+)/);
  if (match) {
    const arxivId = match[1];
    pdfLookup[arxivId] = pdfFile;
  }
});

const mapping = {
  metadata: {}, // metadataBlobId -> abs path
  pdfs: {},     // pdfBlobId -> pdf path
  stats: {
    totalAbs: 0,
    totalPdfs: 0,
    missingPdfs: [],
    errors: []
  }
};

// Process each abs file
absFiles.forEach((absFile, index) => {
  try {
    const absPath = path.join(ABS_DIR, absFile);
    const content = fs.readFileSync(absPath, 'utf-8');
    const data = JSON.parse(content);

    // Extract arxiv ID from filename
    const arxivId = absFile.replace('.json', '');

    // For metadata blob ID mapping (if we need it)
    // Note: The current index.json maps arxiv_id -> metadataBlobId
    // We'll need to reverse this later, but for now we focus on PDF mapping

    // Map PDF blob ID to PDF path
    if (data.blobId) {
      const pdfFileName = pdfLookup[arxivId];
      if (pdfFileName) {
        mapping.pdfs[data.blobId] = `/pdfs/${pdfFileName}`;
        mapping.stats.totalPdfs++;
      } else {
        mapping.stats.missingPdfs.push(arxivId);
      }
    }

    // Map arxiv ID to abs path (for later use)
    mapping.metadata[arxivId] = `/abs/${absFile}`;
    mapping.stats.totalAbs++;

    if ((index + 1) % 1000 === 0) {
      console.log(`Processed ${index + 1}/${absFiles.length} files...`);
    }
  } catch (error) {
    mapping.stats.errors.push({
      file: absFile,
      error: error.message
    });
  }
});

console.log('\nMapping complete!');
console.log(`Total abs files: ${mapping.stats.totalAbs}`);
console.log(`Total PDF mappings: ${mapping.stats.totalPdfs}`);
console.log(`Missing PDFs: ${mapping.stats.missingPdfs.length}`);
console.log(`Errors: ${mapping.stats.errors.length}`);

if (mapping.stats.missingPdfs.length > 0) {
  console.log('\nFirst 10 missing PDFs:', mapping.stats.missingPdfs.slice(0, 10));
}

if (mapping.stats.errors.length > 0) {
  console.log('\nErrors:', mapping.stats.errors);
}

// Write mapping to file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
console.log(`\nMapping saved to: ${OUTPUT_FILE}`);
