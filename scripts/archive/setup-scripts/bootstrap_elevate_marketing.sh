#!/usr/bin/env bash
set -euo pipefail

APP_NAME="elevate-www"
SITE_URL_DEFAULT="https://www.elevateforhumanity.org"

echo ">>> Creating Durable-style Astro site with Academy hub + secret/worker shims"

# 0) Pre-req checks
command -v node >/dev/null || { echo "Install Node 18+ first"; exit 1; }
command -v npm  >/dev/null || { echo "Install npm first"; exit 1; }

# 1) Fresh Astro project
rm -rf "$APP_NAME"
npm create astro@latest "$APP_NAME" -- --template minimal --typescript strict --skip-install >/dev/null
cd "$APP_NAME"
npm i

# 2) Add Tailwind + React islands
npx astro add tailwind --yes >/dev/null
npx astro add react --yes >/dev/null

# 3) Core config
cat > astro.config.mjs <<'EOF'
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org',
  integrations: [tailwind()],
  output: 'static',
  prefetch: true,
});
EOF

cat > tailwind.config.cjs <<'EOF'
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {50:'#f6fbf7',100:'#e9f6ec',200:'#cfead6',300:'#afd7bb',400:'#83be97',500:'#5aa47a',600:'#438765',700:'#386d53',800:'#2f5745',900:'#28483a'},
        sand:  {50:'#fbfaf8',100:'#f7f4ee',200:'#efe7da',300:'#e2d3bb',400:'#cdb38f',500:'#ae9168',600:'#8d7250',700:'#715b41',800:'#5b4a37',900:'#4b3e2f'}
      },
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { soft: '0 10px 30px rgba(20,20,20,.08)' }
    }
  },
  plugins: [],
}
EOF

mkdir -p src/{layouts,components,pages,styles} public netlify/edge-functions scripts

cat > src/styles/global.css <<'EOF'
@tailwind base; @tailwind components; @tailwind utilities;
html,body{ @apply bg-sand-50 text-slate-900 font-sans; }
.container{ @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
.card{ @apply bg-white rounded-2xl shadow-soft border border-sand-200; }
.btn{ @apply inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition; }
.btn-primary{ @apply btn bg-brand-600 text-white hover:bg-brand-700; }
.btn-ghost{ @apply btn bg-white text-brand-700 border border-sand-300 hover:bg-sand-100; }
.hero-title{ @apply text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight; }
.hero-sub{ @apply text-lg text-slate-600; }
EOF

# 4) ENV template (secrets + public)
cat > .env.example <<'EOF'
# PUBLIC
PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# LearnWorlds embed
PUBLIC_LEARNWORLDS_DOMAIN=your-school.learnworlds.com
PUBLIC_LEARNWORLDS_PATH=/course-catalog

# ACT WorkKeys links
PUBLIC_WORKKEYS_INFO_URL=https://www.act.org/workkeys
PUBLIC_WORKKEYS_SCHEDULE_URL=https://my.act.org/account/signin?returnurl=%2F

# Google Classroom share
PUBLIC_GC_SHARE_URL_BASE=https://classroom.google.com/share?url=
PUBLIC_GC_DEFAULT_SHARE_URL=https://www.elevateforhumanity.org/programs

# PRIVATE/BUILD (set as Netlify environment variables ideally)
# If not present, Edge Functions will proxy where possible.
SUPABASE_URL=
SUPABASE_ANON_KEY=
LEARNWORLDS_SSO_TOKEN=    # if you have one; optional
EOF

# 5) Netlify config: security, caching, prerender, edge routes
cat > netlify.toml <<'EOF'
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), camera=(), microphone=()"
    # Allow LW in iframe; allow Google auth frames; keep scripts tight
    Content-Security-Policy = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com; connect-src 'self' https://api.elevateforhumanity.org https://*.supabase.co; frame-src 'self' https://*.learnworlds.com https://accounts.google.com; base-uri 'self'; form-action 'self'"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Pre-render key public routes (instant, no skeletons)
