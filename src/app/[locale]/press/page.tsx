import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Award, Quote } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';
import CtaBand from '@/components/marketing/CtaBand';
import { PRESS_NAMES } from '@/lib/content/site';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'press' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('press');
  const tNav = useTranslations('nav');

  const quotes = [
    { text: t('quote1'), source: 'VOGUE' },
    { text: t('quote2'), source: 'ELLE' },
    { text: t('quote3'), source: 'TimeOut' },
  ];
  const awards = [t('award1'), t('award2'), t('award3'), t('award4')];

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />

      <Section tone="ivory">
        <SectionHeading title={t('featuredTitle')} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card-lux flex h-full flex-col p-8">
                <Quote className="text-gold" size={28} />
                <p className="mt-4 flex-1 font-serif text-lg italic text-charcoal/80">
                  “{q.text}”
                </p>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold">
                  {q.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoal">
        <SectionHeading title={t('awardsTitle')} tone="light" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-charcoal-light/40 p-5">
                <Award className="shrink-0 text-gold" size={24} />
                <span className="text-sm text-ivory/80">{a}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivoryDark" spacing="sm">
        <Marquee items={PRESS_NAMES} tone="dark" />
      </Section>

      <CtaBand />
    </>
  );
}

export default function PressPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
