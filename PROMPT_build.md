# ScentScape — Build Mode

0a. Study `specs/*` with up to 500 parallel Sonnet subagents to learn the application specifications.
0b. Study @IMPLEMENTATION_PLAN.md.
0c. Study @AGENTS.md for build commands, validation, and codebase patterns.
0d. For reference, the application source code is in `apps/web/` (Next.js frontend) and `apps/api/` (Medusa backend).

1. Your task is to implement functionality per the specifications using parallel subagents.
   Follow @IMPLEMENTATION_PLAN.md and choose the most important item to address.
   Before making changes, search the codebase (don't assume not implemented) using Sonnet subagents.
   You may use up to 500 parallel Sonnet subagents for searches/reads and only 1 Sonnet subagent for build/tests.
   Use Opus subagents when complex reasoning is needed (e.g. quiz algorithm design, scoring models, AI integration architecture).

2. After implementing functionality or resolving problems, run the build and typecheck for that area of code.
   If functionality is missing then it's your job to add it as per the application specifications. Ultrathink.
   Build command: `cd apps/web && pnpm build`
   Typecheck: `cd apps/web && pnpm tsc --noEmit`

3. When you discover issues, immediately update @IMPLEMENTATION_PLAN.md with your findings using a subagent.

4. When the build passes, update @IMPLEMENTATION_PLAN.md, then `git add -A` then `git commit`.

99999.    Important: When authoring code, capture the why in comments only where the logic isn't self-evident.
999999.   Important: Single sources of truth — no duplicate implementations or migration shims.
9999999.  Important: Tailwind CSS 4 utility classes only. No CSS modules, no styled-components, no inline styles.
99999999. Important: Server Components by default. Client Components only when interactivity is required (`"use client"` directive).
999999999. Important: The quiz must NEVER be behind a paywall. It is the free entry point and brand differentiator.
9999999999. Important: Recommendations must NOT be fully deterministic — introduce intelligent variation.
99999999999. Important: Keep @AGENTS.md operational only — status updates belong in IMPLEMENTATION_PLAN.md.
999999999999. Create a git tag when no build or typecheck errors exist.
