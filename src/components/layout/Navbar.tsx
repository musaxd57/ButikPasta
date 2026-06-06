'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/', key: 'home' },
  { href: '/configure', key: 'configure' },
  { href: '/gallery', key: 'gallery' },
  { href: '/weddings', key: 'weddings' },
  { href: '/about', key: 'about' },
] as const;

// Secondary links grouped under the "Explore" dropdown.
const MORE_LINKS = [
  { href: '/collections', key: 'collections' },
  { href: '/corporate', key: 'corporate' },
  { href: '/flavors', key: 'flavors' },
  { href: '/pricing', key: 'pricing' },
  { href: '/journal', key: 'journal' },
  { href: '/reviews', key: 'reviews' },
  { href: '/appointment', key: 'appointment' },
  { href: '/gift-card', key: 'giftCard' },
  { href: '/glossary', key: 'glossary' },
  { href: '/care', key: 'care' },
  { href: '/faq', key: 'faq' },
  { href: '/track', key: 'track' },
  { href: '/contact', key: 'contact' },
] as const;

// Flat list used for the mobile menu.
const ALL_MOBILE_LINKS = [
  ...LINKS,
  ...MORE_LINKS,
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

          {/* Explore dropdown */}
          <div className="group relative">
            <button
              className={cn(
                'flex items-center gap-1 text-xs uppercase tracking-[0.18em] transition-colors hover:text-gold',
                scrolled ? 'text-charcoal/70' : 'text-ivory/80',
              )}
            >
              {t('more')}
              <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory py-2 shadow-[0_10px_40px_rgba(26,26,26,0.12)]">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="block px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-charcoal/70 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/order"
            className="rounded-full bg-gold px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-all hover:bg-gold-light"
          >
            {t('order')}
          </Link>
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
            <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-6 py-4">
              {ALL_MOBILE_LINKS.map((link) => (
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
