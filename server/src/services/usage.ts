import { redis, getCurrentMonth } from './redis.js';
import { getKeyBySecret } from './keys.js';
import { getPlanById } from './plans.js';
import { triggerWebhooks } from './webhooks.js';
import type { ValidationResult, WebhookEvent } from '../types.js';

export async function validateAndIncrement(secret: string): Promise<ValidationResult> {
  const key = await getKeyBySecret(secret);

  if (!key) {
    return { valid: false, error: 'invalid_key' };
  }

  if (!key.active) {
    return { valid: false, error: 'key_inactive' };
  }

  const plan = await getPlanById(key.planId);
  if (!plan) {
    return { valid: false, error: 'invalid_key' };
  }

  const month = getCurrentMonth();
  const usageKey = `usage:${key.id}:${month}`;
  const notifiedKey = `notified:${key.id}:${month}`;

  const currentUsage = await redis.incr(usageKey);

  // Set TTL of 90 days on first use each month
  if (currentUsage === 1) {
    await redis.expire(usageKey, 90 * 24 * 60 * 60);
  }

  const percentUsed = (currentUsage / plan.monthlyQuota) * 100;

  // Check if quota exceeded
  if (currentUsage > plan.monthlyQuota) {
    // Decrement back since we're rejecting
    await redis.decr(usageKey);

    // Trigger webhook once when quota exceeded
    const alreadyNotified = await redis.sismember(notifiedKey, 'exceeded');
    if (!alreadyNotified) {
      await redis.sadd(notifiedKey, 'exceeded');
      await redis.expire(notifiedKey, 90 * 24 * 60 * 60);
      fireWebhook(key.ownerId, 'quota.exceeded', key.id, key.name, plan.name, currentUsage - 1, plan.monthlyQuota);
    }

    return { valid: false, error: 'quota_exceeded', remaining: 0 };
  }

  const remaining = plan.monthlyQuota - currentUsage;

  // Alert at 90% threshold
  if (percentUsed >= 90) {
    // Trigger webhook once when crossing 90%
    const alreadyNotified = await redis.sismember(notifiedKey, '90_percent');
    if (!alreadyNotified) {
      await redis.sadd(notifiedKey, '90_percent');
      await redis.expire(notifiedKey, 90 * 24 * 60 * 60);
      fireWebhook(key.ownerId, 'quota.90_percent', key.id, key.name, plan.name, currentUsage, plan.monthlyQuota);
    }

    return {
      valid: true,
      remaining,
      alert: 'quota_90_percent',
    };
  }

  return {
    valid: true,
    remaining,
  };
}

function fireWebhook(
  ownerId: string,
  event: WebhookEvent,
  keyId: string,
  keyName: string,
  planName: string,
  currentUsage: number,
  monthlyQuota: number
): void {
  // Fire in background, don't block validation
  triggerWebhooks(ownerId, event, {
    event,
    timestamp: Date.now(),
    data: {
      keyId,
      keyName,
      planName,
      currentUsage,
      monthlyQuota,
      percentUsed: Math.round((currentUsage / monthlyQuota) * 100),
    },
  }).catch((err) => {
    console.error('Failed to trigger webhooks:', err);
  });
}
