#!/usr/bin/env node
/**
 * Sync Static Course Files to Supabase
 * 
 * Migrates the 32 static course files from lms-data/courses/ into the Supabase courses table.
 * This makes the LMS fully SaaS-ready with database-driven courses.
 * 
 * Usage: node scripts/sync-static-courses-to-supabase.mjs
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("❌ Missing required environment variables:");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  console.error("\nMake sure .env.local is configured correctly.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

const ROOT = process.cwd();
const COURSES_DIR = path.join(ROOT, "lms-data", "courses");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function listCourseFiles() {
  if (!fs.existsSync(COURSES_DIR)) {
    console.error(`❌ Directory not found: ${COURSES_DIR}`);
    process.exit(1);
  }

  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => f.startsWith("program-") && f.endsWith(".ts"))
    .sort()
    .map((f) => ({ file: f, abs: path.join(COURSES_DIR, f) }));
}

function extractField(src, key) {
  // Match: key: "value" or key: 'value' or key: `value`
  const regex = new RegExp(`${key}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`, 'i');
  const match = src.match(regex);
  return match?.[1] ?? null;
}

function extractBool(src, key) {
  const regex = new RegExp(`${key}\\s*:\\s*(true|false)`, 'i');
  const match = src.match(regex);
  return match?.[1] === "true" ? true : match?.[1] === "false" ? false : null;
}

function extractNumber(src, key) {
  const regex = new RegExp(`${key}\\s*:\\s*(\\d+)`, 'i');
  const match = src.match(regex);
  return match?.[1] ? parseInt(match[1], 10) : null;
}

async function upsertCourse(courseData) {
  const { error } = await supabase
    .from("courses")
    .upsert(courseData, { onConflict: "slug" });

  if (error) {
    throw new Error(`Failed to upsert course: ${error.message}`);
  }
}

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📚 SYNCING STATIC COURSES TO SUPABASE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  const files = listCourseFiles();
  console.log(`Found ${files.length} course files to sync\n`);

  let synced = 0;
  let skipped = 0;
  let errors = 0;

  for (const f of files) {
    try {
      const src = read(f.abs);

      // Extract core fields
      const slug = extractField(src, "slug");
      const title = extractField(src, "title") || extractField(src, "name");
      const description = extractField(src, "description");
      const shortDescription = extractField(src, "shortDescription") || extractField(src, "short_description");
      const category = extractField(src, "category");
      
      // Extract partner fields
      const partnerUrl = extractField(src, "partnerUrl");
      const launchMode = extractField(src, "launchMode");
      const allowIframe = extractBool(src, "allowIframe");
      
      // Extract metadata
      const isPublished = extractBool(src, "isPublished");
      const hoursTotal = extractNumber(src, "hoursTotal") || extractNumber(src, "hours");

      if (!slug || !title) {
        console.log(`⚠️  Skipping ${f.file} (missing slug or title)`);
        skipped++;
        continue;
      }

      // Determine delivery mode
      const deliveryMode = partnerUrl ? "partner_link" : "internal";

      // Build course data (only include columns that exist in the table)
      const courseData = {
        slug,
        title,
        description: description || shortDescription || null,
        duration: hoursTotal || 40, // Default to 40 hours if not specified
        is_published: isPublished ?? true,
        delivery_mode: deliveryMode,
        partner_url: partnerUrl || null,
        launch_mode: launchMode || "external",
        allow_iframe: allowIframe ?? false,
      };

      await upsertCourse(courseData);
      console.log(`✅ ${slug}`);
      synced++;

    } catch (error) {
      console.error(`❌ Error processing ${f.file}:`, error.message);
      errors++;
    }
  }

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 SYNC COMPLETE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ Synced: ${synced}`);
  console.log(`⚠️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
  console.log("");

  if (errors > 0) {
    console.error("⚠️  Some courses failed to sync. Review errors above.");
    process.exit(1);
  }

  console.log("🎉 All courses successfully synced to Supabase!");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Verify courses in Supabase dashboard");
  console.log("  2. Test course pages: /lms/courses/[courseId]");
  console.log("  3. Run: pnpm typecheck && pnpm build");
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error.message);
  process.exit(1);
});
