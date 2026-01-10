# Browser Console Audit Report

**Date:** January 10, 2026  
**Platform:** Elevate for Humanity LMS  
**Version:** 2.0.0

---

## Executive Summary

This audit reviews all console statements in the codebase to identify logging patterns, debugging statements, and potential console pollution issues that could impact production performance and user experience.

### Overall Status: ✅ **Good with Minor Cleanup Needed**

**Key Findings:**
- ✅ Production console.log removal configured in Next.js
- ✅ Minimal console.log usage (16 instances)
- ✅ Appropriate console.error usage (137 instances)
- ✅ Minimal console.warn usage (10 instances)
- ❌ No debugger statements found
- ⚠️ Some console.log statements in compliance/integration code
- ⚠️ Inconsistent error logging patterns
- ⚠️ 26 TODO/FIXME comments

---

## Console Statement Analysis

### Summary Statistics

| Statement Type | Count | Status |
|----------------|-------|--------|
| `console.log` | 16 | ⚠️ Should be removed or replaced with logger |
| `console.error` | 137 | ✅ Acceptable for error handling |
| `console.warn` | 10 | ✅ Acceptable for warnings |
| `console.debug` | 0 | ✅ None found |
| `console.trace` | 0 | ✅ None found |
| `console.table` | 0 | ✅ None found |
| `debugger` | 0 | ✅ None found |
| TODO/FIXME | 26 | ⚠️ Should be reviewed |

---

## Detailed Findings

### 1. console.log Statements (16 instances)

#### Location Breakdown

**Compliance Integration Files (8 instances):**
```
/lib/compliance/ui3-integration.ts:53
/lib/compliance/ui3-integration.ts:199
/lib/compliance/credential-verification.ts:94
/lib/compliance/rapids-integration.ts:66
/lib/compliance/rapids-integration.ts:95
/lib/compliance/rapids-integration.ts:118
/lib/compliance/rapids-integration.ts:141
/lib/compliance/rapids-integration.ts:164
```

**Status:** ⚠️ **Should be replaced with logger**

**Example:**
```typescript
// lib/compliance/ui3-integration.ts:53
console.log('Submitting UI-3 wage match request:', {
  studentId,
  programId,
  // ...
});
```

**Issue:** These are integration logs that should use the centralized logger for proper tracking and filtering.

**Recommendation:**
```typescript
import { logger } from '@/lib/logger';

logger.info('Submitting UI-3 wage match request', {
  studentId,
  programId,
  // ...
});
```

---

**Indiana Automation (4 instances):**
```
/lib/compliance/indiana-automation.ts:138
/lib/compliance/indiana-automation.ts:149
/lib/compliance/indiana-automation.ts:691
/lib/compliance/indiana-automation.ts:708
```

**Status:** ⚠️ **Should be replaced with logger**

---

**Database Schema Guard (2 instances):**
```
/lib/db/schema-guard.ts:111
/lib/db/schema-guard.ts:118
```

**Status:** ⚠️ **Development-only logs, should be conditional**

**Example:**
```typescript
console.log(
  `\n📋 Verifying schema for table: ${tableName}`
);
console.log(`   ✓ ${col.name}: ${col.type}`);
```

**Recommendation:**
```typescript
if (process.env.NODE_ENV === 'development') {
  logger.debug(`Verifying schema for table: ${tableName}`);
  logger.debug(`Column: ${col.name}: ${col.type}`);
}
```

---

**Performance Monitoring (1 instance):**
```
/lib/performance.ts:108
```

**Status:** ⚠️ **Should use logger**

---

**Supabase Static Client (1 instance):**
```
/lib/supabase/static.ts:13
```

**Status:** ⚠️ **Warning message, should use console.warn or logger**

---

### 2. console.error Statements (137 instances)

#### Status: ✅ **Acceptable**

Console.error is appropriate for error handling and is preserved in production builds.

**Distribution:**
- Notification system: 11 instances
- Compliance/Integration: 3 instances
- Logging utilities: 5 instances
- OCR processing: 2 instances
- Database operations: 4 instances
- Various error handlers: 112 instances

**Example (Good Pattern):**
```typescript
// lib/notifications/notification-system.ts:63
try {
  // ... notification logic
} catch (error) {
  console.error('Error creating notification:', error);
  return { success: false, error };
}
```

**Note:** These are kept in production as configured in `next.config.mjs`:
```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```

