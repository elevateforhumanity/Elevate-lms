/**
 * Format Utilities Tests
 * 
 * Tests for safe formatting functions that prevent runtime errors
 * when handling null/undefined values.
 */

import { describe, it, expect } from 'vitest';
import { safeFormatCurrency } from '../format-utils';

describe('safeFormatCurrency', () => {
  it('should format valid currency values correctly', () => {
    expect(safeFormatCurrency(1234.56)).toBe('$1,234.56');
    expect(safeFormatCurrency(0)).toBe('$0.00');
    expect(safeFormatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('should handle null values with fallback', () => {
    expect(safeFormatCurrency(null)).toBe('$0');
    expect(safeFormatCurrency(null, 'USD', 'N/A')).toBe('N/A');
  });

  it('should handle undefined values with fallback', () => {
    expect(safeFormatCurrency(undefined)).toBe('$0');
    expect(safeFormatCurrency(undefined, 'USD', 'Not available')).toBe('Not available');
  });

  it('should handle NaN values with fallback', () => {
    expect(safeFormatCurrency(NaN)).toBe('$0');
    expect(safeFormatCurrency(NaN, 'USD', 'Invalid')).toBe('Invalid');
  });

  it('should format negative values correctly', () => {
    expect(safeFormatCurrency(-500.25)).toBe('-$500.25');
    expect(safeFormatCurrency(-1000)).toBe('-$1,000.00');
  });

  it('should handle different currency codes', () => {
    expect(safeFormatCurrency(100, 'EUR')).toContain('100');
    expect(safeFormatCurrency(100, 'GBP')).toContain('100');
  });

  it('should handle decimal precision correctly', () => {
    expect(safeFormatCurrency(99.99)).toBe('$99.99');
    expect(safeFormatCurrency(0.01)).toBe('$0.01');
    expect(safeFormatCurrency(1.5)).toBe('$1.50');
  });
});
