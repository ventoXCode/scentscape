# ScentScape Implementation Plan

> Prioritized gap analysis: specs vs. current codebase. Plan only — nothing implemented.
> Last updated: 2026-04-06 (Phase 5.4: Mobile product interactions — swipe-to-wishlist, long-press quick preview, pull-to-refresh on all catalog pages)

---

## Phase 0: Critical Bugs & Foundational Fixes (Do First)

**Why first:** These are broken features that undermine trust and basic functionality. Fixing them before building new features prevents compounding errors and wasted effort.

**Current state:** Several shipped features silently fail. Users encounter dead-end experiences with no feedback.

### 0.1 — Product listing filters are non-functional (critical) ✅
- [x] `/products/page.tsx` reads `searchParams` (`family`, `concentration`, `price`) but **never passes them to the Medusa query** — the call is always `medusa.store.product.list({ limit: 50 })` with no filters
- [x] Wire URL filter params to Meilisearch queries when filters are active (Medusa doesn't filter by metadata)
- [x] Verify filter ↔ result correspondence end-to-end after fix
- [x] Add pagination with PAGE_SIZE=24 and Previous/Next navigation

### 0.2 — Checkout success page param mismatch (critical) ✅
- [x] `CheckoutForm` Stripe `confirmPayment` passes `return_url` with `?cart_id=` but `/checkout/success/page.tsx` reads `?order_id=` — Stripe-redirected payments always show "Order not found"
- [x] Success page now accepts both `cart_id` and `order_id`; completes cart when `cart_id` is provided
- [x] Clear the cart cookie after successful checkout
- [x] Add error handling for invalid/missing params with helpful messaging

### 0.3 — Collection page brand display broken ✅
- [x] `SearchableProduct.brand` is a flat string but `ProductCard` expects `product.metadata?.brand` — brand never renders on collection pages
- [x] `ProductCard` now accepts optional top-level `brand` prop, falls back to `metadata.brand`
- [x] Removed `as any` cast in collection page — types are now compatible

### 0.4 — Accessibility blockers ✅
- [x] Cart drawer: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Escape-key close, restore focus on close
- [x] Performance ratings: `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={5}`, `aria-labelledby`
- [x] Variant selector: `role="radiogroup"` on container, `role="radio"` + `aria-checked` on each button
- [x] Search bar: combobox ARIA pattern with keyboard Up/Down/Enter/Escape navigation, `aria-activedescendant`
- [x] Add-to-cart button: `aria-live="polite"` region for cart and error announcements

### 0.5 — Silent error states ✅
- [x] Add-to-cart failure: visible error message with auto-dismiss, button turns red
- [x] Cart drawer empty state: "Start Shopping" CTA link to /products
- [x] Search bar: "No results found" dropdown with link to full search
- [x] Products page: error state with helpful message instead of misleading "run seed script"
- [ ] Register: `register()` makes 3 sequential API calls — if call 2 or 3 fails, user is left in partial state. (Deferred: requires backend changes)

### 0.6 — Missing footer ✅
- [x] Created `components/layout/footer.tsx` with Discover, Account, and Legal sections
- [x] Included in root `layout.tsx` after `<main>`

---

## Phase 1: Quiz Personality Engine (Priority #1)

**Why first:** The quiz is the hero product — the primary conversion funnel and brand differentiator. Every spec references it. The current implementation is a basic product filter, not a personality assessment. This is the single highest-impact rewrite.

**Current state (post-implementation):** 10-question branching personality quiz with 4-axis personality model (warmth↔freshness, boldness↔subtlety, classic↔avant-garde, intimate↔projecting). 10 named archetypes (Velvet Dusk, Morning Mist, Gilded Ember, etc.) matched via Euclidean distance. Questions span lifestyle/personality (environment, texture, time, music, impression, season) and fragrance-specific (experience, priorities/families branching, intensity, occasion). Non-deterministic recommendation engine with weighted random sampling from top 30 candidates, brand diversity enforcement (max 2/brand), multi-dimensional proportional scoring (family 30pts, accords 25pts, intensity 20pts, occasion 15pts, season 10pts). Natural language explanations per recommendation. URL-based step routing with localStorage persistence. Auto-advance on single-select, max selection limits on multi-select. Personality archetype card with gradient visual identity and dimension bars leads results. Frontend-only via Meilisearch.

### 1.1 — Personality model and archetypes ✅
- [x] Design multi-dimensional personality axes: warmth↔freshness, boldness↔subtlety, classic↔avant-garde, intimate↔projecting (4D space, each -1 to +1)
- [x] Create 10 named scent personality archetypes with descriptions, color palettes, visual identities: Velvet Dusk, Morning Mist, Gilded Ember, Silver Breeze, Crimson Bloom, Jade Garden, Midnight Reverie, Golden Hour, Electric Noir, Silk Whisper
- [x] Map each archetype to fragrance attribute affinities (families with 0-1 affinity scores, accord lists)
- [x] Define TypeScript interfaces for personality dimensions, archetypes, quiz sessions — `lib/quiz/types.ts`, `lib/quiz/personality.ts`

### 1.2 — Branching question flow (replace 5 linear steps) ✅
- [x] Design 10 questions as personality assessment: environment, texture, time of day, music, impression, season, experience level, priorities/families (branching), intensity, occasion
- [x] Implement branching logic: experience level determines whether "priorities" (beginner) or "families" (enthusiast) question appears; intermediates skip both
- [x] Total question count: 8-10 depending on path (beginner=10, intermediate=8, enthusiast=10)
- [x] Each question contributes to multiple personality dimensions via `dimensionShifts` plus accord/family boosts
- [x] Replace `QUIZ_STEPS` with dynamic `quiz-engine.ts` that evaluates branching conditions
- [x] Replace `QuizAnswers` with `QuizSession` multi-dimensional response model
- [x] Add URL-based step routing (`/quiz?step=environment`) with `useSearchParams` — browser back/forward works
- [x] Add localStorage persistence (`scentscape-quiz-session`) — page refresh restores progress

### 1.3 — Non-deterministic recommendation engine (replace `recommendation-engine.ts`) ✅
- [x] Replace single linear score with multi-dimensional scoring: family affinity (30pts), accord overlap (25pts), intensity match (20pts), occasion overlap (15pts), season bonus (10pts) — all proportional, not binary
- [x] Fix binary scoring: proportional credit for partial matches (close intensity = partial points, partial occasion overlap = proportional points)
- [x] Remove redundant gender pre-filter scoring — no longer part of the model
- [x] Fix boundary-value overlap: intensity ranges now non-overlapping (light 1-2.4, moderate 2.5-3.9, bold 4.0-5.0)
- [x] Implement weighted random selection from top 30 candidates using score^1.5 weighting (superlinear — favors top candidates while allowing variation)
- [x] Add brand diversity enforcement: max 2 per brand in final 8 results
- [x] Add minimum score threshold (15 pts) before inclusion
- [x] Add seasonal relevance scoring via season question → product season match
- [x] Generate per-recommendation natural language explanations ("As a Velvet Dusk, you're naturally drawn to...")
- [x] Derive scent personality archetype via Euclidean distance in 4D personality space
- [ ] Add price range awareness to scoring/filtering (deferred: no price preference question yet)
- [ ] Consider embedding-based similarity rather than rule-based matching (deferred: requires ML infrastructure)

### 1.4 — Immersive quiz UX (replace current minimal UI) ✅
- [x] Full-screen step design with clean white background, generous padding, emoji-driven visual identity per option
- [x] Progress bar retained (thin, elegant) — visual journey metaphor deferred to Phase 2 design system
- [x] Smooth CSS transitions between steps (opacity + translateX fade-out, 300ms)
- [x] Each question uses emoji-led option cards with responsive grid layout (1-3 columns based on option count)
- [x] Thumb-friendly option selection with scale + shadow feedback on selected state, checkmark indicator
- [x] Auto-advance on single-select steps (350ms visual feedback delay, then auto-next — no "Continue" click needed)
- [x] Emoji illustrations on all options (forest 🌲, leather 🖤, midnight 🌙, etc.) — full imagery deferred to Phase 2
- [x] Max selection limit on multi-select steps (priorities max 2, families max 3, occasion max 3) — replaces oldest selection when limit hit
- [x] "Analyzing your scent profile..." anticipation-building loading state with animated concentric rings and progressive messages
- [x] Visible "Step X of Y" indicator centered above question
- [x] Per-question unique color/imagery/layout — each quiz question has a `QuizQuestionTheme` with distinct background gradient, selection accent border, and checkmark color using fragrance family design tokens (woody, amber, citrus, aromatic, floral, fresh). Themes defined in `questions.ts`, applied in `quiz-step.tsx`.
- [ ] Swipe gesture navigation (deferred: requires touch event handling library)

### 1.5 — Results experience redesign (replace `quiz-results.tsx`) ✅
- [x] Lead with scent personality archetype: gradient card with name, tagline, full description, 4-axis personality dimension visualization
- [x] Per-recommendation: personalized natural language explanation ("As a Velvet Dusk, you're naturally drawn to amber fragrances — its vanilla and musk character speaks to your taste")
- [x] Display price on each result card via `formatPrice`
- [x] Color-coded match scores by range: emerald (75%+), amber (50-74%), gray (<50%)
- [x] Ranked results with numbered badges (1-8)
- [x] Family + top accords shown as pills on each result card
- [x] "Refresh Recommendations" button exploits non-determinism for new picks without retaking
- [x] Empty state with "Browse All Fragrances" CTA link
- [x] Error retry preserves answers (retry calls `getRecommendations` without resetting session)
- [x] Retake fully resets session and clears localStorage
- [x] "Explore More Like This" path from each recommendation — "Explore more like this →" link per result card navigates to `/search?family=X&accords=Y` using the recommendation's family and primary accord
- [ ] Feedback buttons per recommendation (deferred: requires backend persistence)
- [ ] Shareable results: unique URL, social card, downloadable image (deferred: requires backend quiz session storage — see 1.6)
- [ ] Save to account / recover via email (deferred: requires backend — see 1.6)

### 1.6 — Quiz data persistence (backend)
- [ ] API endpoint to save quiz sessions (answers + results + archetype)
- [ ] Link quiz results to customer account when authenticated
- [ ] Store scent personality profile on customer record
- [ ] API for quiz result retrieval by ID (for shareable URLs)

---

## Phase 2: Design System Foundation (Priority #2)

**Why second:** Every visual improvement in phases 3-7 depends on a cohesive design language. Without tokens and components, each feature will reinvent its own styling.

**Current state (post-implementation):** `globals.css` defines a full `@theme` token system with semantic colors (surface, text, border, accent, fragrance family, semantic), custom shadows (card, card-hover, elevated, modal), and custom spacing. Playfair Display serif font loaded alongside Inter via `next/font` with CSS variable integration (`--font-display`, `--font-body`). All 25+ component files migrated from ad-hoc Tailwind colors to semantic token classes. Header is now sticky with `bg-surface-elevated`. Shared UI component library created in `components/ui/` (Button, Input, Card, Badge, Skeleton). Collection colors migrated to fragrance family tokens. Footer uses `bg-surface-subtle`. Warm color palette (#FFFCF9 surfaces, #1A1613 text, #8B6914 accent gold, #9E3D5A accent rose) replaces flat black/white/gray. All buttons upgraded to `rounded-lg` with consistent hover states. All inputs get focus rings via `ring-border-focus`. Performance rating bars use `bg-accent-primary`.

### 2.1 — Typography system: serif/sans-serif pairing ✅
- [x] Select and integrate a serif display font (headings, hero text, editorial) alongside Inter (body) — Playfair Display
- [x] Define type scale via Tailwind v4 defaults (no override needed — standard scale is appropriate)
- [x] Apply consistently: `font-display` on all page headings, hero text, brand name; `font-body` on body via layout
- [x] Update `layout.tsx` to load both fonts via `next/font` with CSS variable integration

### 2.2 — Color palette and semantic tokens ✅
- [x] Define warm, sensory-rich palette evoking fragrance families: amber (#B8860B), deep floral (#C45B84), crisp green/fresh (#2D8F8F), smoky wood (#6B5B4F), citrus (#D4A017), aromatic (#4A7C59)
- [x] Create CSS custom properties in `globals.css` via `@theme` for semantic tokens:
  - Surfaces: `surface-primary` (#FFFCF9), `surface-elevated` (#FFFFFF), `surface-subtle` (#F5F0EA), `surface-overlay`
  - Text: `text-primary` (#1A1613), `text-secondary` (#6B6259), `text-muted` (#A39B91), `text-inverse`
  - Borders: `border-default` (#E8E0D6), `border-subtle`, `border-strong` (#C4B8AA), `border-focus` (#8B6914)
  - Accent: `accent-primary` (#8B6914 gold), `accent-secondary` (#9E3D5A rose) + hover variants
  - Fragrance families: fresh, floral, amber, woody, citrus, aromatic — each with main + subtle variant
  - Semantic: success, error, warning — each with main + subtle variant
- [x] Replace all hardcoded Tailwind color classes across 25+ component files
- [x] Consolidate `COLLECTION_COLORS` into fragrance family tokens
- [ ] Consolidate `ACCORD_COLORS` (22 entries) into token system (deferred: requires mapping 22 accord names to 6 family categories)
- [ ] Foundation for dark mode / seasonal theming (deferred: CSS variable swap approach ready, but no alternate theme defined yet)

### 2.3 — Spacing, shadow, and radius tokens ✅
- [x] Define spacing scale: `--spacing-section` (5rem) and `--spacing-section-sm` (3rem) supplement Tailwind defaults
- [x] Define shadow tokens: `shadow-card`, `shadow-card-hover`, `shadow-elevated`, `shadow-modal` — warm-tinted shadows using rgba(26,22,19,*)
- [x] Radius tokens: using Tailwind v4 defaults (not overridden to avoid breaking existing layouts) — consistent `rounded-lg` on buttons/inputs, `rounded-xl` on cards

### 2.4 — Component visual DNA ✅
- [x] Buttons: `components/ui/button.tsx` — primary, secondary, ghost, danger, success variants; sm/md/lg sizes; fullWidth option
- [x] Inputs: `components/ui/input.tsx` — consistent border, focus ring (border-focus), label, error state
- [x] Cards: `components/ui/card.tsx` — hover prop, padding variants, shadow-card/shadow-card-hover
- [x] Chips/tags: `components/ui/badge.tsx` — default, accent, success, error, and 6 fragrance family variants; sm/md sizes
- [x] Loading states: `components/ui/skeleton.tsx` — Skeleton, ProductCardSkeleton, ProductGridSkeleton
- [x] Barrel export: `components/ui/index.ts`
- [ ] Empty states: illustrated/styled placeholders (deferred: requires illustrations or icons)
- [x] Error states: toast notification system for async action feedback — `components/ui/toast.tsx` with `ToastProvider` context, `useToast` hook, stacked toasts (max 3) with auto-dismiss (success 3s, error 5s, info 4s), slide-in animation, `aria-live` region, mobile-aware positioning (bottom-center above bottom nav, desktop bottom-right). Wired into: add-to-cart (success + error), cart-drawer remove/update (error), wishlist toggle (success/info), login/register (success). Inline form validation errors retained on auth pages.
- [ ] Migrate existing components to import from `components/ui/` instead of inline styles (progressive adoption — tokens applied directly, shared components available for new code)

### 2.5 — Motion and micro-interaction layer ✅ (partial)
- [x] CSS-only entrance animations: `fade-in-up`, `fade-in`, `float` keyframes in `globals.css` via `@theme` animation tokens
- [x] `ScrollReveal` client component (`components/home/scroll-reveal.tsx`): IntersectionObserver-driven entrance animations with configurable delay
- [x] Define transition tokens: `--transition-timing-function-smooth` cubic-bezier easing, `slide-in-right`/`slide-out-right` animation keyframes in `globals.css`
- [x] Card hover states: `shadow-card` → `shadow-card-hover` + `border-border-strong` + image `scale-105` — already implemented in `product-card.tsx`
- [x] Cart drawer: slide-in/slide-out animation with CSS `translate-x` transition (300ms ease-smooth), overlay fade, deferred first render via `hasBeenOpened` state, `pointer-events-none` + `aria-hidden` when closed
- [x] Page transition patterns — Next.js View Transitions API enabled via `experimental.viewTransition`, CSS cross-fade rules for `::view-transition-old/new(root)`

### 2.6 — Fragrance-specific visual metaphors ✅ (partial)
- [x] Redesign scent pyramid: visual pyramid layout with progressive widths (72% → 86% → 100%), fragrance family color tokens per tier (citrus/floral/woody), educational annotations per tier ("First impression · fades in 15–30 minutes"), hoverable note chips with sensory description tooltips via `lib/fragrance/note-descriptions.ts` (100+ notes)
  - [x] Hoverable notes with sensory descriptions (CSS group-hover tooltips)
  - [x] Visual hierarchy showing temporal progression (top → heart → base) via width stepping and color coding
  - [x] Animate notes appearing tier by tier on scroll-entry — IntersectionObserver on scent pyramid container triggers staggered `animate-fade-in-up` per tier (150ms delay between tiers)
- [x] Redesign accord tags: swatch-style cards with colored dot + family color backgrounds using design token system, weighted sizing (first 3 accords larger), all accords linked to `/search?accords=X`
  - [x] Replaced hardcoded `ACCORD_COLORS` map with `ACCORD_FAMILY_MAP` → fragrance family design tokens
  - [x] Make accords clickable links to filtered product listing
- [x] Redesign performance ratings: SVG circular ring gauges replacing horizontal bars, verbal scale labels (Fleeting/Short/Moderate/Long-lasting/Legendary etc.), info icon tooltips explaining each metric, IntersectionObserver scroll-triggered fill animation
  - [x] Add verbal scale labels alongside numbers (e.g., "Moderate", "Long-lasting")
  - [x] Add contextual tooltips explaining what sillage/projection mean
  - [x] Use Intersection Observer to animate rings on scroll-entry
- [ ] Define distinct visual identities per fragrance family (color, pattern, illustration style)

---

## Phase 3: Homepage Transformation (Priority #3)

**Why third:** The homepage is the front door. After the design system exists and quiz is rebuilt, the homepage can properly showcase both.

**Current state (post-implementation):** Full-page homepage with 8 sections. `HeroSection` client component (`components/home/hero-section.tsx`) with full-viewport gradient background, rotating headline words, decorative floating orbs (CSS `float` animation), dual CTAs ("Find Your Scent" gold accent + "Browse Collection" outlined), and anxiety-reduction subline. 3-step value proposition explaining quiz flow with emoji icons. Featured fragrances section with editorial "Editor's Picks" framing and 4 product cards. `FragranceOfTheDay` async server component showing a daily rotating product spotlight (deterministic by day-of-year from Meilisearch). "Explore by Mood" section with first 4 mood cards and "See all moods" link. Social proof with 4 stat counters and 3 testimonial cards (simulated data). "Smarter Than a Filter" how-it-works section with 4 numbered steps explaining the personality-based matching engine. Final CTA re-inviting quiz participation. All below-fold sections use `ScrollReveal` (IntersectionObserver) for staggered fade-in-up entrance animations. `revalidate = 300` for ISR. Full `Metadata` export with OpenGraph tags.

### 3.1 — Immersive hero section ✅
- [x] Full-viewport hero with gradient overlays and decorative floating orbs (fragrance family colors, blur-3xl, CSS float animations)
- [x] Unmissable primary CTA ("Find Your Scent") with gold accent color + "Browse Collection" secondary CTA
- [x] Anxiety-reduction subline ("Free · 2 minutes · No account needed")
- [x] Animated rotating headline word (Signature → Perfect → Dream → Ideal → Unique) with crossfade transition
- [x] Above-the-fold content renders immediately (no data dependencies in hero)

### 3.2 — Value proposition section ✅
- [x] 3 visual cards with emoji icons explaining quiz flow: "Tell Us About You" → "We Analyze 100+ Scents" → "Get Personalized Picks"
- [x] Emphasizes personality-based approach, not generic quiz ("not a fragrance quiz, a you quiz")

### 3.3 — Social proof and trust ✅
- [x] 4 stat counters: 10,000+ quiz completions, 100+ fragrances, 10 scent personalities, 2 min average
- [x] 3 testimonial cards with user names, archetype labels, and avatar initials (simulated data)
- [ ] Brand partner logos / "as featured in" section (deferred: no brand partnerships yet)
- [ ] Community highlights or user-generated content teaser (deferred: no community features yet)

### 3.4 — Editorial and discovery content
- [x] Featured fragrances with editorial "Editor's Picks" framing and "View All" link
- [x] Fragrance 101 educational teaser section (implemented in Phase 7.3 — "Learn the Basics" section on homepage)
- [ ] Trending / seasonal picks with editorial framing (deferred: requires seasonal logic)
- [ ] Collection highlights with visual storytelling (deferred: requires collection hero images — Phase 4.6)

### 3.5 — Below-the-fold experience ✅
- [x] "Smarter Than a Filter" section with 4 numbered steps demystifying the matching engine
- [x] Progressive content layers that reward scrolling (6 distinct sections)
- [x] Scroll-driven entrance animations via `ScrollReveal` component (IntersectionObserver + fade-in-up + staggered delays)
- [x] Final CTA section re-inviting quiz participation ("Ready to Find Your Scent?")
- [x] `revalidate = 300` for ISR and full `Metadata` export with OpenGraph tags
- [ ] Lazy-loaded sections with blur placeholders / skeleton states (deferred: current sections are lightweight enough for immediate render)

---

## Phase 4: Product Discovery UX (Priority #4)

**Why fourth:** With the design system and quiz in place, product experience can leverage both visual language and quiz-driven personalization.

**Current state (post-implementation):** Product detail page uses `ImageGallery` client component with `next/image`, `priority` loading, and thumbnail strip for multi-image products. Breadcrumb navigation added (Home / Fragrances / Product). Sort controls exposed on both `/products` and `/search` pages (price asc/desc, longevity desc, sillage desc, sillage asc "Best for Beginners") via `SortSelect` component wired to Meilisearch `sortableAttributes`. Product cards enhanced with fragrance family color dot indicator, concentration badge, and contextual "Beginner Friendly" / seasonal badges. Products page uses Meilisearch for both filtering and sorting (falls back to Medusa only when no filters/sort active). Mood-based browsing at `/moods` with 8 vibe categories. "Fragrance of the Day" rotating spotlight on homepage. "Explore by Mood" homepage section. "New to Fragrance" beginner entry point.

### 4.1 — Fix product detail page image handling ✅
- [x] Replace `<img>` with `next/image` on product detail page via `ImageGallery` component with `priority` prop for LCP
- [x] Implement image gallery using `product.images` array with thumbnail strip navigation; falls back to `product.thumbnail` when no images array
- [x] Breadcrumb navigation added (Home / Fragrances / Product Title)
- [ ] Add blur placeholders / loading states for images (deferred: requires `blurDataURL` generation pipeline)

### 4.2 — Enhanced product cards ✅ (partial)
- [x] Add fragrance family visual indicator — color dot with family name badge, using `FAMILY_COLORS` mapped to design tokens (Fresh, Floral, Amber, Woody, Citrus, Aromatic)
- [x] Add concentration badge on product card image overlay
- [x] Add key mood/vibe and one standout note — Top note displayed on each product card from Meilisearch data
- [x] Hover state: expanded quick-preview overlay slides up from bottom showing description snippet and performance verbal labels (longevity/sillage), CSS-only transition with gradient backdrop
- [x] Visual badges: "Beginner Friendly" (sillage ≤ 2.5) and seasonal "Spring/Summer/Fall/Winter Pick" badges rendered in top-right corner of product card image, using `success-subtle` and `family-amber-subtle` design tokens. Badge data (sillage, longevity, season) passed from all Meilisearch-backed callers (products, search, collections, similar, moods).
- [x] Add `priority` prop on above-fold product card images for LCP optimization
- [x] Price range display for multi-variant products — Shows 'From $X' when multiple variant prices exist
- [x] Premium feel: refined aspect ratios, image treatments, typography — product card aspect ratio changed from 1:1 to 3:4 for editorial proportion, product title uses `font-display` serif for premium feel, brand name tracking widened, price highlighted with `accent-primary` color, improved vertical rhythm

### 4.3 — Product detail page enrichment ✅ (partial)
- [x] "Scent Journey" narrative: timeline-based component (`scent-journey.tsx`) describing opening → heart → drydown with auto-generated prose from note data, visual timeline with family-colored dots/lines
- [x] "Perfect For" section: editorial grid (`perfect-for.tsx`) with emoji icons, descriptive vibes per season/occasion, concentration-based wear tips — replaces raw season/occasion tags
- [x] "How to Wear" tips for fragrance newcomers — HowToWear component with concentration-based tips, pulse point guide, projection-aware advice
- [x] Cross-sell: "If you like this, explore..." based on note/accord similarity — covered by Similar Fragrances component
- [x] "Similar Fragrances" section based on note composition overlap — SimilarFragrances component using Meilisearch accord-based text search, shows top 4 similar products
- [x] Breadcrumb navigation
- [x] `generateStaticParams` for static generation of product pages + `revalidate = 300` ISR
- [x] Selected variant price update: prominent price display in `ProductPurchaseSection` updates on variant selection; variant selector migrated to design tokens

### 4.4 — Sorting and filter UX improvements ✅ (partial)
- [x] Expose sort controls on `/products` and `/search`: price (asc/desc), longevity (desc), sillage (desc) via `SortSelect` component using Meilisearch `sortableAttributes`
- [x] Fix `search-facets.tsx` semantic mismatch: switched to `type="radio"` inputs with `fieldset`/`legend` pattern and `role="radiogroup"` — matches single-select behavior
- [x] Add filter counts (how many products match each option) to prevent zero-result dead ends
- [x] Make filter options dynamic from catalog — ProductFilters accepts Meilisearch facet distribution, falls back to hardcoded options
- [x] Extended sort option: "Best for Beginners" (`sillage:asc`) added to `SortSelect` — shows gentlest-projecting fragrances first
- [ ] Add beginner-friendly filter tooltips explaining each option
- [ ] Visual filter icons instead of plain radio buttons/checkboxes

### 4.5 — Discovery mechanisms ✅ (partial)
- [x] Mood-based browsing: 8 mood categories (`lib/discovery/moods.ts`) with index page (`/moods`) and detail pages (`/moods/[slug]`). Moods: Main Character Energy, Quiet Luxury, Sunday Morning, After Dark, Fresh Start, Free Spirit, Sweet Escape, New to Fragrance. Each mood maps to Meilisearch filter + optional sort. Mood cards use gradient backgrounds, emoji identifiers, editorial copy. `generateStaticParams` for SSG, breadcrumb nav, product count. "Moods" added to header nav (desktop + mobile).
- [ ] Interactive fragrance wheel/map for visual landscape exploration
- [x] "Fragrance of the Day" rotating editorial spotlight: `FragranceOfTheDay` server component on homepage picks a product deterministically by day-of-year from Meilisearch index. Full-width card with image, brand, title, family/concentration badges, top notes, description excerpt, and price. Graceful null render if Meilisearch unavailable.
- [x] Beginner-friendly entry points: "New to Fragrance" mood page (`/moods/new-to-fragrance`) sorts by gentlest sillage first with beginner-oriented editorial copy. Homepage "Explore by Mood" section showcases first 4 moods with "See all moods" link. Moods index page has dedicated beginner callout with "Start Here" CTA.
- [x] Smart filter defaults: "Shop Your Profile" CTA on quiz results page links to `/search?family=X` for each high-affinity family, connecting quiz personality to filtered product browsing
- [x] Extended sort options: "Best for Beginners" (`sillage:asc`) added to SortSelect on both `/products` and `/search` pages

### 4.6 — Collection page upgrade ✅ (partial)
- [x] Editorial feel: collection detail pages have full-width hero section with family-colored background, emoji icon, tagline, editorial narrative paragraph, product count. Collection data model enriched with `tagline`, `editorial`, `icon`, `familyColor` fields.
- [x] Dynamic collections alongside curated: trending, seasonal, new arrivals — added 4 new collections: "Best for Beginners" (sillage ≤ 2.5, sorted asc), "Long-Lasting Legends" (longevity ≥ 4, sorted desc), "Spring Picks" (season = Spring), "Under $150" (price ≤ 15000). Added `searchSort` field to Collection interface, wired to Meilisearch sort param. 10 total collections, all SSG'd and in sitemap.
- [x] Distinct visual identity per collection: each card uses `FAMILY_STYLES` mapped from collection's `familyColor` field (icon background + card colors using fragrance family tokens)
- [ ] Support collection images (field exists in `Collection` interface as `image?: string` but unused — no image assets available)
- [x] Product counts shown on collection detail page hero
- [x] Add pagination for collections: PAGE_SIZE=24, `searchParams.page` URL-driven, `estimatedTotalHits` for total count, Previous/Next navigation matching products page pattern

---

## Phase 5: Mobile-First Experience (Priority #5)

**Why fifth:** Cross-cutting concern applied after core features exist. Many mobile patterns (bottom nav, swipe quiz, sticky CTAs) require the features they enhance to be built first.

**Current state (post-implementation):** Header is responsive with hamburger menu on mobile (`md:hidden`), animated slide-down mobile menu with search, nav links, and auth. Cart icon with bag SVG on mobile. Header is sticky (`sticky top-0 z-40`). Desktop nav hidden on mobile via `hidden md:flex`. Mobile menu closes on route change via `usePathname`. Cart drawer has slide-in/slide-out animation. Search bar moves into mobile menu on small screens.

### 5.1 — Mobile navigation ✅
- [x] Bottom navigation bar for mobile: Home, Shop, Quiz (hero center button), Cart (with badge), Account — `components/layout/bottom-nav.tsx` client component, fixed bottom-0, md:hidden, route-aware active states via `usePathname`, `aria-current="page"` on active item
- [x] Thumb-zone-aware placement: all 5 nav items in fixed bottom bar (bottom 40% of screen), Quiz as elevated center hero button with `bg-accent-primary` circle, cart opens drawer via shared `cartOpen` state in CartContext
- [x] Safe area inset handling: `pb-[env(safe-area-inset-bottom)]` on nav, `viewport-fit: cover` via Next.js `Viewport` export
- [x] Cart drawer state lifted to `CartContext` in `providers.tsx` so both Header and BottomNav can control it
- [x] Product page sticky add-to-cart bar repositioned to `bottom-16` to stack above bottom nav
- [x] Mobile hamburger menu: animated slide-down panel with search, nav links (Find Your Scent highlighted), auth controls; closes on route change; hamburger ↔ close icon toggle
- [x] Header already sticky (`sticky top-0 z-40 bg-surface-elevated`)

### 5.2 — Touch-first quiz ✅
- [x] Swipe left/right navigation between quiz steps — custom `useSwipe` hook (`hooks/use-swipe.ts`) with native touch events (no new dependencies). Swipe-right goes back, swipe-left advances on multi-select steps. `touch-pan-y` CSS preserves vertical scrolling. Threshold 50px, max vertical 100px.
- [x] Full-screen immersive steps — `min-h-[100dvh]` on all quiz containers (page, step, loading, results) accounts for mobile browser chrome. Directional slide animation (left/right) based on navigation direction.
- [x] Tap selection with visual/haptic feedback — `active:scale-[0.97]` press feedback on all buttons and option cards. `navigator.vibrate(10)` haptic tap on option select, continue, and swipe navigation (silent no-op on unsupported devices).
- [x] Compact progress indicator — mobile: dot indicator (`md:hidden`) with active step shown as elongated pill (w-6), completed dots filled, upcoming dots outlined. Desktop: retains thin progress bar. Both in fixed top bar with `backdrop-blur-sm`.
- [x] Sticky CTA on results page — mobile: fixed bottom bar with "Refresh" and "Retake" buttons, `backdrop-blur-sm`, safe-area-inset padding. Desktop: inline buttons unchanged. Results content padded `pb-36` on mobile to prevent CTA overlap. Result thumbnails migrated from `<img>` to `next/image`.

### 5.3 — Mobile-optimized layouts
- [x] Product detail: sticky add-to-cart bar on mobile (`fixed bottom-0 z-30 md:hidden`) with price + button, desktop inline button, bottom spacer to prevent content overlap
- [x] Image gallery: swipeable carousel with dot indicator on mobile — `useSwipe` hook for touch navigation, slide animations, prev/next arrows on desktop, image counter badge on mobile, dot indicator with active pill state. Thumbnail strip preserved for desktop.
- [x] Filters: `FilterLayout` component — desktop sidebar, mobile bottom sheet overlay with slide-up animation, "Show Results" button, route-change auto-close. Applied to both `/products` and `/search` pages.
- [x] Search bar: fluid width on mobile (`w-full sm:w-64`), touch-friendly tap targets (`min-h-[52px]` suggestion rows, larger link targets), `touchstart` outside-click handler for reliable mobile dismiss
- [x] Checkout: mobile-optimized with single-column stacking address fields (`grid-cols-1 sm:grid-cols-2`), 44px touch targets on all inputs (`py-3`), `inputMode="numeric"` on postal code, responsive step indicator, minimum touch width on Back button, order summary shown first on mobile, `lg:sticky` scoped sidebar, `next/image` for thumbnails

### 5.4 — Mobile product interactions ✅
- [x] Product card swipe actions (save to wishlist) — `SwipeableProductCard` client wrapper (`components/product/swipeable-product-card.tsx`) wraps each `ProductCard` on products, search, collections, and moods pages. Swipe-left reveals a wishlist toggle panel (72px action area) with haptic feedback. Touch gesture tracking with drag threshold, smooth spring-back transition, and click prevention during swipe to avoid accidental navigation. Desktop: wrapper uses `md:contents`/`md:hidden` pattern so cards render as direct grid children with no swipe behavior.
- [x] Long-press quick preview on product cards — 500ms long-press triggers a centered modal overlay (`md:hidden`) with product title, brand, family/concentration badges, price, description (3-line clamp), longevity/sillage verbal labels, wishlist toggle, and "View Details" link. Haptic feedback on activation. Dismiss on tap outside. `role="dialog"` + `aria-modal` for accessibility.
- [x] Pull-to-refresh on catalog/collection pages — `PullToRefresh` client component (`components/ui/pull-to-refresh.tsx`) wraps page content on products, search, collections, and moods pages. Touch-pull-down from top of page (with resistance factor 0.4) shows spinner indicator; release past 80px threshold triggers `router.refresh()` for ISR revalidation. Mobile-only (`md:hidden`), desktop passthrough.

### 5.5 — Performance targets
- [ ] Lighthouse mobile score > 90
- [ ] FCP < 1.5s on 4G
- [ ] Responsive srcset with AVIF/WebP and quality fallbacks (next/image configured with `formats: ["image/avif", "image/webp"]` — verify usage across all images, especially product detail which uses `<img>` not `<Image>`)
- [ ] Minimize JS bundle for initial load
- [ ] Service worker for offline quiz access (foundation)

---

## Phase 6: Monetization Architecture (Priority #6)

**Why sixth:** Revenue infrastructure layers on top of the product experience. Requires product pages, quiz results, and the full browsing experience to be in their final form.

**Current state:** Direct B2C sales only (Medusa + Stripe). Product prices $95-$225 in seed data (all products use identical 3-variant pricing: 30mL/$95, 50mL/$145, 100mL/$225). No affiliate links, no sample boxes, no subscriptions, no partnerships. Quiz connects to revenue only via "browse these products." Full checkout flow exists (3-step: shipping → payment → review) with Stripe Elements. Wishlist is entirely a stub page ("coming soon") with no backend, no data model, no add-to-wishlist button anywhere. Cart is never associated with a customer account on login (guest cart not transferred).

### 6.1 — Affiliate commerce infrastructure
- [x] Design affiliate link component: "Buy at [Retailer]" buttons with tracking params — `components/product/affiliate-links.tsx` with `AffiliateLinks` component, compact mode for quiz cards, disclosure text
- [x] Integrate on product detail pages (primary purchase path alongside existing add-to-cart) — below purchase section with full 3-retailer layout
- [x] Integrate on quiz result pages (each recommendation links to retailers) — compact 2-retailer buttons below each result card
- [x] Affiliate click tracking and attribution — `gtag` event hook for `affiliate_click` with retailer ID and product handle
- [x] Support multiple retailers per product (Sephora, Nordstrom, FragranceNet) — 3 retailers configured in `lib/affiliate/retailers.ts` with URL templates, taglines, and branded colors
- [x] Transition messaging: ScentScape as recommendation layer, not only direct seller — disclosure "ScentScape may earn a commission from purchases made through these links"

### 6.2 — Sample box foundation
- [ ] "Try Before You Buy" concept: quiz results → curated sample kit
- [ ] Sample box product page / ordering flow ($20-$40 price point)
- [ ] Integration with quiz results: "Get these 5 as samples"
- [ ] Backend: sample box as a Medusa product type with dynamic composition

### 6.3 — Premium tier foundation (do not gate quiz)
- [x] Wishlist implementation — frontend with localStorage persistence
  - [x] Frontend: add-to-wishlist button on product cards and detail pages
  - [x] Header: wishlist icon with count badge (desktop and mobile)
  - [x] Account: wishlist page with saved products, remove button, empty state
  - [ ] Backend: wishlist data model and API endpoints (deferred: using localStorage for now)
- [ ] User account scent profile persistence (saved quiz results, history)
- [x] Cart-customer association on login (guest cart → customer cart merge)
  - [x] `transferGuestCart()` in `auth-actions.ts` calls `medusa.store.cart.transferCart` after login/register with the customer's auth token
- [ ] Foundation for gating infrastructure: identify which features could be premium
- [ ] Premium feature candidates: AI advisor, saved profiles, community features, monthly scent briefing

---

## Phase 7: Educational Content Layer (Priority #7)

**Why last:** Education is woven into every surface — it requires all surfaces to exist first. This phase adds the learning layer on top of everything built in Phases 1-6.

**Current state:** Zero educational content anywhere. Product pages list notes/accords with no explanation. No glossary, guides, tooltips, or contextual help. No blog or editorial section. No content pages exist beyond the core commerce pages. Empty/no-results states are dead-ends with plain text.

### 7.1 — Contextual education (in-product) ✅ (partial)
- [x] Concentration tooltips on product filters (`product-filters.tsx`) and search facets (`search-facets.tsx`): hover `?` icon reveals description (EDC through Extrait) with duration and character
- [x] Scent family tooltips on product filters and search facets: hover `?` icon reveals what each family (Fresh, Floral, Amber, Woody, Citrus, Aromatic) smells like
- [x] Fragrance glossary utility (`lib/fragrance/glossary.ts`): centralized definitions for concentration types, scent families, and performance metrics
- [x] Quiz steps: educational hints on experience, families, intensity, and season questions — rendered as subtle `bg-surface-subtle` cards below the subtitle. `hint` field added to `QuizQuestion` type.
- [x] Scent pyramid: educational intro paragraph ("A fragrance unfolds in three layers..."), hoverable tier labels (Top/Heart/Base Notes) with detailed explanations of why each tier behaves differently
- [x] Note hover tooltips on scent pyramid (pre-existing: 117 note descriptions via `note-descriptions.ts`)
- [x] Performance rating tooltips with verbal scale labels (pre-existing: `performance-ratings.tsx`)
- [x] "What is [note]?" expandable cards on product pages — native `<details>`/`<summary>` accordion in `RelatedEducation` component, shows note descriptions from `note-descriptions.ts` with tier labels and "Learn more" links to note profile pages

### 7.2 — Standalone educational content ✅ (partial)
- [x] `/learn` educational hub landing page with guide cards, family quick-nav, and quiz CTA
- [x] `/learn/fragrance-101` — comprehensive beginner guide covering scent pyramid, concentrations (EDC→Extrait), fragrance families, performance metrics, and how to find your signature scent. Sources data from `glossary.ts`.
- [x] `/learn/how-to-apply` — practical guide covering application amounts by concentration, 6 pulse points with tips, timing advice, layering technique, common mistakes, and storage tips
- [x] `/learn/families` — overview of all 6 families with signature notes, linking to detail pages
- [x] `/learn/families/[slug]` — deep dive pages for each family (Fresh, Floral, Amber, Woody, Citrus, Aromatic) with history, characteristics, signature notes with descriptions from `note-descriptions.ts`, subfamilies, when-to-wear, personality profile, and browse CTA linking to `/search?family=X`. `generateStaticParams` for SSG. Prev/next family navigation.
- [x] `/learn/glossary` — comprehensive glossary with 4 sections (Concentrations, Families, Performance Metrics, General Terms with 18 entries including Accord, Drydown, Flanker, Gourmand, Nose Blindness, Skin Chemistry, etc.). Jump-nav anchors. Families link to detail pages.
- [x] Data layer: `lib/learn/families.ts` (6 families with extended data, `getNotesForFamily` helper pulling from `note-descriptions.ts`) and `lib/learn/guides.ts` (guide metadata)
- [x] Note profiles: `/learn/notes` index (117 notes grouped by family with jump-nav) + `/learn/notes/[slug]` detail pages with description, family context, Meilisearch-powered product discovery, related notes, prev/next navigation. `generateStaticParams` for SSG (93 pages). Added to sitemap, footer, and learn hub.
- [ ] Seasonal guides: "Best Fragrances for Summer," "Holiday Gift Guide" — deferred

### 7.3 — Content integration across surfaces ✅ (partial)
- [x] Homepage: "Learn the Basics" educational teaser section with 3 guide cards (Fragrance 101, How to Apply, Scent Families) and "See all guides" link — positioned between Mood browsing and Social Proof sections
- [x] Search: no-results state enriched with quiz CTA, Browse by Mood, Fragrance 101, and Explore Families links (replaces plain text)
- [x] Header: "Learn" link added to desktop nav and mobile menu
- [x] Footer: new "Learn" column with links to Fragrance 101, How to Apply, Fragrance Families, and Glossary
- [x] Sitemap: all learn pages and family pages added with monthly changeFrequency
- [x] Product pages: `RelatedEducation` component shows contextual links to family page, note profile pages (up to 3 key notes), and concentration guide based on the product's fragrance data
- [x] Quiz results: educational section shows links to the user's top-affinity family pages, fragrance notes guide, and Fragrance 101 based on their archetype
- [ ] Empty states: fill other dead-ends with relevant learning content — deferred

### 7.4 — SEO and content marketing ✅ (partial)
- [x] Target long-tail keywords: note profile pages (`/learn/notes/[slug]`) with "What Does X Smell Like?" title pattern (93 SSG pages), family pages with "X Fragrances — What They Smell Like" pattern (6 pages)
- [x] Internal linking strategy: `RelatedEducation` on product pages links to family/note/concentration guides; note profile pages server-render product links (previously client-only, invisible to crawlers); family pages link to search and quiz
- [ ] Build topical authority in fragrance discovery and education
- [x] Enrich product JSON-LD: `AggregateOffer` for multi-variant products, `category` from fragrance family, fragrance-specific `additionalProperty` fields (family, concentration, gender, top/heart/base notes, accords, seasons, longevity, sillage). `@id` for deduplication.
- [x] `WebSite` JSON-LD with `SearchAction` on root layout — enables Google sitelinks search box
- [x] `BreadcrumbList` JSON-LD on product detail pages — structured breadcrumb for rich results
- [x] Sitemap improvements: added mood detail pages (`/moods/[slug]`), wishlist page; fixed `lastModified` to use stable dates instead of `new Date()` on static pages; typed products properly
- [x] Article JSON-LD (`ArticleJsonLd` component) on all learn pages: fragrance-101, how-to-apply, families/[slug], notes/[slug] — with BreadcrumbList schema
- [x] FAQPage JSON-LD (`FaqJsonLd` component) on glossary page — 30+ structured Q&A pairs from concentrations, families, metrics, and general terms
- [x] Metadata exports added to products listing page and quiz page (via layout.tsx for client component)
- [x] NoteProducts server-rendered — product links on 93 note profile pages now in initial HTML for crawler visibility
- [ ] Add `aggregateRating` to product JSON-LD (deferred: requires review/rating system)

---

## Existing Features — No Action Required

These are implemented and functional (unless noted in Phase 0 bugs):

- **Medusa backend:** Fragrance data model (`fragrance-data.ts`) with full note pyramid, accords, performance metrics (longevity/sillage/projection on 1-5 scale), family/sub_family/gender/season/occasion, concentration enum (EDC/EDT/EDP/Parfum/Extrait). `FragranceModuleService` with `getByProductId`, `getByProductIds`, `upsertForProduct`. Partial unique index on `product_id` with soft-delete support.
- **Meilisearch integration:** Product sync subscriber (`product-sync.ts`) on `product.created`/`product.updated`. Denormalizes product + fragrance data into flat search documents. Searchable/filterable/sortable attributes configured correctly.
- **Search bar (`search-bar.tsx`):** Autocomplete with 200ms debounce, 5 suggestions, proper dropdown UX with click-outside handling.
- **Search page (`search/page.tsx`):** Full Meilisearch integration with faceted filtering (family, concentration, gender, accords, season) — working correctly with `<Suspense>` boundary.
- **Search facets (`search-facets.tsx`):** 5 facet groups with count display, toggle behavior, clear-all button (URL-driven).
- **Cart and checkout flow:** Full Stripe Elements integration, 3-step wizard (shipping → payment → review), cart drawer with quantity management, `getOrCreateCart` with cookie persistence.
- **Auth system (`auth-actions.ts`):** Registration, login, logout, profile update — cookie-based JWT with httpOnly secure cookies (7-day TTL, sameSite lax).
- **Order history (`orders/page.tsx`):** Server-rendered order list with line items, status badges, and date formatting.
- **SEO basics:** Dynamic sitemap (`sitemap.ts`), robots.txt (`robots.ts`), product JSON-LD (`product-jsonld.tsx`), OG images (`opengraph-image.tsx`), security headers in `next.config.ts` (X-Frame-Options DENY, X-Content-Type-Options nosniff, strict referrer policy).
- **Seed data (`seed-data.ts`):** 100 fragrances with complete metadata. All use Unsplash placeholder images (not unique per fragrance).
- **API route:** GET `/store/products/:id/fragrance` endpoint returning fragrance data by product ID.
- **Providers (`providers.tsx`):** React Query + Cart context with `useCart` hook. Note: `QueryClient` instantiated at module scope (should be in `useState` for SSR safety) and not actually used for data fetching — cart state uses plain `useState`.
- **Medusa client (`client.ts`):** Configured with publishable key and debug mode.
- **Image optimization:** `next.config.ts` configured for AVIF/WebP with remote patterns (`hostname: "**"`). `optimizeCss: true` experimental flag enabled.
- **Price formatting:** `formatPrice` utility divides by 100 and formats via `Intl.NumberFormat` (defaults to USD).

---

## Cross-Cutting Concerns (Apply Throughout)

- **Accessibility:** Ensure all new components meet WCAG 2.1 AA (focus management, ARIA labels, color contrast, keyboard navigation). Existing components have significant gaps documented in Phase 0.4.
- **Performance budgets:** FCP < 1.5s, Lighthouse > 90 mobile, lazy-load below-fold. Add explicit `revalidate` directives to data-fetching pages (currently only product detail has `revalidate: 60`; homepage and product listing have none).
- **Image optimization:** Already configured for AVIF/WebP; ensure all new imagery uses `next/image` with responsive srcset. Fix product detail page `<img>` → `<Image>` and search dropdown `<img>` → `<Image>`.
- **Error handling:** Replace silent `catch {}` blocks with styled error states; add toast notifications for cart/auth actions. Fix register's 3-call sequence partial failure states.
- **TypeScript:** Maintain strict typing for all new code; eliminate `as any` casts in `cart-drawer.tsx`, collection pages, and orders page. Define proper Medusa cart/order types.
- **State management:** Consider migrating cart state to React Query (`useQuery`/`useMutation`) for caching, background refetch, and optimistic updates — TanStack Query is installed but unused.
- **Auth gaps:** No password change capability, no "forgot password" flow, no email verification. Cart not associated with customer on login. JWT logout only clears local cookie (server-side token remains valid until expiry).
