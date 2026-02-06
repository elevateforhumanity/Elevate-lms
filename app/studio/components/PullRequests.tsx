'use client';

import { useState, useEffect, useCallback } from 'react';
import { PRDiffViewer } from './PRDiffViewer';

interface PR {
  number: number;
  title: string;
  state: string;
  draft: boolean;
  user: { login: string; avatar_url: string };
  head: { ref: string; sha: string };
  base: { ref: string; sha: string };
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  mergeable: boolean | null;
  mergeable_state: string;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files?: number;
}

interface Review {
  id: number;
  state: string;
  body: string;
  user: { login: string; avatar_url?: string };
  submitted_at: string;
  commit_id?: string;
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

interface PRTracking {
  id: string;
  pr_number: number;
  is_watching: boolean;
  notes: string | null;
  last_viewed_at: string;
}

interface PullRequestsProps {
  repo: string;
  repoId?: string;
  branch: string;
  token: string;
  userId?: string;
  onCheckout: (branch: string) => void;
}

export function PullRequests({ repo, repoId, branch, token, userId, onCheckout }: PullRequestsProps) {
  const [prs, setPrs] = useState<PR[]>([]);
  const [selectedPR, setSelectedPR] = useState<PR | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inlineComments, setInlineComments] = useState<InlineComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newPR, setNewPR] = useState({ title: '', body: '', base: 'main' });
  const [commentText, setCommentText] = useState('');
  const [tracking, setTracking] = useState<Record<number, PRTracking>>({});
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [filter, setFilter] = useState<'all' | 'watching'>('all');
  const [tab, setTab] = useState<'conversation' | 'files'>('conversation');

  // Load PR tracking from database
  const loadTracking = useCallback(async () => {
    if (!userId || !repoId) return;
    try {
      const res = await fetch(`/api/studio/pr-tracking?repo_id=${repoId}`, {
        headers: { 'x-user-id': userId },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const trackingMap: Record<number, PRTracking> = {};
        data.forEach((t: PRTracking) => {
          trackingMap[t.pr_number] = t;
        });
        setTracking(trackingMap);
      }
    } catch (e) {
      console.error('Failed to load PR tracking:', e);
    }
  }, [userId, repoId]);

  const saveTracking = useCallback(async (prNumber: number, updates: Partial<PRTracking>) => {
    if (!userId || !repoId) return;
    try {
      const existing = tracking[prNumber];
      if (existing) {
        const res = await fetch('/api/studio/pr-tracking', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
          body: JSON.stringify({ id: existing.id, ...updates }),
        });
        const data = await res.json();
        setTracking(prev => ({ ...prev, [prNumber]: { ...prev[prNumber], ...data } }));
      } else {
        const res = await fetch('/api/studio/pr-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
          body: JSON.stringify({ repo_id: repoId, pr_number: prNumber, ...updates }),
        });
        const data = await res.json();
        setTracking(prev => ({ ...prev, [prNumber]: data }));
      }
    } catch (e) {
      console.error('Failed to save PR tracking:', e);
    }
  }, [userId, repoId, tracking]);

  const toggleWatch = async (prNumber: number) => {
    const current = tracking[prNumber]?.is_watching ?? false;
    await saveTracking(prNumber, { is_watching: !current });
  };

  const saveNotes = async () => {
    if (!selectedPR) return;
    await saveTracking(selectedPR.number, { notes: noteText || null });
    setShowNotes(false);
  };

  const loadPRs = useCallback(async () => {
    if (!repo || !token) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/github/pulls?repo=${repo}`, {
        headers: { 'x-gh-token': token },
      });
      const data = await res.json();
      if (Array.isArray(data)) setPrs(data);
    } catch (e) {
      console.error('Failed to load PRs:', e);
    }
    setLoading(false);
  }, [repo, token]);

  const loadPRDetails = useCallback(async (number: number) => {
    try {
      // Load PR details
      const res = await fetch(`/api/github/pulls?repo=${repo}&number=${number}`, {
        headers: { 'x-gh-token': token },
      });
      const data = await res.json();
      setSelectedPR(data);
      setReviews(data.reviews || []);
      
      // Load inline comments via reviews API
      const reviewsRes = await fetch(`/api/github/reviews?repo=${repo}&pr=${number}`, {
        headers: { 'x-gh-token': token },
      });
      const reviewsData = await reviewsRes.json();
      setInlineComments(reviewsData.comments || []);
      
      // Load notes
      const t = tracking[number];
      setNoteText(t?.notes || '');
      
      // Mark as viewed
      if (userId && repoId) {
        saveTracking(number, { last_viewed_at: new Date().toISOString() });
      }
    } catch (e) {
      console.error('Failed to load PR details:', e);
    }
  }, [repo, token, tracking, userId, repoId, saveTracking]);

  const createPR = async () => {
    if (!newPR.title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/github/pulls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          title: newPR.title,
          body: newPR.body,
          head: branch,
          base: newPR.base,
        }),
      });
      const data = await res.json();
      if (data.number) {
        setShowCreate(false);
        setNewPR({ title: '', body: '', base: 'main' });
        await loadPRs();
      }
    } catch (e) {
      console.error('Failed to create PR:', e);
    }
    setLoading(false);
  };

  const mergePR = async (number: number, method: 'merge' | 'squash' | 'rebase' = 'squash') => {
    if (!confirm('Merge this pull request?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/github/pulls', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          number,
          action: 'merge',
          merge_method: method,
        }),
      });
      const data = await res.json();
      if (data.merged) {
        await loadPRs();
        setSelectedPR(null);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (e) {
      console.error('Failed to merge PR:', e);
    }
    setLoading(false);
  };

  const submitReview = async (event: 'COMMENT' | 'APPROVE' | 'REQUEST_CHANGES') => {
    if (!selectedPR) return;
    setLoading(true);
    try {
      await fetch('/api/github/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          pr: selectedPR.number,
          event,
          body: commentText,
        }),
      });
      setCommentText('');
      await loadPRDetails(selectedPR.number);
    } catch (e) {
      console.error('Failed to submit review:', e);
    }
    setLoading(false);
  };

  const addInlineComment = async (path: string, line: number, side: 'LEFT' | 'RIGHT', body: string) => {
    if (!selectedPR) return;
    try {
      await fetch('/api/github/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          pr: selectedPR.number,
          body,
          path,
          line,
          side,
          commit_id: selectedPR.head.sha,
        }),
      });
      await loadPRDetails(selectedPR.number);
    } catch (e) {
      console.error('Failed to add inline comment:', e);
    }
  };

  const replyToComment = async (commentId: number, body: string) => {
    if (!selectedPR) return;
    try {
      await fetch('/api/github/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          pr: selectedPR.number,
          body,
          in_reply_to: commentId,
        }),
      });
      await loadPRDetails(selectedPR.number);
    } catch (e) {
      console.error('Failed to reply to comment:', e);
    }
  };

  useEffect(() => {
    if (repo && token) {
      loadPRs();
      loadTracking();
    }
  }, [repo, token, loadPRs, loadTracking]);

  const filteredPRs = filter === 'watching' 
    ? prs.filter(pr => tracking[pr.number]?.is_watching)
    : prs;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: 8, borderBottom: '1px solid #3c3c3c', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 500, fontSize: 13 }}>Pull Requests</span>
        <div style={{ flex: 1 }} />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as 'all' | 'watching')}
          style={{
            padding: '4px 6px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            fontSize: 11,
          }}
        >
          <option value="all">All</option>
          <option value="watching">Watching</option>
        </select>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            padding: '4px 8px',
            background: '#238636',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          + New PR
        </button>
        <button
          onClick={loadPRs}
          disabled={loading}
          style={{
            padding: '4px 8px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          ↻
        </button>
      </div>

      {/* Create PR Form */}
      {showCreate && (
        <div style={{ padding: 12, borderBottom: '1px solid #3c3c3c', background: '#1e1e1e' }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#888' }}>
            {branch} → {newPR.base}
          </div>
          <input
            value={newPR.title}
            onChange={e => setNewPR(p => ({ ...p, title: e.target.value }))}
            placeholder="PR title"
            style={{
              width: '100%',
              padding: 8,
              background: '#3c3c3c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontSize: 13,
              marginBottom: 8,
              boxSizing: 'border-box',
            }}
          />
          <textarea
            value={newPR.body}
            onChange={e => setNewPR(p => ({ ...p, body: e.target.value }))}
            placeholder="Description (optional)"
            rows={3}
            style={{
              width: '100%',
              padding: 8,
              background: '#3c3c3c',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontSize: 13,
              marginBottom: 8,
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              value={newPR.base}
              onChange={e => setNewPR(p => ({ ...p, base: e.target.value }))}
              style={{
                padding: 8,
                background: '#3c3c3c',
                border: 'none',
                borderRadius: 4,
                color: '#fff',
                fontSize: 13,
              }}
            >
              <option value="main">main</option>
              <option value="dev">dev</option>
              <option value="staging">staging</option>
            </select>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setShowCreate(false)}
              style={{ padding: '8px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={createPR}
              disabled={loading || !newPR.title.trim()}
              style={{ padding: '8px 12px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* PR List or Details */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {selectedPR ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Back button & header */}
            <div style={{ padding: 12, borderBottom: '1px solid #3c3c3c' }}>
              <button
                onClick={() => { setSelectedPR(null); setTab('conversation'); }}
                style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', marginBottom: 8, padding: 0 }}
              >
                ← Back to list
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: 14, flex: 1 }}>
                  #{selectedPR.number} {selectedPR.title}
                </h3>
                <button
                  onClick={() => toggleWatch(selectedPR.number)}
                  style={{
                    padding: '4px 8px',
                    background: tracking[selectedPR.number]?.is_watching ? '#58a6ff' : '#3c3c3c',
                    border: 'none',
                    borderRadius: 4,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  {tracking[selectedPR.number]?.is_watching ? '★' : '☆'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11 }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: selectedPR.state === 'open' ? '#238636' : selectedPR.merged_at ? '#8957e5' : '#da3633',
                  color: '#fff',
                }}>
                  {selectedPR.merged_at ? 'Merged' : selectedPR.state}
                </span>
                <span style={{ color: '#888' }}>
                  {selectedPR.head.ref} → {selectedPR.base.ref}
                </span>
                <span style={{ color: '#888' }}>
                  +{selectedPR.additions} -{selectedPR.deletions}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #3c3c3c' }}>
              <button
                onClick={() => setTab('conversation')}
                style={{
                  flex: 1,
                  padding: 8,
                  background: tab === 'conversation' ? '#1e1e1e' : 'transparent',
                  border: 'none',
                  borderBottom: tab === 'conversation' ? '2px solid #58a6ff' : '2px solid transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Conversation
              </button>
              <button
                onClick={() => setTab('files')}
                style={{
                  flex: 1,
                  padding: 8,
                  background: tab === 'files' ? '#1e1e1e' : 'transparent',
                  border: 'none',
                  borderBottom: tab === 'files' ? '2px solid #58a6ff' : '2px solid transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Files ({selectedPR.changed_files || 0})
              </button>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {tab === 'conversation' ? (
                <div style={{ padding: 12 }}>
                  {/* Notes */}
                  <div style={{ marginBottom: 16, padding: 8, background: '#252526', borderRadius: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>My Notes</span>
                      <button
                        onClick={() => setShowNotes(!showNotes)}
                        style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', fontSize: 11, padding: 0 }}
                      >
                        {showNotes ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    {showNotes ? (
                      <div>
                        <textarea
                          value={noteText}
                          onChange={e => setNoteText(e.target.value)}
                          placeholder="Add private notes..."
                          rows={2}
                          style={{
                            width: '100%',
                            padding: 8,
                            background: '#3c3c3c',
                            border: 'none',
                            borderRadius: 4,
                            color: '#fff',
                            fontSize: 12,
                            marginBottom: 8,
                            resize: 'vertical',
                            boxSizing: 'border-box',
                          }}
                        />
                        <button
                          onClick={saveNotes}
                          style={{ padding: '4px 12px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: tracking[selectedPR.number]?.notes ? '#ccc' : '#666' }}>
                        {tracking[selectedPR.number]?.notes || 'No notes'}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {selectedPR.state === 'open' && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      <button
                        onClick={() => onCheckout(selectedPR.head.ref)}
                        style={{ padding: '6px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                      >
                        Checkout
                      </button>
                      <button
                        onClick={() => mergePR(selectedPR.number, 'squash')}
                        disabled={selectedPR.mergeable === false}
                        style={{
                          padding: '6px 12px',
                          background: selectedPR.mergeable === false ? '#3c3c3c' : '#238636',
                          border: 'none',
                          borderRadius: 4,
                          color: '#fff',
                          cursor: selectedPR.mergeable === false ? 'not-allowed' : 'pointer',
                          fontSize: 12,
                        }}
                      >
                        Squash & Merge
                      </button>
                      {selectedPR.mergeable === false && (
                        <span style={{ fontSize: 11, color: '#da3633', alignSelf: 'center' }}>
                          Has conflicts
                        </span>
                      )}
                    </div>
                  )}

                  {/* Reviews */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Reviews</div>
                    {reviews.length === 0 ? (
                      <div style={{ color: '#888', fontSize: 12 }}>No reviews yet</div>
                    ) : (
                      reviews.map(r => (
                        <div key={r.id} style={{ padding: 8, background: '#252526', borderRadius: 4, marginBottom: 8, fontSize: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontWeight: 500 }}>{r.user?.login}</span>
                            <span style={{
                              padding: '1px 6px',
                              borderRadius: 4,
                              fontSize: 10,
                              background: r.state === 'APPROVED' ? '#238636' : r.state === 'CHANGES_REQUESTED' ? '#da3633' : '#3c3c3c',
                            }}>
                              {r.state}
                            </span>
                          </div>
                          {r.body && <div style={{ color: '#ccc' }}>{r.body}</div>}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review */}
                  {selectedPR.state === 'open' && (
                    <div>
                      <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Leave a review comment..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: 8,
                          background: '#3c3c3c',
                          border: 'none',
                          borderRadius: 4,
                          color: '#fff',
                          fontSize: 13,
                          marginBottom: 8,
                          resize: 'vertical',
                          boxSizing: 'border-box',
                        }}
                      />
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          onClick={() => submitReview('COMMENT')}
                          style={{ padding: '6px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                        >
                          Comment
                        </button>
                        <button
                          onClick={() => submitReview('APPROVE')}
                          style={{ padding: '6px 12px', background: '#238636', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => submitReview('REQUEST_CHANGES')}
                          disabled={!commentText.trim()}
                          style={{ padding: '6px 12px', background: '#da3633', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12, opacity: commentText.trim() ? 1 : 0.5 }}
                        >
                          Request Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Files tab - Diff viewer */
                <PRDiffViewer
                  repo={repo}
                  prNumber={selectedPR.number}
                  baseSha={selectedPR.base.sha}
                  headSha={selectedPR.head.sha}
                  token={token}
                  comments={inlineComments}
                  onAddComment={addInlineComment}
                  onReplyComment={replyToComment}
                />
              )}
            </div>
          </div>
        ) : (
          /* PR List */
          <div>
            {loading && prs.length === 0 ? (
              <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>Loading...</div>
            ) : filteredPRs.length === 0 ? (
              <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>
                {filter === 'watching' ? 'No watched PRs' : 'No pull requests'}
              </div>
            ) : (
              filteredPRs.map(pr => (
                <div
                  key={pr.number}
                  onClick={() => loadPRDetails(pr.number)}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #3c3c3c',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: pr.state === 'open' ? '#238636' : pr.merged_at ? '#8957e5' : '#da3633',
                    }} />
                    <span style={{ fontWeight: 500, fontSize: 13 }}>#{pr.number}</span>
                    {tracking[pr.number]?.is_watching && (
                      <span style={{ color: '#58a6ff', fontSize: 11 }}>★</span>
                    )}
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pr.title}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#888', display: 'flex', gap: 12 }}>
                    <span>{pr.head.ref}</span>
                    <span>+{pr.additions} -{pr.deletions}</span>
                    <span>{pr.comments + pr.review_comments} comments</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
