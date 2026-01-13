'use client';

import { useEffect, useState } from 'react';
import KeyCard from '@/components/KeyCard';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  monthly_limit: number;
  currentUsage: number;
  is_active: number;
  created_at: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(1000);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchKeys = () => {
    fetch('/api/keys').then((res) => res.json()).then((data) => { setKeys(data.keys || []); setLoading(false); });
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newKeyName, monthlyLimit: newKeyLimit }) });
    const data = await res.json();
    setCreating(false);
    if (data.key) { setCreatedKey(data.key); setNewKeyName(''); setNewKeyLimit(1000); fetchKeys(); }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;
    await fetch(`/api/keys/${id}`, { method: 'DELETE' });
    fetchKeys();
  };

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
          <h1 className="text-2xl font-semibold text-white">API Keys</h1>
          <p className="text-sm text-zinc-400 mt-1">Create and manage your API keys</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create key
          </span>
        </button>
      </div>

      {/* Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6">
            {createdKey ? (
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-white text-center mb-2">Key created</h2>
                <p className="text-sm text-zinc-400 text-center mb-4">Copy this key now. It won&apos;t be shown again.</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
                  <code className="text-sm text-emerald-400 mono break-all">{createdKey}</code>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigator.clipboard.writeText(createdKey)} className="btn-primary flex-1">
                    Copy to clipboard
                  </button>
                  <button onClick={() => { setCreatedKey(null); setShowCreate(false); }} className="btn-secondary flex-1">
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate}>
                <h2 className="text-lg font-semibold text-white mb-1">Create API key</h2>
                <p className="text-sm text-zinc-400 mb-6">Generate a new key to access the API</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                    <input type="text" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g., Production" className="input w-full" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Monthly limit</label>
                    <input type="number" value={newKeyLimit} onChange={(e) => setNewKeyLimit(parseInt(e.target.value))} min={1} className="input w-full" required />
                    <p className="text-xs text-zinc-500 mt-1">Maximum requests per month</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" disabled={creating} className="btn-primary flex-1 disabled:opacity-50">
                    {creating ? 'Creating...' : 'Create key'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Keys Grid */}
      {keys.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-1">No API keys yet</h3>
          <p className="text-sm text-zinc-400 mb-4">Create your first key to get started</p>
          <button onClick={() => setShowCreate(true)} className="btn-primary">
            Create your first key
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keys.map((key) => (
            <KeyCard key={key.id} id={key.id} name={key.name} keyPrefix={key.key_prefix} monthlyLimit={key.monthly_limit} currentUsage={key.currentUsage} isActive={key.is_active === 1} createdAt={key.created_at} onRevoke={handleRevoke} />
          ))}
        </div>
      )}
    </div>
  );
}
