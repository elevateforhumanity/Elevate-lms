# Franchise System Database Setup

## Step 1: Create Tables in Supabase

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
2. Copy and paste the SQL below
3. Click "Run"

```sql
-- Franchise Tax Preparation System Tables

-- FRANCHISE OFFICES
CREATE TABLE IF NOT EXISTS franchise_offices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_code VARCHAR(20) UNIQUE NOT NULL,
  office_name VARCHAR(255) NOT NULL,
  owner_id UUID,
  owner_name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  owner_phone VARCHAR(20),
  address_street VARCHAR(255) NOT NULL,
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(2) NOT NULL,
  address_zip VARCHAR(10) NOT NULL,
  business_ein VARCHAR(20),
  state_license VARCHAR(50),
  efin VARCHAR(6),
  parent_efin VARCHAR(6) NOT NULL DEFAULT '000000',
  status VARCHAR(20) DEFAULT 'pending',
  activated_at TIMESTAMPTZ,
  suspended_at TIMESTAMPTZ,
  suspension_reason TEXT,
  franchise_fee DECIMAL(10,2) DEFAULT 0,
  per_return_fee DECIMAL(10,2) DEFAULT 5.00,
  revenue_share_percent DECIMAL(5,2) DEFAULT 0,
  contract_start_date DATE,
  contract_end_date DATE,
  max_preparers INTEGER DEFAULT 10,
  max_returns_per_season INTEGER,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  notes TEXT
);

-- FRANCHISE PREPARERS
CREATE TABLE IF NOT EXISTS franchise_preparers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  office_id UUID NOT NULL REFERENCES franchise_offices(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  ptin VARCHAR(20) NOT NULL,
  ptin_expiration DATE,
  certification_level VARCHAR(20),
  certifications JSONB DEFAULT '[]',
  training_completed_at TIMESTAMPTZ,
  annual_refresher_due DATE,
  is_efin_authorized BOOLEAN DEFAULT FALSE,
  is_ero_authorized BOOLEAN DEFAULT FALSE,
  signature_pin VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pending',
  activated_at TIMESTAMPTZ,
  suspended_at TIMESTAMPTZ,
  suspension_reason TEXT,
  returns_filed INTEGER DEFAULT 0,
  returns_rejected INTEGER DEFAULT 0,
  average_refund DECIMAL(10,2),
  commission_type VARCHAR(20) DEFAULT 'per_return',
  per_return_fee DECIMAL(10,2),
  hourly_rate DECIMAL(10,2),
  commission_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  notes TEXT,
  UNIQUE(office_id, ptin)
);

-- FRANCHISE CLIENTS
CREATE TABLE IF NOT EXISTS franchise_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id UUID NOT NULL REFERENCES franchise_offices(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zip VARCHAR(10),
  filing_status VARCHAR(30),
  dependents_count INTEGER DEFAULT 0,
  ssn_encrypted TEXT,
  ssn_last_four VARCHAR(4),
  ssn_hash VARCHAR(64),
  spouse_first_name VARCHAR(100),
  spouse_last_name VARCHAR(100),
  spouse_ssn_encrypted TEXT,
  spouse_ssn_last_four VARCHAR(4),
  preferred_preparer_id UUID REFERENCES franchise_preparers(id),
  client_since DATE DEFAULT CURRENT_DATE,
  returns_filed INTEGER DEFAULT 0,
  total_fees_paid DECIMAL(10,2) DEFAULT 0,
  last_return_date DATE,
  last_return_id UUID,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- ERO CONFIGURATIONS
CREATE TABLE IF NOT EXISTS franchise_ero_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id UUID NOT NULL REFERENCES franchise_offices(id) ON DELETE CASCADE,
  ero_preparer_id UUID NOT NULL REFERENCES franchise_preparers(id),
  efin VARCHAR(6) NOT NULL,
  firm_name VARCHAR(255) NOT NULL,
  firm_ein VARCHAR(20),
  firm_address JSONB NOT NULL DEFAULT '{}',
  signature_pin VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RETURN SUBMISSIONS
CREATE TABLE IF NOT EXISTS franchise_return_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id VARCHAR(50) UNIQUE NOT NULL,
  office_id UUID NOT NULL REFERENCES franchise_offices(id),
  preparer_id UUID NOT NULL REFERENCES franchise_preparers(id),
  client_id UUID REFERENCES franchise_clients(id),
  preparer_ptin VARCHAR(20) NOT NULL,
  preparer_name VARCHAR(255),
  ero_id UUID REFERENCES franchise_preparers(id),
  ero_signature JSONB,
  ero_signed_at TIMESTAMPTZ,
  tax_year INTEGER NOT NULL,
  efin VARCHAR(6) NOT NULL,
  return_type VARCHAR(20) DEFAULT 'IRS1040',
  filing_status VARCHAR(30),
  return_data JSONB,
  taxpayer_ssn_hash VARCHAR(64),
  xml_content TEXT,
  client_fee DECIMAL(10,2) DEFAULT 0,
  franchise_fee DECIMAL(10,2) DEFAULT 0,
  preparer_commission DECIMAL(10,2) DEFAULT 0,
  office_revenue DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'draft',
  irs_submission_id VARCHAR(50),
  irs_status VARCHAR(30),
  irs_status_date TIMESTAMPTZ,
  irs_errors JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  notes TEXT
);

-- FEE SCHEDULES
CREATE TABLE IF NOT EXISTS franchise_fee_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id UUID NOT NULL REFERENCES franchise_offices(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  base_fee_1040 DECIMAL(10,2) DEFAULT 150.00,
  base_fee_1040_ez DECIMAL(10,2) DEFAULT 75.00,
  fee_schedule_a DECIMAL(10,2) DEFAULT 50.00,
  fee_schedule_c DECIMAL(10,2) DEFAULT 100.00,
  fee_schedule_d DECIMAL(10,2) DEFAULT 50.00,
  fee_schedule_e DECIMAL(10,2) DEFAULT 75.00,
  fee_schedule_se DECIMAL(10,2) DEFAULT 25.00,
  fee_per_w2 DECIMAL(10,2) DEFAULT 0,
  fee_per_1099 DECIMAL(10,2) DEFAULT 15.00,
  fee_per_dependent DECIMAL(10,2) DEFAULT 25.00,
  fee_state_return DECIMAL(10,2) DEFAULT 50.00,
  fee_eitc DECIMAL(10,2) DEFAULT 50.00,
  fee_ctc DECIMAL(10,2) DEFAULT 25.00,
  fee_refund_transfer DECIMAL(10,2) DEFAULT 35.00,
  fee_refund_advance DECIMAL(10,2) DEFAULT 0,
  returning_client_discount_percent DECIMAL(5,2) DEFAULT 10.00,
  referral_discount DECIMAL(10,2) DEFAULT 25.00,
  senior_discount_percent DECIMAL(5,2) DEFAULT 10.00,
  military_discount_percent DECIMAL(5,2) DEFAULT 15.00,
  effective_from DATE DEFAULT CURRENT_DATE,
  effective_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PREPARER PAYOUTS
CREATE TABLE IF NOT EXISTS franchise_preparer_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  preparer_id UUID NOT NULL REFERENCES franchise_preparers(id),
  office_id UUID NOT NULL REFERENCES franchise_offices(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  returns_count INTEGER DEFAULT 0,
  gross_earnings DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  net_earnings DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(100),
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- FRANCHISE ROYALTIES
CREATE TABLE IF NOT EXISTS franchise_royalties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id UUID NOT NULL REFERENCES franchise_offices(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  returns_count INTEGER DEFAULT 0,
  gross_revenue DECIMAL(10,2) DEFAULT 0,
  per_return_fees DECIMAL(10,2) DEFAULT 0,
  revenue_share DECIMAL(10,2) DEFAULT 0,
  software_fees DECIMAL(10,2) DEFAULT 0,
  other_fees DECIMAL(10,2) DEFAULT 0,
  total_owed DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  invoiced_at TIMESTAMPTZ,
  invoice_number VARCHAR(50),
  due_date DATE,
  paid_at TIMESTAMPTZ,
  payment_reference VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOG
CREATE TABLE IF NOT EXISTS franchise_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  office_id UUID REFERENCES franchise_offices(id),
  actor_id UUID,
  details JSONB,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_franchise_offices_owner ON franchise_offices(owner_id);
CREATE INDEX IF NOT EXISTS idx_franchise_offices_status ON franchise_offices(status);
CREATE INDEX IF NOT EXISTS idx_franchise_preparers_office ON franchise_preparers(office_id);
CREATE INDEX IF NOT EXISTS idx_franchise_preparers_user ON franchise_preparers(user_id);
CREATE INDEX IF NOT EXISTS idx_franchise_preparers_ptin ON franchise_preparers(ptin);
CREATE INDEX IF NOT EXISTS idx_franchise_clients_office ON franchise_clients(office_id);
CREATE INDEX IF NOT EXISTS idx_franchise_clients_ssn_hash ON franchise_clients(ssn_hash);
CREATE INDEX IF NOT EXISTS idx_franchise_returns_office ON franchise_return_submissions(office_id);
CREATE INDEX IF NOT EXISTS idx_franchise_returns_preparer ON franchise_return_submissions(preparer_id);
CREATE INDEX IF NOT EXISTS idx_franchise_returns_status ON franchise_return_submissions(status);
CREATE INDEX IF NOT EXISTS idx_franchise_audit_office ON franchise_audit_log(office_id);
CREATE INDEX IF NOT EXISTS idx_franchise_audit_created ON franchise_audit_log(created_at);

-- Enable RLS
ALTER TABLE franchise_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_preparers ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_return_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow service role full access)
CREATE POLICY "Service role has full access to franchise_offices" ON franchise_offices FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_preparers" ON franchise_preparers FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_clients" ON franchise_clients FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_return_submissions" ON franchise_return_submissions FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_audit_log" ON franchise_audit_log FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_ero_configs" ON franchise_ero_configs FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_fee_schedules" ON franchise_fee_schedules FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_preparer_payouts" ON franchise_preparer_payouts FOR ALL USING (true);
CREATE POLICY "Service role has full access to franchise_royalties" ON franchise_royalties FOR ALL USING (true);
```

## Step 2: Verify Tables

After running the SQL, run this command to verify:

```bash
npx tsx scripts/check-franchise-tables.ts
```

## Step 3: Test the Application

Visit: https://3000--019bdac4-8f96-79bd-a52d-1a201019fa18.us-east-1-01.gitpod.dev/franchise/office/dashboard
