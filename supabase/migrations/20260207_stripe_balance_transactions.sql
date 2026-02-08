-- Stripe Balance Transactions
-- Tracks all money movements in/out of Stripe balance
-- Used for accounting and vendor payment reconciliation

CREATE TABLE IF NOT EXISTS stripe_balance_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'student_payment', 'vendor_payment', 'refund', 'payout'
  vendor TEXT, -- 'milady', 'hsi', etc. (null for student payments)
  amount DECIMAL(10,2) NOT NULL, -- Positive = credit, Negative = debit
  currency TEXT DEFAULT 'usd',
  enrollment_id UUID REFERENCES student_enrollments(id),
  student_id UUID REFERENCES profiles(id),
  stripe_payment_id TEXT, -- Stripe payment intent ID
  stripe_transfer_id TEXT, -- Stripe transfer ID (for vendor payments)
  description TEXT,
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_stripe_balance_vendor ON stripe_balance_transactions(vendor);
CREATE INDEX IF NOT EXISTS idx_stripe_balance_type ON stripe_balance_transactions(type);
CREATE INDEX IF NOT EXISTS idx_stripe_balance_enrollment ON stripe_balance_transactions(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_stripe_balance_created ON stripe_balance_transactions(created_at);

-- Vendor payments tracking (for monthly reconciliation)
CREATE TABLE IF NOT EXISTS vendor_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES student_enrollments(id),
  vendor_name TEXT NOT NULL, -- 'milady', 'hsi', etc.
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  payment_method TEXT, -- 'stripe_transfer', 'invoice', 'manual'
  stripe_transfer_id TEXT,
  invoice_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendor_payments_vendor ON vendor_payments(vendor_name);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_status ON vendor_payments(status);

-- Student onboarding tracking
CREATE TABLE IF NOT EXISTS student_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID UNIQUE REFERENCES profiles(id),
  
  -- Payment
  payment_complete BOOLEAN DEFAULT FALSE,
  payment_complete_at TIMESTAMPTZ,
  
  -- Milady
  milady_credentials_received BOOLEAN DEFAULT FALSE,
  milady_credentials_received_at TIMESTAMPTZ,
  milady_enrollment_complete BOOLEAN DEFAULT FALSE,
  milady_enrollment_complete_at TIMESTAMPTZ,
  
  -- Documents
  documents_uploaded BOOLEAN DEFAULT FALSE,
  documents_uploaded_at TIMESTAMPTZ,
  
  -- Handbook
  handbook_completed BOOLEAN DEFAULT FALSE,
  handbook_completed_at TIMESTAMPTZ,
  
  -- MOU
  mou_signed BOOLEAN DEFAULT FALSE,
  mou_signed_at TIMESTAMPTZ,
  
  -- Welcome email
  welcome_email_sent BOOLEAN DEFAULT FALSE,
  welcome_email_sent_at TIMESTAMPTZ,
  start_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_onboarding_student ON student_onboarding(student_id);

-- Milady email logs (for forwarding system)
CREATE TABLE IF NOT EXISTS milady_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email TEXT,
  to_email TEXT,
  subject TEXT,
  student_email TEXT,
  student_id UUID REFERENCES profiles(id),
  forwarded BOOLEAN DEFAULT FALSE,
  raw_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_milady_email_student ON milady_email_logs(student_id);

-- Student subscriptions (Stripe automatic weekly payments)
CREATE TABLE IF NOT EXISTS student_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID UNIQUE REFERENCES profiles(id),
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  weekly_amount DECIMAL(10,2) NOT NULL,
  total_weeks INTEGER NOT NULL,
  weeks_paid INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'past_due', 'canceled', 'unpaid'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  last_payment_at TIMESTAMPTZ,
  last_failure_reason TEXT,
  last_failure_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_subscriptions_stripe ON student_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_student_subscriptions_status ON student_subscriptions(status);

-- Student payments (individual payment records)
CREATE TABLE IF NOT EXISTS student_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  stripe_invoice_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL, -- 'setup_fee', 'weekly_payment', 'one_time'
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_payments_student ON student_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_payments_type ON student_payments(type);

-- Payment failures (for tracking and follow-up)
CREATE TABLE IF NOT EXISTS payment_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  stripe_invoice_id TEXT,
  stripe_subscription_id TEXT,
  failure_reason TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_failures_student ON payment_failures(student_id);
CREATE INDEX IF NOT EXISTS idx_payment_failures_resolved ON payment_failures(resolved);

-- Payment links (for manual payment requests)
CREATE TABLE IF NOT EXISTS payment_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  stripe_payment_link_id TEXT,
  url TEXT,
  amount DECIMAL(10,2),
  type TEXT, -- 'weekly_payment', 'past_due', 'custom'
  status TEXT DEFAULT 'active', -- 'active', 'used', 'expired'
  expires_at TIMESTAMPTZ,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_links_student ON payment_links(student_id);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
DROP TRIGGER IF EXISTS update_stripe_balance_updated_at ON stripe_balance_transactions;
CREATE TRIGGER update_stripe_balance_updated_at
  BEFORE UPDATE ON stripe_balance_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendor_payments_updated_at ON vendor_payments;
CREATE TRIGGER update_vendor_payments_updated_at
  BEFORE UPDATE ON vendor_payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_onboarding_updated_at ON student_onboarding;
CREATE TRIGGER update_student_onboarding_updated_at
  BEFORE UPDATE ON student_onboarding
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
