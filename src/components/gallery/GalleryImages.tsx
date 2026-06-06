'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Main image with a thumbnail strip; switches the main photo on click. */
export default function GalleryImages({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                i === active ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
