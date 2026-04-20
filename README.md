# PurplePulse News (Next.js + MongoDB + Tailwind)

## Stack
- Next.js (App Router)
- MongoDB (native driver)
- Tailwind CSS

## Features
- Landing home page
- Dedicated news index page (`/news`)
- Dynamic individual article routing (`/news/[slug]`)
- Relevant-news sidebar on each article
- SSR server components for pages
- Caching with `unstable_cache` + revalidation tags
- Admin panel (`/admin`) for posting news and advertisement banners
- REST endpoints:
  - `GET/POST /api/news`
  - `GET/POST /api/ads`

## Run locally
```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.
