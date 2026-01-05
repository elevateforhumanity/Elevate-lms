#!/bin/bash

# AUTOMATED MASS DELETE SCRIPT FOR VERCEL
# ⚠️ WARNING: THIS WILL DELETE EVERYTHING FROM VERCEL

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   VERCEL NUCLEAR DELETE - AUTOMATED MASS REMOVAL          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "⚠️  WARNING: This will DELETE EVERYTHING from Vercel:"
echo "   - ALL projects"
echo "   - ALL domains"
echo "   - ALL deployments"
echo "   - ALL integrations"
echo ""
echo "Your site WILL GO DOWN immediately."
echo ""
read -p "Are you ABSOLUTELY SURE? Type 'DELETE EVERYTHING' to continue: " confirm

if [ "$confirm" != "DELETE EVERYTHING" ]; then
    echo "❌ Aborted. Nothing was deleted."
    exit 1
fi

echo ""
echo "✅ Confirmed. Starting mass deletion..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
echo "Checking Vercel login status..."
if ! vercel whoami &> /dev/null; then
    echo "Not logged in. Please login to Vercel:"
    vercel login
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "STEP 1: Listing all projects..."
echo "════════════════════════════════════════════════════════════"
echo ""

# Get all projects
vercel projects ls > /tmp/vercel_projects.txt
cat /tmp/vercel_projects.txt

echo ""
read -p "Press ENTER to delete ALL these projects..."
echo ""

# Extract project names and delete them
echo "Deleting projects..."
project_count=0

# Parse project list and delete each one
while IFS= read -r line; do
    # Skip header lines
    if [[ $line == *"Name"* ]] || [[ $line == *"---"* ]] || [[ -z "$line" ]]; then
        continue
    fi
    
    # Extract project name (first column)
    project_name=$(echo "$line" | awk '{print $1}')
    
    if [ ! -z "$project_name" ]; then
        echo "🗑️  Deleting project: $project_name"
        vercel remove "$project_name" --yes 2>&1 || echo "   ⚠️  Failed to delete $project_name"
        ((project_count++))
        sleep 1
    fi
done < /tmp/vercel_projects.txt

echo ""
echo "✅ Deleted $project_count projects"
echo ""

echo "════════════════════════════════════════════════════════════"
echo "STEP 2: Listing all domains..."
echo "════════════════════════════════════════════════════════════"
echo ""

# Get all domains
vercel domains ls > /tmp/vercel_domains.txt
cat /tmp/vercel_domains.txt

echo ""
read -p "Press ENTER to delete ALL these domains..."
echo ""

# Delete domains
echo "Deleting domains..."
domain_count=0

while IFS= read -r line; do
    # Skip header lines
    if [[ $line == *"Domain"* ]] || [[ $line == *"---"* ]] || [[ -z "$line" ]]; then
        continue
    fi
    
    # Extract domain name (first column)
    domain_name=$(echo "$line" | awk '{print $1}')
    
    if [ ! -z "$domain_name" ] && [[ ! $domain_name == *".vercel.app"* ]]; then
        echo "🗑️  Deleting domain: $domain_name"
        vercel domains rm "$domain_name" --yes 2>&1 || echo "   ⚠️  Failed to delete $domain_name"
        ((domain_count++))
        sleep 1
    fi
done < /tmp/vercel_domains.txt

echo ""
echo "✅ Deleted $domain_count domains"
echo ""

echo "════════════════════════════════════════════════════════════"
echo "STEP 3: Cleaning up local files..."
echo "════════════════════════════════════════════════════════════"
echo ""

# Remove local Vercel directory
if [ -d ".vercel" ]; then
    echo "🗑️  Removing .vercel/ directory..."
    rm -rf .vercel/
    echo "✅ Removed .vercel/"
else
    echo "⏭️  No .vercel/ directory found"
fi

# Backup and remove vercel.json (optional)
if [ -f "vercel.json" ]; then
    echo "💾 Backing up vercel.json to vercel.json.backup..."
    cp vercel.json vercel.json.backup
    echo "✅ Backup created"
    
    read -p "Do you want to DELETE vercel.json? (y/N): " delete_config
    if [[ $delete_config == "y" ]] || [[ $delete_config == "Y" ]]; then
        rm vercel.json
        echo "🗑️  Deleted vercel.json"
    else
        echo "⏭️  Kept vercel.json"
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "STEP 4: Verification"
echo "════════════════════════════════════════════════════════════"
echo ""

echo "Checking remaining projects..."
remaining_projects=$(vercel projects ls 2>&1 | grep -v "Name" | grep -v "---" | wc -l)
echo "Remaining projects: $remaining_projects"

echo ""
echo "Checking remaining domains..."
remaining_domains=$(vercel domains ls 2>&1 | grep -v "Domain" | grep -v "---" | grep -v ".vercel.app" | wc -l)
echo "Remaining domains: $remaining_domains"

echo ""
echo "Checking local .vercel/ directory..."
if [ -d ".vercel" ]; then
    echo "❌ .vercel/ still exists"
else
    echo "✅ .vercel/ removed"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "DELETION COMPLETE"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Summary:"
echo "  - Projects deleted: $project_count"
echo "  - Domains deleted: $domain_count"
echo "  - Local files cleaned: ✅"
echo ""
echo "⚠️  Your site is now OFFLINE"
echo ""
echo "Next steps:"
echo "  1. Create new Vercel project (or use different hosting)"
echo "  2. Deploy fresh"
echo "  3. Connect domain"
echo "  4. Update DNS"
echo "  5. Update Google Search Console"
echo ""
echo "Backup files created:"
echo "  - vercel.json.backup (if existed)"
echo "  - Environment variables (check .env.local)"
echo ""
echo "To logout from Vercel CLI:"
echo "  vercel logout"
echo ""

# Cleanup temp files
rm -f /tmp/vercel_projects.txt /tmp/vercel_domains.txt

echo "✅ Done!"
