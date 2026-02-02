'use client';

import { useState } from 'react';
import type { ServerInfo } from '../hooks/useWebContainer';

interface PreviewPanelProps {
  servers: ServerInfo[];
  onRefresh?: () => void;
}

export function PreviewPanel({ servers, onRefresh }: PreviewPanelProps) {
  const [activeServer, setActiveServer] = useState<number | null>(
    servers.find(s => s.status === 'running')?.port || null
  );
  const [customUrl, setCustomUrl] = useState('');

  const runningServers = servers.filter(s => s.status === 'running');
  const currentServer = runningServers.find(s => s.port === activeServer);

  if (runningServers.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#1e1e1e',
        color: '#888',
        padding: 20,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🖥️</div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>No Preview Available</div>
        <div style={{ fontSize: 13 }}>
          Run <code style={{ background: '#3c3c3c', padding: '2px 6px', borderRadius: 4 }}>npm run dev</code> in the terminal to start a dev server
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#1e1e1e',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderBottom: '1px solid #3c3c3c',
        background: '#252526',
      }}>
        {/* Server tabs */}
        {runningServers.map(server => (
          <button
            key={server.port}
            onClick={() => setActiveServer(server.port)}
            style={{
              padding: '4px 12px',
              background: activeServer === server.port ? '#0e639c' : '#3c3c3c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#7ee787',
            }} />
            :{server.port}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* URL bar */}
        <input
          value={customUrl || currentServer?.url || ''}
          onChange={e => setCustomUrl(e.target.value)}
          placeholder="URL"
          style={{
            width: 200,
            padding: '4px 8px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            fontSize: 12,
          }}
        />

        {/* Actions */}
        <button
          onClick={onRefresh}
          style={{
            padding: '4px 8px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          ↻
        </button>
        <a
          href={currentServer?.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '4px 8px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            textDecoration: 'none',
            fontSize: 12,
          }}
        >
          ↗
        </a>
      </div>

      {/* Preview iframe */}
      <div style={{ flex: 1, position: 'relative' }}>
        {currentServer && (
          <iframe
            src={customUrl || currentServer.url}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#fff',
            }}
            title="Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        )}
      </div>
    </div>
  );
}
