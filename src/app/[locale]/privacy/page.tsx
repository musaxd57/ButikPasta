import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import LegalDocView from '@/components/legal/LegalDocView';
import { PRIVACY } from '@/lib/content/legal';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return { title: t('privacyTitle') };
}

function Body() {
  const t = useTranslations('legal');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('privacyTitle')}
        image="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('privacyTitle') }]}
      />
      <LegalDocView doc={PRIVACY} updatedLabel={t('updated')} />
    </>
  );
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
