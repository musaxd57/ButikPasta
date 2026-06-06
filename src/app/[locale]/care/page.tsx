import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { CARE_GUIDE } from '@/lib/content/care';
import { pick } from '@/lib/i18nContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'care' });
  return { title: t('title') };
}

function Body() {
  const t = useTranslations('care');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
      />
      <Section tone="ivory" containerSize="narrow">
        <div className="space-y-10">
          {CARE_GUIDE.map((section, i) => (
            <Reveal key={i}>
              <h2 className="font-serif text-2xl text-charcoal">
                {pick(section.heading, locale)}
              </h2>
              <div className="hairline my-4" />
              <div className="space-y-3">
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="leading-relaxed text-charcoal/70">
                    {pick(para, locale)}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/faq" variant="outline">
            {t('cta')}
          </Button>
        </div>
      </Section>
    </>
  );
}

export default function CarePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
