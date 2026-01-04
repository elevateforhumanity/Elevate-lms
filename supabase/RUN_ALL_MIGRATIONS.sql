-- ============================================================================
-- RUN THIS ENTIRE FILE IN SUPABASE SQL EDITOR
-- Copy and paste this entire file, then click "Run"
-- ============================================================================

-- ========================================
-- 20251226_customer_service_system.sql
-- ========================================
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


-- ========================================
-- 20251226_donations_campaigns_system.sql
-- ========================================
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


-- ========================================
-- 20251226_performance_analytics_system.sql
-- ========================================
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date ON performance_metrics(date);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_category ON performance_metrics(category);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_user ON page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_conversions_user ON conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_type ON conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_conversions_created ON conversions(created_at);

-- RLS
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- Admin can view all metrics
CREATE POLICY "Admin can view all metrics"
  ON performance_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can insert metrics
CREATE POLICY "Admin can insert metrics"
  ON performance_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can view all page views
CREATE POLICY "Admin can view all page views"
  ON page_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Admin can view all conversions
CREATE POLICY "Admin can view all conversions"
  ON conversions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own conversions
CREATE POLICY "Users can view own conversions"
  ON conversions FOR SELECT
  USING (user_id = auth.uid());

-- System can insert conversions
CREATE POLICY "System can insert conversions"
  ON conversions FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE performance_metrics IS 'Performance metrics tracking';
COMMENT ON TABLE page_views IS 'Page view analytics';
COMMENT ON TABLE conversions IS 'Conversion tracking';

-- Seed initial performance metrics
INSERT INTO performance_metrics (metric_name, value, date, category) VALUES
  ('total_students', 0, CURRENT_DATE, 'students'),
  ('active_enrollments', 0, CURRENT_DATE, 'enrollments'),
  ('completion_rate', 0, CURRENT_DATE, 'performance'),
  ('revenue', 0, CURRENT_DATE, 'financial'),
  ('applications_submitted', 0, CURRENT_DATE, 'applications')
ON CONFLICT DO NOTHING;


-- ========================================
-- 20251226_process_documentation_system.sql
-- ========================================
-- Process Documentation System
-- Tables for documenting internal processes with step-by-step guides

-- Processes Table
CREATE TABLE IF NOT EXISTS processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  documents_required TEXT[],
  average_time INTEGER, -- in minutes
  completion_rate DECIMAL(5,2),
  category TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Process Steps Table
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_id UUID NOT NULL REFERENCES processes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(process_id, step_number)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_processes_category ON processes(category);
CREATE INDEX IF NOT EXISTS idx_processes_created_by ON processes(created_by);
CREATE INDEX IF NOT EXISTS idx_process_steps_process ON process_steps(process_id);
CREATE INDEX IF NOT EXISTS idx_process_steps_order ON process_steps(process_id, step_number);

-- RLS
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;

-- Staff can view all processes
CREATE POLICY "Staff can view processes"
  ON processes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage processes
CREATE POLICY "Admin can manage processes"
  ON processes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Staff can view all process steps
CREATE POLICY "Staff can view process steps"
  ON process_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage process steps
CREATE POLICY "Admin can manage process steps"
  ON process_steps FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE processes IS 'Internal process documentation';
COMMENT ON TABLE process_steps IS 'Step-by-step instructions for processes';


-- ========================================
-- 20251226_qa_checklist_system.sql
-- ========================================
-- QA Checklist System
-- Tables for quality assurance checklists and completions

-- QA Checklists Table
CREATE TABLE IF NOT EXISTS qa_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly')),
  tasks JSONB DEFAULT '[]'::jsonb,
  assignee_role TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QA Checklist Completions Table
CREATE TABLE IF NOT EXISTS qa_checklist_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id UUID NOT NULL REFERENCES qa_checklists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_qa_checklists_frequency ON qa_checklists(frequency);
CREATE INDEX IF NOT EXISTS idx_qa_checklists_role ON qa_checklists(assignee_role);
CREATE INDEX IF NOT EXISTS idx_qa_checklists_active ON qa_checklists(is_active);
CREATE INDEX IF NOT EXISTS idx_qa_completions_checklist ON qa_checklist_completions(checklist_id);
CREATE INDEX IF NOT EXISTS idx_qa_completions_user ON qa_checklist_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_qa_completions_date ON qa_checklist_completions(completed_at);

