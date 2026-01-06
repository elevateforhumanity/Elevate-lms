// Simple sanitization without external dependencies
// Avoids jsdom/DOMPurify SSR issues
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  
  // Basic HTML sanitization - remove dangerous tags and attributes
  return dirty
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: protocol
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '')
    // Remove data: protocol (except images)
    .replace(/href\s*=\s*["']data:[^"']*["']/gi, '');
}
