-- Barber Webhook Automation: Add email tracking and apprentice linkage
-- Ensures idempotent email sending and proper record linking

-- 1. Add email tracking fields to barber_subscriptions
ALTER TABLE barber_subscriptions 
ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS milady_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS apprentice_id UUID REFERENCES apprentices(id),
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS customer_name TEXT;

-- 2. Add barber_subscription_id to apprentices for reverse lookup
ALTER TABLE apprentices
ADD COLUMN IF NOT EXISTS barber_subscription_id UUID,
ADD COLUMN IF NOT EXISTS mou_signed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS dashboard_invite_sent_at TIMESTAMPTZ;

-- 3. Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_barber_subscriptions_user_id ON barber_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_apprentices_user_id ON apprentices(user_id);
