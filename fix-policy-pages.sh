#!/bin/bash

# Fix policy pages with single-line metadata

echo "=== Fixing Policy Pages ==="
echo ""

count=0

# List of policy pages that failed
policy_pages=(
  "app/policies/community-guidelines/page.tsx"
  "app/policies/grant-application/page.tsx"
  "app/policies/data-retention/page.tsx"
  "app/policies/admissions/page.tsx"
  "app/policies/verification/page.tsx"
  "app/policies/content/page.tsx"
  "app/policies/acceptable-use/page.tsx"
  "app/policies/progress/page.tsx"
  "app/policies/editorial/page.tsx"
  "app/policies/sam-gov-eligibility/page.tsx"
  "app/policies/academic-integrity/page.tsx"
  "app/policies/terms/page.tsx"
  "app/policies/credentials/page.tsx"
  "app/policies/copyright/page.tsx"
  "app/policies/revocation/page.tsx"
  "app/policies/federal-compliance/page.tsx"
  "app/policies/attendance/page.tsx"
  "app/policies/response-sla/page.tsx"
  "app/policies/ai-usage/page.tsx"
  "app/policies/privacy-notice/page.tsx"
  "app/policies/moderation/page.tsx"
  "app/policies/privacy/page.tsx"
  "app/policies/student-code/page.tsx"
)

for file in "${policy_pages[@]}"; do
  if [ ! -f "$file" ]; then
    echo "⚠️  Not found: $file"
    continue
  fi
  
  # Get URL
  url=$(echo "$file" | sed 's|^app||' | sed 's|/page\.tsx$||')
  canonical_url="https://www.elevateforhumanity.org${url}"
  
  # Check if already has canonical
  if grep -q "canonical:" "$file"; then
    echo "⏭️  $file (already has canonical)"
    continue
  fi
  
  # Replace single-line metadata with multi-line + canonical
  # Pattern: export const metadata: Metadata = { title: '...' };
  sed -i "s|export const metadata: Metadata = { title: '\([^']*\)' };|export const metadata: Metadata = {\n  title: '\1',\n  alternates: {\n    canonical: '${canonical_url}',\n  },\n};|" "$file"
  
  echo "✅ $file"
  ((count++))
done

echo ""
echo "=== SUMMARY ==="
echo "✅ Fixed: $count files"
echo ""

if [ $count -gt 0 ]; then
  echo "Next: pnpm run build"
fi
