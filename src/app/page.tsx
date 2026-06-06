import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// The site is fully localized under /[locale]. The i18n middleware redirects
// the bare root to the default locale, but this page is a guaranteed fallback
// so "/" never 404s (e.g. on Vercel edge routing edge-cases).
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
