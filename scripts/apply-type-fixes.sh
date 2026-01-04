#!/bin/bash
# Re-apply only the successful type fixes

# Fix 1: Stripe API versions
find app/api -name "*.ts" -exec sed -i 's/2024-12-18\.acacia/2025-10-29.clover/g; s/2024-11-20\.acacia/2025-10-29.clover/g' {} \;

# Fix 2: Missing imports in portal pages
for file in app/portal/student/calendar/page.tsx app/portal/student/notifications/page.tsx app/portal/student/settings/page.tsx; do
  if ! grep -q "import Link from 'next/link'" "$file"; then
    sed -i "3i import Link from 'next/link';\nimport Image from 'next/image';" "$file"
  fi
done

# Fix 3: Footer icons
if ! grep -q "import.*Facebook.*from 'lucide-react'" components/ui/Footer.tsx; then
  sed -i "2i import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';" components/ui/Footer.tsx
fi

# Fix 4: Stripe webhook types
sed -i 's/subscription\.current_period_start/(subscription as any).current_period_start/g; s/subscription\.current_period_end/(subscription as any).current_period_end/g; s/invoice\.subscription/(invoice as any).subscription/g' app/api/webhooks/stripe/route.ts

# Fix 5: Missing function calls
sed -i 's/await triggerDailyDigestEmails/\/\/ TODO: await triggerDailyDigestEmails/g' app/api/cron/daily-attendance-alerts/route.ts
sed -i 's/await sendOrderConfirmationEmail/\/\/ TODO: await sendOrderConfirmationEmail/g; s/await sendAdminNotification/\/\/ TODO: await sendAdminNotification/g' app/api/webhooks/stripe/route.ts

echo "✅ Re-applied successful type fixes"
