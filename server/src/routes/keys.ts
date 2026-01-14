import { Router } from 'express';
import {
  createKey,
  listKeys,
  listKeysByOwner,
  getKeyById,
  getKeyUsage,
  revokeKey,
  regenerateKey,
} from '../services/keys.js';
import { getPlanById } from '../services/plans.js';
import type { UsageExport } from '../types.js';

const router = Router();

router.get('/', async (req, res) => {
  const ownerId = req.query.ownerId as string | undefined;

  // If ownerId provided, filter by owner (multi-tenant)
  const keys = ownerId ? await listKeysByOwner(ownerId) : await listKeys();
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
  const { name, planId, ownerId } = req.body;

  if (!name || !planId || !ownerId) {
    return res.status(400).json({ error: 'name, planId, and ownerId required' });
  }

  const plan = await getPlanById(planId);
  if (!plan) {
    return res.status(400).json({ error: 'Invalid planId' });
  }

  const key = await createKey(name, planId, ownerId);
  res.status(201).json({
    id: key.id,
    secret: key.secret,
    name: key.name,
    planId: key.planId,
    ownerId: key.ownerId,
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

// Usage export endpoint
router.get('/export/usage', async (req, res) => {
  const ownerId = req.query.ownerId as string | undefined;
  const format = (req.query.format as string) || 'json';

  const keys = ownerId ? await listKeysByOwner(ownerId) : await listKeys();

  const exports: UsageExport[] = [];

  for (const key of keys) {
    const usage = await getKeyUsage(key.id);
    const plan = await getPlanById(key.planId);

    exports.push({
      keyId: key.id,
      keyName: key.name,
      planName: plan?.name || 'Unknown',
      currentUsage: usage,
      monthlyQuota: plan?.monthlyQuota || 0,
      percentUsed: plan?.monthlyQuota ? Math.round((usage / plan.monthlyQuota) * 100) : 0,
    });
  }

  if (format === 'csv') {
    const csv = [
      'Key ID,Key Name,Plan,Current Usage,Monthly Quota,Percent Used',
      ...exports.map(e =>
        `${e.keyId},${e.keyName},${e.planName},${e.currentUsage},${e.monthlyQuota},${e.percentUsed}%`
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=usage-export.csv');
    return res.send(csv);
  }

  res.json(exports);
});

export default router;
