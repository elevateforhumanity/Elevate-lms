'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Play, Square, Download, GitBranch, GitCommit, Loader2, CheckCircle, XCircle, Plus, Server, Trash2, MessageSquare, X, Maximize2, Minimize2, Video, Image, BookOpen, Wand2, LayoutGrid, Menu, ChevronLeft, Code, Eye, Bot, Terminal } from 'lucide-react';
import FileTree from '@/components/dev-studio/FileTree';
import WebContainerPreview from '@/components/dev-studio/WebContainerPreview';
import AIChat from '@/components/dev-studio/AIChat';
import { getRuntime } from '@/lib/devstudio/webcontainer/runtime';
import { getFS } from '@/lib/devstudio/fs';
import { injectEnvVars, getDefaultEnvConfig } from '@/lib/devstudio/env';

const CodeEditor = dynamic(() => import('@/components/dev-studio/CodeEditor'), { ssr: false });
const XTerminal = dynamic(() => import('@/components/dev-studio/XTerminal'), { ssr: false });

interface Environment { id: string; name: string; repo: string; branch: string; status: 'stopped' | 'starting' | 'running'; }
interface AIAgent { id: string; name: string; }

type MobileTab = 'files' | 'code' | 'preview' | 'ai' | 'terminal';

export default function DevStudioPage() {
  const terminalRef = useRef<any>(null);
  const [token, setToken] = useState('');
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('elevateforhumanity/Elevate-lms');
  const [branch, setBranch] = useState('dev');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'booting' | 'loading' | 'installing' | 'running' | 'error'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [activeEnvId, setActiveEnvId] = useState<string | null>(null);
  const [dirtyFiles, setDirtyFiles] = useState<string[]>([]);
  const [aiAgents, setAiAgents] = useState<AIAgent[]>([{ id: '1', name: 'Assistant 1' }]);
  const [activeAgentId, setActiveAgentId] = useState('1');
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('files');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSetup, setShowSetup] = useState(true); // Start with setup visible
  const [setupStep, setSetupStep] = useState<'github' | 'repo' | 'done'>('github');
  const [setupToken, setSetupToken] = useState('');
  const [setupRepo, setSetupRepo] = useState('elevateforhumanity/Elevate-lms');
  const [setupBranch, setSetupBranch] = useState('dev');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage after mount
    const t = localStorage.getItem('gh_token');
    const envs = localStorage.getItem('devstudio_envs');
    
    if (t && envs) {
      // Already set up - hide wizard
      setToken(t);
      loadRepos(t);
      setEnvironments(JSON.parse(envs));
      setShowSetup(false);
    } else if (t && !envs) {
      // Has token but no environments
      setToken(t);
      loadRepos(t);
      setSetupStep('repo');
    } else {
      // No token - show setup from step 1
      setSetupStep('github');
    }
    
    setIsLoading(false);
  }, []);

  const write = useCallback((d: string) => terminalRef.current?.write(d), []);
  useEffect(() => { getRuntime().onOutput(write); }, [write]);

  const loadRepos = async (t: string) => { const r = await fetch('/api/github/repos', { headers: { 'x-gh-token': t } }); if (r.ok) setRepos(await r.json()); };
  const connectGH = () => { const t = prompt('GitHub Token:'); if (t) { localStorage.setItem('gh_token', t); setToken(t); loadRepos(t); } };
  const saveEnvs = (e: Environment[]) => { setEnvironments(e); localStorage.setItem('devstudio_envs', JSON.stringify(e)); };

  const startEnv = async (env: Environment) => {
    console.log('Starting environment:', env);
    saveEnvs(environments.map(e => e.id === env.id ? { ...e, status: 'starting' } : e));
    setActiveEnvId(env.id); 
    setSelectedRepo(env.repo); 
    setBranch(env.branch); 
    setStatus('loading');
    
    try {
      // Load files from GitHub API
      console.log('Fetching files from:', env.repo, env.branch);
      write('\n⏳ Loading repository...\n');
      
      const url = `/api/github/tree?repo=${env.repo}&ref=${env.branch}`;
      console.log('Fetch URL:', url);
      
      const treeRes = await fetch(url, {
        headers: token ? { 'x-gh-token': token } : {},
      });
      
      console.log('Response status:', treeRes.status);
      
      if (!treeRes.ok) {
        throw new Error(`Failed to load repo: ${treeRes.status} ${treeRes.statusText}`);
      }
      
      const treeData = await treeRes.json();
      console.log('Tree data:', treeData?.files?.length, 'files');
      
      const filePaths = treeData.files?.map((f: any) => f.path) || [];
      setFiles(filePaths);
      
      write(`✓ Loaded ${filePaths.length} files\n`);
      console.log('Files loaded:', filePaths.length);
      
      setStatus('idle');
      saveEnvs(environments.map(e => e.id === env.id ? { ...e, status: 'running' } : e));
      write('\n✓ Environment ready\n');
      
    } catch (err) { 
      console.error('Start env error:', err);
      setStatus('error'); 
      const msg = err instanceof Error ? err.message : String(err);
      write(`\n✗ Error: ${msg}\n`);
      saveEnvs(environments.map(e => e.id === env.id ? { ...e, status: 'stopped' } : e));
    }
  };

  const stopEnv = async (id: string) => {
    await getRuntime().stopDevServer(); setPreviewUrl(null); setIsServerRunning(false);
    saveEnvs(environments.map(e => e.id === id ? { ...e, status: 'stopped' } : e));
    setActiveEnvId(null); setStatus('idle');
  };

  const openFile = async (p: string) => { 
    try {
      // Try WebContainer FS first
      const c = await getFS().readFile(p); 
      setSelectedFile(p); 
      setFileContent(c); 
    } catch {
      // Fall back to GitHub API
      try {
        const res = await fetch(`/api/github/file?repo=${selectedRepo}&path=${encodeURIComponent(p)}&ref=${branch}`, {
          headers: token ? { 'x-gh-token': token } : {},
        });
        if (res.ok) {
          const data = await res.json();
          setSelectedFile(p);
          setFileContent(data.content || '');
        }
      } catch (err) {
        console.error('Failed to open file:', err);
      }
    }
  };
  const onCodeChange = async (c: string) => { setFileContent(c); if (selectedFile) { await getFS().saveFile(selectedFile, c); setDirtyFiles(getFS().getDirtyFiles().map(f => f.path)); } };
  const applyAICode = async (filename: string, code: string) => { await getFS().saveFile(filename, code); if (selectedFile === filename) setFileContent(code); setDirtyFiles(getFS().getDirtyFiles().map(f => f.path)); };

  const install = async () => { setStatus('installing'); await getRuntime().installDeps(); setStatus('idle'); };
  const run = async () => { setStatus('running'); const { url } = await getRuntime().startDevServer(); setPreviewUrl(url); setIsServerRunning(true); };
  const stop = async () => { await getRuntime().stopDevServer(); setPreviewUrl(null); setIsServerRunning(false); setStatus('idle'); };

  const addAgent = () => { const id = Date.now().toString(); setAiAgents([...aiAgents, { id, name: `Assistant ${aiAgents.length + 1}` }]); setActiveAgentId(id); };
  const removeAgent = (id: string) => { if (aiAgents.length <= 1) return; setAiAgents(aiAgents.filter(a => a.id !== id)); if (activeAgentId === id) setActiveAgentId(aiAgents[0].id); };

  const completeSetup = async () => {
    // Save token
    if (setupToken) {
      localStorage.setItem('gh_token', setupToken);
      setToken(setupToken);
      await loadRepos(setupToken);
    }
    
    // Create environment
    const newEnv: Environment = {
      id: '1',
      name: setupRepo.split('/')[1] || 'My Project',
      repo: setupRepo,
      branch: setupBranch,
      status: 'stopped',
    };
    
    setEnvironments([newEnv]);
    localStorage.setItem('devstudio_envs', JSON.stringify([newEnv]));
    setSelectedRepo(setupRepo);
    setBranch(setupBranch);
    setShowSetup(false);
    
    // Auto-start the environment
    await startEnv(newEnv);
  };

  // Mobile tab content renderer
  const renderMobileContent = () => {
    switch (mobileTab) {
      case 'files':
        return (
          <div className="h-full flex flex-col">
            <div className="p-2 border-b border-[#30363d]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#8b949e] uppercase">Environments</span>
                <button onClick={() => { const n = prompt('Name:'); if (n) saveEnvs([...environments, { id: Date.now().toString(), name: n, repo: selectedRepo, branch, status: 'stopped' }]); }} className="p-1 hover:bg-[#30363d] rounded"><Plus className="w-3 h-3" /></button>
              </div>
              {!token ? (
                <button onClick={connectGH} className="w-full py-2 bg-[#238636] text-white text-xs rounded">Connect GitHub</button>
              ) : (
                <div className="space-y-1 max-h-32 overflow-auto">
                  {environments.map(env => (
                    <div key={env.id} className={`p-2 rounded text-xs ${activeEnvId === env.id ? 'bg-[#388bfd]/20 border border-[#388bfd]' : 'bg-[#161b22] border border-[#30363d]'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{env.name}</span>
                        <div className={`w-2 h-2 rounded-full ${env.status === 'running' ? 'bg-[#3fb950]' : 'bg-[#8b949e]'}`} />
                      </div>
                      <div className="flex gap-1 mt-1">
                        {env.status === 'running' ? (
                          <button onClick={() => stopEnv(env.id)} className="flex-1 py-1 bg-[#da3633] text-white rounded text-xs">Stop</button>
                        ) : (
                          <button onClick={() => startEnv(env)} className="flex-1 py-1 bg-[#238636] text-white rounded text-xs">Start</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-auto">
              <FileTree files={files} onFileSelect={(p) => { openFile(p); setMobileTab('code'); }} selectedFile={selectedFile} />
            </div>
          </div>
        );
      case 'code':
        return selectedFile ? <CodeEditor value={fileContent} onChange={onCodeChange} filePath={selectedFile} /> : <div className="flex items-center justify-center h-full text-[#8b949e]">Select a file</div>;
      case 'preview':
        return <WebContainerPreview url={previewUrl} isLoading={status === 'running' && !previewUrl} />;
      case 'ai':
        return <AIChat fileContext={selectedFile ? `File: ${selectedFile}\n\n${fileContent}` : undefined} onApplyCode={applyAICode} />;
      case 'terminal':
        return <XTerminal ref={terminalRef} />;
      default:
        return null;
    }
  };

  // Show loading while checking localStorage
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#58a6ff] animate-spin mx-auto mb-4" />
          <p className="text-[#8b949e]">Loading Dev Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* MOBILE LAYOUT */}
    <div className="md:hidden h-screen flex flex-col bg-[#0d1117] text-[#c9d1d9]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Dev Studio</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#21262d] rounded text-xs">
            {status === 'idle' && <CheckCircle className="w-3 h-3 text-[#3fb950]" />}
            {['booting','loading','installing','running'].includes(status) && <Loader2 className="w-3 h-3 animate-spin" />}
            {status === 'error' && <XCircle className="w-3 h-3 text-[#f85149]" />}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={install} disabled={status !== 'idle' || !files.length} className="p-2 bg-[#21262d] rounded disabled:opacity-50"><Download className="w-4 h-4" /></button>
          {isServerRunning ? (
            <button onClick={stop} className="p-2 bg-[#da3633] text-white rounded"><Square className="w-4 h-4" /></button>
          ) : (
            <button onClick={run} disabled={status !== 'idle' || !files.length} className="p-2 bg-[#238636] text-white rounded disabled:opacity-50"><Play className="w-4 h-4" /></button>
          )}
        </div>
      </header>

      {/* Mobile Content */}
      <div className="flex-1 overflow-hidden">
        {renderMobileContent()}
      </div>

      {/* Mobile Bottom Tabs */}
      <nav className="flex items-center justify-around py-2 bg-[#161b22] border-t border-[#30363d]">
        <button onClick={() => setMobileTab('files')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${mobileTab === 'files' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
          <Server className="w-5 h-5" /><span className="text-xs">Files</span>
        </button>
        <button onClick={() => setMobileTab('code')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${mobileTab === 'code' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
          <Code className="w-5 h-5" /><span className="text-xs">Code</span>
        </button>
        <button onClick={() => setMobileTab('preview')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${mobileTab === 'preview' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
          <Eye className="w-5 h-5" /><span className="text-xs">Preview</span>
        </button>
        <button onClick={() => setMobileTab('ai')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${mobileTab === 'ai' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
          <Bot className="w-5 h-5" /><span className="text-xs">AI</span>
        </button>
        <button onClick={() => setMobileTab('terminal')} className={`flex flex-col items-center gap-1 px-3 py-1 rounded ${mobileTab === 'terminal' ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
          <Terminal className="w-5 h-5" /><span className="text-xs">Term</span>
        </button>
      </nav>
    </div>

    {/* DESKTOP LAYOUT */}
    <div className="hidden md:flex h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Left: Environments + Files */}
      <div className="w-60 border-r border-[#30363d] flex flex-col">
        <div className="p-2 border-b border-[#30363d]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8b949e] uppercase">Environments</span>
            <button onClick={() => { const n = prompt('Name:'); if (n) saveEnvs([...environments, { id: Date.now().toString(), name: n, repo: selectedRepo, branch, status: 'stopped' }]); }} className="p-1 hover:bg-[#30363d] rounded"><Plus className="w-3 h-3" /></button>
          </div>
          {!token ? (
            <button onClick={connectGH} className="w-full py-2 bg-[#238636] text-white text-xs rounded">Connect GitHub</button>
          ) : (
            <div className="space-y-1">
              {environments.map(env => (
                <div key={env.id} className={`p-2 rounded text-xs cursor-pointer ${activeEnvId === env.id ? 'bg-[#388bfd]/20 border border-[#388bfd]' : 'bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{env.name}</span>
                    <div className={`w-2 h-2 rounded-full ${env.status === 'running' ? 'bg-[#3fb950]' : env.status === 'starting' ? 'bg-[#d29922] animate-pulse' : 'bg-[#8b949e]'}`} />
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[#8b949e]"><GitBranch className="w-3 h-3" />{env.branch}</div>
                  <div className="flex gap-1 mt-2">
                    {env.status === 'running' ? (
                      <button onClick={() => stopEnv(env.id)} className="flex-1 py-1 bg-[#da3633] text-white rounded text-xs">Stop</button>
                    ) : (
                      <button onClick={() => startEnv(env)} className="flex-1 py-1 bg-[#238636] text-white rounded text-xs">Start</button>
                    )}
                    <button onClick={() => saveEnvs(environments.filter(e => e.id !== env.id))} className="p-1 hover:bg-[#30363d] rounded"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto">
          <FileTree files={files} onFileSelect={openFile} selectedFile={selectedFile} />
        </div>
      </div>

      {/* Center: Editor + Terminal */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Dev Studio</span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#21262d] rounded text-xs">
              {status === 'idle' && <CheckCircle className="w-3 h-3 text-[#3fb950]" />}
              {['booting','loading','installing','running'].includes(status) && <Loader2 className="w-3 h-3 animate-spin" />}
              {status === 'error' && <XCircle className="w-3 h-3 text-[#f85149]" />}
              {status}
            </div>
            {/* Quick Links to Admin Tools */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-[#30363d]">
              <Link href="/admin/course-builder" className="flex items-center gap-1 px-2 py-1 hover:bg-[#30363d] rounded text-xs" title="Course Builder">
                <BookOpen className="w-3 h-3" /><span className="hidden lg:inline">Courses</span>
              </Link>
              <Link href="/admin/video-generator" className="flex items-center gap-1 px-2 py-1 hover:bg-[#30363d] rounded text-xs" title="Video Generator">
                <Video className="w-3 h-3" /><span className="hidden lg:inline">Videos</span>
              </Link>
              <Link href="/admin/media-studio" className="flex items-center gap-1 px-2 py-1 hover:bg-[#30363d] rounded text-xs" title="Media Studio">
                <Image className="w-3 h-3" /><span className="hidden lg:inline">Media</span>
              </Link>
              <Link href="/admin/course-studio-ai" className="flex items-center gap-1 px-2 py-1 hover:bg-[#30363d] rounded text-xs" title="AI Course Studio">
                <Wand2 className="w-3 h-3" /><span className="hidden lg:inline">AI Studio</span>
              </Link>
              <Link href="/admin" className="flex items-center gap-1 px-2 py-1 hover:bg-[#30363d] rounded text-xs" title="Admin Dashboard">
                <LayoutGrid className="w-3 h-3" /><span className="hidden lg:inline">Dashboard</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={install} disabled={status !== 'idle' || !files.length} className="px-2 py-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded text-xs disabled:opacity-50"><Download className="w-3 h-3 inline mr-1" />Install</button>
            {isServerRunning ? (
              <button onClick={stop} className="px-2 py-1 bg-[#da3633] text-white rounded text-xs"><Square className="w-3 h-3 inline mr-1" />Stop</button>
            ) : (
              <button onClick={run} disabled={status !== 'idle' || !files.length} className="px-2 py-1 bg-[#238636] text-white rounded text-xs disabled:opacity-50"><Play className="w-3 h-3 inline mr-1" />Run</button>
            )}
            <button disabled={!dirtyFiles.length} className="px-2 py-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded text-xs disabled:opacity-50"><GitCommit className="w-3 h-3 inline mr-1" />Commit{dirtyFiles.length > 0 && ` (${dirtyFiles.length})`}</button>
          </div>
        </div>
        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          {selectedFile ? <CodeEditor value={fileContent} onChange={onCodeChange} filePath={selectedFile} /> : <div className="flex items-center justify-center h-full text-[#8b949e]">Select a file</div>}
        </div>
        {/* Terminal */}
        <div className="h-36 border-t border-[#30363d]">
          <XTerminal ref={terminalRef} />
        </div>
      </div>

      {/* Right: Preview + AI Agents */}
      <div className={`flex flex-col border-l border-[#30363d] ${previewExpanded ? 'w-[50%]' : 'w-96'}`}>
        {/* Preview */}
        <div className="h-1/2 border-b border-[#30363d] flex flex-col">
          <div className="flex items-center justify-between px-3 py-1 bg-[#161b22] border-b border-[#30363d]">
            <span className="text-xs font-medium">Preview</span>
            <button onClick={() => setPreviewExpanded(!previewExpanded)} className="p-1 hover:bg-[#30363d] rounded">
              {previewExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          </div>
          <div className="flex-1">
            <WebContainerPreview url={previewUrl} isLoading={status === 'running' && !previewUrl} />
          </div>
        </div>
        {/* AI Agents */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1 bg-[#161b22] border-b border-[#30363d] overflow-x-auto">
            {aiAgents.map(a => (
              <div key={a.id} className={`flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer ${activeAgentId === a.id ? 'bg-[#388bfd] text-white' : 'bg-[#21262d] hover:bg-[#30363d]'}`} onClick={() => setActiveAgentId(a.id)}>
                <MessageSquare className="w-3 h-3" />{a.name}
                {aiAgents.length > 1 && <button onClick={(e) => { e.stopPropagation(); removeAgent(a.id); }} className="ml-1 hover:text-[#f85149]"><X className="w-3 h-3" /></button>}
              </div>
            ))}
            <button onClick={addAgent} className="p-1 hover:bg-[#30363d] rounded"><Plus className="w-3 h-3" /></button>
          </div>
          <div className="flex-1">
            <AIChat key={activeAgentId} fileContext={selectedFile ? `File: ${selectedFile}\n\n${fileContent}` : undefined} onApplyCode={applyAICode} />
          </div>
        </div>
      </div>
    </div>

    {/* Setup Wizard */}
    {showSetup && (
      <div className="fixed inset-0 bg-[#0d1117] z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#238636] to-[#58a6ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to Dev Studio</h1>
            <p className="text-[#8b949e]">Let's connect your GitHub repository</p>
          </div>

          {/* Step 1: GitHub Token */}
          {setupStep === 'github' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#c9d1d9] mb-2">GitHub Personal Access Token</label>
                <input
                  type="password"
                  value={setupToken}
                  onChange={(e) => setSetupToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] focus:border-[#58a6ff] focus:outline-none"
                />
                <p className="mt-2 text-xs text-[#8b949e]">
                  Need a token? <a href="https://github.com/settings/tokens/new?scopes=repo&description=Dev%20Studio" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Create one here</a> (select "repo" scope)
                </p>
              </div>
              <button
                onClick={() => {
                  if (setupToken) {
                    localStorage.setItem('gh_token', setupToken);
                    setToken(setupToken);
                    loadRepos(setupToken);
                    setSetupStep('repo');
                  }
                }}
                disabled={!setupToken}
                className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Repository */}
          {setupStep === 'repo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#c9d1d9] mb-2">Repository</label>
                <input
                  type="text"
                  value={setupRepo}
                  onChange={(e) => setSetupRepo(e.target.value)}
                  placeholder="owner/repo-name"
                  className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] focus:border-[#58a6ff] focus:outline-none"
                />
                {repos.length > 0 && (
                  <div className="mt-2 max-h-32 overflow-auto bg-[#0d1117] border border-[#30363d] rounded-lg">
                    {repos.slice(0, 10).map((r: any) => (
                      <button
                        key={r.full_name}
                        onClick={() => setSetupRepo(r.full_name)}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-[#21262d] ${setupRepo === r.full_name ? 'bg-[#21262d] text-[#58a6ff]' : 'text-[#c9d1d9]'}`}
                      >
                        {r.full_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c9d1d9] mb-2">Branch</label>
                <select
                  value={setupBranch}
                  onChange={(e) => setSetupBranch(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] focus:border-[#58a6ff] focus:outline-none"
                >
                  <option value="main">main</option>
                  <option value="dev">dev</option>
                  <option value="master">master</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSetupStep('github')}
                  className="flex-1 py-3 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-medium rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={completeSetup}
                  disabled={!setupRepo}
                  className="flex-1 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Coding
                </button>
              </div>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className={`w-2 h-2 rounded-full ${setupStep === 'github' ? 'bg-[#58a6ff]' : 'bg-[#30363d]'}`} />
            <div className={`w-2 h-2 rounded-full ${setupStep === 'repo' ? 'bg-[#58a6ff]' : 'bg-[#30363d]'}`} />
          </div>
        </div>
      </div>
    )}
    </>
  );
}
