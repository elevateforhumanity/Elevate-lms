export interface FileNode {
  path: string;
  sha: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export interface OpenFile {
  path: string;
  content: string;
  originalContent: string;
  sha: string;
  language: string;
  modified: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Branch {
  name: string;
  commit: { sha: string };
  protected: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
    login?: string;
    avatar_url?: string;
  };
  url: string;
}

export interface Settings {
  theme: 'dark' | 'light';
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  autoSave: boolean;
}

export interface Comment {
  id: string;
  file_path: string;
  line_start: number;
  line_end?: number;
  content: string;
  resolved: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  file_path: string;
  line_number?: number;
  label?: string;
}

export interface RecentFile {
  file_path: string;
  branch: string;
  accessed_at: string;
  access_count: number;
}

export interface Repo {
  id: string;
  repo_full_name: string;
  default_branch: string;
  is_favorite: boolean;
  last_accessed_at: string;
}

export type Panel = 'files' | 'editor' | 'ai' | 'git';
