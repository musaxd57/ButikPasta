'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Loader2, RotateCcw, Users } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useConfigurator } from '@/store/configurator';
import { calculatePrice, estimateServings, formatPrice } from '@/lib/pricing';
import Steps from './Steps';

const CakeViewer = dynamic(() => import('./CakeViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-3xl bg-charcoal-dark md:h-[600px]">
      <Loader2 className="animate-spin text-gold" size={32} />
    </div>
  ),
});

const STEP_KEYS = [
  'base',
  'tiers',
  'size',
  'flavor',
  'frosting',
  'decoration',
  'message',
  'delivery',
  'review',
] as const;

export default function Configurator() {
  const t = useTranslations('configurator');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const { config, step, setStep, reset } = useConfigurator();
  const price = calculatePrice(config);
  const servings = estimateServings(config);
  const total = STEP_KEYS.length;

  const goNext = () => {
    if (step < total - 1) setStep(step + 1);
    else router.push('/order');
  };
  const goBack = () => step > 0 && setStep(step - 1);

  const handleReset = () => {
    if (typeof window !== 'undefined' && !window.confirm(t('resetConfirm'))) return;
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <div className="text-center">
        <p className="eyebrow">{t('subtitle')}</p>
        <h1 className="section-title mt-2">{t('title')}</h1>
      </div>

      {/* Stepper */}
      <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between">
        {STEP_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => setStep(i)}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                i === step
                  ? 'scale-110 bg-gold text-charcoal'
                  : i < step
                    ? 'bg-gold/30 text-gold-dark'
                    : 'bg-charcoal/8 text-charcoal/40'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden text-[0.6rem] uppercase tracking-wider sm:block ${
                i === step ? 'text-gold' : 'text-charcoal/40'
              }`}
            >
              {t(`steps.${key}`)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* 3D viewer + price */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CakeViewer config={config} />

          <div className="card-lux mt-5 p-5">
            <div className="flex items-end justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
                {t('yourPrice')}
              </span>
              <motion.span
                key={price.total}
                initial={{ scale: 1.15, color: '#C9A84C' }}
                animate={{ scale: 1, color: '#1a1a1a' }}
                className="font-serif text-3xl font-semibold"
              >
                {formatPrice(price.total, locale)}
              </motion.span>
            </div>
            <p className="mt-1 text-right text-[0.65rem] text-charcoal/40">
              {tCommon('currencyNote')}
            </p>
            <div className="mt-3 flex items-center gap-2 border-t border-charcoal/10 pt-3 text-sm text-charcoal/70">
              <Users size={15} className="text-gold" />
              <span>{t('servings', { count: servings })}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal/40 transition hover:text-gold"
          >
            <RotateCcw size={13} />
            {t('startOver')}
          </button>
        </div>

        {/* Steps panel */}
        <div>
          <div className="card-lux min-h-[360px] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <Steps key={step} />
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="btn-ghost disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} /> {tCommon('back')}
            </button>
            <span className="text-xs text-charcoal/40">
              {t('stepLabel')} {step + 1} / {total}
            </span>
            <button onClick={goNext} className="btn-gold">
              {step === total - 1 ? t('orderThis') : tCommon('next')}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
