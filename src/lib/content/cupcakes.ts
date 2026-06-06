import type { Bilingual } from './site';

export type CupcakeCategory = 'cupcake' | 'macaron' | 'cookie' | 'bite';

export interface Cupcake {
  id: string;
  category: CupcakeCategory;
  image: string;
  pricePerBox: number;
  boxSize: number;
  name: Bilingual;
  description: Bilingual;
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// A separate product line of bite-sized treats sold by the box — perfect for
// events, corporate gifting and dessert tables.
export const CUPCAKES: Cupcake[] = [
  {
    id: 'cb1',
    category: 'cupcake',
    image: u('photo-1426869981800-95ebf51ce900'),
    pricePerBox: 480,
    boxSize: 6,
    name: { tr: 'Klasik Vanilya Cupcake', en: 'Classic Vanilla Cupcake' },
    description: {
      tr: 'Yumuşacık vanilyalı kek ve tereyağlı krema rozeti.',
      en: 'Tender vanilla cake with a buttercream rosette.',
    },
  },
  {
    id: 'cb2',
    category: 'cupcake',
    image: u('photo-1486427944299-d1955d23e34d'),
    pricePerBox: 520,
    boxSize: 6,
    name: { tr: 'Çikolatalı Cupcake', en: 'Chocolate Cupcake' },
    description: {
      tr: 'Yoğun çikolatalı kek ve ganaj dolgu.',
      en: 'Rich chocolate cake with a ganache filling.',
    },
  },
  {
    id: 'cb3',
    category: 'cupcake',
    image: u('photo-1599785209707-a456fc1337bb'),
    pricePerBox: 540,
    boxSize: 6,
    name: { tr: 'Red Velvet Cupcake', en: 'Red Velvet Cupcake' },
    description: {
      tr: 'Kadife dokulu kek ve labne kreması.',
      en: 'Velvet-textured cake with cream-cheese frosting.',
    },
  },
  {
    id: 'cb4',
    category: 'cupcake',
    image: u('photo-1614707267537-b85aaf00c4b7'),
    pricePerBox: 600,
    boxSize: 6,
    name: { tr: 'Antep Fıstıklı Cupcake', en: 'Pistachio Cupcake' },
    description: {
      tr: 'Gerçek fıstıkla hazırlanan imza cupcake.',
      en: 'A signature cupcake made with genuine pistachio.',
    },
  },
  {
    id: 'cb5',
    category: 'macaron',
    image: u('photo-1569864358642-9d1684040f43'),
    pricePerBox: 420,
    boxSize: 12,
    name: { tr: 'Karışık Makaron Kutusu', en: 'Assorted Macaron Box' },
    description: {
      tr: 'Altı farklı renk ve aromada Fransız makaronları.',
      en: 'French macarons in six colours and flavours.',
    },
  },
  {
    id: 'cb6',
    category: 'macaron',
    image: u('photo-1558326567-98ae2405596b'),
    pricePerBox: 460,
    boxSize: 12,
    name: { tr: 'Çikolatalı Makaron', en: 'Chocolate Macaron' },
    description: {
      tr: 'Yoğun ganaj dolgulu çikolatalı makaronlar.',
      en: 'Chocolate macarons with a rich ganache filling.',
    },
  },
  {
    id: 'cb7',
    category: 'macaron',
    image: u('photo-1612886623559-1f72a37c1d3a'),
    pricePerBox: 470,
    boxSize: 12,
    name: { tr: 'Frambuazlı Makaron', en: 'Raspberry Macaron' },
    description: {
      tr: 'Ekşimsi frambuaz dolgulu pembe makaronlar.',
      en: 'Pink macarons with a tart raspberry filling.',
    },
  },
  {
    id: 'cb8',
    category: 'cookie',
    image: u('photo-1499636136210-6f4ee915583e'),
    pricePerBox: 380,
    boxSize: 8,
    name: { tr: 'Çikolata Parçacıklı Kurabiye', en: 'Chocolate Chip Cookie' },
    description: {
      tr: 'Çıtır kenarlı, yumuşak içli klasik kurabiye.',
      en: 'A classic cookie with crisp edges and a soft centre.',
    },
  },
  {
    id: 'cb9',
    category: 'cookie',
    image: u('photo-1558961363-fa8fdf82db35'),
    pricePerBox: 400,
    boxSize: 8,
    name: { tr: 'Çift Çikolatalı Kurabiye', en: 'Double Chocolate Cookie' },
    description: {
      tr: 'Kakao hamuru ve çikolata parçaları.',
      en: 'Cocoa dough loaded with chocolate chunks.',
    },
  },
  {
    id: 'cb10',
    category: 'cookie',
    image: u('photo-1499636136210-6f4ee915583e'),
    pricePerBox: 420,
    boxSize: 8,
    name: { tr: 'Yulaflı Kuru Üzümlü', en: 'Oatmeal Raisin' },
    description: {
      tr: 'Yulaf ve kuru üzümle hazırlanan besleyici kurabiye.',
      en: 'A wholesome cookie made with oats and raisins.',
    },
  },
  {
    id: 'cb11',
    category: 'bite',
    image: u('photo-1551024601-bec78aea704b'),
    pricePerBox: 560,
    boxSize: 9,
    name: { tr: 'Cake Pop Seti', en: 'Cake Pop Set' },
    description: {
      tr: 'Çubuklu, çikolata kaplı mini pasta topları.',
      en: 'Chocolate-coated mini cake balls on sticks.',
    },
  },
  {
    id: 'cb12',
    category: 'bite',
    image: u('photo-1488477181946-6428a0291777'),
    pricePerBox: 620,
    boxSize: 9,
    name: { tr: 'Mini Pasta Seti', en: 'Mini Cake Set' },
    description: {
      tr: 'Tek lokmalık, zarif süslemeli mini pastalar.',
      en: 'Single-bite mini cakes with elegant decoration.',
    },
  },
  {
    id: 'cb13',
    category: 'bite',
    image: u('photo-1606313564200-e75d5e30476c'),
    pricePerBox: 540,
    boxSize: 9,
    name: { tr: 'Brownie Bites', en: 'Brownie Bites' },
    description: {
      tr: 'Yoğun, ıslak dokulu mini brownie kareleri.',
      en: 'Dense, fudgy mini brownie squares.',
    },
  },
  {
    id: 'cb14',
    category: 'cupcake',
    image: u('photo-1519869325930-281384150729'),
    pricePerBox: 520,
    boxSize: 6,
    name: { tr: 'Limonlu Cupcake', en: 'Lemon Cupcake' },
    description: {
      tr: 'Ferah limonlu kek ve limon kremalı süsleme.',
      en: 'Zesty lemon cake with lemon-cream topping.',
    },
  },
  {
    id: 'cb15',
    category: 'cupcake',
    image: u('photo-1464349095431-e9a21285b5f3'),
    pricePerBox: 560,
    boxSize: 6,
    name: { tr: 'Karamelli Cupcake', en: 'Caramel Cupcake' },
    description: {
      tr: 'Tuzlu karamel dolgulu ve sosu akan cupcake.',
      en: 'A cupcake with salted-caramel filling and drizzle.',
    },
  },
  {
    id: 'cb16',
    category: 'macaron',
    image: u('photo-1558326567-98ae2405596b'),
    pricePerBox: 480,
    boxSize: 12,
    name: { tr: 'Antep Fıstıklı Makaron', en: 'Pistachio Macaron' },
    description: {
      tr: 'Gerçek fıstık kremalı yeşil makaronlar.',
      en: 'Green macarons with genuine pistachio cream.',
    },
  },
];

export function getCupcake(id: string) {
  return CUPCAKES.find((c) => c.id === id);
}
