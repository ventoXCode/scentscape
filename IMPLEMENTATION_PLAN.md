# ScentScape Implementation Plan

> Prioritized gap analysis: specs vs. current codebase. Plan only — nothing implemented.
> Last updated: 2026-04-06 (full re-audit with parallel codebase analysis)

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

**Current state:** 5 hardcoded linear steps (`["gender","mood","family","intensity","results"]`). `QuizAnswers` interface holds: `gender` (single-select, 3 options), `moods` (multi-select, 6 options, no max), `families` (multi-select, 4 options), `intensity` (single-select, 3 options), `occasions` (multi-select, 5 options). Deterministic scoring in `recommendation-engine.ts`: family (30pts) + intensity (25pts) + occasion (20pts) + gender (15pts) + mood (10pts) = 100. All dimensions are strictly binary (0 or full points — no partial credit). Gender and family are already pre-filtered via Meilisearch, making their scoring redundant (~55 points almost always awarded). Same inputs always produce identical ranked output. `MOOD_TO_ACCORDS` and `INTENSITY_TO_PERFORMANCE` are hardcoded lookup tables with boundary-value overlap bugs (2.5 and 4.0 score for both adjacent ranges). Results are a flat list of 10 product cards with match percentages and generic reasons. No personality insight, no explanation, no branching, no result saving/sharing. No URL-based step routing (browser back button breaks quiz). No localStorage persistence (refresh resets everything). No step transition animations. Frontend-only via Meilisearch.

### 1.1 — Personality model and archetypes
- [ ] Design multi-dimensional personality axes (e.g., warmth↔freshness, boldness↔subtlety, classic↔avant-garde, intimate↔projecting)
- [ ] Create 8-12 named scent personality archetypes with descriptions, color palettes, visual identities (e.g., "Velvet Dusk," "Morning Mist," "Gilded Ember")
- [ ] Map each archetype to fragrance attribute affinities (families, accords, notes, intensity ranges)
- [ ] Define TypeScript interfaces for personality dimensions, archetypes, quiz sessions

### 1.2 — Branching question flow (replace 5 linear steps)
- [ ] Design 8-12 questions that feel like personality assessment, not product filtering:
  - Lifestyle/personality: environment preference (forest, beach, city rooftop, cozy cabin, garden), texture preference (silk, leather, linen, velvet, wool), time of day, music genre, how they want to be remembered
  - Sensory preference: visual, tactile, olfactory associations
  - Fragrance-specific: intensity, occasion, experience level
- [ ] Implement branching logic: certain answers unlock follow-up questions
- [ ] Ensure total question count stays 8-12 regardless of path
- [ ] Each question contributes to multiple personality dimensions simultaneously
- [ ] Replace `QUIZ_STEPS` constant with dynamic step engine
- [ ] Replace `QuizAnswers` interface with multi-dimensional response model
- [ ] Add URL-based step routing so browser back button works
- [ ] Add localStorage persistence so page refresh doesn't reset progress

### 1.3 — Non-deterministic recommendation engine (replace `recommendation-engine.ts`)
- [ ] Replace single linear score (`calculateMatchScore` — 5 fixed weighted binary factors) with multi-dimensional proportional scoring across personality axes
- [ ] Fix binary scoring: proportional credit for partial matches (3 of 5 families > 1 of 5)
- [ ] Remove redundant scoring for pre-filtered dimensions (gender already filtered in Meilisearch query, yet scored for 15pts)
- [ ] Fix boundary-value overlap in `INTENSITY_TO_PERFORMANCE` (2.5 and 4.0 score for both adjacent ranges)
- [ ] Implement weighted random selection from top-N qualifying fragrances (controlled randomness — same inputs should NOT always produce identical results)
- [ ] Add brand diversity enforcement (top 10 currently could all be from one brand)
- [ ] Add minimum score threshold before inclusion in results
- [ ] Add seasonal relevance and trending factors to scoring
- [ ] Generate per-recommendation natural language explanations ("Because you value mystery and chose midnight energy...")
- [ ] Derive user's scent personality archetype from dimensional scores
- [ ] Add price range awareness to scoring/filtering
- [ ] Consider embedding-based similarity rather than rule-based matching

