import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">API Tracker</h1>
          <div className="space-x-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Track Your API Usage</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create API keys, set usage quotas, and monitor consumption. Simple, fast, and developer-friendly.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
              Start Free
            </Link>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🔑</div>
              <h3 className="text-lg font-semibold mb-2">API Key Management</h3>
              <p className="text-gray-600">Create and revoke API keys instantly.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Usage Analytics</h3>
              <p className="text-gray-600">Track requests over time with visual charts.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🚦</div>
              <h3 className="text-lg font-semibold mb-2">Rate Limiting</h3>
              <p className="text-gray-600">Set monthly quotas per key.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
