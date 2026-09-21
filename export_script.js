import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/Growthora';

const filesToExport = [
  'src/components/GrowthoraAIChat/ChatInput.jsx',
  'src/components/GrowthoraAIChat/ChatMessages.jsx',
  'src/components/GrowthoraAIChat/GrowthoraAIChat.jsx',
  'src/components/GrowthoraAIChat/growthoraAIChat.css',
  'src/styles/index.css'
];

let mdContent = '';

for (const relPath of filesToExport) {
  const fullPath = path.join(projectRoot, relPath);
  let code = '';
  try {
    code = fs.readFileSync(fullPath, 'utf-8');
  } catch (err) {
    code = `Error reading file: ${err.message}`;
  }
  
  const ext = path.extname(relPath).slice(1);
  const lang = ext.toLowerCase() === 'jsx' ? 'jsx' : ext.toLowerCase() === 'css' ? 'css' : 'javascript';
  
  mdContent += `## ${fullPath}\n\n`;
  mdContent += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
}

fs.writeFileSync(path.join(projectRoot, 'popup-export.md'), mdContent, 'utf-8');
console.log('Export completed successfully.');
