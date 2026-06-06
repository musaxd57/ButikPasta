import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import AuthProvider from '@/components/admin/AuthProvider';
import { ToastProvider } from '@/components/ui/Toast';
import trMessages from '../../../messages/tr.json';

export const metadata: Metadata = {
  title: 'Admin · Atelier Cake',
  robots: { index: false, follow: false },
};

// The admin panel has its own chrome (no public navbar/footer) and is served in
// Turkish for internal staff.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="tr" messages={trMessages}>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
