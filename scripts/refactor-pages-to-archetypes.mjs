#!/usr/bin/env node

/**
 * Automated page refactoring to use archetype system
 * 
 * Converts individual page implementations to archetype inheritance
 * Removes duplicate hero/content code
 * Ensures all pages use centralized content configuration
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'app');

// Import archetype route patterns
const routesJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts', 'archetypes.routes.json'), 'utf8')
);

function getAllPages() {
  const pages = [];
  
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx') {
        pages.push(fullPath);
      }
    }
  }
  
  walk(APP_DIR);
  return pages;
}

function fileToRoute(file) {
  const rel = path.relative(APP_DIR, file);
  const parts = rel.split(path.sep);
  parts.pop(); // Remove page.tsx
  
  const cleaned = parts
    .filter(seg => !seg.startsWith('(') || !seg.endsWith(')'))
    .filter(seg => !seg.startsWith('@'));
  
  return '/' + cleaned.join('/');
}

function getArchetypeForRoute(route) {
  const archetypes = routesJson?.archetypes || {};
  
  for (const [key, def] of Object.entries(archetypes)) {
    const matchers = (def.routeMatchers || []).map(s => new RegExp(s));
    if (matchers.some(r => r.test(route))) {
      return key;
    }
  }
  
  return null;
}

function needsRefactoring(content) {
  // Check if already using ArchetypeBase
  if (content.includes('ArchetypeBase') || content.includes('from \'@/components/archetypes')) {
    return false;
  }
  
  // Check if it's a simple redirect or special case
  if (content.includes('redirect(') && content.split('\n').length < 20) {
    return false;
  }
  
  return true;
}

function generateRefactoredPage(archetype, originalContent) {
  // Preserve server-side logic if present
  const hasServerLogic = /createServerClient|getServerSession|cookies\(|headers\(|redirect\(/.test(originalContent);
  
  let newContent = `import { ArchetypeBase } from '@/components/archetypes/ArchetypeBase';\n`;
  
  if (hasServerLogic) {
    newContent += `import { createServerClient } from '@/lib/supabase/server';\n`;
    newContent += `import { redirect } from 'next/navigation';\n`;
  }
  
  newContent += `\n`;
  
  // Extract and preserve metadata - handle multiline properly
  const metadataMatch = originalContent.match(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\n\};\s*\n/);
  if (metadataMatch) {
    newContent += metadataMatch[0] + '\n';
  } else {
    // Generate basic metadata if missing
    newContent += `export const metadata = {\n`;
    newContent += `  title: 'Page | Elevate For Humanity',\n`;
    newContent += `  description: 'Elevate For Humanity platform page',\n`;
    newContent += `};\n\n`;
  }
  
  // Generate page component
  if (hasServerLogic) {
    newContent += `export default async function Page() {\n`;
    newContent += `  const supabase = createServerClient();\n`;
    newContent += `  const { data: { user } } = await supabase.auth.getUser();\n`;
    newContent += `  \n`;
    newContent += `  if (!user) {\n`;
    newContent += `    redirect('/login');\n`;
    newContent += `  }\n`;
    newContent += `  \n`;
    newContent += `  return <ArchetypeBase archetype="${archetype}" />;\n`;
    newContent += `}\n`;
  } else {
    newContent += `export default function Page() {\n`;
    newContent += `  return <ArchetypeBase archetype="${archetype}" />;\n`;
    newContent += `}\n`;
  }
  
  return newContent;
}

console.log('🔄 Starting automated page refactoring...\n');

const allPages = getAllPages();
console.log(`Total pages found: ${allPages.length}\n`);

let refactored = 0;
let skipped = 0;
let errors = 0;
const unrefactoredFiles = [];

for (const file of allPages) {
  const route = fileToRoute(file);
  const archetype = getArchetypeForRoute(route);
  
  if (!archetype) {
    console.log(`⚠️  No archetype for ${route} - skipping`);
    skipped++;
    unrefactoredFiles.push({ file, route, reason: 'no_archetype' });
    continue;
  }
  
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    if (!needsRefactoring(content)) {
      console.log(`✓ ${route} - already refactored`);
      skipped++;
      continue;
    }
    
    const newContent = generateRefactoredPage(archetype, content);
    
    // Backup original
    const backupPath = file + '.backup';
    fs.writeFileSync(backupPath, content, 'utf8');
    
    // Write refactored version
    fs.writeFileSync(file, newContent, 'utf8');
    
    console.log(`✓ ${route} - refactored to ${archetype}`);
    refactored++;
    
  } catch (error) {
    console.error(`❌ ${route} - error: ${error.message}`);
    errors++;
    unrefactoredFiles.push({ file, route, reason: error.message });
  }
}

console.log('\n' + '='.repeat(60));
console.log('\nREFACTORING COMPLETE\n');
console.log(`Total pages: ${allPages.length}`);
console.log(`Refactored: ${refactored}`);
console.log(`Skipped (already done): ${skipped}`);
console.log(`Errors: ${errors}`);
console.log(`Remaining unrefactored: ${unrefactoredFiles.length}`);

if (unrefactoredFiles.length > 0) {
  console.log('\nUNREFACTORED FILES:');
  unrefactoredFiles.forEach(({ file, route, reason }) => {
    console.log(`  ${route} - ${reason}`);
  });
}

console.log('\n' + '='.repeat(60));

// Write report
const report = {
  timestamp: new Date().toISOString(),
  totalPages: allPages.length,
  refactored,
  skipped,
  errors,
  remaining: unrefactoredFiles.length,
  unrefactoredFiles
};

fs.writeFileSync(
  path.join(ROOT, 'refactor-report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log('\nReport written to: refactor-report.json\n');

if (unrefactoredFiles.length > 0) {
  process.exit(1);
}
