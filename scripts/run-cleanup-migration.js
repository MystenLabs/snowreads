#!/usr/bin/env node

/**
 * Master script for Quilts migration cleanup
 *
 * This script runs all cleanup operations in the correct order:
 * 1. Extract old Walrus blob IDs to arxiv-to-blobid-map.json
 * 2. Clean up abs/*.json files (remove old blob IDs, compact JSON)
 * 3. Clean up subcategory JSON files (remove old blob IDs, compact JSON)
 *
 * Run this ONCE before the quilts deployment to prepare clean files.
 */

const { execSync } = require('child_process');
const path = require('path');

const SCRIPTS_DIR = __dirname;

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║       Snowreads Quilts Migration - Cleanup Process        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const scripts = [
  {
    name: 'Extract Walrus Metadata',
    file: 'extract-blob-metadata.js',
    description: 'Extracting old blob IDs to arxiv-to-blobid-map.json...'
  },
  {
    name: 'Clean abs/*.json Files',
    file: 'cleanup-old-blob-ids.js',
    description: 'Removing old blob IDs from abs files...'
  },
  {
    name: 'Clean Subcategory JSONs',
    file: 'cleanup-subcategory-blob-ids.js',
    description: 'Removing old blob IDs from subcategory files...'
  }
];

function runScript(script) {
  console.log(`\n┌─────────────────────────────────────────────────────────┐`);
  console.log(`│ ${script.name.padEnd(55)} │`);
  console.log(`└─────────────────────────────────────────────────────────┘`);
  console.log(`${script.description}\n`);

  try {
    const scriptPath = path.join(SCRIPTS_DIR, script.file);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    console.log(`\n✅ ${script.name} completed successfully!`);
  } catch (error) {
    console.error(`\n❌ ${script.name} failed!`);
    console.error(error.message);
    process.exit(1);
  }
}

// Run all scripts in sequence
scripts.forEach(runScript);

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║              🎉 Cleanup Complete! 🎉                       ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('\nNext steps:');
console.log('1. Test the app locally (pnpm dev in app/ folder)');
console.log('2. Build for production (pnpm build)');
console.log('3. Deploy with quilts (walrus-sites publish)');
console.log('\nNote: arxiv-to-blobid-map.json in app/public/ will be published');
console.log('      After deployment: query chain, update this file, re-publish (1 file only)\n');
