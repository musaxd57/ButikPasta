'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import OptionCard from './OptionCard';
import { useConfigurator } from '@/store/configurator';
import { PRESETS } from '@/lib/data';
import {
  DECORATION_PRICE,
  FLAVOR_PRICE,
  FROSTING_PRICE,
  SIZE_PRICE,
} from '@/lib/pricing';
import {
  DecorationKey,
  FlavorKey,
  FontKey,
  FrostingKey,
  SizeKey,
} from '@/types/cake';
import { DELIVERY_SLOTS, minDeliveryDate } from '@/lib/utils';
import { useLocale } from 'next-intl';

const FLAVORS: FlavorKey[] = [
  'vanilla',
  'chocolate',
  'redvelvet',
  'pistachio',
  'lemon',
];
const FROSTINGS: FrostingKey[] = [
  'buttercream',
  'whipped',
  'ganache',
  'fondant',
];
const DECORATIONS: DecorationKey[] = [
  'flowers',
  'macarons',
  'berries',
  'drip',
  'topper',
];
const SIZES: SizeKey[] = ['small', 'medium', 'large'];
const FONTS: FontKey[] = ['script', 'serif', 'modern'];

const FROSTING_SWATCHES = [
  '#FAF7F2',
  '#C9A84C',
  '#C4896F',
  '#D9A48C',
  '#E0C878',
  '#8e2b2b',
  '#5a3825',
  '#bcd49a',
];

function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="space-y-3"
    >
      {children}
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
  const locale = useLocale();
  const { config, step, ...actions } = useConfigurator();

  const minDate = minDeliveryDate().toISOString().split('T')[0];

  switch (step) {
    case 0: // Base
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('base.title')}</h3>
          <OptionCard
            label={t('base.scratch')}
            sublabel={t('base.scratchDesc')}
            active={config.preset === null}
            onClick={() => actions.setPreset(null)}
          />
          {PRESETS.map((p) => (
            <OptionCard
              key={p.id}
              label={locale === 'tr' ? p.nameTr : p.nameEn}
              sublabel={t('base.presetDesc')}
              active={config.preset === p.id}
              swatch={p.frostingColor}
              onClick={() => {
                actions.setPreset(p.id, p.tiers);
                actions.setFrostingColor(p.frostingColor);
              }}
            />
          ))}
        </StepWrap>
      );

    case 1: // Tiers
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('tiers.title')}</h3>
          {([1, 2, 3] as const).map((n) => (
            <OptionCard
              key={n}
              label={t(`tiers.${n === 1 ? 'one' : n === 2 ? 'two' : 'three'}`)}
              active={config.tierCount === n}
              onClick={() => actions.setTierCount(n)}
            />
          ))}
        </StepWrap>
      );

    case 2: // Size
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('size.title')}</h3>
          {config.tiers.map((tier, i) => (
            <div key={i} className="mb-4">
              <p className="label-lux">
                {t('size.tier')} {i + 1}
              </p>
              <div className="grid gap-2">
                {SIZES.map((s) => (
                  <OptionCard
                    key={s}
                    label={tSize(s)}
                    price={SIZE_PRICE[s]}
                    active={tier.size === s}
                    onClick={() => actions.setTier(i, { size: s })}
                  />
                ))}
              </div>
            </div>
          ))}
        </StepWrap>
      );

    case 3: // Flavor
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('flavor.title')}</h3>
          {config.tiers.map((tier, i) => (
            <div key={i} className="mb-4">
              <p className="label-lux">
                {t('flavor.tier')} {i + 1}
              </p>
              <div className="grid gap-2">
                {FLAVORS.map((f) => (
                  <OptionCard
                    key={f}
                    label={tFlavor(f)}
                    price={FLAVOR_PRICE[f]}
                    active={tier.flavor === f}
                    onClick={() => actions.setTier(i, { flavor: f })}
                  />
                ))}
              </div>
            </div>
          ))}
        </StepWrap>
      );

    case 4: // Frosting
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('frosting.title')}</h3>
          {FROSTINGS.map((f) => (
            <OptionCard
              key={f}
              label={tFrosting(f)}
              price={FROSTING_PRICE[f]}
              active={config.frosting === f}
              onClick={() => actions.setFrosting(f)}
            />
          ))}
          <div className="pt-4">
            <p className="label-lux">{t('frosting.colorLabel')}</p>
            <div className="flex flex-wrap gap-2.5">
              {FROSTING_SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => actions.setFrostingColor(c)}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    config.frostingColor === c
                      ? 'border-gold scale-110'
                      : 'border-charcoal/10'
                  }`}
                  style={{ background: c }}
                  aria-label={c}
                />
              ))}
              <label className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-charcoal/25">
                <input
                  type="color"
                  value={config.frostingColor}
                  onChange={(e) => actions.setFrostingColor(e.target.value)}
                  className="absolute inset-0 h-12 w-12 -translate-x-1.5 -translate-y-1.5 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </StepWrap>
      );

    case 5: // Decoration
      return (
        <StepWrap>
          <h3 className="font-serif text-2xl">{t('decoration.title')}</h3>
          <p className="mb-3 text-xs text-charcoal/45">
            {t('decoration.hint')}
          </p>
          {DECORATIONS.map((d) => (
            <OptionCard
              key={d}
              label={tDeco(d)}
              price={DECORATION_PRICE[d]}
              active={config.decorations.includes(d)}
              onClick={() => actions.toggleDecoration(d)}
            />
          ))}
        </StepWrap>
      );

    case 6: // Message
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('message.title')}</h3>
          <input
            type="text"
            maxLength={30}
            value={config.message}
            onChange={(e) => actions.setMessage(e.target.value)}
            placeholder={t('message.placeholder')}
            className="input-lux"
          />
          <p className="label-lux mt-4">{t('message.fontLabel')}</p>
          <div className="grid gap-2">
            {FONTS.map((f) => (
              <OptionCard
                key={f}
                label={tFont(f)}
                active={config.font === f}
                onClick={() => actions.setFont(f)}
              />
            ))}
          </div>
        </StepWrap>
      );

    case 7: // Delivery
      return (
        <StepWrap>
          <h3 className="mb-4 font-serif text-2xl">{t('delivery.title')}</h3>
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
          <div className="mt-4">
            <label className="label-lux">{t('delivery.slotLabel')}</label>
            <div className="grid grid-cols-2 gap-2">
              {DELIVERY_SLOTS.map((slot) => (
                <OptionCard
                  key={slot}
                  label={slot}
                  active={config.deliverySlot === slot}
                  onClick={() =>
                    actions.setDelivery(config.deliveryDate, slot)
                  }
                />
              ))}
            </div>
          </div>
        </StepWrap>
      );

    default:
      return null;
  }
}
