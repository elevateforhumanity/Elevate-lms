# Bug Fix: Missing Radix Parameter in parseInt() Calls

## Summary

Fixed a widespread bug where `parseInt()` was called without the radix parameter across 27 API route files. This is a common JavaScript pitfall that can lead to unexpected parsing behavior.

## Bug Description

### The Problem

When `parseInt()` is called without a radix parameter, JavaScript attempts to determine the base automatically:
- Strings starting with "0x" are parsed as hexadecimal
- In older JavaScript versions (ES5 and earlier), strings starting with "0" could be parsed as octal
- This can lead to unexpected results, especially with user input

### Example of the Bug

```javascript
// Without radix - problematic
parseInt('08')  // Could return 0 in older JS (invalid octal)
parseInt('010') // Could return 8 (octal) instead of 10

// With radix - correct
parseInt('08', 10)  // Always returns 8
parseInt('010', 10) // Always returns 10
```

## Impact

### Severity: Medium
- **Functionality**: Could cause incorrect parsing of numeric inputs, especially pagination parameters, IDs, and counts
- **User Experience**: Potential for incorrect data filtering, pagination, or limit enforcement
- **Security**: Low risk, but could lead to unexpected behavior in edge cases

### Affected Areas

1. **Pagination**: Page numbers, limits, and offsets in API endpoints
2. **Webhook Processing**: Payment amounts and IDs in Stripe webhooks
3. **Query Parameters**: Various numeric filters and parameters
4. **Form Data**: Numeric fields from user submissions

## Files Changed

### API Routes (27 files)
- `app/api/webhooks/stripe/route.ts` - Payment processing (CRITICAL)
- `app/api/webhooks/route.ts` - Webhook delivery limits
- `app/api/v1/courses/route.ts` - Course pagination
- `app/api/v1/enrollments/route.ts` - Enrollment pagination
- `app/api/v1/users/route.ts` - User pagination
- `app/api/tax-filing/applications/route.ts` - Application queries
- `app/api/shop/apply/route.ts` - Business years calculation
- `app/api/vita/appointments/route.ts` - Dependent count
- `app/api/program-holder/apply/route.ts` - Student estimates
- `app/api/monitoring/stats/route.ts` - Time windows and limits
- `app/api/supersonic-cash/apply/route.ts` - Income calculations
- `app/api/audit-logs/route.ts` - Log pagination
- `app/api/cash-advances/applications/route.ts` - Application queries
- `app/api/social-media/campaigns/route.ts` - Campaign duration
- `app/api/hr/employees/route.ts` - Employee pagination
- `app/api/payments/route.ts` - Payment history limits
- `app/api/admin/videos/upload/route.ts` - Course/lesson IDs
- `app/api/admin/monitoring/errors/route.ts` - Error log pagination
- `app/api/admin/audit-logs/route.ts` - Audit log limits
- `app/api/admin/analytics/route.ts` - Analytics time ranges
- `app/api/moderation/route.ts` - Report limits
- `app/api/reports/wioa-quarterly/route.ts` - Quarter/year parsing
- `app/api/analytics/reports/wioa-quarterly/route.ts` - Quarter/year parsing
- `app/api/ai-studio/stock-media/route.ts` - Media pagination
- `app/api/export/route.ts` - Export limits
- `app/api/supersonic-fast-cash/careers/route.ts` - Experience years
- `app/api/referrals/route.ts` - Leaderboard limits

## Solution

Added the radix parameter `10` to all `parseInt()` calls to ensure consistent decimal parsing:

```javascript
// Before
const page = parseInt(searchParams.get('page') || '1');
const limit = parseInt(searchParams.get('limit') || '50');

// After
const page = parseInt(searchParams.get('page') || '1', 10);
const limit = parseInt(searchParams.get('limit') || '50', 10);
```

## Testing

### Unit Tests
Created comprehensive unit tests in `tests/unit/parseint-fix.test.ts` covering:
- Numbers with leading zeros
- Octal-looking strings (e.g., "0777", "0123")
- Normal decimal strings
- Invalid inputs
- Whitespace handling
- Pagination parameter patterns
- Fallback patterns used in the codebase

### Manual Testing Recommendations
1. Test pagination with various page numbers including "08", "09", "010"
2. Verify webhook processing with edge case amounts
3. Test form submissions with numeric fields containing leading zeros
4. Verify query parameter filtering with numeric values

## Best Practices Going Forward

1. **Always specify radix**: Use `parseInt(value, 10)` for decimal parsing
2. **ESLint rule**: Consider adding `radix` rule to ESLint configuration:
   ```json
   {
     "rules": {
       "radix": ["error", "always"]
     }
   }
   ```
3. **Code review**: Watch for `parseInt()` calls in new code
4. **Alternative**: Consider using `Number()` for simple decimal parsing:
   ```javascript
   const num = Number(value) || 0;
   ```

## References

- [MDN: parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [ESLint radix rule](https://eslint.org/docs/latest/rules/radix)
- [JavaScript parseInt() Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#description)

## Commit Information

- **Branch**: `fix/parseint-radix-parameter`
- **Commits**:
  - `681ab056`: Main fix across 27 API route files
  - `813bfd99`: Unit tests for the fix

## Next Steps

1. Merge this branch to main after review
2. Add ESLint radix rule to prevent future occurrences
3. Run full test suite to ensure no regressions
4. Monitor production logs for any parsing-related issues