-- RLS
ALTER TABLE qa_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklist_completions ENABLE ROW LEVEL SECURITY;

-- Staff can view active checklists
CREATE POLICY "Staff can view active checklists"
  ON qa_checklists FOR SELECT
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'staff', 'advisor')
    )
  );

-- Admin can manage checklists
CREATE POLICY "Admin can manage checklists"
  ON qa_checklists FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own completions
CREATE POLICY "Users can view own completions"
  ON qa_checklist_completions FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own completions
CREATE POLICY "Users can insert own completions"
  ON qa_checklist_completions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Admin can view all completions
CREATE POLICY "Admin can view all completions"
  ON qa_checklist_completions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can update completions (for approval)
CREATE POLICY "Admin can update completions"
  ON qa_checklist_completions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE qa_checklists IS 'Quality assurance checklists';
COMMENT ON TABLE qa_checklist_completions IS 'Completed QA checklists';


-- ========================================
-- 20251226_reviews_system.sql
-- ========================================
-- Reviews System
-- Customer reviews with moderation and platform syncing

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  response TEXT,
  responded_by UUID REFERENCES auth.users(id),
  responded_at TIMESTAMPTZ,
  platform_synced BOOLEAN DEFAULT false,
  synced_platforms TEXT[],
  moderation_status TEXT CHECK (moderation_status IN (
    'pending',
    'approved',
    'rejected',
    'flagged'
  )) DEFAULT 'pending',
  moderated_by UUID REFERENCES auth.users(id),
  moderated_at TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(moderation_status);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at);

-- RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (moderation_status = 'approved');

-- Users can view their own reviews
CREATE POLICY "Users can view own reviews"
  ON reviews FOR SELECT
  USING (user_id = auth.uid());

-- Anyone can submit reviews
CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Admin can view all reviews
CREATE POLICY "Admin can view all reviews"
  ON reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Admin can manage reviews
CREATE POLICY "Admin can manage reviews"
  ON reviews FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE reviews IS 'Customer reviews with moderation';


-- ========================================
-- 20251226_seed_processes.sql
-- ========================================
-- Seed Process Documentation
-- Sample internal processes with step-by-step guides

-- Insert Processes
INSERT INTO processes (name, description, documents_required, average_time, completion_rate, category) VALUES
(
  'Student Enrollment',
  'Complete process for enrolling a new student from application to program start',
  ARRAY['Photo ID', 'Proof of eligibility', 'Social Security Card', 'High school diploma or GED'],
  45,
  95.5,
  'Enrollment'
),
(
  'WIOA Funding Application',
  'How to apply for WIOA funding for eligible students',
  ARRAY['WIOA application form', 'Income verification', 'Eligibility documentation'],
  60,
  88.0,
  'Funding'
),
(
  'Course Completion Certification',
  'Process for issuing certificates when students complete programs',
  ARRAY['Completion verification', 'Grade transcript', 'Attendance records'],
  15,
  98.5,
  'Certification'
),
(
  'Tax Document Upload',
  'How to help students upload tax documents securely',
  ARRAY['Valid ID', 'Tax forms (W2, 1099, etc.)'],
  20,
  92.0,
  'Tax Services'
),
(
  'Customer Service Ticket Resolution',
  'Standard process for handling and resolving student issues',
  ARRAY['Issue description', 'Student contact info'],
  30,
  85.0,
  'Support'
);

-- Insert Process Steps for Student Enrollment
INSERT INTO process_steps (process_id, step_number, title, description) VALUES
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  1,
  'Receive Application',
  'Student submits online application or completes paper form. Verify all required fields are completed.'
),
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  2,
  'Verify Eligibility',
  'Check student meets program requirements: age, education level, residency, and funding eligibility.'
),
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  3,
  'Collect Documents',
  'Request and verify: Photo ID, proof of eligibility, Social Security Card, high school diploma or GED.'
),
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  4,
  'Schedule Orientation',
  'Book student for program orientation session. Send calendar invite and reminder emails.'
),
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  5,
  'Create Student Account',
  'Set up LMS account, assign to program, and send login credentials.'
),
(
  (SELECT id FROM processes WHERE name = 'Student Enrollment'),
  6,
  'Complete Enrollment',
  'Mark enrollment as active in system. Notify student of start date and next steps.'
);

