import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'We The Me — Your Personal Constitution for AI',
  description:
    'Your AI doesn\'t know you. Write your Personal Constitution — a structured capture of your values, beliefs, and principles — and make every AI interaction personal.',
  keywords: ['personal constitution', 'AI context', 'values', 'purpose', 'personalization', 'ChatGPT', 'Claude'],
  authors: [{ name: 'Chad Stamm', url: 'https://chadstamm.com/' }],
  openGraph: {
    title: 'We The Me — Your Personal Constitution for AI',
    description:
      'Your AI doesn\'t know you. A Personal Constitution changes that. 15 minutes to write. Use it forever.',
    url: 'https://wetheme.app',
    siteName: 'We The Me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We The Me — Your Personal Constitution for AI',
    description:
      'Your AI doesn\'t know you. A Personal Constitution changes that.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
