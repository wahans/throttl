import { Router } from 'express';
import {
  createKey,
  listKeys,
  getKeyById,
  getKeyUsage,
  revokeKey,
  regenerateKey,
} from '../services/keys.js';
import { getPlanById } from '../services/plans.js';

const router = Router();

router.get('/', async (_req, res) => {
  const keys = await listKeys();
  res.json(keys);
});

router.get('/:id', async (req, res) => {
  const key = await getKeyById(req.params.id);
  if (!key) {
    return res.status(404).json({ error: 'Key not found' });
  }

  const usage = await getKeyUsage(key.id);
  const plan = await getPlanById(key.planId);

  const { secret, ...safeKey } = key;
  res.json({
    ...safeKey,
    usage: {
      current: usage,
      limit: plan?.monthlyQuota || 0,
      remaining: Math.max(0, (plan?.monthlyQuota || 0) - usage),
    },
  });
});

router.post('/', async (req, res) => {
  const { name, planId } = req.body;

  if (!name || !planId) {
    return res.status(400).json({ error: 'name and planId required' });
  }

  const plan = await getPlanById(planId);
  if (!plan) {
    return res.status(400).json({ error: 'Invalid planId' });
  }

  const key = await createKey(name, planId);
  res.status(201).json({
    id: key.id,
    secret: key.secret,
    name: key.name,
    planId: key.planId,
    message: 'Store this secret securely - it will not be shown again',
  });
});

router.delete('/:id', async (req, res) => {
  const success = await revokeKey(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Key not found' });
  }
  res.json({ success: true, message: 'Key revoked' });
});

router.post('/:id/regenerate', async (req, res) => {
  const newSecret = await regenerateKey(req.params.id);
  if (!newSecret) {
    return res.status(404).json({ error: 'Key not found' });
  }
  res.json({
    secret: newSecret,
    message: 'Store this secret securely - it will not be shown again',
  });
});

export default router;