-- Insert Process Steps for WIOA Funding
INSERT INTO process_steps (process_id, step_number, title, description) VALUES
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  1,
  'Determine Eligibility',
  'Verify student meets WIOA eligibility criteria: low income, dislocated worker, or youth.'
),
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  2,
  'Complete Application',
  'Help student fill out WIOA application form with accurate information.'
),
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  3,
  'Gather Documentation',
  'Collect income verification, proof of eligibility status, and supporting documents.'
),
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  4,
  'Submit to Workforce Board',
  'Upload complete application packet to workforce board portal for review.'
),
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  5,
  'Follow Up',
  'Check application status weekly. Respond to any requests for additional information.'
),
(
  (SELECT id FROM processes WHERE name = 'WIOA Funding Application'),
  6,
  'Receive Approval',
  'Once approved, notify student and proceed with enrollment.'
);

-- Insert Process Steps for Certification
INSERT INTO process_steps (process_id, step_number, title, description) VALUES
(
  (SELECT id FROM processes WHERE name = 'Course Completion Certification'),
  1,
  'Verify Completion',
  'Confirm student has completed all required coursework and assessments with passing grades.'
),
(
  (SELECT id FROM processes WHERE name = 'Course Completion Certification'),
  2,
  'Generate Certificate',
  'Use certificate template to create official completion certificate with student name and program details.'
),
(
  (SELECT id FROM processes WHERE name = 'Course Completion Certification'),
  3,
  'Quality Check',
  'Review certificate for accuracy: spelling, dates, program name, and signatures.'
),
(
  (SELECT id FROM processes WHERE name = 'Course Completion Certification'),
  4,
  'Send to Student',
  'Email digital certificate and mail physical copy to student address on file.'
);

-- Insert Process Steps for Tax Document Upload
INSERT INTO process_steps (process_id, step_number, title, description) VALUES
(
  (SELECT id FROM processes WHERE name = 'Tax Document Upload'),
  1,
  'Verify Identity',
  'Check student photo ID matches their account information.'
),
(
  (SELECT id FROM processes WHERE name = 'Tax Document Upload'),
  2,
  'Explain Process',
  'Walk student through document upload portal and security features.'
),
(
  (SELECT id FROM processes WHERE name = 'Tax Document Upload'),
  3,
  'Upload Documents',
  'Help student scan or photograph documents and upload to secure portal.'
),
(
  (SELECT id FROM processes WHERE name = 'Tax Document Upload'),
  4,
  'Confirm Receipt',
  'Verify documents uploaded successfully and are readable. Send confirmation email.'
);

-- Insert Process Steps for Ticket Resolution
INSERT INTO process_steps (process_id, step_number, title, description) VALUES
(
  (SELECT id FROM processes WHERE name = 'Customer Service Ticket Resolution'),
  1,
  'Create Ticket',
  'Log issue in ticket system with student info, issue description, and priority level.'
),
(
  (SELECT id FROM processes WHERE name = 'Customer Service Ticket Resolution'),
  2,
  'Acknowledge Receipt',
  'Send automated email to student confirming ticket received and expected response time.'
),
(
  (SELECT id FROM processes WHERE name = 'Customer Service Ticket Resolution'),
  3,
  'Investigate Issue',
  'Research the problem, check student account, review history, and identify solution.'
),
(
  (SELECT id FROM processes WHERE name = 'Customer Service Ticket Resolution'),
  4,
  'Resolve and Document',
  'Implement solution, document steps taken, and update ticket with resolution details.'
),
(
  (SELECT id FROM processes WHERE name = 'Customer Service Ticket Resolution'),
  5,
  'Follow Up',
  'Contact student to confirm issue is resolved and they are satisfied with the outcome.'
);

COMMENT ON TABLE processes IS 'Seeded with 5 common internal processes';
COMMENT ON TABLE process_steps IS 'Seeded with step-by-step instructions for each process';


-- ========================================
-- 20251226_seed_qa_checklists.sql
-- ========================================
-- Seed QA Checklists
-- Daily and weekly quality assurance tasks for staff

