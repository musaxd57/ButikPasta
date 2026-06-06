import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import GalleryPreview from '@/components/marketing/GalleryPreview';
import CtaBand from '@/components/marketing/CtaBand';
import { PROCESS } from '@/lib/content/site';
import { pick } from '@/lib/i18nContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'weddings' });
  return { title: t('title') };
}

function WeddingsBody() {
  const t = useTranslations('weddings');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('heroLead')}
        image="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1920&q=80"
        height="lg"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('weddings') }]}
      />

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div
              className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=900&q=80')",
              }}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">{tNav('weddings')}</p>
            <h2 className="section-title mt-3">{t('introTitle')}</h2>
            <div className="hairline my-6" />
            <p className="text-charcoal/70">{t('introBody')}</p>
            <div className="mt-8">
              <Button href="/contact" variant="gold">
                {t('ctaConsult')}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivoryDark">
        <SectionHeading title={t('processTitle')} eyebrow="01 — 04" />
        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon name={step.icon} size={24} />
              </div>
              <h3 className="mt-4 font-serif text-lg">{pick(step.title, locale)}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-charcoal/60">
                {pick(step.desc, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoal">
        <SectionHeading title={t('galleryTitle')} tone="light" />
        <div className="mt-12">
          <GalleryPreview category="wedding" limit={6} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function WeddingsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <WeddingsBody />;
}
