import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import OrderClient from '@/components/order/OrderClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return { title: t('orderTitle') };
}

export default function OrderPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <div className="bg-ivory">
      <OrderClient />
    </div>
  );
}
