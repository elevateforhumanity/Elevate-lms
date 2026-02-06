'use client';

import type { Settings } from '../types';

interface SettingsModalProps {
  settings: Settings;
  onUpdate: (updates: Partial<Settings>) => void;
  onClose: () => void;
}

export function SettingsModal({ settings, onUpdate, onClose }: SettingsModalProps) {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,0.5)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 100 
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          background: '#252526', 
          padding: 24, 
          borderRadius: 8, 
          width: 400,
          maxWidth: '90vw',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Settings</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Theme */}
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#888' }}>
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={e => onUpdate({ theme: e.target.value as 'dark' | 'light' })}
              style={{
                width: '100%',
                padding: 10,
                background: '#3c3c3c',
                border: 'none',
                borderRadius: 4,
                color: '#fff',
                fontSize: 14,
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#888' }}>
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={settings.fontSize}
              onChange={e => onUpdate({ fontSize: parseInt(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Word Wrap */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={e => onUpdate({ wordWrap: e.target.checked })}
              style={{ width: 18, height: 18 }}
            />
            <span>Word Wrap</span>
          </label>

          {/* Minimap */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.minimap}
              onChange={e => onUpdate({ minimap: e.target.checked })}
              style={{ width: 18, height: 18 }}
            />
            <span>Show Minimap</span>
          </label>

          {/* Auto Save */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={e => onUpdate({ autoSave: e.target.checked })}
              style={{ width: 18, height: 18 }}
            />
            <span>Auto Save (experimental)</span>
          </label>
        </div>

        <div style={{ marginTop: 24 }}>
          <h4 style={{ margin: '0 0 12px', fontSize: 14 }}>Keyboard Shortcuts</h4>
          <div style={{ fontSize: 13, color: '#888' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>Save file</span>
              <code style={{ background: '#3c3c3c', padding: '2px 6px', borderRadius: 4 }}>Ctrl+S</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>Find in file</span>
              <code style={{ background: '#3c3c3c', padding: '2px 6px', borderRadius: 4 }}>Ctrl+F</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>Go to line</span>
              <code style={{ background: '#3c3c3c', padding: '2px 6px', borderRadius: 4 }}>Ctrl+G</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>Command palette</span>
              <code style={{ background: '#3c3c3c', padding: '2px 6px', borderRadius: 4 }}>Ctrl+Shift+P</code>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#0e639c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
