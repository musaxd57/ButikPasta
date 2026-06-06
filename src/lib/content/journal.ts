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
  {
    slug: 'fondan-mi-tereyagli-krema-mi',
    category: 'guides',
    cover: img('photo-1542826438-bd32f43d626f'),
    date: '2025-12-15',
    readingMinutes: 5,
    author: 'Selin Yıldız',
    title: { tr: 'Fondan mı, Tereyağlı Krema mı?', en: 'Fondant or Buttercream?' },
    excerpt: {
      tr: 'İki popüler kaplama arasındaki farkları ve hangi durumda hangisinin daha uygun olduğunu anlatıyoruz.',
      en: 'We explain the differences between two popular finishes and when each works best.',
    },
    body: {
      tr: [
        'Fondan, pürüzsüz ve kusursuz bir yüzey sunar; özellikle keskin hatlı, modern tasarımlar için idealdir.',
        'Tereyağlı krema ise daha yumuşak bir doku ve zengin bir lezzet verir. Doğal, rustik ve romantik görünümler için tercih edilir.',
        'Lezzet açısından çoğu kişi tereyağlı kremayı daha çok sever; fondan ise dayanıklılık ve görsel netlik sağlar.',
        'Sıcak havalarda dış mekan etkinlikleri için fondan daha güvenlidir. İç mekan davetlerinde tereyağlı krema harika sonuç verir.',
      ],
      en: [
        'Fondant offers a smooth, flawless surface; it is ideal for modern designs with sharp edges.',
        'Buttercream gives a softer texture and richer flavour. It is preferred for natural, rustic and romantic looks.',
        'In terms of taste, most people prefer buttercream; fondant provides durability and visual clarity.',
        'For outdoor events in hot weather, fondant is safer. For indoor celebrations, buttercream works beautifully.',
      ],
    },
  },
  {
    slug: 'pasta-renk-paleti-secimi',
    category: 'trends',
    cover: img('photo-1464349095431-e9a21285b5f3'),
    date: '2025-11-28',
    readingMinutes: 4,
    author: 'Mert Korkmaz',
    title: { tr: 'Etkinliğinize Uygun Renk Paleti', en: 'A Colour Palette for Your Event' },
    excerpt: {
      tr: 'Pastanızın rengi, etkinliğinizin ruhunu yansıtır. Doğru paleti seçmenin inceliklerini paylaşıyoruz.',
      en: 'Your cake colour reflects the spirit of your event. We share the art of choosing the right palette.',
    },
    body: {
      tr: [
        'Renk, bir pastanın vereceği ilk izlenimi belirler. Etkinliğin temasıyla uyumlu olmalıdır.',
        'Zamansız bir zarafet için fildişi, şampanya ve pudra tonları idealdir.',
        'Cesur ve modern bir hava için derin bordo, zümrüt yeşili veya gece mavisi tercih edilebilir.',
        'Altın yaprak detayları neredeyse her paletle uyum sağlar ve lüks bir dokunuş katar.',
      ],
      en: [
        'Colour sets the first impression a cake makes. It should harmonise with the event theme.',
        'For timeless elegance, ivory, champagne and powder tones are ideal.',
        'For a bold, modern feel, deep burgundy, emerald or midnight blue work wonderfully.',
        'Gold-leaf details pair with almost any palette and add a luxurious touch.',
      ],
    },
  },
  {
    slug: 'glutensiz-pastalarin-sirri',
    category: 'recipes',
    cover: img('photo-1571115177098-24ec42ed204d'),
    date: '2025-11-10',
    readingMinutes: 5,
    author: 'Selin Yıldız',
    title: { tr: 'Glutensiz Pastaların Sırrı', en: 'The Secret of Gluten-Free Cakes' },
    excerpt: {
      tr: 'Glutensiz bir pasta da en az klasik kadar lezzetli ve nemli olabilir. İşte nasıl?',
      en: 'A gluten-free cake can be just as delicious and moist as the classic. Here is how.',
    },
    body: {
      tr: [
        'Glutensiz pastalarda doku, doğru un karışımıyla başlar. Badem ve pirinç ununu dengeli biçimde kullanıyoruz.',
        'Nem dengesini korumak için doğal yoğurt ve kaliteli tereyağı ekliyoruz.',
        'Sonuç, gluteni olmayan ama lezzetten ödün vermeyen, herkesin keyifle yiyebileceği bir pasta.',
        'Çölyak hassasiyeti olan misafirleriniz için ayrı hazırlık alanı kullanıyoruz.',
      ],
      en: [
        'Texture in gluten-free cakes starts with the right flour blend. We balance almond and rice flours.',
        'To maintain moisture, we add natural yoghurt and quality butter.',
        'The result is a cake with no gluten but no compromise on flavour — one everyone can enjoy.',
        'For guests with coeliac sensitivity, we use a separate preparation area.',
      ],
    },
  },
  {
    slug: 'mini-pastalar-ve-bireysel-tatlilar',
    category: 'trends',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2025-10-22',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Mini Pastalar ve Bireysel Tatlılar', en: 'Mini Cakes & Individual Desserts' },
    excerpt: {
      tr: 'Büyük etkinliklerde porsiyonlama derdini ortadan kaldıran şık çözüm: bireysel mini pastalar.',
      en: 'The elegant solution that removes portioning hassle at large events: individual mini cakes.',
    },
    body: {
      tr: [
        'Mini pastalar hem servisi kolaylaştırır hem de her misafire kişisel bir dokunuş sunar.',
        'Farklı lezzetleri bir arada sunarak misafirlerinize seçenek sağlarsınız.',
        'Kurumsal etkinlikler ve kokteyllerde özellikle pratiktir.',
      ],
      en: [
        'Mini cakes both simplify service and offer each guest a personal touch.',
        'By presenting different flavours together, you give your guests choice.',
        'They are especially practical at corporate events and cocktails.',
      ],
    },
  },
  {
    slug: 'pasta-fotografciligi-ipuclari',
    category: 'guides',
    cover: img('photo-1606313564200-e75d5e30476c'),
    date: '2025-10-05',
    readingMinutes: 4,
    author: 'Mert Korkmaz',
    title: { tr: 'Pastanızı En İyi Şekilde Fotoğraflamak', en: 'Photographing Your Cake Beautifully' },
    excerpt: {
      tr: 'Özenle hazırlanan pastanızı anılarda ölümsüzleştirmek için basit ama etkili fotoğraf ipuçları.',
      en: 'Simple yet effective photography tips to immortalise your carefully crafted cake.',
    },
    body: {
      tr: [
        'Doğal ışık en iyi dostunuzdur. Pencereden gelen yumuşak ışıkta çekim yapın.',
        'Sade bir arka plan, pastanın detaylarını öne çıkarır.',
        'Farklı açılar deneyin; özellikle hafif yukarıdan çekimler katmanları güzel gösterir.',
        'Yakın çekimlerle doku ve süsleme detaylarını yakalamayı unutmayın.',
      ],
      en: [
        'Natural light is your best friend. Shoot in the soft light from a window.',
        'A simple background highlights the cake’s details.',
        'Try different angles; slightly elevated shots show the tiers beautifully.',
        'Don’t forget close-ups to capture texture and decoration details.',
      ],
    },
  },
  {
    slug: 'sevgililer-gunu-ozel-tasarimlar',
    category: 'behindscenes',
    cover: img('photo-1586985289688-ca3cf47d3e6e'),
    date: '2025-09-18',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Sevgililer Günü Özel Tasarımlar', en: "Valentine's Day Special Designs" },
    excerpt: {
      tr: 'Sevdiklerinize duygularınızı en tatlı şekilde anlatmanın yolu: kişiye özel romantik pastalar.',
      en: 'The sweetest way to express your feelings to loved ones: bespoke romantic cakes.',
    },
    body: {
      tr: [
        'Sevgililer Günü için kalp formlu tasarımlar ve kırmızı meyveli lezzetler hazırlıyoruz.',
        'Çiftin baş harfleri veya özel bir notla pastayı tamamen kişiselleştiriyoruz.',
        'Sınırlı sayıda hazırlanan bu özel koleksiyon, her yıl büyük ilgi görüyor.',
      ],
      en: [
        "For Valentine's Day we create heart-shaped designs and red-berry flavours.",
        "We fully personalise the cake with the couple's initials or a special note.",
        'Prepared in limited numbers, this special collection draws great interest each year.',
      ],
    },
  },
  {
    slug: 'altin-yaprak-nasil-uygulanir',
    category: 'behindscenes',
    cover: img('photo-1535141192574-5d4897c12636'),
    date: '2025-09-02',
    readingMinutes: 4,
    author: 'Mert Korkmaz',
    title: { tr: 'Altın Yaprak Nasıl Uygulanır?', en: 'How Gold Leaf Is Applied' },
    excerpt: {
      tr: 'Pastalarımıza imza parıltısını veren 24 ayar altın yaprağın uygulanış sürecine yakından bakıyoruz.',
      en: 'A close look at applying the 24-carat gold leaf that gives our cakes their signature shimmer.',
    },
    body: {
      tr: [
        'Altın yaprak son derece incedir; hafif bir hava akımı bile onu uçurabilir. Bu yüzden kapalı ve sakin bir ortamda çalışırız.',
        'Özel bir fırça ve hassas el hareketleriyle yaprak, pastanın yüzeyine nazikçe yerleştirilir.',
        'Az kullanıldığında lüks bir vurgu, çok kullanıldığında ihtişamlı bir ifade yaratır. Denge her şeydir.',
      ],
      en: [
        'Gold leaf is extremely thin; even a slight draught can send it flying. So we work in an enclosed, calm space.',
        'With a special brush and precise hand movements, the leaf is gently placed on the cake surface.',
        'Used sparingly it creates a luxurious accent; used generously, a grand statement. Balance is everything.',
      ],
    },
  },
  {
    slug: 'mevsiminde-malzeme-neden-onemli',
    category: 'guides',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2025-08-15',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Mevsiminde Malzeme Neden Önemli?', en: 'Why Seasonal Ingredients Matter' },
    excerpt: {
      tr: 'Mevsiminde toplanan malzemeler hem daha lezzetli hem daha aromalıdır. Nedenini açıklıyoruz.',
      en: 'Ingredients harvested in season are tastier and more aromatic. We explain why.',
    },
    body: {
      tr: [
        'Mevsiminde olgunlaşan meyveler doğal şekerlerini tam olarak geliştirir; bu da daha yoğun bir tat demektir.',
        'Taze tedarik, aromaların kaybolmadan pastaya geçmesini sağlar.',
        'Bu yüzden menümüzü mevsime göre günceller, en iyi malzemeyi en doğru zamanda kullanırız.',
      ],
      en: [
        'Fruit that ripens in season fully develops its natural sugars, which means a deeper flavour.',
        'Fresh sourcing ensures aromas reach the cake without fading.',
        'That is why we update our menu by season, using the best ingredient at the right time.',
      ],
    },
  },
  {
    slug: 'cocuk-dogum-gunu-tema-fikirleri',
    category: 'trends',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2025-07-28',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Çocuk Doğum Günü Tema Fikirleri', en: 'Kids Birthday Theme Ideas' },
    excerpt: {
      tr: 'Küçükler için unutulmaz bir kutlama yaratacak, yaratıcı ve şık pasta temaları.',
      en: 'Creative and stylish cake themes to create an unforgettable celebration for the little ones.',
    },
    body: {
      tr: [
        'Masalsı orman, uzay macerası veya pastel gökkuşağı; çocuğunuzun hayal dünyasını pastaya taşıyoruz.',
        'Yenilebilir figürler ve canlı renklerle hem güvenli hem etkileyici tasarımlar hazırlıyoruz.',
        'Tema, davetin tüm detaylarıyla uyumlu olduğunda büyü tamamlanır.',
      ],
      en: [
        'A fairytale forest, a space adventure or a pastel rainbow; we bring your child’s imagination onto the cake.',
        'With edible figures and vivid colours we create designs that are both safe and striking.',
        'The magic is complete when the theme harmonises with every detail of the party.',
      ],
    },
  },
  {
    slug: 'pasta-ve-sarap-eslestirmesi',
    category: 'recipes',
    cover: img('photo-1464349095431-e9a21285b5f3'),
    date: '2025-07-10',
    readingMinutes: 5,
    author: 'Selin Yıldız',
    title: { tr: 'Pasta ve İçecek Eşleştirmesi', en: 'Pairing Cake with Drinks' },
    excerpt: {
      tr: 'Doğru içecekle eşleştirildiğinde pastanın lezzeti bambaşka bir boyuta taşınır.',
      en: 'Paired with the right drink, a cake’s flavour reaches a whole new dimension.',
    },
    body: {
      tr: [
        'Çikolatalı pastalar, yoğun bir espresso veya tatlı şarapla mükemmel uyum sağlar.',
        'Limonlu ve meyveli pastalar köpüklü içecekler ya da hafif beyaz şaraplarla ferahlatıcı bir denge kurar.',
        'Antep fıstıklı pastamız ise Türk kahvesiyle yan yana, geleneksel bir zarafet sunar.',
      ],
      en: [
        'Chocolate cakes pair perfectly with an intense espresso or a sweet wine.',
        'Lemon and fruity cakes strike a refreshing balance with sparkling drinks or light white wines.',
        'Our pistachio cake, alongside Turkish coffee, offers a traditional elegance.',
      ],
    },
  },
  {
    slug: 'kis-dugunleri-icin-pasta',
    category: 'trends',
    cover: img('photo-1542826438-bd32f43d626f'),
    date: '2025-06-20',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Kış Düğünleri İçin Pasta', en: 'Cakes for Winter Weddings' },
    excerpt: {
      tr: 'Soğuk ama büyülü kış düğünlerine yakışan, sıcak tonlar ve zengin lezzetler.',
      en: 'Warm tones and rich flavours for the cold yet magical winter weddings.',
    },
    body: {
      tr: [
        'Kış düğünlerinde beyaz, gümüş ve buz mavisi tonları masalsı bir atmosfer yaratır.',
        'Tarçın, çikolata ve kestane gibi sıcak lezzetler mevsime mükemmel uyum sağlar.',
        'Şeker kar taneleri ve metalik detaylar, pastaya zarif bir kış dokunuşu katar.',
      ],
      en: [
        'White, silver and ice-blue tones create a fairytale atmosphere at winter weddings.',
        'Warm flavours like cinnamon, chocolate and chestnut suit the season perfectly.',
        'Sugar snowflakes and metallic details add an elegant winter touch to the cake.',
      ],
    },
  },
  {
    slug: 'pasta-trendleri-renkli-katmanlar',
    category: 'trends',
    cover: img('photo-1535254973040-607b474cb50d'),
    date: '2025-06-05',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Renkli Katmanlar Geri Döndü', en: 'Colourful Layers Are Back' },
    excerpt: {
      tr: 'Kesildiğinde sürpriz renkler ortaya çıkaran katmanlı pastalar yeniden moda.',
      en: 'Layered cakes that reveal surprise colours when cut are back in fashion.',
    },
    body: {
      tr: [
        'Dışı sade, içi renkli pastalar kesim anında büyük bir sürpriz yaratıyor.',
        'Özellikle doğum günleri ve cinsiyet belli etme partilerinde çok seviliyor.',
        'Doğal gıda boyalarıyla canlı ama güvenli renkler elde ediyoruz.',
      ],
      en: [
        'Cakes that are plain outside but colourful inside create a big surprise at the cutting.',
        'They are especially loved at birthdays and gender-reveal parties.',
        'With natural food colourings we achieve vivid yet safe colours.',
      ],
    },
  },
  {
    slug: 'ozel-gun-pastasi-nasil-planlanir',
    category: 'guides',
    cover: img('photo-1557925923-cd4648e211a0'),
    date: '2025-05-20',
    readingMinutes: 5,
    author: 'Atelier Cake',
    title: { tr: 'Özel Gün Pastası Nasıl Planlanır?', en: 'How to Plan a Special-Day Cake' },
    excerpt: {
      tr: 'Mükemmel pastaya giden yolda zamanlama, bütçe ve tasarım için pratik bir kontrol listesi.',
      en: 'A practical checklist for timing, budget and design on the way to the perfect cake.',
    },
    body: {
      tr: [
        'En az 3-4 hafta önceden planlamaya başlayın; popüler tarihler hızlı dolar.',
        'Misafir sayınıza göre boyut ve bütçenizi belirleyin.',
        'İlham görsellerinizi toplayın ve renk paletinizi netleştirin.',
        'Tadım seansı için randevu alın ve lezzetlerinizi seçin.',
      ],
      en: [
        'Start planning at least 3-4 weeks ahead; popular dates fill quickly.',
        'Determine your size and budget based on your guest count.',
        'Gather your inspiration images and clarify your colour palette.',
        'Book a tasting session and choose your flavours.',
      ],
    },
  },
  {
    slug: 'vegan-pastalar-hakkinda',
    category: 'recipes',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2025-05-08',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Vegan Pastalar Hakkında Her Şey', en: 'Everything About Vegan Cakes' },
    excerpt: {
      tr: 'Hayvansal ürün içermeyen ama lezzetten ödün vermeyen vegan pasta dünyamız.',
      en: 'Our world of vegan cakes — free of animal products but never of flavour.',
    },
    body: {
      tr: [
        'Yumurta yerine elma püresi ve keten tohumu, süt yerine bitkisel sütler kullanıyoruz.',
        'Bitkisel tereyağı ve kaliteli çikolatayla zengin bir doku elde ediyoruz.',
        'Sonuç, vegan olsun olmasın herkesin seveceği bir lezzet.',
      ],
      en: [
        'We use apple purée and flaxseed instead of eggs, and plant milks instead of dairy.',
        'With plant butter and quality chocolate we achieve a rich texture.',
        'The result is a flavour everyone will love, vegan or not.',
      ],
    },
  },
  {
    slug: 'pasta-uzerine-yazi-yazma-sanati',
    category: 'behindscenes',
    cover: img('photo-1578985545062-69928b1d9587'),
    date: '2025-04-22',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Pasta Üzerine Yazı Yazma Sanatı', en: 'The Art of Writing on Cakes' },
    excerpt: {
      tr: 'Tek bir cümle, bir pastayı kişisel bir armağana dönüştürür. İşte o yazının ardındaki ustalık.',
      en: 'A single sentence turns a cake into a personal gift. Here is the craft behind that writing.',
    },
    body: {
      tr: [
        'Doğru kıvamda krema, akıcı ve net bir yazı için olmazsa olmazdır.',
        'El yazısı, klasik ve modern font seçenekleriyle mesajınıza karakter katıyoruz.',
        'Her harf, sabırla ve sabit bir elle tek seferde yazılır.',
      ],
      en: [
        'Cream of the right consistency is essential for fluid, clear writing.',
        'With script, classic and modern font options we add character to your message.',
        'Each letter is written in one go, with patience and a steady hand.',
      ],
    },
  },
  {
    slug: 'dogru-pasta-altligi-secimi',
    category: 'guides',
    cover: img('photo-1606313564200-e75d5e30476c'),
    date: '2025-04-08',
    readingMinutes: 3,
    author: 'Selin Yıldız',
    title: { tr: 'Doğru Pasta Altlığı Seçimi', en: 'Choosing the Right Cake Board' },
    excerpt: {
      tr: 'Görünmez kahraman: pasta altlığı. Doğru seçim, hem güvenlik hem estetik sağlar.',
      en: 'The invisible hero: the cake board. The right choice ensures both safety and aesthetics.',
    },
    body: {
      tr: [
        'Altlık, pastanın ağırlığını taşıyacak kadar sağlam olmalıdır; özellikle çok katlı tasarımlarda.',
        'Rengi, pastanın temasıyla uyumlu seçilerek bütünlük sağlanır.',
        'Tasarlayıcımızda altlık rengini canlı olarak deneyebilirsiniz.',
      ],
      en: [
        'The board must be sturdy enough to bear the cake’s weight, especially in multi-tier designs.',
        'Choosing its colour in harmony with the cake theme creates cohesion.',
        'You can try the board colour live in our configurator.',
      ],
    },
  },
  {
    slug: 'butik-pasta-neden-farkli',
    category: 'behindscenes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2025-03-25',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Butik Pasta Neden Farklıdır?', en: 'Why a Boutique Cake Is Different' },
    excerpt: {
      tr: 'Seri üretimle el yapımı bespoke bir pasta arasındaki farkı anlatıyoruz.',
      en: 'We explain the difference between mass production and a handmade bespoke cake.',
    },
    body: {
      tr: [
        'Butik pasta, sizin hikâyeniz için sıfırdan tasarlanır; hiçbir kopyası yoktur.',
        'Premium malzemeler ve el işçiliği, fark edilir bir kalite sunar.',
        'Bir butik pasta, sadece bir tatlı değil; unutulmaz bir deneyimdir.',
      ],
      en: [
        'A boutique cake is designed from scratch for your story; there is no copy of it.',
        'Premium ingredients and craftsmanship deliver a noticeable quality.',
        'A boutique cake is not just a dessert; it is an unforgettable experience.',
      ],
    },
  },
  {
    slug: 'sezonun-meyveleri-ve-pastalar',
    category: 'recipes',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2025-03-10',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Sezonun Meyveleri ve Pastalar', en: "The Season's Fruit and Cakes" },
    excerpt: {
      tr: 'İlkbahardan kışa, her mevsimin meyvesiyle hazırlanan özel pasta önerileri.',
      en: 'From spring to winter, special cake suggestions made with each season’s fruit.',
    },
    body: {
      tr: [
        'İlkbaharda çilek ve kayısı; yazın incir ve şeftali pastalarımızın yıldızı olur.',
        'Sonbaharda armut ve elma, sıcak baharatlarla buluşur.',
        'Kışta narenciye, ferahlatıcı bir alternatif sunar.',
      ],
      en: [
        'In spring strawberries and apricots; in summer figs and peaches star in our cakes.',
        'In autumn pears and apples meet warm spices.',
        'In winter citrus offers a refreshing alternative.',
      ],
    },
  },
  {
    slug: 'nisan-pastasi-fikirleri',
    category: 'trends',
    cover: img('photo-1586985289688-ca3cf47d3e6e'),
    date: '2025-02-20',
    readingMinutes: 3,
    author: 'Defne Aydın',
    title: { tr: 'Nişan Pastası Fikirleri', en: 'Engagement Cake Ideas' },
    excerpt: {
      tr: 'Düğüne giden yolun ilk tatlı adımı: zarif ve anlamlı nişan pastaları.',
      en: 'The first sweet step on the road to the wedding: elegant, meaningful engagement cakes.',
    },
    body: {
      tr: [
        'Nişan pastaları genellikle düğünden daha samimi ve oyuncu olabilir.',
        'Çiftin baş harfleri, tanışma tarihi gibi kişisel detaylar çok seviliyor.',
        'Pudra pembesi ve altın, bu özel an için zamansız bir kombinasyon.',
      ],
      en: [
        'Engagement cakes can often be more intimate and playful than wedding ones.',
        'Personal details like the couple’s initials or the date they met are much loved.',
        'Dusty rose and gold are a timeless combination for this special moment.',
      ],
    },
  },
  {
    slug: 'pasta-katmanlari-nasil-dengelenir',
    category: 'guides',
    cover: img('photo-1535141192574-5d4897c12636'),
    date: '2025-02-05',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Pasta Katmanları Nasıl Dengelenir?', en: 'How Cake Layers Are Balanced' },
    excerpt: {
      tr: 'Lezzet ve dokunun kusursuz dengesi: katman ve dolgu uyumunun sırrı.',
      en: 'The perfect balance of flavour and texture: the secret of layer and filling harmony.',
    },
    body: {
      tr: [
        'Yoğun bir pandispanya, hafif bir kremayla dengelenmelidir.',
        'Asitli meyve dolguları, tatlı katmanlara canlılık katar.',
        'Her lokmada dengeli bir tat almak için oranlar dikkatle ayarlanır.',
      ],
      en: [
        'A dense sponge should be balanced with a light cream.',
        'Acidic fruit fillings bring vibrancy to sweet layers.',
        'Proportions are carefully tuned so every bite tastes balanced.',
      ],
    },
  },
  {
    slug: 'minimalizm-pastacilikta',
    category: 'trends',
    cover: img('photo-1602351447937-745cb720612f'),
    date: '2025-01-22',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Pastacılıkta Minimalizm', en: 'Minimalism in Patisserie' },
    excerpt: {
      tr: '“Az çoktur” felsefesinin pasta tasarımındaki zarif yansımaları.',
      en: 'The elegant reflections of the “less is more” philosophy in cake design.',
    },
    body: {
      tr: [
        'Minimalist pastalar, sade formlar ve nötr tonlarla güçlü bir ifade yaratır.',
        'Tek bir altın detay veya zarif bir çiçek, tüm dikkati üzerine çeker.',
        'Sadelik, ustalığın en sofistike göstergesidir.',
      ],
      en: [
        'Minimalist cakes create a strong statement with clean forms and neutral tones.',
        'A single gold detail or an elegant flower draws all the attention.',
        'Simplicity is the most sophisticated mark of craftsmanship.',
      ],
    },
  },
  {
    slug: 'cikolata-cesitleri-rehberi',
    category: 'recipes',
    cover: img('photo-1511381939415-e44015466834'),
    date: '2025-01-08',
    readingMinutes: 5,
    author: 'Selin Yıldız',
    title: { tr: 'Çikolata Çeşitleri Rehberi', en: 'A Guide to Chocolate Types' },
    excerpt: {
      tr: 'Bitter, sütlü, beyaz ve daha fazlası: pastalarımızda kullandığımız çikolataların dünyası.',
      en: 'Dark, milk, white and more: the world of chocolates we use in our cakes.',
    },
    body: {
      tr: [
        'Bitter çikolata yoğun ve hafif acı; yetişkin damak tatları için ideal.',
        'Sütlü çikolata kremamsı ve tatlı; herkesin sevdiği klasik.',
        'Beyaz çikolata ise vanilya notalarıyla zarif tatlandırmalar sunar.',
        'Tek köken çikolatalar, yetiştiği bölgenin kendine has aromasını taşır.',
      ],
      en: [
        'Dark chocolate is intense and slightly bitter; ideal for adult palates.',
        'Milk chocolate is creamy and sweet; the classic everyone loves.',
        'White chocolate offers elegant sweetening with vanilla notes.',
        'Single-origin chocolates carry the distinctive aroma of their growing region.',
      ],
    },
  },
  {
    slug: 'pasta-siparis-ederken-dikkat',
    category: 'guides',
    cover: img('photo-1464195244916-405fa0a82545'),
    date: '2024-12-20',
    readingMinutes: 4,
    author: 'Atelier Cake',
    title: { tr: 'Pasta Sipariş Ederken Nelere Dikkat?', en: 'What to Consider When Ordering' },
    excerpt: {
      tr: 'İlk kez bespoke pasta sipariş edecekler için kısa ve net bir rehber.',
      en: 'A short, clear guide for those ordering a bespoke cake for the first time.',
    },
    body: {
      tr: [
        'Etkinlik tarihinizi ve misafir sayınızı net belirleyin.',
        'Alerji ve diyet ihtiyaçlarını sipariş notuna eklemeyi unutmayın.',
        'İlham görsellerinizi paylaşın; ne kadar çok detay, o kadar isabetli tasarım.',
        'Teslimat adresi ve saat aralığını önceden planlayın.',
      ],
      en: [
        'Clearly determine your event date and guest count.',
        'Remember to add allergy and dietary needs to your order notes.',
        'Share your inspiration images; the more detail, the more accurate the design.',
        'Plan your delivery address and time slot in advance.',
      ],
    },
  },
  {
    slug: 'pasta-suslemede-renk-uyumu',
    category: 'guides',
    cover: img('photo-1535254973040-607b474cb50d'),
    date: '2024-12-05',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Süslemede Renk Uyumu', en: 'Colour Harmony in Decoration' },
    excerpt: {
      tr: 'Birbirini tamamlayan renklerle pastanıza profesyonel bir görünüm kazandırın.',
      en: 'Give your cake a professional look with complementary colours.',
    },
    body: {
      tr: [
        'Komşu renkler huzurlu, zıt renkler ise dikkat çekici bir etki yaratır.',
        'Altın ve fildişi neredeyse her paleti zenginleştirir.',
        'Tek bir vurgu rengi, tasarımı dağıtmadan canlandırır.',
      ],
      en: [
        'Adjacent colours create a calm effect, while contrasting ones make a statement.',
        'Gold and ivory enrich almost any palette.',
        'A single accent colour enlivens the design without scattering it.',
      ],
    },
  },
  {
    slug: 'dogum-gunu-pastasi-klasikleri',
    category: 'trends',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2024-11-20',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Doğum Günü Pastası Klasikleri', en: 'Birthday Cake Classics' },
    excerpt: {
      tr: 'Hiç eskimeyen, her yaşa hitap eden doğum günü pastası fikirleri.',
      en: 'Never-dated birthday cake ideas for every age.',
    },
    body: {
      tr: [
        'Çikolatalı drip, klasik ama her zaman etkileyici bir seçim.',
        'Renkli sprinkle’lar neşeli bir kutlama havası katar.',
        'Kişiye özel topper, pastayı benzersiz kılar.',
      ],
      en: [
        'A chocolate drip is a classic yet always striking choice.',
        'Colourful sprinkles add a joyful celebratory mood.',
        'A personalised topper makes the cake unique.',
      ],
    },
  },
  {
    slug: 'kurumsal-hediye-pastalari',
    category: 'guides',
    cover: img('photo-1606890737304-57a1ca8a5b62'),
    date: '2024-11-05',
    readingMinutes: 3,
    author: 'Defne Aydın',
    title: { tr: 'Kurumsal Hediye Pastaları', en: 'Corporate Gift Cakes' },
    excerpt: {
      tr: 'Müşteri ve çalışanlarınıza unutulmaz bir teşekkür: kurumsal hediye pastaları.',
      en: 'An unforgettable thank-you for your clients and team: corporate gift cakes.',
    },
    body: {
      tr: [
        'Logolu mini pastalar, kurumsal hediyeler için pratik ve şık bir seçenek.',
        'Kurumsal renklerinizle hazırlanan tasarımlar marka bilinirliğini artırır.',
        'Toplu siparişlerde özel fiyatlandırma sunuyoruz.',
      ],
      en: [
        'Logo mini cakes are a practical, stylish option for corporate gifts.',
        'Designs in your corporate colours boost brand awareness.',
        'We offer special pricing for bulk orders.',
      ],
    },
  },
  {
    slug: 'pasta-katmani-icin-dolgu-secimi',
    category: 'recipes',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2024-10-20',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Katmanlar İçin Dolgu Seçimi', en: 'Choosing Fillings for Layers' },
    excerpt: {
      tr: 'Doğru dolgu, pastanın karakterini belirler. Popüler dolgu seçeneklerimiz.',
      en: 'The right filling defines a cake’s character. Our popular filling options.',
    },
    body: {
      tr: [
        'Meyve curd’ları ferah ve canlı bir denge sağlar.',
        'Pralin ve ganaj, yoğun ve lüks bir his verir.',
        'Hafif krema dolguları, sıcak havalarda ideal bir seçimdir.',
      ],
      en: [
        'Fruit curds provide a fresh, vibrant balance.',
        'Praline and ganache give an intense, luxurious feel.',
        'Light cream fillings are an ideal choice in warm weather.',
      ],
    },
  },
  {
    slug: 'pastacilikta-mevsimsel-ilham',
    category: 'behindscenes',
    cover: img('photo-1464349095431-e9a21285b5f3'),
    date: '2024-10-05',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Pastacılıkta Mevsimsel İlham', en: 'Seasonal Inspiration in Patisserie' },
    excerpt: {
      tr: 'Her mevsim, atölyemize yeni renkler, dokular ve fikirler getirir.',
      en: 'Each season brings new colours, textures and ideas to our atelier.',
    },
    body: {
      tr: [
        'İlkbahar pastel tonlar ve çiçeklerle gelir.',
        'Sonbahar sıcak baharatlar ve toprak renkleriyle ilham verir.',
        'Doğanın ritmini takip etmek, tasarımlarımızı taze tutar.',
      ],
      en: [
        'Spring arrives with pastel tones and flowers.',
        'Autumn inspires with warm spices and earthy colours.',
        'Following nature’s rhythm keeps our designs fresh.',
      ],
    },
  },
  {
    slug: 'mukemmel-krema-kivami',
    category: 'recipes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2024-09-20',
    readingMinutes: 4,
    author: 'Selin Yıldız',
    title: { tr: 'Mükemmel Krema Kıvamı', en: 'The Perfect Cream Consistency' },
    excerpt: {
      tr: 'Pürüzsüz bir kaplama ve net süslemeler için kremanın kıvamı kritiktir.',
      en: 'For a smooth finish and crisp decorations, cream consistency is critical.',
    },
    body: {
      tr: [
        'Çok yumuşak krema akar; çok sert krema ise pürüzlü görünür.',
        'Oda sıcaklığındaki tereyağı, ipeksi bir doku için şarttır.',
        'Doğru kıvam, hem estetik hem de dayanıklılık sağlar.',
      ],
      en: [
        'Cream that is too soft runs; too firm and it looks rough.',
        'Room-temperature butter is essential for a silky texture.',
        'The right consistency ensures both aesthetics and durability.',
      ],
    },
  },
  {
    slug: 'pasta-tasariminda-denge',
    category: 'guides',
    cover: img('photo-1602351447937-745cb720612f'),
    date: '2024-09-05',
    readingMinutes: 3,
    author: 'Defne Aydın',
    title: { tr: 'Pasta Tasarımında Denge', en: 'Balance in Cake Design' },
    excerpt: {
      tr: 'Görsel denge, bir pastayı sıradanlıktan çıkarıp sanata dönüştürür.',
      en: 'Visual balance turns a cake from ordinary into art.',
    },
    body: {
      tr: [
        'Boşluk, en az süsleme kadar önemlidir; göze nefes aldırır.',
        'Simetri huzur, asimetri ise dinamizm verir.',
        'Odak noktası belirlemek, tasarıma yön kazandırır.',
      ],
      en: [
        'Negative space matters as much as decoration; it lets the eye breathe.',
        'Symmetry gives calm, asymmetry gives dynamism.',
        'Setting a focal point gives the design direction.',
      ],
    },
  },
  {
    slug: 'ozel-gunlerde-pasta-gelenegi',
    category: 'behindscenes',
    cover: img('photo-1535141192574-5d4897c12636'),
    date: '2024-08-20',
    readingMinutes: 4,
    author: 'Atelier Cake',
    title: { tr: 'Özel Günlerde Pasta Geleneği', en: 'The Tradition of Cake on Special Days' },
    excerpt: {
      tr: 'Pastanın kutlamalardaki yeri ve bu zarif geleneğin köklerine bir yolculuk.',
      en: 'A journey into the place of cake in celebrations and the roots of this elegant tradition.',
    },
    body: {
      tr: [
        'Pasta kesmek, paylaşmanın ve bir araya gelmenin sembolüdür.',
        'Yüzyıllar boyunca her kültür bu geleneğe kendi dokunuşunu kattı.',
        'Bizim için her pasta, bu güzel geleneğin çağdaş bir yorumudur.',
      ],
      en: [
        'Cutting a cake is a symbol of sharing and coming together.',
        'Over centuries, every culture added its own touch to this tradition.',
        'For us, every cake is a contemporary interpretation of this beautiful tradition.',
      ],
    },
  },
  {
    slug: 'pasta-fotograflarini-paylasmak',
    category: 'guides',
    cover: img('photo-1606313564200-e75d5e30476c'),
    date: '2024-08-05',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Pasta Anılarını Paylaşmak', en: 'Sharing Your Cake Memories' },
    excerpt: {
      tr: 'Pastanızın fotoğraflarını bizimle ve dünyayla paylaşmanın güzel yolları.',
      en: 'Lovely ways to share photos of your cake with us and the world.',
    },
    body: {
      tr: [
        'Bizi etiketleyin; en sevdiğimiz anları sayfamızda paylaşmayı seviyoruz.',
        'Doğal ışıkta çekilen kareler her zaman en iyisidir.',
        'Hikâyenizi anlatın; her pasta bir anının parçasıdır.',
      ],
      en: [
        'Tag us; we love sharing our favourite moments on our page.',
        'Shots taken in natural light are always the best.',
        'Tell your story; every cake is part of a memory.',
      ],
    },
  },
  {
    slug: 'butik-pastacilik-felsefemiz',
    category: 'behindscenes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2024-07-20',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Butik Pastacılık Felsefemiz', en: 'Our Boutique Patisserie Philosophy' },
    excerpt: {
      tr: 'Atelier Cake’i yönlendiren değerler ve tutkunun arkasındaki hikâye.',
      en: 'The values that guide Atelier Cake and the story behind the passion.',
    },
    body: {
      tr: [
        'Bizim için pastacılık, sabır ve sevgiyle yapılan bir sanattır.',
        'Hiçbir detayı tesadüfe bırakmaz, her siparişe bir başyapıt gibi yaklaşırız.',
        'Amacımız sadece bir tatlı değil, unutulmaz bir an yaratmaktır.',
      ],
      en: [
        'For us, patisserie is an art made with patience and love.',
        'We leave no detail to chance and treat every order like a masterpiece.',
        'Our goal is to create not just a dessert, but an unforgettable moment.',
      ],
    },
  },
  {
    slug: 'pasta-ile-suprizler',
    category: 'trends',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2024-07-05',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Pasta ile Sürprizler', en: 'Surprises with Cake' },
    excerpt: {
      tr: 'Sevdiklerinizi şaşırtmak için pastayı bir sürpriz aracına dönüştürün.',
      en: 'Turn a cake into a vehicle for surprise to amaze your loved ones.',
    },
    body: {
      tr: [
        'Gizli mesajlı katmanlar veya sürpriz renkler büyük etki yaratır.',
        'İçine yerleştirilen küçük armağanlar unutulmaz anlar sunar.',
        'Hayal gücünüzü bizimle paylaşın; gerçeğe dönüştürelim.',
      ],
      en: [
        'Layers with hidden messages or surprise colours create a big impact.',
        'Small gifts placed inside offer unforgettable moments.',
        'Share your imagination with us; let’s make it real.',
      ],
    },
  },
  {
    slug: 'sonbahar-dugun-pastalari',
    category: 'trends',
    cover: img('photo-1542826438-bd32f43d626f'),
    date: '2024-06-20',
    readingMinutes: 3,
    author: 'Defne Aydın',
    title: { tr: 'Sonbahar Düğün Pastaları', en: 'Autumn Wedding Cakes' },
    excerpt: {
      tr: 'Sıcak tonlar ve mevsim meyveleriyle sonbahar düğünlerine özel tasarımlar.',
      en: 'Designs for autumn weddings with warm tones and seasonal fruit.',
    },
    body: {
      tr: [
        'Bordo, hardal ve bakır tonları sonbaharın ruhunu yansıtır.',
        'İncir, armut ve tarçın gibi lezzetler mevsime mükemmel uyar.',
        'Kuru yapraklar ve dallarla doğal bir estetik yaratıyoruz.',
      ],
      en: [
        'Burgundy, mustard and copper tones reflect the spirit of autumn.',
        'Flavours like fig, pear and cinnamon suit the season perfectly.',
        'We create a natural aesthetic with dried leaves and branches.',
      ],
    },
  },
  {
    slug: 'dogru-mum-secimi',
    category: 'guides',
    cover: img('photo-1578985545062-69928b1d9587'),
    date: '2024-06-12',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Doğru Mum Seçimi', en: 'Choosing the Right Candles' },
    excerpt: { tr: 'Pastanızın tepesindeki son dokunuş: mumlar.', en: 'The final touch on top of your cake: candles.' },
    body: {
      tr: ['İnce uzun mumlar zarif bir hava verir.', 'Maytap mumları kutlamaya gösteri katar.', 'Rakam mumları yaş kutlamaları için idealdir.'],
      en: ['Tall, thin candles give an elegant feel.', 'Sparkler candles add spectacle to the celebration.', 'Number candles are ideal for age celebrations.'],
    },
  },
  {
    slug: 'pasta-ve-mevsim-uyumu',
    category: 'trends',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2024-05-28',
    readingMinutes: 3,
    author: 'Selin Yıldız',
    title: { tr: 'Pasta ve Mevsim Uyumu', en: 'Matching Cakes to the Season' },
    excerpt: { tr: 'Her mevsimin kendine has lezzet ve renkleri vardır.', en: 'Each season has its own flavours and colours.' },
    body: {
      tr: ['Yazın hafif, meyveli ve ferah lezzetler öne çıkar.', 'Kışın yoğun çikolata ve baharatlar tercih edilir.', 'İlkbahar çiçeksi, sonbahar topraksı tonlarla anılır.'],
      en: ['Summer favours light, fruity and refreshing flavours.', 'Winter calls for rich chocolate and spices.', 'Spring is floral, autumn earthy in tone.'],
    },
  },
  {
    slug: 'ilk-siparis-rehberi',
    category: 'guides',
    cover: img('photo-1464195244916-405fa0a82545'),
    date: '2024-05-14',
    readingMinutes: 4,
    author: 'Atelier Cake',
    title: { tr: 'İlk Kez Sipariş Verenler İçin', en: 'For First-Time Customers' },
    excerpt: { tr: 'Atölyemizden ilk siparişinizi vermeden bilmeniz gerekenler.', en: 'What to know before your first order with us.' },
    body: {
      tr: ['3D tasarlayıcıyla başlayın; fikrinizi netleştirin.', 'Soru sormaktan çekinmeyin, ekibimiz yardıma hazır.', 'Erken sipariş, daha fazla seçenek demektir.'],
      en: ['Start with the 3D configurator to clarify your idea.', 'Don’t hesitate to ask; our team is ready to help.', 'Ordering early means more options.'],
    },
  },
  {
    slug: 'pasta-dekorasyon-trendleri-yeni',
    category: 'trends',
    cover: img('photo-1535254973040-607b474cb50d'),
    date: '2024-04-30',
    readingMinutes: 3,
    author: 'Mert Korkmaz',
    title: { tr: 'Bu Yılın Dekorasyon Trendleri', en: 'This Year’s Decoration Trends' },
    excerpt: { tr: 'Pastacılıkta öne çıkan görsel akımlar.', en: 'The leading visual movements in patisserie.' },
    body: {
      tr: ['Minimalist altın detaylar her yerde.', 'Taze çiçekler şeker çiçeklerinin yerini alıyor.', 'Dokulu, organik yüzeyler popülerleşiyor.'],
      en: ['Minimalist gold details are everywhere.', 'Fresh flowers are replacing sugar flowers.', 'Textured, organic surfaces are gaining popularity.'],
    },
  },
  {
    slug: 'cikolatanin-tarihi',
    category: 'behindscenes',
    cover: img('photo-1511381939415-e44015466834'),
    date: '2024-04-16',
    readingMinutes: 5,
    author: 'Selin Yıldız',
    title: { tr: 'Çikolatanın Kısa Tarihi', en: 'A Short History of Chocolate' },
    excerpt: { tr: 'Tanrıların içeceğinden modern pastacılığa.', en: 'From the drink of the gods to modern patisserie.' },
    body: {
      tr: ['Çikolata, Mezoamerika’da kutsal bir içecek olarak başladı.', 'Avrupa’ya ulaştığında lüks bir tutkuya dönüştü.', 'Bugün pastacılığın vazgeçilmez kalbidir.'],
      en: ['Chocolate began as a sacred drink in Mesoamerica.', 'When it reached Europe it became a luxurious passion.', 'Today it is the indispensable heart of patisserie.'],
    },
  },
  {
    slug: 'pasta-ile-anlam-katmak',
    category: 'guides',
    cover: img('photo-1557925923-cd4648e211a0'),
    date: '2024-04-02',
    readingMinutes: 3,
    author: 'Defne Aydın',
    title: { tr: 'Pastayla Anlam Katmak', en: 'Adding Meaning with Cake' },
    excerpt: { tr: 'Bir pasta, kelimelerin söyleyemediğini söyler.', en: 'A cake can say what words cannot.' },
    body: {
      tr: ['Kişisel detaylar pastayı bir armağana dönüştürür.', 'Bir anıyı, bir hobiyi ya da bir hayali şekere işliyoruz.', 'En güzel pastalar, hikâyesi olanlardır.'],
      en: ['Personal details turn a cake into a gift.', 'We sculpt a memory, a hobby or a dream into sugar.', 'The most beautiful cakes are the ones with a story.'],
    },
  },
  {
    slug: 'atolye-ekipmanlari',
    category: 'behindscenes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2024-03-18',
    readingMinutes: 4,
    author: 'Mert Korkmaz',
    title: { tr: 'Atölyemizin Ekipmanları', en: 'The Tools of Our Atelier' },
    excerpt: { tr: 'Kusursuz bir pastanın arkasındaki profesyonel araçlar.', en: 'The professional tools behind a flawless cake.' },
    body: {
      tr: ['Döner tabla, pürüzsüz kaplamanın sırrıdır.', 'Açılı spatula ile keskin kenarlar elde ederiz.', 'Hassas teraziler tutarlılığı garanti eder.'],
      en: ['The turntable is the secret to a smooth finish.', 'With an offset spatula we achieve sharp edges.', 'Precise scales guarantee consistency.'],
    },
  },
  {
    slug: 'saklamada-sik-hatalar',
    category: 'guides',
    cover: img('photo-1464349095431-e9a21285b5f3'),
    date: '2024-03-04',
    readingMinutes: 3,
    author: 'Selin Yıldız',
    title: { tr: 'Pasta Saklamada Sık Hatalar', en: 'Common Cake Storage Mistakes' },
    excerpt: { tr: 'Pastanızın tazeliğini kaçıran yaygın yanlışlar.', en: 'Common mistakes that ruin your cake’s freshness.' },
    body: {
      tr: ['Pastayı açıkta bırakmak kurumaya yol açar.', 'Çok soğuk saklamak dokuyu sertleştirir.', 'Kokulu yiyeceklerin yanında saklamayın.'],
      en: ['Leaving the cake uncovered causes it to dry out.', 'Storing it too cold hardens the texture.', 'Do not store it next to strong-smelling foods.'],
    },
  },
  {
    slug: 'kurumsal-marka-pastalari',
    category: 'guides',
    cover: img('photo-1562440499-64c9a111f713'),
    date: '2024-02-18',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Marka Kimliğini Pastaya Taşımak', en: 'Bringing Brand Identity to a Cake' },
    excerpt: {
      tr: 'Kurumsal renkler, logo ve değerleri zarif bir pasta tasarımına nasıl yansıtırız?',
      en: 'How we reflect corporate colours, logos and values in an elegant cake design.',
    },
    body: {
      tr: [
        'Marka renklerinizi kaplama ve detaylarda incelikle kullanıyoruz.',
        'Logonuzu yenilebilir baskı veya elle şekerden uyguluyoruz.',
        'Markanızın karakterine uygun bir form ve doku seçiyoruz.',
        'Sonuç: hem lezzetli hem de markanızı temsil eden bir eser.',
      ],
      en: [
        'We use your brand colours subtly in the finish and details.',
        'We apply your logo via edible print or handcrafted sugar.',
        'We choose a form and texture that suits your brand’s character.',
        'The result: a piece that is both delicious and on-brand.',
      ],
    },
  },
  {
    slug: 'dogum-gunu-suprizi-planlamak',
    category: 'guides',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2024-02-04',
    readingMinutes: 3,
    author: 'Atelier Cake',
    title: { tr: 'Unutulmaz Bir Doğum Günü Sürprizi', en: 'An Unforgettable Birthday Surprise' },
    excerpt: {
      tr: 'Sevdikleriniz için sürpriz bir kutlama planlarken pastayı merkeze alın.',
      en: 'Put the cake at the centre when planning a surprise celebration.',
    },
    body: {
      tr: [
        'Kişinin sevdiği renkleri ve temaları öğrenin.',
        'Gizli mesajlı veya sürpriz renkli bir kat ekletin.',
        'Teslimat saatini kutlama anına göre planlayın.',
        'Detaylar sürprizi unutulmaz kılar.',
      ],
      en: [
        'Find out the person’s favourite colours and themes.',
        'Add a layer with a hidden message or surprise colour.',
        'Plan the delivery time around the celebration moment.',
        'Details make the surprise unforgettable.',
      ],
    },
  },
  {
    slug: 'tatli-masasi-nasil-kurulur',
    category: 'guides',
    cover: img('photo-1535920527002-b35e96722eb9'),
    date: '2024-01-21',
    readingMinutes: 4,
    author: 'Mert Korkmaz',
    title: { tr: 'Etkileyici Bir Tatlı Masası Nasıl Kurulur?', en: 'How to Style an Impressive Dessert Table' },
    excerpt: {
      tr: 'Pasta, cupcake ve lokmalıkları bir araya getiren göz alıcı bir sunum.',
      en: 'A striking presentation combining cakes, cupcakes and bites.',
    },
    body: {
      tr: [
        'Farklı yükseklikte standlar kullanarak derinlik yaratın.',
        'Renk paletini etkinlik temasıyla uyumlu tutun.',
        'Ana pastayı merkeze, küçük lezzetleri etrafına yerleştirin.',
        'Çiçek ve mum gibi dokunuşlarla masayı tamamlayın.',
      ],
      en: [
        'Create depth by using stands of different heights.',
        'Keep the palette in harmony with the event theme.',
        'Place the main cake in the centre, small treats around it.',
        'Complete the table with touches like flowers and candles.',
      ],
    },
  },
  {
    slug: 'pastacilikta-tutku',
    category: 'behindscenes',
    cover: img('photo-1486427944299-d1955d23e34d'),
    date: '2024-01-07',
    readingMinutes: 4,
    author: 'Defne Aydın',
    title: { tr: 'Pastacılıkta Tutkunun Önemi', en: 'The Importance of Passion in Patisserie' },
    excerpt: {
      tr: 'Teknik öğrenilebilir; ama farkı yaratan tutkudur.',
      en: 'Technique can be learned; but passion makes the difference.',
    },
    body: {
      tr: [
        'Her pastaya sevgi katmak, sonucu görünür biçimde değiştirir.',
        'Tutku, detaylara gösterilen özende kendini belli eder.',
        'Müşterimizin gülümsemesi, bu tutkunun en büyük ödülüdür.',
        'Bizim için pastacılık bir meslek değil, bir yaşam biçimidir.',
      ],
      en: [
        'Adding love to every cake visibly changes the result.',
        'Passion reveals itself in the care given to details.',
        'Our client’s smile is the greatest reward for this passion.',
        'For us, patisserie is not a job but a way of life.',
      ],
    },
  },
  {
    slug: 'mevsimlik-menu-degisimi',
    category: 'trends',
    cover: img('photo-1488477181946-6428a0291777'),
    date: '2023-12-20',
    readingMinutes: 3,
    author: 'Selin Yıldız',
    title: { tr: 'Menümüzü Neden Mevsime Göre Değiştiriyoruz?', en: 'Why We Change Our Menu by Season' },
    excerpt: {
      tr: 'Mevsimsel menü, her zaman en taze ve en lezzetli sonucu garanti eder.',
      en: 'A seasonal menu guarantees the freshest, most flavourful result.',
    },
    body: {
      tr: [
        'Mevsiminde olan malzeme hem daha lezzetli hem daha sürdürülebilirdir.',
        'Her sezon yeni lezzet kombinasyonları keşfediyoruz.',
        'Bu yaklaşım menümüzü her zaman taze ve heyecan verici tutar.',
        'Sezonun en iyisini sofranıza taşımayı seviyoruz.',
      ],
      en: [
        'In-season ingredients are both tastier and more sustainable.',
        'Each season we discover new flavour combinations.',
        'This approach keeps our menu fresh and exciting.',
        'We love bringing the season’s best to your table.',
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
