import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/marketing/CtaBand';
import { FLAVOR_DETAILS } from '@/lib/content/flavors';
import { pick } from '@/lib/i18nContent';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'flavorsPage',
  });
  return { title: t('title') };
}

function FlavorsBody() {
  const t = useTranslations('flavorsPage');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('flavors') }]}
      />

      <Section tone="ivory">
        <div className="space-y-16">
          {FLAVOR_DETAILS.map((flavor, i) => (
            <Reveal key={flavor.key}>
              <div
                className={cn(
                  'grid items-center gap-10 md:grid-cols-2 md:gap-16',
                  i % 2 === 1 && 'md:[&>*:first-child]:order-2',
                )}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flavor.image}
                    alt={pick(flavor.name, locale)}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                  />
                  <span
                    className="absolute -bottom-5 left-6 h-16 w-16 rounded-full border-4 border-ivory shadow-lg"
                    style={{ background: flavor.swatch }}
                  />
                </div>
                <div>
                  <h2 className="font-serif text-3xl">{pick(flavor.name, locale)}</h2>
                  <div className="hairline my-5" />
                  <p className="text-charcoal/70">{pick(flavor.description, locale)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {flavor.notes.map((note, j) => (
                      <span
                        key={j}
                        className="rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-wider text-gold-dark"
                      >
                        {pick(note, locale)}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7">
                    <Button href="/configure" variant="outline" size="sm">
                      {t('designCta')}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivoryDark" spacing="md">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="section-title">{t('tasteTitle')}</h2>
          <p className="mt-4 text-charcoal/65">{t('tasteLead')}</p>
          <div className="mt-8">
            <Button href="/pricing" variant="gold">
              {tNav('pricing')}
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}

export default function FlavorsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <FlavorsBody />;
}
