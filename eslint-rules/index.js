/**
 * Custom ESLint rules for Elevate LMS
 * These rules prevent common production-breaking patterns
 */
module.exports = {
  rules: {
    'no-unguarded-search-params': require('./no-unguarded-search-params'),
    'no-toplevel-api-clients': require('./no-toplevel-api-clients'),
  },
};
