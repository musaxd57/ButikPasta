// Legal page content, bilingual. Each document is a list of sections.

export interface LegalSection {
  heading: { tr: string; en: string };
  paragraphs: { tr: string; en: string }[];
}

export interface LegalDoc {
  updated: string;
  sections: LegalSection[];
}

const p = (tr: string, en: string) => ({ tr, en });

export const PRIVACY: LegalDoc = {
  updated: '2026-05-01',
  sections: [
    {
      heading: p('Topladığımız Veriler', 'Data We Collect'),
      paragraphs: [
        p(
          'Sipariş ve iletişim formlarında paylaştığınız ad, e-posta, telefon ve teslimat adresi gibi bilgileri yalnızca hizmetimizi sunmak amacıyla topluyoruz.',
          'We collect information such as your name, email, phone and delivery address, shared through order and contact forms, solely to provide our service.',
        ),
        p(
          'Ödeme bilgileriniz doğrudan güvenli ödeme sağlayıcımız (Stripe) tarafından işlenir; kart bilgilerinizi sunucularımızda saklamayız.',
          'Your payment details are processed directly by our secure payment provider (Stripe); we do not store card data on our servers.',
        ),
      ],
    },
    {
      heading: p('Verilerin Kullanımı', 'Use of Data'),
      paragraphs: [
        p(
          'Verileriniz; siparişinizi hazırlamak, teslim etmek, sizinle iletişim kurmak ve onayınızla bülten göndermek için kullanılır.',
          'Your data is used to prepare and deliver your order, communicate with you, and — with your consent — send newsletters.',
        ),
        p(
          'Verilerinizi üçüncü taraflarla pazarlama amacıyla asla paylaşmayız.',
          'We never share your data with third parties for marketing purposes.',
        ),
      ],
    },
    {
      heading: p('Haklarınız', 'Your Rights'),
      paragraphs: [
        p(
          'Verilerinize erişme, düzeltme ve silinmesini talep etme hakkına sahipsiniz. Talepleriniz için bizimle iletişime geçebilirsiniz.',
          'You have the right to access, correct and request deletion of your data. Contact us for any such requests.',
        ),
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  updated: '2026-05-01',
  sections: [
    {
      heading: p('Sipariş ve Sözleşme', 'Orders & Agreement'),
      paragraphs: [
        p(
          'Bir sipariş verdiğinizde, bu şartları kabul etmiş sayılırsınız. Sipariş, tarafımızca onaylandığında kesinleşir.',
          'By placing an order you accept these terms. An order is confirmed once we approve it.',
        ),
        p(
          'Özel tasarım pastalar en az 5 gün önceden sipariş edilmelidir.',
          'Bespoke cakes must be ordered at least 5 days in advance.',
        ),
      ],
    },
    {
      heading: p('Fiyatlandırma', 'Pricing'),
      paragraphs: [
        p(
          'Tüm fiyatlar Türk Lirası cinsinden ve KDV dahildir. Nihai fiyat, tasarım detaylarına göre belirlenir.',
          'All prices are in Turkish Lira and include VAT. The final price depends on design details.',
        ),
      ],
    },
    {
      heading: p('Sorumluluk', 'Liability'),
      paragraphs: [
        p(
          'Teslimat sonrası uygunsuz saklama koşullarından kaynaklanan durumlardan sorumlu değiliz. Saklama önerilerimize uymanızı rica ederiz.',
          'We are not liable for issues arising from improper storage after delivery. Please follow our storage recommendations.',
        ),
      ],
    },
  ],
};

export const KVKK: LegalDoc = {
  updated: '2026-05-01',
  sections: [
    {
      heading: p('Veri Sorumlusu', 'Data Controller'),
      paragraphs: [
        p(
          '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verileriniz veri sorumlusu olarak Atelier Cake tarafından işlenmektedir.',
          'Under Turkish Personal Data Protection Law No. 6698 ("KVKK"), your personal data is processed by Atelier Cake as the data controller.',
        ),
      ],
    },
    {
      heading: p('İşleme Amaçları', 'Processing Purposes'),
      paragraphs: [
        p(
          'Kişisel verileriniz; sipariş süreçlerinin yürütülmesi, teslimat, müşteri ilişkileri ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.',
          'Your personal data is processed to carry out order processes, delivery, customer relations and to fulfil legal obligations.',
        ),
      ],
    },
    {
      heading: p('İlgili Kişi Hakları', 'Rights of the Data Subject'),
      paragraphs: [
        p(
          'KVKK madde 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz.',
          'Under Article 11 of the KVKK, you have the right to learn whether your data is processed and to request its correction or deletion.',
        ),
      ],
    },
  ],
};

export const DELIVERY: LegalDoc = {
  updated: '2026-05-01',
  sections: [
    {
      heading: p('Teslimat Süreci', 'Delivery Process'),
      paragraphs: [
        p(
          'Tüm teslimatlar İstanbul içinde, soğutmalı araçlarla ve özel sabitleme kutularıyla gerçekleştirilir.',
          'All deliveries are made within Istanbul using refrigerated vehicles and custom securing boxes.',
        ),
        p(
          'Teslimat saat aralığını sipariş sırasında seçebilirsiniz. Dilerseniz atölyemizden randevulu teslim alabilirsiniz.',
          'You can choose a delivery time slot during ordering. Alternatively, you may collect from our atelier by appointment.',
        ),
      ],
    },
    {
      heading: p('İptal ve İade', 'Cancellation & Returns'),
      paragraphs: [
        p(
          'Teslimattan 7 gün öncesine kadar yapılan iptallerde kapora iade edilir. Üretim başladıktan sonra, ürünün kişiye özel niteliği gereği iade yapılamaz.',
          'The deposit is refundable for cancellations made up to 7 days before delivery. Once production begins, the bespoke nature of the product means it cannot be returned.',
        ),
      ],
    },
  ],
};

export const LEGAL_DOCS = { PRIVACY, TERMS, KVKK, DELIVERY };
