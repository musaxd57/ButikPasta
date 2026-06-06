// Frequently asked questions, grouped by category, bilingual.

export interface FaqEntry {
  q: { tr: string; en: string };
  a: { tr: string; en: string };
}

export interface FaqGroup {
  key: string;
  title: { tr: string; en: string };
  entries: FaqEntry[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    key: 'ordering',
    title: { tr: 'Sipariş', en: 'Ordering' },
    entries: [
      {
        q: {
          tr: 'Ne kadar önceden sipariş vermeliyim?',
          en: 'How far in advance should I order?',
        },
        a: {
          tr: 'Özel tasarım pastalar için en az 5 gün önceden sipariş alıyoruz. Düğün ve büyük etkinlikler için 3-4 hafta önceden planlama öneririz.',
          en: 'We require at least 5 days notice for bespoke cakes. For weddings and large events we recommend planning 3-4 weeks ahead.',
        },
      },
      {
        q: {
          tr: 'Minimum sipariş tutarı var mı?',
          en: 'Is there a minimum order amount?',
        },
        a: {
          tr: 'Bespoke tasarımlarımız temel fiyattan başlar. 3D tasarlayıcımızda canlı fiyatı anında görebilirsiniz.',
          en: 'Our bespoke designs start from a base price. You can see the live price instantly in our 3D configurator.',
        },
      },
      {
        q: {
          tr: 'Siparişimi nasıl değiştirebilirim?',
          en: 'How can I change my order?',
        },
        a: {
          tr: 'Teslimat tarihinden 72 saat öncesine kadar değişiklik yapılabilir. WhatsApp veya e-posta ile bize ulaşmanız yeterli.',
          en: 'Changes can be made up to 72 hours before the delivery date. Simply reach us via WhatsApp or email.',
        },
      },
    ],
  },
  {
    key: 'delivery',
    title: { tr: 'Teslimat', en: 'Delivery' },
    entries: [
      {
        q: {
          tr: 'Hangi bölgelere teslimat yapıyorsunuz?',
          en: 'Which areas do you deliver to?',
        },
        a: {
          tr: 'İstanbul Avrupa ve Anadolu yakasının tamamına teslimat yapıyoruz. Bazı uzak ilçeler için ek ücret uygulanabilir.',
          en: 'We deliver across both the European and Anatolian sides of Istanbul. A surcharge may apply for some outlying districts.',
        },
      },
      {
        q: {
          tr: 'Pasta teslimatta zarar görür mü?',
          en: 'Could the cake be damaged during delivery?',
        },
        a: {
          tr: 'Soğutmalı araçlar ve özel sabitleme kutuları kullanıyoruz. Pastalarınız kusursuz şekilde, fotoğrafıyla birebir ulaşır.',
          en: 'We use refrigerated vehicles and custom securing boxes. Your cake arrives flawless, exactly as photographed.',
        },
      },
      {
        q: {
          tr: 'Kendim teslim alabilir miyim?',
          en: 'Can I pick it up myself?',
        },
        a: {
          tr: 'Elbette. Nişantaşı\'ndaki atölyemizden randevulu olarak teslim alabilirsiniz.',
          en: 'Of course. You can collect from our Nişantaşı atelier by appointment.',
        },
      },
    ],
  },
  {
    key: 'dietary',
    title: { tr: 'Diyet & Alerjenler', en: 'Dietary & Allergens' },
    entries: [
      {
        q: {
          tr: 'Glutensiz veya vegan seçenekleriniz var mı?',
          en: 'Do you offer gluten-free or vegan options?',
        },
        a: {
          tr: 'Evet. Glutensiz, vegan ve şekersiz alternatifler sunuyoruz. Sipariş notunuza belirtmeniz yeterli.',
          en: 'Yes. We offer gluten-free, vegan and sugar-free alternatives. Just note it in your order.',
        },
      },
      {
        q: {
          tr: 'Alerjen bilgilerini öğrenebilir miyim?',
          en: 'Can I get allergen information?',
        },
        a: {
          tr: 'Tüm ürünlerimizin içeriğini şeffaf biçimde paylaşıyoruz. Fındık, süt, yumurta ve gluten içeren ürünler ayrıca belirtilir.',
          en: 'We share the contents of all our products transparently. Items containing nuts, dairy, egg and gluten are clearly indicated.',
        },
      },
    ],
  },
  {
    key: 'customization',
    title: { tr: 'Tasarım & Özelleştirme', en: 'Design & Customisation' },
    entries: [
      {
        q: {
          tr: '3D tasarlayıcı tam olarak nasıl çalışıyor?',
          en: 'How exactly does the 3D configurator work?',
        },
        a: {
          tr: 'Adım adım kat, boyut, lezzet, kaplama ve süslemeleri seçersiniz; pasta 3D olarak canlı güncellenir ve fiyatı anında görürsünüz.',
          en: 'You select tiers, size, flavour, frosting and decorations step by step; the cake updates live in 3D and you see the price instantly.',
        },
      },
      {
        q: {
          tr: 'Kendi referans görselimi paylaşabilir miyim?',
          en: 'Can I share my own reference image?',
        },
        a: {
          tr: 'Elbette. İletişim formundan veya WhatsApp üzerinden ilham görsellerinizi gönderebilirsiniz; tasarımı birlikte şekillendiririz.',
          en: 'Of course. Send your inspiration images via the contact form or WhatsApp, and we’ll shape the design together.',
        },
      },
      {
        q: {
          tr: 'Logolu kurumsal pasta yapıyor musunuz?',
          en: 'Do you make corporate cakes with a logo?',
        },
        a: {
          tr: 'Evet, yenilebilir baskı teknolojisiyle logonuzu kusursuz netlikte uyguluyoruz.',
          en: 'Yes, we apply your logo with flawless clarity using edible printing technology.',
        },
      },
    ],
  },
  {
    key: 'payment',
    title: { tr: 'Ödeme', en: 'Payment' },
    entries: [
      {
        q: {
          tr: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
          en: 'Which payment methods do you accept?',
        },
        a: {
          tr: 'Kredi/banka kartı ile güvenli online ödeme (Stripe) ve havale kabul ediyoruz. %50 kapora ile siparişinizi kesinleştirebilirsiniz.',
          en: 'We accept secure online card payment (Stripe) and bank transfer. You can confirm your order with a 50% deposit.',
        },
      },
      {
        q: {
          tr: 'Kapora iadesi mümkün mü?',
          en: 'Is the deposit refundable?',
        },
        a: {
          tr: 'Teslimattan 7 gün öncesine kadar yapılan iptallerde kapora iade edilir. Sonrasında üretime başlandığı için iade yapılamaz.',
          en: 'The deposit is refundable for cancellations made up to 7 days before delivery. After that, production has begun and it is non-refundable.',
        },
      },
    ],
  },
  {
    key: 'storage',
    title: { tr: 'Saklama & Tazelik', en: 'Storage & Freshness' },
    entries: [
      {
        q: {
          tr: 'Pastayı ne kadar süre saklayabilirim?',
          en: 'How long can I keep the cake?',
        },
        a: {
          tr: 'Tereyağlı krema pastalar 2-3 gün, taze meyveli pastalar ise aynı gün tüketilmelidir. Detaylar için bakım rehberimize bakın.',
          en: 'Buttercream cakes keep for 2-3 days, while fresh-fruit cakes should be eaten the same day. See our care guide for details.',
        },
      },
      {
        q: {
          tr: 'Pastayı dondurabilir miyim?',
          en: 'Can I freeze the cake?',
        },
        a: {
          tr: 'Sade pandispanya katları dondurulabilir; ancak kremalı ve süslemeli pastaları dondurmanızı önermiyoruz.',
          en: 'Plain sponge layers can be frozen; however we do not recommend freezing creamed and decorated cakes.',
        },
      },
    ],
  },
  {
    key: 'gifts',
    title: { tr: 'Hediye Kartları', en: 'Gift Cards' },
    entries: [
      {
        q: { tr: 'Hediye kartı nasıl çalışır?', en: 'How do gift cards work?' },
        a: {
          tr: 'Hediye kartını dijital olarak alır, sevdiğiniz kişiye e-posta ile iletiriz. Alıcı dilediği pastayı seçebilir.',
          en: 'You purchase the gift card digitally and we deliver it by email to your loved one, who can choose any cake.',
        },
      },
      {
        q: { tr: 'Hediye kartının geçerlilik süresi nedir?', en: 'How long is a gift card valid?' },
        a: {
          tr: 'Hediye kartları satın alma tarihinden itibaren 12 ay geçerlidir.',
          en: 'Gift cards are valid for 12 months from the purchase date.',
        },
      },
    ],
  },
  {
    key: 'sustainabilityFaq',
    title: { tr: 'Sürdürülebilirlik', en: 'Sustainability' },
    entries: [
      {
        q: { tr: 'Ambalajlarınız geri dönüştürülebilir mi?', en: 'Is your packaging recyclable?' },
        a: {
          tr: 'Evet, pasta kutularımız geri dönüştürülebilir ve plastiksiz malzemelerden üretilir.',
          en: 'Yes, our cake boxes are made from recyclable, plastic-free materials.',
        },
      },
      {
        q: { tr: 'Malzemeleri nereden tedarik ediyorsunuz?', en: 'Where do you source ingredients?' },
        a: {
          tr: 'Mümkün olduğunca yerel üreticilerden, mevsiminde tedarik ediyoruz.',
          en: 'We source from local producers, in season, wherever possible.',
        },
      },
    ],
  },
  {
    key: 'weddingsFaq',
    title: { tr: 'Düğün Pastaları', en: 'Wedding Cakes' },
    entries: [
      {
        q: {
          tr: 'Tadım seansı sunuyor musunuz?',
          en: 'Do you offer a tasting session?',
        },
        a: {
          tr: 'Evet, Couture paketlerimizde tadım ücretsizdir. Randevu sayfamızdan kolayca yer ayırtabilirsiniz.',
          en: 'Yes, tastings are complimentary with our Couture packages. You can easily book via our appointment page.',
        },
      },
      {
        q: {
          tr: 'Etkinlik günü kurulum yapıyor musunuz?',
          en: 'Do you set up on the event day?',
        },
        a: {
          tr: 'Çok katlı düğün pastaları için etkinlik günü profesyonel kurulum hizmeti sunuyoruz.',
          en: 'For multi-tier wedding cakes we offer professional setup service on the event day.',
        },
      },
    ],
  },
];

