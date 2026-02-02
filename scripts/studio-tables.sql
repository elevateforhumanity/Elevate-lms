-- Dev Studio Tables

-- User settings (theme, font size, etc.)
CREATE TABLE IF NOT EXISTS studio_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  theme VARCHAR(20) DEFAULT 'dark',
  font_size INTEGER DEFAULT 14,
  word_wrap BOOLEAN DEFAULT true,
  minimap BOOLEAN DEFAULT false,
  auto_save BOOLEAN DEFAULT false,
  keyboard_shortcuts JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Connected repositories
CREATE TABLE IF NOT EXISTS studio_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_full_name VARCHAR(255) NOT NULL,
  default_branch VARCHAR(100) DEFAULT 'main',
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, repo_full_name)
);

-- Session history (open files, active branch, etc.)
CREATE TABLE IF NOT EXISTS studio_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  branch VARCHAR(100),
  open_files JSONB DEFAULT '[]',
  active_file VARCHAR(500),
  cursor_positions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, repo_id)
);

-- Recent files
CREATE TABLE IF NOT EXISTS studio_recent_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  file_path VARCHAR(500) NOT NULL,
  branch VARCHAR(100),
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  access_count INTEGER DEFAULT 1,
  UNIQUE(user_id, repo_id, file_path, branch)
);

-- Favorite/bookmarked files
CREATE TABLE IF NOT EXISTS studio_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  file_path VARCHAR(500) NOT NULL,
  line_number INTEGER,
  label VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, repo_id, file_path, line_number)
);

-- Code comments/annotations
CREATE TABLE IF NOT EXISTS studio_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  file_path VARCHAR(500) NOT NULL,
  branch VARCHAR(100),
  line_start INTEGER NOT NULL,
  line_end INTEGER,
  content TEXT NOT NULL,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI chat history
CREATE TABLE IF NOT EXISTS studio_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  session_id UUID,
  messages JSONB NOT NULL DEFAULT '[]',
  file_context VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commit history cache (for quick access)
CREATE TABLE IF NOT EXISTS studio_commit_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  branch VARCHAR(100),
  commits JSONB NOT NULL DEFAULT '[]',
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(repo_id, branch)
);

-- Share links
CREATE TABLE IF NOT EXISTS studio_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  file_path VARCHAR(500) NOT NULL,
  branch VARCHAR(100),
  line_start INTEGER,
  line_end INTEGER,
  share_code VARCHAR(20) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deployments
CREATE TABLE IF NOT EXISTS studio_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider VARCHAR(50) NOT NULL,
  repo VARCHAR(255) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  deployment_id VARCHAR(255) NOT NULL,
  url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PR tracking (local state)
CREATE TABLE IF NOT EXISTS studio_pr_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  pr_number INTEGER NOT NULL,
  last_viewed_at TIMESTAMPTZ,
  is_watching BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, repo_id, pr_number)
);

-- Workflow run tracking
CREATE TABLE IF NOT EXISTS studio_workflow_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  repo_id UUID REFERENCES studio_repos(id) ON DELETE CASCADE,
  workflow_id INTEGER NOT NULL,
  last_run_id INTEGER,
  last_status VARCHAR(50),
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, repo_id, workflow_id)
);

-- Deploy tokens (encrypted)
CREATE TABLE IF NOT EXISTS studio_deploy_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider VARCHAR(50) NOT NULL,
  encrypted_token TEXT NOT NULL,
  project_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_studio_recent_user ON studio_recent_files(user_id, accessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_favorites_user ON studio_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_studio_comments_file ON studio_comments(repo_id, file_path, branch);
CREATE INDEX IF NOT EXISTS idx_studio_shares_code ON studio_shares(share_code);
CREATE INDEX IF NOT EXISTS idx_studio_deployments_user ON studio_deployments(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_pr_tracking_user ON studio_pr_tracking(user_id, repo_id);
