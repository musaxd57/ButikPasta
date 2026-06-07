'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useConfigurator } from '@/store/configurator';
import { usePricing } from '@/store/pricing';
import { PRESETS } from '@/lib/data';
import {
  calculatePrice,
  estimateServings,
  formatPrice,
} from '@/lib/pricing';
import {
  DecorationKey,
  FlavorKey,
  FontKey,
  FrostingKey,
  SizeKey,
} from '@/types/cake';
import { DELIVERY_SLOTS, minDeliveryDate } from '@/lib/utils';
import {
  DecorationVisual,
  FLAVOR_VISUAL,
  FROSTING_VISUAL,
  FontPreview,
  SizeSilhouette,
  Swatch,
  TierSilhouette,
  VisualTile,
} from './visuals';

const FLAVORS: FlavorKey[] = [
  'vanilla',
  'chocolate',
  'redvelvet',
  'pistachio',
  'lemon',
];
const FROSTINGS: FrostingKey[] = ['buttercream', 'whipped', 'ganache', 'fondant'];
const DECORATIONS: DecorationKey[] = [
  'flowers',
  'macarons',
  'berries',
  'drip',
  'topper',
];
const SIZES: SizeKey[] = ['small', 'medium', 'large'];
const FONTS: FontKey[] = ['script', 'serif', 'modern'];

const COLOR_SWATCHES = [
  '#FAF7F2',
  '#C9A84C',
  '#C4896F',
  '#D9A48C',
  '#E0C878',
  '#8e2b2b',
  '#5a3825',
  '#bcd49a',
  '#1a1a1a',
];

