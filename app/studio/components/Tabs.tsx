'use client';

import type { OpenFile } from '../types';

// File type colors matching FileTree
const FILE_COLORS: Record<string, string> = {
  'js': '#f7df1e',
  'jsx': '#61dafb',
  'ts': '#3178c6',
  'tsx': '#61dafb',
  'mjs': '#f7df1e',
  'html': '#e34c26',
  'css': '#264de4',
  'scss': '#cc6699',
  'json': '#cbcb41',
  'yaml': '#cb171e',
  'yml': '#cb171e',
  'md': '#519aba',
  'mdx': '#fcb32c',
  'py': '#3572a5',
  'go': '#00add8',
  'rs': '#dea584',
  'sql': '#e38c00',
  'sh': '#89e051',
  'env': '#ecd53f',
  'svg': '#ffb13b',
  'png': '#a074c4',
  'jpg': '#a074c4',
  'default': '#8b949e',
};

const FILE_ICONS: Record<string, string> = {
  'js': '󰌞',
  'jsx': '⚛',
  'ts': '󰛦',
  'tsx': '⚛',
  'html': '󰌝',
  'css': '󰌜',
  'scss': '󰌜',
  'json': '{ }',
  'md': '󰍔',
  'py': '󰌠',
  'go': '󰟓',
  'sql': '󰆼',
  'sh': '󰆍',
  'svg': '󰜡',
  'png': '󰋩',
  'jpg': '󰋩',
  'default': '󰈙',
};

function getFileInfo(filename: string): { color: string; icon: string } {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return {
    color: FILE_COLORS[ext] || FILE_COLORS['default'],
    icon: FILE_ICONS[ext] || FILE_ICONS['default'],
  };
}

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
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      borderBottom: '1px solid #0f3460',
      overflow: 'auto',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
      {files.map(f => {
        const name = f.path.split('/').pop() || f.path;
        const isActive = f.path === activeFile;
        const { color, icon } = getFileInfo(name);
        
        return (
          <div
            key={f.path}
            onClick={() => onSelect(f.path)}
            style={{
              padding: '10px 16px',
              background: isActive 
                ? 'linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)' 
                : 'transparent',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              minWidth: 0,
              maxWidth: 200,
              transition: 'all 0.15s ease',
              position: 'relative',
            }}
          >
            {/* File icon with color */}
            <span style={{ 
              color, 
              fontSize: 14,
              filter: isActive ? 'brightness(1.3)' : 'none',
            }}>
              {icon}
            </span>
            
            {/* Modified indicator */}
            {f.modified && (
              <span style={{ 
                position: 'absolute',
                top: 6,
                left: 8,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#e2c08d',
                boxShadow: '0 0 6px #e2c08d',
              }} />
            )}
            
            {/* File name */}
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              color: isActive ? '#fff' : '#8b949e',
              fontWeight: isActive ? 500 : 400,
            }}>
              {name}
            </span>
            
            {/* Close button */}
            <span 
              onClick={e => { e.stopPropagation(); onClose(f.path); }} 
              style={{ 
                opacity: 0.4,
                marginLeft: 'auto',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 14,
                transition: 'all 0.15s ease',
                color: '#fff',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.opacity = '1';
                (e.target as HTMLElement).style.background = 'rgba(248,81,73,0.3)';
                (e.target as HTMLElement).style.color = '#f85149';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.opacity = '0.4';
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#fff';
              }}
            >
              ×
            </span>
          </div>
        );
      })}
    </div>
  );
}
