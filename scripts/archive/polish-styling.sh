#!/usr/bin/env bash
set -euo pipefail

echo "🎨 Setting up EFH Brand Polish & Enforcement System..."

# 1) Dev deps for styling discipline, tests, and audits
echo "📦 Installing dependencies..."
pkg() { 
  if ! jq -r .name package.json >/dev/null 2>&1; then 
    npm init -y
  fi
  npm i -D "$@"
}

pkg prettier eslint stylelint postcss autoprefixer \
  eslint-plugin-tailwindcss stylelint-config-standard stylelint-order \
  stylelint-no-unsupported-browser-features \
  @playwright/test lighthouse @lhci/cli \
  typescript ts-node @types/node

# 2) Basic prettier + eslint + stylelint configs
echo "⚙️  Creating config files..."

cat > .prettierrc <<'EOF'
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
EOF

cat > .eslintrc.cjs <<'EOF'
module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  plugins: ["tailwindcss"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  env: { browser: true, node: true, es2021: true },
  rules: {
    // BLOCK hard-coded colors in JS/TS/JSX (encourage tokens/Tailwind classes)
    "no-restricted-syntax": [
      "error",
      { 
        "selector": "Literal[value=/^#([0-9a-fA-F]{3,8})$/]", 
        "message": "❌ Use brand tokens (var(--brand-*)) or Tailwind classes (bg-brand-*) instead of hardcoded hex colors." 
      }
    ],
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "off"
  },
  settings: { tailwindcss: { callees: ["cn","cva","clsx"] } }
}
EOF

cat > .stylelintrc.cjs <<'EOF'
module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    // Ban raw colors; use CSS variables or Tailwind utilities
    "color-hex-length": "long",
    "color-named": "never",
    "declaration-property-value-disallowed-list": {
      "/^(background|color|border|outline|box-shadow|text-shadow)$/": [
        "/^#(?!fff|ffffff|000|000000)/i",
        "/^rgb/",
        "/^hsl/"
      ]
    },
    "order/properties-alphabetical-order": true,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen", "layer"]
      }
    ]
  },
  ignoreFiles: [
    "node_modules/**/*",
    "dist/**/*",
    "build/**/*",
    "src/styles/brand.css"
  ]
}
EOF

# 3) PostCSS (autoprefixer)
cat > postcss.config.cjs <<'EOF'
module.exports = { 
  plugins: { 
    autoprefixer: {} 
  } 
}
EOF

# 4) Tailwind safelist (append if tailwind.config.* exists)
echo "🎯 Updating Tailwind config with safelist..."
TARGET=$(ls tailwind.config.* 2>/dev/null | head -n1 || true)
if [ -n "$TARGET" ]; then
  node - "$TARGET" <<'EOF'
