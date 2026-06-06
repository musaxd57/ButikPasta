// Curated pricing packages shown on the /pricing page. These are starting
// points; the configurator computes exact bespoke pricing.

import type { Bilingual } from './site';

export interface CakePackage {
  key: string;
  name: Bilingual;
  priceFrom: number;
  serves: Bilingual;
  highlighted?: boolean;
  features: Bilingual[];
}

export const PACKAGES: CakePackage[] = [
  {
    key: 'essential',
    name: { tr: 'Zarif', en: 'Essential' },
    priceFrom: 850,
    serves: { tr: '10-15 kişi', en: '10-15 guests' },
    features: [
      { tr: 'Tek katlı bespoke tasarım', en: 'Single-tier bespoke design' },
      { tr: '5 lezzet seçeneği', en: '5 flavour options' },
      { tr: 'Tereyağlı krema kaplama', en: 'Buttercream finish' },
      { tr: 'Kişiye özel mesaj', en: 'Personalised message' },
      { tr: 'Standart teslimat', en: 'Standard delivery' },
    ],
  },
  {
    key: 'signature',
    name: { tr: 'İmza', en: 'Signature' },
    priceFrom: 2200,
    serves: { tr: '30-40 kişi', en: '30-40 guests' },
    highlighted: true,
    features: [
      { tr: 'İki katlı bespoke tasarım', en: 'Two-tier bespoke design' },
      { tr: 'Premium kaplama & renk seçimi', en: 'Premium finish & colour choice' },
      { tr: 'Taze çiçek veya makaron süsleme', en: 'Fresh flower or macaron decoration' },
      { tr: 'Altın yaprak detay', en: 'Gold-leaf detailing' },
      { tr: 'Öncelikli teslimat', en: 'Priority delivery' },
      { tr: 'Birebir tasarım danışmanlığı', en: 'One-to-one design consultation' },
    ],
  },
  {
    key: 'couture',
    name: { tr: 'Couture', en: 'Couture' },
    priceFrom: 6000,
    serves: { tr: '60-80 kişi', en: '60-80 guests' },
    features: [
      { tr: 'Üç+ katlı görkemli tasarım', en: 'Three+ tier statement design' },
      { tr: 'Tamamen özel şeker sanatı', en: 'Fully custom sugar art' },
      { tr: 'Lüks çiçek aranjmanı', en: 'Luxury floral arrangement' },
      { tr: 'Tadım seansı', en: 'Tasting session' },
      { tr: 'Etkinlik günü kurulum', en: 'Event-day setup' },
      { tr: 'Adanmış proje yöneticisi', en: 'Dedicated project manager' },
    ],
  },
];

export interface AddOn {
  name: Bilingual;
  price: number;
}

export const ADD_ONS: AddOn[] = [
  { name: { tr: 'Taze çiçek aranjmanı', en: 'Fresh flower arrangement' }, price: 320 },
  { name: { tr: 'Altın yaprak detay', en: 'Gold-leaf detailing' }, price: 220 },
  { name: { tr: 'Yenilebilir logo baskı', en: 'Edible logo print' }, price: 180 },
  { name: { tr: 'Ekstra kat', en: 'Extra tier' }, price: 600 },
  { name: { tr: 'Tadım seansı', en: 'Tasting session' }, price: 400 },
  { name: { tr: 'Etkinlik günü kurulum', en: 'Event-day setup' }, price: 500 },
  { name: { tr: 'Özel pasta altlığı', en: 'Custom cake board' }, price: 120 },
  { name: { tr: 'Mini pasta seti (6 adet)', en: 'Mini cake set (6 pcs)' }, price: 450 },
];
