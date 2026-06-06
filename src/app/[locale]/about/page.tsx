import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Heart, Leaf, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return { title: t('aboutTitle') };
}

function AboutContent() {
  const t = useTranslations('about');
  const values = [
    { icon: Heart, title: t('value1'), desc: t('value1Desc') },
    { icon: Leaf, title: t('value2'), desc: t('value2Desc') },
    { icon: Sparkles, title: t('value3'), desc: t('value3Desc') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative z-10 px-6 text-center">
          <Reveal>
            <p className="eyebrow">Atelier Cake</p>
            <h1 className="section-title mt-3 text-ivory">{t('title')}</h1>
            <p className="mx-auto mt-4 max-w-lg text-ivory/75">{t('lead')}</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <div className="hairline mx-auto mb-8" />
          <p className="font-serif text-2xl leading-relaxed text-charcoal/80 md:text-3xl">
            {t('story')}
          </p>
        </Reveal>
      </section>

      {/* Founder */}
      <section className="bg-charcoal py-24 text-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <div
              className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=800&q=80')",
              }}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">{t('founderRole')}</p>
            <h2 className="mt-3 font-serif text-4xl">{t('founderName')}</h2>
            <div className="hairline my-6" />
            <p className="text-ivory/70">{t('founderBio')}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center">
          <h2 className="section-title">{t('valuesTitle')}</h2>
          <div className="hairline mx-auto my-6" />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12}>
              <div className="card-lux flex h-full flex-col items-center p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <v.icon size={24} />
                </div>
                <h3 className="mt-5 font-serif text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="border-t border-charcoal/10 bg-ivory-dark py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="eyebrow">{t('pressTitle')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {['VOGUE', 'ELLE', 'TimeOut', 'Gastronomi', 'Habertürk'].map(
              (name) => (
                <span key={name} className="font-serif text-2xl tracking-wide">
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return <AboutContent />;
}