function StepWrap({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
    >
      <h3 className="font-serif text-2xl">{title}</h3>
      {hint && <p className="mt-1 text-xs text-charcoal/45">{hint}</p>}
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

export default function Steps() {
  const t = useTranslations('configurator');
  const tFlavor = useTranslations('flavor');
  const tFrosting = useTranslations('frosting');
  const tDeco = useTranslations('decoration');
  const tSize = useTranslations('size');
  const tFont = useTranslations('font');
  const tRoot = useTranslations();
  const locale = useLocale();
  const { config, step, ...actions } = useConfigurator();
  const pricing = usePricing((s) => s.pricing);

  const minDate = minDeliveryDate().toISOString().split('T')[0];

  switch (step) {
    case 0: // Base
      return (
        <StepWrap title={t('base.title')}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <VisualTile
              label={t('base.scratch')}
              sublabel={t('base.scratchDesc')}
              selected={config.preset === null}
              onClick={() => actions.setPreset(null)}
              visual={
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ivory to-ivory-dark">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gold/60 text-gold">
                    <Plus size={22} />
                  </span>
                </div>
              }
            />
            {PRESETS.map((p) => (
              <VisualTile
                key={p.id}
                label={locale === 'tr' ? p.nameTr : p.nameEn}
                sublabel={t('base.presetDesc')}
                selected={config.preset === p.id}
                onClick={() => {
                  actions.setPreset(p.id, p.tiers);
                  actions.setFrostingColor(p.frostingColor);
                }}
                visual={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt={p.nameEn}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                }
              />
            ))}
          </div>
        </StepWrap>
      );

    case 1: // Tiers — visual silhouette cards
      return (
        <StepWrap title={t('tiers.title')}>
          <div className="grid grid-cols-3 gap-3">
            {([1, 2, 3] as const).map((n) => (
              <VisualTile
                key={n}
                ratio="aspect-square"
                label={t(`tiers.${n === 1 ? 'one' : n === 2 ? 'two' : 'three'}`)}
                selected={config.tierCount === n}
                onClick={() => actions.setTierCount(n)}
                visual={
                  <TierSilhouette count={n} selected={config.tierCount === n} />
                }
              />
            ))}
          </div>
        </StepWrap>
      );

    case 2: // Size — silhouette comparison per tier
      return (
        <StepWrap title={t('size.title')}>
          <div className="space-y-5">
            {config.tiers.map((tier, i) => (
              <div key={i}>
                <p className="label-lux">
                  {t('size.tier')} {i + 1}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SIZES.map((s) => (
                    <VisualTile
                      key={s}
                      ratio="aspect-[4/3]"
                      label={tSize(s)}
                      price={pricing.size[s]}
                      selected={tier.size === s}
                      onClick={() => actions.setTier(i, { size: s })}
                      visual={<SizeSilhouette size={s} selected={tier.size === s} />}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StepWrap>
      );

    case 3: // Flavor — sponge colour swatches per tier
      return (
        <StepWrap title={t('flavor.title')}>
          <div className="space-y-6">
            {config.tiers.map((tier, i) => (
              <div key={i}>
                <p className="label-lux">
                  {t('flavor.tier')} {i + 1}
                </p>
                <div className="flex flex-wrap gap-4">
                  {FLAVORS.map((f) => (
                    <Swatch
                      key={f}
                      large
                      background={FLAVOR_VISUAL[f]}
                      label={tFlavor(f)}
                      price={pricing.flavor[f]}
                      selected={tier.flavor === f}
                      onClick={() => actions.setTier(i, { flavor: f })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StepWrap>
      );

    case 4: // Frosting — texture swatches + colour swatches
      return (
        <StepWrap title={t('frosting.title')}>
          <div className="flex flex-wrap gap-4">
            {FROSTINGS.map((f) => (
              <Swatch
                key={f}
                large
                background={FROSTING_VISUAL[f]}
                label={tFrosting(f)}
                price={pricing.frosting[f]}
                selected={config.frosting === f}
                onClick={() => actions.setFrosting(f)}
              />
            ))}
          </div>

          <div className="mt-7">
            <p className="label-lux">{t('frosting.colorLabel')}</p>
            <div className="flex flex-wrap items-center gap-3">
              {COLOR_SWATCHES.map((c) => (
                <Swatch
                  key={c}
                  background={c}
                  selected={config.frostingColor.toLowerCase() === c.toLowerCase()}
                  onClick={() => actions.setFrostingColor(c)}
                />
              ))}
              <label className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-charcoal/25 text-charcoal/40 transition hover:border-gold hover:text-gold">
                <Plus size={16} />
                <input
                  type="color"
                  value={config.frostingColor}
                  onChange={(e) => actions.setFrostingColor(e.target.value)}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </StepWrap>
      );

    case 5: // Decoration — photo tiles + drip colour swatches
      return (
        <StepWrap title={t('decoration.title')} hint={t('decoration.hint')}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {DECORATIONS.map((d) => (
              <VisualTile
                key={d}
                ratio="aspect-square"
                label={tDeco(d)}
                price={pricing.decoration[d]}
                selected={config.decorations.includes(d)}
                onClick={() => actions.toggleDecoration(d)}
                visual={<DecorationVisual deco={d} />}
              />
            ))}
          </div>

          {config.decorations.includes('drip') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              <p className="label-lux">{t('decoration.dripColor')}</p>
              <div className="flex flex-wrap gap-3">
                {COLOR_SWATCHES.map((c) => (
                  <Swatch
                    key={c}
                    background={c}
                    selected={config.dripColor.toLowerCase() === c.toLowerCase()}
                    onClick={() => actions.setDripColor(c)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Finishing touches: sprinkles, candles, cake board */}
          <div className="mt-8 space-y-6 border-t border-charcoal/10 pt-6">
            <p className="label-lux !mb-0">{t('extras.title')}</p>

            {/* Sprinkles */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-charcoal/75">
                <input
                  type="checkbox"
                  checked={config.sprinkles}
                  onChange={(e) => actions.setSprinkles(e.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
                {t('extras.sprinkles')}
              </label>
              {config.sprinkles && (
                <div className="flex gap-2">
                  {COLOR_SWATCHES.slice(0, 6).map((c) => (
                    <button
                      key={c}
                      onClick={() => actions.setSprinkleColor(c)}
                      className={`h-7 w-7 rounded-full border-2 ${
                        config.sprinkleColor.toLowerCase() === c.toLowerCase()
                          ? 'border-gold'
                          : 'border-charcoal/10'
                      }`}
                      style={{ background: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Candles */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal/75">{t('extras.candles')}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => actions.setCandles(config.candles - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:border-gold"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{config.candles}</span>
                <button
                  onClick={() => actions.setCandles(config.candles + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:border-gold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Board colour */}
            <div>
              <p className="mb-2 text-sm text-charcoal/75">{t('extras.boardColor')}</p>
              <div className="flex flex-wrap gap-3">
                {['#e8e0d0', '#1a1a1a', '#C9A84C', '#FAF7F2', '#C4896F', '#5a3825'].map(
                  (c) => (
                    <Swatch
                      key={c}
                      background={c}
                      selected={config.boardColor.toLowerCase() === c.toLowerCase()}
                      onClick={() => actions.setBoardColor(c)}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </StepWrap>
      );

    case 6: // Message — live font preview tiles
      return (
        <StepWrap title={t('message.title')}>
          <input
            type="text"
            maxLength={30}
            value={config.message}
            onChange={(e) => actions.setMessage(e.target.value)}
            placeholder={t('message.placeholder')}
            className="input-lux"
          />
          <p className="label-lux mt-5">{t('message.fontLabel')}</p>
          <div className="grid grid-cols-3 gap-3">
            {FONTS.map((f) => (
              <VisualTile
                key={f}
                ratio="aspect-[5/3]"
                label={tFont(f)}
                selected={config.font === f}
                onClick={() => actions.setFont(f)}
                visual={
                  <FontPreview
                    font={f}
                    text={config.message}
                    selected={config.font === f}
                  />
                }
              />
            ))}
          </div>
        </StepWrap>
      );

    case 7: // Delivery — visual date + slot tiles (no dropdowns)
      return (
        <StepWrap title={t('delivery.title')}>
          <p className="mb-4 rounded-lg bg-gold/10 px-4 py-3 text-xs text-gold-dark">
            {t('delivery.note')}
          </p>
          <div>
            <label className="label-lux">{t('delivery.dateLabel')}</label>
            <input
              type="date"
              min={minDate}
              value={config.deliveryDate ?? ''}
              onChange={(e) =>
                actions.setDelivery(e.target.value, config.deliverySlot)
              }
              className="input-lux"
            />
          </div>
          <div className="mt-5">
            <label className="label-lux">{t('delivery.slotLabel')}</label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {DELIVERY_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => actions.setDelivery(config.deliveryDate, slot)}
                  className={
                    config.deliverySlot === slot
                      ? 'rounded-xl border-2 border-gold bg-gold/10 px-3 py-3 text-sm font-medium text-charcoal'
                      : 'rounded-xl border-2 border-transparent px-3 py-3 text-sm text-charcoal/65 ring-1 ring-charcoal/10 transition hover:ring-gold/50'
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </StepWrap>
      );

    case 8: { // Review summary
      const price = calculatePrice(config, pricing);
      const rows: { label: string; value: string }[] = [
        {
          label: t('steps.tiers'),
          value: `${config.tierCount}`,
        },
        ...config.tiers.map((tier, idx) => ({
          label: `${t('size.tier')} ${idx + 1}`,
          value: `${tSize(tier.size)} · ${tFlavor(tier.flavor)}`,
        })),
        { label: t('steps.frosting'), value: tFrosting(config.frosting) },
        {
          label: t('steps.decoration'),
          value: config.decorations.length
            ? config.decorations.map((d) => tDeco(d)).join(', ')
            : '—',
        },
        {
          label: t('steps.message'),
          value: config.message ? `“${config.message}” (${tFont(config.font)})` : '—',
        },
        {
          label: t('steps.delivery'),
          value:
            config.deliveryDate && config.deliverySlot
              ? `${config.deliveryDate} · ${config.deliverySlot}`
              : '—',
        },
      ];
      const servings = estimateServings(config);
      return (
        <StepWrap title={t('review.title')} hint={t('review.hint')}>
          <ul className="divide-y divide-charcoal/10">
            {rows.map((row, idx) => (
              <li key={idx} className="flex items-start justify-between gap-4 py-3">
                <span className="text-xs uppercase tracking-wider text-charcoal/45">
                  {row.label}
                </span>
                <span className="text-right text-sm text-charcoal">{row.value}</span>
              </li>
            ))}
            <li className="flex items-start justify-between gap-4 py-3">
              <span className="text-xs uppercase tracking-wider text-charcoal/45">
                {t('servingsLabel')}
              </span>
              <span className="text-right text-sm text-charcoal">
                {t('servings', { count: servings })}
              </span>
            </li>
          </ul>

          {/* Transparent price breakdown */}
          <div className="mt-5 rounded-xl bg-ivory-dark/40 px-4 py-3">
            {price.lines.map((line, idx) => (
              <div
                key={idx}
                className="flex justify-between py-0.5 text-xs text-charcoal/55"
              >
                <span>{tRoot(line.labelKey)}</span>
                <span>{formatPrice(line.amount, locale)}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-gold/10 px-4 py-4">
            <span className="text-sm uppercase tracking-wider text-gold-dark">
              {t('yourPrice')}
            </span>
            <span className="font-serif text-2xl font-semibold text-gold-dark">
              {formatPrice(price.total, locale)}
            </span>
          </div>
        </StepWrap>
      );
    }

    default:
      return null;
  }
}
