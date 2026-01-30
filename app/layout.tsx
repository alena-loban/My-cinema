import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import cln from 'classnames';
import Providers from '@/providers';
import { Header, Footer } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Кинотеатр Moon',
  description: 'Кинотеатр Moon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cln(geistSans.variable, geistMono.variable, 'body')}>
        <Providers>
          <Header />
          <main style={{ flex: '1' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
