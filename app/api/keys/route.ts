import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createApiKey, getApiKeysByUserId, getMonthlyUsage } from '@/lib/db';
import { generateId, generateApiKey, hashApiKey, getKeyPrefix } from '@/lib/utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const keys = getApiKeysByUserId(userId);
  const keysWithUsage = keys.map((key) => ({ ...key, currentUsage: getMonthlyUsage(key.id) }));

  return NextResponse.json({ keys: keysWithUsage });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { name, monthlyLimit = 1000 } = await request.json();

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  const id = generateId();
  const rawKey = generateApiKey();
  const keyHash = hashApiKey(rawKey);
  const keyPrefix = getKeyPrefix(rawKey);

  createApiKey(id, userId, name, keyHash, keyPrefix, monthlyLimit);

  return NextResponse.json({ id, name, key: rawKey, keyPrefix, monthlyLimit, message: 'Save this key now!' });
}
