-- =====================================================
-- ADMIN TABLES: Leads, Campaigns, API Keys, WOTC
-- (Courses table already exists - not recreating)
-- =====================================================

-- Leads table for CRM
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_interest TEXT,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'appointment_set', 
    'application_started', 'enrolled', 'not_interested', 'unqualified'
  )),
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);

-- Campaigns table for marketing
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'email' CHECK (type IN ('email', 'sms', 'social', 'event')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed')),
  target_audience TEXT,
  content JSONB,
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0}'::jsonb,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON campaigns(type);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at DESC);

-- API Keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'revoked')),
  scopes TEXT[] DEFAULT '{}',
  rate_limit INTEGER DEFAULT 1000,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);
CREATE INDEX IF NOT EXISTS idx_api_keys_created_by ON api_keys(created_by);

-- WOTC Applications table
CREATE TABLE IF NOT EXISTS wotc_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_first_name TEXT NOT NULL,
  employee_last_name TEXT NOT NULL,
  employee_ssn_hash TEXT,
  employee_dob DATE,
  employer_name TEXT NOT NULL,
  employer_ein TEXT,
  employer_contact_phone TEXT,
  job_offer_date DATE,
  start_date DATE,
  starting_wage DECIMAL(10,2),
  position TEXT,
  target_groups TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'submitted', 'pending_review', 'approved', 'denied', 'expired'
  )),
  certification_received BOOLEAN DEFAULT false,
  tax_credit_amount DECIMAL(10,2),
  documents JSONB DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wotc_status ON wotc_applications(status);
CREATE INDEX IF NOT EXISTS idx_wotc_created_at ON wotc_applications(created_at DESC);

-- CRM Contacts table
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  contact_type TEXT DEFAULT 'prospect' CHECK (contact_type IN (
    'prospect', 'student', 'alumni', 'employer', 'vendor', 'other'
  )),
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crm_contacts_type ON crm_contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);

-- Notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_course_updates BOOLEAN DEFAULT true,
  email_grades BOOLEAN DEFAULT true,
  email_deadlines BOOLEAN DEFAULT true,
  email_messages BOOLEAN DEFAULT true,
  email_newsletter BOOLEAN DEFAULT true,
  push_messages BOOLEAN DEFAULT true,
  push_reminders BOOLEAN DEFAULT true,
  push_announcements BOOLEAN DEFAULT true,
  sms_urgent BOOLEAN DEFAULT false,
  sms_reminders BOOLEAN DEFAULT false,
  sms_phone TEXT,
  in_app_all BOOLEAN DEFAULT true,
  in_app_sound BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE wotc_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "Admin full access to leads" ON leads FOR ALL USING (true);
CREATE POLICY "Admin full access to campaigns" ON campaigns FOR ALL USING (true);
CREATE POLICY "Admin full access to api_keys" ON api_keys FOR ALL USING (true);
CREATE POLICY "Admin full access to wotc" ON wotc_applications FOR ALL USING (true);
CREATE POLICY "Admin full access to contacts" ON crm_contacts FOR ALL USING (true);

-- Users can manage their own notification preferences
CREATE POLICY "Users manage own notifications" ON notification_preferences 
  FOR ALL USING (auth.uid() = user_id);

-- Seed data
INSERT INTO leads (first_name, last_name, email, phone, program_interest, source, status) VALUES
  ('Maria', 'Garcia', 'maria.garcia@example.com', '(317) 555-0101', 'CNA', 'website', 'new'),
  ('James', 'Wilson', 'james.wilson@example.com', '(317) 555-0102', 'HVAC', 'referral', 'contacted'),
  ('Sarah', 'Johnson', 'sarah.j@example.com', '(317) 555-0103', 'Medical Admin', 'job_fair', 'qualified'),
  ('Michael', 'Brown', 'mbrown@example.com', '(317) 555-0104', 'IT Support', 'social_media', 'appointment_set'),
  ('Emily', 'Davis', 'emily.davis@example.com', '(317) 555-0105', 'Phlebotomy', 'website', 'new'),
  ('David', 'Martinez', 'david.m@example.com', '(317) 555-0106', 'Electrical', 'workforce_agency', 'contacted'),
  ('Jennifer', 'Anderson', 'janderson@example.com', '(317) 555-0107', 'CNA', 'community_event', 'qualified'),
  ('Robert', 'Taylor', 'rtaylor@example.com', '(317) 555-0108', 'Welding', 'website', 'new')
ON CONFLICT (email) DO NOTHING;

INSERT INTO campaigns (name, description, type, status, stats) VALUES
  ('Spring 2025 Enrollment', 'Promote spring enrollment for all programs', 'email', 'active', '{"sent": 2450, "opened": 1034, "clicked": 287, "converted": 45}'),
  ('Healthcare Career Fair', 'Invite leads to healthcare career fair', 'email', 'completed', '{"sent": 1800, "opened": 756, "clicked": 198, "converted": 32}'),
  ('WIOA Funding Awareness', 'Educate prospects about free training through WIOA', 'email', 'active', '{"sent": 3200, "opened": 1408, "clicked": 412, "converted": 67}'),
  ('Alumni Success Stories', 'Share graduate success stories', 'social', 'scheduled', '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0}'),
  ('Trade Skills Workshop', 'Free workshop for skilled trades', 'event', 'draft', '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0}')
ON CONFLICT DO NOTHING;

INSERT INTO crm_contacts (first_name, last_name, email, phone, company, job_title, contact_type) VALUES
  ('John', 'Smith', 'jsmith@acmehealthcare.com', '(317) 555-0201', 'Acme Healthcare', 'HR Director', 'employer'),
  ('Lisa', 'Chen', 'lchen@indytech.com', '(317) 555-0202', 'Indy Tech Solutions', 'Hiring Manager', 'employer'),
  ('Mark', 'Thompson', 'mthompson@buildright.com', '(317) 555-0203', 'BuildRight Construction', 'Operations Manager', 'employer'),
  ('Amanda', 'White', 'awhite@carefirst.org', '(317) 555-0204', 'CareFirst Medical', 'Nurse Manager', 'employer'),
  ('Carlos', 'Rodriguez', 'crodriguez@example.com', '(317) 555-0205', NULL, NULL, 'alumni')
ON CONFLICT DO NOTHING;
