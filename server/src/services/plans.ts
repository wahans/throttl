import { nanoid } from 'nanoid';
import { redis } from './redis.js';
import type { Plan } from '../types.js';

const PLAN_PREFIX = 'plan:';
const PLANS_SET = 'plans:all';

const DEFAULT_PLANS: Omit<Plan, 'id'>[] = [
  { name: 'free', monthlyQuota: 1000, rateLimit: 10 },
  { name: 'pro', monthlyQuota: 50000, rateLimit: 100 },
  { name: 'enterprise', monthlyQuota: 500000, rateLimit: 1000 },
];

export async function createPlan(
  name: string,
  monthlyQuota: number,
  rateLimit: number = 60
): Promise<Plan> {
  const id = nanoid(8);

  const plan: Plan = {
    id,
    name,
    monthlyQuota,
    rateLimit,
  };

  await redis
    .multi()
    .hset(`${PLAN_PREFIX}${id}`, plan as unknown as Record<string, string | number>)
    .sadd(PLANS_SET, id)
    .exec();

  return plan;
}

export async function getPlanById(id: string): Promise<Plan | null> {
  const data = await redis.hgetall(`${PLAN_PREFIX}${id}`);
  if (!data || !data.id) return null;

  return {
    ...data,
    monthlyQuota: parseInt(data.monthlyQuota, 10),
    rateLimit: parseInt(data.rateLimit, 10),
  } as Plan;
}

export async function getPlanByName(name: string): Promise<Plan | null> {
  const plans = await listPlans();
  return plans.find((p) => p.name === name) || null;
}

export async function listPlans(): Promise<Plan[]> {
  const ids = await redis.smembers(PLANS_SET);
  const plans: Plan[] = [];

  for (const id of ids) {
    const plan = await getPlanById(id);
    if (plan) plans.push(plan);
  }

  return plans;
}

export async function updatePlan(
  id: string,
  updates: Partial<Pick<Plan, 'monthlyQuota' | 'rateLimit'>>
): Promise<Plan | null> {
  const plan = await getPlanById(id);
  if (!plan) return null;

  const updateData: Record<string, string | number> = {};
  if (updates.monthlyQuota !== undefined) {
    updateData.monthlyQuota = updates.monthlyQuota;
  }
  if (updates.rateLimit !== undefined) {
    updateData.rateLimit = updates.rateLimit;
  }

  if (Object.keys(updateData).length > 0) {
    await redis.hset(`${PLAN_PREFIX}${id}`, updateData);
  }

  return getPlanById(id);
}

export async function seedDefaultPlans(): Promise<void> {
  const existing = await listPlans();

  for (const plan of DEFAULT_PLANS) {
    const exists = existing.some((p) => p.name === plan.name);
    if (!exists) {
      await createPlan(plan.name, plan.monthlyQuota, plan.rateLimit);
      console.log(`Seeded plan: ${plan.name}`);
    }
  }
}
