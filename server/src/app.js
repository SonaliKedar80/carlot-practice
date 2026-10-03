import express from 'express';
import carsRouter from './routes/cars.js';
import enquiriesRouter from './routes/enquiries.js';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/cars', carsRouter);
  app.use('/api/enquiries', enquiriesRouter);

  // Anything under /api that no route handled
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Central error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

  return app;
}
