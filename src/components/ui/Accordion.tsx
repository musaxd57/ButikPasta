'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Animated FAQ-style accordion. Single open item at a time. */
export default function Accordion({
  items,
  tone = 'dark',
}: {
  items: AccordionItem[];
  tone?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState<number | null>(0);
  const border = tone === 'light' ? 'border-ivory/15' : 'border-charcoal/10';
  const text = tone === 'light' ? 'text-ivory' : 'text-charcoal';
  const sub = tone === 'light' ? 'text-ivory/65' : 'text-charcoal/60';

  return (
    <div className={cn('divide-y', border)}>
      {items.map((item, i) => {
        const active = open === i;
        return (
          <div key={i} className={cn('border-t first:border-t-0', border)}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className={cn('font-serif text-lg md:text-xl', text)}>
                {item.question}
              </span>
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all',
                  active
                    ? 'rotate-45 border-gold bg-gold text-charcoal'
                    : cn(border, tone === 'light' ? 'text-ivory' : 'text-charcoal'),
                )}
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className={cn('pb-6 pr-12 text-sm leading-relaxed', sub)}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
