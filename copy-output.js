const fs = require('fs');
const path = require('path');

const sourceDir = 'dist';
const targetDir = 'output';
const filesToCopy = [
  'bluemap.mjs',
  'bluemap.mjs.map',
  'bluemap.umd.js',
  'bluemap.umd.js.map'
];

// Create output directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// Copy files
filesToCopy.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    if (!fs.existsSync(sourcePath)) {
      console.error(`Error: Source file not found: ${sourcePath}`);
      return;
    }
    
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied: ${file}`);
  } catch (error) {
    console.error(`Error copying ${file}: ${error.message}`);
  }
});

console.log('Copy operation completed.');