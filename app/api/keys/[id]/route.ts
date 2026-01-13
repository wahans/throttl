import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revokeApiKey } from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const result = revokeApiKey(params.id, userId);

  if (result.changes === 0) return NextResponse.json({ error: 'Key not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
