'use client';

import { useState, useEffect } from 'react';

interface Port {
  port: number;
  label?: string;
  url?: string;
  status: 'detecting' | 'open' | 'closed';
}

interface PortForwardingProps {
  detectedPorts: number[];
  baseUrl?: string;
}

export function PortForwarding({ detectedPorts, baseUrl }: PortForwardingProps) {
  const [ports, setPorts] = useState<Port[]>([]);
  const [customPort, setCustomPort] = useState('');

  // Update ports when detected
  useEffect(() => {
    setPorts(prev => {
      const existing = new Set(prev.map(p => p.port));
      const newPorts = detectedPorts
        .filter(p => !existing.has(p))
        .map(port => ({
          port,
          status: 'open' as const,
          url: generateUrl(port),
        }));
      return [...prev, ...newPorts];
    });
  }, [detectedPorts]);

  const generateUrl = (port: number) => {
    if (baseUrl) {
      // Transform base URL to include port (Gitpod style)
      // e.g., https://3000-workspace.gitpod.io -> https://8080-workspace.gitpod.io
      return baseUrl.replace(/\d+(?=-)/, port.toString());
    }
    return `http://localhost:${port}`;
  };

  const addPort = () => {
    const port = parseInt(customPort);
    if (port && port > 0 && port < 65536) {
      setPorts(prev => {
        if (prev.some(p => p.port === port)) return prev;
        return [...prev, { port, status: 'open', url: generateUrl(port) }];
      });
      setCustomPort('');
    }
  };

  const removePort = (port: number) => {
    setPorts(prev => prev.filter(p => p.port !== port));
  };

  const checkPort = async (port: number) => {
    setPorts(prev => prev.map(p => 
      p.port === port ? { ...p, status: 'detecting' } : p
    ));

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      
      await fetch(`http://localhost:${port}`, { 
        mode: 'no-cors',
        signal: controller.signal,
      });
      clearTimeout(timeout);
      
      setPorts(prev => prev.map(p => 
        p.port === port ? { ...p, status: 'open' } : p
      ));
    } catch {
      setPorts(prev => prev.map(p => 
        p.port === port ? { ...p, status: 'closed' } : p
      ));
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        marginBottom: 12,
        fontSize: 13,
        fontWeight: 500,
      }}>
        Ports
      </div>

      {/* Add custom port */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="number"
          value={customPort}
          onChange={e => setCustomPort(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addPort()}
          placeholder="Port number"
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
          onClick={addPort}
          style={{
            padding: '8px 12px',
            background: '#238636',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Add
        </button>
      </div>

      {/* Port list */}
      {ports.length === 0 ? (
        <div style={{ color: '#888', fontSize: 13 }}>
          No ports detected. Run a server in the terminal.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ports.map(p => (
            <div
              key={p.port}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 8,
                background: '#252526',
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: p.status === 'open' ? '#7ee787' : p.status === 'detecting' ? '#e2c08d' : '#f85149',
              }} />
              <span style={{ fontWeight: 500 }}>{p.port}</span>
              {p.label && <span style={{ color: '#888' }}>({p.label})</span>}
              <div style={{ flex: 1 }} />
              <button
                onClick={() => checkPort(p.port)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                Check
              </button>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#58a6ff',
                    textDecoration: 'none',
                    fontSize: 11,
                  }}
                >
                  Open
                </a>
              )}
              <button
                onClick={() => removePort(p.port)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f85149',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Common ports */}
      <div style={{ marginTop: 16, fontSize: 12, color: '#888' }}>
        <div style={{ marginBottom: 8 }}>Quick add:</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[3000, 3001, 4000, 5000, 8000, 8080].map(port => (
            <button
              key={port}
              onClick={() => {
                setPorts(prev => {
                  if (prev.some(p => p.port === port)) return prev;
                  return [...prev, { port, status: 'open', url: generateUrl(port) }];
                });
              }}
              style={{
                padding: '4px 8px',
                background: '#3c3c3c',
                border: 'none',
                borderRadius: 4,
                color: '#888',
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              {port}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
