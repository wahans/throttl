import crypto from 'crypto';

export function generateId(): string {
  return crypto.randomUUID();
}

export function generateApiKey(): string {
  const key = crypto.randomBytes(24).toString('base64url');
  return `ak_${key}`;
}

export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

export function getKeyPrefix(key: string): string {
  return key.substring(0, 11);
}
