import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl font-semibold">
            {tBrand('name')}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold">
            {t('tagline')}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            {tBrand('tagline')}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
            {t('explore')}
          </h4>
          <ul className="space-y-2.5 text-sm text-ivory/70">
            {(['configure', 'gallery', 'about', 'order'] as const).map((k) => (
              <li key={k}>
                <Link
                  href={`/${k === 'configure' ? 'configure' : k}`}
                  className="transition-colors hover:text-gold"
                >
                  {tNav(k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
            {t('contact')}
          </h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-gold" /> {t('address')}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-gold" /> +90 555 555 55 55
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-gold" /> siparis@ateliercake.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
            {t('follow')}
          </h4>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-gold"
          >
            <Instagram size={18} /> @ateliercake
          </a>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-ivory/40 sm:flex-row">
          <p>
            © {year} {tBrand('name')}. {t('rights')}
          </p>
          <p>Made with care in {t('address')}</p>
        </div>
      </div>
    </footer>
  );
}
