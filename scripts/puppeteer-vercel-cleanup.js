#!/usr/bin/env node

/**
 * Puppeteer Automation: Vercel Project Cleanup
 *
 * This script automates the complete Vercel cleanup task:
 * 1. Lists all projects
 * 2. Audits environment variables
 * 3. Compares projects
 * 4. Ensures fix2-1c7w has all variables
 * 5. Deletes unused projects
 * 6. Triggers deployment
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const VERCEL_EMAIL = process.env.VERCEL_EMAIL;
const VERCEL_PASSWORD = process.env.VERCEL_PASSWORD;
const HEADLESS = process.env.HEADLESS !== 'false';
const VERCEL_ORG = 'gitpod';
const CORRECT_PROJECT = 'fix2-1c7w';
const REPO = 'elevateforhumanity/fix2';

// Required environment variables
const REQUIRED_VARS = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SITE_URL',
];

// Output files
const OUTPUT_DIR = '.';
const INVENTORY_FILE = path.join(OUTPUT_DIR, 'VERCEL_PROJECTS_INVENTORY.md');
const AUDIT_FILE = path.join(OUTPUT_DIR, 'VERCEL_ENV_VARS_AUDIT.md');
const COMPARISON_FILE = path.join(
  OUTPUT_DIR,
  'VERCEL_FINAL_COMPARISON_BEFORE_DELETE.md'
);
const SAFE_TO_DELETE_FILE = path.join(
  OUTPUT_DIR,
  'VERCEL_SAFE_TO_DELETE_CONFIRMATION.md'
);
const COMPLETE_FILE = path.join(OUTPUT_DIR, 'VERCEL_CLEANUP_COMPLETE.md');

async function main() {

  if (!VERCEL_EMAIL || !VERCEL_PASSWORD) {
    console.error('❌ Missing credentials!');
    console.error(
      'Set: VERCEL_EMAIL and VERCEL_PASSWORD environment variables'
    );
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Step 1: Login to Vercel
    await loginToVercel(page);

    // Step 2: List all projects
    const projects = await listAllProjects(page);
    await createInventoryFile(projects);

    // Step 3: Audit environment variables for each project
    const projectEnvVars = {};
    for (const project of projects) {
      projectEnvVars[project.name] = await auditProjectEnvVars(
        page,
        project.name
      );
    }
    await createAuditFile(projectEnvVars);

    // Step 4: Compare and verify fix2-1c7w has everything
    const comparison = compareEnvVars(projectEnvVars);
    await createComparisonFile(comparison, projectEnvVars);

    // Step 5: Check if safe to delete
    const safeToDelete = verifySafeToDelete(projectEnvVars, comparison);
    await createSafeToDeleteFile(safeToDelete, projectEnvVars);

    if (!safeToDelete.safe) {
      console.error('\n❌ NOT SAFE TO DELETE!');
      console.error('Missing variables in fix2-1c7w:');
      safeToDelete.missing.forEach((v) => console.error(`  - ${v}`));
        '\n⚠️  Please add missing variables manually before deleting projects.'
      );
      await browser.close();
      process.exit(1);
    }

    // Step 6: Delete unused projects
    const projectsToDelete = projects.filter(
      (p) => p.name !== CORRECT_PROJECT && p.name.startsWith('fix2')
    );

    for (const project of projectsToDelete) {
      await deleteProject(page, project.name);
    }

    // Step 7: Trigger deployment on fix2-1c7w
    await triggerDeployment(page, CORRECT_PROJECT);

    // Step 8: Create completion report
    await createCompletionReport(projects, projectsToDelete, projectEnvVars);

      '\nNext: Monitor deployment at https://vercel.com/gitpod/fix2-1c7w'
    );
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'vercel-error.png' });
    throw error;
  } finally {
    await browser.close();
  }
}

async function loginToVercel(page) {
  await page.goto('https://vercel.com/login');
  await page.waitForSelector('input[name="email"]', { timeout: 10000 });
  await page.type('input[name="email"]', VERCEL_EMAIL);
  await page.click('button[type="submit"]');

  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  await page.type('input[name="password"]', VERCEL_PASSWORD);
  await page.click('button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
}

async function listAllProjects(page) {
  await page.goto(`https://vercel.com/${VERCEL_ORG}`);
  await page.waitForSelector('[data-testid="project-card"]', {
    timeout: 10000,
  });

  const projects = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-testid="project-card"]');
    return Array.from(cards).map((card) => ({
      name: card.querySelector('h3')?.textContent || 'Unknown',
      url: card.querySelector('a')?.href || '',
    }));
  });

  return projects;
}

async function auditProjectEnvVars(page, projectName) {
  await page.goto(
    `https://vercel.com/${VERCEL_ORG}/${projectName}/settings/environment-variables`
  );
  await page.waitForTimeout(2000);

  const envVars = await page.evaluate(() => {
    const rows = document.querySelectorAll('[data-testid="env-var-row"]');
    return Array.from(rows).map((row) => ({
      key: row.querySelector('[data-testid="env-var-key"]')?.textContent || '',
      environments: Array.from(
        row.querySelectorAll('[data-testid="env-badge"]')
      ).map((b) => b.textContent),
    }));
  });

  return envVars;
}

function compareEnvVars(projectEnvVars) {
  const allVars = new Set();
  Object.values(projectEnvVars).forEach((vars) => {
    vars.forEach((v) => allVars.add(v.key));
  });

  const comparison = {};
  allVars.forEach((varName) => {
    comparison[varName] = {};
    Object.keys(projectEnvVars).forEach((projectName) => {
      const hasVar = projectEnvVars[projectName].some((v) => v.key === varName);
      comparison[varName][projectName] = hasVar;
    });
  });

  return comparison;
}

function verifySafeToDelete(projectEnvVars, comparison) {
  const fix2Vars = projectEnvVars[CORRECT_PROJECT] || [];
  const fix2VarNames = fix2Vars.map((v) => v.key);

  const missing = REQUIRED_VARS.filter((v) => !fix2VarNames.includes(v));

  return {
    safe: missing.length === 0,
    missing,
    hasAllRequired: missing.length === 0,
  };
}

async function deleteProject(page, projectName) {
  await page.goto(
    `https://vercel.com/${VERCEL_ORG}/${projectName}/settings/advanced`
  );
  await page.waitForTimeout(2000);

  // Click delete button
  await page.click('button:has-text("Delete Project")');
  await page.waitForTimeout(1000);

  // Type project name to confirm
  await page.type('input[placeholder*="project name"]', projectName);
  await page.click('button:has-text("Delete")');

  await page.waitForTimeout(2000);
}

async function triggerDeployment(page, projectName) {
  await page.goto(`https://vercel.com/${VERCEL_ORG}/${projectName}`);
  await page.waitForTimeout(2000);

  await page.click('button:has-text("Redeploy")');
  await page.waitForTimeout(1000);

  // Uncheck "Use existing Build Cache"
  const checkbox = await page.$('input[type="checkbox"]');
  if (checkbox) {
    await checkbox.click();
  }

  await page.click('button:has-text("Redeploy")');
  await page.waitForTimeout(2000);
}

// File creation functions
async function createInventoryFile(projects) {
  const content = `# Vercel Projects Inventory\n\nGenerated: ${new Date().toISOString()}\n\n## All Projects\n\n${projects.map((p) => `- **${p.name}**\n  - URL: ${p.url}`).join('\n')}\n\nTotal: ${projects.length} projects\n`;
  fs.writeFileSync(INVENTORY_FILE, content);
}

async function createAuditFile(projectEnvVars) {
  let content = `# Vercel Environment Variables Audit\n\nGenerated: ${new Date().toISOString()}\n\n`;

  Object.entries(projectEnvVars).forEach(([project, vars]) => {
    content += `## Project: ${project}\n\n`;
    vars.forEach((v) => {
      content += `- **${v.key}**: ${v.environments.join(', ')}\n`;
    });
    content += '\n';
  });

  fs.writeFileSync(AUDIT_FILE, content);
}

async function createComparisonFile(comparison, projectEnvVars) {
  let content = `# Environment Variables Comparison\n\nGenerated: ${new Date().toISOString()}\n\n`;
  content += `## Comparison Table\n\n`;
  content += `| Variable | ${Object.keys(projectEnvVars).join(' | ')} |\n`;
  content += `|----------|${Object.keys(projectEnvVars)
    .map(() => '---')
    .join('|')}|\n`;

  Object.entries(comparison).forEach(([varName, projects]) => {
    content += `| ${varName} | ${Object.values(projects)
      .map((has) => (has ? '✅' : '❌'))
      .join(' | ')} |\n`;
  });

  fs.writeFileSync(COMPARISON_FILE, content);
}

async function createSafeToDeleteFile(safeToDelete, projectEnvVars) {
  let content = `# Safe to Delete Confirmation\n\nGenerated: ${new Date().toISOString()}\n\n`;

  if (safeToDelete.safe) {
    content += `## ✅ SAFE TO DELETE\n\n`;
    content += `${CORRECT_PROJECT} has all required variables.\n\n`;
  } else {
    content += `## ❌ NOT SAFE TO DELETE\n\n`;
    content += `Missing variables in ${CORRECT_PROJECT}:\n\n`;
    safeToDelete.missing.forEach((v) => {
      content += `- ${v}\n`;
    });
  }

  fs.writeFileSync(SAFE_TO_DELETE_FILE, content);
}

async function createCompletionReport(
  allProjects,
  deletedProjects,
  projectEnvVars
) {
  const content = `# Vercel Cleanup Complete\n\nGenerated: ${new Date().toISOString()}\n\n## Summary\n\n- Total projects audited: ${allProjects.length}\n- Projects deleted: ${deletedProjects.length}\n- Remaining project: ${CORRECT_PROJECT}\n\n## Deleted Projects\n\n${deletedProjects.map((p) => `- ${p.name}`).join('\n')}\n\n## Final State\n\n${CORRECT_PROJECT} has ${projectEnvVars[CORRECT_PROJECT]?.length || 0} environment variables configured.\n\n✅ Cleanup complete!\n`;

  fs.writeFileSync(COMPLETE_FILE, content);
}

// Run the automation
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
