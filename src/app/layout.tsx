import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components';

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
    <html lang="en">
      <body className="dark bg-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
