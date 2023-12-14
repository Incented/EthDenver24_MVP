import 'server-only';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import 'react-tooltip/dist/react-tooltip.css';
import { AppProviders } from './AppProviders';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';

// const satoshiFont = localFont({
//   src: '../fonts/satoshi/Satoshi-Variable.woff2',
//   display: 'swap',
//   variable: '--font-satoshi',
// });

const inter = Inter({
  display: 'swap',
  subsets: ['cyrillic', 'cyrillic-ext', 'latin-ext', 'latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata = {
  icons: {
    icon: '/images/ico_orange.svg',
  },
  title: 'Incented Protocol',
  description:
    'A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head></head>
      <body className="bg-white dark:bg-black">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
