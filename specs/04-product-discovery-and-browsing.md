# Product Discovery & Browsing Experience

## Job to Be Done

Users browsing the catalog should feel like they're exploring a curated perfumery, not scrolling through a database. Every product interaction should educate and inspire, helping users build their fragrance vocabulary while moving toward a purchase or quiz decision.

## Current State

- Product catalog page: standard grid layout with sidebar filters
- Product cards: title, brand, price, thumbnail — functional but generic
- Product detail page: scent pyramid, accords display, performance ratings, variant selector, add-to-cart
- Scent pyramid uses colored boxes for top/heart/base notes
- Performance ratings use basic progress-bar-style displays
- Accords displayed as simple tags
- Filters: family, concentration, gender, accords, season (via Meilisearch facets)
- Collections page: 6 hardcoded collections with grid layouts
- No educational context — users need fragrance knowledge to use filters effectively
- No discovery mechanisms beyond search and filters (no "similar to", no "you might like", no editorial curation)

## Desired Outcomes

### Product Card Enhancement
- Cards should show at a glance: fragrance family (visual indicator), key mood/vibe, and one standout note
- Hover state should preview additional info without navigating away (quick-view or expanded card)
- Cards should feel premium — consider aspect ratios, image treatments, and typography that elevate the presentation
- Add visual badges for contextual relevance: "Trending", "Great for beginners", "Staff pick", seasonal markers

### Product Detail Page
- The page should tell the fragrance's story, not just list its attributes
- Scent pyramid should be an interactive, beautiful visualization — hoverable notes with descriptions
- Accords should be visual/sensory (color swatches, descriptive chips) not just text tags
- Performance ratings should use custom visualizations that communicate intuitively (not generic bars)
- Add a "Scent Journey" narrative: what this fragrance smells like over time (opening → drydown)
- Include "Perfect For" context: occasions, seasons, moods, personality types
- Cross-sell: "If you like this, explore..." recommendations based on note/accord similarity
- Add "How to Wear" tips for fragrance newcomers

### Discovery Mechanisms
- "Similar Fragrances" based on note composition and accord overlap
- "People who liked X also liked Y" (collaborative filtering, even if rule-based initially)
- Mood-based browsing: let users explore by mood/vibe rather than technical attributes
- Interactive fragrance wheel/map: visual exploration of the fragrance landscape
- "Fragrance of the Day" or rotating editorial spotlight
- Beginner-friendly entry points: "Start Here" collections, guided browsing paths

### Filtering & Sorting
- Filters should be approachable for beginners — add tooltips or brief explanations
- Visual filter options (e.g., clickable scent family icons instead of checkboxes)
- Smart defaults: pre-filter based on user's quiz results if available
- Sort options beyond basic: "Best for beginners", "Most unique", "Best value"

### Collection Pages
- Collections should feel editorial — hero imagery, descriptive intros, narrative context
- Dynamic collections based on algorithms (trending, seasonal, new arrivals) alongside curated ones
- Each collection should have a distinct visual identity
