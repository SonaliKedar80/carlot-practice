import { describe, it, expect } from 'vitest';
import { formatPrice, formatMileage } from './format.js';

describe('formatPrice', () => {
  it('adds a dollar sign and thousands separator', () => {
    expect(formatPrice(23500)).toBe('$23,500');
  });
});

describe('formatMileage', () => {
  it('adds a thousands separator and the unit', () => {
    expect(formatMileage(41000)).toBe('41,000 km');
  });
});
