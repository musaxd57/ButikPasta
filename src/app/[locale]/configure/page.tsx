import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Configurator from '@/components/configurator/Configurator';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return { title: t('configureTitle') };
}

export default function ConfigurePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <div className="bg-ivory">
      <Configurator />
    </div>
  );
}
