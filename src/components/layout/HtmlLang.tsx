'use client';

import { useEffect } from 'react';

// Keeps <html lang> in sync with the active locale for accessibility/SEO,
// since the root layout renders statically.
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