### 1.4 — Immersive quiz UX (replace current minimal UI)
- [ ] Full-screen step design with imagery, color, and animation per question (current: `min-h-screen bg-gray-50` with `max-w-2xl` centered container)
- [ ] Replace progress bar (currently: thin black bar, `h-1 bg-black`) with visual journey metaphor
- [ ] Smooth directional transitions between steps (swipe-ready)
- [ ] Each question visually distinct (unique imagery/color/layout) — current steps all share identical card-grid layout with pastel color variants
- [ ] Thumb-friendly option selection with satisfying visual/haptic feedback
- [ ] Auto-advance on single-select steps (gender, intensity currently require extra "Continue" click)
- [ ] Add images/illustrations to mood and family options (mood step type comment says "mood images" but none exist)
- [ ] Add max selection limit on multi-select steps (currently all 6 moods can be selected, diluting scoring)
- [ ] "Analyzing your scent profile..." anticipation-building loading state (current: generic spinner with "Finding your perfect matches...")
- [ ] Visible "Step X of Y" indicator alongside progress bar

### 1.5 — Results experience redesign (replace `quiz-results.tsx`)
- [ ] Lead with scent personality archetype: name, description, visual identity, shareable card (current: "Your Scent Matches" heading with flat product list)
- [ ] Per-recommendation: personalized explanation (current: generic `matchReasons` like "Matches your fresh preference", only first 2 reasons shown)
- [ ] Display price on each result card (currently absent)
- [ ] Meaningful score visualization (graduated bar or radial, not just green `bg-green-100` badge regardless of score)
- [ ] Color-coded scores by range (green/yellow/red)
- [ ] "Explore More Like This" path from each recommendation
- [ ] Feedback buttons per recommendation: "Love this" / "Not for me"
- [ ] Shareable results: unique URL, social card (OG image), downloadable profile image
- [ ] Save to account (if logged in) or recoverable via email
- [ ] "Retake" resets; also offer lighter "refine" alternative
- [ ] Empty state if no results (currently renders empty list with no message)
- [ ] Error retry that doesn't reset all answers (current error state calls `onRetake` which resets the entire quiz)

### 1.6 — Quiz data persistence (backend)
- [ ] API endpoint to save quiz sessions (answers + results + archetype)
- [ ] Link quiz results to customer account when authenticated
- [ ] Store scent personality profile on customer record
- [ ] API for quiz result retrieval by ID (for shareable URLs)

---

## Phase 2: Design System Foundation (Priority #2)

**Why second:** Every visual improvement in phases 3-7 depends on a cohesive design language. Without tokens and components, each feature will reinvent its own styling.

**Current state:** `globals.css` is a single line: `@import "tailwindcss"`. Zero CSS custom properties. Inter font only (loaded in `layout.tsx`). Monochrome palette (black/white/gray) with ad-hoc pastels per component — 24 hardcoded accord colors in `accords-display.tsx`, separate `COLLECTION_COLORS` map, per-step pastel colors in quiz. No motion library. No component abstractions. No dark mode. No design tokens. Tailwind v4 (CSS-based config, no `tailwind.config.js`). No footer exists. Header has no sticky positioning, no shadow, no mobile menu.

### 2.1 — Typography system: serif/sans-serif pairing
- [ ] Select and integrate a serif display font (headings, hero text, editorial) alongside Inter (body)
- [ ] Define a type scale as CSS custom properties (`--font-size-xs` through `--font-size-4xl`) with corresponding line-heights
- [ ] Apply consistently: serif for display/editorial, sans-serif for UI/body
- [ ] Update `layout.tsx` to load both fonts via `next/font`

### 2.2 — Color palette and semantic tokens
- [ ] Define warm, sensory-rich palette evoking fragrance families: amber, deep floral, crisp green, smoky wood
- [ ] Create CSS custom properties in `globals.css` for semantic tokens:
  - Surfaces: `--color-surface-primary`, `--color-surface-elevated`, `--color-surface-subtle`
  - Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
  - Accent: `--color-accent-primary`, `--color-accent-secondary`
  - Fragrance families: `--color-family-fresh`, `--color-family-floral`, `--color-family-amber`, `--color-family-woody`
