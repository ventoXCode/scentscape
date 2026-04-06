# Quiz Experience & Personality-Driven Recommendation Engine

## Job to Be Done

The quiz is the core product of ScentScape — the free, no-paywall gateway that makes fragrance accessible to everyone. A user who completes the quiz should feel genuinely understood, surprised by how accurate the recommendations feel, and motivated to explore further. The same person taking the quiz twice with the same answers should NOT necessarily get identical results — the engine must introduce intelligent variation while remaining relevant.

## Current State

- 5 hardcoded steps: gender → mood → family → intensity → results
- Deterministic scoring algorithm: family (30pts) + intensity (25pts) + occasion (20pts) + gender (15pts) + mood (10pts) = 100
- Same inputs always produce same ranked output — zero variation
- MOOD_TO_ACCORDS mapping is hardcoded (6 moods → fixed accord sets)
- INTENSITY_TO_PERFORMANCE ranges are hardcoded thresholds
- Quiz feels like a product filter, not a personality assessment
- No personality insight — just "here are products that match your filters"
- No explanation of WHY a fragrance was recommended
- Results show a flat list of 10 product cards with match percentages
- No ability to refine, explore further, or save results
- No return visit personalization

## Desired Outcomes

### Quiz Depth & Personality Assessment
- The quiz should feel like a personality test, not a product filter
- Expand beyond fragrance-specific questions to personality, lifestyle, and sensory preferences:
  - "Pick the environment that feels most like home" (forest, beach, city rooftop, cozy cabin, garden)
  - "Choose a texture that appeals to you" (silk, leather, linen, velvet, wool)
  - "What time of day do you feel most like yourself?" (dawn, midday, golden hour, midnight)
  - "Pick the music that matches your energy" (jazz, electronic, classical, indie, R&B)
  - "How do you want people to remember meeting you?" (warm, intriguing, confident, approachable, unforgettable)
- Questions should adapt — certain answers should unlock follow-up questions (branching paths)
- The total question count should feel natural (8-12 questions), not exhausting
- Each question should feel visually distinct and engaging

### Non-Deterministic Recommendation Engine
- Same inputs should produce varied-but-relevant results across sessions
- Introduce controlled randomness: weighted random selection from the top N qualifying fragrances
- Consider an AI/ML layer that can:
  - Learn from aggregate user behavior (which recommendations get clicked, purchased, saved)
  - Factor in trending fragrances, seasonal relevance, or editorial curation
  - Generate natural-language explanations for why each fragrance was recommended
  - Create a "scent personality profile" that goes beyond just listing products
- The scoring model should be multi-dimensional, not a single linear score
- Consider embedding-based similarity rather than rule-based matching

### Results Experience
- Results should lead with the user's "Scent Personality" — a named archetype or profile description
- "You're a Velvet Dusk — drawn to warm, mysterious fragrances that leave a lasting impression"
- Each recommended fragrance should have a personalized explanation: "Because you value mystery and chose midnight energy..."
- Results should be shareable (unique URL, social cards, downloadable profile)
- Results should be saveable to account (if logged in) or recoverable (via email)
- Provide "Explore More Like This" paths from each recommendation
- Allow users to give feedback on recommendations ("Love this", "Not for me") to improve future suggestions

### AI Agent Integration
- Consider training or fine-tuning an AI agent specifically for fragrance recommendation
- The agent could power:
  - Conversational quiz flow ("Tell me about yourself" instead of rigid steps)
  - Dynamic follow-up questions based on previous answers
  - Natural-language result explanations and personality profiles
  - Ongoing recommendation refinement as users interact with the platform
- The agent should understand fragrance terminology, note compositions, and the emotional/psychological dimensions of scent preference
- This could be a key differentiator — "the AI that understands your scent identity"

### Quiz UX & Visual Design
- Each question should be a full-screen or near-full-screen experience
- Use imagery, color, and animation to make each step feel immersive
- Progress indication should feel motivating, not mechanical (consider a visual journey metaphor rather than a numbered progress bar)
- Transitions between steps should be smooth and directional
- Mobile experience must be first-class — thumb-friendly targets, swipe navigation
- Loading/processing state before results should build anticipation ("Analyzing your scent profile...")
