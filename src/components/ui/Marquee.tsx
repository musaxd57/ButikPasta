import { cn } from '@/lib/utils';

/** Infinite horizontal marquee of text items (press names, taglines). */
export default function Marquee({
  items,
  tone = 'light',
}: {
  items: string[];
  tone?: 'light' | 'dark';
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              'whitespace-nowrap font-serif text-2xl tracking-wide md:text-3xl',
              tone === 'light' ? 'text-ivory/40' : 'text-charcoal/30',
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
