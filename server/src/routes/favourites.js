import { Router } from 'express';
import { cars } from '../data/cars.js';

const router = Router();

// Kept in memory only, so the list resets whenever the server restarts.
const favouriteIds = [];

// GET /api/favourites  ->  [1, 3, 5]
router.get('/', (req, res) => {
  res.json(favouriteIds);
});

// POST /api/favourites   body: { carId }
router.post('/', (req, res) => {
  const carId = Number(req.body.carId);
  const car = cars.find((item) => item.id === carId);

  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  if (!favouriteIds.includes(carId)) {
    favouriteIds.push(carId);
    return res.status(201).json(favouriteIds);
  }

  res.json(favouriteIds);
});

// DELETE /api/favourites/:carId
router.delete('/:carId', (req, res) => {
  const carId = Number(req.params.carId);
  const index = favouriteIds.indexOf(carId);

  if (index !== -1) {
    favouriteIds.splice(index, 1);
  }

  res.json(favouriteIds);
});

export default router;
