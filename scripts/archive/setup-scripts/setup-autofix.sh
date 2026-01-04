#!/usr/bin/env bash
set -euo pipefail

# --- metadata ---
BRANCH="autofix-stack"

# ensure node 20
if command -v node >/dev/null 2>&1; then
  echo "Node version: $(node -v)"
else
  echo "Node not found. Installing via nvm..."
  export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  . "$HOME/.nvm/nvm.sh"
  nvm install 20 && nvm use 20
fi

# project dirs
mkdir -p .github/workflows branding .vscode .husky

# --- 1) Prettier ---
cat > .prettierrc.json << 'JSON'
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
JSON

# --- 2) EditorConfig ---
cat > .editorconfig << 'EOF'
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
EOF

# --- 3) ESLint (React/TS ready) ---
cat > eslint.config.js << 'JS'
// Flat config (ESLint 9)
import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: { react, hooks },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['class'] }],
      'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-newline': ['warn', { prevent: true }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-boolean-value': ['warn', 'never']
    },
    settings: { react: { version: 'detect' } }
  }
];
JS

# --- 4) Stylelint (with Tailwind) ---
cat > .stylelintrc.json << 'JSON'
{
  "extends": ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  "rules": {
    "color-hex-length": "short",
    "no-empty-source": null
  }
}
JSON

# --- 5) Tailwind brand tokens ---
mkdir -p branding
cat > branding/tokens.json << 'JSON'
{
  "brand": {
    "primary": "#0ea5e9",
    "secondary": "#7c3aed",
    "accent": "#22c55e",
    "neutral": "#111827"
  },
  "surface": {
    "background": "#ffffff",
    "muted": "#f3f4f6",
    "card": "#ffffff"
  },
  "text": {
    "base": "#0f172a",
    "muted": "#475569",
    "inverse": "#ffffff"
  }
}
JSON

# inject Tailwind config if exists
if [ -f tailwind.config.js ]; then
  echo "Patching tailwind.config.js with tokens..."
  awk '1; END{print "\n// injected by setup-autofix"; print "const tokens = require(\"./branding/tokens.json\");"; print "module.exports.theme = module.exports.theme || {};"; print "module.exports.theme.extend = { ...(module.exports.theme.extend||{}), colors: { brand: tokens.brand, surface: tokens.surface, text: tokens.text } };"}' tailwind.config.js > tailwind.config.js.tmp && mv tailwind.config.js.tmp tailwind.config.js
fi

# --- 6) VS Code settings ---
cat > .vscode/settings.json << 'JSON'
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  }
}
JSON

# --- 7) GitHub Actions: CI ---
cat > .github/workflows/ci.yml << 'YML'
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: corepack enable || true
      - run: |
          if [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile;
          elif [ -f bun.lockb ]; then curl -fsSL https://bun.sh/install | bash && export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && bun install;
          else npm ci; fi
      - run: npm run build --if-present
      - run: npm test --if-present
YML

# --- 8) GitHub Actions: Doctor (auto-fix + PR) ---
cat > .github/workflows/doctor.yml << 'YML'
name: Repo Doctor
on:
  workflow_dispatch:
  schedule:
    - cron: '0 11 * * *' # daily 11:00 UTC
jobs:
  doctor:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: corepack enable || true
      - name: Install deps
        run: |
          if [ -f pnpm-lock.yaml ]; then pnpm i; else npm i; fi
          npm i -D prettier eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks globals stylelint stylelint-config-standard stylelint-config-tailwindcss sort-package-json tailwindcss postcss autoprefixer
      - name: Lint & fix
        run: |
          npx sort-package-json || true
          npx prettier . --write || true
          npx eslint . --ext .js,.jsx,.ts,.tsx --fix || true
          npx stylelint "**/*.{css,pcss,scss}" --fix || true
      - name: Build check
        run: npm run build --if-present || echo "build failed, still proposing lint fixes"
      - name: Create PR
        uses: peter-evans/create-pull-request@v6
        with:
          title: "chore(doctor): auto-fixes and formatting"
          body: |
            This automated PR applies code style, lint, and config fixes.
            - Prettier formatting
            - ESLint/Stylelint fixes
            - Tailwind brand color injection (if configured)
          branch: chore/doctor-autofix
          commit-message: "chore(doctor): auto-fixes and formatting"
YML

# --- 9) Renovate config (App required) ---
cat > renovate.json << 'JSON'
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:recommended",
    ":semanticCommits",
    ":separateMajorReleases",
    "group:definitelyTypedMonorepo",
    "group:linters"
  ],
  "rangeStrategy": "bump",
  "packageRules": [
    { "matchManagers": ["github-actions"], "automerge": true },
    { "matchDepTypes": ["devDependencies"], "groupName": "dev tools" },
    { "matchPackagePatterns": ["^vite$", "^react", "^react-router"], "stabilityDays": 5 }
  ]
}
JSON

