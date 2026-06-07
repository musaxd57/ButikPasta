'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useConfigurator } from '@/store/configurator';
import { calculatePrice, formatPrice } from '@/lib/pricing';
import { orderSchema } from '@/lib/validation';
import { DELIVERY_SLOTS, minDeliveryDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import type { z } from 'zod';

type FormValues = z.infer<typeof orderSchema>;

export default function OrderClient() {
  const t = useTranslations('order');
  const tConf = useTranslations('configurator');
  const tFlavor = useTranslations('flavor');
  const tFrosting = useTranslations('frosting');
  const tDeco = useTranslations('decoration');
  const tSize = useTranslations('size');
  const tValidation = useTranslations('validation');
  const tRoot = useTranslations();
  const locale = useLocale();
  const { toast } = useToast();
  const { config, reset } = useConfigurator();
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(
    null,
  );
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Handle the redirect back from Stripe Checkout.
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') {
      const ordered = params.get('order');
      if (ordered) {
        setOrderNumber(ordered);
        reset();
      }
    } else if (params.get('canceled') === '1') {
      toast(t('canceled'), 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const price = calculatePrice(config);
  const minDate = minDeliveryDate().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      locale: locale as 'tr' | 'en',
      paymentType: 'deposit',
      deliveryDate: config.deliveryDate ?? '',
      deliverySlot: config.deliverySlot ?? '',
      cakeConfig: JSON.stringify(config),
      totalPrice: price.total,
    },
  });

  // Prefill the form for logged-in customers.
  useEffect(() => {
    fetch('/api/account/me')
      .then((r) => r.json())
      .then((d) => {
        if (d.customer) {
          if (d.customer.name) setValue('customerName', d.customer.name);
          setValue('customerEmail', d.customer.email);
          if (d.customer.phone) setValue('customerPhone', d.customer.phone);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const discount = coupon?.discount ?? 0;
  const finalTotal = Math.max(0, price.total - discount);

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponMsg(null);
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, total: price.total }),
      });
      const data = await res.json();
      if (data.valid) {
        setCoupon({ code: data.code, discount: data.discount });
        setCouponMsg(t('couponApplied'));
      } else {
        setCoupon(null);
        setCouponMsg(
          data.reason === 'min'
            ? t('couponMin', { min: formatPrice(data.minTotal ?? 0, locale) })
            : t('couponInvalid'),
        );
      }
    } catch {
      setCouponMsg(t('couponInvalid'));
    } finally {
      setCouponLoading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          cakeConfig: JSON.stringify(config),
          totalPrice: price.total,
          couponCode: coupon?.code ?? '',
        }),
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();

      // Attempt Stripe Checkout. When Stripe is configured we redirect the
      // customer to the hosted payment page; otherwise we fall back to the
      // in-app confirmation (order is already saved). Use the server-confirmed
      // total (data.totalPrice) so the charged amount can't be tampered with.
      const checkout = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.totalPrice ?? finalTotal,
          paymentType: values.paymentType,
          orderNumber: data.orderNumber,
          locale,
        }),
      });
      const checkoutData = await checkout.json().catch(() => ({}));

      if (checkoutData?.stripeConfigured && checkoutData?.url) {
        toast(t('redirecting'), 'info');
        window.location.href = checkoutData.url as string;
        return;
      }

      // No Stripe configured → confirm in-app.
      setOrderNumber(data.orderNumber);
      reset();
      toast(t('success'), 'success');
    } catch {
      toast(t('errorGeneric'), 'error');
    }
  };

  const err = (key?: string) => (key ? tValidation(key) : '');

  const whatsappHref = () => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '905555555555';
    const msg = `${t('whatsapp')} — ${formatPrice(finalTotal, locale)}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  // Success state
  if (orderNumber) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <CheckCircle2 className="text-gold" size={72} />
        </motion.div>
        <h1 className="mt-6 font-serif text-3xl">{t('success')}</h1>
        <p className="mt-3 text-charcoal/65">
          {t('successBody', { orderNumber })}
        </p>
        <Link href="/" className="btn-gold mt-8">
          Atelier Cake
        </Link>
      </div>
    );
  }

  const isEmpty = !config.preset && config.decorations.length === 0 &&
    config.message === '' && config.frosting === 'buttercream' &&
    config.tierCount === 1 && config.tiers[0]?.flavor === 'vanilla';

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <div className="text-center">
        <p className="eyebrow">Atelier Cake</p>
        <h1 className="section-title mt-2">{t('title')}</h1>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* Summary */}
        <aside className="lg:col-span-2">
          <div className="card-lux sticky top-24 p-6">
            <h2 className="font-serif text-xl">{t('summary')}</h2>
            <div className="hairline my-4" />

            <ul className="space-y-2.5 text-sm">
              {config.tiers.map((tier, i) => (
                <li key={i} className="flex justify-between text-charcoal/70">
                  <span>
                    {tConf('size.tier')} {i + 1}: {tSize(tier.size)}
                  </span>
                  <span className="text-charcoal">{tFlavor(tier.flavor)}</span>
                </li>
              ))}
              <li className="flex justify-between text-charcoal/70">
                <span>{tConf('steps.frosting')}</span>
                <span className="flex items-center gap-2 text-charcoal">
                  <span
                    className="h-3 w-3 rounded-full border border-charcoal/10"
                    style={{ background: config.frostingColor }}
                  />
                  {tFrosting(config.frosting)}
                </span>
              </li>
              {config.decorations.length > 0 && (
                <li className="flex justify-between gap-4 text-charcoal/70">
                  <span>{tConf('steps.decoration')}</span>
                  <span className="text-right text-charcoal">
                    {config.decorations.map((d) => tDeco(d)).join(', ')}
                  </span>
                </li>
              )}
              {config.sprinkles && (
                <li className="flex justify-between text-charcoal/70">
                  <span>{tConf('extras.sprinkles')}</span>
                  <span className="flex items-center gap-2 text-charcoal">
                    <span
                      className="h-3 w-3 rounded-full border border-charcoal/10"
                      style={{ background: config.sprinkleColor }}
                    />
                    ✓
                  </span>
                </li>
              )}
              {config.candles > 0 && (
                <li className="flex justify-between text-charcoal/70">
                  <span>{tConf('extras.candles')}</span>
                  <span className="text-charcoal">{config.candles}</span>
                </li>
              )}
              <li className="flex justify-between text-charcoal/70">
                <span>{tConf('extras.boardColor')}</span>
                <span
                  className="h-3 w-3 self-center rounded-full border border-charcoal/10"
                  style={{ background: config.boardColor }}
                />
              </li>
              {config.message && (
                <li className="flex justify-between text-charcoal/70">
                  <span>{tConf('steps.message')}</span>
                  <span className="text-charcoal">“{config.message}”</span>
                </li>
              )}
            </ul>

            <div className="my-4 border-t border-charcoal/10 pt-4">
              {price.lines.map((line, i) => (
                <div
                  key={i}
                  className="flex justify-between py-0.5 text-xs text-charcoal/50"
                >
                  <span>{tRoot(line.labelKey)}</span>
                  <span>{formatPrice(line.amount, locale)}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="border-t border-charcoal/10 pt-4">
              <label className="label-lux">{t('couponLabel')}</label>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder={t('couponPlaceholder')}
                  className="input-lux flex-1 uppercase"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={couponLoading}
                  className="shrink-0 rounded-xl border border-gold/50 px-4 text-xs font-medium uppercase tracking-wider text-gold-dark transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
                >
                  {couponLoading ? '...' : t('couponApply')}
                </button>
              </div>
              {couponMsg && (
                <p
                  className={`mt-2 text-xs ${
                    coupon ? 'text-emerald-600' : 'text-rose'
                  }`}
                >
                  {couponMsg}
                </p>
              )}
            </div>

            {discount > 0 && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between text-charcoal/55">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(price.total, locale)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>
                    {t('discount')} {coupon ? `(${coupon.code})` : ''}
                  </span>
                  <span>−{formatPrice(discount, locale)}</span>
                </div>
              </div>
            )}

            <div className="mt-3 flex items-end justify-between border-t border-charcoal/10 pt-4">
              <span className="text-xs uppercase tracking-wider text-charcoal/50">
                {t('paymentTitle')}
              </span>
              <span className="font-serif text-2xl font-semibold text-gold-dark">
                {formatPrice(finalTotal, locale)}
              </span>
            </div>

            {isEmpty && (
              <div className="mt-5 rounded-lg bg-gold/10 p-4 text-center text-xs text-gold-dark">
                {t('noConfig')}{' '}
                <Link href="/configure" className="font-medium underline">
                  {t('designNow')}
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-lux space-y-5 p-6 md:p-8 lg:col-span-3"
        >
          <h2 className="font-serif text-xl">{t('details')}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-lux">{t('name')}</label>
              <input className="input-lux" {...register('customerName')} />
              {errors.customerName && (
                <p className="mt-1 text-xs text-rose">
                  {err(errors.customerName.message)}
                </p>
              )}
            </div>
            <div>
              <label className="label-lux">{t('phone')}</label>
              <input
                className="input-lux"
                placeholder="0555 555 55 55"
                {...register('customerPhone')}
              />
              {errors.customerPhone && (
                <p className="mt-1 text-xs text-rose">
                  {err(errors.customerPhone.message)}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="label-lux">{t('email')}</label>
            <input
              type="email"
              className="input-lux"
              {...register('customerEmail')}
            />
            {errors.customerEmail && (
              <p className="mt-1 text-xs text-rose">
                {err(errors.customerEmail.message)}
              </p>
            )}
          </div>

          <div>
            <label className="label-lux">{t('address')}</label>
            <textarea
              rows={2}
              className="input-lux resize-none"
              {...register('address')}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-rose">
                {err(errors.address.message)}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-lux">{t('deliveryDate')}</label>
              <input
                type="date"
                min={minDate}
                className="input-lux"
                {...register('deliveryDate')}
              />
              {errors.deliveryDate && (
                <p className="mt-1 text-xs text-rose">
                  {err(errors.deliveryDate.message)}
                </p>
              )}
            </div>
            <div>
              <label className="label-lux">{t('deliverySlot')}</label>
              <select className="input-lux" {...register('deliverySlot')}>
                <option value="">—</option>
                {DELIVERY_SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.deliverySlot && (
                <p className="mt-1 text-xs text-rose">
                  {err(errors.deliverySlot.message)}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="label-lux">{t('notes')}</label>
            <textarea
              rows={2}
              className="input-lux resize-none"
              {...register('notes')}
            />
          </div>

          {/* Payment type */}
          <div>
            <label className="label-lux">{t('paymentTitle')}</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-charcoal/12 p-4 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10">
                <input
                  type="radio"
                  value="deposit"
                  className="accent-gold"
                  {...register('paymentType')}
                />
                {t('payDeposit')} ({formatPrice(finalTotal / 2, locale)})
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-charcoal/12 p-4 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10">
                <input
                  type="radio"
                  value="full"
                  className="accent-gold"
                  {...register('paymentType')}
                />
                {t('payFull')}
              </label>
            </div>
          </div>

          <p className="text-xs text-charcoal/45">{t('advanceNote')}</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} /> {t('placing')}
              </>
            ) : (
              t('place')
            )}
          </button>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-[#1c9e4d] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle size={17} />
            {t('whatsapp')}
          </a>
        </form>
      </div>
    </div>
  );
}
