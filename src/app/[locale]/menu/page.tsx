import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import MenuClient from '@/components/menu/MenuClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'menu' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('menu');
  const tNav = useTranslations('nav');
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory">
        <MenuClient />
      </Section>
      <Section tone="ivoryDark" spacing="md">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="section-title">{t('customNote')}</h2>
          <div className="mt-8">
            <Button href="/configure" variant="gold">
              {t('customCta')}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export default function MenuPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
