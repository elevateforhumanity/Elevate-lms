import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
/**
 * DocumentEditor Component - Google Docs alternative with real-time collaboration
 */
export function DocumentEditor({
  documentId,
  userId,
  userName,
  canEdit = true,
}) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  useEffect(() => {
    if (!editorRef.current) return;
    // Initialize Quill editor
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      readOnly: !canEdit,
      modules: {
        toolbar: canEdit
          ? [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link', 'image'],
              ['clean'],
            ]
          : false,
      },
    });
    quillRef.current = quill;
    // Load document content
    loadDocument();
    // Set up auto-save
    const saveInterval = setInterval(() => {
      saveDocument();
    }, 30000); // Auto-save every 30 seconds
    // Track changes
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        // Broadcast changes to other users (in production, use WebSocket)
        // 
      }
    });
    // Track cursor position
    quill.on('selection-change', (range, oldRange, source) => {
      if (range && source === 'user') {
        // Broadcast cursor position
        // 
      }
    });
    return () => {
      clearInterval(saveInterval);
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [documentId, canEdit]);
  const loadDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`);
      const doc = await response.json();
      if (quillRef.current && doc.content) {
        quillRef.current.setContents(JSON.parse(doc.content));
      }
      setCollaborators(doc.collaborators || []);
      setComments(doc.comments || []);
    } catch (error) {
      // Error: $1
    }
  };
  const saveDocument = async () => {
    if (!quillRef.current || !canEdit) return;
    setIsSaving(true);
    try {
      const content = JSON.stringify(quillRef.current.getContents());
      await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      setLastSaved(new Date());
    } catch (error) {
      // Error: $1
    } finally {
      setIsSaving(false);
    }
  };
  const addComment = () => {
    if (!quillRef.current) return;
    const range = quillRef.current.getSelection();
    if (!range || range.length === 0) {
      alert('Please select text to comment on');
      return;
    }
    const text = prompt('Enter your comment:');
    if (!text) return;
    const comment = {
      text,
      selection: range,
      userName,
      createdAt: new Date(),
    };
    // In production, save to backend
    setComments([...comments, comment]);
  };
  const exportDocument = async (format) => {
    try {
      const response = await fetch(
        `/api/documents/${documentId}/export/${format}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      a.click();
    } catch (error) {
      // Error: $1
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'var(--brand-surface)',
      }}
    >
      {/* Main editor area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid var(--brand-border)',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem' }}>
              Untitled Document
            </h2>
            {isSaving ? (
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--brand-text-muted)',
                }}
              >
                Saving...
              </span>
            ) : lastSaved ? (
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--brand-text-muted)',
                }}
              >
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* Collaborators */}
            <div
              style={{ display: 'flex', gap: '0.25rem', marginRight: '1rem' }}
            >
              {collaborators.slice(0, 3).map((collab, i) => (
                <div
                  key={i}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-info)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}
                  title={collab.userName}
                >
                  {collab.userName?.charAt(0).toUpperCase()}
                </div>
              ))}
              {collaborators.length > 3 && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-border)',
                    color: 'var(--brand-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
            {canEdit && (
              <>
                <button
                  onClick={addComment}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fff',
                    border: '1px solid var(--brand-border-dark)',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  💬 Comment
                </button>
                <button
                  onClick={() => saveDocument()}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--brand-info)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Save
                </button>
              </>
            )}
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#fff',
                  border: '1px solid var(--brand-border-dark)',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                ⋮
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </div>
        {/* Editor */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              minHeight: '100%',
            }}
          >
            <div
              ref={editorRef}
              style={{
                minHeight: '500px',
                padding: '2rem',
              }}
            />
          </div>
        </div>
      </div>
      {/* Comments sidebar */}
      {showComments && (
        <div
          style={{
            width: '300px',
            backgroundColor: '#fff',
            borderLeft: '1px solid var(--brand-border)',
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Comments</h3>
          {comments.length === 0 ? (
            <p
              style={{ color: 'var(--brand-text-muted)', fontSize: '0.875rem' }}
            >
              No comments yet
            </p>
          ) : (
            comments.map((comment, i) => (
              <div
                key={i}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--brand-surface)',
                  borderRadius: '0.375rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  {comment.userName}
                </div>
                <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {comment.text}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--brand-text-muted)',
                  }}
                >
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
export default DocumentEditor;
