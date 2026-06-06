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
];

export function allFaqs(): FaqEntry[] {
  return FAQ_GROUPS.flatMap((g) => g.entries);
}
