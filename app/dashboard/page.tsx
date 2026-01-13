'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import UsageChart from '@/components/UsageChart';

interface UsageData {
  dailyStats: Array<{ date: string; requests: number }>;
  totalThisMonth: number;
  activeKeys: number;
  totalKeys: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/usage').then((res) => res.json()).then((data) => { setData(data); setLoading(false); });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link href="/dashboard/keys" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Manage Keys</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Requests This Month</p>
          <p className="text-3xl font-bold text-gray-900">{data?.totalThisMonth.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Active API Keys</p>
          <p className="text-3xl font-bold text-gray-900">{data?.activeKeys || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Keys Created</p>
          <p className="text-3xl font-bold text-gray-900">{data?.totalKeys || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Over Time (Last 30 Days)</h2>
        <UsageChart data={data?.dailyStats || []} />
      </div>
    </div>
  );
}
