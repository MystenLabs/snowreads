import * as fs from 'fs';
import * as path from 'path';

const MONTH = "2408_";
// Function to read a JSON file and return its parsed content
function readJsonFile(filePath: string): any {
  const jsonData = fs.readFileSync(filePath, 'utf8');  // Read the file
  return JSON.parse(jsonData);  // Parse and return the JSON content
}

// Function to merge all JSON files into a single object
function mergeJsonFiles(directory: string): object {
  const combinedObject: any = {};

  // Read all files in the directory
  const files = fs.readdirSync(directory);

  // Filter files that match the pattern "2407_*.json"
  const jsonFiles = files.filter(file => file.startsWith(MONTH) && file.endsWith('.json'));

  // Merge the content of all the filtered JSON files
  jsonFiles.forEach(file => {
    const filePath = path.join(directory, file);
    const jsonData = readJsonFile(filePath);
    Object.assign(combinedObject, jsonData);  // Merge the file's content into combinedObject
  });

  return combinedObject;
}

// Directory where your JSON files are located
const jsonDirectory = path.join(__dirname, "..");

// Combine the JSON files into one object
const combinedJson = mergeJsonFiles(jsonDirectory);

// Write the combined object to a new JSON file
fs.writeFileSync(path.join(__dirname, 'combined-2408.json'), JSON.stringify(combinedJson, null, 2), 'utf8');

console.log('All JSON files have been merged into combined.json');
