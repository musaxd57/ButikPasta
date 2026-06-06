import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

/** Gold-on-charcoal call-to-action band reused at the bottom of most pages. */
export default function CtaBand() {
  const t = useTranslations('ctaBand');
  return (
    <Section tone="charcoalDark" spacing="lg">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="section-title text-ivory">{t('title')}</h2>
        <div className="hairline mx-auto my-6" />
        <p className="text-ivory/70">{t('lead')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/configure" variant="gold">
            {t('primary')}
          </Button>
          <Button href="/contact" variant="light">
            {t('secondary')}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
