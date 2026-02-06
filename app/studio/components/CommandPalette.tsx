'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
  category?: string;
}

interface CommandPaletteProps {
  commands: Command[];
  onClose: () => void;
  recentFiles?: { file_path: string }[];
  onOpenFile?: (path: string) => void;
}

export function CommandPalette({ commands, onClose, recentFiles, onOpenFile }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCommands = useMemo(() => {
    const q = query.toLowerCase();
    
    // If query starts with >, show commands
    if (q.startsWith('>')) {
      const cmdQuery = q.slice(1).trim();
      return commands.filter(c => 
        c.label.toLowerCase().includes(cmdQuery) ||
        c.category?.toLowerCase().includes(cmdQuery)
      );
    }
    
    // Otherwise show files
    if (recentFiles && onOpenFile) {
      const fileCommands: Command[] = recentFiles
        .filter(f => f.file_path.toLowerCase().includes(q))
        .slice(0, 10)
        .map(f => ({
          id: `file:${f.file_path}`,
          label: f.file_path,
          category: 'Recent Files',
          action: () => onOpenFile(f.file_path),
        }));
      
      if (q) {
        return [...fileCommands, ...commands.filter(c => 
          c.label.toLowerCase().includes(q)
        )];
      }
      return fileCommands.length > 0 ? fileCommands : commands.slice(0, 10);
    }
    
    return commands.filter(c => c.label.toLowerCase().includes(q));
  }, [query, commands, recentFiles, onOpenFile]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const item = listRef.current?.children[selectedIndex] as HTMLElement;
    item?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filteredCommands[selectedIndex];
      if (cmd) {
        cmd.action();
        onClose();
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 100,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#252526',
          borderRadius: 8,
          width: 500,
          maxWidth: '90vw',
          maxHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search files or type > for commands..."
          style={{
            padding: 16,
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid #3c3c3c',
            color: '#fff',
            fontSize: 16,
            outline: 'none',
          }}
        />
        
        <div ref={listRef} style={{ overflow: 'auto', maxHeight: 400 }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>
              No results found
            </div>
          ) : (
            filteredCommands.map((cmd, i) => (
              <div
                key={cmd.id}
                onClick={() => { cmd.action(); onClose(); }}
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  background: i === selectedIndex ? '#094771' : 'transparent',
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span style={{ flex: 1 }}>{cmd.label}</span>
                {cmd.category && (
                  <span style={{ color: '#888', fontSize: 12 }}>{cmd.category}</span>
                )}
                {cmd.shortcut && (
                  <code style={{ 
                    background: '#3c3c3c', 
                    padding: '2px 6px', 
                    borderRadius: 4,
                    fontSize: 11,
                    color: '#888',
                  }}>
                    {cmd.shortcut}
                  </code>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
