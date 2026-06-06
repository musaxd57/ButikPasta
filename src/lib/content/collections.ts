import type { Bilingual } from './site';

export interface Collection {
  slug: string;
  cover: string;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  images: string[];
}

const c = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const COLLECTIONS: Collection[] = [
  {
    slug: 'eternal-romance',
    cover: c('photo-1519869325930-281384150729'),
    name: { tr: 'Sonsuz Romantizm', en: 'Eternal Romance' },
    tagline: {
      tr: 'Düğünler için zamansız zarafet',
      en: 'Timeless elegance for weddings',
    },
    description: {
      tr: 'Yumuşak tonlar, taze çiçekler ve incelikli altın detaylarla hazırlanan, hayatınızın en özel gününe yakışır tasarımlar.',
      en: 'Designs worthy of your most special day, crafted with soft tones, fresh flowers and delicate gold details.',
    },
    images: [
      c('photo-1519869325930-281384150729'),
      c('photo-1557925923-cd4648e211a0'),
      c('photo-1542826438-bd32f43d626f'),
      c('photo-1464195244916-405fa0a82545'),
    ],
  },
  {
    slug: 'modern-minimal',
    cover: c('photo-1602351447937-745cb720612f'),
    name: { tr: 'Modern Minimal', en: 'Modern Minimal' },
    tagline: {
      tr: 'Sade çizgiler, güçlü ifade',
      en: 'Clean lines, bold statement',
    },
    description: {
      tr: 'Geometrik formlar, mat dokular ve cesur renk vurgularıyla çağdaş bir estetik arayanlar için.',
      en: 'For those seeking a contemporary aesthetic with geometric forms, matte textures and bold colour accents.',
    },
    images: [
      c('photo-1602351447937-745cb720612f'),
      c('photo-1606890737304-57a1ca8a5b62'),
      c('photo-1562440499-64c9a111f713'),
      c('photo-1606313564200-e75d5e30476c'),
    ],
  },
  {
    slug: 'playful-celebration',
    cover: c('photo-1535920527002-b35e96722eb9'),
    name: { tr: 'Neşeli Kutlama', en: 'Playful Celebration' },
    tagline: {
      tr: 'Doğum günleri için renkli enerji',
      en: 'Colourful energy for birthdays',
    },
    description: {
      tr: 'Canlı renkler, eğlenceli süslemeler ve drip efektleriyle her yaşa hitap eden neşeli tasarımlar.',
      en: 'Joyful designs for all ages with vivid colours, fun decorations and drip effects.',
    },
    images: [
      c('photo-1535920527002-b35e96722eb9'),
      c('photo-1578985545062-69928b1d9587'),
      c('photo-1535254973040-607b474cb50d'),
      c('photo-1571115177098-24ec42ed204d'),
    ],
  },
  {
    slug: 'golden-luxe',
    cover: c('photo-1535141192574-5d4897c12636'),
    name: { tr: 'Altın Lüks', en: 'Golden Luxe' },
    tagline: {
      tr: 'İhtişamın zirvesi',
      en: 'The pinnacle of grandeur',
    },
    description: {
      tr: 'Çok katlı görkemli tasarımlar, bol altın yaprak ve özel şeker sanatıyla unutulmaz bir etki.',
      en: 'An unforgettable impact with grand multi-tier designs, abundant gold leaf and custom sugar art.',
    },
    images: [
      c('photo-1535141192574-5d4897c12636'),
      c('photo-1621303837174-89787a7d4729'),
      c('photo-1557925923-cd4648e211a0'),
      c('photo-1488477181946-6428a0291777'),
    ],
  },
];
