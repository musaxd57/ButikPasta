import type { Bilingual } from './site';

export type MenuCategory = 'signature' | 'seasonal' | 'classic';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  image: string;
  price: number;
  name: Bilingual;
  description: Bilingual;
  tags: Bilingual[];
}

const m = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

// A curated catalogue of ready-to-order signature cakes. Distinct from the
// fully bespoke configurator — these are our house favourites at set prices.
export const MENU: MenuItem[] = [
  {
    id: 'm1',
    category: 'signature',
    image: m('photo-1578985545062-69928b1d9587'),
    price: 1450,
    name: { tr: 'Çikolata Rüyası', en: 'Chocolate Dream' },
    description: {
      tr: 'Üç kat Belçika çikolatası, yoğun ganaj ve çikolata yaprakları.',
      en: 'Three layers of Belgian chocolate, rich ganache and chocolate shards.',
    },
    tags: [
      { tr: 'Çikolata', en: 'Chocolate' },
      { tr: 'En Çok Satan', en: 'Bestseller' },
    ],
  },
  {
    id: 'm2',
    category: 'signature',
    image: m('photo-1488477181946-6428a0291777'),
    price: 1650,
    name: { tr: 'Antep Fıstığı Zarafeti', en: 'Pistachio Elegance' },
    description: {
      tr: 'Gerçek Antep fıstığı, hafif mascarpone kreması ve bal dokunuşu.',
      en: 'Genuine pistachio, light mascarpone cream and a touch of honey.',
    },
    tags: [
      { tr: 'İmza', en: 'Signature' },
      { tr: 'Fıstık', en: 'Pistachio' },
    ],
  },
  {
    id: 'm3',
    category: 'classic',
    image: m('photo-1586985289688-ca3cf47d3e6e'),
    price: 1350,
    name: { tr: 'Klasik Red Velvet', en: 'Classic Red Velvet' },
    description: {
      tr: 'İkonik kadife doku ve labne kreması ile dengeli bir lezzet.',
      en: 'A balanced taste with iconic velvet texture and cream-cheese frosting.',
    },
    tags: [{ tr: 'Klasik', en: 'Classic' }],
  },
  {
    id: 'm4',
    category: 'seasonal',
    image: m('photo-1464349095431-e9a21285b5f3'),
    price: 1500,
    name: { tr: 'Mevsim Meyveli Pavlova', en: 'Seasonal Berry Pavlova' },
    description: {
      tr: 'Çıtır beze, çırpılmış krema ve mevsimin taze meyveleri.',
      en: 'Crisp meringue, whipped cream and the season’s fresh berries.',
    },
    tags: [
      { tr: 'Mevsimlik', en: 'Seasonal' },
      { tr: 'Hafif', en: 'Light' },
    ],
  },
  {
    id: 'm5',
    category: 'signature',
    image: m('photo-1519915028121-7d3463d20b13'),
    price: 1400,
    name: { tr: 'Limon & Mascarpone', en: 'Lemon & Mascarpone' },
    description: {
      tr: 'Ferahlatıcı limon, ipeksi mascarpone ve limon kabuğu rendesi.',
      en: 'Refreshing lemon, silky mascarpone and grated lemon zest.',
    },
    tags: [{ tr: 'Ferah', en: 'Zesty' }],
  },
  {
    id: 'm6',
    category: 'classic',
    image: m('photo-1464195244916-405fa0a82545'),
    price: 1250,
    name: { tr: 'Vanilya & Frenk Üzümü', en: 'Vanilla & Currant' },
    description: {
      tr: 'Madagaskar vanilyası ve hafif ekşi frenk üzümü reçeli.',
      en: 'Madagascar vanilla and lightly tart currant jam.',
    },
    tags: [{ tr: 'Klasik', en: 'Classic' }],
  },
  {
    id: 'm7',
    category: 'seasonal',
    image: m('photo-1571115177098-24ec42ed204d'),
    price: 1550,
    name: { tr: 'Karamel & Tuzlu Fındık', en: 'Caramel & Salted Hazelnut' },
    description: {
      tr: 'Akışkan karamel, kavrulmuş fındık pralini ve deniz tuzu.',
      en: 'Flowing caramel, roasted hazelnut praline and sea salt.',
    },
    tags: [
      { tr: 'Mevsimlik', en: 'Seasonal' },
      { tr: 'Yoğun', en: 'Indulgent' },
    ],
  },
  {
    id: 'm8',
    category: 'signature',
    image: m('photo-1535254973040-607b474cb50d'),
    price: 1700,
    name: { tr: 'Gül & Ahududu', en: 'Rose & Raspberry' },
    description: {
      tr: 'Zarif gül aroması, taze ahududu ve hafif lychee notası.',
      en: 'Elegant rose aroma, fresh raspberry and a light lychee note.',
    },
    tags: [
      { tr: 'İmza', en: 'Signature' },
      { tr: 'Çiçeksi', en: 'Floral' },
    ],
  },
  {
    id: 'm9',
    category: 'classic',
    image: m('photo-1542826438-bd32f43d626f'),
    price: 1300,
    name: { tr: 'Tiramisu Pasta', en: 'Tiramisu Cake' },
    description: {
      tr: 'Espresso şuruplu kat, mascarpone kreması ve kakao.',
      en: 'Espresso-soaked layers, mascarpone cream and cocoa.',
    },
    tags: [{ tr: 'Kahve', en: 'Coffee' }],
  },
  {
    id: 'm10',
    category: 'seasonal',
    image: m('photo-1488477181946-6428a0291777'),
    price: 1600,
    name: { tr: 'İncir & Bal', en: 'Fig & Honey' },
    description: {
      tr: 'Olgun incir, doğal bal ve ceviz kırıkları ile sonbahar esintisi.',
      en: 'Ripe fig, natural honey and walnut pieces — an autumn breeze.',
    },
    tags: [
      { tr: 'Mevsimlik', en: 'Seasonal' },
      { tr: 'Doğal', en: 'Natural' },
    ],
  },
];
