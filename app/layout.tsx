import './globals.css';
import { Providers } from './providers';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Throttl - API usage tracking made simple',
  description: 'Generate API keys, set usage quotas, and monitor consumption in real-time. The simplest way to add rate limiting to your API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased font-mono">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