INSERT INTO qa_checklists (title, frequency, tasks, assignee_role, is_active) VALUES
(
  'Daily Opening Checklist',
  'daily',
  '[
    {"task": "Check all systems are online (LMS, email, phone)", "completed": false},
    {"task": "Review overnight student inquiries and respond", "completed": false},
    {"task": "Check for urgent tickets or issues", "completed": false},
    {"task": "Verify scheduled appointments for the day", "completed": false},
    {"task": "Review student attendance for previous day", "completed": false}
  ]'::jsonb,
  'staff',
  true
),
(
  'Daily Closing Checklist',
  'daily',
  '[
    {"task": "Complete all open tickets or document status", "completed": false},
    {"task": "Update student records with today activity", "completed": false},
    {"task": "Respond to all pending emails", "completed": false},
    {"task": "Schedule follow-ups for next day", "completed": false},
    {"task": "Lock sensitive documents and secure workspace", "completed": false}
  ]'::jsonb,
  'staff',
  true
),
(
  'Weekly Enrollment Review',
  'weekly',
  '[
    {"task": "Review all pending applications", "completed": false},
    {"task": "Follow up on incomplete enrollments", "completed": false},
    {"task": "Verify funding applications submitted", "completed": false},
    {"task": "Update enrollment pipeline report", "completed": false},
    {"task": "Schedule orientations for approved students", "completed": false}
  ]'::jsonb,
  'advisor',
  true
),
(
  'Weekly Student Success Check',
  'weekly',
  '[
    {"task": "Identify at-risk students (low attendance/grades)", "completed": false},
    {"task": "Reach out to students who missed classes", "completed": false},
    {"task": "Review course completion rates", "completed": false},
    {"task": "Schedule check-ins with struggling students", "completed": false},
    {"task": "Update student success metrics", "completed": false}
  ]'::jsonb,
  'advisor',
  true
),
(
  'Weekly Data Quality Audit',
  'weekly',
  '[
    {"task": "Verify all student records are complete", "completed": false},
    {"task": "Check for duplicate entries", "completed": false},
    {"task": "Validate contact information is current", "completed": false},
    {"task": "Ensure all required documents are uploaded", "completed": false},
    {"task": "Run data integrity reports", "completed": false}
  ]'::jsonb,
  'admin',
  true
),
(
  'Monthly Compliance Review',
  'monthly',
  '[
    {"task": "Review FERPA compliance logs", "completed": false},
    {"task": "Audit RLS policies and permissions", "completed": false},
    {"task": "Verify grant reporting requirements met", "completed": false},
    {"task": "Check certification expiration dates", "completed": false},
    {"task": "Review and update policies as needed", "completed": false},
    {"task": "Conduct staff training on any policy changes", "completed": false}
  ]'::jsonb,
  'admin',
  true
),
(
  'Daily Customer Service Quality',
  'daily',
  '[
    {"task": "Review customer service tickets for quality", "completed": false},
    {"task": "Check response times meet SLA", "completed": false},
    {"task": "Verify all tickets have proper documentation", "completed": false},
    {"task": "Identify training needs based on ticket patterns", "completed": false},
    {"task": "Recognize staff for excellent service", "completed": false}
  ]'::jsonb,
  'super_admin',
  true
),
(
  'Weekly Technology Check',
  'weekly',
  '[
    {"task": "Test all critical system functions", "completed": false},
    {"task": "Review system performance metrics", "completed": false},
    {"task": "Check for software updates", "completed": false},
    {"task": "Verify backups completed successfully", "completed": false},
    {"task": "Test disaster recovery procedures", "completed": false}
  ]'::jsonb,
  'admin',
  true
);

COMMENT ON TABLE qa_checklists IS 'Seeded with 8 QA checklists covering daily, weekly, and monthly tasks';


-- ========================================
-- 20251226_seed_training_modules.sql
-- ========================================
-- Seed Training Modules
-- Sample training content for staff

