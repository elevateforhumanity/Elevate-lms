'use client';

import { useState } from 'react';

interface RefactorModalProps {
  initialName: string;
  onRefactor: (oldName: string, newName: string, scope: 'file' | 'project') => Promise<void>;
  onClose: () => void;
}

export function RefactorModal({ initialName, onRefactor, onClose }: RefactorModalProps) {
  const [newName, setNewName] = useState(initialName);
  const [scope, setScope] = useState<'file' | 'project'>('file');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<{ path: string; changes: number }[]>([]);

  const handleRefactor = async () => {
    if (!newName.trim() || newName === initialName) return;
    
    setLoading(true);
    try {
      await onRefactor(initialName, newName, scope);
      onClose();
    } catch (error) {
      console.error('Refactor failed:', error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#252526',
          borderRadius: 8,
          width: 450,
          maxWidth: '90vw',
          padding: 24,
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Rename Symbol</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#888' }}>
            Current name
          </label>
          <input
            value={initialName}
            disabled
            style={{
              width: '100%',
              padding: 10,
              background: '#1e1e1e',
              border: '1px solid #3c3c3c',
              borderRadius: 4,
              color: '#888',
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#888' }}>
            New name
          </label>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRefactor()}
            autoFocus
            style={{
              width: '100%',
              padding: 10,
              background: '#3c3c3c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#888' }}>
            Scope
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="radio"
                checked={scope === 'file'}
                onChange={() => setScope('file')}
              />
              <span>Current file</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="radio"
                checked={scope === 'project'}
                onChange={() => setScope('project')}
              />
              <span>Entire project</span>
            </label>
          </div>
        </div>

        {preview.length > 0 && (
          <div style={{ 
            marginBottom: 16, 
            padding: 12, 
            background: '#1e1e1e', 
            borderRadius: 4,
            maxHeight: 150,
            overflow: 'auto',
          }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
              Files to be changed:
            </div>
            {preview.map(p => (
              <div key={p.path} style={{ fontSize: 13, padding: '2px 0' }}>
                {p.path} <span style={{ color: '#888' }}>({p.changes} changes)</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#3c3c3c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleRefactor}
            disabled={loading || !newName.trim() || newName === initialName}
            style={{
              padding: '10px 20px',
              background: loading ? '#3c3c3c' : '#0e639c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
            }}
          >
            {loading ? 'Refactoring...' : 'Rename'}
          </button>
        </div>
      </div>
    </div>
  );
}
