import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components';
import { ReactQueryProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'Trello clone',
  description: 'Trello clone created with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="dark bg-gray-900 h-full">
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
