import { execSync } from 'child_process';

let cachedVersion: string | null = null;

export function getAppVersion(): string {
  if (cachedVersion) {
    return cachedVersion;
  }

  try {
    // Try to get git commit hash
    const gitHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    cachedVersion = gitHash || process.env.APP_VERSION || 'unknown';
  } catch {
    cachedVersion = process.env.APP_VERSION || 'unknown';
  }

  return cachedVersion;
}
