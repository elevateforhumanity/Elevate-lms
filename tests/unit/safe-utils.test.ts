/**
 * Unit tests for type-safe helpers from lib/safe.ts
 *
 * Tests the date() function which safely parses various input types
 * into Date objects with fallback support.
 */

import { describe, it, expect } from 'vitest';
import { date } from '../../lib/safe';

describe('date', () => {
  it('should return Date instance unchanged', () => {
    const input = new Date('2024-01-15');
    const result = date(input);
    expect(result).toBe(input);
    expect(result?.getFullYear()).toBe(2024);
  });

  it('should parse valid ISO date string', () => {
    const result = date('2024-06-20');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(5); // June is 0-indexed
    expect(result?.getDate()).toBe(20);
  });

  it('should parse valid timestamp number', () => {
    const timestamp = 1700000000000; // Nov 14, 2023
    const result = date(timestamp);
    expect(result).toBeInstanceOf(Date);
    expect(result?.getTime()).toBe(timestamp);
  });

  it('should return fallback for invalid string', () => {
    expect(date('not-a-date')).toBeNull();
    expect(date('invalid', new Date('2020-01-01'))).toEqual(new Date('2020-01-01'));
  });

  it('should return fallback for null and undefined', () => {
    expect(date(null)).toBeNull();
    expect(date(undefined)).toBeNull();
    const fallback = new Date('2023-01-01');
    expect(date(null, fallback)).toBe(fallback);
  });

  it('should return fallback for non-date types', () => {
    expect(date({})).toBeNull();
    expect(date([])).toBeNull();
    expect(date(true)).toBeNull();
  });
});
