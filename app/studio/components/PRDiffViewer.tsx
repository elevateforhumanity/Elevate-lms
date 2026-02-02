'use client';

import { useState, useEffect, useCallback } from 'react';

interface DiffFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  previous_filename?: string;
}

interface InlineComment {
  id: number;
  body: string;
  path: string;
  line: number;
  side: string;
  user: { login: string; avatar_url?: string };
  created_at: string;
  diff_hunk?: string;
  in_reply_to_id?: number;
}

interface DiffLine {
  type: 'add' | 'remove' | 'context' | 'header';
  content: string;
  oldLine: number | null;
  newLine: number | null;
}

interface PRDiffViewerProps {
  repo: string;
  prNumber: number;
  baseSha: string;
  headSha: string;
  token: string;
  comments: InlineComment[];
  onAddComment: (path: string, line: number, side: 'LEFT' | 'RIGHT', body: string) => Promise<void>;
  onReplyComment: (commentId: number, body: string) => Promise<void>;
}

export function PRDiffViewer({
  repo,
  prNumber,
  baseSha,
  headSha,
  token,
  comments,
  onAddComment,
  onReplyComment,
}: PRDiffViewerProps) {
  const [files, setFiles] = useState<DiffFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [commentingOn, setCommentingOn] = useState<{ path: string; line: number; side: 'LEFT' | 'RIGHT' } | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const loadDiff = useCallback(async () => {
    if (!repo || !token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/github/diff?repo=${repo}&base=${baseSha}&head=${headSha}`,
        { headers: { 'x-gh-token': token } }
      );
      const data = await res.json();
      if (data.files) {
        setFiles(data.files);
        // Auto-expand first 3 files
        const initial = new Set(data.files.slice(0, 3).map((f: DiffFile) => f.filename));
        setExpandedFiles(initial);
      }
    } catch (e) {
      console.error('Failed to load diff:', e);
    }
    setLoading(false);
  }, [repo, token, baseSha, headSha]);

  useEffect(() => {
    loadDiff();
  }, [loadDiff]);

  const parsePatch = (patch: string): DiffLine[] => {
    if (!patch) return [];
    const lines: DiffLine[] = [];
    let oldLine = 0;
    let newLine = 0;

    patch.split('\n').forEach(line => {
      if (line.startsWith('@@')) {
        // Parse hunk header: @@ -oldStart,oldCount +newStart,newCount @@
        const match = line.match(/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
        if (match) {
          oldLine = parseInt(match[1]) - 1;
          newLine = parseInt(match[2]) - 1;
        }
        lines.push({ type: 'header', content: line, oldLine: null, newLine: null });
      } else if (line.startsWith('+')) {
        newLine++;
        lines.push({ type: 'add', content: line.slice(1), oldLine: null, newLine });
      } else if (line.startsWith('-')) {
        oldLine++;
        lines.push({ type: 'remove', content: line.slice(1), oldLine, newLine: null });
      } else {
        oldLine++;
        newLine++;
        lines.push({ type: 'context', content: line.slice(1) || line, oldLine, newLine });
      }
    });

    return lines;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return '#7ee787';
      case 'removed': return '#f85149';
      case 'modified': return '#e2c08d';
      case 'renamed': return '#58a6ff';
      default: return '#888';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return '+';
      case 'removed': return '-';
      case 'modified': return '~';
      case 'renamed': return '→';
      default: return '•';
    }
  };

  const toggleFile = (filename: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      if (next.has(filename)) {
        next.delete(filename);
      } else {
        next.add(filename);
      }
      return next;
    });
  };

  const getCommentsForLine = (path: string, line: number, side: 'LEFT' | 'RIGHT') => {
    return comments.filter(c => 
      c.path === path && 
      c.line === line && 
      (c.side === side || (!c.side && side === 'RIGHT'))
    );
  };

  const handleAddComment = async () => {
    if (!commentingOn || !commentText.trim()) return;
    await onAddComment(commentingOn.path, commentingOn.line, commentingOn.side, commentText);
    setCommentText('');
    setCommentingOn(null);
  };

  const handleReply = async () => {
    if (!replyingTo || !replyText.trim()) return;
    await onReplyComment(replyingTo, replyText);
    setReplyText('');
    setReplyingTo(null);
  };

  if (loading) {
    return <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>Loading diff...</div>;
  }

  if (files.length === 0) {
    return <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>No file changes</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* File summary */}
      <div style={{ padding: 8, borderBottom: '1px solid #3c3c3c', fontSize: 12, color: '#888' }}>
        {files.length} files changed, 
        <span style={{ color: '#7ee787' }}> +{files.reduce((s, f) => s + f.additions, 0)}</span>
        <span style={{ color: '#f85149' }}> -{files.reduce((s, f) => s + f.deletions, 0)}</span>
      </div>

      {/* Files */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {files.map(file => (
          <div key={file.filename} style={{ borderBottom: '1px solid #3c3c3c' }}>
            {/* File header */}
            <div
              onClick={() => toggleFile(file.filename)}
              style={{
                padding: '8px 12px',
                background: '#252526',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#888', fontSize: 10 }}>
                {expandedFiles.has(file.filename) ? '▼' : '▶'}
              </span>
              <span style={{ 
                color: getStatusColor(file.status), 
                fontWeight: 500,
                fontSize: 11,
                width: 16,
              }}>
                {getStatusIcon(file.status)}
              </span>
              <span style={{ fontSize: 13, flex: 1, fontFamily: 'monospace' }}>
                {file.filename}
                {file.previous_filename && (
                  <span style={{ color: '#888' }}> ← {file.previous_filename}</span>
                )}
              </span>
              <span style={{ fontSize: 11 }}>
                <span style={{ color: '#7ee787' }}>+{file.additions}</span>
                {' '}
                <span style={{ color: '#f85149' }}>-{file.deletions}</span>
              </span>
            </div>

            {/* Diff content */}
            {expandedFiles.has(file.filename) && file.patch && (
              <div style={{ 
                background: '#1e1e1e', 
                fontFamily: 'monospace', 
                fontSize: 12,
                overflow: 'auto',
              }}>
                {parsePatch(file.patch).map((line, idx) => {
                  const lineComments = line.type === 'add' 
                    ? getCommentsForLine(file.filename, line.newLine!, 'RIGHT')
                    : line.type === 'remove'
                    ? getCommentsForLine(file.filename, line.oldLine!, 'LEFT')
                    : [];

                  return (
                    <div key={idx}>
                      <div
                        style={{
                          display: 'flex',
                          background: line.type === 'add' ? 'rgba(46, 160, 67, 0.15)' 
                            : line.type === 'remove' ? 'rgba(248, 81, 73, 0.15)'
                            : line.type === 'header' ? '#252526'
                            : 'transparent',
                          borderLeft: line.type === 'add' ? '3px solid #7ee787'
                            : line.type === 'remove' ? '3px solid #f85149'
                            : '3px solid transparent',
                        }}
                      >
                        {/* Line numbers */}
                        <div style={{ 
                          width: 40, 
                          textAlign: 'right', 
                          padding: '0 8px',
                          color: '#555',
                          userSelect: 'none',
                          borderRight: '1px solid #3c3c3c',
                        }}>
                          {line.oldLine || ''}
                        </div>
                        <div style={{ 
                          width: 40, 
                          textAlign: 'right', 
                          padding: '0 8px',
                          color: '#555',
                          userSelect: 'none',
                          borderRight: '1px solid #3c3c3c',
                        }}>
                          {line.newLine || ''}
                        </div>

                        {/* Add comment button */}
                        <div 
                          style={{ 
                            width: 20, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            cursor: line.type !== 'header' ? 'pointer' : 'default',
                          }}
                          onClick={() => {
                            if (line.type === 'header') return;
                            setCommentingOn({
                              path: file.filename,
                              line: line.type === 'add' ? line.newLine! : line.oldLine!,
                              side: line.type === 'add' ? 'RIGHT' : 'LEFT',
                            });
                          }}
                        >
                          {line.type !== 'header' && (
                            <span style={{ color: '#58a6ff', fontSize: 10, opacity: 0.5 }}>+</span>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ 
                          flex: 1, 
                          padding: '0 8px',
                          whiteSpace: 'pre',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: line.type === 'header' ? '#888' : '#fff',
                        }}>
                          {line.type !== 'header' && (
                            <span style={{ color: line.type === 'add' ? '#7ee787' : line.type === 'remove' ? '#f85149' : '#888' }}>
                              {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                            </span>
                          )}
                          {line.content}
                        </div>
                      </div>

                      {/* Inline comments */}
                      {lineComments.map(comment => (
                        <div key={comment.id} style={{ 
                          margin: '4px 0 4px 100px', 
                          padding: 8, 
                          background: '#252526', 
                          borderRadius: 4,
                          borderLeft: '3px solid #58a6ff',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontWeight: 500, fontSize: 12 }}>{comment.user.login}</span>
                            <span style={{ color: '#888', fontSize: 10 }}>
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: '#ccc' }}>{comment.body}</div>
                          <button
                            onClick={() => setReplyingTo(comment.id)}
                            style={{
                              marginTop: 8,
                              padding: '2px 8px',
                              background: '#3c3c3c',
                              border: 'none',
                              borderRadius: 4,
                              color: '#888',
                              cursor: 'pointer',
                              fontSize: 10,
                            }}
                          >
                            Reply
                          </button>

                          {replyingTo === comment.id && (
                            <div style={{ marginTop: 8 }}>
                              <textarea
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                rows={2}
                                style={{
                                  width: '100%',
                                  padding: 8,
                                  background: '#3c3c3c',
                                  border: 'none',
                                  borderRadius: 4,
                                  color: '#fff',
                                  fontSize: 12,
                                  resize: 'vertical',
                                  boxSizing: 'border-box',
                                }}
                              />
                              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  style={{ padding: '4px 8px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#888', cursor: 'pointer', fontSize: 11 }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleReply}
                                  disabled={!replyText.trim()}
                                  style={{ padding: '4px 8px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 11 }}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* New comment form */}
                      {commentingOn?.path === file.filename && 
                       commentingOn?.line === (line.type === 'add' ? line.newLine : line.oldLine) && (
                        <div style={{ 
                          margin: '4px 0 4px 100px', 
                          padding: 8, 
                          background: '#252526', 
                          borderRadius: 4,
                        }}>
                          <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            rows={3}
                            autoFocus
                            style={{
                              width: '100%',
                              padding: 8,
                              background: '#3c3c3c',
                              border: 'none',
                              borderRadius: 4,
                              color: '#fff',
                              fontSize: 12,
                              resize: 'vertical',
                              boxSizing: 'border-box',
                            }}
                          />
                          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <button
                              onClick={() => setCommentingOn(null)}
                              style={{ padding: '4px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#888', cursor: 'pointer', fontSize: 11 }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddComment}
                              disabled={!commentText.trim()}
                              style={{ padding: '4px 12px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 11 }}
                            >
                              Add Comment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
