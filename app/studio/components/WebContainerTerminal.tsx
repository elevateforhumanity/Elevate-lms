'use client';

import { useState, useRef, useEffect } from 'react';
import type { TerminalLine, ServerInfo } from '../hooks/useWebContainer';

interface WebContainerTerminalProps {
  terminals: { id: string; lines: TerminalLine[] }[];
  activeTerminal: string;
  servers: ServerInfo[];
  booted: boolean;
  booting: boolean;
  installing: boolean;
  onCommand: (command: string, terminalId?: string) => Promise<number>;
  onBoot: () => Promise<void>;
  onInstall: () => Promise<number>;
  onStartServer: (command?: string) => Promise<boolean>;
  onStopServer: (port: number) => void;
  onClear: (terminalId: string) => void;
  onAddTerminal: () => string;
  onRemoveTerminal: (id: string) => void;
  onSetActiveTerminal: (id: string) => void;
}

export function WebContainerTerminal({
  terminals,
  activeTerminal,
  servers,
  booted,
  booting,
  installing,
  onCommand,
  onBoot,
  onInstall,
  onStartServer,
  onStopServer,
  onClear,
  onAddTerminal,
  onRemoveTerminal,
  onSetActiveTerminal,
}: WebContainerTerminalProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const currentTerminal = terminals.find(t => t.id === activeTerminal);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [currentTerminal?.lines]);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setRunning(true);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Handle built-in commands
    if (cmd.trim() === 'clear') {
      onClear(activeTerminal);
      setInput('');
      setRunning(false);
      return;
    }

    await onCommand(cmd, activeTerminal);
    setInput('');
    setRunning(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !running) {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      setInput('');
      setRunning(false);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onClear(activeTerminal);
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return '#7ee787';
      case 'output': return '#e6edf3';
      case 'error': return '#f85149';
      case 'system': return '#58a6ff';
      default: return '#e6edf3';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0d1117',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        fontSize: 13,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header with tabs and actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #30363d',
        background: '#161b22',
      }}>
        {/* Terminal tabs */}
        <div style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
          {terminals.map(t => (
            <div
              key={t.id}
              onClick={() => onSetActiveTerminal(t.id)}
              style={{
                padding: '6px 12px',
                background: t.id === activeTerminal ? '#0d1117' : 'transparent',
                borderBottom: t.id === activeTerminal ? '2px solid #58a6ff' : '2px solid transparent',
                color: t.id === activeTerminal ? '#e6edf3' : '#8b949e',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
              }}
            >
              <span>{t.id === 'main' ? 'Terminal' : t.id}</span>
              {t.id !== 'main' && (
                <span
                  onClick={(e) => { e.stopPropagation(); onRemoveTerminal(t.id); }}
                  style={{ color: '#8b949e', cursor: 'pointer' }}
                >
                  ×
                </span>
              )}
            </div>
          ))}
          <button
            onClick={onAddTerminal}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: 'none',
              color: '#8b949e',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 4, padding: '4px 8px' }}>
          {!booted && (
            <button
              onClick={onBoot}
              disabled={booting}
              style={{
                padding: '4px 8px',
                background: '#238636',
                border: 'none',
                borderRadius: 4,
                color: '#fff',
                cursor: booting ? 'not-allowed' : 'pointer',
                fontSize: 11,
              }}
            >
              {booting ? 'Booting...' : 'Boot'}
            </button>
          )}
          {booted && (
            <>
              <button
                onClick={onInstall}
                disabled={installing}
                style={{
                  padding: '4px 8px',
                  background: '#3c3c3c',
                  border: 'none',
                  borderRadius: 4,
                  color: '#fff',
                  cursor: installing ? 'not-allowed' : 'pointer',
                  fontSize: 11,
                }}
              >
                {installing ? 'Installing...' : 'npm install'}
              </button>
              <button
                onClick={() => onStartServer()}
                style={{
                  padding: '4px 8px',
                  background: '#0e639c',
                  border: 'none',
                  borderRadius: 4,
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                npm run dev
              </button>
            </>
          )}
          <button
            onClick={() => onClear(activeTerminal)}
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: 'none',
              color: '#8b949e',
              cursor: 'pointer',
              fontSize: 11,
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Server URLs */}
      {servers.length > 0 && (
        <div style={{
          padding: '6px 12px',
          background: '#161b22',
          borderBottom: '1px solid #30363d',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {servers.map(server => (
            <div key={server.port} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: server.status === 'running' ? '#7ee787' : '#f85149',
              }} />
              <a
                href={server.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#58a6ff', fontSize: 12 }}
              >
                :{server.port} → {server.url}
              </a>
              {server.status === 'running' && (
                <button
                  onClick={() => onStopServer(server.port)}
                  style={{
                    padding: '2px 6px',
                    background: '#da3633',
                    border: 'none',
                    borderRadius: 4,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 10,
                  }}
                >
                  Stop
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 12,
          color: '#e6edf3',
        }}
      >
        {currentTerminal?.lines.map(line => (
          <div
            key={line.id}
            style={{
              color: getLineColor(line.type),
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              marginBottom: 2,
            }}
          >
            {line.type === 'input' && <span style={{ color: '#8b949e' }}>$ </span>}
            {line.type === 'system' && <span style={{ color: '#8b949e' }}>→ </span>}
            {line.content}
          </div>
        ))}

        {/* Input line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ color: '#8b949e' }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={running || !booted}
            placeholder={!booted ? 'Click Boot to start...' : running ? 'Running...' : ''}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#7ee787',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              outline: 'none',
            }}
          />
          {running && (
            <span style={{ color: '#8b949e', fontSize: 11 }}>Running...</span>
          )}
        </div>
      </div>
    </div>
  );
}
