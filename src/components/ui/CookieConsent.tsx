'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'atelier-cookie-consent';

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          className="fixed bottom-6 left-6 z-[90] max-w-sm rounded-2xl border border-charcoal/10 bg-white/95 p-5 shadow-2xl backdrop-blur"
        >
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 shrink-0 text-gold" size={22} />
            <div>
              <p className="text-sm leading-relaxed text-charcoal/75">
                {t('text')}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => decide('accepted')}
                  className="rounded-full bg-gold px-5 py-2 text-xs font-medium uppercase tracking-wider text-charcoal transition hover:bg-gold-light"
                >
                  {t('accept')}
                </button>
                <button
                  onClick={() => decide('declined')}
                  className="rounded-full px-5 py-2 text-xs uppercase tracking-wider text-charcoal/60 transition hover:text-charcoal"
                >
                  {t('decline')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
