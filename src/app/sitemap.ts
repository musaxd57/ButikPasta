import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const routes = ['', '/configure', '/gallery', '/about', '/order'];
  const locales = ['tr', 'en'];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  );
}
