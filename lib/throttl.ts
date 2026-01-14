const API_URL = process.env.THROTTL_API_URL || 'https://server-production-ea3b.up.railway.app';

export interface Plan {
  id: string;
  name: string;
  monthlyQuota: number;
  rateLimit: number;
}

export interface ApiKey {
  id: string;
  name: string;
  planId: string;
  createdAt: number;
  active: boolean;
  usage?: {
    current: number;
    limit: number;
    remaining: number;
  };
}

export interface CreateKeyResponse {
  id: string;
  secret: string;
  name: string;
  planId: string;
  message: string;
}

export async function listPlans(): Promise<Plan[]> {
  const res = await fetch(`${API_URL}/api/plans`);
  if (!res.ok) throw new Error('Failed to fetch plans');
  return res.json();
}

export async function listKeys(ownerId?: string): Promise<Omit<ApiKey, 'usage'>[]> {
  const url = ownerId
    ? `${API_URL}/api/keys?ownerId=${encodeURIComponent(ownerId)}`
    : `${API_URL}/api/keys`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch keys');
  return res.json();
}

export async function getKey(id: string): Promise<ApiKey> {
  const res = await fetch(`${API_URL}/api/keys/${id}`);
  if (!res.ok) throw new Error('Failed to fetch key');
  return res.json();
}

export async function createKey(name: string, planId: string, ownerId: string): Promise<CreateKeyResponse> {
  const res = await fetch(`${API_URL}/api/keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, planId, ownerId }),
  });
  if (!res.ok) throw new Error('Failed to create key');
  return res.json();
}

export async function revokeKey(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/keys/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to revoke key');
}

export async function getKeyWithUsage(id: string): Promise<ApiKey> {
  const res = await fetch(`${API_URL}/api/keys/${id}`);
  if (!res.ok) throw new Error('Failed to fetch key');
  return res.json();
}

export async function getAllKeysWithUsage(ownerId?: string): Promise<ApiKey[]> {
  const keys = await listKeys(ownerId);
  const keysWithUsage = await Promise.all(
    keys.map(async (key) => {
      try {
        return await getKey(key.id);
      } catch {
        return { ...key, usage: { current: 0, limit: 0, remaining: 0 } };
      }
    })
  );
  return keysWithUsage;
}

export interface UsageExport {
  keyId: string;
  keyName: string;
  planName: string;
  currentUsage: number;
  monthlyQuota: number;
  percentUsed: number;
}

export async function exportUsage(ownerId: string, format: 'json' | 'csv' = 'json'): Promise<UsageExport[] | string> {
  const url = `${API_URL}/api/keys/export/usage?ownerId=${encodeURIComponent(ownerId)}&format=${format}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to export usage');

  if (format === 'csv') {
    return res.text();
  }
  return res.json();
}