# --- 10) Dependabot security-only (optional) ---
mkdir -p .github
cat > .github/dependabot.yml << 'YML'
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule: { interval: weekly }
    open-pull-requests-limit: 2
    allow: []
    enable-beta-ecosystems: false
    security-updates: true
  - package-ecosystem: github-actions
    directory: "/"
    schedule: { interval: monthly }
    open-pull-requests-limit: 2
    security-updates: true
YML

# --- 11) Snyk workflow (App required) ---
cat > .github/workflows/snyk.yml << 'YML'
name: Snyk Scan
on:
  pull_request:
  schedule:
    - cron: '0 12 * * 1' # weekly Monday
jobs:
  security:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci || npm i
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
          args: --severity-threshold=high --all-projects
YML

# --- 12) SonarCloud workflow (App+project required) ---
cat > .github/workflows/sonar.yml << 'YML'
name: SonarCloud
on:
  pull_request:
  push:
    branches: [main]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci || npm i
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          projectBaseDir: .
YML

cat > sonar-project.properties << 'PROPS'
sonar.organization=efh
sonar.projectKey=efh_web
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.*
PROPS

# --- 13) Sweep AI bootstrap (optional) ---
mkdir -p .github/ISSUE_TEMPLATE
cat > .github/ISSUE_TEMPLATE/bug_report.yml << 'YML'
name: Bug report
description: Create a report to help us improve
labels: [bug]
body:
  - type: textarea
    id: describe
    attributes:
      label: Describe the bug
      description: Clear steps to reproduce; paste stack traces.
    validations:
      required: true
  - type: input
    id: url
    attributes:
      label: Affected URL (if any)
      placeholder: https://elevateforhumanity.pages.dev/path
YML

# --- 14) Package.json scripts patch ---
if [ -f package.json ]; then
  node - <<'NODE'
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
  pkg.scripts = {
    ...(pkg.scripts||{}),
    "format": "prettier . --write",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "css:lint": "stylelint \"**/*.{css,pcss,scss}\"",
    "css:fix": "stylelint \"**/*.{css,pcss,scss}\" --fix",
    "doctor": "npm run format && npm run lint:fix && npm run css:fix && npm run build --if-present"
  };
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
NODE
fi

# --- 15) Husky pre-commit (optional, skip if no git) ---
if [ -d .git ]; then
  npx husky-init --y || true
  echo "npm run format && npm run lint:fix && npm run css:fix" > .husky/pre-commit
  chmod +x .husky/pre-commit
fi

# --- install dev deps ---
if [ -f pnpm-lock.yaml ]; then
  pnpm add -D prettier eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks globals stylelint stylelint-config-standard stylelint-config-tailwindcss sort-package-json
else
  npm i -D prettier eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks globals stylelint stylelint-config-standard stylelint-config-tailwindcss sort-package-json
fi

echo "\n✅ Autofix stack files created. Create a branch, commit, push, and open a PR."
