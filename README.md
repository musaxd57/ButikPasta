# Atelier Cake 🎂

A full-stack **luxury bespoke cake boutique** for Istanbul-based customers.
Premium, bilingual (TR/EN), with a real-time **3D cake configurator**, gallery,
checkout, automated order emails, and a protected admin panel.

> _"Her Pasta, Bir Hikaye" · "Every Cake, A Story"_

---

## ✨ Features

- **Cinematic homepage** — animated gold tagline, brand story, featured carousel,
  Instagram-style grid, testimonials.
- **🎂 Interactive 3D cake configurator** (`/configure`) — the centerpiece.
  **Visual-first** (Tesla/BMW-configurator style): every option is a clickable
  swatch or photo tile — flavor sponge swatches, frosting texture swatches +
  colour dots, size/tier silhouettes, decoration photo tiles, drip-colour dots,
  and a live message font preview. **No dropdowns.** The React Three Fiber cake
  updates live across the 8-step flow with orbit/zoom, snapshot-to-PNG, and a
  live price calculator. Decorations are **real GLTF (.glb) models**.
- **Gallery** (`/gallery`) — masonry grid, category filters, lazy loading,
  lightbox detail with "Order Similar" CTA.
- **Order / checkout** (`/order`) — config summary, Zod-validated form,
  5-day-advance delivery rule, 50% deposit or full payment. On submit the order
  is saved then the customer is **redirected to Stripe Checkout** (when keys are
  set); without Stripe it falls back to in-app confirmation. WhatsApp fallback +
  automated TR/EN confirmation email.
- **About** (`/about`) — brand story, founder profile, values, press strip.
- **Admin panel** (`/admin`) — NextAuth login, dashboard stats, orders table with
  status updates, gallery & menu/pricing management. Dark luxury UI.
- **Bilingual** TR (default) / EN with `/tr` `/en` routing via `next-intl`.
- **Polish** — Framer Motion transitions, toast notifications, KVKK cookie
  consent, floating WhatsApp button, SEO meta/OG, sitemap, robots, skeletons.

## 🛠 Tech Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
React Three Fiber / drei (real GLTF assets) · Prisma + **PostgreSQL** ·
NextAuth · Stripe Checkout · next-intl · Zod · Zustand · Resend (email).

## 🎨 Design System

| Token | Value |
|-------|-------|
| Charcoal | `#1a1a1a` |
| Champagne Gold | `#C9A84C` |
| Ivory | `#FAF7F2` |
| Dusty Rose | `#C4896F` |

Typography: **Playfair Display** (headings) + **Inter** (body).

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local    # set DATABASE_URL to your PostgreSQL/Supabase URL
npm run models:generate       # build the GLTF (.glb) decoration assets
npx prisma db push            # create the PostgreSQL schema
npm run db:seed               # admin + gallery + pricing seed data
npm run dev                   # http://localhost:3000
```

> **Database:** uses **PostgreSQL**. For Supabase, use the *Session pooler* URL
> (port `5432`). Both `.env` (read by Prisma CLI) and `.env.local` (read by
> Next.js) are git-ignored; put your `DATABASE_URL` in them.
>
> **3D models:** real `.glb` assets live in `public/models/`. Regenerate them
> with `npm run models:generate`, or drop in any artist/CC0 `.glb` (e.g. from
> Meshy) with the same filename.
>
> **Stripe:** set `STRIPE_SECRET_KEY` to enable hosted Checkout; otherwise the
> checkout gracefully confirms in-app.

The site redirects `/` → `/tr`. Admin lives at `/admin`.

**Demo admin login:** `admin@ateliercake.com` / `atelier2024`
(configurable via `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## 🔑 Environment Variables

See [`.env.example`](./.env.example). Everything has safe local defaults —
Stripe and Resend gracefully fall back when unconfigured (orders still save and
confirmation emails log to the console in dev).

To go live: set real `STRIPE_SECRET_KEY` + `RESEND_API_KEY`, swap the Prisma
datasource `provider` to `postgresql`, and point `DATABASE_URL` at Postgres.

## 📁 Structure

```
prisma/                 schema + seed
messages/               tr.json · en.json (i18n)
src/
  app/
    [locale]/           localized public site (home, configure, gallery, order, about)
    admin/              protected admin panel (own root chrome)
    api/                orders, checkout (Stripe), auth (NextAuth)
    sitemap.ts robots.ts
  components/
    home/ configurator/ gallery/ order/ admin/ layout/ ui/
  lib/                  prisma, auth, pricing, validation, email, stripe, utils, data
  store/                Zustand configurator state (persisted)
  i18n/  types/
```

## 🧩 Renaming the Brand

The name "Atelier Cake" is a placeholder. Change `brand.name` in
`messages/tr.json` & `messages/en.json` — it propagates across navbar, footer,
metadata, and emails.

---

Made with care · Nişantaşı, İstanbul