- [ ] Replace all hardcoded Tailwind color classes across existing components (currently 20+ files with ad-hoc colors)
- [ ] Consolidate `ACCORD_COLORS` (24 entries in `accords-display.tsx`), `COLLECTION_COLORS`, and quiz step colors into token system
- [ ] Foundation for dark mode / seasonal theming (CSS variable swap approach)

### 2.3 — Spacing, shadow, and radius tokens
- [ ] Define spacing scale: `--spacing-xs` through `--spacing-section`
- [ ] Define shadow tokens: `--shadow-card`, `--shadow-card-hover`, `--shadow-elevated`, `--shadow-modal`
- [ ] Define radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

### 2.4 — Component visual DNA
- [ ] Buttons: primary (filled), secondary (outlined), ghost — shared sizes, radii, transitions (currently: inline `bg-black text-white rounded` everywhere — login, register, checkout, quiz all redefine button styles independently)
- [ ] Inputs: text, select, textarea — consistent border, focus ring, label treatment (currently: `px-4 py-2 border rounded` repeated per component with slight variations)
- [ ] Cards: define anatomy (image area, content area, metadata zone, action zone) as reusable pattern (currently: `product-card.tsx` is the only card pattern, and collection cards use entirely different styling)
- [ ] Chips/tags: accord tags, filter tags, metadata pills — unified shape and color system (currently: accord pills are `rounded-full`, note chips are `rounded`, filter chips are `rounded-full` — 3 different tag styles)
- [ ] Loading states: skeleton screens with shimmer effect, spinner component (currently: single `animate-spin` div in quiz, no skeletons)
- [ ] Empty states: illustrated/styled placeholders (currently: plain gray text like "No fragrances found", "Your cart is empty")
- [ ] Error states: styled inline errors, toast notifications (currently: plain `text-red-500` text, silent console.log on add-to-cart failure)
- [ ] Toast/notification system for async action feedback

### 2.5 — Motion and micro-interaction layer
- [ ] Add Framer Motion (or CSS-only approach) for entrance animations (fade-up, stagger)
- [ ] Define transition tokens: `--transition-fast` (150ms), `--transition-normal` (300ms), `--transition-slow` (500ms) with consistent easing
- [ ] Card hover states: scale + shadow depth shift + border color (currently: `hover:border-black` and `group-hover:scale-105` only)
- [ ] Cart drawer: add slide-in/slide-out animation (currently: conditional render with no transition)
- [ ] Scroll-driven reveal animations for storytelling sections
- [ ] Page transition patterns

