-- Barber Apprenticeship System Tables
-- Supports: inquiries, applications, agreements, assignments, hours tracking, transfers

-- 1. Inquiries table (public submissions)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('apprentice', 'host_shop')),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Apprentice Applications
CREATE TABLE IF NOT EXISTS apprentice_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_slug TEXT NOT NULL DEFAULT 'barber-apprenticeship',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  intake JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('drafted', 'submitted', 'reviewed', 'approved', 'matched', 'rejected')),
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  rejected_at TIMESTAMPTZ,
  rejected_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Host Shop Applications
CREATE TABLE IF NOT EXISTS host_shop_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  license_info JSONB NOT NULL DEFAULT '{}',
  intake JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('drafted', 'submitted', 'reviewed', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  rejected_at TIMESTAMPTZ,
  rejected_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Agreement Acceptances (audit trail)
CREATE TABLE IF NOT EXISTS agreement_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type TEXT NOT NULL CHECK (subject_type IN ('apprentice', 'host_shop')),
  subject_id UUID NOT NULL,
  agreement_key TEXT NOT NULL,
  agreement_version TEXT NOT NULL,
  accepted_name TEXT NOT NULL,
  accepted_email TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_ip TEXT,
  user_agent TEXT
);

-- 5. Apprentice Assignments (links apprentice to host shop)
CREATE TABLE IF NOT EXISTS apprentice_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apprentice_application_id UUID NOT NULL REFERENCES apprentice_applications(id),
  host_shop_application_id UUID NOT NULL REFERENCES host_shop_applications(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Hour Entries (auditable ledger)
CREATE TABLE IF NOT EXISTS hour_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apprentice_application_id UUID NOT NULL REFERENCES apprentice_applications(id),
  host_shop_application_id UUID NOT NULL REFERENCES host_shop_applications(id),
  work_date DATE NOT NULL,
  hours NUMERIC(5,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  category TEXT,
  notes TEXT,
  entered_by_email TEXT NOT NULL,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT
);

-- 7. Transfer Requests
CREATE TABLE IF NOT EXISTS transfer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apprentice_application_id UUID NOT NULL REFERENCES apprentice_applications(id),
  from_host_shop_application_id UUID REFERENCES host_shop_applications(id),
  to_host_shop_application_id UUID REFERENCES host_shop_applications(id),
  requested_by_email TEXT NOT NULL,
  reason TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'approved', 'rejected', 'completed')),
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_apprentice_applications_status ON apprentice_applications(status);
CREATE INDEX IF NOT EXISTS idx_apprentice_applications_email ON apprentice_applications(email);
CREATE INDEX IF NOT EXISTS idx_host_shop_applications_status ON host_shop_applications(status);
CREATE INDEX IF NOT EXISTS idx_host_shop_applications_email ON host_shop_applications(email);
CREATE INDEX IF NOT EXISTS idx_apprentice_assignments_apprentice ON apprentice_assignments(apprentice_application_id);
CREATE INDEX IF NOT EXISTS idx_apprentice_assignments_shop ON apprentice_assignments(host_shop_application_id);
CREATE INDEX IF NOT EXISTS idx_hour_entries_apprentice ON hour_entries(apprentice_application_id);
CREATE INDEX IF NOT EXISTS idx_hour_entries_shop ON hour_entries(host_shop_application_id);
CREATE INDEX IF NOT EXISTS idx_hour_entries_status ON hour_entries(status);
CREATE INDEX IF NOT EXISTS idx_agreement_acceptances_subject ON agreement_acceptances(subject_type, subject_id);

-- RLS Policies

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprentice_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_shop_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreement_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprentice_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hour_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_requests ENABLE ROW LEVEL SECURITY;

-- Public can INSERT inquiries
CREATE POLICY "Public can insert inquiries" ON inquiries
  FOR INSERT TO anon WITH CHECK (true);

-- Public can INSERT applications
CREATE POLICY "Public can insert apprentice applications" ON apprentice_applications
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can insert host shop applications" ON host_shop_applications
  FOR INSERT TO anon WITH CHECK (true);

-- Public can INSERT agreement acceptances
CREATE POLICY "Public can insert agreement acceptances" ON agreement_acceptances
  FOR INSERT TO anon WITH CHECK (true);

-- Service role has full access (for admin operations)
CREATE POLICY "Service role full access inquiries" ON inquiries
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access apprentice_applications" ON apprentice_applications
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access host_shop_applications" ON host_shop_applications
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access agreement_acceptances" ON agreement_acceptances
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access apprentice_assignments" ON apprentice_assignments
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access hour_entries" ON hour_entries
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access transfer_requests" ON transfer_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- View for apprentice hour totals
CREATE OR REPLACE VIEW apprentice_hour_totals AS
SELECT 
  apprentice_application_id,
  SUM(CASE WHEN status = 'approved' THEN hours ELSE 0 END) as total_approved_hours,
  SUM(CASE WHEN status = 'pending' THEN hours ELSE 0 END) as total_pending_hours,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_entry_count,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_entry_count
FROM hour_entries
GROUP BY apprentice_application_id;

-- View for hours by shop
CREATE OR REPLACE VIEW apprentice_hours_by_shop AS
SELECT 
  apprentice_application_id,
  host_shop_application_id,
  SUM(CASE WHEN status = 'approved' THEN hours ELSE 0 END) as approved_hours,
  SUM(CASE WHEN status = 'pending' THEN hours ELSE 0 END) as pending_hours,
  MIN(work_date) as first_entry_date,
  MAX(work_date) as last_entry_date
FROM hour_entries
GROUP BY apprentice_application_id, host_shop_application_id;

-- Function to check if apprentice can be matched (requires approved host shop)
CREATE OR REPLACE FUNCTION check_can_match_apprentice(apprentice_id UUID, shop_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  shop_approved BOOLEAN;
BEGIN
  SELECT (status = 'approved') INTO shop_approved
  FROM host_shop_applications
  WHERE id = shop_id;
  
  RETURN COALESCE(shop_approved, false);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER apprentice_applications_updated_at
  BEFORE UPDATE ON apprentice_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER host_shop_applications_updated_at
  BEFORE UPDATE ON host_shop_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
