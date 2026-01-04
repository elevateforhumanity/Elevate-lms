#!/usr/bin/env bash
set -euo pipefail

echo "==> Installing Gitpod + AI Autopilot scaffolding"

# ----- Helpers -----
have(){ command -v "$1" >/dev/null 2>&1; }

# Detect framework + out dir
OUT_DIR="dist"
if [ -f "next.config.js" ] || [ -d ".next" ]; then OUT_DIR=".next"; fi
if [ -f "astro.config.mjs" ]; then OUT_DIR="dist"; fi
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then OUT_DIR="dist"; fi
if [ -d "build" ] && [ -f "public/index.html" ]; then OUT_DIR="build"; fi

# ----- scripts/ -----
mkdir -p scripts

# 404 + SPA + notes/content fixer
cat > scripts/fix_netlify_404.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
OUT_DIR="${1:-dist}"

echo "• Ensuring SPA fallback and friendly 404"

mkdir -p public

# SPA fallback (Netlify _redirects)
if [ ! -f public/_redirects ]; then
  printf "/*    /index.html   200\n" > public/_redirects
  echo "  - added public/_redirects"
elif ! grep -q "/index.html   200" public/_redirects; then
  printf "/*    /index.html   200\n" >> public/_redirects
  echo "  - appended SPA rule to public/_redirects"
fi

# netlify.toml
if [ ! -f netlify.toml ]; then
  cat > netlify.toml <<NET
[build]
  command = "npm run build"
  publish = "${OUT_DIR}"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
NET
  echo "  - created netlify.toml"
else
  # publish dir
  if ! grep -q "publish = \"${OUT_DIR}\"" netlify.toml; then
    awk -v out="${OUT_DIR}" '
      BEGIN{done=0}
      /^\[build\]/{print; print "  publish = \""out"\""; done=1; next}
      {print}
      END{if(!done)print "[build]\n  publish = \""out"\""}' netlify.toml > netlify.toml.tmp && mv netlify.toml.tmp netlify.toml
    echo "  - ensured publish=${OUT_DIR} in netlify.toml"
  fi
  # SPA redirect
  if ! grep -q 'to = "/index.html"' netlify.toml; then
    cat >> netlify.toml <<'R'
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
R
    echo "  - added SPA redirect to netlify.toml"
  fi
fi

