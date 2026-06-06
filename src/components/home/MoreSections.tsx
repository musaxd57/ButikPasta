'use client';

import { useLocale, useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import StatCounter from '@/components/ui/StatCounter';
import Newsletter from '@/components/ui/Newsletter';
import { pick } from '@/lib/i18nContent';
import { INGREDIENTS, PROCESS, STATS, VALUES } from '@/lib/content/site';

export function ProcessSection() {
  const t = useTranslations('process');
  const locale = useLocale();
  return (
    <Section tone="ivoryDark">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <div className="mt-14 grid gap-8 md:grid-cols-4">
        {PROCESS.map((step, i) => (
          <Reveal key={i} delay={i * 0.1} className="relative text-center">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon name={step.icon} size={26} />
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-semibold text-charcoal">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-xl">{pick(step.title, locale)}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-charcoal/60">
              {pick(step.desc, locale)}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function IngredientsSection() {
  const t = useTranslations('ingredients');
  const locale = useLocale();
  return (
    <Section tone="ivory">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {INGREDIENTS.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_30px_rgba(26,26,26,0.05)]">
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={pick(item.title, locale)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg">{pick(item.title, locale)}</h3>
                <p className="mt-1.5 text-sm text-charcoal/60">
                  {pick(item.desc, locale)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function StatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();
  return (
    <Section tone="charcoal">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        tone="light"
      />
      <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={i} delay={i * 0.1} className="text-center">
            <p className="font-serif text-5xl font-semibold text-gold">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/60">
              {pick(stat.label, locale)}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WhyUsSection() {
  const t = useTranslations('whyus');
  const locale = useLocale();
  return (
    <Section tone="ivoryDark">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
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
  );
}

export function NewsletterSection() {
  const t = useTranslations('newsletter');
  return (
    <Section tone="charcoalDark" spacing="md">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="section-title text-ivory">{t('title')}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ivory/65">
          {t('subtitle')}
        </p>
        <div className="mt-8">
          <Newsletter tone="light" />
        </div>
      </Reveal>
    </Section>
  );
}
