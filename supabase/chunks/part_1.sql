-- RUN THIS ENTIRE FILE IN SUPABASE SQL EDITOR
-- Copy and paste this entire file, then click "Run"

-- 20251226_customer_service_system.sql
-- Customer Service System
-- Tables for customer service protocols and ticket management

-- Customer Service Protocols Table
CREATE TABLE IF NOT EXISTS customer_service_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  dos TEXT[],
  donts TEXT[],
  examples JSONB DEFAULT '[]'::jsonb,
  escalation_rules TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Tickets Table
CREATE TABLE IF NOT EXISTS service_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_service_protocols_category ON customer_service_protocols(category);
CREATE INDEX IF NOT EXISTS idx_service_tickets_student ON service_tickets(student_id);
CREATE INDEX IF NOT EXISTS idx_service_tickets_assigned ON service_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_service_tickets_status ON service_tickets(status);
CREATE INDEX IF NOT EXISTS idx_service_tickets_priority ON service_tickets(priority);

-- RLS
ALTER TABLE customer_service_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tickets ENABLE ROW LEVEL SECURITY;

-- Staff can view protocols
CREATE POLICY "Staff can view protocols"
  ON customer_service_protocols FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage protocols
CREATE POLICY "Admin can manage protocols"
  ON customer_service_protocols FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Staff can view tickets
CREATE POLICY "Staff can view tickets"
  ON service_tickets FOR SELECT
  USING (
    student_id = auth.uid()
    OR assigned_to = auth.uid()
    OR created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Staff can create tickets
CREATE POLICY "Staff can create tickets"
  ON service_tickets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Staff can update assigned tickets
CREATE POLICY "Staff can update tickets"
  ON service_tickets FOR UPDATE
  USING (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE customer_service_protocols IS 'Customer service guidelines and protocols';
COMMENT ON TABLE service_tickets IS 'Customer service tickets';


-- 20251226_donations_campaigns_system.sql
-- Donations and Campaigns System
-- Full Stripe integration for Rise Foundation donations

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  payment_status TEXT CHECK (payment_status IN (
    'pending',
    'processing',
    'succeeded',
    'failed',
    'refunded',
    'cancelled'
  )) DEFAULT 'pending',
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  receipt_sent_at TIMESTAMPTZ,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT CHECK (recurring_frequency IN ('monthly', 'quarterly', 'yearly')),
  stripe_subscription_id TEXT,
  anonymous BOOLEAN DEFAULT false,
  message TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_donations_campaign ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_intent ON donations(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session ON donations(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_user ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at);

-- RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Anyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (is_active = true);

-- Admin can manage campaigns
CREATE POLICY "Admin can manage campaigns"
  ON campaigns FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own donations" ON donations;
DROP POLICY IF EXISTS "Anyone can create donations" ON donations;
DROP POLICY IF EXISTS "System can update donations" ON donations;
DROP POLICY IF EXISTS "Admin can view all donations" ON donations;
DROP POLICY IF EXISTS "Admins can view all donations" ON donations;

-- Users can view their own donations
CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (
    user_id = auth.uid()
    OR donor_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can create donations (for checkout)
CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- System can update donations (for webhooks)
CREATE POLICY "System can update donations"
  ON donations FOR UPDATE
  USING (true);

-- Admin can view all donations
CREATE POLICY "Admin can view all donations"
  ON donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Function to update campaign amount when donation succeeds
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'succeeded' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'succeeded') THEN
    UPDATE campaigns
    SET current_amount = current_amount + NEW.amount,
        updated_at = NOW()
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donation_succeeded_update_campaign
AFTER INSERT OR UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_campaign_amount();

COMMENT ON TABLE campaigns IS 'Fundraising campaigns for Rise Foundation';
COMMENT ON TABLE donations IS 'Donations with Stripe integration';

-- Seed initial campaign
INSERT INTO campaigns (name, description, goal_amount, start_date, is_active) VALUES
  ('General Fund', 'Support our mission to elevate individuals and communities through education and workforce development.', 50000.00, CURRENT_DATE, true)
ON CONFLICT DO NOTHING;


-- 20251226_performance_analytics_system.sql
-- Performance and Analytics System
-- Tables for tracking performance metrics, page views, and conversions

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views Table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversions Table
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type TEXT NOT NULL CHECK (conversion_type IN (
    'application_submitted',
    'enrollment_completed',
    'payment_completed',
    'course_completed',
    'certificate_earned',
    'appointment_booked',
    'donation_made',
    'event_registered',
    'referral_completed'
  )),
  value DECIMAL(10,2),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

