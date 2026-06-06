import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/marketing/CtaBand';
import { PACKAGES, ADD_ONS } from '@/lib/content/packages';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pricing' });
  return { title: t('title') };
}

function PricingBody() {
  const t = useTranslations('pricing');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('pricing') }]}
      />

      <Section tone="ivory">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.key} delay={i * 0.1}>
              <div
                className={cn(
                  'flex h-full flex-col rounded-3xl border p-8 transition-all',
                  pkg.highlighted
                    ? 'border-gold bg-charcoal text-ivory shadow-[0_20px_60px_rgba(26,26,26,0.25)] lg:-translate-y-4'
                    : 'border-charcoal/10 bg-white',
                )}
              >
                {pkg.highlighted && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-gold px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-charcoal">
                    {t('popular')}
                  </span>
                )}
                <h3 className="font-serif text-2xl">{pick(pkg.name, locale)}</h3>
                <p
                  className={cn(
                    'mt-1 text-xs uppercase tracking-wider',
                    pkg.highlighted ? 'text-ivory/55' : 'text-charcoal/45',
                  )}
                >
                  {t('serves')}: {pick(pkg.serves, locale)}
                </p>
                <div className="mt-5 flex items-end gap-1">
                  <span
                    className={cn(
                      'text-xs uppercase tracking-wider',
                      pkg.highlighted ? 'text-ivory/55' : 'text-charcoal/45',
                    )}
                  >
                    {t('from')}
                  </span>
                  <span className="font-serif text-4xl font-semibold text-gold">
                    {formatPrice(pkg.priceFrom, locale)}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-gold"
                      />
                      <span
                        className={
                          pkg.highlighted ? 'text-ivory/80' : 'text-charcoal/70'
                        }
                      >
                        {pick(f, locale)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href="/configure"
                    variant={pkg.highlighted ? 'gold' : 'outline'}
                    fullWidth
                  >
                    {t('choose')}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-charcoal/45">
          {t('note')}
        </p>
      </Section>

      <Section tone="ivoryDark">
        <SectionHeading title={t('addonsTitle')} eyebrow={t('addonsEyebrow')} />
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {ADD_ONS.map((addon, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <div className="flex items-center justify-between rounded-xl border border-charcoal/10 bg-white px-5 py-3.5">
                <span className="text-sm text-charcoal/75">
                  {pick(addon.name, locale)}
                </span>
                <span className="text-sm font-medium text-gold-dark">
                  +{formatPrice(addon.price, locale)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivoryDark" spacing="md">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="section-title">{t('customTitle')}</h2>
          <p className="mt-4 text-charcoal/65">{t('customLead')}</p>
          <div className="mt-8">
            <Button href="/configure" variant="gold">
              {t('customCta')}
            </Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <PricingBody />;
}
