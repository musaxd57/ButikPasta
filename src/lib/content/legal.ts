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
    {
      heading: p('Çerezler', 'Cookies'),
      paragraphs: [
        p(
          'Web sitemiz, deneyiminizi iyileştirmek için zorunlu ve isteğe bağlı çerezler kullanır. Çerez tercihlerinizi tarayıcınızdan yönetebilirsiniz.',
          'Our website uses essential and optional cookies to improve your experience. You can manage your cookie preferences from your browser.',
        ),
        p(
          'Pazarlama çerezleri yalnızca açık onayınızla etkinleştirilir.',
          'Marketing cookies are only enabled with your explicit consent.',
        ),
      ],
    },
    {
      heading: p('Veri Saklama Süresi', 'Data Retention'),
      paragraphs: [
        p(
          'Sipariş verilerinizi yasal yükümlülükler gereği gerekli süre boyunca, pazarlama verilerinizi ise onayınızı geri çekene kadar saklarız.',
          'We retain your order data for as long as legal obligations require, and your marketing data until you withdraw consent.',
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
    {
      heading: p('Fikri Mülkiyet', 'Intellectual Property'),
      paragraphs: [
        p(
          'Sitedeki tüm görseller, tasarımlar ve içerikler Atelier Cake’e aittir ve izinsiz kullanılamaz.',
          'All images, designs and content on the site belong to Atelier Cake and may not be used without permission.',
        ),
      ],
    },
    {
      heading: p('Mücbir Sebepler', 'Force Majeure'),
      paragraphs: [
        p(
          'Doğal afet, salgın veya öngörülemeyen olaylar nedeniyle yaşanabilecek gecikmelerden sorumlu tutulamayız; bu durumlarda sizinle iletişime geçer ve çözüm sunarız.',
          'We cannot be held responsible for delays due to natural disasters, epidemics or unforeseen events; in such cases we will contact you and offer a solution.',
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
    {
      heading: p('Veri Aktarımı', 'Data Transfer'),
      paragraphs: [
        p(
          'Verileriniz; ödeme işlemleri için ödeme sağlayıcımıza ve teslimat için kargo/teslimat ekibimize, yalnızca hizmetin gerektirdiği ölçüde aktarılır.',
          'Your data is transferred to our payment provider for payments and to our delivery team for delivery, only to the extent required by the service.',
        ),
      ],
    },
    {
      heading: p('Başvuru Yöntemi', 'How to Apply'),
      paragraphs: [
        p(
          'KVKK kapsamındaki taleplerinizi siparis@ateliercake.com adresine iletebilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanır.',
          'You can send your KVKK requests to siparis@ateliercake.com. Your applications will be answered within 30 days at the latest.',
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
    {
      heading: p('Teslimat Saatleri', 'Delivery Hours'),
      paragraphs: [
        p(
          'Teslimatlar seçtiğiniz saat aralığında gerçekleştirilir. Trafik gibi öngörülemeyen durumlarda ekibimiz sizi telefonla bilgilendirir.',
          'Deliveries are made within your selected time slot. In unforeseen situations such as traffic, our team will notify you by phone.',
        ),
      ],
    },
    {
      heading: p('Teslim Alındığında', 'Upon Receipt'),
      paragraphs: [
        p(
          'Pastanızı teslim aldığınızda lütfen kontrol edin. Herhangi bir sorun olması durumunda, fotoğraflarla birlikte 2 saat içinde bize ulaşın.',
          'Please inspect your cake upon receipt. In case of any issue, contact us within 2 hours along with photographs.',
        ),
      ],
    },
  ],
};

export const LEGAL_DOCS = { PRIVACY, TERMS, KVKK, DELIVERY };
