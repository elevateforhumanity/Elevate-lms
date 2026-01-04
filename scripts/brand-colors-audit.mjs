#!/usr/bin/env node
import { readFile } from 'fs/promises';

console.log('='.repeat(80));
console.log('BRAND COLORS AUDIT - Red, Blue, White Only');
console.log('='.repeat(80));
console.log('');

const files = [
  'app/page.tsx',
  'app/globals.css',
  'components/site/SiteFooter.tsx',
  'components/site/SiteHeader.tsx',
  'tailwind.config.js'
];

console.log('Current Brand Colors to Replace:');
console.log('');
console.log('❌ BLACK (bg-black, text-black, bg-slate-900)');
console.log('❌ GRAY (bg-gray-*, text-gray-*, bg-slate-*)');
console.log('');
console.log('✅ TARGET COLORS:');
console.log('  • Red: #E63946 (efh-red)');
console.log('  • Blue: #1D3557 (efh-blue)');
console.log('  • White: #FFFFFF');
console.log('  • Orange: #F77F00 (efh-orange) - accent');
console.log('');
console.log('✅ FONT: Times New Roman (serif)');
console.log('');
console.log('='.repeat(80));
console.log('FILES TO UPDATE:');
console.log('='.repeat(80));
console.log('');

for (const file of files) {
  try {
    const content = await readFile(file, 'utf-8');
    const blackCount = (content.match(/bg-black|text-black|bg-slate-900/g) || []).length;
    const grayCount = (content.match(/bg-gray|text-gray|bg-slate/g) || []).length;
    
    if (blackCount > 0 || grayCount > 0) {
      console.log(`📄 ${file}`);
      console.log(`   Black: ${blackCount} instances`);
      console.log(`   Gray: ${grayCount} instances`);
      console.log('');
    }
  } catch (err) {
    console.log(`⚠️  ${file} - not found`);
  }
}

console.log('='.repeat(80));
console.log('RECOMMENDATION:');
console.log('='.repeat(80));
console.log('');
console.log('This is a MAJOR rebrand. Estimated time: 30-45 minutes');
console.log('');
console.log('Steps:');
console.log('1. Update globals.css with Times New Roman font');
console.log('2. Replace all black backgrounds with blue (#1D3557)');
console.log('3. Replace all black text with blue (#1D3557)');
console.log('4. Replace gray backgrounds with white or light blue');
console.log('5. Replace gray text with blue or red');
console.log('6. Test all pages for readability');
console.log('7. Adjust contrast where needed');
console.log('');
console.log('Ready to proceed? This will change the entire site appearance.');
console.log('');
