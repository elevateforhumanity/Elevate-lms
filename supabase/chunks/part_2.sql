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


-- 20251226_process_documentation_system.sql
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


-- 20251226_qa_checklist_system.sql
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


-- 20251226_reviews_system.sql
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