[[plugins]]
  package = "@netlify/plugin-prerender"
  [plugins.inputs]
    routes = ["/","/programs","/partners","/contact","/academy"]

# Edge Functions: API shim/proxy when secrets missing
[[edge_functions]]
  path = "/api/*"
  function = "proxy"
EOF

npm i -D @netlify/plugin-prerender >/dev/null

# 6) Layout + Core components (Durable-inspired)
cat > src/layouts/Layout.astro <<'EOF'
---
const { title = "Elevate for Humanity", description = "Career & Technical Institute — training, apprenticeships, and wraparound support", url = import.meta.env.PUBLIC_SITE_URL } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <link rel="icon" href="/favicon.svg" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles/global.css" />
  </head>
  <body class="antialiased">
    <header class="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b border-sand-200 sticky top-0 z-40">
      <div class="container py-3 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2">
          <img src="/favicon.svg" class="w-8 h-8" alt="Elevate logo" />
          <span class="font-semibold">Elevate for Humanity</span>
        </a>
        <nav class="hidden md:flex gap-6 text-sm">
          <a href="/programs" class="hover:underline">Programs</a>
          <a href="/partners" class="hover:underline">Partners</a>
          <a href="/academy" class="hover:underline">Academy</a>
          <a href="/contact" class="hover:underline">Contact</a>
        </nav>
        <a href="/academy" class="btn text-sm">Get Started</a>
      </div>
    </header>
    <main class="min-h-[70vh]">
      <slot />
    </main>
    <footer class="mt-16">
      <div class="container py-12">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div><h3 class="font-semibold mb-2">About</h3><p class="text-slate-600 text-sm">Workforce training, apprenticeships, and support across Indiana.</p></div>
          <div><h3 class="font-semibold mb-2">Programs</h3><ul class="space-y-1 text-sm">
            <li><a class="link" href="/programs#barber">Barber Apprenticeship</a></li>
            <li><a class="link" href="/programs#building">Building Services Tech</a></li>
            <li><a class="link" href="/programs#healthcare">Healthcare (CNA/QMA)</a></li>
            <li><a class="link" href="/programs#digital">Digital Skills</a></li>
          </ul></div>
          <div><h3 class="font-semibold mb-2">Academy</h3><ul class="space-y-1 text-sm">
            <li><a class="link" href="/academy#learnworlds">LearnWorlds</a></li>
            <li><a class="link" href="/academy#workkeys">ACT WorkKeys</a></li>
            <li><a class="link" href="/academy#classroom">Google Classroom</a></li>
          </ul></div>
          <div><h3 class="font-semibold mb-2">Contact</h3><p class="text-sm text-slate-600">Marion County, IN</p></div>
        </div>
        <div class="border-t border-sand-200 mt-8 pt-6 text-sm text-slate-500">&copy; {new Date().getFullYear()} Elevate for Humanity</div>
      </div>
    </footer>
  </body>
</html>
EOF

cat > src/components/Hero.astro <<'EOF'
---
const title = "Career & Technical Training that Pays Off.";
const sub   = "State-approved programs, apprenticeships, and job placement — stacked with funding options.";
---
<section class="container py-14 sm:py-20">
  <div class="grid lg:grid-cols-2 gap-10 items-center">
    <div>
      <h1 class="hero-title">{title}</h1>
      <p class="hero-sub mt-4">{sub}</p>
      <div class="mt-8 flex gap-3">
        <a href="/academy" class="btn">Enter Academy</a>
        <a href="/programs" class="btn bg-white text-brand-700 border border-sand-300 hover:bg-sand-100">Browse Programs</a>
      </div>
    </div>
    <div class="card p-6">
      <img src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1600&auto=format&fit=crop" alt="" class="rounded-xl" />
    </div>
  </div>
</section>
EOF

