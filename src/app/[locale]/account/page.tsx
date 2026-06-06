import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import LogoutButton from '@/components/account/LogoutButton';
import { getCurrentCustomer } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/pricing';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'account' });
  return { title: t('dashboard') };
}

const STATUS_COLOR: Record<string, string> = {
  PENDING: 'bg-amber-500/15 text-amber-600',
  IN_PROGRESS: 'bg-blue-500/15 text-blue-600',
  READY: 'bg-violet-500/15 text-violet-600',
  DELIVERED: 'bg-emerald-500/15 text-emerald-600',
  CANCELLED: 'bg-rose-500/15 text-rose-600',
};

export default async function AccountPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect(params.locale === 'en' ? '/en/account/login' : '/account/login');
  }

  const t = await getTranslations({ locale: params.locale, namespace: 'account' });
  const tAdmin = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const orders = await prisma.order.findMany({
    where: { customerEmail: customer.email },
    orderBy: { createdAt: 'desc' },
  });

  const fmtDate = (d: Date) =>
    new Date(d).toLocaleDateString(params.locale === 'tr' ? 'tr-TR' : 'en-US');

  return (
    <Section tone="ivory" className="pt-32">
      <div className="mx-auto max-w-4xl">
        {/* Profile header */}
        <div className="card-lux flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t('welcome')}
            </p>
            <h1 className="mt-1 font-serif text-3xl">{customer.name ?? customer.email}</h1>
            <p className="mt-1 text-sm text-charcoal/55">{customer.email}</p>
            {customer.phone && (
              <p className="text-sm text-charcoal/55">{customer.phone}</p>
            )}
            <p className="mt-1 text-xs text-charcoal/40">
              {t('memberSince')}: {fmtDate(customer.createdAt)}
            </p>
          </div>
          <LogoutButton label={t('logout')} />
        </div>

        {/* Orders */}
        <h2 className="mb-4 mt-10 font-serif text-2xl">{t('myOrders')}</h2>
        {orders.length === 0 ? (
          <div className="card-lux p-8 text-center">
            <p className="text-charcoal/55">{t('noOrders')}</p>
            <div className="mt-6">
              <Button href="/configure" variant="gold">
                {t('browseShop')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-charcoal/10">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-charcoal/[0.03] text-xs uppercase tracking-wider text-charcoal/45">
                <tr>
                  <th className="px-5 py-3">{t('orderNumber')}</th>
                  <th className="px-5 py-3">{t('date')}</th>
                  <th className="px-5 py-3">{t('amount')}</th>
                  <th className="px-5 py-3">{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-charcoal/8">
                    <td className="px-5 py-4 font-mono text-gold-dark">{o.orderNumber}</td>
                    <td className="px-5 py-4 text-charcoal/60">{fmtDate(o.deliveryDate)}</td>
                    <td className="px-5 py-4">{formatPrice(o.totalPrice, params.locale)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          STATUS_COLOR[o.status] ?? ''
                        }`}
                      >
                        {tAdmin(`status${o.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Section>
  );
}
