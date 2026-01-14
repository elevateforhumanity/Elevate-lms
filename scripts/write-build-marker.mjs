import fs from "node:fs";
import path from "node:path";

const outPath = path.join(process.cwd(), "public", "build.json");

const payload = {
  builtAt: new Date().toISOString(),
  nodeEnv: process.env.NODE_ENV ?? null,
  gitCommit: process.env.COMMIT_REF ?? null,
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log("Wrote", outPath, payload);
