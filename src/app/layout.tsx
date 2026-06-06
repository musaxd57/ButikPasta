import type { ReactNode } from 'react';
import { inter, playfair } from './fonts';
import './globals.css';

// Single application root. Locale-specific concerns (translations, chrome) live
// in app/[locale]/layout.tsx; the admin panel has its own chrome under
// app/admin. The <html lang> is refined on the client per active locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
