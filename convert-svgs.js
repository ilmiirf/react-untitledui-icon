const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directory containing SVG files
const svgDir = path.join(__dirname, 'src/svgs');
// Directory to output React components
const outputDir = path.join(__dirname, 'src/components/icons');

// Log paths for debugging
console.log('SVG Directory:', svgDir);
console.log('Output Directory:', outputDir);

// Ensure the SVG directory exists
if (!fs.existsSync(svgDir)) {
  console.error(`Directory not found: ${svgDir}`);
  console.log('Creating directory...');
  fs.mkdirSync(svgDir, { recursive: true });
}

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  console.log('Creating output directory...');
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all SVG files in the directory
const svgFiles = fs.readdirSync(svgDir).filter((file) => file.endsWith('.svg'));

if (svgFiles.length === 0) {
  console.error('No SVG files found in the directory:', svgDir);
  process.exit(1);
}

// Convert each SVG file to a React component
svgFiles.forEach((file) => {
  const svgFilePath = path.join(svgDir, file);
  const componentName = path.basename(file, '.svg').replace(/(^|-)(\w)/g, (match, p1, p2) => p2.toUpperCase()); // Convert kebab-case to PascalCase
  const outputFilePath = path.join(outputDir, `${componentName}.tsx`);

  console.log(`Processing ${file} -> ${outputFilePath}`);

  try {
    // Run SVGR to convert the SVG to a React component
    execSync(
      `npx @svgr/cli --typescript --icon --no-dimensions --out-dir ${outputDir} ${svgFilePath}`,
      { stdio: 'inherit' }
    );

    // Check if the file was generated
    const tempFilePath = path.join(outputDir, `${path.basename(file, '.svg')}.tsx`);
    if (fs.existsSync(tempFilePath)) {
      // Rename the file to PascalCase
      fs.renameSync(tempFilePath, outputFilePath);
      console.log(`Renamed ${tempFilePath} -> ${outputFilePath}`);
    } else {
      console.error(`File not found: ${tempFilePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

// Generate an index.ts file to export all components
const indexFilePath = path.join(outputDir, 'index.ts');
const iconExports = svgFiles
  .map((file) => {
    const componentName = path.basename(file, '.svg').replace(/(^|-)(\w)/g, (match, p1, p2) => p2.toUpperCase());
    return `export { default as ${componentName} } from './${componentName}';`;
  })
  .join('\n');

fs.writeFileSync(indexFilePath, iconExports);
console.log(`Generated ${indexFilePath}`);