import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { CalendarCheck } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import AppointmentForm from '@/components/appointment/AppointmentForm';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'appointment',
  });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('appointment');
  const tNav = useTranslations('nav');
  const info = [t('info1'), t('info2'), t('info3')];

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{t('infoTitle')}</h2>
            <div className="hairline my-5" />
            <ul className="space-y-4">
              {info.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CalendarCheck size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm text-charcoal/70">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <AppointmentForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default function AppointmentPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return <Body />;
}
