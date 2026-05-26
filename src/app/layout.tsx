import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import '@/styles/globals.scss';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lendsqr',
    template: '%s | Lendsqr',
  },
  description: 'Lendsqr admin console — manage users, loans, and savings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body>{children}</body>
    </html>
  );
}
