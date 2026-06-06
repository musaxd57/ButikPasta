import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CupcakesClient from '@/components/cupcakes/CupcakesClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'cupcakes' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('cupcakes');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1426869981800-95ebf51ce900?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory">
        <CupcakesClient />
      </Section>
      <Section tone="charcoalDark" spacing="md">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="section-title text-ivory">{t('ctaTitle')}</h2>
          <p className="mt-4 text-ivory/65">{t('ctaLead')}</p>
          <div className="mt-8">
            <Button href="/contact" variant="gold">
              {t('ctaButton')}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export default function CupcakesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
