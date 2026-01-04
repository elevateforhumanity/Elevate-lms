#!/usr/bin/env node

/**
 * Production Readiness Validation Script
 * Comprehensive assessment for deployment readiness
 */

import fs from 'fs';
import { spawn } from 'child_process';


const results = {
  critical: [],
  warnings: [],
  passed: [],
  info: [],
};

// Utility functions
function checkFile(path, description) {
  try {
    fs.accessSync(path);
    results.passed.push(`✅ ${description}`);
    return true;
  } catch {
    results.critical.push(`❌ ${description} (${path} not found)`);
    return false;
  }
}

function checkContent(path, pattern, description) {
  try {
    const content = fs.readFileSync(path, 'utf8');
    if (content.includes(pattern)) {
      results.passed.push(`✅ ${description}`);
      return true;
    } else {
      results.warnings.push(`⚠️  ${description} not found in ${path}`);
      return false;
    }
  } catch {
    results.critical.push(`❌ Cannot read ${path} for ${description}`);
    return false;
  }
}

function runCommand(command, args = [], description) {
  return new Promise((resolve) => {
    const proc = spawn(command, args, { stdio: 'pipe' });
    let output = '';
    let errorOutput = '';

    proc.stdout.on('data', (data) => (output += data.toString()));
    proc.stderr.on('data', (data) => (errorOutput += data.toString()));

    proc.on('close', (code) => {
      if (code === 0) {
        results.passed.push(`✅ ${description}`);
        resolve({ success: true, output });
      } else {
        results.warnings.push(`⚠️  ${description} failed (exit code ${code})`);
        if (errorOutput) {
          results.info.push(`   Error: ${errorOutput.slice(0, 200)}...`);
        }
        resolve({ success: false, output: errorOutput });
      }
    });

    proc.on('error', (err) => {
      results.critical.push(`❌ ${description} - ${err.message}`);
      resolve({ success: false, output: err.message });
    });
  });
}

// 1. File Structure Validation
checkFile('./package.json', 'Package.json exists');
checkFile('./simple-server.cjs', 'Main server file exists');
checkFile('./.env.example', 'Environment template exists');
checkFile('./jest.config.cjs', 'Test configuration exists');

// 2. Configuration Validation
try {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  // Check scripts
  const requiredScripts = ['start', 'test', 'lint'];
  requiredScripts.forEach((script) => {
    if (pkg.scripts[script]) {
      results.passed.push(`✅ Script '${script}' configured`);
    } else {
      results.warnings.push(`⚠️  Script '${script}' missing`);
    }
  });

  // Check security dependencies
  const securityDeps = ['helmet', 'express-rate-limit', 'compression'];
  securityDeps.forEach((dep) => {
    if (pkg.dependencies[dep]) {
      results.passed.push(`✅ Security dependency '${dep}' installed`);
    } else {
      results.critical.push(`❌ Security dependency '${dep}' missing`);
    }
  });
} catch (err) {
  results.critical.push(`❌ Cannot parse package.json: ${err.message}`);
}

// 3. Server Configuration Validation
checkContent('./simple-server.cjs', 'helmet()', 'Helmet security headers');
checkContent('./simple-server.cjs', 'rateLimit', 'Rate limiting');
checkContent('./simple-server.cjs', 'compression()', 'Response compression');
checkContent('./simple-server.cjs', 'pino', 'Structured logging');
checkContent('./simple-server.cjs', 'req.id', 'Request ID tracking');

// 4. Environment Validation
if (process.env.JWT_SECRET) {
  if (process.env.JWT_SECRET.length >= 16) {
    results.passed.push('✅ JWT_SECRET configured with adequate length');
  } else {
    results.critical.push('❌ JWT_SECRET too short (minimum 16 characters)');
  }
} else {
  results.warnings.push('⚠️  JWT_SECRET not set (required for production)');
}

if (process.env.NODE_ENV === 'production') {
  results.passed.push('✅ NODE_ENV set to production');
} else {
  results.info.push('ℹ️  NODE_ENV not set to production (development mode)');
}

// 5. Run Tests
const testResult = await runCommand('npm', ['test'], 'API test suite');

// 6. Security Audit
const auditResult = await runCommand(
  'node',
  ['scripts/simple-security-check.mjs'],
  'Security configuration'
);

// 7. Linting (non-critical)
await runCommand('npm', ['run', 'lint'], 'Code linting');

// Results Summary

const totalChecks =
  results.critical.length + results.warnings.length + results.passed.length;
const criticalIssues = results.critical.length;
const warningIssues = results.warnings.length;
const passedChecks = results.passed.length;

// Display results
if (results.passed.length > 0) {
  results.passed.forEach((item) => console.log(item));
}

if (results.warnings.length > 0) {
  results.warnings.forEach((item) => console.log(item));
}

if (results.critical.length > 0) {
  results.critical.forEach((item) => console.log(item));
}

if (results.info.length > 0) {
  results.info.forEach((item) => console.log(item));
}

// Final Assessment

const productionReady = criticalIssues === 0 && warningIssues <= 3;
const readinessScore = Math.round((passedChecks / totalChecks) * 100);

  `\n🎯 PRODUCTION READINESS: ${productionReady ? '✅ READY' : '❌ NOT READY'}`
);

if (!productionReady) {
  if (criticalIssues > 0) {
  }
  if (warningIssues > 3) {
  }
}

process.exit(productionReady ? 0 : 1);
