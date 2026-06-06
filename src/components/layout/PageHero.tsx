import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Breadcrumbs, { Crumb } from '@/components/ui/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';

/**
 * Consistent interior-page hero: dark image banner with eyebrow, title, lead
 * and an optional breadcrumb trail.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  height = 'md',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  crumbs?: Crumb[];
  height?: 'sm' | 'md' | 'lg';
}) {
  const h =
    height === 'sm'
      ? 'min-h-[42vh]'
      : height === 'lg'
        ? 'min-h-[68vh]'
        : 'min-h-[52vh]';
  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden pt-20',
        h,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/65 to-charcoal/90" />
      <Container className="relative z-10 py-16 text-center">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="section-title mt-3 text-ivory">{title}</h1>
          <div className="hairline mx-auto my-6" />
          {lead && (
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ivory/75">
              {lead}
            </p>
          )}
          {crumbs && (
            <div className="mt-8 flex justify-center">
              <Breadcrumbs items={crumbs} tone="light" />
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
