'use client';

interface KeyCardProps {
  id: string;
  name: string;
  keyPrefix: string;
  monthlyLimit: number;
  currentUsage: number;
  isActive: boolean;
  createdAt: string;
  onRevoke: (id: string) => void;
}

export default function KeyCard({ id, name, keyPrefix, monthlyLimit, currentUsage, isActive, createdAt, onRevoke }: KeyCardProps) {
  const usagePercent = Math.min((currentUsage / monthlyLimit) * 100, 100);
  const isNearLimit = usagePercent > 80;

  return (
    <div className={`card card-hover p-5 ${!isActive ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-emerald-500/10' : 'bg-zinc-800'}`}>
            <svg className={`w-4 h-4 ${isActive ? 'text-emerald-500' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white text-sm">{name}</h3>
            <p className="text-xs text-zinc-500 mono">{keyPrefix}...</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
          {isActive ? 'Active' : 'Revoked'}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-zinc-400">Usage</span>
          <span className={isNearLimit ? 'text-amber-400' : 'text-zinc-300'}>
            {currentUsage.toLocaleString()} / {monthlyLimit.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isNearLimit ? 'bg-amber-500' : 'bg-blue-500'}`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
        <span className="text-xs text-zinc-500">
          {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        {isActive && (
          <button onClick={() => onRevoke(id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">
            Revoke
          </button>
        )}
      </div>
    </div>
  );
}
