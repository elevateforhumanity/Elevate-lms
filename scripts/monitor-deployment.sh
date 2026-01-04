#!/bin/bash
# Monitor Vercel deployment status until successful

set -e

PROJECT_ID="prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO"
TEAM_ID="team_Ae8f33vVYR36quLOS8HCeROs"
MAX_ATTEMPTS=60  # 10 minutes (60 attempts * 10 seconds)
ATTEMPT=0

echo "🔍 Monitoring Vercel deployment status..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not set"
    echo ""
    echo "To set it, run:"
    echo "  export VERCEL_TOKEN='your-token-here'"
    echo ""
    echo "Get your token from: https://vercel.com/account/tokens"
    exit 1
fi

# Function to check deployment status
check_deployment() {
    RESPONSE=$(curl -s "https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=1" \
      -H "Authorization: Bearer ${VERCEL_TOKEN}")
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to fetch deployment status"
        return 1
    fi
    
    STATE=$(echo "$RESPONSE" | jq -r '.deployments[0].state' 2>/dev/null)
    READY=$(echo "$RESPONSE" | jq -r '.deployments[0].ready' 2>/dev/null)
    URL=$(echo "$RESPONSE" | jq -r '.deployments[0].url' 2>/dev/null)
    CREATED=$(echo "$RESPONSE" | jq -r '.deployments[0].created' 2>/dev/null)
    UID=$(echo "$RESPONSE" | jq -r '.deployments[0].uid' 2>/dev/null)
    
    echo "$STATE|$READY|$URL|$CREATED|$UID"
}

# Function to display status
display_status() {
    local STATE=$1
    local READY=$2
    local URL=$3
    local CREATED=$4
    local UID=$5
    local ATTEMPT=$6
    
    TIMESTAMP=$(date +"%H:%M:%S")
    CREATED_TIME=$(date -d "@$((CREATED/1000))" +"%Y-%m-%d %H:%M:%S" 2>/dev/null || echo "N/A")
    
    echo "[$TIMESTAMP] Attempt $ATTEMPT/$MAX_ATTEMPTS"
    echo "  Deployment: $UID"
    echo "  Created: $CREATED_TIME"
    echo "  State: $STATE"
    echo "  Ready: $READY"
    echo "  URL: https://$URL"
    echo ""
}

# Monitor loop
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    ATTEMPT=$((ATTEMPT + 1))
    
    # Get deployment status
    RESULT=$(check_deployment)
    
    if [ $? -ne 0 ]; then
        echo "⚠️  Error checking deployment, retrying..."
        sleep 10
        continue
    fi
    
    # Parse result
    IFS='|' read -r STATE READY URL CREATED UID <<< "$RESULT"
    
    # Display status
    display_status "$STATE" "$READY" "$URL" "$CREATED" "$UID" "$ATTEMPT"
    
    # Check if deployment is successful
    if [ "$STATE" = "READY" ] && [ "$READY" = "true" ]; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "✅ DEPLOYMENT SUCCESSFUL!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🌐 Production URL: https://$URL"
        echo "📊 Deployment ID: $UID"
        echo "⏱️  Total time: $((ATTEMPT * 10)) seconds"
        echo ""
        exit 0
    fi
    
    # Check if deployment failed
    if [ "$STATE" = "ERROR" ]; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "❌ DEPLOYMENT FAILED!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "🔗 Check logs: https://vercel.com/${TEAM_ID}/${PROJECT_ID}/${UID}"
        echo ""
        exit 1
    fi
    
    # Check if deployment is canceled
    if [ "$STATE" = "CANCELED" ]; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "⚠️  DEPLOYMENT CANCELED"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        exit 1
    fi
    
    # Still building/queued, wait and retry
    if [ "$STATE" = "BUILDING" ] || [ "$STATE" = "QUEUED" ] || [ "$STATE" = "INITIALIZING" ]; then
        echo "⏳ Deployment in progress, checking again in 10 seconds..."
        echo ""
        sleep 10
        continue
    fi
    
    # Unknown state
    echo "⚠️  Unknown state: $STATE, checking again in 10 seconds..."
    echo ""
    sleep 10
done

# Timeout
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏱️  TIMEOUT: Deployment did not complete in $((MAX_ATTEMPTS * 10)) seconds"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Check status manually at: https://vercel.com/dashboard"
exit 1
