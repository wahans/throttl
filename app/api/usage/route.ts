import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllKeysWithUsage } from '@/lib/throttl';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const keys = await getAllKeysWithUsage();

    const activeKeys = keys.filter((k) => k.active).length;
    const totalKeys = keys.length;
    const totalThisMonth = keys.reduce((sum, k) => sum + (k.usage?.current || 0), 0);

    // Generate daily stats (placeholder - Throttl API doesn't provide daily breakdown yet)
    const dailyStats: Array<{ date: string; requests: number }> = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dailyStats.push({
        date: date.toISOString().split('T')[0],
        requests: i === 0 ? totalThisMonth : 0, // Show total on today only for now
      });
    }

    return NextResponse.json({
      dailyStats,
      totalThisMonth,
      activeKeys,
      totalKeys,
    });
  } catch (error) {
    console.error('Error fetching usage:', error);
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 });
  }
}
