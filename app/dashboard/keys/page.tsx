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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
        <button onClick={() => setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Create New Key</button>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            {createdKey ? (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Created!</h2>
                <p className="text-sm text-gray-600 mb-4">Copy this key now. It will not be shown again.</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4"><code className="text-sm break-all">{createdKey}</code></div>
                <div className="flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(createdKey)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Copy</button>
                  <button onClick={() => { setCreatedKey(null); setShowCreate(false); }} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Done</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Create API Key</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                    <input type="text" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g., Production API" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Limit</label>
                    <input type="number" value={newKeyLimit} onChange={(e) => setNewKeyLimit(parseInt(e.target.value))} min={1} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="button" onClick={() => setShowCreate(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={creating} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{creating ? 'Creating...' : 'Create Key'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {keys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">No API keys yet</p>
          <button onClick={() => setShowCreate(true)} className="text-blue-600 hover:underline">Create your first key</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keys.map((key) => (
            <KeyCard key={key.id} id={key.id} name={key.name} keyPrefix={key.key_prefix} monthlyLimit={key.monthly_limit} currentUsage={key.currentUsage} isActive={key.is_active === 1} createdAt={key.created_at} onRevoke={handleRevoke} />
          ))}
        </div>
      )}
    </div>
  );
}
