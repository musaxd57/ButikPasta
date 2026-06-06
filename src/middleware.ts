import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except api, admin, _next, and static files. The admin
  // panel has its own non-localized root layout.
  matcher: [
    '/',
    '/(tr|en)/:path*',
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
};
