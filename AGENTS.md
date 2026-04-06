# ScentScape — Operational Guidelines

## Build & Run

```bash
# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL, Redis, Meilisearch)
docker compose up -d

# Dev servers (from root)
pnpm dev          # runs both api + web via turbo

# Individual apps
cd apps/api && pnpm dev    # Medusa backend on :9000
cd apps/web && pnpm dev    # Next.js frontend on :3000
```

## Validation

- **Build**: `cd apps/web && pnpm build`
- **Typecheck**: `cd apps/web && pnpm tsc --noEmit`
- **Lint**: `cd apps/web && pnpm lint`

## Project Structure

- **Monorepo**: pnpm workspaces + Turbo
- **Frontend**: `apps/web/` — Next.js 15, React 19, Tailwind CSS 4, TypeScript 5
- **Backend**: `apps/api/` — Medusa 2.0, PostgreSQL 16, Redis 7, Meilisearch 1.11
- **Pages**: `apps/web/app/` — App Router (layouts, pages, server actions)
- **Components**: `apps/web/components/` — organized by feature (quiz/, product/, checkout/, cart/, etc.)
- **Lib**: `apps/web/lib/` — utilities, clients, actions, configs
- **Specs**: `specs/` — behavioral requirement documents (source of truth)

## Codebase Patterns

- **Styling**: Tailwind CSS 4 utility classes only — no CSS modules, no styled-components
- **State**: React Context (cart), TanStack React Query (server state), Server Actions (mutations)
- **Auth**: Medusa session-based, HTTP-only cookies (`auth_token`, `cart_id`)
- **Images**: Next.js `<Image>` component with AVIF/WebP optimization
- **Fonts**: Google Inter via `next/font/google`
- **Data fetching**: Server Components by default, client components only when interactivity required
- **Search**: Meilisearch for full-text + faceted search
- **Payments**: Stripe Elements API via `@stripe/react-stripe-js`

## Operational Notes

- Quiz recommendation engine lives in `apps/web/lib/recommendation-engine.ts`
- Fragrance data model in `apps/api/src/modules/fragrance/`
- Seed data (100 fragrances) in `apps/api/src/scripts/seed-fragrances.ts`
- Product images are external URLs (Unsplash/Pexels) stored in Medusa
- The quiz is entirely client-side — no backend persistence of quiz state or results
- Meilisearch index must be seeded separately after Medusa data is loaded
