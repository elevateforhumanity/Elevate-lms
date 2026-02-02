'use client';

import type { OpenFile } from '../types';

interface TabsProps {
  files: OpenFile[];
  activeFile: string;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
}

export function Tabs({ files, activeFile, onSelect, onClose }: TabsProps) {
  if (files.length === 0) return null;

  return (
    <div style={{ 
      display: 'flex', 
      background: '#252526', 
      borderBottom: '1px solid #3c3c3c',
      overflow: 'auto',
      flexShrink: 0,
    }}>
      {files.map(f => {
        const name = f.path.split('/').pop() || f.path;
        const isActive = f.path === activeFile;
        
        return (
          <div
            key={f.path}
            onClick={() => onSelect(f.path)}
            style={{
              padding: '8px 12px',
              background: isActive ? '#1e1e1e' : 'transparent',
              borderRight: '1px solid #3c3c3c',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              minWidth: 0,
              maxWidth: 200,
            }}
          >
            {f.modified && <span style={{ color: '#e2c08d' }}>●</span>}
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              {name}
            </span>
            <span 
              onClick={e => { e.stopPropagation(); onClose(f.path); }} 
              style={{ 
                opacity: 0.5, 
                marginLeft: 'auto',
                padding: '0 4px',
                borderRadius: 4,
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = '0.5'}
            >
              ×
            </span>
          </div>
        );
      })}
    </div>
  );
}
