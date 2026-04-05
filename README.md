# ScentScape

A fragrance discovery and shopping platform built with Next.js 15 and MedusaJS 2.0. Browse 100+ fragrances, take a personalized scent quiz, and shop with full checkout.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4 |
| Backend | MedusaJS 2.0 (headless commerce) |
| Database | PostgreSQL 16 |
| Search | Meilisearch |
| Payments | Stripe |
| Monorepo | Turborepo, pnpm workspaces |

## Features

- **Scent Quiz** — 5-step interactive quiz that recommends fragrances based on preferences (mood, family, intensity, occasion)
- **Product Catalog** — Detailed fragrance pages with scent pyramids (top/heart/base notes), performance ratings, and accords
- **Search & Filtering** — Full-text search with faceted filters (family, concentration, gender, season, price)
- **Shopping Cart & Checkout** — Cart management, address forms, and Stripe payment integration
- **User Accounts** — Registration, login, order history, and wishlist
- **SEO** — JSON-LD structured data, Open Graph images, sitemap, and security headers

## Project Structure

```
apps/
  api/          MedusaJS backend with custom fragrance module
  web/          Next.js storefront
packages/       Shared packages (currently empty)
scripts/        Data generation utilities
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose (for Postgres, Redis, Meilisearch)

## Getting Started

**1. Clone and install**

```sh
git clone https://github.com/<your-org>/scentscape.git
cd scentscape
pnpm install
```

**2. Start infrastructure**

```sh
docker compose up -d
```

This starts PostgreSQL, Redis, and Meilisearch.

**3. Configure the API**

```sh
cp apps/api/.env.template apps/api/.env
```

Edit `apps/api/.env` with your Stripe key and admin credentials if needed.

**4. Set up the database and seed data**

```sh
cd apps/api
npx medusa db:create
npx medusa db:migrate
npx medusa exec ./src/scripts/create-api-key.ts
npm run seed
```

**5. Configure the storefront**

Create `apps/web/.env.local`:

```
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<key from step 4>
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=masterkey
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**6. Run the dev servers**

```sh
# From project root
pnpm dev
```

- Storefront: http://localhost:3000
- Medusa API: http://localhost:9000
- Medusa Admin: http://localhost:9000/app
- Meilisearch: http://localhost:7700

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `npm run seed` (in `apps/api`) | Seed 100 fragrances with variants and pricing |

## License

Private — all rights reserved.
