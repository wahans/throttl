import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { exportUsage } from '@/lib/throttl';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id?: string }).id || session.user.email || '';
  const format = request.nextUrl.searchParams.get('format') || 'json';

  try {
    if (format === 'csv') {
      const csv = await exportUsage(userId, 'csv');
      return new NextResponse(csv as string, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=usage-export.csv',
        },
      });
    }

    const data = await exportUsage(userId, 'json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error exporting usage:', error);
    return NextResponse.json({ error: 'Failed to export usage' }, { status: 500 });
  }
}
