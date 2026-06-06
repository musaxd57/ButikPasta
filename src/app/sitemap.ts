import type { MetadataRoute } from 'next';
import { JOURNAL } from '@/lib/content/journal';
import { GALLERY } from '@/lib/data';
import { MENU } from '@/lib/content/menu';
import { COLLECTIONS } from '@/lib/content/collections';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const locales = ['tr', 'en'];

  const staticRoutes = [
    '',
    '/configure',
    '/menu',
    '/gallery',
    '/weddings',
    '/corporate',
    '/flavors',
    '/pricing',
    '/journal',
    '/collections',
    '/atelier',
    '/occasions',
    '/sustainability',
    '/press',
    '/reviews',
    '/appointment',
    '/gift-card',
    '/glossary',
    '/care',
    '/faq',
    '/contact',
    '/track',
    '/about',
    '/order',
    '/privacy',
    '/terms',
    '/kvkk',
    '/delivery',
  ];

  const dynamicRoutes = [
    ...JOURNAL.map((p) => `/journal/${p.slug}`),
    ...GALLERY.map((g) => `/gallery/${g.id}`),
    ...MENU.map((m) => `/menu/${m.id}`),
    ...COLLECTIONS.map((c) => `/collections/${c.slug}`),
  ];

  const all = [...staticRoutes, ...dynamicRoutes];

  return locales.flatMap((locale) =>
    all.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : route.includes('/journal/') ? 0.6 : 0.8,
    })),
  );
}
