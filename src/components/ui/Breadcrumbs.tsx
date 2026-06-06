import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

/** Minimal gold breadcrumb trail for interior pages. */
export default function Breadcrumbs({
  items,
  tone = 'dark',
}: {
  items: Crumb[];
  tone?: 'dark' | 'light';
}) {
  const base = tone === 'light' ? 'text-ivory/50' : 'text-charcoal/45';
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.15em]">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className={cn(base, 'transition-colors hover:text-gold')}>
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'text-gold' : base}>{item.label}</span>
              )}
              {!last && <ChevronRight size={12} className={base} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
