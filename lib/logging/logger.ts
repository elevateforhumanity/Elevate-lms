import { redactSecrets } from './redact';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: any;
}

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...redactSecrets(meta || {}),
  };

  const output = JSON.stringify(entry);

  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      break;
    default:
  }
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    log('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    log('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    log('error', message, meta),
};
