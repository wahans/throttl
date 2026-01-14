'use client';

import { useEffect, useState } from 'react';

type WebhookEvent = 'quota.90_percent' | 'quota.exceeded';

interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  active: boolean;
  createdAt: number;
}

const EVENT_LABELS: Record<WebhookEvent, string> = {
  'quota.90_percent': '90% quota reached',
  'quota.exceeded': 'Quota exceeded',
};

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<WebhookEvent[]>(['quota.90_percent', 'quota.exceeded']);
  const [creating, setCreating] = useState(false);

  const fetchWebhooks = () => {
    fetch('/api/webhooks')
      .then((res) => res.json())
      .then((data) => {
        setWebhooks(data.webhooks || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/webhooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl, events: selectedEvents }),
    });
    setCreating(false);
    if (res.ok) {
      setNewUrl('');
      setSelectedEvents(['quota.90_percent', 'quota.exceeded']);
      setShowCreate(false);
      fetchWebhooks();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webhook?')) return;
    await fetch(`/api/webhooks/${id}`, { method: 'DELETE' });
    fetchWebhooks();
  };

  const toggleEvent = (event: WebhookEvent) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
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
          <h1 className="text-2xl font-semibold text-white">Webhooks</h1>
          <p className="text-sm text-zinc-400 mt-1">Get notified when quota thresholds are reached</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add webhook
          </span>
        </button>
      </div>

      {/* Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6">
            <form onSubmit={handleCreate}>
              <h2 className="text-lg font-semibold text-white mb-1">Add webhook</h2>
              <p className="text-sm text-zinc-400 mb-6">We&apos;ll send a POST request to your URL when events occur</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Endpoint URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://your-server.com/webhook"
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Events</label>
                  <div className="space-y-2">
                    {(Object.keys(EVENT_LABELS) as WebhookEvent[]).map((event) => (
                      <label key={event} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event)}
                          onChange={() => toggleEvent(event)}
                          className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500"
                        />
                        <div>
                          <span className="text-sm text-white">{EVENT_LABELS[event]}</span>
                          <p className="text-xs text-zinc-500">
                            {event === 'quota.90_percent' ? 'When usage reaches 90% of monthly quota' : 'When monthly quota is exhausted'}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || selectedEvents.length === 0}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create webhook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Webhooks List */}
      {webhooks.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-1">No webhooks configured</h3>
          <p className="text-sm text-zinc-400 mb-4">Add a webhook to get notified about quota alerts</p>
          <button onClick={() => setShowCreate(true)} className="btn-primary">
            Add your first webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${webhook.active ? 'bg-emerald-500' : 'bg-zinc-500'}`} />
                    <code className="text-sm text-white truncate">{webhook.url}</code>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {webhook.events.map((event) => (
                      <span key={event} className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded">
                        {EVENT_LABELS[event]}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(webhook.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Delete webhook"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payload Example */}
      <div className="mt-8 card p-6">
        <h3 className="text-sm font-medium text-white mb-3">Webhook payload example</h3>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-300 overflow-x-auto">
{`{
  "event": "quota.90_percent",
  "timestamp": 1705123456789,
  "data": {
    "keyId": "abc123",
    "keyName": "Production",
    "planName": "pro",
    "currentUsage": 45000,
    "monthlyQuota": 50000,
    "percentUsed": 90
  }
}`}
        </pre>
      </div>
    </div>
  );
}
