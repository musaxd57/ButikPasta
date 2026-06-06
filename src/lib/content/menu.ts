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
  {
    id: 'm11',
    category: 'signature',
    image: m('photo-1606890737304-57a1ca8a5b62'),
    price: 1500,
    name: { tr: 'Beyaz Çikolata & Frambuaz', en: 'White Chocolate & Raspberry' },
    description: {
      tr: 'Kremamsı beyaz çikolata ganajı ve ekşimsi frambuaz dengesi.',
      en: 'Creamy white-chocolate ganache balanced with tart raspberry.',
    },
    tags: [{ tr: 'İmza', en: 'Signature' }],
  },
  {
    id: 'm12',
    category: 'classic',
    image: m('photo-1571115177098-24ec42ed204d'),
    price: 1250,
    name: { tr: 'Havuçlu Tarçınlı', en: 'Carrot & Cinnamon' },
    description: {
      tr: 'Baharatlı havuçlu kek, labne kreması ve ceviz.',
      en: 'Spiced carrot cake, cream-cheese frosting and walnut.',
    },
    tags: [{ tr: 'Klasik', en: 'Classic' }],
  },
  {
    id: 'm13',
    category: 'seasonal',
    image: m('photo-1519869325930-281384150729'),
    price: 1650,
    name: { tr: 'Çilekli Bahar', en: 'Strawberry Spring' },
    description: {
      tr: 'Taze çilek, hafif krema ve vanilyalı pandispanya.',
      en: 'Fresh strawberry, light cream and vanilla sponge.',
    },
    tags: [{ tr: 'Mevsimlik', en: 'Seasonal' }],
  },
  {
    id: 'm14',
    category: 'signature',
    image: m('photo-1535254973040-607b474cb50d'),
    price: 1750,
    name: { tr: 'Çikolata & Portakal', en: 'Chocolate & Orange' },
    description: {
      tr: 'Bitter çikolata ve kandimlenmiş portakal kabuğu uyumu.',
      en: 'Dark chocolate harmonised with candied orange peel.',
    },
    tags: [{ tr: 'İmza', en: 'Signature' }],
  },
  {
    id: 'm15',
    category: 'classic',
    image: m('photo-1464349095431-e9a21285b5f3'),
    price: 1300,
    name: { tr: 'Limonlu Cheesecake', en: 'Lemon Cheesecake' },
    description: {
      tr: 'Kremamsı cheesecake, limon curd ve bisküvi tabanı.',
      en: 'Creamy cheesecake, lemon curd and a biscuit base.',
    },
    tags: [{ tr: 'Klasik', en: 'Classic' }],
  },
  {
    id: 'm16',
    category: 'seasonal',
    image: m('photo-1542826438-bd32f43d626f'),
    price: 1550,
    name: { tr: 'Bal Kabağı & Tarçın', en: 'Pumpkin & Spice' },
    description: {
      tr: 'Sonbahara özel, baharatlı bal kabaklı kek.',
      en: 'An autumn-special spiced pumpkin cake.',
    },
    tags: [{ tr: 'Mevsimlik', en: 'Seasonal' }],
  },
  {
    id: 'm17',
    category: 'signature',
    image: m('photo-1578985545062-69928b1d9587'),
    price: 1800,
    name: { tr: 'Tuzlu Karamel Çikolata', en: 'Salted Caramel Chocolate' },
    description: {
      tr: 'Çikolata kat, akışkan tuzlu karamel ve çıtır krokan.',
      en: 'Chocolate layers, flowing salted caramel and crunchy croquant.',
    },
    tags: [
      { tr: 'İmza', en: 'Signature' },
      { tr: 'Yoğun', en: 'Indulgent' },
    ],
  },
  {
    id: 'm18',
    category: 'classic',
    image: m('photo-1488477181946-6428a0291777'),
    price: 1400,
    name: { tr: 'Fındıklı Praline', en: 'Hazelnut Praline' },
    description: {
      tr: 'Kavrulmuş fındık pralini ve sütlü çikolata kreması.',
      en: 'Roasted hazelnut praline and milk-chocolate cream.',
    },
    tags: [{ tr: 'Klasik', en: 'Classic' }],
  },
  {
    id: 'm19',
    category: 'seasonal',
    image: m('photo-1519915028121-7d3463d20b13'),
    price: 1500,
    name: { tr: 'Yaban Mersini & Limon', en: 'Blueberry & Lemon' },
    description: {
      tr: 'Taze yaban mersini ve ferah limon notası.',
      en: 'Fresh blueberry with a zesty lemon note.',
    },
    tags: [{ tr: 'Mevsimlik', en: 'Seasonal' }],
  },
  {
    id: 'm20',
    category: 'signature',
    image: m('photo-1586985289688-ca3cf47d3e6e'),
    price: 1700,
    name: { tr: 'Gül & Lychee', en: 'Rose & Lychee' },
    description: {
      tr: 'Zarif gül suyu, lychee ve hafif vanilya.',
      en: 'Elegant rose water, lychee and subtle vanilla.',
    },
    tags: [
      { tr: 'İmza', en: 'Signature' },
      { tr: 'Çiçeksi', en: 'Floral' },
    ],
  },
  { id: 'm21', category: 'classic', image: m('photo-1542826438-bd32f43d626f'), price: 1350, name: { tr: 'Muzlu Karamel', en: 'Banana Caramel' }, description: { tr: 'Olgun muz, akışkan karamel ve hafif krema.', en: 'Ripe banana, flowing caramel and light cream.' }, tags: [{ tr: 'Klasik', en: 'Classic' }] },
  { id: 'm22', category: 'signature', image: m('photo-1535254973040-607b474cb50d'), price: 1750, name: { tr: 'Çikolata & Vişne', en: 'Chocolate & Cherry' }, description: { tr: 'Yoğun çikolata ve ekşi vişne dengesi.', en: 'Rich chocolate balanced with sour cherry.' }, tags: [{ tr: 'İmza', en: 'Signature' }] },
  { id: 'm23', category: 'seasonal', image: m('photo-1519869325930-281384150729'), price: 1600, name: { tr: 'Çilekli Şortkek', en: 'Strawberry Shortcake' }, description: { tr: 'Taze çilek, çırpılmış krema ve yumuşak kek.', en: 'Fresh strawberry, whipped cream and soft sponge.' }, tags: [{ tr: 'Mevsimlik', en: 'Seasonal' }] },
  { id: 'm24', category: 'classic', image: m('photo-1464349095431-e9a21285b5f3'), price: 1300, name: { tr: 'Kahveli Mocha', en: 'Coffee Mocha' }, description: { tr: 'Espresso aromalı kat ve çikolatalı krema.', en: 'Espresso-flavoured layers and chocolate cream.' }, tags: [{ tr: 'Kahve', en: 'Coffee' }] },
  { id: 'm25', category: 'signature', image: m('photo-1488477181946-6428a0291777'), price: 1850, name: { tr: 'Bal & Lavanta', en: 'Honey & Lavender' }, description: { tr: 'Doğal bal ve hafif lavanta esansı.', en: 'Natural honey with a gentle lavender essence.' }, tags: [{ tr: 'İmza', en: 'Signature' }, { tr: 'Çiçeksi', en: 'Floral' }] },
  { id: 'm26', category: 'seasonal', image: m('photo-1571115177098-24ec42ed204d'), price: 1500, name: { tr: 'Sonbahar Elması', en: 'Autumn Apple' }, description: { tr: 'Tarçınlı elma ve karamel sos.', en: 'Cinnamon apple with caramel sauce.' }, tags: [{ tr: 'Mevsimlik', en: 'Seasonal' }] },
  { id: 'm27', category: 'classic', image: m('photo-1578985545062-69928b1d9587'), price: 1250, name: { tr: 'Çikolatalı Brownie Pasta', en: 'Brownie Cake' }, description: { tr: 'Yoğun brownie tabanı ve çikolata ganaj.', en: 'A dense brownie base with chocolate ganache.' }, tags: [{ tr: 'Klasik', en: 'Classic' }] },
  { id: 'm28', category: 'signature', image: m('photo-1519915028121-7d3463d20b13'), price: 1650, name: { tr: 'Yoğurt & Orman Meyveleri', en: 'Yogurt & Forest Berries' }, description: { tr: 'Hafif yoğurt kreması ve karışık orman meyveleri.', en: 'Light yogurt cream with mixed forest berries.' }, tags: [{ tr: 'İmza', en: 'Signature' }, { tr: 'Hafif', en: 'Light' }] },
];
