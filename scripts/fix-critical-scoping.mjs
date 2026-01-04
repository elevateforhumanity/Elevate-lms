#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const findings = JSON.parse(readFileSync('reports/cross-wiring-findings.json', 'utf-8'));
const critical = findings.findings.CRITICAL;

console.log(`Found ${critical.length} CRITICAL issues to fix`);

const fixes = [];

critical.forEach(finding => {
  if (finding.type === 'missing_org_scope' || finding.type === 'missing_user_scope') {
    fixes.push({
      file: finding.file,
      route: finding.route,
      category: finding.category,
      type: finding.type,
      tables: finding.tables || [],
    });
  }
});

console.log(`\nGenerated ${fixes.length} fix recommendations`);
console.log(`\nNext steps:`);
console.log(`1. Review each file and add proper scoping`);
console.log(`2. For programHolder routes: add organization_id filter`);
console.log(`3. For student/lms routes: add user_id/profile_id filter`);
console.log(`4. For employer/instructor routes: add organization_id filter`);
console.log(`5. Verify auth checks exist before queries`);

writeFileSync('reports/scoping-fixes-needed.json', JSON.stringify(fixes, null, 2));
console.log(`\nFix list saved to: reports/scoping-fixes-needed.json`);
