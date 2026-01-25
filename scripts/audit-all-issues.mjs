import fs from 'fs';
import path from 'path';

const issues = [];

const badPatterns = [
  { pattern: /placeholder/gi, type: 'PLACEHOLDER' },
  { pattern: /lorem ipsum/gi, type: 'LOREM' },
  { pattern: /TODO:/g, type: 'TODO' },
  { pattern: /FIXME:/g, type: 'FIXME' },
  { pattern: /example\.com/gi, type: 'EXAMPLE_URL' },
  { pattern: /test@test/gi, type: 'TEST_EMAIL' },
  { pattern: /coming soon/gi, type: 'COMING_SOON' },
  { pattern: /under construction/gi, type: 'UNDER_CONSTRUCTION' },
  { pattern: /\[insert/gi, type: 'INSERT_PLACEHOLDER' },
  { pattern: /TBD\b/g, type: 'TBD' },
  { pattern: /XXX/g, type: 'XXX' },
  { pattern: /description:\s*['"][^'"]{0,25}['"]/g, type: 'SHORT_DESC' },
];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== 'api') {
      scanDir(full);
    } else if (item.name === 'page.tsx') {
      const content = fs.readFileSync(full, 'utf8');
      const fileIssues = [];
      
      for (const { pattern, type } of badPatterns) {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          // Filter out false positives
          if (type === 'PLACEHOLDER' && matches.every(m => m.includes('placeholder='))) continue;
          if (type === 'SHORT_DESC' && matches.every(m => m.includes('generateMetadata'))) continue;
          
          fileIssues.push({ type, count: matches.length, sample: matches[0].substring(0, 50) });
        }
      }
      
      if (fileIssues.length > 0) {
        issues.push({ file: full.replace(process.cwd() + '/', ''), issues: fileIssues });
      }
    }
  }
}

scanDir('./app');

console.log(`=== REMAINING ISSUES AUDIT ===\n`);
console.log(`Found ${issues.length} pages with potential issues:\n`);

// Group by issue type
const byType = {};
for (const { file, issues: fileIssues } of issues) {
  for (const issue of fileIssues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push({ file, sample: issue.sample });
  }
}

for (const [type, files] of Object.entries(byType)) {
  console.log(`\n${type} (${files.length} files):`);
  files.slice(0, 10).forEach(f => console.log(`  - ${f.file}`));
  if (files.length > 10) console.log(`  ... and ${files.length - 10} more`);
}

console.log(`\n=== SUMMARY ===`);
for (const [type, files] of Object.entries(byType)) {
  console.log(`${type}: ${files.length} files`);
}
