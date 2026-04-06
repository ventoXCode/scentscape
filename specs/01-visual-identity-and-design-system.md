# Visual Identity & Design System

## Job to Be Done

Users arriving at ScentScape should immediately feel they've landed on a premium, curated fragrance destination — not a generic e-commerce template. The visual identity must evoke sensory richness, sophistication, and warmth while remaining accessible to fragrance newcomers who might be intimidated by luxury branding.

## Current State

- Pure Tailwind utility classes with no cohesive design system
- Default Inter font with standard weight scales
- Slate/gray neutral palette with feature-specific accent colors (rose, cyan, amber, violet)
- No motion, animation, or micro-interaction layer
- No custom illustrations, iconography system, or visual metaphors for scent
- Product cards are functional but visually flat — border + hover effect only
- No visual hierarchy differentiation between premium and everyday content
- The overall aesthetic reads as "developer-built MVP" rather than "curated fragrance experience"

## Desired Outcomes

### Brand Expression
- The site should feel like walking into a well-designed perfumery — warm lighting, curated displays, intentional negative space
- Typography should balance editorial elegance with digital readability — consider a serif/sans-serif pairing
- Color palette should evoke fragrance families: warm ambers, deep florals, crisp greens, smoky woods
- Imagery treatment should be consistent — consider overlays, grain textures, or tonal filters that unify diverse product photography

### Design Token System
- Establish a token-based design system: colors, spacing, typography, shadows, radii, transitions
- Tokens should be semantic (e.g., `color-surface-elevated`, `spacing-section`, `shadow-card-hover`) not arbitrary Tailwind values
- Support future theming (dark mode, seasonal themes, collection-specific palettes)

### Component Library Consistency
- Every interactive element (buttons, inputs, selects, toggles, chips) should share visual DNA
- Cards should have consistent anatomy: image area, content area, metadata, action zone
- Loading states, empty states, and error states should be designed, not afterthoughts
- Transition and animation patterns should be consistent (duration, easing, properties)

### Micro-interactions & Motion
- Subtle entrance animations for content sections (fade-up, stagger)
- Hover states that feel tactile — scale, shadow depth, color shifts
- Page transitions that maintain spatial context
- Loading feedback that feels intentional (skeleton screens, shimmer effects)
- Scroll-driven animations for storytelling sections (parallax, reveal)

### Visual Metaphors for Scent
- The scent pyramid visualization should be beautiful and interactive, not just colored boxes
- Accord tags should feel like actual scent chips/swatches
- Performance ratings (longevity, sillage, projection) should use custom visualizations, not generic progress bars
- Fragrance families should have distinct visual identities (color, pattern, illustration)