cat > src/components/ProgramGrid.astro <<'EOF'
<section class="container py-10">
  <h2 class="text-2xl font-semibold mb-6">Popular Programs</h2>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <a id="barber" href="/programs#barber" class="card p-6 hover:shadow-lg transition">
      <h3 class="font-semibold">Barber Apprenticeship</h3>
      <p class="text-sm text-slate-600 mt-2">2,000 hrs, state licensure, paid pathways.</p>
    </a>
    <a id="building" href="/programs#building" class="card p-6 hover:shadow-lg transition">
      <h3 class="font-semibold">Building Services Technician</h3>
      <p class="text-sm text-slate-600 mt-2">OSHA-10, multi-trade fundamentals.</p>
    </a>
    <a id="healthcare" href="/programs#healthcare" class="card p-6 hover:shadow-lg transition">
      <h3 class="font-semibold">Healthcare (CNA/QMA)</h3>
      <p class="text-sm text-slate-600 mt-2">With accredited partner schools.</p>
    </a>
    <a id="digital" href="/programs#digital" class="card p-6 hover:shadow-lg transition">
      <h3 class="font-semibold">Digital Skills</h3>
      <p class="text-sm text-slate-600 mt-2">Office, cloud basics, certifications.</p>
    </a>
  </div>
</section>
EOF

# 7) Pages (Home, Programs, Partners, Contact)
cat > src/pages/index.astro <<'EOF'
---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero.astro";
import ProgramGrid from "../components/ProgramGrid.astro";
---
<Layout title="Elevate for Humanity — Career & Technical Institute" url={import.meta.env.PUBLIC_SITE_URL}>
  <Hero />
  <ProgramGrid />
</Layout>
EOF

cat > src/pages/programs.astro <<'EOF'
---
import Layout from "../layouts/Layout.astro";
---
<Layout title="Programs — Elevate for Humanity" url={import.meta.env.PUBLIC_SITE_URL + '/programs'}>
  <section class="container py-12 prose max-w-none">
    <h1>Programs</h1>
    <p>Our training aligns to in-demand occupations and stackable funding.</p>
    <h2 id="barber">Barber Apprenticeship</h2>
    <ul><li>2,000 hours • Licensure track • Employer partners • WIOA/WRG stack</li></ul>
    <h2 id="building">Building Services Technician</h2>
    <ul><li>OSHA-10 • NCCER intro • 8–16 weeks</li></ul>
    <h2 id="healthcare">Healthcare (CNA/QMA)</h2>
    <ul><li>Partner delivery • State testing</li></ul>
    <h2 id="digital">Digital Skills</h2>
    <ul><li>Office, PM, intro cloud • Cert prep</li></ul>
  </section>
</Layout>
EOF

cat > src/pages/partners.astro <<'EOF'
---
import Layout from "../layouts/Layout.astro";
---
<Layout title="Partners — Elevate for Humanity" url={import.meta.env.PUBLIC_SITE_URL + '/partners'}>
  <section class="container py-12 prose max-w-none">
    <h1>Partners</h1>
    <p>Employers, schools, and community organizations: let's align pathways, seats, and funding.</p>
  </section>
</Layout>
EOF

cat > src/pages/contact.astro <<'EOF'
---
import Layout from "../layouts/Layout.astro";
---
<Layout title="Contact — Elevate for Humanity" url={import.meta.env.PUBLIC_SITE_URL + '/contact'}>
  <section class="container py-12">
    <div class="card p-6 max-w-2xl mx-auto">
      <h1 class="text-xl font-semibold">Contact Us</h1>
      <form class="mt-6 grid gap-4">
        <input class="border rounded-xl px-3 py-2" placeholder="Your name" required />
        <input class="border rounded-xl px-3 py-2" placeholder="Email" type="email" required />
        <textarea class="border rounded-xl px-3 py-2" rows="5" placeholder="How can we help?"></textarea>
        <button class="btn w-full">Send</button>
      </form>
    </div>
  </section>
</Layout>
EOF

