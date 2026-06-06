import type { LegalSection } from './legal';

const p = (tr: string, en: string) => ({ tr, en });

export const CARE_GUIDE: LegalSection[] = [
  {
    heading: p('Saklama Sıcaklığı', 'Storage Temperature'),
    paragraphs: [
      p(
        'Tereyağlı krema ve ganaj kaplı pastalar oda sıcaklığında en iyi lezzeti verir. Servisten 1-2 saat önce buzdolabından çıkarın.',
        'Buttercream and ganache cakes taste best at room temperature. Remove from the fridge 1-2 hours before serving.',
      ),
      p(
        'Taze meyveli ve çırpılmış kremalı pastaları soğukta saklayın ve aynı gün tüketin.',
        'Keep fresh-fruit and whipped-cream cakes chilled and consume them the same day.',
      ),
    ],
  },
  {
    heading: p('Buzdolabında Saklama', 'Refrigeration'),
    paragraphs: [
      p(
        'Pastayı kapalı bir kutuda saklayın; böylece buzdolabındaki kokuları çekmez ve kurumaz.',
        'Store the cake in a closed box so it does not absorb fridge odours or dry out.',
      ),
      p(
        'Fondan kaplı pastaları buzdolabından çıkardığınızda yüzeyde oluşan nem normaldir; dokunmadan kurumasını bekleyin.',
        'Condensation on fondant after refrigeration is normal; let it dry without touching.',
      ),
    ],
  },
  {
    heading: p('Servis ve Kesim', 'Serving & Cutting'),
    paragraphs: [
      p(
        'İnce, uzun bir bıçağı sıcak suda ısıtıp her dilimden sonra silerek temiz dilimler elde edin.',
        'Warm a thin, long knife in hot water and wipe it after each slice for clean portions.',
      ),
      p(
        'Çok katlı pastalarda önce üst katları dikkatlice ayırın, ardından her katı ayrı ayrı kesin.',
        'For multi-tier cakes, carefully separate the upper tiers first, then cut each tier individually.',
      ),
    ],
  },
  {
    heading: p('Taşıma', 'Transport'),
    paragraphs: [
      p(
        'Pastayı düz bir zeminde, aracın bagajında değil tabanında taşıyın. Ani fren ve dönüşlerden kaçının.',
        'Carry the cake on a flat surface, on the car floor rather than the boot. Avoid sudden braking and turns.',
      ),
    ],
  },
  {
    heading: p('Taze Çiçekli Pastalar', 'Cakes with Fresh Flowers'),
    paragraphs: [
      p(
        'Taze çiçekli pastalarda çiçekler servisten hemen önce yerleştirilir. Çiçekleri yemeden önce çıkarın.',
        'On cakes with fresh flowers, the flowers are placed just before serving. Remove the flowers before eating.',
      ),
    ],
  },
  {
    heading: p('Sıcak Hava Uyarısı', 'Hot Weather Notice'),
    paragraphs: [
      p(
        'Sıcak havalarda pastayı doğrudan güneş ışığından ve sıcaktan uzak, serin bir yerde tutun.',
        'In hot weather, keep the cake in a cool place away from direct sunlight and heat.',
      ),
      p(
        'Açık hava etkinlikleri için gölgeli bir sunum alanı planlamanızı öneririz.',
        'For outdoor events we recommend planning a shaded presentation area.',
      ),
    ],
  },
  {
    heading: p('Artan Pasta', 'Leftover Cake'),
    paragraphs: [
      p(
        'Kalan dilimleri hava almayacak şekilde kapatıp buzdolabında saklayın; 2-3 gün içinde tüketin.',
        'Cover leftover slices airtight and refrigerate; consume within 2-3 days.',
      ),
    ],
  },
];
