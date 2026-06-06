import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import GlossaryClient from '@/components/glossary/GlossaryClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'glossary' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('glossary');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory">
        <GlossaryClient />
      </Section>
    </>
  );
}

export default function GlossaryPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
