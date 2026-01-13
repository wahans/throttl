import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'API Tracker - Monitor Your API Usage',
  description: 'Track and manage your API keys with usage quotas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
