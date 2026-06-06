import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HtmlLang from '@/components/layout/HtmlLang';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieConsent from '@/components/ui/CookieConsent';
import { ToastProvider } from '@/components/ui/Toast';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  const tBrand = await getTranslations({
    locale: params.locale,
    namespace: 'brand',
  });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('homeTitle'),
      template: `%s · ${tBrand('name')}`,
    },
    description: t('homeDesc'),
    keywords: [
      'butik pasta',
      'İstanbul pasta',
      'luxury cake',
      'bespoke cake Istanbul',
      'düğün pastası',
      'özel tasarım pasta',
    ],
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDesc'),
      type: 'website',
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      siteName: tBrand('name'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDesc'),
    },
    alternates: {
      languages: { tr: '/tr', en: '/en' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as 'tr' | 'en')) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang locale={locale} />
      <ToastProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
