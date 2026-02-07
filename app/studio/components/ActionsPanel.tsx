'use client';

import { useState, useEffect, useCallback } from 'react';

interface WorkflowRun {
  id: number;
  name: string;
  workflow_id: number;
  head_branch: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
  event: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  actor: { login: string; avatar_url: string };
}

interface Workflow {
  id: number;
  name: string;
  path: string;
  state: string;
}

interface Job {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  started_at: string;
  completed_at: string | null;
  steps?: { name: string; status: string; conclusion: string | null; number: number }[];
}

interface WorkflowTracking {
  id: string;
  workflow_id: number;
  last_run_id: number | null;
  last_status: string | null;
  notifications_enabled: boolean;
}

interface ActionsPanelProps {
  repo: string;
  repoId?: string;
  branch: string;
  token: string;
  userId?: string;
}

export function ActionsPanel({ repo, repoId, branch, token, userId }: ActionsPanelProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [selectedRun, setSelectedRun] = useState<(WorkflowRun & { jobs: Job[] }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'runs' | 'workflows'>('runs');
  const [tracking, setTracking] = useState<Record<number, WorkflowTracking>>({});
  const [filter, setFilter] = useState<'all' | 'watched'>('all');

  // Load workflow tracking from database
  const loadTracking = useCallback(async () => {
    if (!userId || !repoId) return;
    try {
      const res = await fetch(`/api/studio/workflow-tracking?repo_id=${repoId}`, {
        headers: { 'x-user-id': userId },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const trackingMap: Record<number, WorkflowTracking> = {};
        data.forEach((t: WorkflowTracking) => {
          trackingMap[t.workflow_id] = t;
        });
        setTracking(trackingMap);
      }
    } catch (e) {
      console.error('Failed to load workflow tracking:', e);
    }
  }, [userId, repoId]);

  // Save workflow tracking to database
  const saveTracking = useCallback(async (workflowId: number, updates: Partial<WorkflowTracking>) => {
    if (!userId || !repoId) return;
    try {
      const existing = tracking[workflowId];
      if (existing) {
        const res = await fetch('/api/studio/workflow-tracking', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
          body: JSON.stringify({ id: existing.id, ...updates }),
        });
        const data = await res.json();
        setTracking(prev => ({ ...prev, [workflowId]: { ...prev[workflowId], ...data } }));
      } else {
        const res = await fetch('/api/studio/workflow-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
          body: JSON.stringify({ repo_id: repoId, workflow_id: workflowId, ...updates }),
        });
        const data = await res.json();
        setTracking(prev => ({ ...prev, [workflowId]: data }));
      }
    } catch (e) {
      console.error('Failed to save workflow tracking:', e);
    }
  }, [userId, repoId, tracking]);

  const toggleNotifications = async (workflowId: number) => {
    const current = tracking[workflowId]?.notifications_enabled ?? true;
    await saveTracking(workflowId, { notifications_enabled: !current });
  };

  const loadWorkflows = useCallback(async () => {
    if (!repo || !token) return;
    try {
      const res = await fetch(`/api/github/actions?repo=${repo}&type=workflows`, {
        headers: { 'x-gh-token': token },
      });
      const data = await res.json();
      if (Array.isArray(data)) setWorkflows(data);
    } catch (e) {
      console.error('Failed to load workflows:', e);
    }
  }, [repo, token]);

  const loadRuns = useCallback(async () => {
    if (!repo || !token) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/github/actions?repo=${repo}&branch=${branch}`, {
        headers: { 'x-gh-token': token },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setRuns(data);
        
        // Update tracking with latest run status
        if (userId && repoId) {
          const workflowRuns: Record<number, WorkflowRun> = {};
          data.forEach((run: WorkflowRun) => {
            if (!workflowRuns[run.workflow_id] || new Date(run.created_at) > new Date(workflowRuns[run.workflow_id].created_at)) {
              workflowRuns[run.workflow_id] = run;
            }
          });
          
          // Check for status changes and update tracking
          Object.entries(workflowRuns).forEach(([wfId, run]) => {
            const t = tracking[parseInt(wfId)];
            if (t && t.last_run_id !== run.id) {
              saveTracking(parseInt(wfId), { 
                last_run_id: run.id, 
                last_status: run.conclusion || run.status 
              });
            }
          });
        }
      }
    } catch (e) {
      console.error('Failed to load runs:', e);
    }
    setLoading(false);
  }, [repo, branch, token, userId, repoId, tracking, saveTracking]);

  const loadRunDetails = useCallback(async (runId: number) => {
    try {
      const res = await fetch(`/api/github/actions?repo=${repo}&run_id=${runId}`, {
        headers: { 'x-gh-token': token },
      });
      const data = await res.json();
      setSelectedRun(data);
    } catch (e) {
      console.error('Failed to load run details:', e);
    }
  }, [repo, token]);

  const triggerWorkflow = async (workflowId: number) => {
    setLoading(true);
    try {
      await fetch('/api/github/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          action: 'dispatch',
          workflow_id: workflowId,
          ref: branch,
        }),
      });
      
      // Track this workflow
      if (userId && repoId) {
        await saveTracking(workflowId, { notifications_enabled: true });
      }
      
      setTimeout(loadRuns, 2000);
    } catch (e) {
      console.error('Failed to trigger workflow:', e);
    }
    setLoading(false);
  };

  const rerunWorkflow = async (runId: number, failedOnly = false) => {
    setLoading(true);
    try {
      await fetch('/api/github/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          action: failedOnly ? 'rerun-failed' : 'rerun',
          run_id: runId,
        }),
      });
      setTimeout(loadRuns, 2000);
    } catch (e) {
      console.error('Failed to rerun workflow:', e);
    }
    setLoading(false);
  };

  const cancelWorkflow = async (runId: number) => {
    setLoading(true);
    try {
      await fetch('/api/github/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-gh-token': token },
        body: JSON.stringify({
          repo,
          action: 'cancel',
          run_id: runId,
        }),
      });
      setTimeout(loadRuns, 1000);
    } catch (e) {
      console.error('Failed to cancel workflow:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (repo && token) {
      loadWorkflows();
      loadRuns();
      loadTracking();
    }
  }, [repo, token, loadWorkflows, loadRuns, loadTracking]);

  // Auto-refresh running workflows
  useEffect(() => {
    const hasRunning = runs.some(r => r.status === 'in_progress' || r.status === 'queued');
    if (hasRunning) {
      const interval = setInterval(loadRuns, 10000);
      return () => clearInterval(interval);
    }
  }, [runs, loadRuns]);

  const getStatusIcon = (status: string, conclusion: string | null) => {
    if (status === 'in_progress') return '🔄';
    if (status === 'queued') return '⏳';
    if (conclusion === 'success') return '•';
    if (conclusion === 'failure') return '❌';
    if (conclusion === 'cancelled') return '⚪';
    return '⚪';
  };

  const getStatusColor = (status: string, conclusion: string | null) => {
    if (status === 'in_progress') return '#e2c08d';
    if (status === 'queued') return '#888';
    if (conclusion === 'success') return '#7ee787';
    if (conclusion === 'failure') return '#f85149';
    return '#888';
  };

  // Filter runs by watched workflows
  const filteredRuns = filter === 'watched'
    ? runs.filter(r => tracking[r.workflow_id]?.notifications_enabled)
    : runs;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #3c3c3c' }}>
        <button
          onClick={() => setTab('runs')}
          style={{
            flex: 1,
            padding: 8,
            background: tab === 'runs' ? '#1e1e1e' : 'transparent',
            border: 'none',
            borderBottom: tab === 'runs' ? '2px solid #0e639c' : '2px solid transparent',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          Runs
        </button>
        <button
          onClick={() => setTab('workflows')}
          style={{
            flex: 1,
            padding: 8,
            background: tab === 'workflows' ? '#1e1e1e' : 'transparent',
            border: 'none',
            borderBottom: tab === 'workflows' ? '2px solid #0e639c' : '2px solid transparent',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          Workflows
        </button>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as 'all' | 'watched')}
          style={{
            padding: '4px 6px',
            background: '#3c3c3c',
            border: 'none',
            borderRadius: 4,
            color: '#fff',
            fontSize: 10,
            margin: 4,
          }}
        >
          <option value="all">All</option>
          <option value="watched">Watched</option>
        </select>
        <button
          onClick={loadRuns}
          disabled={loading}
          style={{
            padding: '8px 12px',
            background: 'transparent',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          ↻
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {selectedRun ? (
          // Run details
          <div style={{ padding: 12 }}>
            <button
              onClick={() => setSelectedRun(null)}
              style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', marginBottom: 12, padding: 0 }}
            >
              ← Back
            </button>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span>{getStatusIcon(selectedRun.status, selectedRun.conclusion)}</span>
                <span style={{ fontWeight: 500, flex: 1 }}>{selectedRun.name}</span>
                <button
                  onClick={() => toggleNotifications(selectedRun.workflow_id)}
                  style={{
                    padding: '2px 6px',
                    background: tracking[selectedRun.workflow_id]?.notifications_enabled ? '#58a6ff' : '#3c3c3c',
                    border: 'none',
                    borderRadius: 4,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 10,
                  }}
                >
                  {tracking[selectedRun.workflow_id]?.notifications_enabled ? '🔔' : '🔕'}
                </button>
              </div>
              <div style={{ fontSize: 12, color: '#888' }}>
                {selectedRun.head_branch} • {selectedRun.event} • {selectedRun.head_sha.slice(0, 7)}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {selectedRun.status === 'in_progress' ? (
                <button
                  onClick={() => cancelWorkflow(selectedRun.id)}
                  style={{ padding: '6px 12px', background: '#da3633', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => rerunWorkflow(selectedRun.id)}
                    style={{ padding: '6px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                  >
                    Re-run all
                  </button>
                  {selectedRun.conclusion === 'failure' && (
                    <button
                      onClick={() => rerunWorkflow(selectedRun.id, true)}
                      style={{ padding: '6px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 12 }}
                    >
                      Re-run failed
                    </button>
                  )}
                </>
              )}
              <a
                href={selectedRun.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 12px', background: '#3c3c3c', border: 'none', borderRadius: 4, color: '#fff', textDecoration: 'none', fontSize: 12 }}
              >
                View on GitHub
              </a>
            </div>

            {/* Jobs */}
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Jobs</div>
            {selectedRun.jobs?.map(job => (
              <div
                key={job.id}
                style={{
                  padding: 12,
                  background: '#252526',
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span>{getStatusIcon(job.status, job.conclusion)}</span>
                  <span style={{ fontWeight: 500 }}>{job.name}</span>
                  <span style={{ color: '#888', fontSize: 11, marginLeft: 'auto' }}>
                    {job.completed_at && job.started_at
                      ? `${Math.round((new Date(job.completed_at).getTime() - new Date(job.started_at).getTime()) / 1000)}s`
                      : job.status}
                  </span>
                </div>
                {job.steps && (
                  <div style={{ marginLeft: 20 }}>
                    {job.steps.map(step => (
                      <div
                        key={step.number}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '4px 0',
                          fontSize: 12,
                          color: getStatusColor(step.status, step.conclusion),
                        }}
                      >
                        <span style={{ fontSize: 10 }}>{getStatusIcon(step.status, step.conclusion)}</span>
                        <span>{step.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : tab === 'runs' ? (
          // Runs list
          <div>
            {loading && runs.length === 0 ? (
              <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>Loading...</div>
            ) : filteredRuns.length === 0 ? (
              <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>
                {filter === 'watched' ? 'No watched workflow runs' : 'No workflow runs'}
              </div>
            ) : (
              filteredRuns.map(run => (
                <div
                  key={run.id}
                  onClick={() => loadRunDetails(run.id)}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #3c3c3c',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span>{getStatusIcon(run.status, run.conclusion)}</span>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{run.name}</span>
                    {tracking[run.workflow_id]?.notifications_enabled && (
                      <span style={{ fontSize: 10 }}>🔔</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#888', display: 'flex', gap: 8 }}>
                    <span>{run.head_branch}</span>
                    <span>{run.event}</span>
                    <span>{new Date(run.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Workflows list
          <div>
            {workflows.length === 0 ? (
              <div style={{ padding: 16, color: '#888', textAlign: 'center' }}>No workflows</div>
            ) : (
              workflows.map(wf => (
                <div
                  key={wf.id}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #3c3c3c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {wf.name}
                      {tracking[wf.id]?.notifications_enabled && (
                        <span style={{ fontSize: 10 }}>🔔</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: '#888' }}>{wf.path}</div>
                  </div>
                  <button
                    onClick={() => toggleNotifications(wf.id)}
                    style={{
                      padding: '4px 8px',
                      background: tracking[wf.id]?.notifications_enabled ? '#58a6ff' : '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: 10,
                    }}
                  >
                    {tracking[wf.id]?.notifications_enabled ? '🔔' : '🔕'}
                  </button>
                  <button
                    onClick={() => triggerWorkflow(wf.id)}
                    disabled={loading || wf.state !== 'active'}
                    style={{
                      padding: '6px 12px',
                      background: wf.state === 'active' ? '#238636' : '#3c3c3c',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      cursor: wf.state === 'active' ? 'pointer' : 'not-allowed',
                      fontSize: 12,
                    }}
                  >
                    Run
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
