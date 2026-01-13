import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllKeysWithUsage, createKey, listPlans } from '@/lib/throttl';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const keys = await getAllKeysWithUsage();
    const plans = await listPlans();

    const keysWithPlanInfo = keys.map((key) => {
      const plan = plans.find((p) => p.id === key.planId);
      return {
        id: key.id,
        name: key.name,
        planId: key.planId,
        planName: plan?.name || 'unknown',
        monthlyLimit: key.usage?.limit || plan?.monthlyQuota || 0,
        currentUsage: key.usage?.current || 0,
        isActive: key.active,
        createdAt: new Date(key.createdAt).toISOString(),
      };
    });

    return NextResponse.json({ keys: keysWithPlanInfo });
  } catch (error) {
    console.error('Error fetching keys:', error);
    return NextResponse.json({ error: 'Failed to fetch keys' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, planId } = await request.json();

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!planId) return NextResponse.json({ error: 'Plan is required' }, { status: 400 });

    const result = await createKey(name, planId);
    const plans = await listPlans();
    const plan = plans.find((p) => p.id === planId);

    return NextResponse.json({
      id: result.id,
      name: result.name,
      key: result.secret,
      planId: result.planId,
      planName: plan?.name || 'unknown',
      monthlyLimit: plan?.monthlyQuota || 0,
      message: result.message,
    });
  } catch (error) {
    console.error('Error creating key:', error);
    return NextResponse.json({ error: 'Failed to create key' }, { status: 500 });
  }
}
