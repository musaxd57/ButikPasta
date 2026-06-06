import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  // Default locale (tr) is served without a prefix at "/"; English lives under
  // "/en". This avoids a root redirect, which Vercel's edge routing can 404.
  localePrefix: 'as-needed',
});

export type AppLocale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
