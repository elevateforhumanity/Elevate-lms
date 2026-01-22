import DOMPurify from 'isomorphic-dompurify';

// Secure HTML sanitization using DOMPurify
// Works on both server and client (isomorphic)
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'u', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'a', 'img', 'video', 'audio', 'source',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'blockquote', 'pre', 'code', 'span', 'div',
      'figure', 'figcaption', 'hr', 'sub', 'sup',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
      'width', 'height', 'style', 'colspan', 'rowspan', 'controls',
      'autoplay', 'loop', 'muted', 'poster', 'preload', 'type',
    ],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'],
    ADD_TAGS: [],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

// Strict sanitization for user-generated content (comments, messages)
export function sanitizeUserContent(dirty: string): string {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'code'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}

// Plain text only - strips all HTML
export function sanitizeToText(dirty: string): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
