import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUsageStats, getTotalUsageByUser, getApiKeysByUserId } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const dailyStats = getUsageStats(userId);
  const totalThisMonth = getTotalUsageByUser(userId);
  const keys = getApiKeysByUserId(userId);
  const activeKeys = keys.filter((k) => k.is_active === 1).length;

  return NextResponse.json({ dailyStats, totalThisMonth, activeKeys, totalKeys: keys.length });
}
