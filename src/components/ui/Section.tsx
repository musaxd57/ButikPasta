import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import Container from './Container';

type Tone = 'ivory' | 'ivoryDark' | 'charcoal' | 'charcoalDark' | 'transparent';

const TONE: Record<Tone, string> = {
  ivory: 'bg-ivory text-charcoal',
  ivoryDark: 'bg-ivory-dark text-charcoal',
  charcoal: 'bg-charcoal text-ivory',
  charcoalDark: 'bg-charcoal-dark text-ivory',
  transparent: '',
};

const SPACING = {
  sm: 'py-14 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-32',
};

/**
 * A full-bleed page section with a tone background and a centered container.
 * Keeps vertical rhythm and theming consistent across the marketing pages.
 */
export default function Section({
  children,
  tone = 'ivory',
  spacing = 'md',
  container = true,
  containerSize = 'default',
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  spacing?: keyof typeof SPACING;
  container?: boolean;
  containerSize?: 'narrow' | 'default' | 'wide';
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(TONE[tone], SPACING[spacing], className)}>
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
