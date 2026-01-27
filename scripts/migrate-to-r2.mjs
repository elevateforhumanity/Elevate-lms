#!/usr/bin/env node

/**
 * Migrate local videos and large images to Cloudflare R2
 * 
 * Usage:
 *   node scripts/migrate-to-r2.mjs --dry-run    # Preview what will be migrated
 *   node scripts/migrate-to-r2.mjs              # Actually migrate files
 * 
 * Required env vars:
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_R2_ACCESS_KEY_ID
 *   CLOUDFLARE_R2_SECRET_ACCESS_KEY
 *   CLOUDFLARE_R2_BUCKET_NAME
 *   CLOUDFLARE_R2_PUBLIC_URL
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Config
const DRY_RUN = process.argv.includes('--dry-run');
const VIDEOS_ONLY = process.argv.includes('--videos-only');

// R2 Config from env
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'elevate-media';
const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

// File patterns to migrate
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MIN_SIZE_FOR_IMAGES = 500 * 1024; // Only migrate images > 500KB

function checkConfig() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.error('❌ Missing R2 configuration. Set these environment variables:');
    console.error('   CLOUDFLARE_ACCOUNT_ID');
    console.error('   CLOUDFLARE_R2_ACCESS_KEY_ID');
    console.error('   CLOUDFLARE_R2_SECRET_ACCESS_KEY');
    console.error('   CLOUDFLARE_R2_BUCKET_NAME (optional, defaults to elevate-media)');
    console.error('   CLOUDFLARE_R2_PUBLIC_URL (optional, for custom domain)');
    process.exit(1);
  }
}

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return types[ext] || 'application/octet-stream';
}

function findFilesToMigrate() {
  const files = [];
  
  // Find videos
  const videosDir = path.join(PUBLIC_DIR, 'videos');
  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir, { recursive: true });
    for (const file of videoFiles) {
      const filePath = path.join(videosDir, file);
      if (fs.statSync(filePath).isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(ext)) {
          const stats = fs.statSync(filePath);
          files.push({
            localPath: filePath,
            r2Key: `videos/${file}`,
            size: stats.size,
            type: 'video',
          });
        }
      }
    }
  }

  // Find large images (unless videos-only)
  if (!VIDEOS_ONLY) {
    const imagesDir = path.join(PUBLIC_DIR, 'images');
    if (fs.existsSync(imagesDir)) {
      const walkDir = (dir, prefix = '') => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
          
          if (entry.isDirectory()) {
            walkDir(fullPath, relativePath);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
              const stats = fs.statSync(fullPath);
              if (stats.size >= MIN_SIZE_FOR_IMAGES) {
                files.push({
                  localPath: fullPath,
                  r2Key: `images/${relativePath}`,
                  size: stats.size,
                  type: 'image',
                });
              }
            }
          }
        }
      };
      walkDir(imagesDir);
    }
  }

  return files;
}

async function uploadFile(client, file) {
  const fileContent = fs.readFileSync(file.localPath);
  
  await client.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: file.r2Key,
    Body: fileContent,
    ContentType: getContentType(file.localPath),
    CacheControl: 'public, max-age=31536000',
  }));

  return R2_PUBLIC_URL 
    ? `${R2_PUBLIC_URL}/${file.r2Key}`
    : `https://pub-${R2_ACCOUNT_ID}.r2.dev/${file.r2Key}`;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function main() {
  console.log('🚀 Cloudflare R2 Migration Script\n');

  if (DRY_RUN) {
    console.log('📋 DRY RUN MODE - No files will be uploaded\n');
  } else {
    checkConfig();
  }

  // Find files
  console.log('🔍 Scanning for files to migrate...\n');
  const files = findFilesToMigrate();

  if (files.length === 0) {
    console.log('✅ No files found to migrate.');
    return;
  }

  // Summary
  const videos = files.filter(f => f.type === 'video');
  const images = files.filter(f => f.type === 'image');
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  console.log('📊 Migration Summary:');
  console.log(`   Videos: ${videos.length} files (${formatSize(videos.reduce((s, f) => s + f.size, 0))})`);
  console.log(`   Images: ${images.length} files (${formatSize(images.reduce((s, f) => s + f.size, 0))})`);
  console.log(`   Total:  ${files.length} files (${formatSize(totalSize)})\n`);

  if (DRY_RUN) {
    console.log('📁 Files to migrate:');
    for (const file of files) {
      console.log(`   ${file.type.padEnd(6)} ${formatSize(file.size).padStart(10)}  ${file.r2Key}`);
    }
    console.log('\n✅ Dry run complete. Run without --dry-run to migrate.');
    return;
  }

  // Upload files
  const client = getR2Client();
  const results = { success: [], failed: [] };
  const urlMapping = {};

  console.log('⬆️  Uploading files to R2...\n');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const progress = `[${i + 1}/${files.length}]`;
    
    try {
      process.stdout.write(`${progress} Uploading ${file.r2Key}...`);
      const url = await uploadFile(client, file);
      results.success.push(file);
      urlMapping[file.localPath.replace(PUBLIC_DIR, '')] = url;
      console.log(' ✅');
    } catch (error) {
      results.failed.push({ file, error: error.message });
      console.log(` ❌ ${error.message}`);
    }
  }

  // Write URL mapping for reference
  const mappingPath = path.join(ROOT_DIR, 'r2-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));

  // Summary
  console.log('\n📊 Migration Results:');
  console.log(`   ✅ Success: ${results.success.length}`);
  console.log(`   ❌ Failed:  ${results.failed.length}`);
  console.log(`\n📄 URL mapping saved to: r2-url-mapping.json`);

  if (results.failed.length > 0) {
    console.log('\n❌ Failed uploads:');
    for (const { file, error } of results.failed) {
      console.log(`   ${file.r2Key}: ${error}`);
    }
  }

  console.log('\n✅ Migration complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update your code to use R2 URLs (see r2-url-mapping.json)');
  console.log('   2. Test that videos/images load correctly');
  console.log('   3. Optionally delete local files to save space');
}

main().catch(console.error);
