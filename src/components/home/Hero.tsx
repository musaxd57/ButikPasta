'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,15,15,0.7))]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.5em] text-gold"
        >
          Atelier Cake · İstanbul
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 font-serif text-5xl font-medium leading-tight text-ivory sm:text-6xl md:text-7xl"
        >
          <span className="text-gold-shimmer">{t('heroTagline')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg"
        >
          {t('heroSub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/configure" className="btn-gold">
            {t('ctaConfigure')}
          </Link>
          <Link href="/gallery" className="btn-outline border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
            {t('ctaGallery')}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
