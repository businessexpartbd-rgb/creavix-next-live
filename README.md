# Creavixit — AI Video Marketing Agency

Live production website for **Creavix IT Solution** (Creavixit) — Bangladesh's premier AI-powered video marketing studio. Cinematic ads for Meta, YouTube and TikTok, storytelling films and bilingual brand campaigns.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS 3** (custom dark/gold design system)
- **Lucide React** (icons)
- **Google Fonts**: Playfair Display, DM Sans, Hind Siliguri (Bengali)

## Pages

- `/` Home — hero, services, trust pillars, portfolio teaser, process, testimonials, CTA
- `/services` — full service catalog and delivery standards
- `/portfolio` — featured cinematic work + categorized short-form grids
- `/about` — founder-led story, studio approach, trust, stats
- `/pricing` — three packages (Launch / Growth / Signature) + FAQ
- `/contact` — WhatsApp-first contact form, channels, social touchpoints

Plus: `/sitemap.xml`, `/robots.txt`, custom 404, JSON-LD Organization schema.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm run start
```

This is a self-contained Next.js project — Vercel auto-detects the framework with no config. Just point Vercel at this repo's `main` branch.

## Project layout

```
/
├─ app/                      # Next.js App Router
│  ├─ layout.jsx             # Root layout, fonts, metadata, JSON-LD
│  ├─ page.jsx               # Home
│  ├─ globals.css            # Tailwind + design tokens
│  ├─ sitemap.js, robots.js, not-found.jsx
│  ├─ {about,services,portfolio,pricing,contact}/page.jsx
│  └─ components/            # Navbar, Footer, ServiceCard, etc.
├─ data/site-data.js         # Single source of brand info & content
├─ next.config.mjs
├─ tailwind.config.js
├─ postcss.config.mjs
├─ jsconfig.json
└─ package.json
```

All site content (services, pricing, contact, social links, portfolio) is editable in one place: **`data/site-data.js`**.

## Brand contact

- Hotline: **+880 9611-132835**
- WhatsApp: **+880 1890-484355**
- Email: info@creavixit.com
- Studio: Hemayetpur, Savar, Dhaka, 1340, Bangladesh
- Founder: Hannan Khan
- Serving since: 2014
