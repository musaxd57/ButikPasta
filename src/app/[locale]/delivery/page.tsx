import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import LegalDocView from '@/components/legal/LegalDocView';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { DELIVERY } from '@/lib/content/legal';
import { DELIVERY_ZONES } from '@/lib/content/site';
import { pick } from '@/lib/i18nContent';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'legal' });
  return { title: t('deliveryTitle') };
}

function Body() {
  const t = useTranslations('legal');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  return (
    <>
      <PageHero
        eyebrow="Atelier Cake"
        title={t('deliveryTitle')}
        image="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1920&q=80"
        height="sm"
        crumbs={[
          { label: tNav('home'), href: '/' },
          { label: t('deliveryTitle') },
        ]}
      />
      <LegalDocView doc={DELIVERY} updatedLabel={t('updated')} />

      <Section tone="ivoryDark">
        <SectionHeading title={t('deliveryZonesTitle')} />
        <div className="mt-10 overflow-hidden rounded-2xl border border-charcoal/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal text-ivory">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">
                  {t('zone')}
                </th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">
                  {t('districts')}
                </th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">
                  {t('fee')}
                </th>
              </tr>
            </thead>
            <tbody>
              {DELIVERY_ZONES.map((zone, i) => (
                <tr key={i} className="border-t border-charcoal/10 bg-white">
                  <td className="px-5 py-4 font-serif text-base">
                    {pick(zone.name, locale)}
                  </td>
                  <td className="px-5 py-4 text-charcoal/65">
                    {zone.districts.join(', ')}
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-gold-dark">
                    {pick(zone.fee, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

export default function DeliveryPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Body />;
}
