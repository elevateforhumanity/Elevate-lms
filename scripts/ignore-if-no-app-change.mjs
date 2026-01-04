#!/usr/bin/env node
// 🚦 CI ignore script - exits 0 to skip build, 1 to proceed
import { execSync } from 'node:child_process';

function getChangeInfo() {
  try {
    const output = execSync('node scripts/changed-paths.mjs --json', {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
    return JSON.parse(output);
  } catch (error) {
    // If we can't determine changes, build to be safe
    return { shouldBuild: true, appRelevant: ['unknown'] };
  }
}

const { shouldBuild, appRelevant, buildType, categories } = getChangeInfo();

if (!shouldBuild) {
  console.log('🟢 No app changes detected. Skipping build.');
  console.log('   This saves build minutes and deployment time!');
  process.exit(0); // Exit 0 = ignore build
} else {
  console.log('🛠️  App changes detected - proceeding with incremental build');
  console.log(`   Build type: ${buildType}`);
  console.log(`   Changed files (${appRelevant.length}):`);

  // Show categorized changes for better visibility
  if (categories.html?.length > 0) {
    console.log(`   📄 HTML pages: ${categories.html.join(', ')}`);
  }
  if (categories.pages?.length > 0) {
    console.log(`   📁 Page directories: ${categories.pages.join(', ')}`);
  }
  if (categories.assets?.length > 0) {
    console.log(`   🎨 Assets: ${categories.assets.length} files`);
  }
  if (categories.seo?.length > 0) {
    console.log(`   🔍 SEO files: ${categories.seo.join(', ')}`);
  }
  if (categories.config?.length > 0) {
    console.log(`   ⚙️  Config: ${categories.config.join(', ')}`);
  }

  process.exit(1); // Exit 1 = proceed with build
}
