import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-baloo',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NENÉM — The Legendary Gatoelho',
  description: 'The most beloved cat on the internet is now a memecoin on the blockchain. A legend. A vibe. A movement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
