#!/usr/bin/env bash
set -euo pipefail

# 0) Make sure you're in the folder VS Code is remote-opening
echo "PWD: $(pwd)"
echo "Repo top (if git): $(git rev-parse --show-toplevel 2>/dev/null || echo 'not a git repo')"

# 1) Create .devcontainer + minimal config with host networking (fixes Ona/61000 too)
mkdir -p .devcontainer

cat > .devcontainer/devcontainer.json <<'JSON'
{
  "name": "elevate-react-app",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "runArgs": ["--network=host"],
  "remoteUser": "node",
  "postStartCommand": "bash .devcontainer/verify-ona.sh",
  "hostRequirements": { 
    "cpus": 2, 
    "memory": "4gb", 
    "storage": "32gb" 
  },
  "forwardPorts": [8012, 8080, 3000],
  "portsAttributes": {
    "3000": {
      "label": "🚀 Development Server",
      "onAutoForward": "openPreview",
      "protocol": "https",
      "visibility": "public"
    },
    "8012": {
      "label": "🚀 Alt Dev Server",
      "onAutoForward": "openPreview",
      "protocol": "https",
      "visibility": "public"
    },
    "8080": {
      "label": "📦 Production Preview",
      "onAutoForward": "openPreview",
      "protocol": "https",
      "visibility": "public"
    }
  },
  "postCreateCommand": "npm install -g pnpm@9.7.0 && pnpm install",
  "customizations": {
    "vscode": {
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash",
        "files.autoSave": "afterDelay",
        "files.autoSaveDelay": 1000,
        "editor.formatOnSave": true,
        "npm.packageManager": "pnpm"
      },
      "extensions": [
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-typescript-next",
        "ms-vscode.vscode-eslint",
        "bradlc.vscode-tailwindcss"
      ]
    }
  },
  "features": {
    "ghcr.io/devcontainers/features/git:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/github-cli:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "20"
    }
  },
  "remoteEnv": {
    "NODE_ENV": "development",
    "PNPM_HOME": "/usr/local/share/pnpm",
    "PATH": "${PNPM_HOME}:${PATH}"
  }
}
JSON

# 2) Small health-check helper
cat > .devcontainer/verify-ona.sh <<'BASH'
#!/usr/bin/env bash
set -euo pipefail
echo "🔎 Checking Ona agent on :61000…"
if command -v ss >/dev/null 2>&1; then
  ss -lntp | grep -E '(:|^)61000\b' || true
else
  netstat -lntp 2>/dev/null | grep -E '(:|^)61000\b' || true
fi
set +e
curl -fsS http://127.0.0.1:61000/health >/dev/null && echo "✅ Ona health OK (localhost)" || echo "⚠️ Ona health not reachable (localhost)"
if [ -n "${GITPOD_WORKSPACE_URL:-}" ]; then
  curl -fsS https://61000--${GITPOD_WORKSPACE_URL#https://}/health >/dev/null && echo "✅ Ona health OK (proxy)" || echo "⚠️ Ona health not reachable (proxy)"
fi
set -e
BASH
chmod +x .devcontainer/verify-ona.sh

echo "✅ Wrote .devcontainer/devcontainer.json and verify-ona.sh"
echo "➡️ Next: restart the dev container / environment."
