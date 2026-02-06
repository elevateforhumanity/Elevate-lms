'use client';

import { useState } from 'react';
import type { Workspace } from '../lib/studio-api';

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  onSelect: (workspaceId: string) => void;
  onCreate: (name: string, description?: string, repoUrl?: string) => Promise<Workspace | null>;
  onDelete?: (workspaceId: string) => void;
}

export function WorkspaceSelector({
  workspaces,
  currentWorkspace,
  onSelect,
  onCreate,
  onDelete,
}: WorkspaceSelectorProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    
    setCreating(true);
    const workspace = await onCreate(
      newName.trim(),
      newDescription.trim() || undefined,
      newRepoUrl.trim() || undefined
    );
    
    if (workspace) {
      setShowCreate(false);
      setNewName('');
      setNewDescription('');
      setNewRepoUrl('');
    }
    setCreating(false);
  };

  return (
    <div style={{ padding: '8px' }}>
      {/* Current workspace indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
        padding: '8px',
        background: '#2d2d2d',
        borderRadius: '4px',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>
            WORKSPACE
          </div>
          <div style={{ fontWeight: 500 }}>
            {currentWorkspace?.name || 'No workspace selected'}
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            background: '#0e639c',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          + New
        </button>
      </div>

      {/* Workspace list */}
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {workspaces.map(ws => (
          <div
            key={ws.id}
            onClick={() => onSelect(ws.id)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              background: ws.id === currentWorkspace?.id ? '#094771' : 'transparent',
              borderRadius: '4px',
              marginBottom: '2px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: ws.id === currentWorkspace?.id ? 600 : 400 }}>
                {ws.name}
              </div>
              {ws.description && (
                <div style={{ fontSize: '11px', color: '#888' }}>
                  {ws.description}
                </div>
              )}
              {ws.repoUrl && (
                <div style={{ fontSize: '10px', color: '#569cd6' }}>
                  {ws.repoUrl.replace('https://github.com/', '')}
                </div>
              )}
            </div>
            {onDelete && ws.id !== currentWorkspace?.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete workspace "${ws.name}"?`)) {
                    onDelete(ws.id);
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        {workspaces.length === 0 && (
          <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
            No workspaces yet. Create one to get started.
          </div>
        )}
      </div>

      {/* Create workspace modal */}
      {showCreate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#252526',
            padding: '24px',
            borderRadius: '8px',
            width: '400px',
            maxWidth: '90vw',
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Create Workspace</h3>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="my-project"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#3c3c3c',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: 'white',
                }}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                Description
              </label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Optional description"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#3c3c3c',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: 'white',
                }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                Clone from GitHub (optional)
              </label>
              <input
                type="text"
                value={newRepoUrl}
                onChange={(e) => setNewRepoUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#3c3c3c',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: 'white',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreate(false)}
                style={{
                  padding: '8px 16px',
                  background: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim() || creating}
                style={{
                  padding: '8px 16px',
                  background: '#0e639c',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  cursor: newName.trim() && !creating ? 'pointer' : 'not-allowed',
                  opacity: newName.trim() && !creating ? 1 : 0.5,
                }}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
