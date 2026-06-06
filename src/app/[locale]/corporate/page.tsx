import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BadgeCheck, Package, ReceiptText, Truck } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import GalleryPreview from '@/components/marketing/GalleryPreview';
import CtaBand from '@/components/marketing/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate' });
  return { title: t('title') };
}

function CorporateBody() {
  const t = useTranslations('corporate');
  const tNav = useTranslations('nav');

  const perks = [
    { icon: BadgeCheck, label: t('perk1') },
    { icon: Package, label: t('perk2') },
    { icon: ReceiptText, label: t('perk3') },
    { icon: Truck, label: t('perk4') },
  ];

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('heroLead')}
        image="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1920&q=80"
        height="lg"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('corporate') }]}
      />

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal delay={0.15} className="order-2 md:order-1">
            <p className="eyebrow">{tNav('corporate')}</p>
            <h2 className="section-title mt-3">{t('introTitle')}</h2>
            <div className="hairline my-6" />
            <p className="text-charcoal/70">{t('introBody')}</p>
            <div className="mt-8">
              <Button href="/contact" variant="gold">
                {t('ctaQuote')}
              </Button>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <div
              className="aspect-[4/3] rounded-3xl bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=900&q=80')",
              }}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="charcoal">
        <SectionHeading title={t('perksTitle')} tone="light" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-ivory/10 bg-charcoal-light/40 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <p.icon size={24} />
                </div>
                <p className="mt-4 text-sm text-ivory/80">{p.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivoryDark">
        <SectionHeading title={tNav('gallery')} />
        <div className="mt-12">
          <GalleryPreview category="corporate" limit={6} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function CorporatePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <CorporateBody />;
}
