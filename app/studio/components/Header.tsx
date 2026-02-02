'use client';

import type { Branch, Repo } from '../types';

interface HeaderProps {
  repos: Repo[];
  currentRepo: string;
  branches: Branch[];
  currentBranch: string;
  status: string;
  loading: boolean;
  onRepoChange: (repo: string) => void;
  onBranchChange: (branch: string) => void;
  onRefresh: () => void;
  onNewFile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export function Header({
  repos,
  currentRepo,
  branches,
  currentBranch,
  status,
  loading,
  onRepoChange,
  onBranchChange,
  onRefresh,
  onNewFile,
  onSettings,
  onLogout,
}: HeaderProps) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8, 
      padding: '8px 12px', 
      background: '#252526', 
      borderBottom: '1px solid #3c3c3c',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontWeight: 600, marginRight: 8 }}>Dev Studio</span>
      
      {/* Repo selector */}
      <select
        value={currentRepo}
        onChange={e => onRepoChange(e.target.value)}
        style={{ 
          padding: '6px 10px', 
          background: '#3c3c3c', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff',
          maxWidth: 200,
        }}
      >
        {repos.map(r => (
          <option key={r.id} value={r.repo_full_name}>{r.repo_full_name}</option>
        ))}
        <option value="__add__">+ Add repository...</option>
      </select>

      {/* Branch selector */}
      <select
        value={currentBranch}
        onChange={e => onBranchChange(e.target.value)}
        style={{ 
          padding: '6px 10px', 
          background: '#3c3c3c', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff',
          maxWidth: 150,
        }}
      >
        {branches.map(b => (
          <option key={b.name} value={b.name}>{b.name}</option>
        ))}
      </select>

      {/* Status */}
      <span style={{ 
        color: '#888', 
        fontSize: 12, 
        flex: 1, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        minWidth: 0,
      }}>
        {status}
      </span>

      {/* Actions */}
      <button 
        onClick={onRefresh} 
        disabled={loading}
        style={{ 
          padding: '6px 12px', 
          background: '#0e639c', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff', 
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? '...' : '↻'}
      </button>
      
      <button 
        onClick={onNewFile}
        style={{ 
          padding: '6px 12px', 
          background: '#238636', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff', 
          cursor: 'pointer',
        }}
      >
        + New
      </button>
      
      <button 
        onClick={onSettings}
        style={{ 
          padding: '6px 12px', 
          background: '#3c3c3c', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff', 
          cursor: 'pointer',
        }}
      >
        ⚙
      </button>
      
      <button 
        onClick={onLogout}
        style={{ 
          padding: '6px 12px', 
          background: '#3c3c3c', 
          border: 'none', 
          borderRadius: 4, 
          color: '#fff', 
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}
