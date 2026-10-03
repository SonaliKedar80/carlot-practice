import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

async function clearFavourites() {
  const res = await request(app).get('/api/favourites');
  for (const id of res.body) {
    await request(app).delete(`/api/favourites/${id}`);
  }
}

describe('favourites', () => {
  afterEach(clearFavourites);

  it('adds a car id and lists it', async () => {
    const added = await request(app).post('/api/favourites').send({ carId: 3 });

    expect(added.status).toBe(201);
    expect(added.body).toEqual([3]);

    const listed = await request(app).get('/api/favourites');
    expect(listed.status).toBe(200);
    expect(listed.body).toEqual([3]);
  });

  it('does not store the same car twice', async () => {
    await request(app).post('/api/favourites').send({ carId: 3 });
    const again = await request(app).post('/api/favourites').send({ carId: 3 });

    expect(again.status).toBe(200);
    expect(again.body).toEqual([3]);
  });

  it('removes a saved car', async () => {
    await request(app).post('/api/favourites').send({ carId: 3 });
    const removed = await request(app).delete('/api/favourites/3');

    expect(removed.status).toBe(200);
    expect(removed.body).toEqual([]);
  });

  it('returns 404 when the car does not exist', async () => {
    const res = await request(app).post('/api/favourites').send({ carId: 999 });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Car not found' });
  });
});