# 8) Academy Hub: LearnWorlds + WorkKeys + Google Classroom
cat > src/pages/academy.astro <<'EOF'
---
import Layout from "../layouts/Layout.astro";

const LW_DOMAIN = import.meta.env.PUBLIC_LEARNWORLDS_DOMAIN || "your-school.learnworlds.com";
const LW_PATH   = import.meta.env.PUBLIC_LEARNWORLDS_PATH   || "/course-catalog";
const LW_URL    = `https://${LW_DOMAIN}${LW_PATH}`;

const WK_INFO   = import.meta.env.PUBLIC_WORKKEYS_INFO_URL || "https://www.act.org/workkeys";
const WK_SCHED  = import.meta.env.PUBLIC_WORKKEYS_SCHEDULE_URL || "https://my.act.org/account/signin?returnurl=%2F";

const SHARE_BASE = import.meta.env.PUBLIC_GC_SHARE_URL_BASE || "https://classroom.google.com/share?url=";
const SHARE_URL  = import.meta.env.PUBLIC_GC_DEFAULT_SHARE_URL || "https://www.elevateforhumanity.org/programs";
const SHARE_FULL = `${SHARE_BASE}${encodeURIComponent(SHARE_URL)}`;
---
<Layout title="Academy — Elevate for Humanity" url={import.meta.env.PUBLIC_SITE_URL + '/academy'}>
  <section class="container py-10">
    <h1 class="text-2xl font-semibold mb-6">Academy Hub</h1>

    <!-- LearnWorlds -->
    <div id="learnworlds" class="card p-6 mb-10">
      <h2 class="text-xl font-semibold mb-3">LearnWorlds Portal</h2>
      <p class="text-slate-600 mb-4">Access courses, paths, and assessments directly in our portal.</p>
      <div class="aspect-[16/9] w-full">
        <iframe src={LW_URL} class="w-full h-full rounded-xl border" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      <p class="text-xs text-slate-500 mt-3">Configure with <code>PUBLIC_LEARNWORLDS_DOMAIN</code> and <code>PUBLIC_LEARNWORLDS_PATH</code>.</p>
    </div>

    <!-- WorkKeys -->
    <div id="workkeys" class="card p-6 mb-10">
      <h2 class="text-xl font-semibold mb-3">ACT WorkKeys®</h2>
      <p class="text-slate-600">We align training to the National Career Readiness Certificate (NCRC). Learn what's covered and schedule testing.</p>
      <div class="mt-4 flex gap-3">
        <a class="btn" href={WK_INFO} target="_blank" rel="noopener">About WorkKeys</a>
        <a class="btn bg-white text-brand-700 border border-sand-300 hover:bg-sand-100" href={WK_SCHED} target="_blank" rel="noopener">Schedule / Sign In</a>
      </div>
    </div>

    <!-- Google Classroom -->
    <div id="classroom" class="card p-6">
      <h2 class="text-xl font-semibold mb-3">Google Classroom</h2>
      <p class="text-slate-600">Share Elevate courses and pages with your class. (Admins can enable deeper sync later.)</p>
      <a class="btn" href={SHARE_FULL} target="_blank" rel="noopener">Share this to Classroom</a>
      <p class="text-xs text-slate-500 mt-3">For deeper integration (rosters/assignments), add OAuth later; this button works now.</p>
    </div>
  </section>
</Layout>
EOF

# 9) Public assets
mkdir -p public/styles
cat > public/favicon.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#5aa47a"/><path d="M18 36c6-8 10-12 14-12s8 4 14 12" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/></svg>
EOF

# 9) Minimal favicon
cat > public/favicon.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#5aa47a"/><path d="M18 36c6-8 10-12 14-12s8 4 14 12" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/></svg>
EOF

# 10) Package scripts
node -e "let p=require('./package.json'); p.scripts={...p.scripts,dev:'astro dev',build:'astro build',preview:'astro preview'}; require('fs').writeFileSync('package.json', JSON.stringify(p,null,2));"

