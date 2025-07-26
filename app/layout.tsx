import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Embedded Chatbot',
  description: 'A Next.js chatbot that can be embedded on any website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}