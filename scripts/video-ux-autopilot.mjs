#!/usr/bin/env node
// scripts/video-ux-autopilot.mjs
// Elevate LMS – Video UX Autopilot
// Reads the TikTok vs Elevate roadmap and prints a concrete task list by priority.

import fs from "fs";
import path from "path";

const fileArg = process.argv[2];

if (!fileArg) {
  console.error("Usage: node scripts/video-ux-autopilot.mjs config/video-experience-roadmap.json");
  process.exit(1);
}

const jsonPath = path.resolve(process.cwd(), fileArg);

if (!fs.existsSync(jsonPath)) {
  console.error(`❌ Roadmap config not found at: ${jsonPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(jsonPath, "utf8");
const data = JSON.parse(raw);

function printSection(title) {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🎥 ${title}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

function normalizePriority(p) {
  const up = String(p || "").toUpperCase();
  if (up === "P0") return "P0";
  if (up === "P1") return "P1";
  if (up === "P2") return "P2";
  return "P2";
}

const workItems = [];

for (const area of data.areas || []) {
  for (const entry of area.items || []) {
    const name = entry.feature || entry.metric || "Unknown";
    const priority = normalizePriority(entry.priority);
    workItems.push({
      area: area.name,
      name,
      priority,
      tiktok: entry.tiktok || "",
      elevate: entry.elevate || "",
      gap: entry.gap || "",
      target: entry.target || "",
      impact: entry.impact || ""
    });
  }
}

const priorityOrder = { P0: 0, P1: 1, P2: 2 };

workItems.sort((a, b) => {
  const pa = priorityOrder[a.priority] ?? 3;
  const pb = priorityOrder[b.priority] ?? 3;
  if (pa !== pb) return pa - pb;
  return a.name.localeCompare(b.name);
});

console.log("");
console.log("======================================================");
console.log("ELEVATE LMS – VIDEO UX AUTOPILOT (TIKTOK-LEVEL ROADMAP)");
console.log("======================================================");

printSection("P0 – Highest Priority (launch-critical experience)");

for (const item of workItems.filter((w) => w.priority === "P0")) {
  console.log(`• [${item.area}] ${item.name}`);
  if (item.gap) console.log(`  Gap: ${item.gap}`);
  if (item.target) console.log(`  Target: ${item.target}`);
  if (item.tiktok || item.elevate) {
    console.log(`  TikTok: ${item.tiktok}`);
    console.log(`  Elevate: ${item.elevate}`);
  }
  console.log("");
}

printSection("P1 – High Priority (strong differentiation)");

for (const item of workItems.filter((w) => w.priority === "P1")) {
  console.log(`• [${item.area}] ${item.name}`);
  if (item.gap) console.log(`  Gap: ${item.gap}`);
  if (item.target) console.log(`  Target: ${item.target}`);
  if (item.tiktok || item.elevate) {
    console.log(`  TikTok: ${item.tiktok}`);
    console.log(`  Elevate: ${item.elevate}`);
  }
  console.log("");
}

printSection("P2 – Nice to Have (post-MVP)");

const p2Items = workItems.filter((w) => w.priority === "P2");
if (p2Items.length) {
  for (const item of p2Items) {
    console.log(`• [${item.area}] ${item.name}`);
    if (item.gap) console.log(`  Gap: ${item.gap}`);
    if (item.target) console.log(`  Target: ${item.target}`);
    if (item.tiktok || item.elevate) {
      console.log(`  TikTok: ${item.tiktok}`);
      console.log(`  Elevate: ${item.elevate}`);
    }
    console.log("");
  }
} else {
  console.log("No P2 items defined.");
}

console.log("");
console.log("End of Video UX Autopilot roadmap.");
console.log("Use this as the dev task list to move Elevate toward TikTok-level experience.");
