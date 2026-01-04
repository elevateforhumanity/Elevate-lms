/**
 * Error handling utilities for type-safe error management
 */

/**
 * Converts unknown error to Error instance
 */
export function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  if (error && typeof error === 'object' && 'message' in error) {
    return new Error(String(error.message));
  }
  return new Error(JSON.stringify(error));
}

/**
 * Extracts error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}

/**
 * Type guard for Error objects
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Safe error logging that handles unknown types
 */
export function logError(error: unknown, context?: string): void {
  const err = toError(error);
  const prefix = context ? `[${context}]` : '';
  console.error(`${prefix} ${err.message}`, err.stack);
}
