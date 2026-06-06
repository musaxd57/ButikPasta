import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Leaf, Recycle, Sprout, Zap } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/marketing/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'sustainability',
  });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('sustainability');
  const tNav = useTranslations('nav');

  const pillars = [
    { icon: Sprout, title: t('p1Title'), body: t('p1Body') },
    { icon: Recycle, title: t('p2Title'), body: t('p2Body') },
    { icon: Leaf, title: t('p3Title'), body: t('p3Body') },
    { icon: Zap, title: t('p4Title'), body: t('p4Body') },
  ];

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />

      <Section tone="ivory" containerSize="narrow">
        <Reveal className="text-center">
          <h2 className="section-title">{t('introTitle')}</h2>
          <div className="hairline mx-auto my-6" />
          <p className="text-charcoal/70">{t('introBody')}</p>
        </Reveal>
      </Section>

      <Section tone="ivoryDark">
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-2xl bg-white p-7 shadow-[0_4px_30px_rgba(26,26,26,0.05)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <p.icon size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/60">{p.body}</p>
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

export default function SustainabilityPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return <Body />;
}
