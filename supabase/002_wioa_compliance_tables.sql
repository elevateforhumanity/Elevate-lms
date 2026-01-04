-- WIOA Compliance Database Schema
-- Comprehensive tables for DOL/WIOA compliance tracking

-- ============================================
-- PARTICIPANT ELIGIBILITY
-- ============================================

CREATE TABLE IF NOT EXISTS participant_eligibility (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Demographics
  date_of_birth DATE NOT NULL,
  gender VARCHAR(50),
  ethnicity VARCHAR(100),
  race JSONB DEFAULT '[]',
  
  -- Eligibility Categories
  is_veteran BOOLEAN DEFAULT FALSE,
  veteran_document_url TEXT,
  veteran_verified_at TIMESTAMP,
  
  is_dislocated_worker BOOLEAN DEFAULT FALSE,
  dislocated_worker_document_url TEXT,
  layoff_date DATE,
  dislocated_worker_verified_at TIMESTAMP,
  
  is_low_income BOOLEAN DEFAULT FALSE,
  income_document_url TEXT,
  household_size INTEGER,
  annual_income DECIMAL(10, 2),
  low_income_verified_at TIMESTAMP,
  
  is_youth BOOLEAN DEFAULT FALSE,
  youth_verified_at TIMESTAMP,
  
  has_disability BOOLEAN DEFAULT FALSE,
  disability_document_url TEXT,
  disability_type VARCHAR(255),
  disability_verified_at TIMESTAMP,
  
  -- Eligibility Status
  eligibility_status VARCHAR(50) DEFAULT 'pending',
  approved_by VARCHAR(255),
  approved_at TIMESTAMP,
  expires_at TIMESTAMP,
  denial_reason TEXT,
  
  -- Audit Trail
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT,
  
  CONSTRAINT fk_participant_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_participant_eligibility_user_id ON participant_eligibility(user_id);
CREATE INDEX idx_participant_eligibility_status ON participant_eligibility(eligibility_status);

-- ============================================
-- ATTENDANCE TRACKING
-- ============================================

CREATE TABLE IF NOT EXISTS attendance_records (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  course_id VARCHAR(255) NOT NULL,
  session_id VARCHAR(255),
  
  -- Attendance Details
  attendance_date DATE NOT NULL,
  clock_in TIMESTAMP NOT NULL,
  clock_out TIMESTAMP,
  total_minutes INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'present',
  excuse_reason TEXT,
  excuse_document_url TEXT,
  
  -- Tracking
  ip_address VARCHAR(45),
  location VARCHAR(255),
  verified_by VARCHAR(255),
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT fk_attendance_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_attendance_user_id ON attendance_records(user_id);
CREATE INDEX idx_attendance_course_id ON attendance_records(course_id);
CREATE INDEX idx_attendance_date ON attendance_records(attendance_date);
CREATE INDEX idx_attendance_status ON attendance_records(status);

-- ============================================
-- EMPLOYMENT OUTCOMES
-- ============================================

CREATE TABLE IF NOT EXISTS employment_outcomes (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  course_id VARCHAR(255),
  
  -- Employment Details
  employment_status VARCHAR(50) NOT NULL,
  employer_name VARCHAR(255),
  employer_contact VARCHAR(255),
  employer_phone VARCHAR(50),
  employer_email VARCHAR(255),
  job_title VARCHAR(255),
  start_date DATE,
  end_date DATE,
  
  -- Wage Information
  hourly_wage DECIMAL(10, 2),
  annual_salary DECIMAL(12, 2),
  hours_per_week DECIMAL(5, 2),
  
  -- Verification
  verification_method VARCHAR(100),
  verification_document_url TEXT,
  verified_at TIMESTAMP,
  verified_by VARCHAR(255),
  
  -- Retention Tracking
  second_quarter_retained BOOLEAN DEFAULT FALSE,
  second_quarter_verified_at TIMESTAMP,
  second_quarter_wage DECIMAL(10, 2),
  
  fourth_quarter_retained BOOLEAN DEFAULT FALSE,
  fourth_quarter_verified_at TIMESTAMP,
  fourth_quarter_wage DECIMAL(10, 2),
  
  -- Credentials
  credential_earned BOOLEAN DEFAULT FALSE,
  credential_type VARCHAR(255),
  credential_name VARCHAR(255),
  credential_date DATE,
  credential_document_url TEXT,
  
  -- Industry Classification
  industry_code VARCHAR(50),
  occupation_code VARCHAR(50),
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT,
  
  CONSTRAINT fk_employment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_employment_user_id ON employment_outcomes(user_id);
CREATE INDEX idx_employment_status ON employment_outcomes(employment_status);
CREATE INDEX idx_employment_start_date ON employment_outcomes(start_date);

-- ============================================
-- INDIVIDUAL EMPLOYMENT PLANS (IEP)
-- ============================================

CREATE TABLE IF NOT EXISTS individual_employment_plans (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  case_manager_id VARCHAR(255) NOT NULL,
  
  -- Career Goals
  career_goal TEXT NOT NULL,
  target_occupation VARCHAR(255),
  target_industry VARCHAR(255),
  target_wage DECIMAL(10, 2),
  
  -- Assessment
  current_skills JSONB DEFAULT '[]',
  skill_gaps JSONB DEFAULT '[]',
  barriers JSONB DEFAULT '[]',
  strengths JSONB DEFAULT '[]',
  
  -- Training Plan
  training_programs JSONB DEFAULT '[]',
  
  -- Services
  support_services JSONB DEFAULT '[]',
  
  -- Milestones
  milestones JSONB DEFAULT '[]',
  
  -- Signatures
  participant_signature TEXT,
  participant_signed_at TIMESTAMP,
  case_manager_signature TEXT,
  case_manager_signed_at TIMESTAMP,
  
  -- Reviews
  last_review_date DATE,
  next_review_date DATE,
  review_frequency_days INTEGER DEFAULT 90,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft',
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT fk_iep_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_iep_case_manager FOREIGN KEY (case_manager_id) REFERENCES users(id)
);

CREATE INDEX idx_iep_user_id ON individual_employment_plans(user_id);
CREATE INDEX idx_iep_case_manager_id ON individual_employment_plans(case_manager_id);
CREATE INDEX idx_iep_status ON individual_employment_plans(status);
CREATE INDEX idx_iep_next_review ON individual_employment_plans(next_review_date);

-- ============================================
-- MEASURABLE SKILL GAINS
-- ============================================

CREATE TABLE IF NOT EXISTS measurable_skill_gains (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  course_id VARCHAR(255),
  
  -- Assessment Type
  gain_type VARCHAR(100) NOT NULL,
  
  -- Pre/Post Assessment
  pre_assessment_score DECIMAL(5, 2),
  pre_assessment_date DATE,
  post_assessment_score DECIMAL(5, 2),
  post_assessment_date DATE,
  
  -- Educational Functioning Level
  pre_efl VARCHAR(100),
  post_efl VARCHAR(100),
  
  -- Documentation
  documentation_type VARCHAR(255),
  document_url TEXT,
  verified_by VARCHAR(255),
  verified_at TIMESTAMP,
  
  -- Skill Details
  skill_area VARCHAR(255),
  competencies_achieved JSONB DEFAULT '[]',
  
  -- Status
  status VARCHAR(50) DEFAULT 'in_progress',
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT,
  
  CONSTRAINT fk_skill_gains_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_skill_gains_user_id ON measurable_skill_gains(user_id);
CREATE INDEX idx_skill_gains_course_id ON measurable_skill_gains(course_id);
CREATE INDEX idx_skill_gains_type ON measurable_skill_gains(gain_type);

-- ============================================
-- CASE MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS case_notes (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  case_manager_id VARCHAR(255) NOT NULL,
  
  -- Note Details
  note_type VARCHAR(100) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  
  -- Services
  services_discussed JSONB DEFAULT '[]',
  referrals_made JSONB DEFAULT '[]',
  
  -- Follow-up
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  follow_up_completed BOOLEAN DEFAULT FALSE,
  follow_up_completed_at TIMESTAMP,
  
  -- Attachments
  attachments JSONB DEFAULT '[]',
  
  -- Confidentiality
  confidential BOOLEAN DEFAULT FALSE,
  shared_with JSONB DEFAULT '[]',
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT fk_case_notes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_case_notes_manager FOREIGN KEY (case_manager_id) REFERENCES users(id)
);

CREATE INDEX idx_case_notes_user_id ON case_notes(user_id);
CREATE INDEX idx_case_notes_manager_id ON case_notes(case_manager_id);
CREATE INDEX idx_case_notes_type ON case_notes(note_type);
CREATE INDEX idx_case_notes_follow_up ON case_notes(follow_up_date) WHERE follow_up_required = TRUE;

-- ============================================
-- FINANCIAL TRACKING
-- ============================================

CREATE TABLE IF NOT EXISTS participant_costs (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Cost Categories
  training_costs DECIMAL(12, 2) DEFAULT 0,
  support_service_costs DECIMAL(12, 2) DEFAULT 0,
  administrative_costs DECIMAL(12, 2) DEFAULT 0,
  
  -- Funding Sources
  funding_source VARCHAR(100) NOT NULL,
  grant_number VARCHAR(100),
  
  -- Cost Details
  cost_items JSONB DEFAULT '[]',
  
  -- Totals
  total_cost DECIMAL(12, 2) DEFAULT 0,
  
  -- Period
  fiscal_year INTEGER,
  quarter INTEGER,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT fk_participant_costs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_participant_costs_user_id ON participant_costs(user_id);
CREATE INDEX idx_participant_costs_funding ON participant_costs(funding_source);
CREATE INDEX idx_participant_costs_period ON participant_costs(fiscal_year, quarter);

-- ============================================
-- SUPPORT SERVICES
-- ============================================

CREATE TABLE IF NOT EXISTS support_services (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  
  -- Service Details
  service_type VARCHAR(100) NOT NULL,
  service_description TEXT,
  provider_name VARCHAR(255),
  provider_contact VARCHAR(255),
  
  -- Dates
  start_date DATE NOT NULL,
  end_date DATE,
  
  -- Cost
  cost DECIMAL(10, 2) DEFAULT 0,
  funding_source VARCHAR(100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  
  -- Documentation
  authorization_document_url TEXT,
  receipt_document_url TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT,
  
  CONSTRAINT fk_support_services_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_support_services_user_id ON support_services(user_id);
CREATE INDEX idx_support_services_type ON support_services(service_type);
CREATE INDEX idx_support_services_status ON support_services(status);

-- ============================================
-- WIOA REPORTS
-- ============================================

CREATE TABLE IF NOT EXISTS wioa_reports (
  id VARCHAR(255) PRIMARY KEY,
  
  -- Report Details
  report_type VARCHAR(100) NOT NULL,
  report_period VARCHAR(50) NOT NULL,
  fiscal_year INTEGER NOT NULL,
  quarter INTEGER,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft',
  generated_at TIMESTAMP,
  generated_by VARCHAR(255),
  submitted_at TIMESTAMP,
  submitted_by VARCHAR(255),
  
  -- Data
  report_data JSONB,
  validation_errors JSONB DEFAULT '[]',
  
  -- Files
  report_file_url TEXT,
  submission_confirmation TEXT,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  UNIQUE(report_type, fiscal_year, quarter)
);

CREATE INDEX idx_wioa_reports_type ON wioa_reports(report_type);
CREATE INDEX idx_wioa_reports_period ON wioa_reports(fiscal_year, quarter);
CREATE INDEX idx_wioa_reports_status ON wioa_reports(status);

-- ============================================
-- AUDIT LOGS
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(255) PRIMARY KEY,
  
  -- Who
  user_id VARCHAR(255),
  user_role VARCHAR(50),
  user_email VARCHAR(255),
  
  -- What
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(255),
  
  -- Changes
  before_data JSONB,
  after_data JSONB,
  
  -- When/Where
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  -- Why
  reason TEXT,
  
  -- Metadata
  session_id VARCHAR(255),
  request_id VARCHAR(255),
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- ============================================
-- EMPLOYER PARTNERSHIPS
-- ============================================

CREATE TABLE IF NOT EXISTS employers (
  id VARCHAR(255) PRIMARY KEY,
  
  -- Company Details
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  industry_code VARCHAR(50),
  
  -- Contact Information
  contact_name VARCHAR(255),
  contact_title VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  
  -- Address
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  
  -- Partnership Details
  partnership_start_date DATE,
  partnership_status VARCHAR(50) DEFAULT 'active',
  
  -- Opportunities
  hiring_needs TEXT,
  internship_opportunities BOOLEAN DEFAULT FALSE,
  apprenticeship_opportunities BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT
);

CREATE INDEX idx_employers_status ON employers(partnership_status);
CREATE INDEX idx_employers_industry ON employers(industry);

-- ============================================
-- JOB POSTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS job_postings (
  id VARCHAR(255) PRIMARY KEY,
  employer_id VARCHAR(255) NOT NULL,
  
  -- Job Details
  job_title VARCHAR(255) NOT NULL,
  job_description TEXT NOT NULL,
  requirements TEXT,
  
  -- Compensation
  salary_min DECIMAL(12, 2),
  salary_max DECIMAL(12, 2),
  wage_type VARCHAR(50),
  
  -- Location
  location VARCHAR(255),
  remote_option BOOLEAN DEFAULT FALSE,
  
  -- Dates
  posted_date DATE NOT NULL,
  closing_date DATE,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',
  positions_available INTEGER DEFAULT 1,
  positions_filled INTEGER DEFAULT 0,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  CONSTRAINT fk_job_postings_employer FOREIGN KEY (employer_id) REFERENCES employers(id) ON DELETE CASCADE
);

CREATE INDEX idx_job_postings_employer_id ON job_postings(employer_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_posted_date ON job_postings(posted_date);

-- ============================================
-- UPDATE TRIGGERS
-- ============================================

-- Trigger for participant_eligibility
CREATE OR REPLACE FUNCTION update_participant_eligibility_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_participant_eligibility_updated_at 
BEFORE UPDATE ON participant_eligibility
FOR EACH ROW EXECUTE FUNCTION update_participant_eligibility_timestamp();

-- Trigger for attendance_records
CREATE TRIGGER trigger_attendance_records_updated_at 
BEFORE UPDATE ON attendance_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for employment_outcomes
CREATE TRIGGER trigger_employment_outcomes_updated_at 
BEFORE UPDATE ON employment_outcomes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for individual_employment_plans
CREATE TRIGGER trigger_iep_updated_at 
BEFORE UPDATE ON individual_employment_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for measurable_skill_gains
CREATE TRIGGER trigger_skill_gains_updated_at 
BEFORE UPDATE ON measurable_skill_gains
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for case_notes
CREATE TRIGGER trigger_case_notes_updated_at 
BEFORE UPDATE ON case_notes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for participant_costs
CREATE TRIGGER trigger_participant_costs_updated_at 
BEFORE UPDATE ON participant_costs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for support_services
CREATE TRIGGER trigger_support_services_updated_at 
BEFORE UPDATE ON support_services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for wioa_reports
CREATE TRIGGER trigger_wioa_reports_updated_at 
BEFORE UPDATE ON wioa_reports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for employers
CREATE TRIGGER trigger_employers_updated_at 
BEFORE UPDATE ON employers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for job_postings
CREATE TRIGGER trigger_job_postings_updated_at 
BEFORE UPDATE ON job_postings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
