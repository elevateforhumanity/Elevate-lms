#!/usr/bin/env bash
set -euo pipefail

echo "=== 1) Basic sanity checks ==="
node -v || true
npm -v || true

if [ ! -f package.json ]; then
  echo "ERROR: Run this from the repo root (package.json not found)."
  exit 1
fi

echo "=== 2) Add/overwrite vercel.json to prevent HTML caching ==="
# This only controls headers/redirects on Vercel. Safe and recommended.
cat > vercel.json <<'JSON'
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store, max-age=0" }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/favicon.ico",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
  ]
}
JSON

echo "=== 3) Add Service Worker unregister guard (Next.js App Router friendly) ==="
# We create a tiny client component and inject it into app/layout.tsx.
mkdir -p app/components

cat > app/components/UnregisterSW.tsx <<'TSX'
"use client";

import { useEffect } from "react";

export default function UnregisterSW() {
  useEffect(() => {
    // If any Service Worker is controlling this site, unregister it.
    // This is the #1 reason mobile keeps forcing an older build.
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .catch(() => {});
    }

    // Also try to clear Cache Storage if present.
    if ("caches" in window) {
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .catch(() => {});
    }
  }, []);

  return null;
}
TSX

if [ -f app/layout.tsx ]; then
  echo "Found app/layout.tsx, injecting UnregisterSW…"

  # Add import if missing
  if ! grep -q 'UnregisterSW' app/layout.tsx; then
    # Insert import after the first import line or at top
    awk '
      NR==1 {print; next}
      NR==2 && $0 ~ /^import/ {
        print "import UnregisterSW from \"./components/UnregisterSW\";";
        print;
        next
      }
      NR==2 {
        print "import UnregisterSW from \"./components/UnregisterSW\";";
        print;
        next
      }
      {print}
    ' app/layout.tsx > /tmp/layout.tsx && mv /tmp/layout.tsx app/layout.tsx
  fi

  # Insert <UnregisterSW /> right after <body ...> if possible
  if ! grep -q '<UnregisterSW' app/layout.tsx; then
    perl -0777 -i -pe 's/(<body[^>]*>)/$1\n        <UnregisterSW \/>\n/sg' app/layout.tsx
  fi
else
  echo "WARNING: app/layout.tsx not found. If you are using Pages Router, tell me and I will adjust injection for pages/_app.tsx."
fi

echo "=== 4) Clean install + clean build ==="
rm -rf node_modules .next
npm ci || npm install
npm run build

echo "=== DONE ==="
echo "Next steps:"
echo "1) Commit these changes and push to main."
echo "2) In Vercel, Redeploy and (IMPORTANT) choose Clear Cache / Redeploy without cache if available."
echo "3) If using Cloudflare, Purge Everything."
echo "4) On the problem phone: clear site storage + unregister SW (steps in my message)."
