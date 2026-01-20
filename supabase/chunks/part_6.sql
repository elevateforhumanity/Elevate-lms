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


-- 20251226_tax_documents_system.sql
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


-- 20251226_volunteer_applications_system.sql
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


