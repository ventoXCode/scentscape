# Mobile Experience & Responsive Design

## Job to Be Done

The majority of ScentScape's target audience (18-35, fragrance-curious, social-media-driven) will discover and use the platform on mobile. The mobile experience must be native-app-quality — not a squeezed-down desktop site. The quiz especially must feel like a polished mobile app experience.

## Current State

- Responsive via Tailwind breakpoints (mobile-first approach)
- Grid layouts collapse from multi-column to single-column on mobile
- Navigation uses standard responsive patterns (likely hamburger menu)
- Quiz steps stack vertically on mobile
- No mobile-specific interactions (swipe, pull-to-refresh, haptic patterns)
- No PWA capabilities (offline, install prompt, push notifications)
- No mobile-optimized touch targets or gesture navigation
- Cart drawer likely works on mobile but isn't optimized for thumb zones

## Desired Outcomes

### Touch-First Interactions
- Quiz steps should support swipe navigation (left/right for next/prev)
- Product cards should support swipe actions (save to wishlist, quick add)
- Bottom navigation bar for primary actions (Home, Quiz, Search, Account)
- Thumb-zone-aware layout: primary actions in bottom 40% of screen
- Pull-to-refresh on catalog and collection pages
- Long-press for quick preview on product cards

### Mobile Quiz Experience
- Full-screen immersive steps with gesture navigation
- Option selection via tap with satisfying visual/haptic feedback
- Progress indicator that doesn't consume valuable screen real estate
- Smooth, performant transitions between steps
- Results page optimized for vertical scrolling with sticky CTAs

### Mobile-Optimized Layouts
- Product detail page: sticky add-to-cart bar at bottom
- Image gallery: swipeable carousel with pinch-to-zoom
- Filters: bottom sheet or full-screen overlay (not sidebar)
- Search: expandable search bar in header with recent/suggested queries
- Checkout: single-column optimized with large touch targets

### Performance on Mobile
- Target: Lighthouse mobile score > 90
- First Contentful Paint < 1.5s on 4G
- Images: responsive srcset, AVIF/WebP with quality fallbacks
- Minimize JavaScript bundle for initial page load
- Consider service worker for offline quiz access

### Progressive Web App (Future)
- Installable on home screen
- Offline access to quiz results and scent profile
- Push notifications for new recommendations or seasonal updates
- Share target API for receiving shared fragrance links
