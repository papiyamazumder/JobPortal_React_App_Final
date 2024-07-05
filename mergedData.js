const fs = require('fs');
const path = require('path');

// Directory containing the JSON files
const dbDirectory = path.resolve(__dirname, 'server');

// Function to read a JSON file and return its content as an object
const readJSONFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading or parsing file: ${filePath}`, error);
    return null;
  }
};

// Initialize an empty object to hold the combined data
let mergedData = {};

// Read all files in the db directory
fs.readdirSync(dbDirectory).forEach(file => {
  if (path.extname(file) === '.json' && file !== 'db.json') {
    const filePath = path.join(dbDirectory, file);
    const jsonData = readJSONFile(filePath);
    if (jsonData) {
      const key = path.basename(file, '.json');
      mergedData[key] = jsonData[key] || jsonData;
    }
  }
});

// Write the combined data to db.json
const outputFilePath = path.join(dbDirectory, 'db.json');
fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2));
console.log(`db.json created successfully at ${outputFilePath}`);
