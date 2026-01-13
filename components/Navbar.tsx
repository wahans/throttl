'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/keys', label: 'API Keys' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">API Tracker</Link>
            <div className="flex space-x-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className={`px-3 py-2 rounded-lg text-sm font-medium ${pathname === link.href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-gray-600 hover:text-gray-900">Sign Out</button>
        </div>
      </div>
    </nav>
  );
}