### 2.6 — Fragrance-specific visual metaphors
- [ ] Redesign scent pyramid: interactive, layered, visually beautiful (current `scent-pyramid.tsx`: three same-height stacked colored boxes — `bg-amber-50`, `bg-rose-50`, `bg-stone-100` — with text pills inside; doesn't visually communicate the pyramid/temporal concept)
  - Hoverable notes with sensory descriptions
  - Visual hierarchy showing temporal progression (top → heart → base)
  - Animate notes appearing tier by tier on scroll-entry
- [ ] Redesign accord tags: feel like physical scent swatches with weighted sizing reflecting accord strength (current `accords-display.tsx`: `rounded-full` pills with hardcoded `ACCORD_COLORS` map, all same size — no visual weight)
  - Make accords clickable links to filtered product listing
- [ ] Redesign performance ratings: custom radial/arc visualizations (current `performance-ratings.tsx`: horizontal `h-2 bg-gray-200 rounded-full` bars with `bg-black` fill)
  - Add verbal scale labels alongside numbers (e.g., "Moderate", "Long-lasting")
  - Add contextual tooltips explaining what sillage/projection mean
  - Use Intersection Observer to animate bars on scroll-entry (current animation fires on mount, may flash)
- [ ] Define distinct visual identities per fragrance family (color, pattern, illustration style)

---

## Phase 3: Homepage Transformation (Priority #3)

**Why third:** The homepage is the front door. After the design system exists and quiz is rebuilt, the homepage can properly showcase both.

**Current state (`app/page.tsx`):** ~40 lines. Static hero: `text-4xl font-bold` "Discover Your Signature Scent" in plain text, one `text-gray-600` subline, single CTA (`bg-black text-white px-8 py-3 rounded`). Below: "Featured Fragrances" heading with 4 product cards in a `grid-cols-4` grid. No imagery, no animation, no storytelling, no social proof, nothing below the fold. No educational content. The entire page is a single `container mx-auto px-4 py-12`. No `revalidate` or cache directive on data fetch. No metadata/SEO export.

### 3.1 — Immersive hero section
- [ ] Full-viewport hero with abstract sensory imagery, gradient overlays, or editorial photography
- [ ] Unmissable primary CTA ("Find Your Scent") with inviting, non-corporate tone
- [ ] Anxiety-reduction subline ("Not sure where to start? We'll help — for free.")
- [ ] Animated/rotating elements showcasing fragrance diversity
- [ ] Above-the-fold content visually complete within 1.5 seconds

### 3.2 — Value proposition section
- [ ] 3-4 visual cards explaining quiz value: "Tell us about you" → "We analyze 100+ fragrances" → "Get personalized picks"
- [ ] Make the quiz feel smart and personal, not generic

### 3.3 — Social proof and trust
- [ ] Testimonials or quiz completion statistics (simulated data acceptable for MVP)
- [ ] Brand partner logos / "as featured in" section
- [ ] Community highlights or user-generated content teaser

### 3.4 — Editorial and discovery content
- [ ] Fragrance 101 educational teaser section
- [ ] Trending / seasonal picks with editorial framing ("What people are wearing this spring")
- [ ] Collection highlights with visual storytelling

### 3.5 — Below-the-fold experience
- [ ] "How It Works" section demystifying fragrance for beginners
- [ ] Progressive content layers that reward scrolling
- [ ] Scroll-driven entrance animations (fade-up, stagger, parallax)
- [ ] Final CTA section re-inviting quiz participation
- [ ] Lazy-loaded sections with blur placeholders / skeleton states
- [ ] Add metadata/SEO exports and `revalidate` directive

---

## Phase 4: Product Discovery UX (Priority #4)

**Why fourth:** With the design system and quiz in place, product experience can leverage both visual language and quiz-driven personalization.

**Current state:** Basic grid listing with non-functional filters (critical bug in Phase 0). Product cards (`product-card.tsx`) show only image+brand+name+price with no family indicator, no mood, no badges, no wishlist icon. Image uses `next/image` but no `blurDataURL` or `priority` for above-fold cards. Product detail page uses plain `<img>` (not `next/image`) for the product image. No image gallery (only thumbnail shown, `product.images` array unused). No related products, no "scent journey" narrative, no "how to wear" tips. Collections are 6 hardcoded entries in `lib/collections/index.ts` with no hero images. `search-facets.tsx` uses checkboxes but implements single-select behavior (semantic mismatch). No sorting controls exposed despite Meilisearch having `sortableAttributes` for price/longevity/sillage configured.

### 4.1 — Fix product detail page image handling
- [ ] Replace `<img>` with `next/image` on product detail page (currently unoptimized)
- [ ] Implement image gallery using `product.images` array (currently only `product.thumbnail` rendered)
- [ ] Add blur placeholders / loading states for images

### 4.2 — Enhanced product cards
- [ ] Add fragrance family visual indicator (color dot/icon) — currently not shown on cards
- [ ] Add key mood/vibe and one standout note — currently not shown
- [ ] Hover state: expanded quick-preview with additional info (current: `hover:border-black` border change only)
- [ ] Visual badges: "Trending," "Great for beginners," "Staff pick," seasonal markers
- [ ] Add `priority` prop on above-fold product card images for LCP optimization
- [ ] Price range display for multi-variant products ("From $95")
- [ ] Premium feel: refined aspect ratios, image treatments, typography

### 4.3 — Product detail page enrichment
- [ ] "Scent Journey" narrative: what the fragrance smells like over time (opening → drydown) — currently absent
- [ ] "Perfect For" section: occasions, seasons, moods, personality types — season/occasion tags exist but no editorial framing
- [ ] "How to Wear" tips for fragrance newcomers — absent
- [ ] Cross-sell: "If you like this, explore..." based on note/accord similarity — absent
- [ ] "Similar Fragrances" section based on note composition overlap — absent
- [ ] Breadcrumb navigation (absent)
- [ ] `generateStaticParams` for static generation of product pages (currently all dynamically rendered)
- [ ] Selected variant price update (currently static — selecting different size doesn't update visible price)

### 4.4 — Sorting and filter UX improvements
- [ ] Expose sort controls on `/products` and `/search`: price, longevity, sillage (already configured as `sortableAttributes` in Meilisearch but never surfaced)
- [ ] Fix `search-facets.tsx` semantic mismatch: uses checkboxes but only allows single-select per facet — either implement true multi-select or switch to radio inputs
- [ ] Add filter counts (how many products match each option) to prevent zero-result dead ends
- [ ] Make filter options dynamic from catalog (currently hardcoded in `product-filters.tsx`)
- [ ] Add beginner-friendly filter tooltips explaining each option
- [ ] Visual filter icons instead of plain radio buttons/checkboxes

### 4.5 — Discovery mechanisms
- [ ] Mood-based browsing: explore by vibe rather than technical attributes
- [ ] Interactive fragrance wheel/map for visual landscape exploration
- [ ] "Fragrance of the Day" or rotating editorial spotlight
- [ ] Beginner-friendly entry points: "Start Here" collections, guided browsing paths
- [ ] Smart filter defaults: pre-filter based on user's quiz results when available
- [ ] Extended sort options: "Best for beginners," "Most unique," "Best value"

### 4.6 — Collection page upgrade
- [ ] Editorial feel: hero imagery, descriptive intros, narrative context per collection (currently: text cards with `rounded-xl border-2 p-8` styling, no images)
- [ ] Dynamic collections alongside curated: trending, seasonal, new arrivals (currently: 6 hardcoded entries)
- [ ] Distinct visual identity per collection (currently: `COLLECTION_COLORS` map with basic pastel backgrounds)
- [ ] Support collection images (field exists in `Collection` interface as `image?: string` but unused)
- [ ] Add product counts per collection
- [ ] Add pagination for large collections (currently hardcoded `limit: 50`)

---

## Phase 5: Mobile-First Experience (Priority #5)

**Why fifth:** Cross-cutting concern applied after core features exist. Many mobile patterns (bottom nav, swipe quiz, sticky CTAs) require the features they enhance to be built first.

**Current state:** Basic Tailwind responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4` patterns). Header is desktop-oriented — horizontal nav links with `gap-6`, no hamburger/mobile menu, nav items overflow on small screens. SearchBar is fixed `w-64` inside a `max-w-sm` constraint — awkward on mobile. No touch gestures, no bottom nav, no swipe, no PWA, no mobile-specific interaction patterns. Cart drawer works but isn't thumb-zone optimized. Quiz stacks vertically but has no gesture navigation. Product filters use `w-64` sidebar layout with no responsive handling (sidebar would be hidden/broken on mobile). Header is not sticky (`position: sticky` absent).

### 5.1 — Mobile navigation
- [ ] Bottom navigation bar for mobile: Home, Quiz, Search, Account
- [ ] Thumb-zone-aware placement (primary actions in bottom 40% of screen)
- [ ] Mobile hamburger menu or responsive header (currently: all nav links inline, overflow on mobile)
- [ ] Make header sticky (`sticky top-0 z-40 bg-white shadow`)

### 5.2 — Touch-first quiz
- [ ] Swipe left/right navigation between quiz steps
- [ ] Full-screen immersive steps (no chrome)
- [ ] Tap selection with visual/haptic feedback
- [ ] Compact progress indicator (minimal screen real estate)
- [ ] Sticky CTA on results page

### 5.3 — Mobile-optimized layouts
- [ ] Product detail: sticky add-to-cart bar pinned at bottom
- [ ] Image gallery: swipeable carousel with pinch-to-zoom (currently: single static image)
- [ ] Filters: bottom sheet or full-screen overlay (currently: sidebar `w-64 flex-shrink-0` with no responsive handling)
- [ ] Search: expandable header search bar with recent/suggested queries (currently: fixed `w-64` input)
- [ ] Checkout: large touch targets, single-column flow

### 5.4 — Mobile product interactions
- [ ] Product card swipe actions (save to wishlist, quick add)
- [ ] Long-press quick preview on product cards
- [ ] Pull-to-refresh on catalog/collection pages

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
- [ ] Design affiliate link component: "Buy at [Retailer]" buttons with tracking params
- [ ] Integrate on product detail pages (primary purchase path alongside existing add-to-cart)
- [ ] Integrate on quiz result pages (each recommendation links to retailers)
- [ ] Affiliate click tracking and attribution
- [ ] Support multiple retailers per product (Sephora, Nordstrom, FragranceNet)
- [ ] Transition messaging: ScentScape as recommendation layer, not only direct seller

### 6.2 — Sample box foundation
- [ ] "Try Before You Buy" concept: quiz results → curated sample kit
- [ ] Sample box product page / ordering flow ($20-$40 price point)
- [ ] Integration with quiz results: "Get these 5 as samples"
- [ ] Backend: sample box as a Medusa product type with dynamic composition

### 6.3 — Premium tier foundation (do not gate quiz)
- [ ] Wishlist implementation — full feature (currently: `/account/wishlist` is a "coming soon" stub page with no backend, no data model, no UI integration)
  - Backend: wishlist data model and API endpoints
  - Frontend: add-to-wishlist button on product cards and detail pages
  - Header: wishlist icon with count badge
  - Account: wishlist page with saved products
- [ ] User account scent profile persistence (saved quiz results, history)
- [ ] Cart-customer association on login (guest cart → customer cart merge)
- [ ] Foundation for gating infrastructure: identify which features could be premium
- [ ] Premium feature candidates: AI advisor, saved profiles, community features, monthly scent briefing

---

## Phase 7: Educational Content Layer (Priority #7)

**Why last:** Education is woven into every surface — it requires all surfaces to exist first. This phase adds the learning layer on top of everything built in Phases 1-6.

**Current state:** Zero educational content anywhere. Product pages list notes/accords with no explanation. No glossary, guides, tooltips, or contextual help. No blog or editorial section. No content pages exist beyond the core commerce pages. Empty/no-results states are dead-ends with plain text.

### 7.1 — Contextual education (in-product)
- [ ] Tooltips on fragrance terms everywhere they appear (sillage, projection, EDC vs EDP, etc.)
- [ ] "What is [note]?" expandable cards on product pages (brief sensory descriptions)
- [ ] Quiz steps: brief educational context per question ("Fragrance families are like genres in music...")
- [ ] Scent pyramid annotations: "Top notes are what you smell first — they fade in 15-30 minutes"
- [ ] Performance ratings: practical explanations of what each metric means in real life

### 7.2 — Standalone educational content
- [ ] "Fragrance 101" comprehensive introductory guide
- [ ] "How to Find Your Signature Scent" long-form guide
- [ ] "How to Apply Fragrance" practical tips (pulse points, layering, storage)
- [ ] Seasonal guides: "Best Fragrances for Summer," "Holiday Gift Guide"
- [ ] Note profiles: deep dives on popular notes (bergamot, oud, sandalwood, vanilla)
- [ ] Fragrance family guides with examples and recommendations

### 7.3 — Content integration across surfaces
- [ ] Homepage: educational teaser sections linking to full guides
- [ ] Product pages: related educational content based on product characteristics
- [ ] Quiz results: educational context about the user's scent profile
- [ ] Search: educational suggestions on no-result states (currently: plain "No fragrances found" text)
- [ ] Empty states: fill dead-ends with relevant learning content

### 7.4 — SEO and content marketing
- [ ] Target long-tail keywords: "what does [note] smell like," "best fragrances for [occasion]"
- [ ] Internal linking strategy: educational content ↔ product pages ↔ quiz
- [ ] Build topical authority in fragrance discovery and education
- [ ] Enrich product JSON-LD: fix hardcoded `InStock` availability, add `aggregateRating`, `sku`, `category`, fragrance-specific `additionalProperty` fields

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
