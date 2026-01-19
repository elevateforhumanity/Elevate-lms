-- ============================================
-- Store Tables and RLS Policies
-- ============================================

-- Processed webhook events table (for idempotency)
CREATE TABLE IF NOT EXISTS processed_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_processed_events_event_id ON processed_webhook_events(event_id);

-- Add stripe_event_id to purchases if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'purchases' AND column_name = 'stripe_event_id'
  ) THEN
    ALTER TABLE purchases ADD COLUMN stripe_event_id TEXT;
  END IF;
END $$;

-- Add stripe_event_id to licenses if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'stripe_event_id'
  ) THEN
    ALTER TABLE licenses ADD COLUMN stripe_event_id TEXT;
  END IF;
END $$;

-- Add tenant_id to licenses if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE licenses ADD COLUMN tenant_id UUID REFERENCES tenants(id);
  END IF;
END $$;

-- Add tenant_id to purchases if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'purchases' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE purchases ADD COLUMN tenant_id UUID REFERENCES tenants(id);
  END IF;
END $$;

-- ============================================
-- RLS Policies for Store Tables
-- ============================================

-- Enable RLS on licenses
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS licenses_tenant_isolation ON licenses;
DROP POLICY IF EXISTS licenses_admin_all ON licenses;

-- Tenant isolation policy for licenses
CREATE POLICY licenses_tenant_isolation ON licenses
  FOR ALL
  USING (
    tenant_id IS NULL 
    OR tenant_id = (
      SELECT tenant_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Admin can see all licenses
CREATE POLICY licenses_admin_all ON licenses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Enable RLS on purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS purchases_tenant_isolation ON purchases;
DROP POLICY IF EXISTS purchases_admin_all ON purchases;

-- Tenant isolation policy for purchases
CREATE POLICY purchases_tenant_isolation ON purchases
  FOR ALL
  USING (
    tenant_id IS NULL 
    OR tenant_id = (
      SELECT tenant_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Admin can see all purchases
CREATE POLICY purchases_admin_all ON purchases
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Enable RLS on products (public read, admin write)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS products_public_read ON products;
DROP POLICY IF EXISTS products_admin_write ON products;

-- Anyone can read products
CREATE POLICY products_public_read ON products
  FOR SELECT
  USING (true);

-- Only admins can modify products
CREATE POLICY products_admin_write ON products
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Processed events - service role only (no user access)
ALTER TABLE processed_webhook_events ENABLE ROW LEVEL SECURITY;

-- No user policies - only service role can access
-- This is intentional for security

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_licenses_tenant_id ON licenses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_licenses_email ON licenses(email);
CREATE INDEX IF NOT EXISTS idx_purchases_tenant_id ON purchases(tenant_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
