import { describe, expect, it } from 'vitest';
import { filterCars } from '../src/utils/filterCars.js';

const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', price: 20000, mileage: 40000 },
  { id: 2, make: 'Honda', model: 'Civic', price: 25000, mileage: 10000 },
  { id: 3, make: 'Toyota', model: 'Camry', price: 15000, mileage: 80000 },
];

describe('filterCars', () => {
  it('returns every car when no filters are provided', () => {
    expect(filterCars(cars)).toEqual(cars);
    expect(filterCars(cars, {})).toEqual(cars);
  });

  it('keeps cars of a matching make', () => {
    const result = filterCars(cars, { make: 'Toyota' });

    expect(result.map((car) => car.id)).toEqual([1, 3]);
  });

  it('matches a make regardless of capital letters', () => {
    const result = filterCars(cars, { make: 'toyota' });

    expect(result.map((car) => car.id)).toEqual([1, 3]);
  });

  it('returns no cars when the make has no matches', () => {
    expect(filterCars(cars, { make: 'Ford' })).toEqual([]);
  });

  it('keeps cars priced at or below the max price', () => {
    const result = filterCars(cars, { maxPrice: 20000 });

    expect(result.map((car) => car.id)).toEqual([1, 3]);
    expect(result.every((car) => car.price <= 20000)).toBe(true);
  });

  it('accepts a max price sent as text', () => {
    const result = filterCars(cars, { maxPrice: '15000' });

    expect(result.map((car) => car.id)).toEqual([3]);
  });

  it('ignores an empty max price', () => {
    expect(filterCars(cars, { maxPrice: '' })).toEqual(cars);
  });

  it('sorts the matches by mileage, lowest first', () => {
    const result = filterCars(cars, { sort: 'mileage' });

    expect(result.map((car) => car.mileage)).toEqual([10000, 40000, 80000]);
    expect(cars.map((car) => car.id)).toEqual([1, 2, 3]);
  });

  it('applies make, max price, and mileage sort together', () => {
    const result = filterCars(cars, {
      make: 'TOYOTA',
      maxPrice: 20000,
      sort: 'mileage',
    });

    expect(result.map((car) => car.id)).toEqual([1, 3]);
    expect(result.map((car) => car.mileage)).toEqual([40000, 80000]);
  });
});
