import { nanoid } from 'nanoid';
import { redis, getCurrentMonth } from './redis.js';
import type { ApiKey } from '../types.js';

const KEY_PREFIX = 'key:';
const SECRET_INDEX = 'secret:';
const KEYS_SET = 'keys:all';

function generateSecret(): string {
  return `tk_${nanoid(32)}`;
}

export async function createKey(name: string, planId: string): Promise<ApiKey> {
  const id = nanoid(12);
  const secret = generateSecret();

  const key: ApiKey = {
    id,
    secret,
    name,
    planId,
    createdAt: Date.now(),
    active: true,
  };

  await redis
    .multi()
    .hset(`${KEY_PREFIX}${id}`, key as unknown as Record<string, string>)
    .set(`${SECRET_INDEX}${secret}`, id)
    .sadd(KEYS_SET, id)
    .exec();

  return key;
}

export async function getKeyById(id: string): Promise<ApiKey | null> {
  const data = await redis.hgetall(`${KEY_PREFIX}${id}`);
  if (!data || !data.id) return null;

  return {
    ...data,
    createdAt: parseInt(data.createdAt, 10),
    active: data.active === 'true',
  } as unknown as ApiKey;
}

export async function getKeyBySecret(secret: string): Promise<ApiKey | null> {
  const id = await redis.get(`${SECRET_INDEX}${secret}`);
  if (!id) return null;
  return getKeyById(id);
}

export async function listKeys(): Promise<Omit<ApiKey, 'secret'>[]> {
  const ids = await redis.smembers(KEYS_SET);
  const keys: Omit<ApiKey, 'secret'>[] = [];

  for (const id of ids) {
    const key = await getKeyById(id);
    if (key) {
      const { secret, ...rest } = key;
      keys.push(rest);
    }
  }

  return keys;
}

export async function revokeKey(id: string): Promise<boolean> {
  const key = await getKeyById(id);
  if (!key) return false;

  await redis
    .multi()
    .hset(`${KEY_PREFIX}${id}`, 'active', 'false')
    .del(`${SECRET_INDEX}${key.secret}`)
    .exec();

  return true;
}

export async function regenerateKey(id: string): Promise<string | null> {
  const key = await getKeyById(id);
  if (!key) return null;

  const newSecret = generateSecret();

  await redis
    .multi()
    .del(`${SECRET_INDEX}${key.secret}`)
    .hset(`${KEY_PREFIX}${id}`, 'secret', newSecret)
    .set(`${SECRET_INDEX}${newSecret}`, id)
    .exec();

  return newSecret;
}

export async function getKeyUsage(id: string): Promise<number> {
  const month = getCurrentMonth();
  const usage = await redis.get(`usage:${id}:${month}`);
  return usage ? parseInt(usage, 10) : 0;
}
