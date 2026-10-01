const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\g6438\\.gemini\\antigravity\\brain\\18f14558-10d8-4234-990e-28c934b8abfa\\scratch\\live.html';
const projectImgDir = path.join('d:\\ganpati packages', 'public', 'images');

if (!fs.existsSync(projectImgDir)) {
  fs.mkdirSync(projectImgDir, { recursive: true });
}

const html = fs.readFileSync(htmlPath, 'utf8');
const imgTags = html.match(/<img[^>]+>/g) || [];
console.log('Total img tags:', imgTags.length);

const renames = [
  'logo',
  'hero',
  'elite-1', 'elite-2', 'elite-3', 'elite-4', 'elite-5', 'elite-6', 'elite-7',
  'signature-1', 'signature-2', 'signature-3', 'signature-4', 'signature-5',
  'signature-6', 'signature-7', 'signature-8', 'signature-9',
  'lightbox-placeholder'
];

let count = 0;
imgTags.forEach((tag, idx) => {
  const srcMatch = tag.match(/src=["'](data:image\/(\w+);base64,([^"']+))["']/);
  if (srcMatch) {
    const extension = srcMatch[2] || 'jpeg';
    const base64Data = srcMatch[3];
    const name = renames[count] || `img_${count + 1}`;
    const filename = `${name}.${extension}`;
    fs.writeFileSync(path.join(projectImgDir, filename), Buffer.from(base64Data, 'base64'));
    
    const altMatch = tag.match(/alt=["']([^"']*)["']/);
    const alt = altMatch ? altMatch[1] : '';
    console.log(`Saved ${filename} -> alt="${alt}"`);
    count++;
  }
});
console.log(`Done. Saved ${count} images.`);
