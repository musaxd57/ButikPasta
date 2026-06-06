import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google';

// Handwriting font used for the "script" message style preview.
export const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
