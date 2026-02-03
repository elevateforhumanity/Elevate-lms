/**
 * Studio IDE Worker - Full development environment backend
 * 
 * Provides:
 * - Persistent file storage (R2)
 * - Real terminal sessions (Durable Objects)
 * - WebSocket connections for real-time updates
 * - Git operations
 */

import { WorkspaceDurableObject } from './workspace';
import { TerminalDurableObject } from './terminal';

export { WorkspaceDurableObject, TerminalDurableObject };

interface Env {
  WORKSPACE: DurableObjectNamespace;
  TERMINAL: DurableObjectNamespace;
  STUDIO_FILES: R2Bucket;
  STUDIO_META: KVNamespace;
  STUDIO_DB: D1Database;
  ENVIRONMENT: string;
  MAX_FILE_SIZE: string;
  MAX_WORKSPACE_SIZE: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route requests
      if (path.startsWith('/api/workspace')) {
        return handleWorkspaceRoutes(request, env, path);
      }
      
      if (path.startsWith('/api/files')) {
        return handleFileRoutes(request, env, path);
      }
      
      if (path.startsWith('/api/terminal')) {
        return handleTerminalRoutes(request, env, path);
      }
      
      if (path.startsWith('/api/git')) {
        return handleGitRoutes(request, env, path);
      }

      return jsonResponse({ error: 'Not found' }, 404);
    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },
};

