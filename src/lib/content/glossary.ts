import type { Bilingual } from './site';

export interface GlossaryTerm {
  term: Bilingual;
  definition: Bilingual;
}

const g = (
  termTr: string,
  termEn: string,
  defTr: string,
  defEn: string,
): GlossaryTerm => ({
  term: { tr: termTr, en: termEn },
  definition: { tr: defTr, en: defEn },
});

export const GLOSSARY: GlossaryTerm[] = [
  g(
    'Fondan',
    'Fondant',
    'Pastaya pürüzsüz, kusursuz bir yüzey kazandıran, açılabilir şekerli hamur kaplama.',
    'A rollable sugar paste that gives the cake a smooth, flawless surface.',
  ),
  g(
    'Ganaj',
    'Ganache',
    'Çikolata ve kremanın eritilerek karıştırılmasıyla elde edilen, parlak ve yoğun kaplama.',
    'A glossy, rich coating made by melting and blending chocolate with cream.',
  ),
  g(
    'Tereyağlı Krema',
    'Buttercream',
    'Tereyağı ve pudra şekeriyle hazırlanan, yumuşak ve lezzetli klasik kaplama.',
    'A soft, flavourful classic frosting made with butter and icing sugar.',
  ),
  g(
    'Pandispanya',
    'Sponge',
    'Pastanın temel katmanını oluşturan hafif ve hava dolu kek tabanı.',
    'The light, airy cake base that forms the foundation of the cake.',
  ),
  g(
    'Drip Efekti',
    'Drip Effect',
    'Pastanın üst kenarından aşağı doğru akıtılan çikolata veya şeker süslemesi.',
    'A chocolate or sugar decoration dripped down from the top edge of the cake.',
  ),
  g(
    'Naked Cake',
    'Naked Cake',
    'Kenarları minimum kremayla kaplanan, katmanların göründüğü doğal görünümlü pasta.',
    'A natural-looking cake with minimal frosting on the sides, revealing the layers.',
  ),
  g(
    'Topper',
    'Topper',
    'Pastanın en üstüne yerleştirilen dekoratif süs öğesi.',
    'A decorative ornament placed on top of the cake.',
  ),
  g(
    'Sahte Kat (Dummy)',
    'Dummy Tier',
    'Görsel ihtişam için kullanılan, köpükten yapılma yenmeyen pasta katı.',
    'A non-edible foam tier used to add visual grandeur.',
  ),
  g(
    'Şeker Çiçeği',
    'Sugar Flower',
    'Tamamen yenilebilir şekerden elle yapılan gerçekçi çiçek süslemeleri.',
    'Realistic flower decorations handcrafted entirely from edible sugar.',
  ),
  g(
    'Yenilebilir Baskı',
    'Edible Print',
    'Gıda boyalarıyla yenilebilir kâğıda basılan logo veya görseller.',
    'Logos or images printed on edible paper with food-safe inks.',
  ),
  g(
    'Kuvertür',
    'Couverture',
    'Yüksek kakao yağı oranına sahip, profesyonel kalitede çikolata.',
    'Professional-grade chocolate with a high cocoa-butter content.',
  ),
  g(
    'Mascarpone',
    'Mascarpone',
    'İtalyan kökenli, kremamsı ve hafif tatlı bir taze peynir.',
    'A creamy, mildly sweet fresh cheese of Italian origin.',
  ),
  g(
    'Labne Kreması',
    'Cream Cheese Frosting',
    'Red velvet gibi pastalarda kullanılan, hafif ekşi ve kremsi kaplama.',
    'A slightly tangy, creamy frosting used on cakes like red velvet.',
  ),
  g(
    'Şurup',
    'Soak / Syrup',
    'Pandispanyayı nemlendirmek için sürülen aromalı şeker şurubu.',
    'A flavoured sugar syrup brushed onto sponge to keep it moist.',
  ),
  g(
    'Pasta Altlığı',
    'Cake Board',
    'Pastanın üzerinde durduğu sağlam, dekoratif taban.',
    'The sturdy, decorative base on which the cake sits.',
  ),
  g(
    'Bordür',
    'Border / Piping',
    'Pastanın kenarlarına kremayla yapılan dekoratif sıkma desenler.',
    'Decorative piped patterns applied with cream along the cake edges.',
  ),
];
