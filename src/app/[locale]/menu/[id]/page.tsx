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
import CtaBand from '@/components/marketing/CtaBand';
import { MENU } from '@/lib/content/menu';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MENU.map((item) => ({ locale, id: item.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const item = MENU.find((m) => m.id === params.id);
  if (!item) return {};
  return {
    title: pick(item.name, params.locale),
    description: pick(item.description, params.locale),
    openGraph: { images: [item.image] },
  };
}

function Detail({ id }: { id: string }) {
  const t = useTranslations('menu');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const item = MENU.find((m) => m.id === id);
  if (!item) notFound();

  const related = MENU.filter(
    (m) => m.category === item.category && m.id !== id,
  ).slice(0, 3);

  return (
    <>
      <Section tone="ivory" spacing="lg" container={false}>
        <Container className="pt-24">
          <Breadcrumbs
            items={[
              { label: tNav('home'), href: '/' },
              { label: t('title'), href: '/menu' },
              { label: pick(item.name, locale) },
            ]}
          />
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={pick(item.name, locale)}
                className="w-full rounded-3xl object-cover shadow-xl"
              />
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {t(item.category)}
              </span>
              <h1 className="mt-3 font-serif text-4xl">{pick(item.name, locale)}</h1>
              <div className="hairline my-6" />
              <p className="text-charcoal/70">{pick(item.description, locale)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-wider text-gold-dark"
                  >
                    {pick(tag, locale)}
                  </span>
                ))}
              </div>
              <p className="mt-6 font-serif text-3xl font-semibold text-gold-dark">
                {formatPrice(item.price, locale)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/order" variant="gold">
                  {t('order')}
                </Button>
                <Button href="/configure" variant="outline">
                  {t('customCta')}
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
            {related.map((m) => (
              <Link
                key={m.id}
                href={`/menu/${m.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={pick(m.name, locale)}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg">{pick(m.name, locale)}</h3>
                  <p className="text-sm text-gold-dark">
                    {formatPrice(m.price, locale)}
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

export default function MenuDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(params.locale);
  return <Detail id={params.id} />;
}
