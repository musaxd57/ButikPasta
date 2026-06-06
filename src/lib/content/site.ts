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
  {
    image: ing('photo-1509440159596-0249088772ff'),
    title: { tr: 'Madagaskar Vanilyası', en: 'Madagascar Vanilla' },
    desc: {
      tr: 'Gerçek vanilya çubuğundan elde edilen, derin ve zengin aroma.',
      en: 'A deep, rich aroma extracted from genuine vanilla pods.',
    },
  },
  {
    image: ing('photo-1481391319762-47dff72954d9'),
    title: { tr: 'Taze Mevsim Çiçekleri', en: 'Fresh Seasonal Flowers' },
    desc: {
      tr: 'Gıdayla temasa uygun, mevsiminde temin edilen doğal çiçekler.',
      en: 'Food-safe, naturally sourced flowers in season.',
    },
  },
  {
    image: ing('photo-1550583724-b2692b85b150'),
    title: { tr: 'Sicilya Fındığı', en: 'Sicilian Hazelnut' },
    desc: {
      tr: 'Pralin ve kremalarımıza derinlik katan, kavrulmuş Sicilya fındığı.',
      en: 'Roasted Sicilian hazelnut that adds depth to our pralines and creams.',
    },
  },
  {
    image: ing('photo-1511381939415-e44015466834'),
    title: { tr: 'Saf Kakao Yağı', en: 'Pure Cocoa Butter' },
    desc: {
      tr: 'İpeksi doku ve parlaklık için kullandığımız saf kakao yağı.',
      en: 'Pure cocoa butter we use for a silky texture and shine.',
    },
  },
  {
    image: ing('photo-1519915028121-7d3463d20b13'),
    title: { tr: 'Akdeniz Narenciyesi', en: 'Mediterranean Citrus' },
    desc: {
      tr: 'Ferah aromalar için günlük sıkılan limon ve portakal.',
      en: 'Daily-squeezed lemon and orange for zesty aromas.',
    },
  },
  {
    image: ing('photo-1550583724-b2692b85b150'),
    title: { tr: 'Saf Vanilya Özütü', en: 'Pure Vanilla Extract' },
    desc: {
      tr: 'Yapay tat yerine gerçek vanilya çubuğu özütü.',
      en: 'Real vanilla-pod extract instead of artificial flavour.',
    },
  },
  {
    image: ing('photo-1452251889946-8ff5ea7b27ab'),
    title: { tr: 'Organik Bal', en: 'Organic Honey' },
    desc: {
      tr: 'Doğal tatlandırıcı olarak saf, organik çiçek balı.',
      en: 'Pure organic flower honey as a natural sweetener.',
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
  'Harper’s Bazaar',
  'GQ',
  'Time Out Istanbul',
  'Yemek.com',
  'Hürriyet',
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
  {
    name: { tr: 'Anadolu Merkez', en: 'Anatolian Central' },
    districts: ['Kadıköy', 'Üsküdar', 'Ataşehir', 'Kartal'],
    fee: { tr: 'Ücretsiz', en: 'Free' },
  },
  {
    name: { tr: 'Boğaz Hattı', en: 'Bosphorus Line' },
    districts: ['Bebek', 'Etiler', 'Tarabya', 'Kanlıca', 'Çengelköy'],
    fee: { tr: '₺120', en: '₺120' },
  },
  {
    name: { tr: 'Adalar', en: 'Princes Islands' },
    districts: ['Büyükada', 'Heybeliada', 'Burgazada'],
    fee: { tr: '₺450', en: '₺450' },
  },
  {
    name: { tr: 'Batı Hattı', en: 'Western Line' },
    districts: ['Bahçeşehir', 'Esenyurt', 'Büyükçekmece'],
    fee: { tr: '₺220', en: '₺220' },
  },
  {
    name: { tr: 'Kuzey Hattı', en: 'Northern Line' },
    districts: ['Maslak', 'Sarıyer', 'Zekeriyaköy', 'Kemerburgaz'],
    fee: { tr: '₺180', en: '₺180' },
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
  {
    name: 'Eda Demir',
    role: { tr: 'Şeker Sanatı Uzmanı', en: 'Sugar Art Specialist' },
    bio: {
      tr: 'Yenilebilir çiçekler ve incelikli şeker detaylarında ustalaşmış bir sanatçı.',
      en: 'An artist who has mastered edible flowers and delicate sugar details.',
    },
    image: team('photo-1551836022-deb4988cc6c0'),
  },
  {
    name: 'Kerem Aslan',
    role: { tr: 'Müşteri Deneyimi', en: 'Client Experience' },
    bio: {
      tr: 'Sipariş sürecinizin her adımında yanınızda olan güler yüzlü isim.',
      en: 'The friendly face beside you at every step of your order journey.',
    },
    image: team('photo-1500648767791-00dcc994a43e'),
  },
  {
    name: 'Burcu Şen',
    role: { tr: 'Çikolata Uzmanı', en: 'Chocolatier' },
    bio: {
      tr: 'Çikolata temperleme ve bonbon sanatında uzmanlaşmış tutkulu bir usta.',
      en: 'A passionate master specialised in chocolate tempering and bonbon art.',
    },
    image: team('photo-1607990281513-2c110a25bd8c'),
  },
  {
    name: 'Deniz Kaya',
    role: { tr: 'Teslimat & Lojistik', en: 'Delivery & Logistics' },
    bio: {
      tr: 'Her pastanın kusursuz şekilde, zamanında ulaşmasını sağlayan titiz isim.',
      en: 'The meticulous person ensuring every cake arrives flawless and on time.',
    },
    image: team('photo-1506794778202-cad84cf45f1d'),
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
  {
    icon: 'Truck',
    title: { tr: 'Güvenli Teslimat', en: 'Safe Delivery' },
    desc: {
      tr: 'Soğutmalı araçlar ve özel kutularla kusursuz teslimat.',
      en: 'Flawless delivery with refrigerated vehicles and custom boxes.',
    },
  },
  {
    icon: 'MessageCircle',
    title: { tr: 'Birebir İletişim', en: 'Personal Communication' },
    desc: {
      tr: 'Sürecin her adımında size özel danışmanlık ve destek.',
      en: 'Dedicated guidance and support at every step of the process.',
    },
  },
];
