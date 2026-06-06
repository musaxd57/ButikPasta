import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/routing';
import CtaBand from '@/components/marketing/CtaBand';
import { GALLERY, galleryImages } from '@/lib/data';
import GalleryImages from '@/components/gallery/GalleryImages';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    GALLERY.map((item) => ({ locale, id: item.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const item = GALLERY.find((g) => g.id === params.id);
  if (!item) return {};
  const title = params.locale === 'tr' ? item.titleTr : item.titleEn;
  return { title, openGraph: { images: [item.imageUrl] } };
}

function Detail({ id }: { id: string }) {
  const t = useTranslations('gallery');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const item = GALLERY.find((g) => g.id === id);
  if (!item) notFound();

  const title = locale === 'tr' ? item.titleTr : item.titleEn;
  const related = GALLERY.filter(
    (g) => g.category === item.category && g.id !== id,
  ).slice(0, 3);

  return (
    <>
      <Section tone="ivory" spacing="lg" container={false}>
        <Container className="pt-24">
          <Breadcrumbs
            items={[
              { label: tNav('home'), href: '/' },
              { label: tNav('gallery'), href: '/gallery' },
              { label: title },
            ]}
          />
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <GalleryImages images={galleryImages(item)} alt={title} />
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {t(item.category)}
              </span>
              <h1 className="mt-3 font-serif text-4xl">{title}</h1>
              <div className="hairline my-6" />
              {item.priceRange && (
                <p className="text-lg text-charcoal/70">{item.priceRange}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/configure" variant="gold">
                  {t('orderSimilar')}
                </Button>
                <Button href="/gallery" variant="outline">
                  {tNav('gallery')}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="ivoryDark">
          <h2 className="mb-8 text-center font-serif text-3xl">
            {t('orderSimilar')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((g) => (
              <Link
                key={g.id}
                href={`/gallery/${g.id}`}
                className="group block overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.imageUrl}
                  alt={locale === 'tr' ? g.titleTr : g.titleEn}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

export default function GalleryDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(params.locale);
  return <Detail id={params.id} />;
}
