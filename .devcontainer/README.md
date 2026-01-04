# Dev Container Configuration

## Important: Gitpod vs Codespaces

This project supports both Gitpod and GitHub Codespaces, but they use **different configuration files**:

### For Gitpod (Current Environment)
- **Config file:** `.gitpod.yml` (root directory)
- **Dockerfile:** `.gitpod.Dockerfile` (root directory)
- **Status:** ✅ Active and simplified

### For GitHub Codespaces
- **Config file:** `.devcontainer/devcontainer.json.codespaces-only`
- **Status:** ⚠️ Renamed to prevent conflicts with Gitpod

## Why the Change?

The original setup had both `.gitpod.yml` AND `.devcontainer/devcontainer.json` active, causing Gitpod to get confused about which configuration to use. This resulted in Node.js not being available in the terminal.

**Solution:** 
- Gitpod now uses only `.gitpod.yml` + `.gitpod.Dockerfile`
- Dev Container config renamed to `.codespaces-only` suffix
- If you need Codespaces support, rename it back to `devcontainer.json`

## To Use This Project

### In Gitpod (Recommended)
1. Open in Gitpod (it will use `.gitpod.yml`)
2. Wait for setup to complete
3. Node.js, pnpm, and dependencies will be ready
4. Dev server starts automatically

### In GitHub Codespaces
1. Rename `.devcontainer/devcontainer.json.codespaces-only` to `devcontainer.json`
2. Open in Codespaces
3. It will use the Dev Container configuration

### Locally
1. Install Node.js 20+
2. Enable corepack: `corepack enable`
3. Install pnpm: `corepack prepare pnpm@latest --activate`
4. Install dependencies: `pnpm install`
5. Set up environment: `cp .env.example .env.local` (then edit)
6. Start dev server: `pnpm dev`

## Configuration Files

```
.
├── .gitpod.yml                          # Gitpod configuration (ACTIVE)
├── .gitpod.Dockerfile                   # Gitpod Docker image (ACTIVE)
└── .devcontainer/
    ├── devcontainer.json.codespaces-only # Codespaces config (INACTIVE)
    └── README.md                         # This file
```

## Troubleshooting

### "Node not found" in Gitpod
- The workspace should rebuild automatically with the new `.gitpod.yml`
- If not, stop and restart the workspace
- Check that `.gitpod.Dockerfile` exists and uses `gitpod/workspace-node:20`

### Want to use Codespaces instead?
```bash
cd .devcontainer
mv devcontainer.json.codespaces-only devcontainer.json
```

Then commit and open in Codespaces.

## Changes Made (Dec 31, 2025)

1. **Simplified .gitpod.yml** - Removed 32KB of complex tasks, kept only essentials
2. **Renamed devcontainer.json** - Prevents Gitpod confusion
3. **Single source of truth** - Gitpod uses `.gitpod.yml`, Codespaces uses `.devcontainer/`
4. **Verified Node.js path** - Dockerfile uses `gitpod/workspace-node:20` base image

## Next Steps

After workspace restarts with new config:
1. Verify Node.js: `node -v` (should show v20.x)
2. Verify pnpm: `pnpm -v`
3. Check dependencies: `ls node_modules` (should be populated)
4. Start dev server: `pnpm dev`
5. Access at port 3000 (opens automatically)
