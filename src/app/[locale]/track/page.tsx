import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import TrackClient from '@/components/track/TrackClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'track' });
  return { title: t('title') };
}

function TrackBody() {
  const t = useTranslations('track');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('track') }]}
      />
      <Section tone="ivory">
        <Suspense fallback={null}>
          <TrackClient />
        </Suspense>
      </Section>
    </>
  );
}

export default function TrackPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <TrackBody />;
}
