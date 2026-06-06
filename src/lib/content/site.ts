// Smaller bilingual content collections used across the marketing pages.

export interface Bilingual {
  tr: string;
  en: string;
}

export interface ProcessStep {
  icon: string; // lucide icon name handled by the renderer
  title: Bilingual;
  desc: Bilingual;
}

export const PROCESS: ProcessStep[] = [
  {
    icon: 'MessageCircle',
    title: { tr: 'Danışma', en: 'Consultation' },
    desc: {
      tr: 'Hayalinizdeki pastayı dinliyor, etkinliğinize özel öneriler sunuyoruz.',
      en: 'We listen to your dream cake and offer suggestions tailored to your event.',
    },
  },
  {
    icon: 'PencilRuler',
    title: { tr: 'Tasarım', en: 'Design' },
    desc: {
      tr: '3D tasarlayıcımız veya birebir görüşme ile konsepti birlikte şekillendiriyoruz.',
      en: 'We shape the concept together via our 3D configurator or a one-to-one meeting.',
    },
  },
  {
    icon: 'ChefHat',
    title: { tr: 'Üretim', en: 'Craft' },
    desc: {
      tr: 'Premium malzemelerle, tamamen el yapımı olarak pastanızı hazırlıyoruz.',
      en: 'We prepare your cake entirely by hand with premium ingredients.',
    },
  },
  {
    icon: 'Truck',
    title: { tr: 'Teslimat', en: 'Delivery' },
    desc: {
      tr: 'Soğutmalı araçlarla, kusursuz şekilde adresinize ulaştırıyoruz.',
      en: 'We deliver it flawlessly to your address in refrigerated vehicles.',
    },
  },
];

export interface IngredientItem {
  image: string;
  title: Bilingual;
  desc: Bilingual;
}

const ing = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export const INGREDIENTS: IngredientItem[] = [
  {
    image: ing('photo-1511381939415-e44015466834'),
    title: { tr: 'Belçika Çikolatası', en: 'Belgian Chocolate' },
    desc: {
      tr: 'Yalnızca tek köken, yüksek kakao oranlı kuvertür çikolata kullanıyoruz.',
      en: 'We use only single-origin, high-cocoa couverture chocolate.',
    },
  },
  {
    image: ing('photo-1550583724-b2692b85b150'),
    title: { tr: 'Gerçek Antep Fıstığı', en: 'Genuine Pistachio' },
    desc: {
      tr: 'Taze çekilmiş, katkısız Antep fıstığı; yapay aroma asla.',
      en: 'Freshly ground, pure Antep pistachio; never artificial flavour.',
    },
  },
  {
    image: ing('photo-1488477181946-6428a0291777'),
    title: { tr: 'Mevsim Meyveleri', en: 'Seasonal Fruit' },
    desc: {
      tr: 'Günlük tedarik edilen, mevsiminde taze meyveler.',
      en: 'Daily-sourced fruit, fresh and in season.',
    },
  },
  {
    image: ing('photo-1452251889946-8ff5ea7b27ab'),
    title: { tr: 'Köy Yumurtası & Tereyağı', en: 'Farm Eggs & Butter' },
    desc: {
      tr: 'Doğal, yüksek kaliteli süt ürünleri ve serbest gezen tavuk yumurtası.',
      en: 'Natural, high-quality dairy and free-range eggs.',
    },
  },
];

export interface StatItem {
  value: number;
  suffix?: string;
  label: Bilingual;
}

export const STATS: StatItem[] = [
  { value: 12, suffix: '+', label: { tr: 'Yıllık Tecrübe', en: 'Years of Craft' } },
  { value: 4800, suffix: '+', label: { tr: 'Mutlu Müşteri', en: 'Happy Clients' } },
  { value: 320, suffix: '+', label: { tr: 'Düğün Pastası', en: 'Wedding Cakes' } },
  { value: 18, label: { tr: 'Ödül & Sertifika', en: 'Awards & Certificates' } },
];

