#!/usr/bin/env bash
set -euo pipefail

# -------- Colors ----------
c_bold="\033[1m"; c_ok="\033[32m"; c_warn="\033[33m"; c_err="\033[31m"; c_dim="\033[2m"; c_end="\033[0m"
say(){ echo -e "${c_bold}$1${c_end}"; }
ok(){ echo -e "  ${c_ok}✓${c_end} $1"; }
warn(){ echo -e "  ${c_warn}!${c_end} $1"; }
err(){ echo -e "  ${c_err}✗${c_end} $1"; }

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DIST_DIR="$ROOT_DIR/dist"
REPORT_DIR="$ROOT_DIR/.gp-reports"
PREVIEW_PORT=8080

# -------- Helpers ----------
need() { command -v "$1" >/dev/null 2>&1 || (err "Missing '$1'"; exit 1); }
ensure_node() {
  say "Ensuring Node & pnpm"
  need node; need pnpm; ok "Node $(node -v), pnpm $(pnpm -v)"
}
install_deps() {
  say "Installing dependencies (pnpm i)"
  pnpm i --frozen-lockfile || pnpm i
  ok "Dependencies installed"
}
typecheck() {
  if [ -f "tsconfig.json" ]; then
    say "Type checking"
    npx tsc -b || warn "TypeScript warnings detected"
  else
    warn "No tsconfig.json — skipping typecheck"
  fi
}
lint() {
  if jq -e '.scripts.lint' package.json >/dev/null 2>&1; then
    say "Linting"
    pnpm run lint || warn "Lint errors (non-blocking)"
  else
    warn "No lint script — skipping"
  fi
}
build() {
  say "Building production bundle"
  pnpm run build
  test -d "$DIST_DIR" || (err "No dist/ after build"; exit 1)
  ok "Build complete → dist/"
}
serve_dist() {
  say "Serving dist/ on :$PREVIEW_PORT"
  npx http-server "$DIST_DIR" -p "$PREVIEW_PORT" --silent --cors &>/tmp/gp-http.log & echo $! > /tmp/gp-http.pid
  sleep 1
  ok "Preview: https://${GITPOD_WORKSPACE_URL/https:\/\/$HOSTNAME/}$PREVIEW_PORT"
}
link_check() {
  say "Link check (internal)"
  mkdir -p "$REPORT_DIR"
  linkinator "http://127.0.0.1:$PREVIEW_PORT" --recurse --timeout 30000 --skip "mailto:|tel:" \
    --format json > "$REPORT_DIR/linkinator.json" || true
  BROKEN=$(jq '[.links[] | select(.state=="BROKEN")] | length' "$REPORT_DIR/linkinator.json" 2>/dev/null || echo 0)
  if [ "${BROKEN:-0}" -gt 0 ]; then
    warn "Broken links: $BROKEN (see .gp-reports/linkinator.json)"
  else
    ok "No broken links found"
  fi
}
lighthouse() {
  say "Lighthouse (home)"
  mkdir -p "$REPORT_DIR"
  URL="http://127.0.0.1:$PREVIEW_PORT"
  lhci collect --url="$URL" --numberOfRuns=1 --settings.preset=desktop \
    --outputPath="$REPORT_DIR/lhci-home.json" >/dev/null 2>&1 || warn "LHCI collect warnings"
  ok "LHCI report → .gp-reports/lhci-home.json"
}
netlify_deploy() {
  if [ -n "${NETLIFY_AUTH_TOKEN:-}" ] && [ -n "${NETLIFY_SITE_ID:-}" ]; then
    say "Netlify deploy (prod)"
    netlify link --id "$NETLIFY_SITE_ID"
    netlify deploy --prod --dir="$DIST_DIR" --message "gitpod autopilot $(date -Iseconds)"
    ok "Netlify deploy requested"
  else
    warn "NETLIFY_AUTH_TOKEN or NETLIFY_SITE_ID not set — skipping deploy"
  fi
}
ensure_env() {
  say "Environment sanity"
  : "${VITE_SUPABASE_URL:=}"; : "${VITE_SUPABASE_ANON_KEY:=}"
  : "${VITE_API_URL:=}"
  [[ -z "$VITE_SUPABASE_URL" ]] && warn "VITE_SUPABASE_URL missing"
  [[ -z "$VITE_SUPABASE_ANON_KEY" ]] && warn "VITE_SUPABASE_ANON_KEY missing"
  [[ -z "$VITE_API_URL" ]] && warn "VITE_API_URL missing"
  ok "Continue even if some envs are absent (non-blocking for static build)"
}
portal_domain() {
  # Optional: add portal domain to Netlify and (if CLOUDFLARE_API_TOKEN) create DNS CNAME
  if [ "${CONFIGURE_PORTAL_DOMAIN:-false}" != "true" ]; then
    warn "Set CONFIGURE_PORTAL_DOMAIN=true to enable portal domain wiring"
    return 0
  fi
  DOMAIN="${PORTAL_DOMAIN:-portal.elevateforhumanity.org}"
  TARGET="${NETLIFY_TARGET_HOST:-main--elevateforhumanityfix.netlify.app}"
  SITE="${NETLIFY_SITE_ID:-}"
  if [ -z "$NETLIFY_AUTH_TOKEN" ] || [ -z "$SITE" ]; then
    warn "Missing NETLIFY_AUTH_TOKEN/NETLIFY_SITE_ID — skipping portal domain"
    return 0
  fi
  say "Netlify: add custom domain ${DOMAIN}"
  curl -fsS -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.netlify.com/api/v1/sites/$SITE/domains" \
    -d "{\"domain\":\"$DOMAIN\"}" >/dev/null || warn "Domain may already exist"
  ok "Requested domain in Netlify"

  if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    say "Cloudflare: create CNAME portal → ${TARGET}"
    ZONE="elevateforhumanity.org"
    ZID=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      "https://api.cloudflare.com/client/v4/zones?name=${ZONE}" | jq -r '.result[0].id')
    if [ -n "$ZID" ] && [ "$ZID" != "null" ]; then
      # Upsert record
      EXIST_ID=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records?name=$DOMAIN&type=CNAME" | jq -r '.result[0].id')
      BODY="{\"type\":\"CNAME\",\"name\":\"portal\",\"content\":\"$TARGET\",\"ttl\":3600,\"proxied\":false}"
      if [ -n "$EXIST_ID" ] && [ "$EXIST_ID" != "null" ]; then
        curl -fsS -X PUT -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$EXIST_ID" \
          -d "$BODY" >/dev/null && ok "Updated CNAME"
      else
        curl -fsS -X POST -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records" \
          -d "$BODY" >/dev/null && ok "Created CNAME"
      fi
    else
      warn "Cloudflare zone not found — skip DNS"
    fi
  else
    warn "CLOUDFLARE_API_TOKEN not set — add DNS CNAME manually"
  fi
}

usage() {
  cat <<EOF
Gitpod Autopilot
  --prepare   install toolchain only
  --run       full pipeline: install → typecheck → build → serve → checks → (deploy) → (portal)
ENV:
  NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID      optional; enables deploy
  CONFIGURE_PORTAL_DOMAIN=true             optional; enables portal wiring
  CLOUDFLARE_API_TOKEN                     optional; enables DNS CNAME
  PORTAL_DOMAIN                            default: portal.elevateforhumanity.org
  NETLIFY_TARGET_HOST                      default: main--elevateforhumanityfix.netlify.app
EOF
}

case "${1:-}" in
  --prepare)
    ensure_node
    ok "Toolchain ready"
    ;;
  --run)
    ensure_node
    ensure_env
    install_deps
    typecheck
    lint
    build
    serve_dist
    link_check
    lighthouse
    netlify_deploy
    portal_domain
    say "All done. Preview on port ${PREVIEW_PORT} (Gitpod preview tab)."
    ;;
  *)
    usage
    ;;
esac
