// Injects JSON-LD structured data. Server-safe (renders a script tag).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (built from our own content).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Atelier Cake',
    image: `${siteUrl}/og.jpg`,
    url: siteUrl,
    telephone: '+90 555 555 55 55',
    priceRange: '₺₺₺',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nişantaşı',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    sameAs: ['https://instagram.com/ateliercake'],
    servesCuisine: 'Patisserie',
  };
}

export function websiteSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Atelier Cake',
    url: siteUrl,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
