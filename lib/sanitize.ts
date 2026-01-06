// Client-side only sanitization to avoid jsdom SSR issues
export function sanitizeHtml(dirty: string): string {
  // On server, return as-is (assuming content is already sanitized in DB)
  // On client, use DOMPurify
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization without DOMPurify
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  }
  
  // Client-side: use DOMPurify dynamically
  // This will be tree-shaken on server builds
  const DOMPurify = require('isomorphic-dompurify');
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}
