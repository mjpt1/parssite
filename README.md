# پارس انرژی — Pars Energy

A modern, cinematic, fully RTL **Next.js 14** marketing site for a Persian solar‑energy company, built for **lead generation**. Visitors scroll through a scroll‑scrubbed hero video, explore services, and submit a free‑evaluation form that is validated, stored in PostgreSQL, and emailed to the sales team.

---

## ✨ Features

- **Cinematic hero** — 400vh sticky section with a GSAP ScrollTrigger‑scrubbed `<video>`; Persian headlines fade/blur in at scroll milestones, ending in a CTA. Mobile gets an optional image‑sequence canvas fallback for smooth iOS Safari scrubbing.
- **Lead capture** — React Hook Form + Zod, posts to `/api/evaluation`, persists with Prisma, and sends an admin notification (Resend **or** SMTP/Nodemailer).
- **Sections** — sticky navbar, trust indicators, services, comparison table (table ⇄ stacked cards), process timeline (horizontal ⇄ vertical), news, “why us”, final CTA, footer.
- **Design system** — Tailwind tokens, Vazirmatn font (`next/font`), soft shadows, card UI, 1280px container, fully responsive & RTL, `prefers-reduced-motion` aware.

## 🧱 Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Framer Motion · lucide-react · React Hook Form · Zod · Prisma · PostgreSQL · Resend / Nodemailer

---

## 🚀 Getting started

```bash
# 1. Install dependencies (also runs `prisma generate`)
npm install

# 2. Configure environment
cp .env.example .env        # then edit DATABASE_URL (and email vars)

# 3. Generate placeholder images (solar-*.jpg, poster.jpg)
npm run gen:assets

# 4. Create the database schema
npm run db:push

# 5. Run the dev server
npm run dev                 # http://localhost:3000
```

> **Build:** `npm run build && npm start`

### Restricted networks (e.g. Iran)

If `npm install` fails while downloading the **Prisma engine** (`ECONNRESET` from `binaries.prisma.sh`), point Prisma at an accessible mirror before installing:

```powershell
# PowerShell
$env:PRISMA_ENGINES_MIRROR = "https://registry.npmmirror.com/-/binary/prisma"
npm install
```

```bash
# bash
PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma" npm install
```

The engine is cached after the first successful install, so `npm run dev` / `npm run build` don't need the mirror again.

## 🔐 Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `LEAD_NOTIFICATION_EMAIL` | – | Inbox that receives new‑lead emails |
| `EMAIL_FROM` | – | From address for notifications |
| `RESEND_API_KEY` | – | Use [Resend](https://resend.com) for email |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | – | SMTP via Nodemailer (alternative to Resend) |

Email is **optional**: leads are always stored in the DB. If no provider is configured, the lead is logged to the server console and the form still succeeds.

## 🗄️ Database

```prisma
model Lead {
  id             Int      @id @default(autoincrement())
  name           String
  phone          String
  city           String
  investmentType String
  powerUsage     String?
  spaceSize      String?
  description    String?
  createdAt      DateTime @default(now())
}
```

`npm run db:push` syncs the schema. Use `npm run db:studio` to browse leads.

---

## 🎬 Hero scroll animation (frame sequence)

For **buttery-smooth** scrubbing the hero does **not** seek `<video>.currentTime` (that snaps to sparse keyframes and looks "steppy"). Instead `hero.mp4` is pre-rendered into an image sequence in `public/frames/` that is drawn to a `<canvas>` as the user scrolls — the same technique Apple uses on its product pages.

- The scroll section is **700vh** tall, so the 10s clip is spread over a long, slow, cinematic scroll.
- Frames stream in progressively; the `<video>`/poster shows instantly and the canvas takes over once frames arrive. If `public/frames` is missing it falls back to scrubbing the `<video>`.

Regenerate the frames any time the video changes (uses the bundled ffmpeg — **no system ffmpeg needed**):

```bash
npm run gen:frames
# tune size/quality:  HERO_FPS=24 HERO_Q=7 npm run gen:frames
```

The current sequence is **241 frames @ 24fps, 1280×720 (~21 MB)**. If the frame count changes, update `FRAME_COUNT` in [`components/HeroScrollVideo.tsx`](components/HeroScrollVideo.tsx). For lighter payloads raise `HERO_Q` (more compression) or lower `HERO_FPS` (12 = half the frames). The source `hero.mp4` (~25 MB) is only the fallback/poster source — compress it before production.

## 📁 Structure

```
app/            layout, page, globals.css, api/evaluation/route.ts
components/      Navbar, HeroScrollVideo, TrustIndicators, Services,
                ComparisonTable, ProcessTimeline, NewsSection,
                WhyParsEnergy, EvaluationForm, FinalCTA, Footer
lib/            db.ts (Prisma), validation.ts (Zod), email.ts
prisma/         schema.prisma
public/         hero.mp4, logo.svg, solar-*.jpg, poster.jpg, frames/ (hero sequence)
scripts/        gen-assets.mjs, gen-frames.mjs
```

## 🧪 API

`POST /api/evaluation` — body: `{ name, phone, city, investmentType, powerUsage, spaceSize?, description? }`
Validates with Zod → stores the lead → emails admin → `201 { success, id, message }`. Validation errors return `400 { success:false, errors }`.

---

Placeholder imagery is generated and **not** licensed stock — replace `public/solar-*.jpg`, `poster.jpg`, and contact details before going live.
