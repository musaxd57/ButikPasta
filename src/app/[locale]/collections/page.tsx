import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/marketing/CtaBand';
import { COLLECTIONS } from '@/lib/content/collections';
import { pick } from '@/lib/i18nContent';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'collections',
  });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('collections');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />

      <Section tone="ivory">
        <div className="space-y-24">
          {COLLECTIONS.map((col, i) => (
            <Reveal key={col.slug}>
              <div
                className={cn(
                  'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
                  i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={col.cover}
                    alt={pick(col.name, locale)}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl"
                  />
                </div>
                <div>
                  <p className="eyebrow">{pick(col.tagline, locale)}</p>
                  <h2 className="section-title mt-3">{pick(col.name, locale)}</h2>
                  <div className="hairline my-6" />
                  <p className="text-charcoal/70">{pick(col.description, locale)}</p>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {col.images.map((src, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={j}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/configure" variant="gold" size="sm">
                      {t('designCta')}
                    </Button>
                    <Button href="/gallery" variant="ghost" size="sm">
                      {tNav('gallery')} <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function CollectionsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return <Body />;
}
