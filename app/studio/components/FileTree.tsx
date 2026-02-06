'use client';

import { useState, useMemo } from 'react';
import type { FileNode } from '../types';

// File type icons and colors
const FILE_ICONS: Record<string, { icon: string; color: string }> = {
  // JavaScript/TypeScript
  'js': { icon: '󰌞', color: '#f7df1e' },
  'jsx': { icon: '⚛', color: '#61dafb' },
  'ts': { icon: '󰛦', color: '#3178c6' },
  'tsx': { icon: '⚛', color: '#3178c6' },
  'mjs': { icon: '󰌞', color: '#f7df1e' },
  'cjs': { icon: '󰌞', color: '#f7df1e' },
  
  // Web
  'html': { icon: '󰌝', color: '#e34c26' },
  'htm': { icon: '󰌝', color: '#e34c26' },
  'css': { icon: '󰌜', color: '#264de4' },
  'scss': { icon: '󰌜', color: '#cc6699' },
  'sass': { icon: '󰌜', color: '#cc6699' },
  'less': { icon: '󰌜', color: '#1d365d' },
  
  // Data
  'json': { icon: '󰘦', color: '#cbcb41' },
  'yaml': { icon: '󰈙', color: '#cb171e' },
  'yml': { icon: '󰈙', color: '#cb171e' },
  'xml': { icon: '󰗀', color: '#e37933' },
  'csv': { icon: '󰈙', color: '#89e051' },
  'toml': { icon: '󰈙', color: '#9c4121' },
  
  // Config
  'env': { icon: '󰈙', color: '#ecd53f' },
  'gitignore': { icon: '󰊢', color: '#f14e32' },
  'dockerignore': { icon: '󰡨', color: '#2496ed' },
  'eslintrc': { icon: '󰱺', color: '#4b32c3' },
  'prettierrc': { icon: '󰬗', color: '#56b3b4' },
  
  // Markdown/Docs
  'md': { icon: '󰍔', color: '#519aba' },
  'mdx': { icon: '󰍔', color: '#fcb32c' },
  'txt': { icon: '󰈙', color: '#89e051' },
  'pdf': { icon: '󰈦', color: '#ec2025' },
  
  // Images
  'png': { icon: '󰋩', color: '#a074c4' },
  'jpg': { icon: '󰋩', color: '#a074c4' },
  'jpeg': { icon: '󰋩', color: '#a074c4' },
  'gif': { icon: '󰋩', color: '#a074c4' },
  'svg': { icon: '󰜡', color: '#ffb13b' },
  'ico': { icon: '󰋩', color: '#a074c4' },
  'webp': { icon: '󰋩', color: '#a074c4' },
  
  // Other languages
  'py': { icon: '󰌠', color: '#3572a5' },
  'rb': { icon: '󰴭', color: '#cc342d' },
  'go': { icon: '󰟓', color: '#00add8' },
  'rs': { icon: '󱘗', color: '#dea584' },
  'java': { icon: '󰬷', color: '#b07219' },
  'php': { icon: '󰌟', color: '#777bb4' },
  'c': { icon: '󰙱', color: '#555555' },
  'cpp': { icon: '󰙲', color: '#f34b7d' },
  'h': { icon: '󰙱', color: '#555555' },
  'sh': { icon: '󰆍', color: '#89e051' },
  'bash': { icon: '󰆍', color: '#89e051' },
  'zsh': { icon: '󰆍', color: '#89e051' },
  'sql': { icon: '󰆼', color: '#e38c00' },
  
  // Package managers
  'lock': { icon: '󰌾', color: '#8b8b8b' },
  
  // Default
  'default': { icon: '󰈙', color: '#8b8b8b' },
};

const FOLDER_ICONS: Record<string, { icon: string; color: string }> = {
  'node_modules': { icon: '󰎙', color: '#8bc500' },
  'src': { icon: '󰉋', color: '#e8bf6a' },
  'app': { icon: '󰉋', color: '#42a5f5' },
  'pages': { icon: '󰉋', color: '#42a5f5' },
  'components': { icon: '󰡀', color: '#7c4dff' },
  'hooks': { icon: '󰛢', color: '#00bcd4' },
  'lib': { icon: '󰆼', color: '#ffca28' },
  'utils': { icon: '󰑣', color: '#ff7043' },
  'api': { icon: '󰒍', color: '#66bb6a' },
  'public': { icon: '󰉋', color: '#42a5f5' },
  'assets': { icon: '󰉋', color: '#ab47bc' },
  'images': { icon: '󰋩', color: '#a074c4' },
  'styles': { icon: '󰌜', color: '#264de4' },
  'tests': { icon: '󰙨', color: '#8bc34a' },
  '__tests__': { icon: '󰙨', color: '#8bc34a' },
  'test': { icon: '󰙨', color: '#8bc34a' },
  'spec': { icon: '󰙨', color: '#8bc34a' },
  '.git': { icon: '󰊢', color: '#f14e32' },
  '.github': { icon: '󰊤', color: '#8b8b8b' },
  '.vscode': { icon: '󰨞', color: '#007acc' },
  'config': { icon: '󰒓', color: '#8b8b8b' },
  'scripts': { icon: '󰆍', color: '#89e051' },
  'dist': { icon: '󰉋', color: '#8b8b8b' },
  'build': { icon: '󰉋', color: '#8b8b8b' },
  '.next': { icon: '󰉋', color: '#000000' },
  'default': { icon: '󰉋', color: '#90a4ae' },
};

