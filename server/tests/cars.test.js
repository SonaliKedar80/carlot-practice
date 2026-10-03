import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('GET /api/cars', () => {
  it('returns the first page of cars', async () => {
    const res = await request(app).get('/api/cars');

    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(6);
    expect(res.body.total).toBe(22);
    expect(res.body.page).toBe(1);
  });

  it('filters by make', async () => {
    const res = await request(app).get('/api/cars?make=Toyota');

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items.every((car) => car.make === 'Toyota')).toBe(true);
  });

  it('filters by max price and sorts by mileage, lowest first', async () => {
    const res = await request(app).get('/api/cars?maxPrice=20000&sort=mileage&make=');

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(4);
    expect(res.body.items.every((car) => car.price <= 20000)).toBe(true);

    const mileages = res.body.items.map((car) => car.mileage);
    expect(mileages).toEqual([...mileages].sort((a, b) => a - b));
  });

  it('applies make, max price, and mileage sort together', async () => {
    const res = await request(app).get('/api/cars?make=Toyota&maxPrice=25000&sort=mileage');

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items.every((car) => car.make === 'Toyota' && car.price <= 25000)).toBe(true);

    const mileages = res.body.items.map((car) => car.mileage);
    expect(mileages).toEqual([...mileages].sort((a, b) => a - b));
  });
});

describe('GET /api/cars/makes', () => {
  it('returns each make once, in alphabetical order', async () => {
    const res = await request(app).get('/api/cars/makes');

    expect(res.status).toBe(200);
    expect(res.body).toContain('Toyota');
    expect(res.body).toEqual([...new Set(res.body)].sort());
  });
});
