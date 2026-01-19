-- ============================================
-- ENTERPRISE LICENSING INFRASTRUCTURE
-- Master migration for production-ready licensing
-- ============================================

-- 1. PROCESSED STRIPE EVENTS (Idempotency)
-- ============================================
CREATE TABLE IF NOT EXISTS processed_stripe_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  payment_intent_id TEXT,
  event_type TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  metadata JSONB,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_processed_stripe_events_event_id 
  ON processed_stripe_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_processed_stripe_events_payment_intent 
  ON processed_stripe_events(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_processed_stripe_events_type 
  ON processed_stripe_events(event_type);

-- 2. PROVISIONING EVENTS (Audit Trail)
-- ============================================
CREATE TABLE IF NOT EXISTS provisioning_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  correlation_id TEXT NOT NULL,
  tenant_id UUID REFERENCES tenants(id),
  payment_intent_id TEXT,
  step TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed', 'rolled_back')),
  error TEXT,
  metadata JSONB,
  environment TEXT DEFAULT 'production',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_provisioning_events_correlation 
  ON provisioning_events(correlation_id);
CREATE INDEX IF NOT EXISTS idx_provisioning_events_tenant 
  ON provisioning_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_provisioning_events_status 
  ON provisioning_events(status);
CREATE INDEX IF NOT EXISTS idx_provisioning_events_step 
  ON provisioning_events(step);

-- 3. LICENSE PURCHASES (Enhanced)
-- ============================================
CREATE TABLE IF NOT EXISTS license_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT,
  stripe_customer_id TEXT,
  email TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  tenant_id UUID REFERENCES tenants(id),
  license_id UUID,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'paid', 'failed', 'refunded', 'disputed')),
  environment TEXT DEFAULT 'production',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_license_purchases_email 
  ON license_purchases(email);
CREATE INDEX IF NOT EXISTS idx_license_purchases_tenant 
  ON license_purchases(tenant_id);
CREATE INDEX IF NOT EXISTS idx_license_purchases_status 
  ON license_purchases(status);
CREATE INDEX IF NOT EXISTS idx_license_purchases_payment_intent 
  ON license_purchases(stripe_payment_intent_id);

-- 4. TENANTS TABLE ENHANCEMENTS
-- ============================================
DO $$ 
BEGIN
  -- Add license_status column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tenants' AND column_name = 'license_status'
  ) THEN
    ALTER TABLE tenants ADD COLUMN license_status TEXT DEFAULT 'active' 
      CHECK (license_status IN ('active', 'suspended', 'expired', 'cancelled'));
  END IF;

  -- Add license_expires_at column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tenants' AND column_name = 'license_expires_at'
  ) THEN
    ALTER TABLE tenants ADD COLUMN license_expires_at TIMESTAMPTZ;
  END IF;

  -- Add stripe_customer_id column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tenants' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE tenants ADD COLUMN stripe_customer_id TEXT;
  END IF;
END $$;

-- 5. LICENSES TABLE ENHANCEMENTS
-- ============================================
DO $$ 
BEGIN
  -- Add status column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'status'
  ) THEN
    ALTER TABLE licenses ADD COLUMN status TEXT DEFAULT 'active' 
      CHECK (status IN ('active', 'suspended', 'expired', 'revoked'));
  END IF;

  -- Add expires_at column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'expires_at'
  ) THEN
    ALTER TABLE licenses ADD COLUMN expires_at TIMESTAMPTZ;
  END IF;

  -- Add features column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'features'
  ) THEN
    ALTER TABLE licenses ADD COLUMN features JSONB DEFAULT '{}';
  END IF;

  -- Add tenant_id if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'licenses' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE licenses ADD COLUMN tenant_id UUID REFERENCES tenants(id);
  END IF;
END $$;

-- 6. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all licensing tables
ALTER TABLE processed_stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE provisioning_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_purchases ENABLE ROW LEVEL SECURITY;

-- Processed Stripe Events: Service role only
DROP POLICY IF EXISTS processed_stripe_events_service_only ON processed_stripe_events;
CREATE POLICY processed_stripe_events_service_only ON processed_stripe_events
  FOR ALL USING (false);  -- Only service role can access

-- Provisioning Events: Tenant isolation + admin access
DROP POLICY IF EXISTS provisioning_events_tenant_isolation ON provisioning_events;
CREATE POLICY provisioning_events_tenant_isolation ON provisioning_events
  FOR SELECT USING (
    tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- License Purchases: Tenant isolation + admin access
DROP POLICY IF EXISTS license_purchases_tenant_isolation ON license_purchases;
CREATE POLICY license_purchases_tenant_isolation ON license_purchases
  FOR ALL USING (
    tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Tenants: Users can only see their own tenant
DROP POLICY IF EXISTS tenants_isolation ON tenants;
CREATE POLICY tenants_isolation ON tenants
  FOR SELECT USING (
    id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Tenants: Only admins can modify
DROP POLICY IF EXISTS tenants_admin_modify ON tenants;
CREATE POLICY tenants_admin_modify ON tenants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Licenses: Tenant isolation
DROP POLICY IF EXISTS licenses_tenant_isolation ON licenses;
CREATE POLICY licenses_tenant_isolation ON licenses
  FOR ALL USING (
    tenant_id IS NULL
    OR tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- 7. HELPER FUNCTIONS
-- ============================================

-- Function to check if Stripe event is already processed
CREATE OR REPLACE FUNCTION is_stripe_event_processed(p_event_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM processed_stripe_events 
    WHERE stripe_event_id = p_event_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark Stripe event as processed
CREATE OR REPLACE FUNCTION mark_stripe_event_processed(
  p_event_id TEXT,
  p_event_type TEXT,
  p_payment_intent_id TEXT DEFAULT NULL,
  p_environment TEXT DEFAULT 'production',
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO processed_stripe_events (
    stripe_event_id, event_type, payment_intent_id, environment, metadata
  ) VALUES (
    p_event_id, p_event_type, p_payment_intent_id, p_environment, p_metadata
  )
  ON CONFLICT (stripe_event_id) DO NOTHING
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log provisioning event
CREATE OR REPLACE FUNCTION log_provisioning_event(
  p_correlation_id TEXT,
  p_step TEXT,
  p_status TEXT,
  p_tenant_id UUID DEFAULT NULL,
  p_payment_intent_id TEXT DEFAULT NULL,
  p_error TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL,
  p_environment TEXT DEFAULT 'production'
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO provisioning_events (
    correlation_id, step, status, tenant_id, payment_intent_id, error, metadata, environment
  ) VALUES (
    p_correlation_id, p_step, p_status, p_tenant_id, p_payment_intent_id, p_error, p_metadata, p_environment
  )
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to suspend license (for refunds/disputes)
CREATE OR REPLACE FUNCTION suspend_license(p_tenant_id UUID, p_reason TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE tenants SET license_status = 'suspended' WHERE id = p_tenant_id;
  UPDATE licenses SET status = 'suspended' WHERE tenant_id = p_tenant_id;
  
  PERFORM log_provisioning_event(
    gen_random_uuid()::text,
    'license_suspended',
    'completed',
    p_tenant_id,
    NULL,
    NULL,
    jsonb_build_object('reason', p_reason)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. TRIGGERS
-- ============================================

-- Auto-update updated_at on license_purchases
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS license_purchases_updated_at ON license_purchases;
CREATE TRIGGER license_purchases_updated_at
  BEFORE UPDATE ON license_purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- END OF MIGRATION
-- ============================================
