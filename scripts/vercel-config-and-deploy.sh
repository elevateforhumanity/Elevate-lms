#!/usr/bin/env bash
set -euo pipefail

###
# Gitpod helper to:
# 1. Attach elevateforhumanity.org + www.elevateforhumanity.org
#    to the correct Vercel project
# 2. Pull Vercel env config
# 3. Trigger a production deploy
#
# REQUIRED ENV VARS (set in Gitpod or .env):
#   VERCEL_TOKEN            -> Personal access token from Vercel
#   VERCEL_PROJECT_NAME     -> Vercel project name (e.g. "fix2-gpql")
# OPTIONAL:
#   VERCEL_TEAM_ID          -> If project is under a team, use that ID
#   ELEVATE_DOMAIN          -> Defaults to elevateforhumanity.org
###

# Load .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

ELEVATE_DOMAIN="${ELEVATE_DOMAIN:-elevateforhumanity.org}"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "❌ VERCEL_TOKEN is not set. Set it in Gitpod env or .env."
  exit 1
fi

if [[ -z "${VERCEL_PROJECT_NAME:-}" ]]; then
  echo "❌ VERCEL_PROJECT_NAME is not set (e.g. 'fix2-gpql')."
  exit 1
fi

BASE_URL="https://api.vercel.com"
AUTH_HEADER="Authorization: Bearer ${VERCEL_TOKEN}"
CONTENT_HEADER="Content-Type: application/json"

if [[ -n "${VERCEL_TEAM_ID:-}" ]]; then
  TEAM_QS="&teamId=${VERCEL_TEAM_ID}"
else
  TEAM_QS=""
fi

echo "🌐 Using project: ${VERCEL_PROJECT_NAME}"
echo "🌐 Attaching domain(s): ${ELEVATE_DOMAIN} and www.${ELEVATE_DOMAIN}"

### 1) Attach apex domain to the project
echo "🔗 Adding ${ELEVATE_DOMAIN} to project via Vercel API..."

ADD_APEX_RESPONSE=$(curl -sS -X POST \
  "${BASE_URL}/v10/projects/${VERCEL_PROJECT_NAME}/domains?force=true${TEAM_QS}" \
  -H "${AUTH_HEADER}" \
  -H "${CONTENT_HEADER}" \
  -d "$(jq -n --arg name "${ELEVATE_DOMAIN}" '{name: $name}')" \
  || true)

if echo "${ADD_APEX_RESPONSE}" | grep -q '"error"'; then
  echo "⚠️  Apex domain response:"
  echo "${ADD_APEX_RESPONSE}"
else
  echo "✅ Apex domain added or already attached."
fi

### 2) Attach www subdomain to the project
echo "🔗 Adding www.${ELEVATE_DOMAIN} to project via Vercel API..."

ADD_WWW_RESPONSE=$(curl -sS -X POST \
  "${BASE_URL}/v10/projects/${VERCEL_PROJECT_NAME}/domains?force=true${TEAM_QS}" \
  -H "${AUTH_HEADER}" \
  -H "${CONTENT_HEADER}" \
  -d "$(jq -n --arg name "www.${ELEVATE_DOMAIN}" '{name: $name}')" \
  || true)

if echo "${ADD_WWW_RESPONSE}" | grep -q '"error"'; then
  echo "⚠️  WWW domain response:"
  echo "${ADD_WWW_RESPONSE}"
else
  echo "✅ WWW domain added or already attached."
fi

cat <<'EOF'

💡 NOTE:
If either response mentions the domain is already in use by another project
(status 409), log into the Vercel dashboard and remove the domain from the
old project, then run this script again. This script cannot forcibly remove
the domain from another project for safety reasons.

EOF

### 3) Install Vercel CLI locally (if not installed)
if ! command -v vercel >/dev/null 2>&1; then
  echo "📦 Installing Vercel CLI locally..."
  npm install --global vercel
fi

### 4) Pull project environment configuration
echo "⬇️  Pulling Vercel environment configuration (production)..."
vercel pull --yes --environment=production --token "${VERCEL_TOKEN}"

### 5) Trigger a production deployment
echo "🚀 Deploying to Vercel production from Gitpod..."
vercel --prod --token "${VERCEL_TOKEN}"

echo "✅ Done. Once DNS is pointed to Vercel, elevateforhumanity.org and www.elevateforhumanity.org should show this project."
