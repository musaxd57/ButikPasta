import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/marketing/CtaBand';
import { COLLECTIONS } from '@/lib/content/collections';
import { pick } from '@/lib/i18nContent';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COLLECTIONS.map((col) => ({ locale, slug: col.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const col = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!col) return {};
  return {
    title: pick(col.name, params.locale),
    description: pick(col.description, params.locale),
    openGraph: { images: [col.cover] },
  };
}

function Body({ slug }: { slug: string }) {
  const t = useTranslations('collections');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) notFound();

  const others = COLLECTIONS.filter((c) => c.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={pick(col.tagline, locale)}
        title={pick(col.name, locale)}
        lead={pick(col.description, locale)}
        image={col.cover}
        height="lg"
        crumbs={[
          { label: tNav('home'), href: '/' },
          { label: t('title'), href: '/collections' },
          { label: pick(col.name, locale) },
        ]}
      />

      <Section tone="ivory">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {col.images.map((src, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={pick(col.name, locale)}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/configure" variant="gold">
            {t('designCta')}
          </Button>
        </div>
      </Section>

      <Section tone="ivoryDark">
        <h2 className="mb-8 text-center font-serif text-3xl">{t('title')}</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group block overflow-hidden rounded-2xl"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.cover}
                  alt={pick(c.name, locale)}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                  <span className="font-serif text-lg text-ivory">
                    {pick(c.name, locale)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function CollectionDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  return <Body slug={params.slug} />;
}
