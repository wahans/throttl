import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revokeKey } from '@/lib/throttl';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await revokeKey(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error revoking key:', error);
    return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 });
  }
}
