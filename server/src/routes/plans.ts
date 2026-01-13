import { Router } from 'express';
import { createPlan, listPlans, getPlanById, updatePlan } from '../services/plans.js';

const router = Router();

router.get('/', async (_req, res) => {
  const plans = await listPlans();
  res.json(plans);
});

router.get('/:id', async (req, res) => {
  const plan = await getPlanById(req.params.id);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  res.json(plan);
});

router.post('/', async (req, res) => {
  const { name, monthlyQuota, rateLimit } = req.body;

  if (!name || !monthlyQuota) {
    return res.status(400).json({ error: 'name and monthlyQuota required' });
  }

  const plan = await createPlan(name, monthlyQuota, rateLimit);
  res.status(201).json(plan);
});

router.put('/:id', async (req, res) => {
  const { monthlyQuota, rateLimit } = req.body;

  const plan = await updatePlan(req.params.id, { monthlyQuota, rateLimit });
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  res.json(plan);
});

export default router;
