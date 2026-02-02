'use client';

import { useState, useMemo } from 'react';
import type { FileNode } from '../types';

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
    <div style={{ fontSize: 13 }}>
      {filteredNodes.map(node => (
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
      ))}
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
  const [expanded, setExpanded] = useState(defaultExpanded || false);
  const [showMenu, setShowMenu] = useState(false);
  
  const name = node.path.split('/').pop() || node.path;
  const isActive = node.path === activeFile;
  const isFolder = node.type === 'folder';

  const handleClick = () => {
    if (isFolder) {
      setExpanded(!expanded);
    } else {
      onSelect(node.path);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          padding: '4px 8px',
          paddingLeft: 12 + depth * 16,
          cursor: 'pointer',
          background: isActive ? '#094771' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          position: 'relative',
        }}
        onMouseEnter={() => {}}
        onMouseLeave={() => setShowMenu(false)}
      >
        <span style={{ opacity: 0.6, fontSize: 12 }}>
          {isFolder ? (expanded ? '▼' : '▶') : '  '}
        </span>
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          flex: 1 
        }}>
          {name}
        </span>
        
        {showMenu && !isFolder && (
          <div style={{
            position: 'absolute',
            right: 8,
            display: 'flex',
            gap: 4,
            background: '#252526',
            padding: '2px 4px',
            borderRadius: 4,
          }}>
            {onRename && (
              <button
                onClick={(e) => { e.stopPropagation(); onRename(node.path); setShowMenu(false); }}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 11 }}
              >
                Rename
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(node.path); setShowMenu(false); }}
                style={{ background: 'none', border: 'none', color: '#f85149', cursor: 'pointer', fontSize: 11 }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      
      {isFolder && expanded && node.children && (
        <div>
          {node.children.map(child => (
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
