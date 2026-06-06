import type { FlavorKey } from '@/types/cake';
import type { Bilingual } from './site';

export interface FlavorDetail {
  key: FlavorKey;
  swatch: string;
  image: string;
  name: Bilingual;
  description: Bilingual;
  notes: Bilingual[];
}

const fimg = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const FLAVOR_DETAILS: FlavorDetail[] = [
  {
    key: 'vanilla',
    swatch: 'radial-gradient(circle at 35% 30%, #fbf1da, #e8d3a8 70%)',
    image: fimg('photo-1464349095431-e9a21285b5f3'),
    name: { tr: 'Vanilya', en: 'Vanilla' },
    description: {
      tr: 'Madagaskar vanilyasıyla hazırlanan, yumuşacık ve zamansız klasiğimiz.',
      en: 'Our timeless classic, made with Madagascar vanilla and a tender crumb.',
    },
    notes: [
      { tr: 'Bourbon vanilya', en: 'Bourbon vanilla' },
      { tr: 'Tereyağı', en: 'Butter' },
      { tr: 'Krema', en: 'Cream' },
    ],
  },
  {
    key: 'chocolate',
    swatch: 'radial-gradient(circle at 35% 30%, #7a4a2e, #3f2417 70%)',
    image: fimg('photo-1578985545062-69928b1d9587'),
    name: { tr: 'Çikolata', en: 'Chocolate' },
    description: {
      tr: 'Yüksek kakao oranlı Belçika çikolatasıyla yoğun ve kadifemsi bir lezzet.',
      en: 'Rich, velvety indulgence made with high-cocoa Belgian chocolate.',
    },
    notes: [
      { tr: 'Belçika kuvertürü', en: 'Belgian couverture' },
      { tr: 'Kakao', en: 'Cocoa' },
      { tr: 'Ganaj', en: 'Ganache' },
    ],
  },
  {
    key: 'redvelvet',
    swatch: 'radial-gradient(circle at 35% 30%, #b23a3a, #6f1d1d 70%)',
    image: fimg('photo-1586985289688-ca3cf47d3e6e'),
    name: { tr: 'Red Velvet', en: 'Red Velvet' },
    description: {
      tr: 'Hafif kakao notası ve labne kreması ile dengeli, ikonik bir tat.',
      en: 'A balanced, iconic taste with a subtle cocoa note and cream-cheese frosting.',
    },
    notes: [
      { tr: 'Labne kreması', en: 'Cream cheese' },
      { tr: 'Hafif kakao', en: 'Light cocoa' },
      { tr: 'Vanilya', en: 'Vanilla' },
    ],
  },
  {
    key: 'pistachio',
    swatch: 'radial-gradient(circle at 35% 30%, #cfe1ab, #9cbf72 70%)',
    image: fimg('photo-1488477181946-6428a0291777'),
    name: { tr: 'Antep Fıstığı', en: 'Pistachio' },
    description: {
      tr: 'Taze çekilmiş gerçek Antep fıstığıyla sofistike imza lezzetimiz.',
      en: 'Our sophisticated signature, made with freshly ground genuine pistachio.',
    },
    notes: [
      { tr: 'Antep fıstığı', en: 'Antep pistachio' },
      { tr: 'Tereyağı', en: 'Butter' },
      { tr: 'Bal', en: 'Honey' },
    ],
  },
  {
    key: 'lemon',
    swatch: 'radial-gradient(circle at 35% 30%, #fbec8f, #ecc94b 70%)',
    image: fimg('photo-1519915028121-7d3463d20b13'),
    name: { tr: 'Limon', en: 'Lemon' },
    description: {
      tr: 'Ferahlatıcı limon ve hafif kremayla yaz esintisi taşıyan bir denge.',
      en: 'A refreshing balance of zesty lemon and light cream — a summer breeze.',
    },
    notes: [
      { tr: 'Taze limon', en: 'Fresh lemon' },
      { tr: 'Limon kabuğu', en: 'Lemon zest' },
      { tr: 'Mascarpone', en: 'Mascarpone' },
    ],
  },
];