---

### 3. console.warn Statements (10 instances)

#### Status: ✅ **Acceptable**

Console.warn is appropriate for non-critical warnings and is preserved in production.

**Locations:**
```
/lib/programs-loader.ts:35 - Programs directory not found
/lib/monitoring/performance.ts:41 - Slow resources detected
/lib/integrations/drake-software.ts:110 - Drake credentials not configured
/lib/supabase/client.ts:9 - Supabase credentials missing
/lib/audit-logger.ts:59 - Audit logging disabled
/lib/license-guard.ts:57 - License check skipped
```

**Example (Good Pattern):**
```typescript
// lib/supabase/client.ts:9
console.warn(
  '[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
  'Auth features disabled. Add these to your .env.local file to enable authentication.'
);
```

---

### 4. Error Handling Patterns

#### Issue: Inconsistent Error Variable Usage

**Found in `/lib/email/resend.ts`:**
```typescript
} catch (data: unknown) {
  console.error('[Email] Send error:', error);  // ❌ 'error' is not defined!
  return { success: false, error: error.message };
}
```

**Problem:** Catch parameter is named `data` but code references `error`.

**Fix:**
```typescript
} catch (error: unknown) {
  console.error('[Email] Send error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return { success: false, error: errorMessage };
}
```

---

## Production Configuration

### Next.js Console Removal

**Location:** `/next.config.mjs`

```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```

**Status:** ✅ **Properly Configured**

**Behavior:**
- **Development:** All console statements preserved
- **Production:** 
  - ✅ `console.log` removed
  - ✅ `console.debug` removed
  - ✅ `console.info` removed
  - ❌ `console.error` preserved
  - ❌ `console.warn` preserved

---

## Centralized Logging

### Logger Implementation

**Location:** `/lib/logger.ts`

**Features:**
- ✅ Multiple log levels (debug, info, warn, error)
- ✅ Environment-aware formatting
- ✅ JSON format for production
- ✅ Pretty format for development
- ✅ External service integration support
- ✅ Test environment handling

**Example Usage:**
```typescript
import { logger } from '@/lib/logger';

// Info logging
logger.info('User logged in', { userId: user.id });

// Error logging
logger.error('Database query failed', error, { query: 'SELECT ...' });

// Warning
logger.warn('Rate limit approaching', { remaining: 5 });

// Debug (development only)
logger.debug('Cache hit', { key: 'user:123' });
```

---

## Issues and Recommendations

### 🟡 Medium Priority

#### 1. Replace console.log with Logger

**Affected Files:**
- `/lib/compliance/ui3-integration.ts` (2 instances)
- `/lib/compliance/credential-verification.ts` (1 instance)
- `/lib/compliance/rapids-integration.ts` (5 instances)
- `/lib/compliance/indiana-automation.ts` (4 instances)
- `/lib/db/schema-guard.ts` (2 instances)
- `/lib/performance.ts` (1 instance)
- `/lib/supabase/static.ts` (1 instance)

**Recommendation:**
```bash
# Create a script to replace console.log with logger
# /scripts/replace-console-logs.sh

find lib -name "*.ts" -exec sed -i 's/console\.log(/logger.info(/g' {} \;
```

**Manual Review Required:** Some logs may need to be `logger.debug` instead of `logger.info`.

---

#### 2. Fix Error Variable Naming

**File:** `/lib/email/resend.ts`

**Current:**
```typescript
} catch (data: unknown) {
  console.error('[Email] Send error:', error);  // ❌ Wrong variable
  return { success: false, error: error.message };
}
```

**Fixed:**
```typescript
} catch (error: unknown) {
  console.error('[Email] Send error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return { success: false, error: errorMessage };
}
```

---

#### 3. Add Conditional Logging for Development

**File:** `/lib/db/schema-guard.ts`

**Current:**
```typescript
console.log(`\n📋 Verifying schema for table: ${tableName}`);
console.log(`   ✓ ${col.name}: ${col.type}`);
```

**Recommended:**
```typescript
if (process.env.NODE_ENV === 'development') {
  logger.debug(`Verifying schema for table: ${tableName}`);
  logger.debug(`Column verified: ${col.name}: ${col.type}`);
}
```

---

### 🟢 Low Priority

#### 4. Review TODO/FIXME Comments (26 instances)

**Recommendation:** Create issues for each TODO/FIXME and track them properly.

