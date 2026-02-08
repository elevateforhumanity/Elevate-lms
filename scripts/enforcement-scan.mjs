#!/usr/bin/env node
/**
 * Enforcement Scan - CI Check for Protected Routes
 * 
 * This script ensures all protected API routes use the enrollment enforcement wrapper.
 * If a route is in the MUST_ENFORCE list and doesn't use the wrapper, the build fails.
 * 
 * Usage:
 *   node scripts/enforcement-scan.mjs
 * 
 * Add to CI:
 *   npm run enforcement:scan && npm run build
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const TARGET_DIR = path.join(ROOT, "app", "api");

// Routes that MUST use enrollment enforcement
// Add paths here as you convert routes
const MUST_ENFORCE_PATH_SUBSTRINGS = [
  "/timeclock/",
  "/checkin",
  "/apprenticeship/hours/",
  "/enrollment/complete-orientation",
  "/enrollment/upload-document",
  "/enrollment/submit-documents",
  "/apprentice/",
];

// Patterns that indicate enforcement is being used
const ENFORCEMENT_PATTERNS = [
  "withEnrollmentEnforcement(",
  "assertEnrollmentPermission(",
  "assertEnrollmentPermissionWithOverride(",
  "checkEnrollmentPermission(",
  "requireEnrollmentPermission(",
];

// Routes that are explicitly exempt (webhooks, public endpoints, etc.)
const EXEMPT_PATHS = [
  "/api/webhooks/",
  "/api/cron/",
  "/api/admin/",
  "/api/auth/",
  "/api/public/",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p, out);
    } else if (entry.isFile() && entry.name === "route.ts") {
      out.push(p);
    }
  }
  return out;
}

function isExempt(relPath) {
  return EXEMPT_PATHS.some(exempt => relPath.includes(exempt));
}

function mustEnforce(relPath) {
  return MUST_ENFORCE_PATH_SUBSTRINGS.some(s => relPath.includes(s));
}

function usesEnforcement(src) {
  return ENFORCEMENT_PATTERNS.some(pattern => src.includes(pattern));
}

console.log("🔍 Enforcement Scan Starting...\n");
console.log(`Scanning: ${TARGET_DIR}\n`);

const routes = walk(TARGET_DIR);
const failures = [];
const passes = [];
const skipped = [];

for (const file of routes) {
  const rel = file.replace(ROOT, "");
  
  // Skip exempt paths
  if (isExempt(rel)) {
    skipped.push({ path: rel, reason: "exempt" });
    continue;
  }
  
  // Check if this route must be enforced
  if (!mustEnforce(rel)) {
    skipped.push({ path: rel, reason: "not in enforcement list" });
    continue;
  }
  
  // Read the file and check for enforcement
  const src = fs.readFileSync(file, "utf8");
  
  if (usesEnforcement(src)) {
    passes.push(rel);
  } else {
    failures.push(rel);
  }
}

// Report results
console.log("═══════════════════════════════════════════════════════════════");
console.log("                    ENFORCEMENT SCAN RESULTS                    ");
console.log("═══════════════════════════════════════════════════════════════\n");

if (passes.length > 0) {
  console.log(`✅ PASSING (${passes.length} routes):`);
  for (const p of passes) {
    console.log(`   ${p}`);
  }
  console.log("");
}

if (failures.length > 0) {
  console.log(`❌ FAILING (${failures.length} routes):`);
  for (const f of failures) {
    console.log(`   ${f}`);
  }
  console.log("");
  console.log("These routes are in the MUST_ENFORCE list but don't use enforcement.");
  console.log("Add one of these patterns to the route:");
  for (const pattern of ENFORCEMENT_PATTERNS) {
    console.log(`   - ${pattern}`);
  }
  console.log("");
}

console.log(`📊 Summary: ${passes.length} passing, ${failures.length} failing, ${skipped.length} skipped\n`);

if (failures.length > 0) {
  console.error("❌ ENFORCEMENT SCAN FAILED\n");
  process.exit(1);
}

console.log("✅ ENFORCEMENT SCAN PASSED\n");
process.exit(0);
