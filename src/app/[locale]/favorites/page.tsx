import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import FavoritesClient from '@/components/favorites/FavoritesClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'favorites' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('favorites');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory">
        <FavoritesClient />
      </Section>
    </>
  );
}

export default function FavoritesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