# 11) Edge Function: /api/* proxy (works without secrets, upgrades when present)
cat > netlify/edge-functions/proxy.ts <<'EOF'
/**
 * Universal proxy for LearnWorlds (embed), and simple JSON helpers.
 * If private tokens (e.g., LEARNWORLDS_SSO_TOKEN) exist in env, they are added server-side.
 */
export default async (request: Request, context: any) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\//, '');
  const params = url.searchParams;

  // Health
  if (path === 'health') return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });

  // LearnWorlds embed passthrough (avoid CORS/frame issues, inject SSO token if present)
  if (path === 'learnworlds') {
    const domain = params.get('domain');
    const lwPath = params.get('path') || '/course-catalog';
    if (!domain) return new Response('Missing domain', { status: 400 });

    const upstream = `https://${domain}${lwPath}`;
    const headers: Record<string,string> = { 'user-agent': 'ElevateEdge/1.0' };

    // Optional private enhancement: forward SSO token if you have it
    const sso = context.env?.LEARNWORLDS_SSO_TOKEN;
    if (sso) headers['x-lw-sso'] = sso;

    const r = await fetch(upstream, { headers });
    const csp = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-src 'self' https://*.learnworlds.com; connect-src 'self'";
    return new Response(r.body, {
      status: r.status,
      headers: {
        'content-type': r.headers.get('content-type') || 'text/html',
        'x-elevate-proxy': 'learnworlds',
        'content-security-policy': csp
      }
    });
  }

  // Fallback
  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'content-type': 'application/json' } });
}
EOF

# 12) Secret seeding script — uses Netlify if tokens present, else writes .env and relies on edge proxy
cat > scripts/ensure-secrets.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
have(){ command -v "$1" >/dev/null 2>&1; }

SITE_ID="${NETLIFY_SITE_ID:-}"
AUTH="${NETLIFY_AUTH_TOKEN:-}"

declare -A need=(
  [SUPABASE_URL]="${SUPABASE_URL:-}"
  [SUPABASE_ANON_KEY]="${SUPABASE_ANON_KEY:-}"
  [LEARNWORLDS_SSO_TOKEN]="${LEARNWORLDS_SSO_TOKEN:-}"
)

seed_netlify(){
  echo ">> Seeding secrets to Netlify env"
  netlify link --id "$SITE_ID" >/dev/null
  for k in "${!need[@]}"; do
    val="${need[$k]}"
    if [ -n "$val" ]; then
      netlify env:set "$k" "$val" -s "$SITE_ID" >/dev/null && echo "  • set $k"
    else
      echo "  • $k missing — skipping (edge proxy will handle public flows)"
    fi
  done
}

write_env(){
  echo ">> Writing local .env (for dev only)"
  [ -f .env ] || touch .env
  for k in "${!need[@]}"; do
    val="${need[$k]}"
    if ! grep -q "^$k=" .env 2>/dev/null; then
      echo "$k=${val}" >> .env
      echo "  • wrote $k (empty allowed)"
    fi
  done
  echo "PUBLIC_SITE_URL=${PUBLIC_SITE_URL:-$SITE_URL_DEFAULT}" >> .env || true
}

main(){
  if have netlify && [ -n "$SITE_ID" ] && [ -n "$AUTH" ]; then
    seed_netlify
    echo ">> Secrets seeded (if provided). If some were missing, the Edge proxy keeps pages functional."
  else
    echo ">> Netlify CLI or credentials not present — skipping remote seed."
  fi
  write_env
}
main "$@"
EOF
chmod +x scripts/ensure-secrets.sh

echo ">>> Done.

Next steps:
1) cp .env.example .env  # fill PUBLIC_* values; private vars optional
2) bash scripts/ensure-secrets.sh  # will set Netlify envs if NETLIFY_* present, else keep .env + Edge proxy
3) npm run dev   # local
4) Deploy on Netlify (build: npm run build, publish: dist). Edge proxy at /api/* works even without secrets."
