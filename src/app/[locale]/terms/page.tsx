import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import LegalDocView from '@/components/legal/LegalDocView';
import { TERMS } from '@/lib/content/legal';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return { title: t('termsTitle') };
}

function Body() {
  const t = useTranslations('legal');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('termsTitle')}
        image="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('termsTitle') }]}
      />
      <LegalDocView doc={TERMS} updatedLabel={t('updated')} />
    </>
  );
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
