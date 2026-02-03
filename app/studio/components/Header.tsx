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
      gap: 12, 
      padding: '10px 16px', 
      background: 'linear-gradient(90deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      borderBottom: '1px solid #30363d',
      flexWrap: 'wrap',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
      {/* Logo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 10,
        marginRight: 8,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        }}>
          ⚡
        </div>
        <span style={{ 
          fontWeight: 700, 
          fontSize: 16,
          background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}>
          Elevate Studio
        </span>
      </div>
      
      {/* Repo selector */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6,
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        border: '1px solid #30363d',
      }}>
        <span style={{ color: '#8b949e', fontSize: 14 }}>📁</span>
        <select
          value={currentRepo}
          onChange={e => onRepoChange(e.target.value)}
          style={{ 
            padding: '4px 8px', 
            background: 'transparent', 
            border: 'none', 
            color: '#e6edf3',
            fontSize: 13,
            fontWeight: 500,
            maxWidth: 180,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {repos.map(r => (
            <option key={r.id} value={r.repo_full_name} style={{ background: '#161b22' }}>
              {r.repo_full_name.split('/')[1] || r.repo_full_name}
            </option>
          ))}
          <option value="__add__" style={{ background: '#161b22' }}>+ Add repository...</option>
        </select>
      </div>

      {/* Branch selector */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6,
        padding: '6px 12px',
        background: 'linear-gradient(135deg, rgba(35, 134, 54, 0.2) 0%, rgba(46, 160, 67, 0.1) 100%)',
        borderRadius: 8,
        border: '1px solid rgba(35, 134, 54, 0.3)',
      }}>
        <span style={{ color: '#3fb950', fontSize: 14 }}>🌿</span>
        <select
          value={currentBranch}
          onChange={e => onBranchChange(e.target.value)}
          style={{ 
            padding: '4px 8px', 
            background: 'transparent', 
            border: 'none', 
            color: '#3fb950',
            fontSize: 13,
            fontWeight: 600,
            maxWidth: 140,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {branches.map(b => (
            <option key={b.name} value={b.name} style={{ background: '#161b22', color: '#e6edf3' }}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0,
      }}>
        {loading && (
          <span style={{ 
            color: '#58a6ff',
            animation: 'spin 1s linear infinite',
            fontSize: 14,
          }}>
            ⟳
          </span>
        )}
        <span style={{ 
          color: status.includes('Error') || status.includes('failed') 
            ? '#f85149' 
            : status.includes('success') || status.includes('Saved') || status.includes('complete')
            ? '#3fb950'
            : '#8b949e', 
          fontSize: 12, 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
        }}>
          {status}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button 
          onClick={onRefresh} 
          disabled={loading}
          style={{ 
            padding: '8px 14px', 
            background: 'linear-gradient(135deg, #1f6feb 0%, #388bfd 100%)',
            border: 'none', 
            borderRadius: 8, 
            color: '#fff', 
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            fontSize: 13,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 2px 8px rgba(31, 111, 235, 0.3)',
            transition: 'all 0.15s ease',
          }}
        >
          <span style={{ fontSize: 14 }}>↻</span>
          Sync
        </button>
        
        <button 
          onClick={onNewFile}
          style={{ 
            padding: '8px 14px', 
            background: 'linear-gradient(135deg, #238636 0%, #2ea043 100%)',
            border: 'none', 
            borderRadius: 8, 
            color: '#fff', 
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 2px 8px rgba(35, 134, 54, 0.3)',
            transition: 'all 0.15s ease',
          }}
        >
          <span style={{ fontSize: 14 }}>+</span>
          New
        </button>
        
        <button 
          onClick={onSettings}
          style={{ 
            padding: '8px 12px', 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid #30363d', 
            borderRadius: 8, 
            color: '#8b949e', 
            cursor: 'pointer',
            fontSize: 16,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
            (e.target as HTMLElement).style.color = '#e6edf3';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
            (e.target as HTMLElement).style.color = '#8b949e';
          }}
        >
          ⚙
        </button>
        
        <button 
          onClick={onLogout}
          style={{ 
            padding: '8px 14px', 
            background: 'rgba(248, 81, 73, 0.1)',
            border: '1px solid rgba(248, 81, 73, 0.3)', 
            borderRadius: 8, 
            color: '#f85149', 
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(248, 81, 73, 0.2)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'rgba(248, 81, 73, 0.1)';
          }}
        >
          Logout
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
