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
});

describe('GET /api/cars/makes', () => {
  it('returns each make once, in alphabetical order', async () => {
    const res = await request(app).get('/api/cars/makes');

    expect(res.status).toBe(200);
    expect(res.body).toContain('Toyota');
    expect(res.body).toEqual([...new Set(res.body)].sort());
  });
});
