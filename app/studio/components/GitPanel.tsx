'use client';

import { useState, useEffect } from 'react';
import type { Commit, OpenFile, Branch } from '../types';

interface GitPanelProps {
  commits: Commit[];
  branches: Branch[];
  currentBranch: string;
  modifiedFiles: OpenFile[];
  token: string;
  repo: string;
  onBranchChange: (branch: string) => void;
  onCreateBranch: (name: string) => void;
  onSaveFile: (path: string, message: string) => void;
  onRevertFile: (path: string) => void;
  onLoadHistory: (path?: string) => void;
  onRefresh: () => void;
  onViewAtCommit?: (sha: string, path: string) => void;
  activeFile?: string;
}

export function GitPanel({
  commits,
  branches,
  currentBranch,
  modifiedFiles,
  token,
  repo,
  onBranchChange,
  onCreateBranch,
  onSaveFile,
  onRevertFile,
  onLoadHistory,
  onRefresh,
  onViewAtCommit,
  activeFile,
}: GitPanelProps) {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await onRefresh();
    setSyncing(false);
  };
  const [tab, setTab] = useState<'changes' | 'history' | 'branches'>('changes');
  const [commitMessage, setCommitMessage] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [showNewBranch, setShowNewBranch] = useState(false);
  const [showMerge, setShowMerge] = useState(false);
  const [mergeBranch, setMergeBranch] = useState('');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [diff, setDiff] = useState<string>('');

  const loadDiff = async (path: string) => {
    setSelectedFile(path);
    try {
      const res = await fetch(
        `/api/github/diff?repo=${repo}&path=${encodeURIComponent(path)}&base=HEAD~1&head=HEAD`,
        { headers: { 'x-gh-token': token } }
      );
      const data = await res.json();
      const file = data.files?.find((f: any) => f.filename === path);
      setDiff(file?.patch || 'No changes');
    } catch {
      setDiff('Error loading diff');
    }
  };

  const handleCommit = () => {
    if (!commitMessage.trim()) return;
    modifiedFiles.forEach(f => onSaveFile(f.path, commitMessage));
    setCommitMessage('');
  };

  const handleCreateBranch = () => {
    if (!newBranchName.trim()) return;
    onCreateBranch(newBranchName);
    setNewBranchName('');
    setShowNewBranch(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sync button */}
      <div style={{ padding: 8, borderBottom: '1px solid #3c3c3c', display: 'flex', gap: 8 }}>
        <button
          onClick={handleSync}
          disabled={syncing}
          style={{
            flex: 1,
            padding: 8,
            background: '#0e639c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: syncing ? 'not-allowed' : 'pointer',
            fontSize: 13,
            opacity: syncing ? 0.6 : 1,
          }}
        >
          {syncing ? 'Syncing...' : '↻ Sync with Remote'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #3c3c3c' }}>
        {(['changes', 'history', 'branches'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); if (t === 'history') onLoadHistory(); }}
            style={{
              flex: 1,
              padding: 8,
              background: tab === t ? '#1e1e1e' : '#252526',
              border: 'none',
              borderBottom: tab === t ? '2px solid #0e639c' : '2px solid transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 12,
              textTransform: 'capitalize',
            }}
          >
            {t}
            {t === 'changes' && modifiedFiles.length > 0 && (
              <span style={{ marginLeft: 4, background: '#e2c08d', color: '#000', borderRadius: 10, padding: '0 6px', fontSize: 10 }}>
                {modifiedFiles.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
        {tab === 'changes' && (
          <div>
            {modifiedFiles.length === 0 ? (
              <div style={{ color: '#888', fontSize: 13, padding: 12 }}>No changes</div>
            ) : (
              <>
                <div style={{ marginBottom: 12 }}>
                  {modifiedFiles.map(f => (
                    <div
                      key={f.path}
                      style={{
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 13,
                        background: selectedFile === f.path ? '#094771' : 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={() => loadDiff(f.path)}
                    >
                      <span style={{ color: '#e2c08d' }}>M</span>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.path}
                      </span>
                      <button
                        onClick={e => { e.stopPropagation(); onRevertFile(f.path); }}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 11 }}
                      >
                        Revert
                      </button>
                    </div>
                  ))}
                </div>

                {diff && (
                  <pre style={{
                    background: '#1e1e1e',
                    padding: 8,
                    borderRadius: 4,
                    fontSize: 11,
                    overflow: 'auto',
                    maxHeight: 200,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {diff}
                  </pre>
                )}

                <div style={{ marginTop: 12 }}>
                  <textarea
                    value={commitMessage}
                    onChange={e => setCommitMessage(e.target.value)}
                    placeholder="Commit message..."
                    style={{
                      width: '100%',
                      padding: 8,
                      background: '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: 13,
                      resize: 'vertical',
                      minHeight: 60,
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    onClick={handleCommit}
                    disabled={!commitMessage.trim()}
                    style={{
                      width: '100%',
                      marginTop: 8,
                      padding: 10,
                      background: commitMessage.trim() ? '#238636' : '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      cursor: commitMessage.trim() ? 'pointer' : 'not-allowed',
                      fontSize: 13,
                    }}
                  >
                    Commit All ({modifiedFiles.length} files)
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div>
            {commits.length === 0 ? (
              <div style={{ color: '#888', fontSize: 13, padding: 12 }}>No commits</div>
            ) : (
              commits.map(c => (
                <div
                  key={c.sha}
                  style={{
                    padding: 8,
                    borderBottom: '1px solid #3c3c3c',
                    fontSize: 13,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {c.author.avatar_url && (
                      <img
                        src={c.author.avatar_url}
                        alt=""
                        style={{ width: 20, height: 20, borderRadius: '50%' }}
                      />
                    )}
                    <span style={{ fontWeight: 500 }}>{c.author.name || c.author.login}</span>
                    <span style={{ color: '#888', fontSize: 11 }}>
                      {new Date(c.author.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ color: '#ccc' }}>{c.message.split('\n')[0]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ color: '#888', fontSize: 11 }}>{c.sha.slice(0, 7)}</span>
                    {activeFile && onViewAtCommit && (
                      <button
                        onClick={() => onViewAtCommit(c.sha, activeFile)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#58a6ff',
                          cursor: 'pointer',
                          fontSize: 11,
                          padding: 0,
                        }}
                      >
                        View file at this commit
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'branches' && (
          <div>
            <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
              {showNewBranch ? (
                <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                  <input
                    value={newBranchName}
                    onChange={e => setNewBranchName(e.target.value)}
                    placeholder="branch-name"
                    style={{
                      flex: 1,
                      padding: 8,
                      background: '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: 13,
                    }}
                  />
                  <button
                    onClick={handleCreateBranch}
                    style={{ padding: '8px 12px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowNewBranch(false)}
                    style={{ padding: '8px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                </div>
              ) : showMerge ? (
                <div style={{ display: 'flex', gap: 8, flex: 1, flexDirection: 'column' }}>
                  <div style={{ fontSize: 12, color: '#888' }}>Merge into {currentBranch}:</div>
                  <select
                    value={mergeBranch}
                    onChange={e => setMergeBranch(e.target.value)}
                    style={{
                      padding: 8,
                      background: '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    <option value="">Select branch...</option>
                    {branches.filter(b => b.name !== currentBranch).map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => {
                        if (mergeBranch) {
                          alert(`Merge ${mergeBranch} into ${currentBranch} - This requires GitHub PR. Create a PR instead.`);
                        }
                        setShowMerge(false);
                        setMergeBranch('');
                      }}
                      disabled={!mergeBranch}
                      style={{ flex: 1, padding: '8px 12px', background: mergeBranch ? '#8957e5' : '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: mergeBranch ? 'pointer' : 'not-allowed' }}
                    >
                      Merge
                    </button>
                    <button
                      onClick={() => { setShowMerge(false); setMergeBranch(''); }}
                      style={{ padding: '8px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowNewBranch(true)}
                    style={{
                      flex: 1,
                      padding: 8,
                      background: '#238636',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    + New
                  </button>
                  <button
                    onClick={() => setShowMerge(true)}
                    style={{
                      flex: 1,
                      padding: 8,
                      background: '#8957e5',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    Merge
                  </button>
                </>
              )}
            </div>

            {branches.map(b => (
              <div
                key={b.name}
                onClick={() => onBranchChange(b.name)}
                style={{
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  background: b.name === currentBranch ? '#094771' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: 4,
                }}
              >
                {b.name === currentBranch && <span>✓</span>}
                <span style={{ flex: 1 }}>{b.name}</span>
                {b.protected && <span style={{ color: '#888', fontSize: 11 }}>protected</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