INSERT INTO training_modules (title, description, video_url, duration, quiz_questions, required, order_index) VALUES
(
  'Welcome to Elevate for Humanity',
  'Introduction to our mission, values, and organizational structure. Learn about our programs and how you contribute to student success.',
  'https://www.youtube.com/watch?v=example1',
  15,
  '[
    {"question": "What is our primary mission?", "options": ["Workforce development", "Tax preparation", "Both"], "correct": 2},
    {"question": "How many programs do we offer?", "options": ["5-10", "10-20", "20+"], "correct": 2}
  ]'::jsonb,
  true,
  1
),
(
  'Student Enrollment Process',
  'Step-by-step guide to enrolling students, from application to program placement. Covers eligibility requirements, documentation, and funding sources.',
  'https://www.youtube.com/watch?v=example2',
  25,
  '[
    {"question": "What documents are required for WIOA enrollment?", "options": ["ID only", "ID and proof of eligibility", "No documents needed"], "correct": 1},
    {"question": "Who approves funding?", "options": ["Staff", "Workforce board", "Student"], "correct": 1}
  ]'::jsonb,
  true,
  2
),
(
  'FERPA Compliance Training',
  'Understanding student privacy rights under FERPA. Learn what information can be shared, with whom, and how to handle sensitive data.',
  'https://www.youtube.com/watch?v=example3',
  20,
  '[
    {"question": "Can you share student grades with parents without consent?", "options": ["Yes, always", "No, never", "Only if student is dependent"], "correct": 2},
    {"question": "How long must FERPA records be retained?", "options": ["1 year", "3 years", "5 years"], "correct": 2}
  ]'::jsonb,
  true,
  3
),
(
  'Customer Service Excellence',
  'Best practices for supporting students, handling difficult situations, and maintaining professional communication.',
  'https://www.youtube.com/watch?v=example4',
  18,
  '[
    {"question": "What is the first step when a student is upset?", "options": ["Defend yourself", "Listen actively", "Transfer to manager"], "correct": 1},
    {"question": "How quickly should we respond to student emails?", "options": ["Same day", "Within 24 hours", "Within 48 hours"], "correct": 1}
  ]'::jsonb,
  true,
  4
),
(
  'Using Our LMS Platform',
  'Navigate the learning management system, track student progress, and generate reports.',
  'https://www.youtube.com/watch?v=example5',
  22,
  '[
    {"question": "Where do you find student completion rates?", "options": ["Dashboard", "Reports section", "Student profile"], "correct": 1},
    {"question": "Can students access courses before enrollment is complete?", "options": ["Yes", "No", "Only preview"], "correct": 1}
  ]'::jsonb,
  false,
  5
),
(
  'VITA Tax Preparation Basics',
  'Introduction to VITA program, IRS certification requirements, and volunteer coordination.',
  'https://www.youtube.com/watch?v=example6',
  30,
  '[
    {"question": "What IRS certification is required for VITA volunteers?", "options": ["Basic", "Advanced", "Military"], "correct": 0},
    {"question": "What is the income limit for VITA services?", "options": ["$30,000", "$50,000", "$64,000"], "correct": 2}
  ]'::jsonb,
  false,
  6
),
(
  'Grant Reporting and Compliance',
  'Understanding grant requirements, tracking outcomes, and preparing reports for funders.',
  'https://www.youtube.com/watch?v=example7',
  28,
  '[
    {"question": "How often are WIOA reports due?", "options": ["Monthly", "Quarterly", "Annually"], "correct": 1},
    {"question": "What metrics must be tracked?", "options": ["Enrollment only", "Completion only", "Enrollment, completion, and placement"], "correct": 2}
  ]'::jsonb,
  false,
  7
),
(
  'Safety and Emergency Procedures',
  'Workplace safety protocols, emergency evacuation procedures, and incident reporting.',
  'https://www.youtube.com/watch?v=example8',
  12,
  '[
    {"question": "Where are the emergency exits?", "options": ["Front only", "Front and back", "Multiple locations"], "correct": 2},
    {"question": "Who do you report incidents to?", "options": ["Manager", "HR", "Both"], "correct": 2}
  ]'::jsonb,
  true,
  8
);

COMMENT ON TABLE training_modules IS 'Seeded with 8 training modules covering essential staff topics';


-- ========================================
-- 20251226_social_media_automation.sql
-- ========================================
-- Social Media Automation for Monetization
-- 3x daily posting to LinkedIn, Facebook, YouTube
-- Blog integration and analytics tracking

-- Social Media Accounts Table
CREATE TABLE IF NOT EXISTS social_media_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'facebook', 'youtube', 'instagram', 'twitter')),
  account_name TEXT,
  account_url TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  is_monetized BOOLEAN DEFAULT false,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(platform)
);

-- Social Media Posts Table
CREATE TABLE IF NOT EXISTS social_media_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  post_type TEXT DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'video', 'link', 'carousel')),
  title TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  thumbnail_url TEXT,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  posted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'posting', 'posted', 'failed', 'cancelled')),
  platform_post_id TEXT, -- ID from the platform after posting
  error_message TEXT,
  engagement JSONB DEFAULT '{"likes": 0, "shares": 0, "comments": 0, "views": 0}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Media Analytics Table
