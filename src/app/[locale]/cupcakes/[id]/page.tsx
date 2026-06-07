import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import FavoriteButton from '@/components/ui/FavoriteButton';
import CtaBand from '@/components/marketing/CtaBand';
import { CUPCAKES, getCupcake } from '@/lib/content/cupcakes';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';
import { whatsappHref } from '@/lib/utils';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CUPCAKES.map((item) => ({ locale, id: item.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const item = getCupcake(params.id);
  if (!item) return {};
  return {
    title: pick(item.name, params.locale),
    description: pick(item.description, params.locale),
    openGraph: { images: [item.image] },
  };
}

function Detail({ id }: { id: string }) {
  const t = useTranslations('cupcakes');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const item = getCupcake(id);
  if (!item) notFound();

  const related = CUPCAKES.filter(
    (c) => c.category === item.category && c.id !== id,
  ).slice(0, 3);

  return (
    <>
      <Section tone="ivory" spacing="lg" container={false}>
        <Container className="pt-24">
          <Breadcrumbs
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('title'), href: '/cupcakes' },
              { label: pick(item.name, locale) },
            ]}
          />
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={pick(item.name, locale)}
                className="w-full rounded-3xl object-cover shadow-xl"
              />
              <FavoriteButton id={item.id} className="absolute right-4 top-4" />
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {t(item.category)}
              </span>
              <h1 className="mt-3 font-serif text-4xl">{pick(item.name, locale)}</h1>
              <div className="hairline my-6" />
              <p className="text-charcoal/70">{pick(item.description, locale)}</p>
              <p className="mt-4 text-sm text-charcoal/50">
                {item.boxSize} {t('pieces')} / {t('perBox')}
              </p>
              <p className="mt-6 font-serif text-3xl font-semibold text-gold-dark">
                {formatPrice(item.pricePerBox, locale)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(
                    `${t('orderMessage')}: ${pick(item.name, locale)} (${item.boxSize} ${t('pieces')}) — ${formatPrice(item.pricePerBox, locale)}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  {t('order')}
                </a>
                <Button href="/cupcakes" variant="outline">
                  {t('title')}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="ivoryDark">
          <h2 className="mb-8 text-center font-serif text-3xl">{t('title')}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.id}
                href={`/cupcakes/${c.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={pick(c.name, locale)}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg">{pick(c.name, locale)}</h3>
                  <p className="text-sm text-gold-dark">
                    {formatPrice(c.pricePerBox, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

export default function CupcakeDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(params.locale);
  return <Detail id={params.id} />;
}
