import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const COURSES_DIR = path.join(ROOT, "lms-data", "courses");
const INDEX_FILE = path.join(COURSES_DIR, "index.ts");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function listCourseFiles() {
  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => f.startsWith("program-") && f.endsWith(".ts"))
    .map((f) => path.join(COURSES_DIR, f));
}

function parseExportName(source) {
  // tries to find: export const XCourse: Course =
  const m = source.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*Course\s*=/);
  return m?.[1] ?? null;
}

function parseField(source, field) {
  // naive string field read: field: "value"
  const m = source.match(new RegExp(`${field}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`));
  return m?.[1] ?? null;
}

function parseBool(source, field) {
  const m = source.match(new RegExp(`${field}\\s*:\\s*(true|false)\\b`));
  return m?.[1] ?? null;
}

function hasPlaceholderText(source) {
  const bad = [
    "lorem ipsum",
    "placeholder",
    "sample data",
    "TODO:",
    "FIXME",
    "example.com",
    "changeme",
  ];
  const lower = source.toLowerCase();
  
  // Allow "Mock Exam", "Mock Test", "Mock Skills" (legitimate practice tests)
  // Only flag if "mock" appears without "exam", "test", "skills", "board"
  if (lower.includes("mock") && 
      !lower.includes("mock exam") && 
      !lower.includes("mock test") && 
      !lower.includes("mock skills") && 
      !lower.includes("mock state board")) {
    return true;
  }
  
  return bad.some((w) => lower.includes(w));
}

function extractCoverPath(source) {
  // common keys: coverImage, cover, image, thumbnail
  const keys = ["coverImage", "cover", "image", "thumbnail"];
  for (const k of keys) {
    const v = parseField(source, k);
    if (v) return v;
  }
  return null;
}

const files = listCourseFiles();
const indexSource = read(INDEX_FILE);

const courseRows = [];
const errors = [];
const warnings = [];

const slugSet = new Set();
const idSet = new Set();

for (const file of files) {
  const src = read(file);
  const exportName = parseExportName(src);
  const slug = parseField(src, "slug");
  const id = parseField(src, "id");
  const title = parseField(src, "title") || parseField(src, "name");
  const isPublished = parseBool(src, "isPublished");
  const cover = extractCoverPath(src);
  const hasPlaceholders = hasPlaceholderText(src);

  // Basic required fields
  if (!exportName) errors.push(`Missing export const <name>: Course in ${path.basename(file)}`);
  if (!slug) errors.push(`Missing slug in ${path.basename(file)}`);
  if (!id) errors.push(`Missing id in ${path.basename(file)}`);
  if (!title) warnings.push(`Missing title/name in ${path.basename(file)}`);

  // Uniqueness checks
  if (slug) {
    if (slugSet.has(slug)) errors.push(`Duplicate slug "${slug}" found (file: ${path.basename(file)})`);
    slugSet.add(slug);
  }
  if (id) {
    if (idSet.has(id)) errors.push(`Duplicate id "${id}" found (file: ${path.basename(file)})`);
    idSet.add(id);
  }

  // Published check
  if (isPublished === "false" || isPublished === null) {
    warnings.push(`Not published (or missing isPublished): ${path.basename(file)} (slug=${slug ?? "?"})`);
  }

  // Cover existence check (only if it's a local /public path)
  if (cover && cover.startsWith("/")) {
    const coverPath = path.join(ROOT, "public", cover.replace(/^\//, ""));
    if (!fs.existsSync(coverPath)) {
      warnings.push(`Missing cover image file for ${slug ?? path.basename(file)}: ${cover} (expected ${coverPath})`);
    }
  }

  // Placeholder check
  if (hasPlaceholders) {
    warnings.push(`Placeholder/mock/TODO text detected inside ${path.basename(file)} (slug=${slug ?? "?"})`);
  }

  // Index import check
  if (exportName) {
    const expectedImport = new RegExp(`import\\s*\\{\\s*${exportName}\\s*\\}\\s*from\\s*["'\`]\\.\\/program-`);
    if (!expectedImport.test(indexSource)) {
      errors.push(`Index is not importing export "${exportName}" (file: ${path.basename(file)})`);
    }
  }

  courseRows.push({ file: path.basename(file), exportName, slug, id, isPublished, cover });
}

// Report
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📌 LMS DEEP AUDIT RESULTS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`Course files found: ${files.length}`);
console.log(`Unique slugs:       ${slugSet.size}`);
console.log(`Unique ids:         ${idSet.size}`);
console.log("");

if (errors.length) {
  console.log("❌ ERRORS (must fix):");
  for (const e of errors) console.log(" - " + e);
  console.log("");
}

if (warnings.length) {
  console.log("⚠️ WARNINGS (should fix):");
  for (const w of warnings) console.log(" - " + w);
  console.log("");
}

if (!errors.length) {
  console.log("✅ LMS audit passed with 0 blocking errors.");
} else {
  console.log("❌ LMS audit failed — fix errors above, then re-run.");
  process.exit(1);
}