```bash
# Find all TODOs
grep -rn "TODO\|FIXME\|HACK\|XXX" app components lib --include="*.ts" --include="*.tsx"
```

---

## Best Practices

### For Developers

#### 1. Use Logger Instead of Console

**❌ Don't:**
```typescript
console.log('User created:', user);
```

**✅ Do:**
```typescript
import { logger } from '@/lib/logger';
logger.info('User created', { userId: user.id, email: user.email });
```

---

#### 2. Proper Error Logging

**❌ Don't:**
```typescript
catch (error) {
  console.log('Error:', error);
}
```

**✅ Do:**
```typescript
catch (error) {
  logger.error('Failed to create user', error as Error, {
    context: 'user-registration',
    timestamp: Date.now(),
  });
}
```

---

#### 3. Environment-Aware Logging

**❌ Don't:**
```typescript
console.log('Debug info:', data);
```

**✅ Do:**
```typescript
if (process.env.NODE_ENV === 'development') {
  logger.debug('Debug info', { data });
}
```

---

#### 4. Structured Logging

**❌ Don't:**
```typescript
console.log('User ' + userId + ' logged in at ' + timestamp);
```

**✅ Do:**
```typescript
logger.info('User logged in', {
  userId,
  timestamp,
  ip: request.ip,
  userAgent: request.headers['user-agent'],
});
```

---

## Testing Checklist

### Manual Testing

- [ ] Check browser console in development (should show all logs)
- [ ] Check browser console in production build (should only show errors/warnings)
- [ ] Verify logger outputs to console in development
- [ ] Verify logger formats correctly in production
- [ ] Test error logging with stack traces
- [ ] Verify no sensitive data in logs

### Automated Testing

```typescript
describe('Logging', () => {
  it('should not log in production', () => {
    process.env.NODE_ENV = 'production';
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Your code that logs
    logger.info('Test message');
    
    // In production, console.log should be removed by Next.js
    // But logger should still work
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
```

---

## Cleanup Script

### Automated Console.log Replacement

```bash
#!/bin/bash
# scripts/cleanup-console-logs.sh

echo "🧹 Cleaning up console.log statements..."

# Replace console.log with logger.info in lib directory
find lib -name "*.ts" -type f -exec sed -i.bak \
  's/console\.log(/logger.info(/g' {} \;

# Replace console.log with logger.debug in development-only files
find lib/db -name "*.ts" -type f -exec sed -i.bak \
  's/logger\.info(/logger.debug(/g' {} \;

# Remove backup files
find lib -name "*.bak" -delete

echo "✅ Cleanup complete!"
echo "⚠️  Please review changes and test before committing"
```

---

## Monitoring Recommendations

### 1. Set Up Log Aggregation

**Options:**
- Datadog
- Sentry (already installed)
- LogRocket
- CloudWatch (if on AWS)

**Configuration:**
```typescript
// lib/logger.ts
private async sendToExternalService(entry: LogEntry) {
  if (process.env.LOG_ENDPOINT) {
    await fetch(process.env.LOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  }
}
```

---

### 2. Set Up Alerts

**Critical Errors:**
- Database connection failures
- Authentication errors
- Payment processing errors

**Warning Thresholds:**
- Error rate > 1% of requests
- Slow API responses > 5 seconds
- High memory usage

---

## Conclusion

The codebase has **good console hygiene** overall:

### Strengths
- ✅ Production console.log removal configured
- ✅ Minimal console.log usage (16 instances)
- ✅ Centralized logger available
- ✅ No debugger statements
- ✅ Appropriate error/warn usage

### Areas for Improvement
1. Replace 16 console.log statements with logger
2. Fix error variable naming in email handler
3. Add conditional logging for development-only logs
4. Review and address 26 TODO/FIXME comments

### Priority Actions

1. **THIS WEEK:** Fix error variable naming in `/lib/email/resend.ts`
2. **THIS WEEK:** Replace console.log in compliance files with logger
3. **THIS MONTH:** Add conditional logging for development logs
4. **THIS MONTH:** Review and create issues for TODO/FIXME comments

### Success Metrics

- Zero console.log statements in production
- 100% error logging through centralized logger
- < 1% of requests generating errors
- All critical errors captured and alerted

---

**Report Generated:** January 10, 2026  
**Next Review:** February 10, 2026  
**Status:** ✅ Good - Minor cleanup recommended
