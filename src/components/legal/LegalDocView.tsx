import { useLocale } from 'next-intl';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { pick } from '@/lib/i18nContent';
import type { LegalDoc } from '@/lib/content/legal';

export default function LegalDocView({
  doc,
  updatedLabel,
}: {
  doc: LegalDoc;
  updatedLabel: string;
}) {
  const locale = useLocale();
  return (
    <Section tone="ivory" containerSize="narrow">
      <p className="mb-10 text-xs uppercase tracking-[0.15em] text-charcoal/45">
        {updatedLabel}:{' '}
        {new Date(doc.updated).toLocaleDateString(
          locale === 'tr' ? 'tr-TR' : 'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' },
        )}
      </p>
      <div className="space-y-10">
        {doc.sections.map((section, i) => (
          <Reveal key={i}>
            <h2 className="font-serif text-2xl text-charcoal">
              {pick(section.heading, locale)}
            </h2>
            <div className="hairline my-4" />
            <div className="space-y-4">
              {section.paragraphs.map((para, j) => (
                <p key={j} className="leading-relaxed text-charcoal/70">
                  {pick(para, locale)}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
