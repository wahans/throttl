import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Navbar */}
      <nav className="border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="brand text-white">Throttl</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/auth/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now tracking 10M+ API requests
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">API usage tracking</span>
            <br />
            <span className="text-white">made simple</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            Create API keys, set usage quotas, and monitor consumption in real-time.
            Built for developers who ship fast.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary px-6 py-3 text-base">
              Start for free
            </Link>
            <Link href="#features" className="btn-secondary px-6 py-3 text-base">
              See how it works
            </Link>
          </div>
        </div>

        {/* Code Preview */}
        <div className="max-w-2xl mx-auto mb-24">
          <div className="card glow overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <span className="text-xs text-zinc-500 mono ml-2">terminal</span>
            </div>
            <pre className="p-6 text-sm mono overflow-x-auto">
              <code>
                <span className="text-zinc-500">$</span>{' '}
                <span className="text-emerald-400">curl</span>{' '}
                <span className="text-zinc-300">-X POST https://server-production-ea3b.up.railway.app/api/validate \</span>
                {'\n'}
                <span className="text-zinc-300">{'  '}-H</span>{' '}
                <span className="text-amber-400">&quot;X-API-Key: ak_live_xxxxx&quot;</span>
                {'\n\n'}
                <span className="text-zinc-500">{'{'}</span>
                {'\n'}
                <span className="text-zinc-300">{'  '}</span>
                <span className="text-blue-400">&quot;valid&quot;</span>
                <span className="text-zinc-500">:</span>{' '}
                <span className="text-emerald-400">true</span>
                <span className="text-zinc-500">,</span>
                {'\n'}
                <span className="text-zinc-300">{'  '}</span>
                <span className="text-blue-400">&quot;remaining&quot;</span>
                <span className="text-zinc-500">:</span>{' '}
                <span className="text-amber-400">9847</span>
                <span className="text-zinc-500">,</span>
                {'\n'}
                <span className="text-zinc-300">{'  '}</span>
                <span className="text-blue-400">&quot;limit&quot;</span>
                <span className="text-zinc-500">:</span>{' '}
                <span className="text-amber-400">10000</span>
                {'\n'}
                <span className="text-zinc-500">{'}'}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="pb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-zinc-400">Simple, powerful API management in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">API Key Management</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generate, revoke, and manage API keys with unique prefixes for easy identification.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Real-time Analytics</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Monitor API usage with live charts. Know exactly how your APIs are being consumed.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Rate Limiting</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Set monthly quotas per key. Automatically reject requests when limits are exceeded.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="pb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Simple pricing</h2>
            <p className="text-zinc-400">Start free, scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="card p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-white text-lg">Free</h3>
                <p className="text-sm text-zinc-500">For side projects</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1,000 requests/month
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 API key
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usage dashboard
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-secondary w-full text-center block">
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="card p-6 border-blue-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-xs font-medium text-white rounded-full">
                Popular
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-white text-lg">Pro</h3>
                <p className="text-sm text-zinc-500">For growing apps</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  50,000 requests/month
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited API keys
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Webhook notifications
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usage export (CSV)
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full text-center block">
                Start free trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="card p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-white text-lg">Enterprise</h3>
                <p className="text-sm text-zinc-500">For large scale</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  500,000 requests/month
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom integrations
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-secondary w-full text-center block">
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pb-24">
          <div className="card p-12 text-center bg-gradient-to-b from-blue-500/10 to-transparent border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to ship?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Add API rate limiting to your app in under 5 minutes. No credit card required.
            </p>
            <Link href="/auth/signup" className="btn-primary px-8 py-3 text-base">
              Start for free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="brand text-white">Throttl</span>
              </div>
              <p className="text-sm text-zinc-500">API usage tracking made simple.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="text-sm text-zinc-500 hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/docs#quickstart" className="text-sm text-zinc-500 hover:text-white transition-colors">Quickstart</Link></li>
                <li><Link href="/docs#api" className="text-sm text-zinc-500 hover:text-white transition-colors">API Reference</Link></li>
                <li><a href="https://github.com/wahans/throttl" className="text-sm text-zinc-500 hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="https://twitter.com" className="text-sm text-zinc-500 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="mailto:hello@throttl.xyz" className="text-sm text-zinc-500 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-sm text-zinc-600">&copy; 2026 Throttl. All rights reserved.</span>
            <span className="text-sm text-zinc-600">made by pressing buttons</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
