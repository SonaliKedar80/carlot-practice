import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('POST /api/enquiries', () => {
  it('rejects a missing email and shows the other required-field errors', async () => {
    const res = await request(app).post('/api/enquiries').send({
      carId: 1,
      name: '',
      email: '',
      phone: '',
      message: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual({
      name: 'Name is required.',
      email: 'Email is required.',
      message: 'Message is required.',
    });
  });

  it('rejects an email that is not an email address', async () => {
    const res = await request(app).post('/api/enquiries').send({
      carId: 1,
      name: 'Ada',
      email: 'not-an-email',
      phone: '',
      message: 'Is this still available?',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBe('Enter a valid email address.');
  });

  it('rejects a phone number that is not a phone number', async () => {
    const res = await request(app).post('/api/enquiries').send({
      carId: 1,
      name: 'Ada',
      email: 'ada@example.com',
      phone: 'call me',
      message: 'Is this still available?',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.phone).toBe('Enter a valid phone number.');
  });

  it('accepts a blank phone and a formatted phone number', async () => {
    const blankPhone = await request(app).post('/api/enquiries').send({
      carId: 1,
      name: 'Ada',
      email: 'ada@example.com',
      phone: '',
      message: 'Is this still available?',
    });
    expect(blankPhone.status).toBe(201);

    const formatted = await request(app).post('/api/enquiries').send({
      carId: 1,
      name: 'Ada',
      email: 'ada@example.com',
      phone: '(416) 555-0100',
      message: 'Is this still available?',
    });
    expect(formatted.status).toBe(201);
    expect(formatted.body.phone).toBe('(416) 555-0100');
  });
});
