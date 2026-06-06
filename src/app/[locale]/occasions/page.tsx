import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/marketing/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'occasions' });
  return { title: t('title') };
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

function Body() {
  const t = useTranslations('occasions');
  const tNav = useTranslations('nav');

  const cards = [
    { key: 'wedding', href: '/weddings', image: img('photo-1519869325930-281384150729') },
    { key: 'birthday', href: '/gallery', image: img('photo-1578985545062-69928b1d9587') },
    { key: 'corporate', href: '/corporate', image: img('photo-1606890737304-57a1ca8a5b62') },
    { key: 'baby', href: '/gallery', image: img('photo-1464349095431-e9a21285b5f3') },
    { key: 'custom', href: '/configure', image: img('photo-1535141192574-5d4897c12636') },
  ] as const;

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.key} delay={(i % 3) * 0.08}>
              <Link
                href={card.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-serif text-2xl text-ivory">{t(card.key)}</h2>
                  <p className="mt-1 text-sm text-ivory/70">{t(`${card.key}Desc`)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                    {t('explore')}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function OccasionsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
