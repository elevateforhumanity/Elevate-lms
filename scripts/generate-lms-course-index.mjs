import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const COURSES_DIR = path.join(ROOT, "lms-data", "courses");
const OUT_FILE = path.join(COURSES_DIR, "index.ts");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function listCourseFiles() {
  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => f.startsWith("program-") && f.endsWith(".ts"))
    .sort()
    .map((f) => ({ file: f, abs: path.join(COURSES_DIR, f) }));
}

function parseExportName(source) {
  // expects: export const xyzCourse: Course = { ... }
  const m = source.match(/export\s+const\s+([A-Za-z0-9_]+)\s*:\s*Course\s*=/);
  return m?.[1] ?? null;
}

function parseSlug(source) {
  const m = source.match(/slug\s*:\s*["'`]([^"'`]+)["'`]/);
  return m?.[1] ?? null;
}

const files = listCourseFiles();

const exports = [];
const problems = [];

for (const f of files) {
  const src = read(f.abs);
  const exportName = parseExportName(src);
  const slug = parseSlug(src);

  if (!exportName) problems.push(`Missing export const <name>: Course in ${f.file}`);
  if (!slug) problems.push(`Missing slug in ${f.file}`);

  exports.push({
    file: f.file,
    exportName,
    slug,
    importPath: `./${f.file.replace(/\.ts$/, "")}`,
  });
}

if (problems.length) {
  console.error("❌ Cannot generate index.ts due to problems:");
  for (const p of problems) console.error(" - " + p);
  process.exit(1);
}

// Build index.ts
const lines = [];

lines.push(`// AUTO-GENERATED FILE — do not hand edit`);
lines.push(`// Run: node scripts/generate-lms-course-index.mjs`);
lines.push(``);
lines.push(`import type { Course } from "@/types/course";`);
lines.push(``);

for (const e of exports) {
  lines.push(`import { ${e.exportName} } from "${e.importPath}";`);
}

lines.push(``);
lines.push(`export const allCourses: Course[] = [`);

for (const e of exports) {
  lines.push(`  ${e.exportName},`);
}

lines.push(`];`);
lines.push(``);
lines.push(`export function getCourseBySlug(slug: string): Course | undefined {`);
lines.push(`  return allCourses.find((c) => c.slug === slug);`);
lines.push(`}`);
lines.push(``);
lines.push(`export function getPublishedCourses(): Course[] {`);
lines.push(`  return allCourses.filter((c) => c.isPublished !== false);`);
lines.push(`}`);
lines.push(``);

fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
console.log(`✅ Generated ${path.relative(ROOT, OUT_FILE)} with ${exports.length} courses.`);
