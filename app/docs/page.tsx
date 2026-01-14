import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Navbar */}
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="brand text-white">Throttl</span>
            </Link>
            <span className="text-zinc-600 mx-2">/</span>
            <span className="text-zinc-400">Docs</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-lg text-zinc-400">
            Everything you need to add API rate limiting to your app.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="card p-6 mb-12">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-4">On this page</h2>
          <ul className="space-y-2">
            <li><a href="#quickstart" className="text-blue-400 hover:text-blue-300 transition-colors">Quickstart</a></li>
            <li><a href="#api" className="text-blue-400 hover:text-blue-300 transition-colors">API Reference</a></li>
            <li><a href="#sdk" className="text-blue-400 hover:text-blue-300 transition-colors">SDK / Middleware</a></li>
            <li><a href="#webhooks" className="text-blue-400 hover:text-blue-300 transition-colors">Webhooks</a></li>
          </ul>
        </div>

        {/* Quickstart */}
        <section id="quickstart" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Quickstart</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">1. Create an account</h3>
              <p className="text-zinc-400 mb-4">
                Sign up at <Link href="/auth/signup" className="text-blue-400 hover:underline">throttl.xyz</Link> to get access to the dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">2. Create an API key</h3>
              <p className="text-zinc-400 mb-4">
                From the dashboard, create a new API key. Choose a plan based on your expected usage.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">3. Validate requests</h3>
              <p className="text-zinc-400 mb-4">
                Call the validate endpoint before processing each API request:
              </p>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                  <span className="text-xs text-zinc-500 mono">bash</span>
                </div>
                <pre className="p-4 text-sm mono overflow-x-auto">
                  <code className="text-zinc-300">{`curl -X POST https://server-production-ea3b.up.railway.app/api/validate \\
  -H "Content-Type: application/json" \\
  -d '{"key": "tk_your_api_key_here"}'`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">4. Handle the response</h3>
              <p className="text-zinc-400 mb-4">
                The API returns whether the request is valid and how many requests remain:
              </p>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                  <span className="text-xs text-zinc-500 mono">json</span>
                </div>
                <pre className="p-4 text-sm mono overflow-x-auto">
                  <code className="text-zinc-300">{`{
  "valid": true,
  "remaining": 9847
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section id="api" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>

          <div className="space-y-8">
            {/* Validate */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">POST</span>
                <code className="text-white">/api/validate</code>
              </div>
              <p className="text-zinc-400 mb-4">Validate an API key and increment usage. Call this for each API request you want to track.</p>

              <h4 className="text-sm font-medium text-zinc-300 mb-2">Request body</h4>
              <div className="card bg-zinc-900/50 p-4 mb-4">
                <pre className="text-sm mono text-zinc-300">{`{
  "key": "tk_your_api_key"  // required
}`}</pre>
              </div>

              <h4 className="text-sm font-medium text-zinc-300 mb-2">Response</h4>
              <div className="card bg-zinc-900/50 p-4">
                <pre className="text-sm mono text-zinc-300">{`// Success (200)
{
  "valid": true,
  "remaining": 9847
}

// Success with warning (200)
{
  "valid": true,
  "remaining": 50,
  "alert": "quota_90_percent"
}

// Quota exceeded (429)
{
  "valid": false,
  "error": "quota_exceeded",
  "remaining": 0
}

// Invalid key (401)
{
  "valid": false,
  "error": "invalid_key"
}`}</pre>
              </div>
            </div>

            {/* List Plans */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">GET</span>
                <code className="text-white">/api/plans</code>
              </div>
              <p className="text-zinc-400 mb-4">List all available plans.</p>

              <h4 className="text-sm font-medium text-zinc-300 mb-2">Response</h4>
              <div className="card bg-zinc-900/50 p-4">
                <pre className="text-sm mono text-zinc-300">{`[
  {
    "id": "abc123",
    "name": "free",
    "monthlyQuota": 1000,
    "rateLimit": 10
  },
  {
    "id": "def456",
    "name": "pro",
    "monthlyQuota": 50000,
    "rateLimit": 100
  }
]`}</pre>
              </div>
            </div>

            {/* Create Key */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">POST</span>
                <code className="text-white">/api/keys</code>
              </div>
              <p className="text-zinc-400 mb-4">Create a new API key.</p>

              <h4 className="text-sm font-medium text-zinc-300 mb-2">Request body</h4>
              <div className="card bg-zinc-900/50 p-4 mb-4">
                <pre className="text-sm mono text-zinc-300">{`{
  "name": "Production",
  "planId": "abc123",
  "ownerId": "user_123"
}`}</pre>
              </div>

              <h4 className="text-sm font-medium text-zinc-300 mb-2">Response</h4>
              <div className="card bg-zinc-900/50 p-4">
                <pre className="text-sm mono text-zinc-300">{`{
  "id": "key_abc",
  "secret": "tk_xxxxxxxx",  // Only shown once!
  "name": "Production",
  "planId": "abc123",
  "ownerId": "user_123",
  "message": "Store this secret securely"
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* SDK */}
        <section id="sdk" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">SDK / Middleware</h2>

          <div className="space-y-6">
            <p className="text-zinc-400">
              Use our Express middleware to automatically validate and track API requests.
            </p>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Installation</h3>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                  <span className="text-xs text-zinc-500 mono">bash</span>
                </div>
                <pre className="p-4 text-sm mono overflow-x-auto">
                  <code className="text-zinc-300">npm install throttl-express</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Usage</h3>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                  <span className="text-xs text-zinc-500 mono">javascript</span>
                </div>
                <pre className="p-4 text-sm mono overflow-x-auto">
                  <code className="text-zinc-300">{`import express from 'express';
import { throttl } from 'throttl-express';

const app = express();

// Add Throttl middleware
app.use(throttl({
  apiUrl: 'https://server-production-ea3b.up.railway.app'
}));

// Your routes are now protected
app.get('/api/data', (req, res) => {
  res.json({ data: 'protected!' });
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section id="webhooks" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Webhooks</h2>

          <div className="space-y-6">
            <p className="text-zinc-400">
              Configure webhooks to receive notifications when quota thresholds are reached.
            </p>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Events</h3>
              <ul className="space-y-2 text-zinc-400">
                <li><code className="text-amber-400">quota.90_percent</code> — Triggered when usage reaches 90%</li>
                <li><code className="text-amber-400">quota.exceeded</code> — Triggered when quota is exhausted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-3">Payload</h3>
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                  <span className="text-xs text-zinc-500 mono">json</span>
                </div>
                <pre className="p-4 text-sm mono overflow-x-auto">
                  <code className="text-zinc-300">{`{
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
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="card p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Need help?</h2>
          <p className="text-zinc-400 mb-4">
            Check out our GitHub or reach out directly.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/wahans/throttl" className="btn-secondary">
              GitHub
            </a>
            <a href="mailto:hello@throttl.xyz" className="btn-primary">
              Contact us
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-sm text-zinc-600">&copy; 2026 Throttl</span>
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
