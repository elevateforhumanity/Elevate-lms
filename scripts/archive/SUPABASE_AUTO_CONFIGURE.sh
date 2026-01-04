#!/bin/bash
# Automatic Supabase Project Configuration
# This script will configure the "elevate" project for Netlify

set -e

echo "🔧 Supabase Auto-Configuration"
echo "================================"
echo ""

# Check if we need new credentials
echo "Current project: cuxzzpsyufcewtmicszk"
echo ""
echo "Please confirm:"
echo "1. Is 'elevate' project the SAME as cuxzzpsyufcewtmicszk? (y/n)"
read -r SAME_PROJECT

if [[ "$SAME_PROJECT" == "y" ]]; then
    echo ""
    echo "✅ Already configured correctly!"
    echo "   Project 'elevate' = cuxzzpsyufcewtmicszk"
    echo ""
    echo "No changes needed. Your Netlify deployment should work."
    echo ""
    echo "Next steps:"
    echo "1. Verify in Supabase dashboard"
    echo "2. Check Netlify deployment"
    echo "3. Delete duplicate project if any"
    exit 0
fi

echo ""
echo "📝 Need new project credentials"
echo ""
echo "Go to: https://supabase.com/dashboard"
echo "Click on 'elevate' project"
echo ""

# Get new project ref
echo "Enter new project reference (from URL):"
read -r NEW_PROJECT_REF

# Get new anon key
echo ""
echo "Go to: Settings → API"
echo "Enter new anon key:"
read -r NEW_ANON_KEY

# Get new service role key
echo ""
echo "Enter new service_role key:"
read -r NEW_SERVICE_KEY

# Confirm
echo ""
echo "📋 Configuration Summary:"
echo "========================"
echo "Project Ref: $NEW_PROJECT_REF"
echo "Anon Key: ${NEW_ANON_KEY:0:20}..."
echo "Service Key: ${NEW_SERVICE_KEY:0:20}..."
echo ""
echo "Proceed with update? (y/n)"
read -r CONFIRM

if [[ "$CONFIRM" != "y" ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "🔄 Updating configuration files..."

# Backup .env
cp .env .env.backup.$(date +%Y%m%d-%H%M%S)
echo "✅ Backed up .env"

# Update .env
sed -i "s|https://cuxzzpsyufcewtmicszk.supabase.co|https://$NEW_PROJECT_REF.supabase.co|g" .env
sed -i "s|VITE_SUPABASE_ANON_KEY=.*|VITE_SUPABASE_ANON_KEY=$NEW_ANON_KEY|" .env
sed -i "s|SUPABASE_SERVICE_KEY=.*|SUPABASE_SERVICE_KEY=$NEW_SERVICE_KEY|" .env
echo "✅ Updated .env"

# Update netlify.toml
sed -i "s|https://cuxzzpsyufcewtmicszk.supabase.co|https://$NEW_PROJECT_REF.supabase.co|g" netlify.toml
sed -i "s|VITE_SUPABASE_ANON_KEY = \".*\"|VITE_SUPABASE_ANON_KEY = \"$NEW_ANON_KEY\"|" netlify.toml
echo "✅ Updated netlify.toml"

# Update integration config
if [ -f .integration-config.json ]; then
    sed -i "s|cuxzzpsyufcewtmicszk|$NEW_PROJECT_REF|g" .integration-config.json
    echo "✅ Updated .integration-config.json"
fi

echo ""
echo "✅ Configuration updated!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Update GitHub Secrets:"
echo "   Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions"
echo "   Update:"
echo "   - SUPABASE_PROJECT_REF = $NEW_PROJECT_REF"
echo "   - SUPABASE_DB_URL = postgres://postgres:[PASSWORD]@db.$NEW_PROJECT_REF.supabase.co:5432/postgres"
echo "   - SUPABASE_SERVICE_ROLE_KEY = $NEW_SERVICE_KEY"
echo ""
echo "2. Update Netlify Environment Variables:"
echo "   Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/env"
echo "   Update:"
echo "   - VITE_SUPABASE_URL = https://$NEW_PROJECT_REF.supabase.co"
echo "   - VITE_SUPABASE_ANON_KEY = $NEW_ANON_KEY"
echo ""
echo "3. Run migrations on new project:"
echo "   export DB_URL=\"postgres://postgres:[PASSWORD]@db.$NEW_PROJECT_REF.supabase.co:5432/postgres\""
echo "   bash scripts/autopilot_migrate.sh \"\$DB_URL\""
echo ""
echo "4. Test locally:"
echo "   pnpm install"
echo "   pnpm build"
echo "   pnpm dev"
echo ""
echo "5. Commit and deploy:"
echo "   git add .env netlify.toml"
echo "   git commit -m \"chore: switch to elevate Supabase project\""
echo "   git push origin main"
echo ""
echo "🎉 Configuration complete!"