const fs = require('fs');
const file = process.argv[2];
let src = fs.readFileSync(file,'utf8');
if(!src.includes('safelist')) {
  // Find the export statement and add safelist
  src = src.replace(/(export default \{|module\.exports\s*=\s*\{)/, match => `${match}
  safelist: [
    // Brand color patterns
    { pattern: /(bg|text|border|from|to|via)-(brand)-(primary|secondary|success|info|warning|danger|text|surface|border)(-hover|-active|-light|-dark)?/ },
    // Utility patterns
    { pattern: /(rounded|shadow)-(brand)-(sm|md|lg)?/ },
  ],`);
  fs.writeFileSync(file, src);
  console.log(`✓ Added Tailwind safelist to ${file}`);
} else {
  console.log(`• Tailwind safelist already present in ${file}`);
}
EOF
else
  echo "⚠️  No Tailwind config detected; skipping safelist."
fi

# 5) Contrast & token guard (reads autopilot-brand.json + CSS vars)
echo "🛡️  Creating brand guard tool..."
mkdir -p tools

cat > tools/brand-guard.ts <<'EOF'
import fs from 'fs'

type Brand = { 
  colors: Record<string, string>
  contrast: { minAA: number; minAAA: number }
}

function luminance(hex: string): number {
  const c = hex.replace('#', '')
  const n = (i: number) => parseInt(c.slice(i, i + 2), 16) / 255
  const [r, g, b] = [n(0), n(2), n(4)].map(v =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const L1 = luminance(a)
  const L2 = luminance(b)
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}

const brandFile = 'autopilot-brand.json'
if (!fs.existsSync(brandFile)) {
  console.warn('⚠️  brand-guard: autopilot-brand.json not found; skipping.')
  process.exit(0)
}

const brand = JSON.parse(fs.readFileSync(brandFile, 'utf8')) as Brand
const minAA = brand.contrast?.minAA || 4.5
const minAAA = brand.contrast?.minAAA || 7.0

// Define critical color pairs to check
const pairs = [
  { bg: 'background', text: 'text', name: 'Body text on background' },
  { bg: 'surface', text: 'text', name: 'Text on surface' },
  { bg: 'primary', text: 'onPrimary', name: 'Text on primary buttons' },
  { bg: 'secondary', text: 'onSecondary', name: 'Text on secondary buttons' },
  { bg: 'success', text: 'onSuccess', name: 'Text on success elements' },
  { bg: 'info', text: 'onInfo', name: 'Text on info elements' },
  { bg: 'warning', text: 'onWarning', name: 'Text on warning elements' },
  { bg: 'danger', text: 'onDanger', name: 'Text on danger elements' },
]

let failures = 0
let warnings = 0

console.log('\n🎨 Brand Contrast Guard\n')
console.log('Checking WCAG compliance for brand color pairs...\n')

for (const pair of pairs) {
  const bgHex = brand.colors[pair.bg]
  const txHex = brand.colors[pair.text]

  if (!bgHex || !txHex) {
    console.warn(`⚠️  Missing color: ${pair.bg} or ${pair.text}`)
    continue
  }

  if (!bgHex.startsWith('#') || !txHex.startsWith('#')) {
    console.warn(`⚠️  Invalid hex format: ${bgHex} or ${txHex}`)
    continue
  }

  const ratio = contrast(bgHex, txHex)

  if (ratio < minAA) {
    console.error(`❌ ${pair.name}: ${ratio.toFixed(2)}:1 (FAIL - below AA ${minAA}:1)`)
    console.error(`   ${txHex} on ${bgHex}`)
    failures++
  } else if (ratio < minAAA) {
    console.warn(`⚠️  ${pair.name}: ${ratio.toFixed(2)}:1 (AA pass, AAA fail)`)
    console.warn(`   ${txHex} on ${bgHex}`)
    warnings++
  } else {
    console.log(`✅ ${pair.name}: ${ratio.toFixed(2)}:1 (AAA compliant)`)
  }
}

console.log('')

if (failures > 0) {
  console.error(`\n❌ Brand guard FAILED: ${failures} pairs below WCAG AA (${minAA}:1)`)
  console.error('Fix these contrast issues before deploying.\n')
  process.exit(1)
} else if (warnings > 0) {
  console.log(`\n✅ Brand guard PASSED (AA compliant)`)
  console.log(`⚠️  ${warnings} pairs below AAA (${minAAA}:1) - consider improving\n`)
  process.exit(0)
} else {
  console.log(`\n✅ Brand guard PASSED - All pairs AAA compliant!\n`)
  process.exit(0)
}
EOF

# 6) Visual regression with Playwright (basic)
echo "📸 Setting up visual regression tests..."
mkdir -p tests

cat > tests/ui.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'

const pages = [
  { route: '/', name: 'home' },
  { route: '/programs', name: 'programs' },
  { route: '/lms', name: 'lms' },
  { route: '/apply', name: 'apply' },
]

for (const page of pages) {
  test(`visual regression: ${page.name}`, async ({ page: pw }) => {
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000'
    await pw.goto(baseUrl + page.route)
    await pw.waitForLoadState('networkidle')
    
    // Wait for any animations to complete
    await pw.waitForTimeout(500)
    
    // Take screenshot
    expect(await pw.screenshot({ fullPage: true })).toMatchSnapshot(
      `${page.name}.png`,
      { maxDiffPixels: 200 }
    )
  })
}

test('no console errors on home page', async ({ page }) => {
  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000'
  await page.goto(baseUrl)
  await page.waitForLoadState('networkidle')
  
  expect(errors).toHaveLength(0)
})
EOF

cat > playwright.config.ts <<'EOF'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.SITE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
EOF

# 7) Lighthouse CI config
echo "💡 Configuring Lighthouse CI..."
cat > .lighthouserc.json <<'EOF'
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/programs/",
        "http://localhost:3000/lms/"
      ],
      "numberOfRuns": 1
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["warn", { "minScore": 0.85 }],
        "categories:seo": ["warn", { "minScore": 0.90 }]
      }
    }
  }
}
EOF

# 8) NPM scripts
echo "📝 Updating package.json scripts..."
node - <<'EOF'
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

pkg.scripts = pkg.scripts || {}

// Add new scripts
Object.assign(pkg.scripts, {
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint:css": "stylelint \"**/*.{css,scss,pcss}\"",
  "lint:js": "eslint --ext .js,.jsx,.ts,.tsx .",
  "lint:all": "npm run lint:js && npm run lint:css && npm run lint:brand",
  "brand:guard": "ts-node tools/brand-guard.ts",
  "test:ui": "playwright test",
  "test:ui:update": "playwright test --update-snapshots",
  "audit:lighthouse": "lhci autorun",
  "polish:check": "npm run format:check && npm run lint:all && npm run brand:guard",
  "polish:fix": "npm run format && npm run fix:brand",
  "ci:polish": "npm run brand:guard && npm run lint:all && npm run test:ui && npm run audit:lighthouse"
})

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
console.log('✓ Updated package.json scripts')
EOF

# 9) Git hooks setup (if .git exists)
if [ -d .git ]; then
  echo "🪝 Setting up git hooks..."
  mkdir -p .husky
  
  cat > .husky/pre-commit <<'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🎨 Running brand polish checks..."
npm run brand:guard || exit 1
npm run lint:js || exit 1
npm run lint:css || exit 1
echo "✅ Pre-commit checks passed!"
EOF
  
  chmod +x .husky/pre-commit
  echo "✓ Git pre-commit hook installed"
else
  echo "⚠️  No .git directory found; skipping git hooks"
fi

echo ""
echo "✅ EFH Brand Polish & Enforcement System installed!"
echo ""
echo "📚 Available commands:"
echo "  npm run format           # Auto-format code"
echo "  npm run lint:all         # Lint JS, CSS, and brand colors"
echo "  npm run brand:guard      # Check WCAG contrast compliance"
echo "  npm run test:ui          # Visual regression tests"
echo "  npm run audit:lighthouse # Performance & accessibility audit"
echo "  npm run polish:check     # Run all checks"
echo "  npm run polish:fix       # Auto-fix what can be fixed"
echo "  npm run ci:polish        # Full CI suite"
echo ""
echo "🎯 Next steps:"
echo "  1. Run: npx playwright install"
echo "  2. Create: autopilot-brand.json (see docs)"
echo "  3. Test: npm run polish:check"
echo ""
EOF

chmod +x polish-styling.sh

<function_calls>
<invoke name="todo_next">
</invoke>