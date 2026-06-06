'use client';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'gold' | 'outline' | 'ghost' | 'dark' | 'light';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  gold: 'bg-gold text-charcoal hover:bg-gold-light hover:shadow-[0_8px_30px_rgba(201,168,76,0.35)]',
  outline:
    'border border-gold/60 text-gold hover:bg-gold hover:text-charcoal',
  ghost: 'text-charcoal/70 hover:text-charcoal',
  dark: 'bg-charcoal text-ivory hover:bg-charcoal-light',
  light:
    'border border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal',
};

const SIZE: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-sm',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

function classesFor({ variant = 'gold', size = 'md', fullWidth, className }: BaseProps) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98]',
    VARIANT[variant],
    SIZE[size],
    fullWidth && 'w-full',
    className,
  );
}

/** Polymorphic button that renders a localized <Link> when `href` is given. */
export function Button(
  props: BaseProps &
    (
      | ({ href: string } & Record<string, unknown>)
      | ButtonHTMLAttributes<HTMLButtonElement>
    ),
) {
  const { variant, size, children, className, fullWidth, ...rest } = props;
  const cls = classesFor({ variant, size, fullWidth, className, children });

  if ('href' in props && typeof props.href === 'string') {
    const { href } = props;
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export default Button;
