---
name: design
description: Use this skill to generate well-branded interfaces and assets for 626 Labs — production code, throwaway prototypes, mocks, slides, social cards, longform reading surfaces, anything visual. Trigger on requests mentioning 626 Labs branding, 626Labs design, brand tokens, hub/admin/widget UI work, hero or OG card design, Field Notes / editorial layouts, or "design system." Provides brand tokens, type stack, UI kit, and the editorial layer for theses + Field Notes.
license: UNLICENSED
---

Read the `README.md` file within this skill, and explore the other available files:

- `colors_and_type.css` — foundational tokens (colors, type, spacing, motion, shadows/glows)
- `editorial.css` — editorial layer for longform reading (theses, Field Notes). Extends colors_and_type with light surface, serif body (Source Serif 4), restrained accent use. Use when designing reading surfaces, not UI.
- `assets/` — logo + reference imagery
- `preview/` — small spec cards for each token group
- `ui_kits/dashboard/` — The Lab Dashboard (Agent OS) recreation — React + CSS

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Brand essentials to internalize:**
- Dark-mode first. Deep navy (`#091023`–`#192e44`) base. Neon cyan `#17d4fa` + magenta `#f22f89` signature duo — always pair them.
- Product-specific teal `#2ee6c9` used in The Lab Dashboard for primary CTAs and active nav.
- Type: Space Grotesk (display), Inter (UI), JetBrains Mono (code + small meta labels, always uppercase with +0.12em tracking).
- Voice: builder-to-builder, second person, short sentences, no emoji in UI, no hedging verbs.
- **Audio:** No default system sounds, browser alert chimes, or stock OS dings. If a surface needs audio feedback (notifications, success/error tones, micro-interactions), use **modern crisp tones** — short, intentionally-shaped, brand-coherent. Default to silence over a system beep.
- Tagline: *Imagine Something Else.*

**Editorial mode (when designing reading surfaces — theses, blog posts, Field Notes, longform articles):**
- Switch to `editorial.css`. Light paper field (`--ed-paper: #F7F5F0`), navy ink (`--ed-ink`), Source Serif 4 body.
- Accent use is RESTRAINED. Cyan→magenta gradient appears only as the accent rule and on link hover. Pull-quotes, rules, and dingbats are the visual language — not full-color blocks.
- The two layers (dark-mode UI vs. light-mode editorial) intentionally don't blend. Pick one per artifact.

**Treatments (opt-in atmosphere layers):**
- **Phosphor Blueprint** (adopted 2026-07-07) — `--pb-*` tokens + `.pb-*` recipes in `colors_and_type.css`: absolute-black two-scale drafting grid, CRT scanlines, cyan bloom, terminal chrome, phosphor-persistence hover. For dark hero / launch / terminal surfaces; never on the editorial light layer. Spec card: `preview/treatment-phosphor-blueprint.html`.
