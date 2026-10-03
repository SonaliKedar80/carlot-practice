import { Router } from 'express';
import { validateEnquiry } from '../utils/validateEnquiry.js';

const router = Router();

// Kept in memory only, so the list resets whenever the server restarts.
const enquiries = [];

// POST /api/enquiries   body: { carId, name, email, phone, message }
router.post('/', (req, res) => {
  const errors = validateEnquiry(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const { carId, name, email, phone, message } = req.body;

  const enquiry = {
    id: enquiries.length + 1,
    carId,
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone ?? '').trim(),
    message: String(message).trim(),
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
