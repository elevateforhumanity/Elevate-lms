#!/usr/bin/env bash
set -euo pipefail

# ---- guard against timeout misuse (kill-on-impact fix) ----
if grep -RniE '(^|[;&|])\s*timeout\s+.*(vite|npm\s+run\s+dev|pnpm\s+dev|yarn\s+dev)' package.json .gitpod.yml scripts/ 2>/dev/null; then
  echo "❌ Detected 'timeout' wrapping dev server. Removing…"
  sed -i -E 's/timeout\s+[0-9smhd:-]+\s+//g' .gitpod.yml 2>/dev/null || true
  sed -i -E 's/timeout\s+[0-9smhd:-]+\s+//g' package.json 2>/dev/null || true
  find scripts -type f -maxdepth 1 -name "*.sh" -print0 2>/dev/null | xargs -0 -I{} sed -i -E 's/timeout\s+[0-9smhd:-]+\s+//g' "{}" || true
fi

# ---- ensure deps ----
[ -d node_modules ] || (echo "📦 Installing deps…" && (pnpm i || npm i || yarn))

# ---- Vite config autopatch (allowedHosts/HMR/origin) ----
node <<'NODE'
const fs=require('fs');
const files=['vite.config.ts','vite.config.js'];
const f=files.find(fs.existsSync);
const gp = "process.env.GITPOD_WORKSPACE_URL ? '3000--' + new URL(process.env.GITPOD_WORKSPACE_URL).host : 'localhost'";
const base=`
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: [/\\.gitpod\\.dev$/],
    hmr: { host: (${gp}), protocol: 'wss', clientPort: 443 },
    origin: (process.env.GITPOD_WORKSPACE_URL ? 'https://' + (${gp}) : undefined),
  },
  preview: { port: 4173, allowedHosts: [/\\.gitpod\\.dev$/] }
})
`.trim()+"\n";

if(!f){ fs.writeFileSync('vite.config.ts', base); console.log('🛠️  Created vite.config.ts'); }
else {
  const s=fs.readFileSync(f,'utf8');
  if(!/allowedHosts|hmr|origin/.test(s)){ fs.writeFileSync(f, base); console.log('🛠️  Rewrote', f); }
  else console.log('✅ Vite server config already Gitpod-safe.');
}
NODE

# ---- start vite with graceful shutdown ----
cleanup(){ echo "🛑 Stopping Vite…"; pkill -f "vite" || true; }
trap cleanup SIGINT SIGTERM

export HOST=0.0.0.0
export PORT="${PORT:-3000}"

echo "🚀 Starting Vite on :$PORT"
if command -v pnpm >/dev/null 2>&1; then pnpm dev -- --host --port "$PORT";
elif command -v npm >/dev/null 2>&1; then npm run dev -- -- --host --port "$PORT";
else yarn dev --host --port "$PORT"; fi
