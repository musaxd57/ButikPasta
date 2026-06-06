// Editorial journal (blog) content. Bilingual, data-driven — rendered by
// /[locale]/journal and /[locale]/journal/[slug].

export type JournalCategory =
  | 'trends'
  | 'guides'
  | 'behindscenes'
  | 'recipes';

export interface JournalPost {
  slug: string;
  category: JournalCategory;
  cover: string;
  date: string; // ISO
  readingMinutes: number;
  author: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  body: { tr: string[]; en: string[] };
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const JOURNAL: JournalPost[] = [
  {
    slug: 'dugun-pastasi-trendleri-2026',
    category: 'trends',
    cover: img('photo-1535141192574-5d4897c12636'),
    date: '2026-05-18',
    readingMinutes: 6,
    author: 'Defne Aydın',
    title: {
      tr: '2026 Düğün Pastası Trendleri',
      en: '2026 Wedding Cake Trends',
    },
    excerpt: {
      tr: 'Bu yılın en çok konuşulan düğün pastası tasarımları: minimalist zarafet, altın yaprak detayları ve taze çiçek dokunuşları.',
      en: "This year's most talked-about wedding cake designs: minimalist elegance, gold-leaf detailing and fresh floral accents.",
    },
    body: {
      tr: [
        'Düğün pastası artık yalnızca bir tatlı değil; çiftin hikâyesini anlatan bir sanat eseri. 2026 sezonunda sadelik ön planda. Aşırı süslemeler yerini incelikle yerleştirilmiş detaylara bırakıyor.',
        'Altın yaprak, bu yılın imza dokunuşu. Fildişi bir fondan üzerine elle uygulanan 24 ayar altın yaprak, ışıkla birlikte zarif bir parıltı yaratıyor. Az ama etkileyici kullanıldığında lüksün tanımı oluyor.',
        'Taze çiçekler kurabiyelerin yerini alıyor. Mevsiminde, yenilebilir veya gıdayla temasa uygun şekilde hazırlanmış güller, şakayıklar ve okaliptüs dalları pastaya organik bir zarafet katıyor.',
        'Renk paletinde toprak tonları, pudra pembesi ve şampanya altını hâkim. Bu tonlar hem fotoğraflarda hem de gerçek hayatta zamansız bir his veriyor.',
        'Son olarak, kişiselleştirme her zamankinden önemli. Çiftin baş harfleri, özel bir tarih ya da anlamlı bir alıntı; her detay hikâyeyi tamamlıyor.',
      ],
      en: [
        "A wedding cake is no longer just a dessert; it is a piece of art that tells the couple's story. For the 2026 season, simplicity takes centre stage. Excessive ornamentation gives way to delicately placed details.",
        'Gold leaf is this year\'s signature touch. Applied by hand onto ivory fondant, 24-carat gold leaf creates an elegant shimmer in the light. Used sparingly but boldly, it becomes the very definition of luxury.',
        'Fresh flowers are replacing sugar work. Seasonal, edible or food-safe roses, peonies and eucalyptus branches lend an organic elegance to the cake.',
        'Earth tones, dusty rose and champagne gold dominate the palette. These shades feel timeless both in photographs and in real life.',
        'Finally, personalisation matters more than ever. The couple\'s initials, a special date or a meaningful quote — every detail completes the story.',
      ],
    },
  },
  {
    slug: 'dogru-pasta-boyutu-nasil-secilir',
    category: 'guides',
    cover: img('photo-1578985545062-69928b1d9587'),
    date: '2026-04-30',
    readingMinutes: 5,
    author: 'Defne Aydın',
    title: {
      tr: 'Davetiniz İçin Doğru Pasta Boyutu Nasıl Seçilir?',
      en: 'How to Choose the Right Cake Size for Your Event',
    },
    excerpt: {
      tr: 'Kaç kişilik pasta sipariş etmelisiniz? Kat sayısı, porsiyon hesabı ve sunum ipuçları ile pratik bir rehber.',
      en: 'How many servings should you order? A practical guide to tiers, portion math and presentation tips.',
    },
    body: {
      tr: [
        'Pasta boyutu seçimi göründüğünden daha bilimsel bir konu. Genel kural: 15 cm çapında tek katlı bir pasta yaklaşık 12-15 ince porsiyon verir.',
        'İki katlı bir pasta (20 cm + 15 cm) 30-40 kişiye, üç katlı bir tasarım ise 60-80 kişiye kadar hizmet edebilir.',
        'Eğer pasta tek tatlıysa, kişi başı bir porsiyon hesaplayın. Yanında başka tatlılar varsa porsiyonları küçültebilirsiniz.',
        'Görsel etki için boyut da önemli. Kalabalık bir salonda küçük bir pasta kaybolur; bu durumda sahte katlar (dummy tiers) ile görkem yaratıp maliyeti kontrol altında tutabiliriz.',
        'Emin değilseniz, atölyemizle iletişime geçin; davet detaylarınıza göre ideal boyutu birlikte belirleyelim.',
      ],
      en: [
        'Choosing a cake size is more of a science than it appears. The rule of thumb: a single-tier 15 cm cake yields about 12-15 thin servings.',
        'A two-tier cake (20 cm + 15 cm) serves 30-40 guests, while a three-tier design can serve up to 60-80.',
        'If the cake is the only dessert, plan one serving per guest. With other desserts on offer, you can reduce portion sizes.',
        'Scale also matters for visual impact. A small cake gets lost in a large hall; in that case we can create grandeur with dummy tiers while keeping the cost in check.',
        "If you're unsure, get in touch with our atelier and we'll determine the ideal size together based on your event.",
      ],
    },
  },
  {
    slug: 'atolyemizde-bir-gun',
    category: 'behindscenes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2026-04-12',
    readingMinutes: 7,
    author: 'Atelier Cake',
    title: {
      tr: 'Atölyemizde Bir Gün',
      en: 'A Day in Our Atelier',
    },
    excerpt: {
      tr: 'Sabahın erken saatlerinden teslimata kadar, bir bespoke pastanın doğuşuna perde arkasından bakış.',
      en: 'From the early morning to delivery — a behind-the-scenes look at the birth of a bespoke cake.',
    },
    body: {
      tr: [
        'Gün, güneş doğmadan başlar. İlk iş, o günün siparişlerini gözden geçirmek ve taze malzemeleri hazırlamaktır.',
        'Pandispanyalar fırına girerken, kremalar ve ganajlar özenle çırpılır. Her tarif, gramına kadar ölçülür; çünkü tutarlılık lüksün temelidir.',
        'Öğleden sonra dekorasyon zamanı. Bu, sabır ve el becerisi gerektiren en hassas aşama. Bir altın yaprağın yerleşmesi bazen yarım saat sürebilir.',
        'Teslimattan önce her pasta son kez kontrol edilir, fotoğraflanır ve özenle paketlenir. İstanbul trafiğinde bile pastanın kusursuz ulaşması için özel taşıma kutuları kullanırız.',
        'Ve en güzel an: müşterimizin pastayı ilk gördüğü andaki ifade. İşte tüm emeğin karşılığı budur.',
      ],
      en: [
        'The day begins before sunrise. The first task is to review the orders of the day and prepare fresh ingredients.',
        'As the sponges go into the oven, creams and ganaches are whipped with care. Every recipe is measured to the gram, because consistency is the foundation of luxury.',
        'The afternoon is decoration time. This is the most delicate stage, requiring patience and craftsmanship. Placing a single sheet of gold leaf can take half an hour.',
        'Before delivery, each cake is checked one last time, photographed and carefully packaged. We use special transport boxes so the cake arrives flawless, even in Istanbul traffic.',
        "And the best moment of all: the look on our client's face when they first see the cake. That is the reward for all the effort.",
      ],
    },
  },
  {
    slug: 'pasta-saklama-ve-servis-rehberi',
    category: 'guides',
    cover: img('photo-1464349095431-e9a21285b5f3'),
    date: '2026-03-22',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: {
      tr: 'Pastanızı Saklama ve Servis Rehberi',
      en: 'Storing & Serving Your Cake',
    },
    excerpt: {
      tr: 'Pastanızın tazeliğini korumak ve en lezzetli haliyle servis etmek için pratik öneriler.',
      en: 'Practical tips to keep your cake fresh and serve it at its most delicious.',
    },
    body: {
      tr: [
        'Tereyağlı krema ve ganaj kaplı pastalar oda sıcaklığında en iyi lezzeti verir. Servisten 1-2 saat önce buzdolabından çıkarın.',
        'Pastayı buzdolabında saklarken kokuları çekmemesi için kapalı bir kutuda tutun.',
        'Taze meyveli ve çırpılmış kremalı pastaları mutlaka soğukta saklayın ve aynı gün tüketin.',
        'Kesim için ince, uzun ve sıcak su altında ısıtılmış bir bıçak kullanın; her dilimden sonra silin. Bu, temiz dilimler verir.',
      ],
      en: [
        'Buttercream and ganache-covered cakes taste best at room temperature. Remove from the fridge 1-2 hours before serving.',
        'When refrigerating, keep the cake in a closed box so it does not absorb odours.',
        'Always keep fresh-fruit and whipped-cream cakes chilled and consume them the same day.',
        'For cutting, use a thin, long knife warmed under hot water, wiping it after each slice. This gives clean portions.',
      ],
    },
  },
  {
    slug: 'antep-fistikli-pastanin-sirri',
    category: 'recipes',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2026-02-28',
    readingMinutes: 5,
    author: 'Defne Aydın',
    title: {
      tr: 'Antep Fıstıklı Pastanın Sırrı',
      en: 'The Secret of Our Pistachio Cake',
    },
    excerpt: {
      tr: 'İmza Antep fıstıklı pastamızı bu kadar özel yapan nedir? Malzemeden tekniğe bir bakış.',
      en: 'What makes our signature pistachio cake so special? A look from ingredient to technique.',
    },
    body: {
      tr: [
        'Her şey doğru fıstıkla başlar. Yalnızca taze çekilmiş, gerçek Antep fıstığı kullanıyoruz; aroması yapay özütlerle kıyaslanamaz.',
        'Pandispanyamıza fıstığı ince öğütülmüş un kıvamında ekliyoruz; bu, nemli ve yoğun bir doku verirken aromayı her lokmaya yayıyor.',
        'Kremamız hafif tutulur ki fıstığın doğal yağı ve tadı öne çıksın. Aşırı şeker, asaleti gölgeler.',
        'Sonuç: dengeli, sofistike ve unutulmaz bir lezzet. Bizce İstanbul\'un en iyi fıstıklı pastası — ama kararı siz verin.',
      ],
      en: [
        'It all starts with the right pistachio. We use only freshly ground, genuine Antep pistachios; their aroma is incomparable to artificial extracts.',
        'We add the pistachio to our sponge ground to a flour-like fineness; this gives a moist, dense texture while spreading the aroma through every bite.',
        'Our cream is kept light so the pistachio\'s natural oil and flavour can shine. Excessive sugar would overshadow its nobility.',
        "The result: a balanced, sophisticated and unforgettable flavour. We think it's Istanbul's best pistachio cake — but we'll let you be the judge.",
      ],
    },
  },
  {
    slug: 'kurumsal-etkinlikler-icin-pasta',
    category: 'guides',
    cover: img('photo-1606890737304-57a1ca8a5b62'),
    date: '2026-01-30',
    readingMinutes: 4,
    author: 'Atelier Cake',
    title: {
      tr: 'Kurumsal Etkinlikler İçin Pasta Seçimi',
      en: 'Choosing Cakes for Corporate Events',
    },
    excerpt: {
      tr: 'Marka lansmanından yıl dönümüne; kurumsal etkinliğinize prestij katacak pasta çözümleri.',
      en: 'From product launches to anniversaries — cake solutions that add prestige to your corporate event.',
    },
    body: {
      tr: [
        'Kurumsal pastalar markanızın bir uzantısıdır. Logonuzu, kurumsal renklerinizi ve mesajınızı zarif biçimde yansıtabiliriz.',
        'Yenilebilir baskı teknolojisiyle logonuzu kusursuz netlikte pastaya aktarıyoruz.',
        'Büyük katılımlı etkinlikler için porsiyonlanması kolay tasarımlar ve bireysel mini pastalar öneriyoruz.',
        'Kurumsal müşterilerimize özel faturalandırma ve toplu sipariş avantajları sunuyoruz. Detaylar için iletişime geçin.',
      ],
      en: [
        'Corporate cakes are an extension of your brand. We can elegantly reflect your logo, corporate colours and message.',
        'With edible printing technology we transfer your logo onto the cake with flawless clarity.',
        'For large events we recommend easy-to-portion designs and individual mini cakes.',
        'We offer dedicated invoicing and bulk-order benefits for corporate clients. Get in touch for details.',
      ],
    },
  },
];

export function getPost(slug: string) {
  return JOURNAL.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3) {
  const current = getPost(slug);
  if (!current) return JOURNAL.slice(0, limit);
  return JOURNAL.filter(
    (p) => p.slug !== slug && p.category === current.category,
  )
    .concat(JOURNAL.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}
