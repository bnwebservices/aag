const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const fontRegex = /font-\['Manrope'\]/g;
const replacement = "font-['Noto_Sans','Krub',sans-serif]";

const fontRegex2 = /font-\['Raleway','Manrope',sans-serif\]/g;

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    if (fontRegex.test(content)) {
      content = content.replace(fontRegex, replacement);
      changed = true;
    }
    
    if (fontRegex2.test(content)) {
      content = content.replace(fontRegex2, replacement);
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