FAQ_GROUPS.push(
  {
    key: 'cupcakesFaq',
    title: { tr: 'Cupcake & Lokma', en: 'Cupcakes & Bites' },
    entries: [
      {
        q: { tr: 'Minimum kutu adedi var mı?', en: 'Is there a minimum number of boxes?' },
        a: {
          tr: 'Cupcake ve lokmalıklarda minimum 2 kutu sipariş alıyoruz; etkinlikler için ise miktar sınırı yoktur.',
          en: 'We take a minimum of 2 boxes for cupcakes and bites; there is no upper limit for events.',
        },
      },
      {
        q: { tr: 'Tatlı masası kurulumu yapıyor musunuz?', en: 'Do you set up dessert tables?' },
        a: {
          tr: 'Evet, büyük etkinlikler için tatlı masası tasarımı ve kurulumu sunuyoruz.',
          en: 'Yes, we offer dessert-table design and setup for large events.',
        },
      },
    ],
  },
  {
    key: 'tasting',
    title: { tr: 'Tadım', en: 'Tasting' },
    entries: [
      {
        q: { tr: 'Tadım randevusu nasıl alınır?', en: 'How do I book a tasting?' },
        a: {
          tr: 'Tadım Randevusu sayfamızdan tarih ve kişi sayısı seçerek kolayca talep oluşturabilirsiniz.',
          en: 'You can easily request one on our Tasting page by choosing a date and number of guests.',
        },
      },
      {
        q: { tr: 'Tadım ücretli mi?', en: 'Is the tasting paid?' },
        a: {
          tr: 'Couture paketlerinde tadım ücretsizdir; diğer durumlarda sembolik bir ücret alınır ve siparişe mahsup edilir.',
          en: 'Tastings are complimentary with Couture packages; otherwise a small fee applies and is deducted from your order.',
        },
      },
    ],
  },
  {
    key: 'general',
    title: { tr: 'Genel', en: 'General' },
    entries: [
      {
        q: { tr: 'Mağazanız var mı?', en: 'Do you have a store?' },
        a: {
          tr: 'Nişantaşı’ndaki atölyemizden randevulu ziyaret ve teslim alma mümkündür.',
          en: 'Visits and pickups are possible by appointment at our Nişantaşı atelier.',
        },
      },
      {
        q: { tr: 'Sosyal medyada var mısınız?', en: 'Are you on social media?' },
        a: {
          tr: 'Evet, Instagram’da @ateliercake hesabımızdan son çalışmalarımızı paylaşıyoruz.',
          en: 'Yes, we share our latest work on Instagram at @ateliercake.',
        },
      },
    ],
  },
);

export function allFaqs(): FaqEntry[] {
  return FAQ_GROUPS.flatMap((g) => g.entries);
}
