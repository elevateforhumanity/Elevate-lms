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


-- 20251226_seed_processes.sql
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


-- 20251226_seed_qa_checklists.sql
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
