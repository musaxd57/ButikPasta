import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });
  return { title: t('title') };
}

function ContactBody() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '905555555555';

  const info = [
    { icon: MapPin, label: t('addressLabel'), value: 'Nişantaşı, İstanbul' },
    { icon: Phone, label: t('phoneLabel'), value: '+90 555 555 55 55' },
    { icon: Mail, label: t('emailLabel'), value: 'siparis@ateliercake.com' },
    { icon: Clock, label: t('hoursLabel'), value: t('hours') },
  ];

  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('title')}
        lead={t('subtitle')}
        image="https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: tNav('home'), href: '/' }, { label: tNav('contact') }]}
      />

      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="font-serif text-2xl">{t('infoTitle')}</h2>
            <div className="hairline my-5" />
            <ul className="space-y-5">
              {info.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-charcoal/45">
                      {item.label}
                    </p>
                    <p className="text-sm text-charcoal/80">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[#1c9e4d] transition hover:bg-[#25D366] hover:text-white"
            >
              {t('whatsapp')}
            </a>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <iframe
                title="map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=28.98%2C41.04%2C29.02%2C41.06&layer=mapnik"
                className="h-56 w-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <ContactBody />;
}
