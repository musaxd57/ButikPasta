import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import StatCounter from '@/components/ui/StatCounter';
import Marquee from '@/components/ui/Marquee';
import CtaBand from '@/components/marketing/CtaBand';
import { PRESS_NAMES, STATS, TEAM, VALUES } from '@/lib/content/site';
import { pick } from '@/lib/i18nContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'atelier' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('atelier');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1920&q=80"
        height="lg"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />

      <Section tone="ivory">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div
              className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80')",
              }}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="section-title">{t('spaceTitle')}</h2>
            <div className="hairline my-6" />
            <p className="text-charcoal/70">{t('spaceBody')}</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {STATS.slice(0, 2).map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-4xl font-semibold text-gold">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/50">
                    {pick(s.label, locale)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="charcoal">
        <SectionHeading
          eyebrow={t('teamSubtitle')}
          title={t('teamTitle')}
          tone="light"
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal-light/30">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-ivory">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gold">
                    {pick(member.role, locale)}
                  </p>
                  <p className="mt-3 text-sm text-ivory/60">{pick(member.bio, locale)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivoryDark">
        <SectionHeading title={t('valuesTitle')} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card-lux flex h-full flex-col items-center p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon name={v.icon} size={24} />
                </div>
                <h3 className="mt-5 font-serif text-xl">{pick(v.title, locale)}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{pick(v.desc, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoalDark" spacing="sm">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.35em] text-gold">
          {t('pressTitle')}
        </p>
        <Marquee items={PRESS_NAMES} tone="light" />
      </Section>

      <CtaBand />
    </>
  );
}

export default function AtelierPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
