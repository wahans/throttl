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
    <div className={`bg-white rounded-xl p-6 shadow-sm ${!isActive ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 font-mono">{keyPrefix}...</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {isActive ? 'Active' : 'Revoked'}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Monthly Usage</span>
          <span className={isNearLimit ? 'text-orange-600 font-medium' : 'text-gray-900'}>
            {currentUsage.toLocaleString()} / {monthlyLimit.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${isNearLimit ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${usagePercent}%` }} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Created {new Date(createdAt).toLocaleDateString()}</span>
        {isActive && <button onClick={() => onRevoke(id)} className="text-sm text-red-600 hover:text-red-700">Revoke</button>}
      </div>
    </div>
  );
}
