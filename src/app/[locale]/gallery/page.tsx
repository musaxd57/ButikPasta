import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import GalleryClient from '@/components/gallery/GalleryClient';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return { title: t('galleryTitle') };
}

export default function GalleryPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <div className="bg-ivory">
      <GalleryClient />
    </div>
  );
}