CREATE TABLE IF NOT EXISTS social_media_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  date DATE NOT NULL,
  followers_count INTEGER DEFAULT 0,
  followers_gained INTEGER DEFAULT 0,
  followers_lost INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(platform, date)
);

-- Social Media Content Queue Table
CREATE TABLE IF NOT EXISTS social_media_content_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('blog', 'program', 'success_story', 'tip', 'announcement')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_url TEXT,
  source_id UUID, -- blog_post_id, program_id, etc.
  priority INTEGER DEFAULT 5, -- 1-10, higher = more important
  used_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled ON social_media_posts(scheduled_for) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_media_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_blog ON social_media_posts(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_social_analytics_platform_date ON social_media_analytics(platform, date);
CREATE INDEX IF NOT EXISTS idx_content_queue_active ON social_media_content_queue(is_active, priority DESC);

-- Function: Auto-post blog to social media when published
CREATE OR REPLACE FUNCTION auto_post_blog_to_social()
RETURNS TRIGGER AS $$
DECLARE
  post_time TIMESTAMPTZ;
  platform_name TEXT;
BEGIN
  -- Only trigger when status changes to 'published'
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
    
    -- Add to content queue
    INSERT INTO social_media_content_queue (
      content_type,
      title,
      content,
      media_url,
      source_id,
      priority
    ) VALUES (
      'blog',
      NEW.title,
      COALESCE(NEW.excerpt, LEFT(NEW.content, 280)),
      NEW.featured_image,
      NEW.id,
      8 -- High priority for new blog posts
    );
    
    -- Schedule posts for each active platform
    post_time := NOW() + INTERVAL '1 hour';
    
    FOR platform_name IN 
      SELECT platform FROM social_media_accounts WHERE is_active = true
    LOOP
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        blog_post_id,
        scheduled_for,
        status
      ) VALUES (
        platform_name,
        'link',
        NEW.title,
        COALESCE(NEW.excerpt, LEFT(NEW.content, 280)) || ' Read more: https://elevateforhumanity.org/blog/' || NEW.slug,
        NEW.featured_image,
        NEW.id,
        post_time,
        'scheduled'
      );
      
      -- Stagger posts by 30 minutes per platform
      post_time := post_time + INTERVAL '30 minutes';
    END LOOP;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog publishing
DROP TRIGGER IF EXISTS blog_publish_social_trigger ON blog_posts;
CREATE TRIGGER blog_publish_social_trigger
  AFTER INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_post_blog_to_social();

