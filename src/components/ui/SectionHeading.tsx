import { cn } from '@/lib/utils';
import Reveal from './Reveal';

/**
 * Eyebrow + title + optional lead, with a centred gold hairline. Used as the
 * header of nearly every marketing section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'dark',
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const isCenter = align === 'center';
  return (
    <Reveal
      className={cn(
        isCenter ? 'text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          'section-title mt-3',
          tone === 'light' ? 'text-ivory' : 'text-charcoal',
        )}
      >
        {title}
      </h2>
      <div className={cn('hairline my-6', isCenter && 'mx-auto')} />
      {lead && (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed',
            isCenter && 'mx-auto',
            tone === 'light' ? 'text-ivory/70' : 'text-charcoal/65',
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
