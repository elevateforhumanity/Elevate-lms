-- Tenant Custom Domains for License Delivery
-- Enables custom domain routing for managed LMS licenses

-- Create tenant_domains table if not exists
CREATE TABLE IF NOT EXISTS tenant_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  domain VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'active', 'disabled')),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_tenant_domains_org ON tenant_domains(organization_id);
CREATE INDEX IF NOT EXISTS idx_tenant_domains_domain ON tenant_domains(domain);
CREATE INDEX IF NOT EXISTS idx_tenant_domains_status ON tenant_domains(status);

-- Function to resolve tenant from domain
CREATE OR REPLACE FUNCTION get_tenant_by_domain(p_domain TEXT)
RETURNS TABLE (
  organization_id UUID,
  organization_name TEXT,
  license_status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    td.organization_id,
    o.name as organization_name,
    l.status as license_status
  FROM tenant_domains td
  JOIN organizations o ON o.id = td.organization_id
  LEFT JOIN licenses l ON l.organization_id = td.organization_id
  WHERE td.domain = p_domain
    AND td.status = 'active'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policies
ALTER TABLE tenant_domains ENABLE ROW LEVEL SECURITY;

-- Admins can manage all domains
CREATE POLICY "Admins can manage tenant domains"
  ON tenant_domains FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Org admins can view their own domains
CREATE POLICY "Org admins can view own domains"
  ON tenant_domains FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = tenant_domains.organization_id
      AND om.user_id = auth.uid()
      AND om.role IN ('owner', 'admin')
    )
  );

COMMENT ON TABLE tenant_domains IS 'Custom domains for licensed tenants';
