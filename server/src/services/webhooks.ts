import { nanoid } from 'nanoid';
import { redis } from './redis.js';
import type { Webhook, WebhookEvent, WebhookPayload } from '../types.js';

const WEBHOOK_PREFIX = 'webhook:';
const OWNER_WEBHOOKS = 'webhooks:owner:';

export async function createWebhook(
  ownerId: string,
  url: string,
  events: WebhookEvent[]
): Promise<Webhook> {
  const id = nanoid(12);

  const webhook: Webhook = {
    id,
    ownerId,
    url,
    events,
    active: true,
    createdAt: Date.now(),
  };

  await redis
    .multi()
    .hset(`${WEBHOOK_PREFIX}${id}`, {
      ...webhook,
      events: JSON.stringify(events),
    } as unknown as Record<string, string>)
    .sadd(`${OWNER_WEBHOOKS}${ownerId}`, id)
    .exec();

  return webhook;
}

export async function getWebhookById(id: string): Promise<Webhook | null> {
  const data = await redis.hgetall(`${WEBHOOK_PREFIX}${id}`);
  if (!data || !data.id) return null;

  return {
    ...data,
    events: JSON.parse(data.events || '[]'),
    active: data.active === 'true',
    createdAt: parseInt(data.createdAt, 10),
  } as unknown as Webhook;
}

export async function listWebhooksByOwner(ownerId: string): Promise<Webhook[]> {
  const ids = await redis.smembers(`${OWNER_WEBHOOKS}${ownerId}`);
  const webhooks: Webhook[] = [];

  for (const id of ids) {
    const webhook = await getWebhookById(id);
    if (webhook) {
      webhooks.push(webhook);
    }
  }

  return webhooks;
}

export async function deleteWebhook(id: string): Promise<boolean> {
  const webhook = await getWebhookById(id);
  if (!webhook) return false;

  await redis
    .multi()
    .del(`${WEBHOOK_PREFIX}${id}`)
    .srem(`${OWNER_WEBHOOKS}${webhook.ownerId}`, id)
    .exec();

  return true;
}

export async function updateWebhook(
  id: string,
  updates: Partial<Pick<Webhook, 'url' | 'events' | 'active'>>
): Promise<Webhook | null> {
  const webhook = await getWebhookById(id);
  if (!webhook) return null;

  const updateData: Record<string, string> = {};
  if (updates.url !== undefined) updateData.url = updates.url;
  if (updates.events !== undefined) updateData.events = JSON.stringify(updates.events);
  if (updates.active !== undefined) updateData.active = String(updates.active);

  if (Object.keys(updateData).length > 0) {
    await redis.hset(`${WEBHOOK_PREFIX}${id}`, updateData);
  }

  return getWebhookById(id);
}

export async function triggerWebhooks(
  ownerId: string,
  event: WebhookEvent,
  payload: WebhookPayload
): Promise<void> {
  const webhooks = await listWebhooksByOwner(ownerId);

  const activeWebhooks = webhooks.filter(
    (w) => w.active && w.events.includes(event)
  );

  // Fire webhooks in background (don't await)
  for (const webhook of activeWebhooks) {
    sendWebhook(webhook.url, payload).catch((err) => {
      console.error(`Webhook failed for ${webhook.id}:`, err.message);
    });
  }
}

async function sendWebhook(url: string, payload: WebhookPayload): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Throttl-Webhook/1.0',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}
