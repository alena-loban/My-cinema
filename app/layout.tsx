import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';
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
    <html lang="ru">
      <Providers>
        <body className={cln(geistSans.variable, geistMono.variable, 'body')}>
          <Header />
          <main className="mainContainer">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
