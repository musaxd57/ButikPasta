import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { FAQ_GROUPS } from '@/lib/content/faqs';
import { pick } from '@/lib/i18nContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'faqPage' });
  return { title: t('title') };
}

function FaqBody() {
  const t = useTranslations('faqPage');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80"
        crumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('faq') },
        ]}
      />

      <Section tone="ivory" containerSize="narrow">
        <div className="space-y-12">
          {FAQ_GROUPS.map((group) => (
            <Reveal key={group.key}>
              <h2 className="mb-2 font-serif text-2xl text-charcoal">
                {pick(group.title, locale)}
              </h2>
              <div className="hairline mb-2" />
              <Accordion
                items={group.entries.map((e) => ({
                  question: pick(e.q, locale),
                  answer: pick(e.a, locale),
                }))}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoalDark" spacing="md">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="section-title text-ivory">{t('stillTitle')}</h2>
          <p className="mt-4 text-ivory/65">{t('stillLead')}</p>
          <div className="mt-8">
            <Button href="/contact" variant="gold">
              {t('stillCta')}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export default function FaqPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <FaqBody />;
}
