import { redis, getCurrentMonth } from './redis.js';
import { getKeyBySecret } from './keys.js';
import { getPlanById } from './plans.js';
import type { ValidationResult } from '../types.js';

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

  const currentUsage = await redis.incr(usageKey);

  // Set TTL of 90 days on first use each month
  if (currentUsage === 1) {
    await redis.expire(usageKey, 90 * 24 * 60 * 60);
  }

  if (currentUsage > plan.monthlyQuota) {
    // Decrement back since we're rejecting
    await redis.decr(usageKey);
    return { valid: false, error: 'quota_exceeded', remaining: 0 };
  }

  return {
    valid: true,
    remaining: plan.monthlyQuota - currentUsage,
  };
}
