import fs from "node:fs";
import path from "node:path";

const outPath = path.join(process.cwd(), "public", "build.json");

const payload = {
  builtAt: new Date().toISOString(),
  vercelEnv: process.env.VERCEL_ENV ?? null,
  vercelGitCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log("Wrote", outPath, payload);
