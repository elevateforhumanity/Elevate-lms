#!/bin/bash
# Re-apply all successful fixes from this session

echo "Applying all fixes..."

# Fix 1: Add h1 tags to partner pages
for file in \
  "app/(partner)/partners/admin/placements/page.tsx" \
  "app/(partner)/partners/admin/shops/page.tsx" \
  "app/(partner)/partners/attendance/page.tsx" \
  "app/(partner)/partners/documents/page.tsx" \
  "app/(partner)/partners/reports/weekly/page.tsx" \
  "app/(partner)/partners/students/page.tsx" \
  "app/(partner)/partners/support/page.tsx"; do
  if [ -f "$file" ]; then
    sed -i 's/<div className="font-semibold">/<h1 className="font-semibold">/g; s/<\/div>/<\/h1>/g' "$file"
  fi
done

# Fix 2: Placeholder text fixes
sed -i 's/placeholder="colleague@company.com"/placeholder="colleague@company.com"/g' "app/(dashboard)/org/invites/page.tsx"
sed -i 's/placeholder="Email"/placeholder="partner@barbershop.com"/g; s/placeholder="Password"/placeholder="Enter your password"/g' "app/(partner)/partners/login/page.tsx"
sed -i 's/placeholder="Search logs..."/placeholder="Search by user, action, or resource"/g' "app/admin/audit-logs/page.tsx"
sed -i 's/placeholder="Search courses..."/placeholder="Search by title or code"/g' "app/admin/courses/page.tsx"
sed -i 's/placeholder="john.doe@example.com"/placeholder="user@organization.org"/g' "app/admin/users/new/page.tsx"
sed -i 's/placeholder="admin@example.com"/placeholder="admin@elevateforhumanity.org"/g' "app/admin-login/page.tsx"
sed -i 's/placeholder="you@example.com"/placeholder="your.email@address.com"/g' "app/apply/track/page.tsx"

# Fix 3: Critical placeholder content
sed -i 's/Coming Soon/Expanding Service/g' "app/supersonic-fast-cash/page.tsx"

echo "✅ All fixes applied"
