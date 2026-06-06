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
  /** Extra angle/detail photos shown in the detail-page gallery. */
  images?: string[];
}

// Returns all photos for an item (cover first), de-duplicated.
export function galleryImages(item: GalleryItemData): string[] {
  return Array.from(new Set([item.imageUrl, ...(item.images ?? [])]));
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
    images: [
      img('photo-1557925923-cd4648e211a0'),
      img('photo-1621303837174-89787a7d4729'),
      img('photo-1542826438-bd32f43d626f'),
    ],
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
    images: [
      img('photo-1569864358642-9d1684040f43'),
      img('photo-1558326567-98ae2405596b'),
    ],
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
  {
    id: 'g10',
    imageUrl: img('photo-1519869325930-281384150729'),
    titleTr: 'Romantik Şakayık Düğünü',
    titleEn: 'Romantic Peony Wedding',
    category: 'wedding',
    priceRange: '₺5.500 - ₺8.500',
    featured: true,
  },
  {
    id: 'g11',
    imageUrl: img('photo-1535920527002-b35e96722eb9'),
    titleTr: 'Çocuk Doğum Günü Şöleni',
    titleEn: 'Playful Kids Birthday',
    category: 'birthday',
    priceRange: '₺1.300 - ₺2.500',
  },
  {
    id: 'g12',
    imageUrl: img('photo-1562440499-64c9a111f713'),
    titleTr: 'Lüks Altın Kurumsal',
    titleEn: 'Luxe Gold Corporate',
    category: 'corporate',
    priceRange: '₺2.500 - ₺4.000',
  },
  {
    id: 'g13',
    imageUrl: img('photo-1535254973040-607b474cb50d'),
    titleTr: 'Pastel Bulut Baby Shower',
    titleEn: 'Pastel Cloud Baby Shower',
    category: 'baby',
    priceRange: '₺1.600 - ₺2.900',
  },
  {
    id: 'g14',
    imageUrl: img('photo-1602351447937-745cb720612f'),
    titleTr: 'Modern Geometrik Tasarım',
    titleEn: 'Modern Geometric Design',
    category: 'custom',
    priceRange: '₺2.400 - ₺4.200',
    featured: true,
  },
  {
    id: 'g15',
    imageUrl: img('photo-1464195244916-405fa0a82545'),
    titleTr: 'Klasik Naked Cake',
    titleEn: 'Classic Naked Cake',
    category: 'wedding',
    priceRange: '₺4.000 - ₺6.500',
  },
  {
    id: 'g16',
    imageUrl: img('photo-1571115177098-24ec42ed204d'),
    titleTr: 'Çikolata Tutkusu',
    titleEn: 'Chocolate Indulgence',
    category: 'birthday',
    priceRange: '₺1.500 - ₺2.700',
  },
  {
    id: 'g17',
    imageUrl: img('photo-1535141192574-5d4897c12636'),
    titleTr: 'İhtişamlı Beş Katlı',
    titleEn: 'Grand Five-Tier',
    category: 'wedding',
    priceRange: '₺9.000 - ₺15.000',
  },
  {
    id: 'g18',
    imageUrl: img('photo-1606313564200-e75d5e30476c'),
    titleTr: 'Zarif Nakış Detaylı',
    titleEn: 'Elegant Piped Lace',
    category: 'custom',
    priceRange: '₺2.000 - ₺3.600',
  },
  {
    id: 'g19',
    imageUrl: img('photo-1549213783-8284d0336c4f'),
    titleTr: 'Şampanya Köpüğü Düğün',
    titleEn: 'Champagne Bubbles Wedding',
    category: 'wedding',
    priceRange: '₺6.000 - ₺9.000',
  },
  {
    id: 'g20',
    imageUrl: img('photo-1599785209707-a456fc1337bb'),
    titleTr: 'Tropikal Doğum Günü',
    titleEn: 'Tropical Birthday',
    category: 'birthday',
    priceRange: '₺1.700 - ₺2.900',
  },
  {
    id: 'g21',
    imageUrl: img('photo-1612203985729-70726954388c'),
    titleTr: 'Mermer Desenli Kurumsal',
    titleEn: 'Marble Pattern Corporate',
    category: 'corporate',
    priceRange: '₺2.600 - ₺4.200',
  },
  {
    id: 'g22',
    imageUrl: img('photo-1558636508-e0db3814bd1d'),
    titleTr: 'Balon Temalı Baby Shower',
    titleEn: 'Balloon Theme Baby Shower',
    category: 'baby',
    priceRange: '₺1.500 - ₺2.700',
  },
  {
    id: 'g23',
    imageUrl: img('photo-1621303837174-89787a7d4729'),
    titleTr: 'Pastel Makaron Süslemeli',
    titleEn: 'Pastel Macaron Adorned',
    category: 'custom',
    priceRange: '₺2.300 - ₺3.900',
  },
  {
    id: 'g24',
    imageUrl: img('photo-1607478900766-efe13248b125'),
    titleTr: 'Klasik Çikolatalı Düğün',
    titleEn: 'Classic Chocolate Wedding',
    category: 'wedding',
    priceRange: '₺5.000 - ₺7.800',
  },
  {
    id: 'g25',
    imageUrl: img('photo-1558301211-0d8c8ddee6ec'),
    titleTr: 'Konfeti Patlaması',
    titleEn: 'Confetti Burst',
    category: 'birthday',
    priceRange: '₺1.400 - ₺2.600',
  },
  {
    id: 'g26',
    imageUrl: img('photo-1551024601-bec78aea704b'),
    titleTr: 'Minimalist Beyaz Kurumsal',
    titleEn: 'Minimalist White Corporate',
    category: 'corporate',
    priceRange: '₺2.200 - ₺3.600',
  },
  {
    id: 'g27',
    imageUrl: img('photo-1614707267537-b85aaf00c4b7'),
    titleTr: 'Yıldız Tozu Özel Tasarım',
    titleEn: 'Stardust Custom Design',
    category: 'custom',
    priceRange: '₺2.500 - ₺4.500',
  },
  {
    id: 'g28',
    imageUrl: img('photo-1535141192574-5d4897c12636'),
    titleTr: 'Dantel İşlemeli Düğün',
    titleEn: 'Lace-Embroidered Wedding',
    category: 'wedding',
    priceRange: '₺6.500 - ₺10.000',
  },
  {
    id: 'g29',
    imageUrl: img('photo-1599785209707-a456fc1337bb'),
    titleTr: 'Tek Boynuzlu At Temalı',
    titleEn: 'Unicorn Theme',
    category: 'birthday',
    priceRange: '₺1.600 - ₺2.900',
  },
  {
    id: 'g30',
    imageUrl: img('photo-1606890737304-57a1ca8a5b62'),
    titleTr: 'Logo Baskılı Lansman',
    titleEn: 'Logo-Printed Launch',
    category: 'corporate',
    priceRange: '₺2.800 - ₺4.500',
  },
  {
    id: 'g31',
    imageUrl: img('photo-1558636508-e0db3814bd1d'),
    titleTr: 'Ayıcık Temalı Baby Shower',
    titleEn: 'Teddy Bear Baby Shower',
    category: 'baby',
    priceRange: '₺1.700 - ₺3.000',
  },
  {
    id: 'g32',
    imageUrl: img('photo-1612203985729-70726954388c'),
    titleTr: 'Altın Damarlı Mermer',
    titleEn: 'Gold-Veined Marble',
    category: 'custom',
    priceRange: '₺2.600 - ₺4.300',
  },
  {
    id: 'g33',
    imageUrl: img('photo-1519869325930-281384150729'),
    titleTr: 'Bahçe Çiçekleri Düğün',
    titleEn: 'Garden Flowers Wedding',
    category: 'wedding',
    priceRange: '₺5.500 - ₺8.800',
  },
  {
    id: 'g34',
    imageUrl: img('photo-1535920527002-b35e96722eb9'),
    titleTr: 'Süper Kahraman Doğum Günü',
    titleEn: 'Superhero Birthday',
    category: 'birthday',
    priceRange: '₺1.500 - ₺2.800',
  },
  {
    id: 'g35',
    imageUrl: img('photo-1602351447937-745cb720612f'),
    titleTr: 'Sanatsal Soyut Tasarım',
    titleEn: 'Artistic Abstract Design',
    category: 'custom',
    priceRange: '₺2.700 - ₺4.800',
  },
  {
    id: 'g36',
    imageUrl: img('photo-1557925923-cd4648e211a0'),
    titleTr: 'Şakayık Bahçesi Düğün',
    titleEn: 'Peony Garden Wedding',
    category: 'wedding',
    priceRange: '₺6.000 - ₺9.500',
  },
  {
    id: 'g37',
    imageUrl: img('photo-1578985545062-69928b1d9587'),
    titleTr: 'Çikolata Şelalesi',
    titleEn: 'Chocolate Waterfall',
    category: 'birthday',
    priceRange: '₺1.600 - ₺2.900',
  },
  {
    id: 'g38',
    imageUrl: img('photo-1562440499-64c9a111f713'),
    titleTr: 'Metalik Kurumsal Lüks',
    titleEn: 'Metallic Corporate Luxe',
    category: 'corporate',
    priceRange: '₺3.000 - ₺5.000',
  },
  {
    id: 'g39',
    imageUrl: img('photo-1464349095431-e9a21285b5f3'),
    titleTr: 'Bulutlar Üstünde Baby Shower',
    titleEn: 'On the Clouds Baby Shower',
    category: 'baby',
    priceRange: '₺1.800 - ₺3.100',
  },
  { id: 'g40', imageUrl: img('photo-1535141192574-5d4897c12636'), titleTr: 'Altın Çizgili Düğün', titleEn: 'Gold-Striped Wedding', category: 'wedding', priceRange: '₺6.500 - ₺10.500' },
  { id: 'g41', imageUrl: img('photo-1578985545062-69928b1d9587'), titleTr: 'Çikolata Damlalı Parti', titleEn: 'Chocolate Drip Party', category: 'birthday', priceRange: '₺1.500 - ₺2.800' },
  { id: 'g42', imageUrl: img('photo-1562440499-64c9a111f713'), titleTr: 'Kurumsal Yıldönümü', titleEn: 'Corporate Anniversary', category: 'corporate', priceRange: '₺2.800 - ₺4.600' },
  { id: 'g43', imageUrl: img('photo-1558636508-e0db3814bd1d'), titleTr: 'Minik Ayaklar Baby Shower', titleEn: 'Tiny Feet Baby Shower', category: 'baby', priceRange: '₺1.700 - ₺3.000' },
  { id: 'g44', imageUrl: img('photo-1602351447937-745cb720612f'), titleTr: 'Sanat Galerisi Özel', titleEn: 'Art Gallery Custom', category: 'custom', priceRange: '₺2.800 - ₺5.000' },
  { id: 'g45', imageUrl: img('photo-1557925923-cd4648e211a0'), titleTr: 'Beyaz Şakayık Düğün', titleEn: 'White Peony Wedding', category: 'wedding', priceRange: '₺6.000 - ₺9.500' },
  { id: 'g46', imageUrl: img('photo-1535920527002-b35e96722eb9'), titleTr: 'Rengarenk Çocuk Partisi', titleEn: 'Rainbow Kids Party', category: 'birthday', priceRange: '₺1.400 - ₺2.700' },
  { id: 'g47', imageUrl: img('photo-1606313564200-e75d5e30476c'), titleTr: 'İnce Dantel Sanatı', titleEn: 'Fine Lace Artistry', category: 'custom', priceRange: '₺2.600 - ₺4.400' },
  { id: 'g48', imageUrl: img('photo-1571115177098-24ec42ed204d'), titleTr: 'Çikolata Tutkunu', titleEn: 'For the Chocolate Lover', category: 'birthday', priceRange: '₺1.600 - ₺2.900' },
  { id: 'g49', imageUrl: img('photo-1488477181946-6428a0291777'), titleTr: 'Meyve Bahçesi Özel', titleEn: 'Orchard Custom', category: 'custom', priceRange: '₺1.900 - ₺3.300' },
  { id: 'g50', imageUrl: img('photo-1535141192574-5d4897c12636'), titleTr: 'Zarif Beyaz & Altın', titleEn: 'Elegant White & Gold', category: 'wedding', priceRange: '₺6.000 - ₺9.000' },
  { id: 'g51', imageUrl: img('photo-1578985545062-69928b1d9587'), titleTr: 'Doğum Günü Klasiği', titleEn: 'Birthday Classic', category: 'birthday', priceRange: '₺1.400 - ₺2.600' },
  { id: 'g52', imageUrl: img('photo-1606890737304-57a1ca8a5b62'), titleTr: 'Kurumsal Zarafet', titleEn: 'Corporate Elegance', category: 'corporate', priceRange: '₺2.500 - ₺4.000' },
  { id: 'g53', imageUrl: img('photo-1464349095431-e9a21285b5f3'), titleTr: 'Pastel Rüya', titleEn: 'Pastel Dream', category: 'baby', priceRange: '₺1.600 - ₺2.800' },
  { id: 'g54', imageUrl: img('photo-1602351447937-745cb720612f'), titleTr: 'Modern Sanat', titleEn: 'Modern Art', category: 'custom', priceRange: '₺2.700 - ₺4.700' },
  { id: 'g55', imageUrl: img('photo-1557925923-cd4648e211a0'), titleTr: 'Çiçekli İhtişam', titleEn: 'Floral Grandeur', category: 'wedding', priceRange: '₺6.500 - ₺10.000' },
  { id: 'g56', imageUrl: img('photo-1535920527002-b35e96722eb9'), titleTr: 'Eğlenceli Çocuk', titleEn: 'Playful Kids', category: 'birthday', priceRange: '₺1.500 - ₺2.700' },
  { id: 'g57', imageUrl: img('photo-1606313564200-e75d5e30476c'), titleTr: 'İnce İşçilik', titleEn: 'Fine Craft', category: 'custom', priceRange: '₺2.600 - ₺4.500' },
  { id: 'g58', imageUrl: img('photo-1562440499-64c9a111f713'), titleTr: 'Lansman Özel', titleEn: 'Launch Special', category: 'corporate', priceRange: '₺2.900 - ₺4.800' },
  { id: 'g59', imageUrl: img('photo-1558636508-e0db3814bd1d'), titleTr: 'Hoş Geldin Bebek', titleEn: 'Welcome Baby', category: 'baby', priceRange: '₺1.700 - ₺3.000' },
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
  {
    id: 't4',
    author: 'Selin & Burak',
    textTr:
      'Nişan pastamız tam hayal ettiğimiz gibiydi. Detaylara gösterdikleri özen büyüleyici.',
    textEn:
      'Our engagement cake was exactly as we imagined. Their attention to detail is enchanting.',
    rating: 5,
  },
  {
    id: 't5',
    author: 'Deniz Y.',
    textTr:
      'Glutensiz pasta talebimi kusursuz karşıladılar; misafirlerim farkı bile anlamadı. Teşekkürler.',
    textEn:
      'They perfectly met my gluten-free request; my guests couldn’t even tell the difference. Thank you.',
    rating: 5,
  },
  {
    id: 't6',
    author: 'Aylin K.',
    textTr:
      'Sipariş sürecinden teslimata kadar her şey kusursuzdu. İstanbul’un en iyisi kesinlikle.',
    textEn:
      'Everything from ordering to delivery was flawless. Definitely the best in Istanbul.',
    rating: 5,
  },
  {
    id: 't7',
    author: 'Emre & Naz',
    textTr:
      '3D tasarlayıcı inanılmazdı; pastamızı sipariş etmeden önce tam olarak görebildik. Bayıldık!',
    textEn:
      'The 3D configurator was incredible; we could see our cake exactly before ordering. We loved it!',
    rating: 5,
  },
  {
    id: 't8',
    author: 'Gülşah T.',
    textTr:
      'Vegan pasta talebimi bu kadar lezzetli karşılayan başka yer bulamadım. Müthiş.',
    textEn:
      'I couldn’t find anywhere else that met my vegan request so deliciously. Amazing.',
    rating: 5,
  },
  {
    id: 't9',
    author: 'Onur B.',
    textTr:
      'Kurumsal yıl dönümümüz için logolu pasta tam zamanında ve kusursuz geldi. Profesyonellik üst düzey.',
    textEn:
      'Our logo cake for the corporate anniversary arrived right on time and flawless. Top-tier professionalism.',
    rating: 5,
  },
  { id: 't10', author: 'Merve Ş.', textTr: 'Cupcake kutuları ofisimizde büyük beğeni topladı. Hem şık hem lezzetli.', textEn: 'The cupcake boxes were a big hit at our office. Stylish and delicious.', rating: 5 },
  { id: 't11', author: 'Cenk & Pelin', textTr: 'Düğün tadımı çok keyifliydi, tüm lezzetleri denedik ve favorimizi seçtik.', textEn: 'The wedding tasting was delightful; we tried all the flavours and picked our favourite.', rating: 5 },
  { id: 't12', author: 'Hakan T.', textTr: 'Son dakika siparişimi bile büyük bir özenle hazırladılar. Minnettarım.', textEn: 'They prepared even my last-minute order with great care. I am grateful.', rating: 5 },
  { id: 't13', author: 'Nilüfer A.', textTr: 'Makaron kulesi nişanımızın yıldızıydı. Herkes fotoğraf çektirdi.', textEn: 'The macaron tower was the star of our engagement. Everyone took photos.', rating: 5 },
  { id: 't14', author: 'Sinem K.', textTr: 'Glutensiz seçenekleri sayesinde herkes aynı pastadan yiyebildi. Teşekkürler.', textEn: 'Thanks to their gluten-free options, everyone could enjoy the same cake. Thank you.', rating: 5 },
  { id: 't15', author: 'Berk D.', textTr: '3D tasarlayıcı gerçekten eğlenceli; pastamı tam istediğim gibi tasarladım.', textEn: 'The 3D configurator is genuinely fun; I designed my cake exactly how I wanted.', rating: 5 },
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
