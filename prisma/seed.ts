import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { GALLERY, TESTIMONIALS } from '../src/lib/data';
import {
  BASE_PRICE,
  DECORATION_PRICE,
  FLAVOR_PRICE,
  FROSTING_PRICE,
  SIZE_PRICE,
} from '../src/lib/pricing';

const prisma = new PrismaClient();

async function main() {
  // Admin account
  const email = (process.env.ADMIN_EMAIL ?? 'admin@ateliercake.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? 'atelier2024';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Atelier Admin' },
  });
  console.log(`✓ Admin: ${email}`);

  // Gallery
  for (const g of GALLERY) {
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        imageUrl: g.imageUrl,
        titleTr: g.titleTr,
        titleEn: g.titleEn,
        category: g.category,
        priceRange: g.priceRange,
        featured: g.featured ?? false,
      },
    });
  }
  console.log(`✓ ${GALLERY.length} gallery items`);

  // Testimonials
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        author: t.author,
        textTr: t.textTr,
        textEn: t.textEn,
        rating: t.rating,
      },
    });
  }
  console.log(`✓ ${TESTIMONIALS.length} testimonials`);

  // Seed a few approved reviews for the public reviews page.
  const seedReviews = [
    { author: 'Ayşe K.', email: 'ayse@example.com', rating: 5, body: 'Düğün pastamız muhteşemdi, herkes çok beğendi. Lezzet ve görsellik kusursuzdu!' },
    { author: 'Can D.', email: 'can@example.com', rating: 5, body: 'Kurumsal etkinliğimiz için hazırladıkları logolu pasta çok şıktı. Teşekkürler.' },
    { author: 'Elif T.', email: 'elif@example.com', rating: 5, body: 'Antep fıstıklı pasta hayatımda yediğim en iyisiydi. Kesinlikle tavsiye ederim.' },
    { author: 'Mehmet S.', email: 'mehmet@example.com', rating: 4, body: 'Zamanında teslim, çok lezzetli. Tasarım sürecinde çok yardımcı oldular.' },
    { author: 'Zeynep A.', email: 'zeynep2@example.com', rating: 5, body: 'Kızımın doğum günü pastası rüya gibiydi. Tekrar sipariş vereceğiz.' },
  ];
  for (const r of seedReviews) {
    const exists = await prisma.review.findFirst({ where: { email: r.email, body: r.body } });
    if (!exists) await prisma.review.create({ data: { ...r, approved: true } });
  }
  console.log(`✓ ${seedReviews.length} reviews`);

  // Cake options / pricing
  const options: {
    category: string;
    key: string;
    nameTr: string;
    nameEn: string;
    priceModifier: number;
  }[] = [
    { category: 'base', key: 'base', nameTr: 'Temel Pasta', nameEn: 'Base Cake', priceModifier: BASE_PRICE },
    ...Object.entries(SIZE_PRICE).map(([k, v]) => ({
      category: 'size', key: k, nameTr: k, nameEn: k, priceModifier: v,
    })),
    ...Object.entries(FLAVOR_PRICE).map(([k, v]) => ({
      category: 'flavor', key: k, nameTr: k, nameEn: k, priceModifier: v,
    })),
    ...Object.entries(FROSTING_PRICE).map(([k, v]) => ({
      category: 'frosting', key: k, nameTr: k, nameEn: k, priceModifier: v,
    })),
    ...Object.entries(DECORATION_PRICE).map(([k, v]) => ({
      category: 'decoration', key: k, nameTr: k, nameEn: k, priceModifier: v,
    })),
  ];

  for (const o of options) {
    await prisma.cakeOption.upsert({
      where: { category_key: { category: o.category, key: o.key } },
      update: { priceModifier: o.priceModifier },
      create: o,
    });
  }
  console.log(`✓ ${options.length} cake options`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
