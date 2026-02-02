'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface ShareData {
  file_path: string;
  branch: string;
  line_start?: number;
  line_end?: number;
  studio_repos: {
    repo_full_name: string;
  };
}

export default function SharePage() {
  const params = useParams();
  const code = params.code as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('plaintext');

  useEffect(() => {
    async function loadShare() {
      try {
        // Get share info
        const shareRes = await fetch(`/api/studio/share?code=${code}`);
        const share = await shareRes.json();
        
        if (share.error) {
          setError(share.error);
          setLoading(false);
          return;
        }
        
        setShareData(share);

        // Get file content (public read)
        const fileRes = await fetch(
          `/api/github/file?repo=${share.studio_repos.repo_full_name}&path=${encodeURIComponent(share.file_path)}&ref=${share.branch}`
        );
        const file = await fileRes.json();
        
        if (file.error) {
          setError('Could not load file');
          setLoading(false);
          return;
        }

        setContent(file.content);
        setLanguage(file.language || 'plaintext');
        setLoading(false);
      } catch (e) {
        setError('Failed to load shared file');
        setLoading(false);
      }
    }

    if (code) loadShare();
  }, [code]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#1e1e1e', 
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#1e1e1e', 
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>😕</div>
        <div style={{ fontSize: 20 }}>{error}</div>
        <a href="/studio" style={{ color: '#58a6ff' }}>Go to Dev Studio</a>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: '#1e1e1e', 
      color: '#fff',
      fontFamily: 'system-ui',
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 16px', 
        background: '#252526', 
        borderBottom: '1px solid #3c3c3c',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontWeight: 600 }}>Dev Studio</span>
        <span style={{ color: '#888' }}>•</span>
        <span style={{ color: '#888' }}>{shareData?.studio_repos.repo_full_name}</span>
        <span style={{ color: '#888' }}>•</span>
        <span>{shareData?.file_path}</span>
        {shareData?.line_start && (
          <>
            <span style={{ color: '#888' }}>•</span>
            <span style={{ color: '#58a6ff' }}>
              Line {shareData.line_start}
              {shareData.line_end && shareData.line_end !== shareData.line_start && `-${shareData.line_end}`}
            </span>
          </>
        )}
        <div style={{ flex: 1 }} />
        <a 
          href="/studio" 
          style={{ 
            padding: '6px 12px', 
            background: '#238636', 
            borderRadius: 4, 
            color: '#fff', 
            textDecoration: 'none',
            fontSize: 13,
          }}
        >
          Open in Studio
        </a>
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        <MonacoEditor
          height="100%"
          language={language}
          value={content}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
          }}
          onMount={(editor) => {
            // Scroll to highlighted line
            if (shareData?.line_start) {
              editor.revealLineInCenter(shareData.line_start);
              
              // Highlight the line range
              const monaco = (window as any).monaco;
              if (monaco) {
                editor.deltaDecorations([], [{
                  range: new monaco.Range(
                    shareData.line_start, 
                    1, 
                    shareData.line_end || shareData.line_start, 
                    1
                  ),
                  options: {
                    isWholeLine: true,
                    className: 'highlighted-line',
                    linesDecorationsClassName: 'highlighted-line-margin',
                  },
                }]);
              }
            }
          }}
        />
      </div>

      <style>{`
        .highlighted-line {
          background: rgba(255, 255, 0, 0.1) !important;
        }
        .highlighted-line-margin {
          background: #e2c08d;
          width: 4px !important;
        }
      `}</style>
    </div>
  );
}
