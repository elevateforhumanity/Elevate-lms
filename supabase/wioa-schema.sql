-- ============================================
-- WIOA COMPLIANCE DATABASE SCHEMA
-- Elevate for Humanity - WIOA Features
-- ============================================

-- ===========================================
-- CASE MANAGEMENT
-- ===========================================

CREATE TABLE IF NOT EXISTS case_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  case_manager_id UUID REFERENCES profiles(id),
  case_status TEXT NOT NULL DEFAULT 'active' CHECK (case_status IN ('active', 'inactive', 'closed', 'transferred')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  intake_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_contact_date TIMESTAMPTZ,
  next_contact_date TIMESTAMPTZ,
  contact_frequency TEXT DEFAULT 'monthly' CHECK (contact_frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly')),
  assessment_completed BOOLEAN DEFAULT FALSE,
  barriers JSONB DEFAULT '[]'::jsonb,
  accommodations JSONB DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  activities JSONB DEFAULT '[]'::jsonb,
  referrals JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_management_user ON case_management(user_id);
CREATE INDEX idx_case_management_manager ON case_management(case_manager_id);
CREATE INDEX idx_case_management_status ON case_management(case_status);
CREATE INDEX idx_case_management_priority ON case_management(priority);

-- ===========================================
-- PARTICIPANT ELIGIBILITY
-- ===========================================

CREATE TABLE IF NOT EXISTS participant_eligibility (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Demographics
  date_of_birth DATE NOT NULL,
  gender TEXT,
  ethnicity TEXT,
  race JSONB DEFAULT '[]'::jsonb,
  
  -- Veteran Status
  is_veteran BOOLEAN DEFAULT FALSE,
  veteran_document_url TEXT,
  
  -- Dislocated Worker
  is_dislocated_worker BOOLEAN DEFAULT FALSE,
  dislocated_worker_document_url TEXT,
  layoff_date DATE,
  
  -- Low Income
  is_low_income BOOLEAN DEFAULT FALSE,
  income_document_url TEXT,
  household_size INTEGER,
  annual_income DECIMAL(10,2),
  
  -- Youth
  is_youth BOOLEAN DEFAULT FALSE,
  
  -- Disability
  has_disability BOOLEAN DEFAULT FALSE,
  disability_document_url TEXT,
  disability_type TEXT,
  
  -- Eligibility Status
  eligibility_status TEXT NOT NULL DEFAULT 'pending' CHECK (eligibility_status IN ('pending', 'approved', 'denied', 'expired')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  denial_reason TEXT,
  expiration_date DATE,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_eligibility_user ON participant_eligibility(user_id);
CREATE INDEX idx_eligibility_status ON participant_eligibility(eligibility_status);

-- ===========================================
-- INDIVIDUAL EMPLOYMENT PLANS (IEP)
-- ===========================================

CREATE TABLE IF NOT EXISTS individual_employment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Career Goals
  career_goal TEXT NOT NULL,
  employment_goal TEXT NOT NULL,
  target_occupation TEXT,
  target_industry TEXT,
  target_wage DECIMAL(10,2),
  target_completion_date DATE,
  
  -- Assessment
  education_level TEXT,
  work_experience JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  barriers JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  
  -- Plan
  training_needs JSONB DEFAULT '[]'::jsonb,
  support_services_needed JSONB DEFAULT '[]'::jsonb,
  milestones JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'active', 'completed', 'cancelled')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  approval_notes TEXT,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_iep_user ON individual_employment_plans(user_id);
CREATE INDEX idx_iep_status ON individual_employment_plans(status);

-- ===========================================
-- EMPLOYMENT OUTCOMES
-- ===========================================

CREATE TABLE IF NOT EXISTS employment_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Employer Information
  employer_name TEXT NOT NULL,
  employer_contact JSONB,
  job_title TEXT NOT NULL,
  occupation TEXT,
  industry TEXT,
  
  -- Employment Details
  start_date DATE NOT NULL,
  end_date DATE,
  hourly_wage DECIMAL(10,2),
  hours_per_week INTEGER,
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'temporary', 'seasonal', 'self_employed')),
  benefits JSONB DEFAULT '[]'::jsonb,
  related_to_training BOOLEAN DEFAULT FALSE,
  
  -- Status
  employment_status TEXT NOT NULL DEFAULT 'employed' CHECK (employment_status IN ('employed', 'terminated', 'resigned', 'laid_off')),
  
  -- Verification
  verification_method TEXT,
  verification_document TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  
  -- Follow-up (WIOA requires 2nd and 4th quarter follow-up)
  second_quarter_followup JSONB,
  fourth_quarter_followup JSONB,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_employment_user ON employment_outcomes(user_id);
CREATE INDEX idx_employment_status ON employment_outcomes(employment_status);
CREATE INDEX idx_employment_start_date ON employment_outcomes(start_date);

-- ===========================================
-- SUPPORT SERVICES
-- ===========================================

CREATE TABLE IF NOT EXISTS support_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Service Details
  service_type TEXT NOT NULL CHECK (service_type IN ('childcare', 'transportation', 'work_clothing', 'tools', 'emergency', 'other')),
  description TEXT NOT NULL,
  requested_amount DECIMAL(10,2),
  approved_amount DECIMAL(10,2),
  frequency TEXT CHECK (frequency IN ('one_time', 'weekly', 'monthly')),
  start_date DATE,
  end_date DATE,
  
  -- Request
  request_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  justification TEXT,
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high', 'urgent')),
  
  -- Approval
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'completed', 'cancelled')),
  approved_by UUID REFERENCES profiles(id),
  approval_date TIMESTAMPTZ,
  approval_notes TEXT,
  denial_reason TEXT,
  
  -- Payment
  payment_method TEXT,
  payment_date DATE,
  payment_reference TEXT,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_support_services_user ON support_services(user_id);
