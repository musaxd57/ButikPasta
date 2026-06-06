import { cn } from '@/lib/utils';
import { ElementType, ReactNode } from 'react';

/**
 * Centered max-width content wrapper used across every page so horizontal
 * rhythm stays consistent.
 */
export default function Container({
  children,
  className,
  as: Tag = 'div',
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: 'narrow' | 'default' | 'wide';
}) {
  const max =
    size === 'narrow'
      ? 'max-w-3xl'
      : size === 'wide'
        ? 'max-w-[88rem]'
        : 'max-w-7xl';
  return <Tag className={cn('mx-auto w-full px-6', max, className)}>{children}</Tag>;
}
