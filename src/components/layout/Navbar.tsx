'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/', key: 'home' },
  { href: '/configure', key: 'configure' },
  { href: '/gallery', key: 'gallery' },
  { href: '/about', key: 'about' },
  { href: '/order', key: 'order' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (next: 'tr' | 'en') => {
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory/90 py-3 shadow-[0_4px_30px_rgba(26,26,26,0.06)] backdrop-blur-md'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className={cn(
              'font-serif text-xl font-semibold tracking-wide transition-colors md:text-2xl',
              scrolled ? 'text-charcoal' : 'text-ivory',
            )}
          >
            {tBrand('name')}
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
            İstanbul
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  'relative text-xs uppercase tracking-[0.18em] transition-colors',
                  scrolled ? 'text-charcoal/70' : 'text-ivory/80',
                  'hover:text-gold',
                  active && 'text-gold',
                )}
              >
                {t(link.key)}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div
            className={cn(
              'hidden items-center gap-1 rounded-full border px-1 py-1 text-xs sm:flex',
              scrolled ? 'border-charcoal/15' : 'border-ivory/30',
            )}
          >
            {(['tr', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  'rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors',
                  locale === l
                    ? 'bg-gold text-charcoal'
                    : scrolled
                      ? 'text-charcoal/60 hover:text-charcoal'
                      : 'text-ivory/70 hover:text-ivory',
                )}
              >
                {l === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={cn(
              'lg:hidden',
              scrolled ? 'text-charcoal' : 'text-ivory',
            )}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-ivory lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-charcoal/5 py-3 text-sm uppercase tracking-[0.18em] text-charcoal/80 hover:text-gold"
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="mt-3 flex gap-2">
                {(['tr', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      switchLocale(l);
                      setOpen(false);
                    }}
                    className={cn(
                      'rounded-full border px-4 py-2 text-xs uppercase tracking-wider',
                      locale === l
                        ? 'border-gold bg-gold text-charcoal'
                        : 'border-charcoal/15 text-charcoal/60',
                    )}
                  >
                    {l === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
