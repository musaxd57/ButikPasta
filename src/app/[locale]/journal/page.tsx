import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import JournalList from '@/components/journal/JournalList';
import CtaBand from '@/components/marketing/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'journal' });
  return { title: t('title') };
}

function JournalBody() {
  const t = useTranslations('journal');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('journal') }]}
      />
      <Section tone="ivory">
        <JournalList />
      </Section>
      <CtaBand />
    </>
  );
}

export default function JournalPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <JournalBody />;
}
