const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'projects');
const files = ['portfolio.svg', 'rhmetrics.svg', 'myjoboard.svg'];

async function convert() {
  try {
    for (const file of files) {
      const inPath = path.join(srcDir, file);
      const outName = file.replace(/\.svg$/i, '.png');
      const outPath = path.join(srcDir, outName);
      if (!fs.existsSync(inPath)) {
        console.warn('Skipping missing file:', inPath);
        continue;
      }
      console.log('Converting', inPath, '->', outPath);
      const svgBuffer = fs.readFileSync(inPath);
      await sharp(svgBuffer)
        .png({ quality: 90 })
        .toFile(outPath);
      console.log('Wrote', outPath);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

convert();