-- Function: Schedule 3x daily posts
CREATE OR REPLACE FUNCTION schedule_daily_social_posts(target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(posts_scheduled INTEGER) AS $$
DECLARE
  morning_time TIMESTAMPTZ;
  afternoon_time TIMESTAMPTZ;
  evening_time TIMESTAMPTZ;
  platform_rec RECORD;
  content_rec RECORD;
  posts_count INTEGER := 0;
BEGIN
  -- Set posting times (EST)
  morning_time := target_date + INTERVAL '9 hours';
  afternoon_time := target_date + INTERVAL '13 hours';
  evening_time := target_date + INTERVAL '18 hours';
  
  -- For each active platform
  FOR platform_rec IN 
    SELECT platform FROM social_media_accounts WHERE is_active = true
  LOOP
    
    -- Morning post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        morning_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
    -- Afternoon post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true AND id != content_rec.id
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        afternoon_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
    -- Evening post
    SELECT * INTO content_rec
    FROM social_media_content_queue
    WHERE is_active = true AND id != content_rec.id
    ORDER BY priority DESC, used_count ASC, RANDOM()
    LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO social_media_posts (
        platform,
        post_type,
        title,
        content,
        media_url,
        scheduled_for,
        status
      ) VALUES (
        platform_rec.platform,
        CASE WHEN content_rec.media_url IS NOT NULL THEN 'image' ELSE 'text' END,
        content_rec.title,
        content_rec.content,
        content_rec.media_url,
        evening_time,
        'scheduled'
      );
      
      UPDATE social_media_content_queue
      SET used_count = used_count + 1, last_used_at = NOW()
      WHERE id = content_rec.id;
      
      posts_count := posts_count + 1;
    END IF;
    
  END LOOP;
  
  RETURN QUERY SELECT posts_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Update analytics
CREATE OR REPLACE FUNCTION update_social_analytics(
  p_platform TEXT,
  p_date DATE,
  p_followers INTEGER DEFAULT NULL,
  p_posts INTEGER DEFAULT NULL,
  p_likes INTEGER DEFAULT NULL,
  p_shares INTEGER DEFAULT NULL,
  p_comments INTEGER DEFAULT NULL,
  p_reach INTEGER DEFAULT NULL,
  p_impressions INTEGER DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO social_media_analytics (
    platform,
    date,
    followers_count,
    posts_count,
    likes_count,
    shares_count,
    comments_count,
    reach,
    impressions
  ) VALUES (
    p_platform,
    p_date,
    COALESCE(p_followers, 0),
    COALESCE(p_posts, 0),
    COALESCE(p_likes, 0),
    COALESCE(p_shares, 0),
    COALESCE(p_comments, 0),
    COALESCE(p_reach, 0),
    COALESCE(p_impressions, 0)
  )
  ON CONFLICT (platform, date) DO UPDATE SET
    followers_count = COALESCE(p_followers, social_media_analytics.followers_count),
    posts_count = COALESCE(p_posts, social_media_analytics.posts_count),
    likes_count = COALESCE(p_likes, social_media_analytics.likes_count),
    shares_count = COALESCE(p_shares, social_media_analytics.shares_count),
    comments_count = COALESCE(p_comments, social_media_analytics.comments_count),
    reach = COALESCE(p_reach, social_media_analytics.reach),
    impressions = COALESCE(p_impressions, social_media_analytics.impressions);
END;
$$ LANGUAGE plpgsql;

-- Seed initial social media accounts
INSERT INTO social_media_accounts (platform, account_name, account_url, is_active) VALUES
  ('linkedin', 'Elevate for Humanity', 'https://linkedin.com/company/elevateforhumanity', true),
  ('facebook', 'Elevate for Humanity', 'https://facebook.com/elevateforhumanity', true),
  ('youtube', 'Elevate for Humanity', 'https://youtube.com/@elevateforhumanity', true)
ON CONFLICT (platform) DO NOTHING;

-- Seed initial content queue with sample posts
INSERT INTO social_media_content_queue (content_type, title, content, priority) VALUES
  ('tip', 'Career Success Tip', 'Start your career transformation today. Our programs are designed to get you job-ready fast. #CareerDevelopment #Training', 7),
  ('announcement', 'Free Training Available', 'Did you know? Many of our programs are available with WIOA funding. Start learning at no cost to you. Apply today! #FreeTraining #WIOA', 8),
  ('tip', 'Skills That Matter', 'Employers are looking for skilled workers. Get certified in high-demand fields like healthcare, trades, and technology. #SkillsDevelopment', 6),
  ('success_story', 'Student Success', 'Our graduates are thriving in their new careers. Join them and transform your future. #SuccessStory #CareerChange', 7),
  ('announcement', 'Now Enrolling', 'New cohorts starting soon! Explore our programs and find the right path for you. #Enrollment #Training', 8)
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL ON social_media_accounts TO authenticated;
GRANT ALL ON social_media_posts TO authenticated;
GRANT ALL ON social_media_analytics TO authenticated;
GRANT ALL ON social_media_content_queue TO authenticated;

-- Comments
COMMENT ON TABLE social_media_accounts IS 'Social media platform accounts for automation';
COMMENT ON TABLE social_media_posts IS 'Scheduled and posted social media content';
COMMENT ON TABLE social_media_analytics IS 'Daily analytics for each platform';
COMMENT ON TABLE social_media_content_queue IS 'Content pool for automated posting';
COMMENT ON FUNCTION auto_post_blog_to_social() IS 'Automatically create social posts when blog is published';
COMMENT ON FUNCTION schedule_daily_social_posts(DATE) IS 'Schedule 3 posts per day per platform';
COMMENT ON FUNCTION update_social_analytics(TEXT, DATE, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER) IS 'Update daily analytics for a platform';


-- ========================================
-- 20251226_staff_training_system.sql
-- ========================================
-- Staff Training System
-- Tables for training modules and staff progress tracking

-- Training Modules Table
CREATE TABLE IF NOT EXISTS training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Training Progress Table
CREATE TABLE IF NOT EXISTS staff_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES training_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  certification_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_training_modules_required ON training_modules(required);
CREATE INDEX IF NOT EXISTS idx_training_modules_order ON training_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_user ON staff_training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_training_progress_module ON staff_training_progress(module_id);

-- RLS
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_training_progress ENABLE ROW LEVEL SECURITY;

-- Anyone can view training modules
CREATE POLICY "Anyone can view training modules"
  ON training_modules FOR SELECT
  USING (true);

-- Admin can manage training modules
CREATE POLICY "Admin can manage training modules"
  ON training_modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own progress
CREATE POLICY "Users can view own training progress"
  ON staff_training_progress FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own progress
CREATE POLICY "Users can insert own training progress"
  ON staff_training_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can update their own progress
CREATE POLICY "Users can update own training progress"
  ON staff_training_progress FOR UPDATE
  USING (user_id = auth.uid());

-- Admin can view all progress
CREATE POLICY "Admin can view all training progress"
  ON staff_training_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE training_modules IS 'Training modules for staff';
COMMENT ON TABLE staff_training_progress IS 'Staff progress through training modules';


-- ========================================
-- 20251226_tax_documents_system.sql
-- ========================================
-- Tax Documents System
-- Secure document upload and management for tax filing

-- Tax Documents Table
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  virus_scan_status TEXT CHECK (virus_scan_status IN ('pending', 'clean', 'infected', 'failed')) DEFAULT 'pending',
  encrypted BOOLEAN DEFAULT true,
  document_category TEXT CHECK (document_category IN (
    'w2',
    '1099',
    'id_verification',
    'social_security_card',
    'bank_statement',
    'other'
  )),
  tax_year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tax_documents_user ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_scan_status ON tax_documents(virus_scan_status);
CREATE INDEX IF NOT EXISTS idx_tax_documents_category ON tax_documents(document_category);
CREATE INDEX IF NOT EXISTS idx_tax_documents_tax_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_upload_date ON tax_documents(upload_date);

-- RLS
ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

-- Users can view their own documents
CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own documents
CREATE POLICY "Users can insert own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own documents
CREATE POLICY "Users can delete own tax documents"
  ON tax_documents FOR DELETE
  USING (user_id = auth.uid());

-- Admin and tax preparers can view all documents
CREATE POLICY "Admin can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_preparer')
    )
  );