# 404 page
if [ ! -f public/404.html ]; then
cat > public/404.html <<'H'
<!doctype html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Page Not Found — Elevate for Humanity</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet"/>
<style>
body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f7f4ee;color:#1f2937;margin:0}
.wrap{max-width:720px;margin:10vh auto;padding:24px;background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(20,20,20,.08)}
.btn{display:inline-block;margin-right:8px;padding:10px 14px;border-radius:12px;text-decoration:none;font-weight:600}
.primary{background:#5aa47a;color:#fff}.ghost{background:#fff;color:#386d53;border:1px solid #e5e7eb}
</style>
</head><body>
<div class="wrap">
<h1>We can't find that page (404)</h1>
<p>Try the homepage, Programs, or Academy. If you followed a link, it may be out of date.</p>
<p>
  <a class="btn primary" href="/">Home</a>
  <a class="btn ghost" href="/programs">Programs</a>
  <a class="btn ghost" href="/academy">Academy</a>
</p>
</div>
</body></html>
H
  echo "  - added public/404.html"
fi

# Scaffold notes/content
mkdir -p public/notes public/content
[ -f public/notes/index.html ] || cat > public/notes/index.html <<'N'
<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Notes</title></head>
<body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:0 16px">
<h1>Notes</h1><p>Quick updates and internal notes. Replace with your CMS/static content later.</p>
<ul><li>Status: Netlify deploy ready</li><li>Next: set env vars and portal domain</li></ul>
<p><a href="/">← Back</a></p></body></html>
N
[ -f public/content/index.html ] || cat > public/content/index.html <<'C'
<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Content</title></head>
<body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:0 16px">
<h1>Content Library</h1><p>Upload static brochures, PDFs, and images here so they deploy with the site.</p>
<ul><li>(Put files in /public/content)</li></ul>
<p><a href="/">← Back</a></p></body></html>
C

echo "• Netlify SPA/404/content scaffolding complete"
EOF
chmod +x scripts/fix_netlify_404.sh

# Netlify env seeder (safe if missing)
cat > scripts/seed_netlify_env.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
have(){ command -v "$1" >/dev/null 2>&1; }

SITE_ID="${NETLIFY_SITE_ID:-}"
AUTH="${NETLIFY_AUTH_TOKEN:-}"

declare -a KEYS=(VITE_API_URL VITE_SUPABASE_URL VITE_SUPABASE_ANON_KEY VITE_STRIPE_PUBLISHABLE_KEY)

if ! have netlify; then
  echo "• Netlify CLI not found; skipping remote env seed."; exit 0
fi
if [ -z "$SITE_ID" ] || [ -z "$AUTH" ]; then
  echo "• NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN missing; skipping remote env seed."
  exit 0
fi

echo "• Seeding Netlify env vars on site $SITE_ID"
netlify link --id "$SITE_ID" >/dev/null 2>&1 || true
for k in "${KEYS[@]}"; do
  v="${!k:-}"
  if [ -n "$v" ]; then
    netlify env:set "$k" "$v" -s "$SITE_ID" >/dev/null && echo "  - set $k"
  else
    echo "  - $k not provided (ok)."
  fi
done
echo "• Done."
EOF
chmod +x scripts/seed_netlify_env.sh

# AI autopilot (build, fix, serve, test, deploy-if-secrets)
cat > scripts/ai-autopilot.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "==> AI Autopilot: build → fix-404 → serve (Gitpod) → optional deploy"

OUT_DIR="${OUT_DIR:-dist}"

# 1) Install
if [ -f pnpm-lock.yaml ] && command -v pnpm >/dev/null; then
  pnpm install
elif [ -f yarn.lock ] && command -v yarn >/dev/null; then
  yarn install
else
  npm install
fi

# 2) Fix Netlify SPA/404/scaffold
bash scripts/fix_netlify_404.sh "$OUT_DIR"

# 3) Build
if [ -f package.json ]; then
  if npm run | grep -q "^  build"; then
    npm run build
  elif command -v pnpm >/dev/null && [ -f pnpm-lock.yaml ]; then
    pnpm build
  elif command -v yarn >/dev/null && [ -f yarn.lock ]; then
    yarn build
  else
    echo "No build script found; skipping."
  fi
fi

# Verify index.html exists
if [ ! -f "$OUT_DIR/index.html" ]; then
  echo "❌ Build missing $OUT_DIR/index.html – check errors"; exit 2
fi
echo "✅ Build OK: $OUT_DIR/index.html"

# 4) Serve in Gitpod: prefer vite preview or a static server
PORT="${PORT:-8080}"
GP_URL="${GITPOD_WORKSPACE_URL:-}"
if [ -n "$GP_URL" ]; then
  echo "• Gitpod detected."
fi

serve_cmd=""
if grep -qi vite package.json 2>/dev/null; then
  # Vite preview is closest to prod
  serve_cmd="npx vite preview --host 0.0.0.0 --port ${PORT}"
else
  # Fallback to a static server
  serve_cmd="npx http-server ${OUT_DIR} -p ${PORT} -a 0.0.0.0"
fi

# 5) Optionally deploy if Netlify secrets exist
if [ -n "${NETLIFY_AUTH_TOKEN:-}" ] && [ -n "${NETLIFY_SITE_ID:-}" ]; then
  echo "• Deploying to Netlify (site: $NETLIFY_SITE_ID)"
  if ! command -v netlify >/dev/null; then npm i -g netlify-cli >/dev/null 2>&1 || true; fi
  netlify link --id "$SITE_ID" >/dev/null 2>&1 || true
  netlify deploy --prod --dir="$OUT_DIR" -m "autopilot deploy" || echo "• Deploy attempt finished."
else
  echo "• NETLIFY_* not set; skipping deploy (preview only)."
fi

echo "• Starting preview server on :$PORT"
exec bash -lc "$serve_cmd"
EOF
chmod +x scripts/ai-autopilot.sh

# ----- .gitpod files -----
cat > .gitpod.Dockerfile <<'EOF'
FROM gitpod/workspace-node:latest
# Add any system deps you need here (imagemagick, python, etc.)
RUN npm i -g netlify-cli http-server vite >/dev/null 2>&1 || true
EOF

cat > .gitpod.yml <<'EOF'
image:
  file: .gitpod.Dockerfile

ports:
  - port: 8080
    onOpen: open-preview
    visibility: public

tasks:
  - name: Setup & Autopilot
    init: |
      # Install & build in init so preview is fast when the workspace opens
      bash scripts/fix_netlify_404.sh || true
      if [ -f pnpm-lock.yaml ]; then pnpm install; elif [ -f yarn.lock ]; then yarn; else npm i; fi
      if npm run | grep -q "^  build"; then npm run build || true; fi
    command: |
      # Seed Netlify env if tokens present; safe to skip
      bash scripts/seed_netlify_env.sh || true
      # Start autopilot (serves preview + optional deploy)
      OUT_DIR=dist PORT=8080 bash scripts/ai-autopilot.sh
vscode:
  extensions:
    - esbenp.prettier-vscode
    - dbaeumer.vscode-eslint
EOF

# ----- Vite host fix (optional add if Vite config exists) -----
if [ -f vite.config.ts ] || [ -f vite.config.js ]; then
  VITE_CFG="$( [ -f vite.config.ts ] && echo vite.config.ts || echo vite.config.js )"
  if ! grep -q "server:" "$VITE_CFG"; then
    # Append server block to allow Gitpod host/HMR
    cat >> "$VITE_CFG" <<'V'
/** Gitpod-friendly server config */
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    hmr: { clientPort: 443 },
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  }
})
V
    echo "• Appended Gitpod-friendly Vite server config to $VITE_CFG"
  fi
fi

echo "✅ Gitpod + AI Autopilot ready.

What to do next:
1) Commit these files (.gitpod.yml, .gitpod.Dockerfile, scripts/*).
2) Push to GitHub.
3) Open the repo in Gitpod. It will:
   - fix SPA/404,
   - build the site,
   - serve a live preview on port 8080,
   - and deploy to Netlify automatically if NETLIFY_* are set.

Env vars you can export before opening Gitpod (optional for auto-deploy):
  NETLIFY_AUTH_TOKEN=...
  NETLIFY_SITE_ID=...
  VITE_API_URL=https://api.elevateforhumanity.org
  VITE_SUPABASE_URL=...
  VITE_SUPABASE_ANON_KEY=...
"