CREATE INDEX idx_support_services_status ON support_services(status);
CREATE INDEX idx_support_services_type ON support_services(service_type);

-- ===========================================
-- EMPLOYER PARTNERSHIPS
-- ===========================================

CREATE TABLE IF NOT EXISTS employers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT CHECK (size IN ('small', 'medium', 'large')),
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address JSONB,
  website TEXT,
  
  -- Partnership Details
  partnership_status TEXT DEFAULT 'active' CHECK (partnership_status IN ('active', 'inactive', 'pending')),
  partnership_start_date DATE,
  ojt_agreement BOOLEAN DEFAULT FALSE,
  work_experience_available BOOLEAN DEFAULT FALSE,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_employers_status ON employers(partnership_status);
CREATE INDEX idx_employers_industry ON employers(industry);

-- ===========================================
-- JOB POSTINGS
-- ===========================================

CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
  
  -- Job Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  occupation TEXT,
  industry TEXT,
  location TEXT,
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'temporary', 'seasonal')),
  wage_min DECIMAL(10,2),
  wage_max DECIMAL(10,2),
  benefits JSONB DEFAULT '[]'::jsonb,
  
  -- Requirements
  education_required TEXT,
  experience_required TEXT,
  skills_required JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'filled', 'closed', 'cancelled')),
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  closing_date DATE,
  
  -- Tracking
  applications_count INTEGER DEFAULT 0,
  placements_count INTEGER DEFAULT 0,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_postings_employer ON job_postings(employer_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);

-- ===========================================
-- AUDIT LOG
-- ===========================================

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE case_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE participant_eligibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE individual_employment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE employment_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Case Management Policies
CREATE POLICY "Users can view their own cases"
  ON case_management FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Case managers can view their assigned cases"
  ON case_management FOR SELECT
  USING (auth.uid() = case_manager_id);

CREATE POLICY "Admins can view all cases"
  ON case_management FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Eligibility Policies
CREATE POLICY "Users can view their own eligibility"
  ON participant_eligibility FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all eligibility records"
  ON participant_eligibility FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'case_manager')
    )
  );

-- IEP Policies
CREATE POLICY "Users can view their own IEP"
  ON individual_employment_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all IEPs"
  ON individual_employment_plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'case_manager')
    )
  );

-- Employment Outcomes Policies
CREATE POLICY "Users can view their own employment outcomes"
  ON employment_outcomes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all employment outcomes"
  ON employment_outcomes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'case_manager')
    )
  );

-- Support Services Policies
CREATE POLICY "Users can view their own support services"
  ON support_services FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can request support services"
  ON support_services FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all support services"
  ON support_services FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'case_manager')
    )
  );

-- Job Postings Policies (public read)
CREATE POLICY "Anyone can view open job postings"
  ON job_postings FOR SELECT
  USING (status = 'open');

CREATE POLICY "Admins can manage job postings"
  ON job_postings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Audit Log Policies
CREATE POLICY "Admins can view audit logs"
  ON audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ===========================================
-- FUNCTIONS AND TRIGGERS
-- ===========================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_case_management_updated_at BEFORE UPDATE ON case_management
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eligibility_updated_at BEFORE UPDATE ON participant_eligibility
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_iep_updated_at BEFORE UPDATE ON individual_employment_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employment_updated_at BEFORE UPDATE ON employment_outcomes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_services_updated_at BEFORE UPDATE ON support_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employers_updated_at BEFORE UPDATE ON employers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- COMMENTS
-- ===========================================

COMMENT ON TABLE case_management IS 'WIOA case management tracking for participants';
COMMENT ON TABLE participant_eligibility IS 'WIOA eligibility determination and documentation';
COMMENT ON TABLE individual_employment_plans IS 'Individual Employment Plans (IEP) required by WIOA';
COMMENT ON TABLE employment_outcomes IS 'Employment outcomes tracking for WIOA performance measures';
COMMENT ON TABLE support_services IS 'Support services (childcare, transportation, etc.) for WIOA participants';
COMMENT ON TABLE employers IS 'Employer partnerships for job placement';
COMMENT ON TABLE job_postings IS 'Job postings from employer partners';
COMMENT ON TABLE audit_log IS 'Audit trail for compliance and security';
