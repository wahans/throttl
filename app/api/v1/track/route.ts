import { NextRequest, NextResponse } from 'next/server';
import { getApiKeyByHash, logUsage, getMonthlyUsage } from '@/lib/db';
import { hashApiKey } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey) return NextResponse.json({ valid: false, error: 'missing_api_key' }, { status: 401 });

  const keyHash = hashApiKey(apiKey);
  const key = getApiKeyByHash(keyHash);
  if (!key) return NextResponse.json({ valid: false, error: 'invalid_api_key' }, { status: 401 });

  const currentUsage = getMonthlyUsage(key.id);
  if (currentUsage >= key.monthly_limit) {
    return NextResponse.json({ valid: false, error: 'quota_exceeded', limit: key.monthly_limit }, { status: 429 });
  }

  let endpoint: string | undefined;
  try { const body = await request.json(); endpoint = body.endpoint; } catch {}

  logUsage(key.id, endpoint);
  return NextResponse.json({ valid: true, remaining: key.monthly_limit - currentUsage - 1, limit: key.monthly_limit });
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey) return NextResponse.json({ valid: false, error: 'missing_api_key' }, { status: 401 });

  const keyHash = hashApiKey(apiKey);
  const key = getApiKeyByHash(keyHash);
  if (!key) return NextResponse.json({ valid: false, error: 'invalid_api_key' }, { status: 401 });

  const currentUsage = getMonthlyUsage(key.id);
  return NextResponse.json({ valid: true, remaining: key.monthly_limit - currentUsage, limit: key.monthly_limit, used: currentUsage });
}
