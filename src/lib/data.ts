// Placeholder content for the storefront. In production these are served from
// the database via the admin panel; here we provide rich seed-quality data so
// the site looks complete out of the box.

export interface GalleryItemData {
  id: string;
  imageUrl: string;
  titleTr: string;
  titleEn: string;
  category: 'wedding' | 'birthday' | 'corporate' | 'baby' | 'custom';
  priceRange: string;
  featured?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const GALLERY: GalleryItemData[] = [
  {
    id: 'g1',
    imageUrl: img('photo-1535141192574-5d4897c12636'),
    titleTr: 'Altın Yapraklı Düğün Pastası',
    titleEn: 'Gold Leaf Wedding Cake',
    category: 'wedding',
    priceRange: '₺4.500 - ₺7.000',
    featured: true,
  },
  {
    id: 'g2',
    imageUrl: img('photo-1578985545062-69928b1d9587'),
    titleTr: 'Çikolatalı Doğum Günü',
    titleEn: 'Chocolate Birthday',
    category: 'birthday',
    priceRange: '₺1.200 - ₺2.400',
    featured: true,
  },
  {
    id: 'g3',
    imageUrl: img('photo-1606890737304-57a1ca8a5b62'),
    titleTr: 'Minimalist Kurumsal Pasta',
    titleEn: 'Minimalist Corporate Cake',
    category: 'corporate',
    priceRange: '₺2.000 - ₺3.500',
  },
  {
    id: 'g4',
    imageUrl: img('photo-1464349095431-e9a21285b5f3'),
    titleTr: 'Pastel Baby Shower',
    titleEn: 'Pastel Baby Shower',
    category: 'baby',
    priceRange: '₺1.500 - ₺2.800',
    featured: true,
  },
  {
    id: 'g5',
    imageUrl: img('photo-1557925923-cd4648e211a0'),
    titleTr: 'Çiçekli Üç Katlı Düğün',
    titleEn: 'Floral Three-Tier Wedding',
    category: 'wedding',
    priceRange: '₺6.000 - ₺9.500',
  },
  {
    id: 'g6',
    imageUrl: img('photo-1535254973040-607b474cb50d'),
    titleTr: 'Drip Efektli Doğum Günü',
    titleEn: 'Drip Effect Birthday',
    category: 'birthday',
    priceRange: '₺1.400 - ₺2.600',
  },
  {
    id: 'g7',
    imageUrl: img('photo-1621303837174-89787a7d4729'),
    titleTr: 'Makaron Kulesi',
    titleEn: 'Macaron Tower',
    category: 'custom',
    priceRange: '₺2.200 - ₺3.800',
    featured: true,
  },
  {
    id: 'g8',
    imageUrl: img('photo-1542826438-bd32f43d626f'),
    titleTr: 'Klasik Beyaz Düğün',
    titleEn: 'Classic White Wedding',
    category: 'wedding',
    priceRange: '₺5.000 - ₺8.000',
  },
  {
    id: 'g9',
    imageUrl: img('photo-1488477181946-6428a0291777'),
    titleTr: 'Meyveli Yaz Pastası',
    titleEn: 'Summer Berry Cake',
    category: 'custom',
    priceRange: '₺1.800 - ₺3.000',
  },
];

export const FEATURED = GALLERY.filter((g) => g.featured);

export interface TestimonialData {
  id: string;
  author: string;
  textTr: string;
  textEn: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 't1',
    author: 'Elif & Kerem',
    textTr:
      'Düğün pastamız bir sanat eseriydi. Misafirlerimiz haftalarca konuştu. Teşekkürler Atelier Cake!',
    textEn:
      'Our wedding cake was a work of art. Our guests talked about it for weeks. Thank you Atelier Cake!',
    rating: 5,
  },
  {
    id: 't2',
    author: 'Zeynep A.',
    textTr:
      'Kızımın doğum günü için tasarladıkları pasta hayallerimizin ötesindeydi. Hem lezzet hem görsellik kusursuz.',
    textEn:
      "The cake they designed for my daughter's birthday was beyond our dreams. Both taste and look were flawless.",
    rating: 5,
  },
  {
    id: 't3',
    author: 'Murat Şirketi',
    textTr:
      'Kurumsal etkinliğimiz için profesyonel, zamanında ve son derece şık bir hizmet aldık.',
    textEn:
      'For our corporate event we received professional, punctual and extremely elegant service.',
    rating: 5,
  },
];

export interface PresetData {
  id: string;
  nameTr: string;
  nameEn: string;
  imageUrl: string;
  tiers: { size: 'small' | 'medium' | 'large'; flavor: 'chocolate' | 'vanilla' | 'redvelvet' | 'pistachio' | 'lemon' }[];
  frostingColor: string;
}

export const PRESETS: PresetData[] = [
  {
    id: 'classic-wedding',
    nameTr: 'Klasik Düğün',
    nameEn: 'Classic Wedding',
    imageUrl: img('photo-1535141192574-5d4897c12636'),
    tiers: [
      { size: 'large', flavor: 'vanilla' },
      { size: 'medium', flavor: 'redvelvet' },
      { size: 'small', flavor: 'chocolate' },
    ],
    frostingColor: '#FAF7F2',
  },
  {
    id: 'rose-birthday',
    nameTr: 'Pudra Doğum Günü',
    nameEn: 'Dusty Rose Birthday',
    imageUrl: img('photo-1578985545062-69928b1d9587'),
    tiers: [{ size: 'medium', flavor: 'pistachio' }],
    frostingColor: '#D9A48C',
  },
  {
    id: 'gold-luxe',
    nameTr: 'Altın Lüks',
    nameEn: 'Gold Luxe',
    imageUrl: img('photo-1557925923-cd4648e211a0'),
    tiers: [
      { size: 'large', flavor: 'lemon' },
      { size: 'medium', flavor: 'vanilla' },
    ],
    frostingColor: '#E0C878',
  },
];

export const GALLERY_CATEGORIES = [
  'all',
  'wedding',
  'birthday',
  'corporate',
  'baby',
  'custom',
] as const;