function getFileIcon(filename: string): { icon: string; color: string } {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const name = filename.toLowerCase();
  
  // Special files
  if (name === 'package.json') return { icon: '󰎙', color: '#8bc500' };
  if (name === 'tsconfig.json') return { icon: '󰛦', color: '#3178c6' };
  if (name === 'next.config.js' || name === 'next.config.mjs') return { icon: '▲', color: '#000000' };
  if (name === 'dockerfile') return { icon: '󰡨', color: '#2496ed' };
  if (name === '.env' || name.startsWith('.env.')) return FILE_ICONS['env'];
  if (name === '.gitignore') return FILE_ICONS['gitignore'];
  if (name === 'readme.md') return { icon: '󰈙', color: '#519aba' };
  if (name === 'license' || name === 'license.md') return { icon: '󰿃', color: '#d4af37' };
  
  return FILE_ICONS[ext] || FILE_ICONS['default'];
}

function getFolderIcon(foldername: string): { icon: string; color: string } {
  const name = foldername.toLowerCase();
  return FOLDER_ICONS[name] || FOLDER_ICONS['default'];
}

interface FileTreeProps {
  nodes: FileNode[];
  activeFile: string;
  onSelect: (path: string) => void;
  onRename?: (path: string) => void;
  onDelete?: (path: string) => void;
  searchQuery?: string;
}

export function FileTree({ nodes, activeFile, onSelect, onRename, onDelete, searchQuery }: FileTreeProps) {
  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;
    
    const filterTree = (nodes: FileNode[], query: string): FileNode[] => {
      const q = query.toLowerCase();
      return nodes.reduce<FileNode[]>((acc, node) => {
        if (node.type === 'file') {
          if (node.path.toLowerCase().includes(q)) acc.push(node);
        } else {
          const filteredChildren = filterTree(node.children || [], query);
          if (filteredChildren.length > 0 || node.path.toLowerCase().includes(q)) {
            acc.push({ ...node, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };
    
    return filterTree(nodes, searchQuery);
  }, [nodes, searchQuery]);

  return (
    <div style={{ fontSize: 13, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {filteredNodes.length === 0 ? (
        <div style={{ padding: 16, color: '#6e7681', textAlign: 'center', fontSize: 12 }}>
          {searchQuery ? 'No files match your search' : 'No files'}
        </div>
      ) : (
        filteredNodes.map(node => (
          <TreeNode
            key={node.path}
            node={node}
            depth={0}
            activeFile={activeFile}
            onSelect={onSelect}
            onRename={onRename}
            onDelete={onDelete}
            defaultExpanded={!!searchQuery}
          />
        ))
      )}
    </div>
  );
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  activeFile: string;
  onSelect: (path: string) => void;
  onRename?: (path: string) => void;
  onDelete?: (path: string) => void;
  defaultExpanded?: boolean;
}

function TreeNode({ node, depth, activeFile, onSelect, onRename, onDelete, defaultExpanded }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded || depth < 1);
  const [isHovered, setIsHovered] = useState(false);
  
  const name = node.path.split('/').pop() || node.path;
  const isActive = node.path === activeFile;
  const isFolder = node.type === 'folder';
  
  const { icon, color } = isFolder ? getFolderIcon(name) : getFileIcon(name);

  const handleClick = () => {
    if (isFolder) {
      setExpanded(!expanded);
    } else {
      onSelect(node.path);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Sort children: folders first, then files, alphabetically
  const sortedChildren = useMemo(() => {
    if (!node.children) return [];
    return [...node.children].sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      return a.path.localeCompare(b.path);
    });
  }, [node.children]);

  return (
    <div>
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: '3px 8px',
          paddingLeft: 8 + depth * 12,
          cursor: 'pointer',
          background: isActive 
            ? 'linear-gradient(90deg, #0d419d 0%, #1a1a2e 100%)' 
            : isHovered 
            ? 'rgba(255,255,255,0.05)' 
            : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          position: 'relative',
          borderLeft: isActive ? '2px solid #58a6ff' : '2px solid transparent',
          transition: 'background 0.1s ease',
        }}
      >
        {/* Expand/collapse arrow for folders */}
        <span style={{ 
          width: 16, 
          textAlign: 'center',
          color: '#6e7681',
          fontSize: 10,
          transition: 'transform 0.15s ease',
          transform: isFolder && expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        }}>
          {isFolder ? '▶' : ''}
        </span>
        
        {/* File/folder icon */}
        <span style={{ 
          color,
          fontSize: 15,
          width: 18,
          textAlign: 'center',
          filter: isActive ? 'brightness(1.2)' : 'none',
        }}>
          {icon}
        </span>
        
        {/* File name */}
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          flex: 1,
          color: isActive ? '#fff' : '#e6edf3',
          fontWeight: isActive ? 500 : 400,
        }}>
          {name}
        </span>
        
        {/* Action buttons on hover */}
        {isHovered && !isFolder && (
          <div style={{
            display: 'flex',
            gap: 2,
          }}>
            {onRename && (
              <button
                onClick={(e) => { e.stopPropagation(); onRename(node.path); }}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: 'none', 
                  color: '#8b949e', 
                  cursor: 'pointer', 
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 3,
                }}
                title="Rename"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); if(confirm(`Delete ${name}?`)) onDelete(node.path); }}
                style={{ 
                  background: 'rgba(248,81,73,0.1)', 
                  border: 'none', 
                  color: '#f85149', 
                  cursor: 'pointer', 
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 3,
                }}
                title="Delete"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Children */}
      {isFolder && expanded && sortedChildren.length > 0 && (
        <div style={{
          borderLeft: depth > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          marginLeft: depth > 0 ? 19 : 0,
        }}>
          {sortedChildren.map(child => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
