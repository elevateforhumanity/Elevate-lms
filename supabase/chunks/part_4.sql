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


-- 20251226_seed_training_modules.sql
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


-- 20251226_social_media_automation.sql
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
