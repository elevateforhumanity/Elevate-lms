import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('📊 Analyzing 253 archived migration files...\n');

const archiveDir = 'supabase/migrations/archive-legacy';
const files = readdirSync(archiveDir).filter(f => f.endsWith('.sql')).sort();

const analysis = {
  totalFiles: files.length,
  totalSize: 0,
  categories: {
    core_tables: [],
    lms_courses: [],
    marketplace: [],
    hr_payroll: [],
    content: [],
    analytics: [],
    complete_schema: [],
    other: []
  },
  duplicateTables: {},
  uniqueTables: new Set()
};

// Analyze each file
for (const file of files) {
  const path = join(archiveDir, file);
  const content = readFileSync(path, 'utf8');
  const size = content.length;
  analysis.totalSize += size;
  
  // Categorize by filename patterns
  if (file.includes('complete_schema') || file.includes('complete_lms')) {
    analysis.categories.complete_schema.push({ file, size });
  } else if (file.includes('course') || file.includes('lms') || file.includes('lesson')) {
    analysis.categories.lms_courses.push({ file, size });
  } else if (file.includes('marketplace') || file.includes('creator') || file.includes('product')) {
    analysis.categories.marketplace.push({ file, size });
  } else if (file.includes('payroll') || file.includes('employee') || file.includes('hr')) {
    analysis.categories.hr_payroll.push({ file, size });
  } else if (file.includes('blog') || file.includes('reel') || file.includes('social')) {
    analysis.categories.content.push({ file, size });
  } else if (file.includes('analytics') || file.includes('tracking') || file.includes('metric')) {
    analysis.categories.analytics.push({ file, size });
  } else if (file.includes('profiles') || file.includes('users') || file.includes('auth')) {
    analysis.categories.core_tables.push({ file, size });
  } else {
    analysis.categories.other.push({ file, size });
  }
  
  // Find CREATE TABLE statements
  const createMatches = content.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?([a-z_]+)/gi);
  for (const match of createMatches) {
    const tableName = match[1].toLowerCase();
    analysis.uniqueTables.add(tableName);
    
    if (!analysis.duplicateTables[tableName]) {
      analysis.duplicateTables[tableName] = [];
    }
    analysis.duplicateTables[tableName].push(file);
  }
}

// Generate report
const report = {
  summary: {
    totalFiles: analysis.totalFiles,
    totalSizeMB: (analysis.totalSize / 1024 / 1024).toFixed(2),
    uniqueTables: analysis.uniqueTables.size,
    tablesWithDuplicates: Object.keys(analysis.duplicateTables).filter(t => 
      analysis.duplicateTables[t].length > 1
    ).length
  },
  categories: {},
  topDuplicates: [],
  recommendations: []
};

// Category summaries
for (const [category, files] of Object.entries(analysis.categories)) {
  if (files.length > 0) {
    report.categories[category] = {
      count: files.length,
      sizeMB: (files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2),
      files: files.map(f => f.file)
    };
  }
}

// Top duplicates
const duplicates = Object.entries(analysis.duplicateTables)
  .filter(([_, files]) => files.length > 1)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 20);

report.topDuplicates = duplicates.map(([table, files]) => ({
  table,
  count: files.length,
  files: files.slice(0, 5)
}));

// Recommendations
if (report.categories.complete_schema) {
  report.recommendations.push({
    category: 'complete_schema',
    action: 'DELETE',
    reason: 'These files duplicate ALL tables. Keep only the latest one for reference.',
    files: report.categories.complete_schema.files
  });
}

if (report.categories.lms_courses && report.categories.lms_courses.count > 10) {
  report.recommendations.push({
    category: 'lms_courses',
    action: 'CONSOLIDATE',
    reason: `${report.categories.lms_courses.count} files for LMS courses. Consolidate into one reference file.`,
    count: report.categories.lms_courses.count
  });
}

// Save report
writeFileSync('migration-archive-analysis.json', JSON.stringify(report, null, 2));

// Print summary
console.log('📋 Summary:');
console.log(`   Total files: ${report.summary.totalFiles}`);
console.log(`   Total size: ${report.summary.totalSizeMB} MB`);
console.log(`   Unique tables: ${report.summary.uniqueTables}`);
console.log(`   Tables with duplicates: ${report.summary.tablesWithDuplicates}\n`);

console.log('📁 Categories:');
for (const [category, data] of Object.entries(report.categories)) {
  console.log(`   ${category}: ${data.count} files (${data.sizeMB} MB)`);
}

console.log('\n🔄 Top Duplicate Tables:');
report.topDuplicates.slice(0, 10).forEach(({ table, count }) => {
  console.log(`   ${table}: created in ${count} files`);
});

console.log('\n💡 Recommendations:');
report.recommendations.forEach((rec, i) => {
  console.log(`   ${i + 1}. ${rec.action} ${rec.category}`);
  console.log(`      ${rec.reason}`);
});

console.log('\n✅ Full report saved to migration-archive-analysis.json');
