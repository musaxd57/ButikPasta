// Order confirmation email. Uses Resend when RESEND_API_KEY is configured,
// otherwise falls back to console logging so local development works without
// any external service.

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  deliveryDate: string;
  locale: 'tr' | 'en';
}

const COPY = {
  tr: {
    subject: (n: string) => `Siparişiniz alındı · ${n}`,
    heading: 'Teşekkürler!',
    intro: (name: string) =>
      `Merhaba ${name}, siparişiniz başarıyla alındı.`,
    orderNo: 'Sipariş No',
    total: 'Toplam',
    delivery: 'Teslimat Tarihi',
    footer: 'Atelier Cake · Nişantaşı, İstanbul',
  },
  en: {
    subject: (n: string) => `Order received · ${n}`,
    heading: 'Thank you!',
    intro: (name: string) =>
      `Hello ${name}, your order has been received successfully.`,
    orderNo: 'Order No',
    total: 'Total',
    delivery: 'Delivery Date',
    footer: 'Atelier Cake · Nişantaşı, Istanbul',
  },
};

function renderHtml(data: OrderEmailData) {
  const c = COPY[data.locale];
  const price = new Intl.NumberFormat(
    data.locale === 'tr' ? 'tr-TR' : 'en-US',
    { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 },
  ).format(data.totalPrice);

  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#FAF7F2;padding:40px">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
      <div style="background:#1a1a1a;padding:32px;text-align:center">
        <h1 style="color:#C9A84C;font-family:Georgia,serif;margin:0">Atelier Cake</h1>
      </div>
      <div style="padding:32px">
        <h2 style="color:#1a1a1a;font-family:Georgia,serif">${c.heading}</h2>
        <p style="color:#555">${c.intro(data.customerName)}</p>
        <table style="width:100%;margin-top:24px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#999">${c.orderNo}</td><td style="text-align:right;font-weight:600">${data.orderNumber}</td></tr>
          <tr><td style="padding:8px 0;color:#999">${c.delivery}</td><td style="text-align:right">${data.deliveryDate}</td></tr>
          <tr><td style="padding:8px 0;color:#999">${c.total}</td><td style="text-align:right;color:#C9A84C;font-weight:700">${price}</td></tr>
        </table>
      </div>
      <div style="padding:20px;text-align:center;color:#aaa;font-size:12px;border-top:1px solid #eee">
        ${c.footer}
      </div>
    </div>
  </div>`;
}

const STATUS_COPY: Record<
  string,
  { tr: string; en: string }
> = {
  IN_PROGRESS: {
    tr: 'Siparişiniz hazırlanmaya başladı! 🎂',
    en: 'Your order is now being prepared! 🎂',
  },
  READY: {
    tr: 'Pastanız hazır! Teslimat için gün sayıyoruz.',
    en: 'Your cake is ready! We are counting down to delivery.',
  },
  DELIVERED: {
    tr: 'Siparişiniz teslim edildi. Afiyet olsun!',
    en: 'Your order has been delivered. Enjoy!',
  },
  CANCELLED: {
    tr: 'Siparişiniz iptal edildi.',
    en: 'Your order has been cancelled.',
  },
};

interface StatusEmailData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  status: string;
  locale: 'tr' | 'en';
}

export async function sendStatusUpdate(data: StatusEmailData) {
  const copy = STATUS_COPY[data.status];
  if (!copy) return { sent: false, reason: 'no-copy' };
  const apiKey = process.env.RESEND_API_KEY;
  const message = data.locale === 'tr' ? copy.tr : copy.en;

  if (!apiKey || apiKey.startsWith('re_xxx')) {
    console.info(
      `[email] (dev mode) Status "${data.status}" → ${data.customerEmail}: ${message}`,
    );
    return { sent: false, reason: 'no-api-key' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? 'Atelier Cake <onboarding@resend.dev>',
        to: data.customerEmail,
        subject: `${data.orderNumber} · ${message}`,
        html: `<div style="font-family:Inter,Arial,sans-serif;background:#FAF7F2;padding:40px">
          <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;text-align:center">
            <h1 style="color:#C9A84C;font-family:Georgia,serif">Atelier Cake</h1>
            <p style="color:#1a1a1a;font-size:18px">${message}</p>
            <p style="color:#999;font-size:13px">${data.orderNumber}</p>
          </div></div>`,
      }),
    });
    return { sent: res.ok };
  } catch {
    return { sent: false, reason: 'error' };
  }
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const c = COPY[data.locale];

  if (!apiKey || apiKey.startsWith('re_xxx')) {
    console.info(
      `[email] (dev mode) Order confirmation for ${data.customerEmail} · ${data.orderNumber}`,
    );
    return { sent: false, reason: 'no-api-key' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? 'Atelier Cake <onboarding@resend.dev>',
        to: data.customerEmail,
        subject: c.subject(data.orderNumber),
        html: renderHtml(data),
      }),
    });
    return { sent: res.ok };
  } catch (e) {
    console.error('[email] failed', e);
    return { sent: false, reason: 'error' };
  }
}
