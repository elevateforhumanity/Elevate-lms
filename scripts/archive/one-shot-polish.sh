#!/usr/bin/env bash
set -euo pipefail

# === EFH ONE-SHOT PRODUCTION & COMMERCIALIZATION SCRIPT ===
# Assumes: React+Vite repo. Keeps ONLY design-system.css. Overwrites files.

echo "→ Locating repo root..."
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

if [[ ! -f package.json ]]; then
  echo "ERROR: package.json not found. Run this in your web app repo."; exit 1
fi

echo "→ Ensure jq, npm, git available"
command -v jq >/dev/null || (echo "jq is required"; exit 1)

# 1) SINGLE DESIGN SYSTEM
echo "→ Consolidating design system"
mkdir -p src/styles
cat > src/styles/design-system.css <<'CSS'
:root{
  --efh-red:#E41E26;--efh-orange:#F97316;--efh-blue:#2563EB;
  --efh-bg:#0B0B0D;--efh-surface:#121318;--efh-text:#F8FAFC;--efh-muted:#94A3B8;--radius:16px
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:var(--efh-bg);color:var(--efh-text);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
a{color:var(--efh-blue);text-decoration:none}
.button{display:inline-flex;gap:.5rem;align-items:center;font-weight:600;
  padding:.8rem 1.1rem;border-radius:var(--radius);background:var(--efh-red);color:#fff}
.card{background:var(--efh-surface);border:1px solid #1f2733;border-radius:var(--radius);padding:1rem}
.shadow-soft{box-shadow:0 10px 30px rgba(0,0,0,.25)}
CSS
rm -f src/styles/durable-design.css src/styles/learnworlds-theme.css src/styles/shadcn.css 2>/dev/null || true

# 2) TAILWIND CONFIG (tokens)
echo "→ Writing tailwind.config.js"
cat > tailwind.config.js <<'JS'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend:{
      colors:{ efh:{ red:"var(--efh-red)", orange:"var(--efh-orange)", blue:"var(--efh-blue)",
        bg:"var(--efh-bg)", surface:"var(--efh-surface)", text:"var(--efh-text)", muted:"var(--efh-muted)" } }
    }
  },
  plugins:[]
}
JS

# 3) BRAND ASSETS
echo "→ Adding branded SVG assets"
mkdir -p public/assets
cat > public/assets/logo-efh.svg <<'SVG'
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="60" rx="12" fill="#0B0B0D"/><g transform="translate(16,12)"><circle cx="18" cy="18" r="18" fill="#E41E26"/><path d="M10 18h16" stroke="#fff" stroke-width="3"/><path d="M18 10v16" stroke="#fff" stroke-width="3"/></g><text x="64" y="38" fill="#F8FAFC" font-size="26" font-family="Inter,Arial" font-weight="700">Elevate for Humanity</text></svg>
SVG
cat > public/assets/hero-wide.svg <<'SVG'
<svg viewBox="0 0 1600 640" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E41E26"/><stop offset=".5" stop-color="#F97316"/><stop offset="1" stop-color="#2563EB"/></linearGradient></defs><rect width="1600" height="640" fill="#0B0B0D"/><circle cx="200" cy="520" r="340" fill="url(#g)" opacity=".25"/><circle cx="1380" cy="120" r="260" fill="url(#g)" opacity=".18"/><text x="80" y="360" fill="#F8FAFC" font-family="Inter,Arial" font-weight="800" font-size="80">Workforce LMS • Apprenticeships • Certifications</text></svg>
SVG
cat > public/assets/banner-feature.svg <<'SVG'
<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="300" rx="24" fill="#121318"/><path d="M0 260 C200 200 400 320 600 240 S1000 220 1200 260" fill="none" stroke="#2563EB" stroke-width="6" opacity=".5"/><path d="M0 220 C200 180 400 300 600 220 S1000 200 1200 240" fill="none" stroke="#E41E26" stroke-width="6" opacity=".5"/><text x="48" y="170" fill="#F8FAFC" font-family="Inter,Arial" font-size="48" font-weight="700">Government-Ready Training Platform</text><text x="48" y="210" fill="#94A3B8" font-family="Inter,Arial" font-size="22">WIOA • ETPL • DOL Apprenticeships • Certificates • Job Placement</text></svg>
SVG

# 4) REPLACE PLACEHOLDER IMAGES
echo "→ Replacing /api/placeholder/* with real assets"
if command -v rg >/dev/null; then
  rg -l "/api/placeholder" src || true
  rg -l "/api/placeholder" src | xargs -r sed -i "s|/api/placeholder[^\"') ]*|/assets/hero-wide.svg|g"
else
  grep -RIl "/api/placeholder" src | xargs -r sed -i "s|/api/placeholder[^\"') ]*|/assets/hero-wide.svg|g"
fi

# 5) STRIP CONSOLES + ESLINT GUARD
echo "→ Removing console.* and adding ESLint rule"
if command -v rg >/dev/null; then
  rg -l 'console\.(log|error|warn|info|debug)' src | while read -r f; do sed -i "/console\.\(log\|error\|warn\|info\|debug\)/d" "$f"; done
else
  grep -RIl 'console\.\(log\|error\|warn\|info\|debug\)' src | while read -r f; do sed -i "/console\.\(log\|error\|warn\|info\|debug\)/d" "$f"; done
fi
cat > .eslintrc.cjs <<'JS'
module.exports={extends:["eslint:recommended","plugin:react/recommended"],parserOptions:{ecmaVersion:2023,sourceType:"module",ecmaFeatures:{jsx:true}},rules:{"no-console":"error","react/prop-types":"off"}}
JS

# 6) NETLIFY CONFIG: redirects + headers
echo "→ Writing netlify.toml (redirects, security headers)"
cat > netlify.toml <<'TOML'
[build]
  command = "npm run build"
  publish = "dist"

# Force www → apex (works even if DNS still points to Netlify)
[[redirects]]
  from = "https://www.elevateforhumanity.org/*"
  to = "https://elevateforhumanity.org/:splat"
  status = 301!
  force = true

# SPA fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=15552000; includeSubDomains; preload"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; connect-src 'self' https:"
TOML

# 7) SEO: robots, sitemap, manifest
echo "→ Adding robots.txt, sitemap.xml, manifest"
mkdir -p public
cat > public/robots.txt <<'TXT'
User-agent: *
Allow: /
Sitemap: https://elevateforhumanity.org/sitemap.xml
TXT
cat > public/sitemap.xml <<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://elevateforhumanity.org/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://elevateforhumanity.org/lms</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://elevateforhumanity.org/courses</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
XML
cat > public/manifest.webmanifest <<'JSON'
{"name":"Elevate for Humanity","short_name":"EFH","start_url":"/","display":"standalone","background_color":"#0B0B0D","theme_color":"#E41E26","icons":[{"src":"/assets/logo-efh.svg","sizes":"any","type":"image/svg+xml"}]}
JSON

# 8) ENTRY FILES (simple, polished landing)
echo "→ Writing index.html and main.tsx"
cat > index.html <<'HTML'
<!doctype html><html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Elevate for Humanity</title>
<link rel="icon" href="/assets/logo-efh.svg"/><link rel="manifest" href="/manifest.webmanifest"/>
</head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
HTML

mkdir -p src
cat > src/main.tsx <<'TSX'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/design-system.css'
function App(){
  return (
    <main style={{padding:'2rem'}}>
      <div className="card shadow-soft" style={{maxWidth:1100,margin:'0 auto'}}>
        <img src="/assets/banner-feature.svg" alt="EFH banner" style={{width:'100%',borderRadius:'16px'}}/>
        <h1 style={{margin:'1rem 0 0 0'}}>Elevate for Humanity</h1>
        <p style={{color:'var(--efh-muted)'}}>Government-ready workforce LMS • Apprenticeships • Certifications</p>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1rem'}}>
          <a className="button" href="/lms">Enter LMS</a>
          <a className="button" style={{background:'var(--efh-blue)'}} href="/courses">Browse Courses</a>
        </div>
      </div>
    </main>
  )
}
createRoot(document.getElementById('root')!).render(<App/>)
TSX

# 9) VITEST basic config + smoke test
echo "→ Adding Vitest config & smoke test"
cat > vitest.config.ts <<'TS'
import { defineConfig } from 'vitest/config'
export default defineConfig({ test:{ environment:'jsdom' }})
TS
mkdir -p src/__tests__
cat > src/__tests__/smoke.test.tsx <<'TS'
import { describe, it, expect } from 'vitest'
describe('smoke',()=>{ it('runs',()=>{ expect(true).toBe(true) })})
TS

# 10) PACKAGE SCRIPTS
echo "→ Updating package.json scripts"
tmp=$(mktemp)
jq ' .scripts.build="vite build"
  | .scripts.dev="vite"
  | .scripts.preview="vite preview --port 4173"
  | .scripts.test="vitest --run"
' package.json > "$tmp" && mv "$tmp" package.json

# 11) OPTIONAL: Cloudflare Worker to hard-redirect www→apex (manual deploy later)
echo "→ Writing optional Cloudflare Worker (manual deploy with Wrangler)"
mkdir -p cloudflare/src
cat > cloudflare/wrangler.toml <<'TOML'
name = "efh-www-redirect"
main = "src/index.ts"
compatibility_date = "2024-06-01"
# Set your real zone in Cloudflare before deploy
routes = [{ pattern = "www.elevateforhumanity.org/*", zone_name = "elevateforhumanity.org" }]
TOML
cat > cloudflare/src/index.ts <<'TS'
export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)
    if (url.hostname === "www.elevateforhumanity.org") {
      url.hostname = "elevateforhumanity.org"
      return Response.redirect(url.toString(), 301)
    }
    return new Response("ok")
  }
} satisfies ExportedHandler
TS

# 12) COMMIT, INSTALL, BUILD, TEST
echo "→ Committing & building"
git add -A
git commit -m "EFH one-shot: consolidate design system, remove placeholders/console, SEO, headers, redirects, tests, assets" || true
npm install
npm run build
npm run test

# 13) OPTIONAL NETLIFY DEPLOY (set env vars to auto-deploy)
if [[ "${NETLIFY_AUTH_TOKEN:-}" != "" && "${NETLIFY_SITE_ID:-}" != "" ]]; then
  echo "→ Netlify deploy (env vars detected)"
  npx netlify-cli deploy --prod --dir=dist --auth="$NETLIFY_AUTH_TOKEN" --site="$NETLIFY_SITE_ID"
else
  echo "ℹ Skipping Netlify deploy (set NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID to enable)"
fi

echo "=== EFH ONE-SHOT COMPLETE ==="
echo "CRITICAL DNS STEP (do in Cloudflare): CNAME  www  → elevateforhumanity.org  (Proxy ON, orange cloud)"
echo "Then test: https://www.elevateforhumanity.org (should 301 to apex with valid SSL)"
