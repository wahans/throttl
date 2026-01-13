import { Router } from 'express';
import { validateAndIncrement } from '../services/usage.js';

const router = Router();

router.post('/', async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ valid: false, error: 'key required' });
  }

  const result = await validateAndIncrement(key);

  if (!result.valid) {
    const status = result.error === 'quota_exceeded' ? 429 : 401;
    return res.status(status).json(result);
  }

  res.json(result);
});

export default router;
