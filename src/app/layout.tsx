import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'We The Me — Write Your Personal Constitution',
  description:
    'Define who you are. Answer guided questions about your values, purpose, and commitments, and receive an AI-crafted Personal Constitution unique to you.',
  keywords: ['personal constitution', 'values', 'purpose', 'self-improvement', 'AI', 'guided reflection'],
  authors: [{ name: 'Chad Stamm', url: 'https://chadstamm.com/' }],
  openGraph: {
    title: 'We The Me — Write Your Personal Constitution',
    description:
      'Every nation has a constitution. Now it\'s your turn. Define your values, purpose, and commitments.',
    url: 'https://wetheme.app',
    siteName: 'We The Me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We The Me — Write Your Personal Constitution',
    description:
      'Every nation has a constitution. Now it\'s your turn.',
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif&display=swap"
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
