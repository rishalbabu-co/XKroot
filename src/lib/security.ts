import DOMPurify from 'dompurify';

export const sanitizeHtml = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};

export const validateInput = (input: string, type: 'email' | 'phone' | 'url'): boolean => {
  switch (type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    case 'phone':
      return /^\+?[\d\s-]{10,}$/.test(input);
    case 'url':
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
};

export const generateCSP = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.xkroot.ai https://firebaseapp.com",
    "frame-src 'none'",
    "object-src 'none'"
  ].join('; ');
};