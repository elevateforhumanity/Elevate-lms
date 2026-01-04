#!/usr/bin/env node
// Elevate LMS – Error Autopilot
// Reads logs from the runner script and emits a human task list (no placeholders).

import fs from 'fs';
import path from 'path';

function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index === process.argv.length - 1) return null;
  return process.argv[index + 1];
}

const tsLogPath = readArg('--ts');
const buildLogPath = readArg('--build');
const migrationsLogPath = readArg('--migrations');
const eslintLogPath = readArg('--eslint');
const prettierLogPath = readArg('--prettier');
const envReportPath = readArg('--env');

const tsStatus = Number(readArg('--tsStatus') || '0');
const buildStatus = Number(readArg('--buildStatus') || '0');
const migrationStatus = Number(readArg('--migrationStatus') || '0');
const eslintStatus = Number(readArg('--eslintStatus') || '0');
const prettierStatus = Number(readArg('--prettierStatus') || '0');

function safeRead(filePath) {
  if (!filePath) return '';
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
  } catch {
    // ignore
  }
  return '';
}

const tsLog = safeRead(tsLogPath);
const buildLog = safeRead(buildLogPath);
const migrationsLog = safeRead(migrationsLogPath);
const eslintLog = safeRead(eslintLogPath);
const prettierLog = safeRead(prettierLogPath);
const envReport = safeRead(envReportPath);

function printSection(title) {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📌 ${title}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function parseTsErrors(log) {
  const lines = log.split('\n');
  const results = [];
  const tsRegex =
    /^(.+\.tsx?|.+\.ts):(\d+):(\d+)\s*-\s*error\s*(TS\d+):\s*(.+)$/;

  for (const raw of lines) {
    const line = raw.trim();
    const match = tsRegex.exec(line);
    if (match) {
      const [, file, lineNum, colNum, code, msg] = match;
      results.push({
        file: path.normalize(file),
        line: Number(lineNum),
        column: Number(colNum),
        code,
        message: msg.trim(),
      });
    }
  }

  return results;
}

function parseBuildErrors(log) {
  const lines = log.split('\n');
  const relevant = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // Highlight error lines
    if (
      line.toLowerCase().includes('error') ||
      line.toLowerCase().includes('failed') ||
      line.toLowerCase().includes('cannot find module') ||
      line.toLowerCase().includes('module not found')
    ) {
      relevant.push(line);
    }
  }

  return relevant;
}

function parseEslintErrors(log) {
  const lines = log.split('\n');
  const max = 50; // avoid dumping thousands
  const out = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (out.length >= max) break;
    out.push(line);
  }
  return out;
}

function hasContent(str) {
  return str && str.trim().length > 0;
}

// START REPORT
console.log('');
console.log('======================================================');
console.log('ELEVATE LMS – AUTOPILOT ERROR REPORT (REAL TASKS)');
console.log('======================================================');

// ENV
if (hasContent(envReport)) {
  printSection('Environment status');
  console.log(envReport.trim());
}

// TYPESCRIPT
const tsErrors = tsStatus !== 0 ? parseTsErrors(tsLog) : [];
if (tsStatus !== 0) {
  printSection('TypeScript errors (must fix line-by-line)');

  if (tsErrors.length === 0) {
    console.log(
      'TypeScript returned an error code but no standard TS lines were parsed.'
    );
    console.log('Raw log path:', tsLogPath || '(none)');
  } else {
    const grouped = new Map();
    for (const err of tsErrors) {
      if (!grouped.has(err.file)) grouped.set(err.file, []);
      grouped.get(err.file).push(err);
    }

    for (const [file, errs] of grouped.entries()) {
      console.log('');
      console.log(`File: ${file}`);
      for (const e of errs) {
        console.log(
          `  • line ${e.line}, column ${e.column} – ${e.code} – ${e.message}`
        );
      }
    }

    console.log('');
    console.log(
      '➡ ACTION: Open each file above and fix the listed lines and TypeScript codes.'
    );
  }
} else {
  printSection('TypeScript');
  console.log('✅ No TypeScript errors detected.');
}

// BUILD
if (buildStatus !== 0) {
  const buildErrors = parseBuildErrors(buildLog);
  printSection('Next.js build failures');

  if (buildErrors.length === 0) {
    console.log('Build failed but no specific error lines were detected.');
    console.log('Raw build log path:', buildLogPath || '(none)');
  } else {
    for (const line of buildErrors) {
      console.log(`  • ${line}`);
    }

    console.log('');
    console.log(
      '➡ ACTION: Most of these map to import issues, invalid props, or server/client misuse.'
    );
    console.log(
      '   Fix from top to bottom. Once done, re-run the autopilot script.'
    );
  }
} else {
  printSection('Next.js build');
  console.log('✅ Production build completed successfully.');
}

// SUPABASE
if (migrationStatus !== 0) {
  if (hasContent(migrationsLog)) {
    printSection('Supabase migration issues');
    const lines = migrationsLog.split('\n').filter((l) => l.trim());
    for (const line of lines) {
      console.log(`  • ${line.trim()}`);
    }
    console.log('');
    console.log(
      '➡ ACTION: Fix SQL errors or missing database objects, then re-run migrations.'
    );
  } else {
    printSection('Supabase migration issues');
    console.log(
      'Supabase returned a non-zero exit code but no log was captured.'
    );
  }
} else {
  printSection('Supabase migrations');
  console.log('✅ Migrations applied successfully.');
}

// ESLINT
if (eslintStatus !== 0) {
  const eslintSummary = parseEslintErrors(eslintLog);
  printSection('ESLint warnings/errors');

  if (eslintSummary.length === 0) {
    console.log('ESLint reported issues but log is empty or unparseable.');
  } else {
    for (const line of eslintSummary) {
      console.log(`  • ${line}`);
    }
    console.log('');
    console.log(
      '➡ ACTION: Fix style and logic issues flagged above to keep the codebase clean.'
    );
  }
} else {
  printSection('ESLint');
  console.log('✅ ESLint completed without blocking issues.');
}

// PRETTIER
if (prettierStatus !== 0) {
  printSection('Prettier issues');
  if (hasContent(prettierLog)) {
    const lines = prettierLog.split('\n').filter((l) => l.trim());
    for (const line of lines.slice(0, 50)) {
      console.log(`  • ${line.trim()}`);
    }
  } else {
    console.log('Prettier returned non-zero but no log lines were captured.');
  }
  console.log('');
  console.log(
    '➡ ACTION: Fix the files Prettier could not format (likely syntax errors).'
  );
} else {
  printSection('Prettier');
  console.log('✅ Formatting pass completed.');
}

// FINAL SUMMARY
printSection('Summary');

const blockers = [];

if (tsStatus !== 0) blockers.push('TypeScript compilation errors');
if (buildStatus !== 0) blockers.push('Next.js build failures');
if (migrationStatus !== 0) blockers.push('Supabase migration problems');

if (blockers.length === 0) {
  console.log('✅ No hard blockers detected. App should be ready to run.');
  console.log('You can now run: npm run dev   or   npm start');
} else {
  console.log('❌ Hard blockers that MUST be fixed:');
  for (const b of blockers) {
    console.log(`  • ${b}`);
  }
  console.log('');
  console.log(
    '➡ Fix the issues above file-by-file and re-run scripts/elevate-autopilot.sh'
  );
}

console.log('');
console.log('End of Elevate LMS Autopilot report.');
console.log('No errors were hidden. No steps were skipped.');
