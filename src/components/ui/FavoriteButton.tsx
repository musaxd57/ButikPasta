'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '@/store/favorites';
import { cn } from '@/lib/utils';

/**
 * Heart toggle for saving an item to the wishlist. Guards against hydration
 * mismatch by only reflecting the persisted state after mount.
 */
export default function FavoriteButton({
  id,
  className,
  size = 18,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const { ids, toggle } = useFavorites();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted && ids.includes(id);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-label="Favorite"
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-colors hover:bg-white',
        className,
      )}
    >
      <Heart
        size={size}
        className={cn(
          'transition-colors',
          active ? 'fill-rose text-rose' : 'text-charcoal/50',
        )}
      />
    </motion.button>
  );
}
