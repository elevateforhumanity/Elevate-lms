'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { WebContainerFile, ProcessOutput } from '../lib/webcontainer';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

export interface ServerInfo {
  url: string;
  port: number;
  status: 'starting' | 'running' | 'stopped';
}

export function useWebContainer() {
  const [booted, setBooted] = useState(false);
  const [booting, setBooting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [terminals, setTerminals] = useState<{ id: string; lines: TerminalLine[] }[]>([
    { id: 'main', lines: [] },
  ]);
  const [activeTerminal, setActiveTerminal] = useState('main');
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [installing, setInstalling] = useState(false);
  const processRef = useRef<any>(null);

  // Boot WebContainer
  const boot = useCallback(async () => {
    if (booted || booting || typeof window === 'undefined') return;
    
    setBooting(true);
    setError(null);
    
    addLine('main', 'system', 'Booting WebContainer...');
    
    try {
      const { bootWebContainer } = await import('../lib/webcontainer');
      await bootWebContainer();
      setBooted(true);
      addLine('main', 'system', 'WebContainer ready!');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      addLine('main', 'error', `Boot failed: ${msg}`);
    } finally {
      setBooting(false);
    }
  }, [booted, booting]);

  // Add line to terminal
  const addLine = useCallback((terminalId: string, type: TerminalLine['type'], content: string) => {
    setTerminals(prev => prev.map(t => 
      t.id === terminalId
        ? {
            ...t,
            lines: [...t.lines, {
              id: `${Date.now()}-${Math.random()}`,
              type,
              content,
              timestamp: new Date(),
            }],
          }
        : t
    ));
  }, []);

  // Clear terminal
  const clearTerminal = useCallback((terminalId: string) => {
    setTerminals(prev => prev.map(t =>
      t.id === terminalId ? { ...t, lines: [] } : t
    ));
  }, []);

  // Add new terminal
  const addTerminal = useCallback(() => {
    const id = `terminal-${Date.now()}`;
    setTerminals(prev => [...prev, { id, lines: [] }]);
    setActiveTerminal(id);
    return id;
  }, []);

  // Remove terminal
  const removeTerminal = useCallback((id: string) => {
    if (id === 'main') return; // Can't remove main terminal
    setTerminals(prev => prev.filter(t => t.id !== id));
    if (activeTerminal === id) {
      setActiveTerminal('main');
    }
  }, [activeTerminal]);

  // Mount files from GitHub
  const syncFiles = useCallback(async (files: WebContainerFile[]) => {
    if (typeof window === 'undefined') return false;
    
    if (!booted) {
      await boot();
    }
    
    addLine(activeTerminal, 'system', `Syncing ${files.length} files...`);
    
    try {
      const { mountFiles } = await import('../lib/webcontainer');
      await mountFiles(files);
      addLine(activeTerminal, 'system', 'Files synced!');
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      addLine(activeTerminal, 'error', `Sync failed: ${msg}`);
      return false;
    }
  }, [booted, boot, activeTerminal, addLine]);

  // Write single file
  const updateFile = useCallback(async (path: string, content: string) => {
    if (!booted || typeof window === 'undefined') return false;
    
    try {
      const { writeFile } = await import('../lib/webcontainer');
      await writeFile(path, content);
      return true;
    } catch (e) {
      console.error('Failed to write file:', e);
      return false;
    }
  }, [booted]);

  // Run command
  const runCommand = useCallback(async (command: string, terminalId?: string) => {
    const tid = terminalId || activeTerminal;
    
    if (!booted || typeof window === 'undefined') {
      addLine(tid, 'error', 'WebContainer not booted. Run boot() first.');
      return -1;
    }
    
    addLine(tid, 'input', `$ ${command}`);
    
    try {
      const { runShell } = await import('../lib/webcontainer');
      const exitCode = await runShell(command, (output) => {
        if (output.type === 'stdout' || output.type === 'stderr') {
          const lines = String(output.data).split('\n');
          lines.forEach(line => {
            if (line.trim()) {
              addLine(tid, output.type === 'stderr' ? 'error' : 'output', line);
            }
          });
        }
      });
      
      return exitCode;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      addLine(tid, 'error', msg);
      return -1;
    }
  }, [booted, activeTerminal, addLine]);

  // Install npm dependencies
  const install = useCallback(async () => {
    if (typeof window === 'undefined') return -1;
    
    if (!booted) {
      await boot();
    }
    
    setInstalling(true);
    addLine(activeTerminal, 'input', '$ npm install');
    
    try {
      const { installDependencies } = await import('../lib/webcontainer');
      const exitCode = await installDependencies((output) => {
        if (output.type === 'stdout' || output.type === 'stderr') {
          const lines = String(output.data).split('\n');
          lines.forEach(line => {
            if (line.trim()) {
              addLine(activeTerminal, output.type === 'stderr' ? 'error' : 'output', line);
            }
          });
        }
      });
      
      if (exitCode === 0) {
        addLine(activeTerminal, 'system', 'Dependencies installed!');
      } else {
        addLine(activeTerminal, 'error', `npm install failed with code ${exitCode}`);
      }
      
      return exitCode;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      addLine(activeTerminal, 'error', msg);
      return -1;
    } finally {
      setInstalling(false);
    }
  }, [booted, boot, activeTerminal, addLine]);

  // Start dev server
  const startServer = useCallback(async (command: string = 'npm run dev') => {
    if (typeof window === 'undefined') return false;
    
    if (!booted) {
      await boot();
    }
    
    addLine(activeTerminal, 'input', `$ ${command}`);
    
    try {
      const { startDevServer } = await import('../lib/webcontainer');
      const { process } = await startDevServer(
        command,
        (output) => {
          if (output.type === 'stdout' || output.type === 'stderr') {
            const lines = String(output.data).split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                addLine(activeTerminal, output.type === 'stderr' ? 'error' : 'output', line);
              }
            });
          }
        },
        (url, port) => {
          addLine(activeTerminal, 'system', `Server ready at ${url}`);
          setServers(prev => [
            ...prev.filter(s => s.port !== port),
            { url, port, status: 'running' },
          ]);
        }
      );
      
      processRef.current = process;
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      addLine(activeTerminal, 'error', msg);
      return false;
    }
  }, [booted, boot, activeTerminal, addLine]);

  // Stop server
  const stopServer = useCallback((port: number) => {
    if (processRef.current) {
      processRef.current.kill();
      processRef.current = null;
    }
    setServers(prev => prev.map(s =>
      s.port === port ? { ...s, status: 'stopped' } : s
    ));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        import('../lib/webcontainer').then(({ teardown }) => teardown());
      }
    };
  }, []);

  return {
    // State
    booted,
    booting,
    error,
    terminals,
    activeTerminal,
    servers,
    installing,
    
    // Actions
    boot,
    syncFiles,
    updateFile,
    runCommand,
    install,
    startServer,
    stopServer,
    addLine,
    clearTerminal,
    addTerminal,
    removeTerminal,
    setActiveTerminal,
  };
}
