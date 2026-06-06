import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/marketing/CtaBand';
import { JOURNAL, getPost, relatedPosts } from '@/lib/content/journal';
import { pick } from '@/lib/i18nContent';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    JOURNAL.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: pick(post.title, params.locale),
    description: pick(post.excerpt, params.locale),
    openGraph: { images: [post.cover] },
  };
}

function Article({ slug }: { slug: string }) {
  const t = useTranslations('journal');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug, 3);
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.cover}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/90" />
        <Container className="relative z-10 pb-14">
          <Breadcrumbs
            tone="light"
            items={[
              { label: tNav('home'), href: '/' },
              { label: tNav('journal'), href: '/journal' },
              { label: pick(post.title, locale) },
            ]}
          />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
            {t(`categories.${post.category}`)}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ivory md:text-5xl">
            {pick(post.title, locale)}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-ivory/70">
            <span>
              {t('byAuthor')} {post.author}
            </span>
            <span>·</span>
            <span>{fmtDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readingMinutes} {tCommon('minRead')}
            </span>
          </div>
        </Container>
      </section>

      <Section tone="ivory" containerSize="narrow">
        <article className="prose-luxury">
          <Reveal>
            <p className="mb-8 font-serif text-xl italic leading-relaxed text-charcoal/80">
              {pick(post.excerpt, locale)}
            </p>
          </Reveal>
          {(locale === 'en' ? post.body.en : post.body.tr).map((para, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <p className="mb-6 leading-relaxed text-charcoal/75">{para}</p>
            </Reveal>
          ))}

          <div className="mt-12">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold"
            >
              <ArrowLeft size={16} /> {t('backToJournal')}
            </Link>
          </div>
        </article>
      </Section>

      <Section tone="ivoryDark">
        <h2 className="mb-8 text-center font-serif text-3xl">{t('related')}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover}
                  alt={pick(p.title, locale)}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.15em] text-gold">
                {t(`categories.${p.category}`)}
              </p>
              <h3 className="mt-1 font-serif text-lg transition-colors group-hover:text-gold-dark">
                {pick(p.title, locale)}
              </h3>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

export default function JournalDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  return <Article slug={params.slug} />;
}
