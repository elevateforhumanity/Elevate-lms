'use client';

// Dynamic import to avoid SSR issues - WebContainer SDK must only be loaded client-side
let WebContainerClass: any = null;

// Check if cross-origin isolation is enabled
export function isCrossOriginIsolated(): boolean {
  if (typeof window === 'undefined') return false;
  return window.crossOriginIsolated === true;
}

async function loadWebContainer() {
  if (typeof window === 'undefined') return null;
  
  // Check for cross-origin isolation
  if (!window.crossOriginIsolated) {
    console.warn('WebContainer requires cross-origin isolation. Headers may not be set correctly.');
  }
  
  if (!WebContainerClass) {
    // Use dynamic import with webpackIgnore to prevent bundling during SSR
    const module = await (eval('import("@webcontainer/api")') as Promise<any>);
    WebContainerClass = module.WebContainer;
  }
  return WebContainerClass;
}

let webcontainerInstance: any = null;
let bootPromise: Promise<any> | null = null;

export interface WebContainerFile {
  path: string;
  content: string;
}

export interface ProcessOutput {
  type: 'stdout' | 'stderr' | 'exit';
  data: string | number;
}

// Boot WebContainer (singleton)
export async function bootWebContainer(): Promise<any> {
  if (webcontainerInstance) {
    return webcontainerInstance;
  }

  if (bootPromise) {
    return bootPromise;
  }

  const WC = await loadWebContainer();
  if (!WC) {
    throw new Error('WebContainer not available in this environment');
  }

  bootPromise = WC.boot({ workdirName: 'project' });
  webcontainerInstance = await bootPromise;
  return webcontainerInstance;
}

// Get current instance
export function getWebContainer(): any | null {
  return webcontainerInstance;
}

// Check if booted
export function isBooted(): boolean {
  return webcontainerInstance !== null;
}

// Convert flat file list to WebContainer file system tree
export function filesToTree(files: WebContainerFile[]): Record<string, any> {
  const tree: Record<string, any> = {};

  for (const file of files) {
    const parts = file.path.split('/');
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[part] = {
          file: {
            contents: file.content,
          },
        };
      } else {
        if (!current[part]) {
          current[part] = {
            directory: {},
          };
        }
        current = current[part].directory;
      }
    }
  }

  return tree;
}

// Mount files to WebContainer
export async function mountFiles(files: WebContainerFile[]): Promise<void> {
  const wc = await bootWebContainer();
  const tree = filesToTree(files);
  await wc.mount(tree);
}

// Write a single file
export async function writeFile(path: string, content: string): Promise<void> {
  const wc = await bootWebContainer();
  
  // Ensure directory exists
  const dir = path.split('/').slice(0, -1).join('/');
  if (dir) {
    await wc.fs.mkdir(dir, { recursive: true });
  }
  
  await wc.fs.writeFile(path, content);
}

// Read a file
export async function readFile(path: string): Promise<string> {
  const wc = await bootWebContainer();
  const content = await wc.fs.readFile(path, 'utf-8');
  return content;
}

// Delete a file
export async function deleteFile(path: string): Promise<void> {
  const wc = await bootWebContainer();
  await wc.fs.rm(path);
}

// List directory
export async function readDir(path: string): Promise<string[]> {
  const wc = await bootWebContainer();
  const entries = await wc.fs.readdir(path);
  return entries;
}

// Run a command and get output
export async function runCommand(
  command: string,
  args: string[] = [],
  onOutput?: (output: ProcessOutput) => void
): Promise<number> {
  const wc = await bootWebContainer();
  
  const process = await wc.spawn(command, args);
  
  process.output.pipeTo(
    new WritableStream({
      write(data) {
        onOutput?.({ type: 'stdout', data });
      },
    })
  );

  const exitCode = await process.exit;
  onOutput?.({ type: 'exit', data: exitCode });
  
  return exitCode;
}

// Run shell command
export async function runShell(
  command: string,
  onOutput?: (output: ProcessOutput) => void
): Promise<number> {
  const wc = await bootWebContainer();
  
  const process = await wc.spawn('sh', ['-c', command]);
  
  process.output.pipeTo(
    new WritableStream({
      write(data) {
        onOutput?.({ type: 'stdout', data });
      },
    })
  );

  const exitCode = await process.exit;
  onOutput?.({ type: 'exit', data: exitCode });
  
  return exitCode;
}

// Start a dev server and get URL
export async function startDevServer(
  command: string = 'npm run dev',
  onOutput?: (output: ProcessOutput) => void,
  onServerReady?: (url: string, port: number) => void
): Promise<{ process: any; url: string | null }> {
  const wc = await bootWebContainer();
  
  const [cmd, ...args] = command.split(' ');
  const process = await wc.spawn(cmd, args);
  
  let serverUrl: string | null = null;

  process.output.pipeTo(
    new WritableStream({
      write(data) {
        onOutput?.({ type: 'stdout', data });
      },
    })
  );

  // Listen for server-ready event
  wc.on('server-ready', (port, url) => {
    serverUrl = url;
    onServerReady?.(url, port);
  });

  return { process, url: serverUrl };
}

// Install dependencies
export async function installDependencies(
  onOutput?: (output: ProcessOutput) => void
): Promise<number> {
  return runCommand('npm', ['install'], onOutput);
}

// Get preview URL for a port
export function getPreviewUrl(port: number): string | null {
  const wc = getWebContainer();
  if (!wc) return null;
  
  // WebContainer provides URLs in the format: https://{id}.webcontainer.io
  // The actual URL is provided via the server-ready event
  return null;
}

// Teardown WebContainer
export async function teardown(): Promise<void> {
  if (webcontainerInstance) {
    webcontainerInstance.teardown();
    webcontainerInstance = null;
    bootPromise = null;
  }
}
