-- D1 Schema for Studio IDE

CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  repo_url TEXT,
  repo_branch TEXT DEFAULT 'main',
  settings TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_workspaces_user ON workspaces(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_updated ON workspaces(updated_at DESC);

-- File metadata (actual content in R2)
CREATE TABLE IF NOT EXISTS file_metadata (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  path TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  mime_type TEXT,
  checksum TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  UNIQUE(workspace_id, path)
);

CREATE INDEX IF NOT EXISTS idx_files_workspace ON file_metadata(workspace_id);

-- Terminal command history
CREATE TABLE IF NOT EXISTS terminal_history (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  command TEXT NOT NULL,
  exit_code INTEGER,
  duration_ms INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_terminal_workspace ON terminal_history(workspace_id);
CREATE INDEX IF NOT EXISTS idx_terminal_created ON terminal_history(created_at DESC);