// Workspace routes
async function handleWorkspaceRoutes(request: Request, env: Env, path: string): Promise<Response> {
  const userId = await getUserId(request);
  if (!userId) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  // GET /api/workspace - List workspaces
  if (request.method === 'GET' && path === '/api/workspace') {
    const workspaces = await env.STUDIO_DB.prepare(
      'SELECT * FROM workspaces WHERE user_id = ? ORDER BY updated_at DESC'
    ).bind(userId).all();
    return jsonResponse(workspaces.results);
  }

  // POST /api/workspace - Create workspace
  if (request.method === 'POST' && path === '/api/workspace') {
    const body = await request.json() as { name: string; description?: string; repoUrl?: string };
    const id = crypto.randomUUID();
    
    await env.STUDIO_DB.prepare(
      'INSERT INTO workspaces (id, user_id, name, description, repo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime(), datetime())'
    ).bind(id, userId, body.name, body.description || null, body.repoUrl || null).run();

    // Initialize workspace Durable Object
    const workspaceId = env.WORKSPACE.idFromName(`${userId}:${id}`);
    const workspace = env.WORKSPACE.get(workspaceId);
    await workspace.fetch(new Request('http://internal/init', {
      method: 'POST',
      body: JSON.stringify({ id, userId, name: body.name }),
    }));

    return jsonResponse({ id, name: body.name }, 201);
  }

  // GET /api/workspace/:id - Get workspace details
  const workspaceMatch = path.match(/^\/api\/workspace\/([^/]+)$/);
  if (request.method === 'GET' && workspaceMatch) {
    const workspaceId = workspaceMatch[1];
    const workspace = await env.STUDIO_DB.prepare(
      'SELECT * FROM workspaces WHERE id = ? AND user_id = ?'
    ).bind(workspaceId, userId).first();
    
    if (!workspace) {
      return jsonResponse({ error: 'Workspace not found' }, 404);
    }
    return jsonResponse(workspace);
  }

  // DELETE /api/workspace/:id - Delete workspace
  if (request.method === 'DELETE' && workspaceMatch) {
    const workspaceId = workspaceMatch[1];
    
    // Delete all files from R2
    const files = await env.STUDIO_FILES.list({ prefix: `${userId}/${workspaceId}/` });
    for (const file of files.objects) {
      await env.STUDIO_FILES.delete(file.key);
    }
    
    // Delete from database
    await env.STUDIO_DB.prepare(
      'DELETE FROM workspaces WHERE id = ? AND user_id = ?'
    ).bind(workspaceId, userId).run();

    return jsonResponse({ success: true });
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

// File routes
async function handleFileRoutes(request: Request, env: Env, path: string): Promise<Response> {
  const userId = await getUserId(request);
  if (!userId) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspace');
  if (!workspaceId) {
    return jsonResponse({ error: 'workspace parameter required' }, 400);
  }

  // Verify workspace ownership
  const workspace = await env.STUDIO_DB.prepare(
    'SELECT id FROM workspaces WHERE id = ? AND user_id = ?'
  ).bind(workspaceId, userId).first();
  
  if (!workspace) {
    return jsonResponse({ error: 'Workspace not found' }, 404);
  }

  const filePath = url.searchParams.get('path') || '';
  const r2Key = `${userId}/${workspaceId}/${filePath}`;

  // GET /api/files - List files or get file content
  if (request.method === 'GET') {
    if (url.searchParams.get('list') === 'true') {
      // List files in directory
      const prefix = filePath ? `${userId}/${workspaceId}/${filePath}/` : `${userId}/${workspaceId}/`;
      const files = await env.STUDIO_FILES.list({ prefix, delimiter: '/' });
      
      const result = {
        files: files.objects.map(obj => ({
          path: obj.key.replace(`${userId}/${workspaceId}/`, ''),
          size: obj.size,
          modified: obj.uploaded,
        })),
        directories: files.delimitedPrefixes.map(p => p.replace(`${userId}/${workspaceId}/`, '').replace(/\/$/, '')),
      };
      return jsonResponse(result);
    } else {
      // Get file content
      const file = await env.STUDIO_FILES.get(r2Key);
      if (!file) {
        return jsonResponse({ error: 'File not found' }, 404);
      }
      const content = await file.text();
      return jsonResponse({ path: filePath, content });
    }
  }

  // PUT /api/files - Create or update file
  if (request.method === 'PUT') {
    const body = await request.json() as { content: string };
    const maxSize = parseInt(env.MAX_FILE_SIZE);
    
    if (body.content.length > maxSize) {
      return jsonResponse({ error: `File too large. Max size: ${maxSize} bytes` }, 400);
    }

    await env.STUDIO_FILES.put(r2Key, body.content, {
      customMetadata: {
        userId,
        workspaceId,
        path: filePath,
        updatedAt: new Date().toISOString(),
      },
    });

    // Update workspace timestamp
    await env.STUDIO_DB.prepare(
      'UPDATE workspaces SET updated_at = datetime() WHERE id = ?'
    ).bind(workspaceId).run();

    return jsonResponse({ success: true, path: filePath });
  }

  // DELETE /api/files - Delete file
  if (request.method === 'DELETE') {
    await env.STUDIO_FILES.delete(r2Key);
    return jsonResponse({ success: true });
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// Terminal routes - WebSocket connection to Durable Object
async function handleTerminalRoutes(request: Request, env: Env, path: string): Promise<Response> {
  const userId = await getUserId(request);
  if (!userId) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspace');
  if (!workspaceId) {
    return jsonResponse({ error: 'workspace parameter required' }, 400);
  }

  // WebSocket upgrade for terminal
  if (path === '/api/terminal/connect') {
    const upgradeHeader = request.headers.get('Upgrade');
    if (upgradeHeader !== 'websocket') {
      return jsonResponse({ error: 'Expected WebSocket' }, 426);
    }

    // Get or create terminal Durable Object
    const terminalId = env.TERMINAL.idFromName(`${userId}:${workspaceId}`);
    const terminal = env.TERMINAL.get(terminalId);
    
    // Forward WebSocket to Durable Object
    return terminal.fetch(request);
  }

  // POST /api/terminal/exec - Execute single command (non-WebSocket)
  if (request.method === 'POST' && path === '/api/terminal/exec') {
    const body = await request.json() as { command: string };
    
    const terminalId = env.TERMINAL.idFromName(`${userId}:${workspaceId}`);
    const terminal = env.TERMINAL.get(terminalId);
    
    const response = await terminal.fetch(new Request('http://internal/exec', {
      method: 'POST',
      body: JSON.stringify({ command: body.command, userId, workspaceId }),
    }));
    
    return response;
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

// Git routes
async function handleGitRoutes(request: Request, env: Env, path: string): Promise<Response> {
  const userId = await getUserId(request);
  if (!userId) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspace');
  if (!workspaceId) {
    return jsonResponse({ error: 'workspace parameter required' }, 400);
  }

  // POST /api/git/clone - Clone a repository
  if (request.method === 'POST' && path === '/api/git/clone') {
    const body = await request.json() as { repoUrl: string; branch?: string };
    
    // Use GitHub API to fetch repo contents
    const repoMatch = body.repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!repoMatch) {
      return jsonResponse({ error: 'Invalid GitHub URL' }, 400);
    }
    
    const [, owner, repo] = repoMatch;
    const branch = body.branch || 'main';
    
    // Fetch repo tree from GitHub API
    const treeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo.replace('.git', '')}/git/trees/${branch}?recursive=1`,
      { headers: { 'User-Agent': 'Elevate-Studio' } }
    );
    
    if (!treeResponse.ok) {
      return jsonResponse({ error: 'Failed to fetch repository' }, 400);
    }
    
    const tree = await treeResponse.json() as { tree: Array<{ path: string; type: string; sha: string }> };
    
    // Fetch and store each file
    let filesCloned = 0;
    for (const item of tree.tree) {
      if (item.type === 'blob') {
        const contentResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo.replace('.git', '')}/contents/${item.path}?ref=${branch}`,
          { headers: { 'User-Agent': 'Elevate-Studio', 'Accept': 'application/vnd.github.raw' } }
        );
        
        if (contentResponse.ok) {
          const content = await contentResponse.text();
          const r2Key = `${userId}/${workspaceId}/${item.path}`;
          await env.STUDIO_FILES.put(r2Key, content);
          filesCloned++;
        }
      }
    }

    // Update workspace with repo info
    await env.STUDIO_DB.prepare(
      'UPDATE workspaces SET repo_url = ?, repo_branch = ?, updated_at = datetime() WHERE id = ?'
    ).bind(body.repoUrl, branch, workspaceId).run();

    return jsonResponse({ success: true, filesCloned });
  }

  // POST /api/git/push - Push changes (creates PR or commits)
  if (request.method === 'POST' && path === '/api/git/push') {
    // This would require GitHub OAuth token from user
    // For now, return instructions
    return jsonResponse({ 
      error: 'GitHub authentication required',
      message: 'Connect your GitHub account in settings to push changes'
    }, 400);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

// Helper functions
async function getUserId(request: Request): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  // In production, verify JWT with Supabase
  // For now, extract user ID from token payload
  const token = authHeader.slice(7);
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