export const PRESS_NAMES = [
  'VOGUE',
  'ELLE',
  'TimeOut',
  'Gastronomi',
  'Habertürk',
  'Condé Nast',
  'Marie Claire',
];

export interface DeliveryZone {
  name: Bilingual;
  districts: string[];
  fee: Bilingual;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    name: { tr: 'Merkez Bölge', en: 'Central Zone' },
    districts: ['Nişantaşı', 'Şişli', 'Beşiktaş', 'Beyoğlu', 'Sarıyer', 'Kadıköy'],
    fee: { tr: 'Ücretsiz', en: 'Free' },
  },
  {
    name: { tr: 'Genişletilmiş Bölge', en: 'Extended Zone' },
    districts: ['Bakırköy', 'Üsküdar', 'Ataşehir', 'Maltepe', 'Beylikdüzü'],
    fee: { tr: '₺150', en: '₺150' },
  },
  {
    name: { tr: 'Uzak Bölge', en: 'Outlying Zone' },
    districts: ['Tuzla', 'Pendik', 'Çatalca', 'Silivri', 'Şile'],
    fee: { tr: '₺300', en: '₺300' },
  },
];

export interface TeamMember {
  name: string;
  role: Bilingual;
  bio: Bilingual;
  image: string;
}

const team = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const TEAM: TeamMember[] = [
  {
    name: 'Defne Aydın',
    role: { tr: 'Kurucu & Baş Pasta Şefi', en: 'Founder & Head Pastry Chef' },
    bio: {
      tr: 'Le Cordon Bleu Paris mezunu. 15 yılı aşkın deneyimle atölyenin vizyonunu yönetiyor.',
      en: 'A Le Cordon Bleu Paris graduate leading the atelier’s vision with 15+ years of experience.',
    },
    image: team('photo-1607631568010-a87245c0daf8'),
  },
  {
    name: 'Mert Korkmaz',
    role: { tr: 'Tasarım Şefi', en: 'Design Chef' },
    bio: {
      tr: 'Şeker sanatı ve fondan dekorasyonda uzman; her detayı kusursuzlaştırır.',
      en: 'A specialist in sugar art and fondant decoration who perfects every detail.',
    },
    image: team('photo-1583394293214-28a5b42b0bbd'),
  },
  {
    name: 'Selin Yıldız',
    role: { tr: 'Aroma & Tarif Şefi', en: 'Flavour & Recipe Chef' },
    bio: {
      tr: 'Lezzet dengelerini kuran isim; imza tariflerimizin arkasındaki yaratıcılık.',
      en: 'The mind behind our flavour balance and signature recipes.',
    },
    image: team('photo-1595152452543-e5fc28ebc2b8'),
  },
];

export interface ValueItem {
  icon: string;
  title: Bilingual;
  desc: Bilingual;
}

export const VALUES: ValueItem[] = [
  {
    icon: 'Heart',
    title: { tr: 'El Yapımı', en: 'Handmade' },
    desc: {
      tr: 'Her pasta tek tek, elde ve özenle hazırlanır.',
      en: 'Every cake is made one by one, by hand and with care.',
    },
  },
  {
    icon: 'Leaf',
    title: { tr: 'Premium Malzeme', en: 'Premium Ingredients' },
    desc: {
      tr: 'Yalnızca en kaliteli, taze ve doğal malzemeler.',
      en: 'Only the finest, freshest and most natural ingredients.',
    },
  },
  {
    icon: 'Sparkles',
    title: { tr: 'Bespoke Tasarım', en: 'Bespoke Design' },
    desc: {
      tr: 'Tamamen size özel, eşsiz ve kişiselleştirilmiş tasarımlar.',
      en: 'Entirely unique, personalised designs made just for you.',
    },
  },
  {
    icon: 'Award',
    title: { tr: 'Ödüllü Kalite', en: 'Award-Winning Quality' },
    desc: {
      tr: 'Ulusal ve uluslararası yarışmalarda ödüllendirilmiş ustalık.',
      en: 'Craftsmanship recognised in national and international competitions.',
    },
  },
];