-- Admin can manage all documents
CREATE POLICY "Admin can manage tax documents"
  ON tax_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin')
    )
  );

COMMENT ON TABLE tax_documents IS 'Secure tax document storage with virus scanning';


-- ========================================
-- 20251226_volunteer_applications_system.sql
-- ========================================
-- Volunteer Applications System
-- VITA volunteer application and background check management

-- Volunteer Applications Table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  availability JSONB DEFAULT '[]'::jsonb,
  experience TEXT,
  certifications TEXT[],
  background_check_status TEXT CHECK (background_check_status IN (
    'not_started',
    'pending',
    'in_progress',
    'approved',
    'rejected',
    'expired'
  )) DEFAULT 'not_started',
  background_check_date TIMESTAMPTZ,
  background_check_expiry TIMESTAMPTZ,
  approval_status TEXT CHECK (approval_status IN (
    'pending',
    'approved',
    'rejected',
    'waitlisted'
  )) DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  irs_certification_number TEXT,
  irs_certification_expiry TIMESTAMPTZ,
  training_completed BOOLEAN DEFAULT false,
  training_completed_at TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(approval_status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_background ON volunteer_applications(background_check_status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_user ON volunteer_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created ON volunteer_applications(created_at);

-- RLS
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own volunteer applications"
  ON volunteer_applications FOR SELECT
  USING (
    user_id = auth.uid()
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Anyone can submit applications
CREATE POLICY "Anyone can submit volunteer applications"
  ON volunteer_applications FOR INSERT
  WITH CHECK (true);

-- Users can update their own pending applications
CREATE POLICY "Users can update own pending applications"
  ON volunteer_applications FOR UPDATE
  USING (
    user_id = auth.uid()
    AND approval_status = 'pending'
  );

-- Admin can view all applications
CREATE POLICY "Admin can view all volunteer applications"
  ON volunteer_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_coordinator')
    )
  );

-- Admin can manage all applications
CREATE POLICY "Admin can manage volunteer applications"
  ON volunteer_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'super_admin', 'tax_coordinator')
    )
  );

COMMENT ON TABLE volunteer_applications IS 'VITA volunteer applications with background checks';


