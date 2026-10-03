import { Router } from 'express';

const router = Router();

// Kept in memory only, so the list resets whenever the server restarts.
const enquiries = [];

// POST /api/enquiries   body: { carId, name, email, phone, message }
router.post('/', (req, res) => {
  const { carId, name, email, phone, message } = req.body;

  const enquiry = {
    id: enquiries.length + 1,
    carId,
    name,
    email,
    phone,
    message,
    createdAt: new Date().toISOString(),
  };

  enquiries.push(enquiry);
  res.status(201).json(enquiry);
});

// GET /api/enquiries
router.get('/', (req, res) => {
  res.json(enquiries);
});

export default router;
