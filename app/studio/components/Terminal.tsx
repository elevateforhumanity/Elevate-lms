'use client';

import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  cwd?: string;
}

interface HistoryEntry {
  command: string;
  output: string;
  exitCode: number;
  timestamp: Date;
}

export function Terminal({ cwd }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const runCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setRunning(true);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Handle built-in commands
    if (cmd.trim() === 'clear') {
      setHistory([]);
      setInput('');
      setRunning(false);
      return;
    }

    try {
      const res = await fetch('/api/studio/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, cwd }),
      });

      const data = await res.json();
      
      setHistory(prev => [...prev, {
        command: cmd,
        output: data.stdout + (data.stderr ? `\n${data.stderr}` : ''),
        exitCode: data.exitCode,
        timestamp: new Date(),
      }]);
    } catch (error) {
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Error: ${error}`,
        exitCode: 1,
        timestamp: new Date(),
      }]);
    }

    setInput('');
    setRunning(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !running) {
      runCommand(input);
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
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
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
      <div style={{ 
        padding: '6px 12px', 
        borderBottom: '1px solid #30363d',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#8b949e',
        fontSize: 12,
      }}>
        <span>Terminal</span>
        <span style={{ opacity: 0.6 }}>{cwd || '~'}</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setHistory([])}
          style={{
            background: 'none',
            border: 'none',
            color: '#8b949e',
            cursor: 'pointer',
            fontSize: 11,
          }}
        >
          Clear
        </button>
      </div>

      <div 
        ref={outputRef}
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: 12,
          color: '#e6edf3',
        }}
      >
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ color: '#7ee787', display: 'flex', gap: 8 }}>
              <span style={{ color: '#8b949e' }}>$</span>
              <span>{entry.command}</span>
            </div>
            {entry.output && (
              <pre style={{ 
                margin: '4px 0 0 0', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-all',
                color: entry.exitCode !== 0 ? '#f85149' : '#e6edf3',
              }}>
                {entry.output}
              </pre>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#8b949e' }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={running}
            placeholder={running ? 'Running...' : ''}
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
