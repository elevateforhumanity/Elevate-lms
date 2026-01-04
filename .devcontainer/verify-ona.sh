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
