import { Router } from 'express';
import {
  createWebhook,
  listWebhooksByOwner,
  getWebhookById,
  updateWebhook,
  deleteWebhook,
} from '../services/webhooks.js';
import type { WebhookEvent } from '../types.js';

const router = Router();

const VALID_EVENTS: WebhookEvent[] = ['quota.90_percent', 'quota.exceeded'];

router.get('/', async (req, res) => {
  const ownerId = req.query.ownerId as string | undefined;

  if (!ownerId) {
    return res.status(400).json({ error: 'ownerId required' });
  }

  const webhooks = await listWebhooksByOwner(ownerId);
  res.json(webhooks);
});

router.get('/:id', async (req, res) => {
  const webhook = await getWebhookById(req.params.id);
  if (!webhook) {
    return res.status(404).json({ error: 'Webhook not found' });
  }
  res.json(webhook);
});

router.post('/', async (req, res) => {
  const { ownerId, url, events } = req.body;

  if (!ownerId || !url || !events) {
    return res.status(400).json({ error: 'ownerId, url, and events required' });
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Validate events
  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'events must be a non-empty array' });
  }

  for (const event of events) {
    if (!VALID_EVENTS.includes(event)) {
      return res.status(400).json({
        error: `Invalid event: ${event}. Valid events: ${VALID_EVENTS.join(', ')}`,
      });
    }
  }

  const webhook = await createWebhook(ownerId, url, events);
  res.status(201).json(webhook);
});

router.patch('/:id', async (req, res) => {
  const { url, events, active } = req.body;

  // Validate URL if provided
  if (url !== undefined) {
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL' });
    }
  }

  // Validate events if provided
  if (events !== undefined) {
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'events must be a non-empty array' });
    }
    for (const event of events) {
      if (!VALID_EVENTS.includes(event)) {
        return res.status(400).json({
          error: `Invalid event: ${event}. Valid events: ${VALID_EVENTS.join(', ')}`,
        });
      }
    }
  }

  const webhook = await updateWebhook(req.params.id, { url, events, active });
  if (!webhook) {
    return res.status(404).json({ error: 'Webhook not found' });
  }
  res.json(webhook);
});

router.delete('/:id', async (req, res) => {
  const success = await deleteWebhook(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Webhook not found' });
  }
  res.json({ success: true, message: 'Webhook deleted' });
});

export default router;
