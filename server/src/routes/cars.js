import { Router } from 'express';
import { cars } from '../data/cars.js';
import { filterCars } from '../utils/filterCars.js';
import { paginate } from '../utils/paginate.js';

const router = Router();

// GET /api/cars?make=Toyota&maxPrice=20000&sort=mileage&page=1&pageSize=6
router.get('/', (req, res) => {
  const { make, maxPrice, sort } = req.query;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 6;

  const filtered = filterCars(cars, { make, maxPrice, sort });

  res.json(paginate(filtered, page, pageSize));
});

// GET /api/cars/makes  ->  ["Ford", "Honda", ...]
router.get('/makes', (req, res) => {
  const makes = [...new Set(cars.map((car) => car.make))].sort();
  res.json(makes);
});

// GET /api/cars/3  ->  the car with id 3, or 404
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((item) => item.id === id);

  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.json(car);
});

export default router;
