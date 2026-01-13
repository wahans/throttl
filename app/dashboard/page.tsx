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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2 text-zinc-500">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
          <p className="text-sm text-zinc-400 mt-1">Monitor your API usage and manage keys</p>
        </div>
        <Link href="/dashboard/keys" className="btn-primary">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New API Key
          </span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Requests this month</p>
              <p className="text-3xl font-semibold text-white">{data?.totalThisMonth.toLocaleString() || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Active keys</p>
              <p className="text-3xl font-semibold text-white">{data?.activeKeys || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Total keys</p>
              <p className="text-3xl font-semibold text-white">{data?.totalKeys || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-white">Request volume</h2>
          <span className="text-xs text-zinc-500">Last 30 days</span>
        </div>
        <UsageChart data={data?.dailyStats || []} />
      </div>

      {/* Quick Start */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="font-semibold text-white">Quick start</h2>
          <p className="text-sm text-zinc-400 mt-1">Integrate API tracking in seconds</p>
        </div>
        <div className="p-6 bg-zinc-900/50">
          <pre className="text-sm mono overflow-x-auto">
            <code>
              <span className="text-zinc-500">$</span>{' '}
              <span className="text-emerald-400">curl</span>{' '}
              <span className="text-zinc-300">-X POST {typeof window !== 'undefined' ? window.location.origin : 'https://your-app.com'}/api/v1/track \</span>
              {'\n'}
              <span className="text-zinc-300">{'  '}-H</span>{' '}
              <span className="text-amber-400">&quot;X-API-Key: your_api_key&quot;</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
