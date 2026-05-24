---
name: publishing
description: Use this skill when the user mentions writing, publishing, theses, blog posts, essays, fiction, audiobook pipelines, ThesisStudio, BlogStudio, WriterStudio, or anything that lives under 626Labs-Publishing. Trigger on phrases like "new article", "starting an essay", "where does this draft live", "lift to packages", "library snapshot". Orients you to the studios/works/library/packages bucket model and routes you to the right Lead Writer persona instead of drafting prose at the umbrella level.
---

# 626 Labs Publishing

The umbrella for all 626 Labs writing — academic, blog, fiction, finished outputs. **Not a git repo.** Each studio, each active work, and (eventually) each shared package is its own independent git repo. The umbrella `CLAUDE.md` at `C:\Users\estev\Projects\626Labs-Publishing\CLAUDE.md` is the orchestrator-level keystone — read it first when invoked.

## The four-bucket model

| Bucket | Contains | Mutability |
|---|---|---|
| `studios/` | Reusable templates, one per genre (placeholders only — `[YOUR TITLE]`, `[CHARACTER]`) | Active — improved over time, never holds finished prose |
| `works/` | Real writing in progress, authored against a studio | Active — current authoring lives here |
| `library/` | Finished, published works as frozen snapshots | **Frozen** — represents a moment of publication |
| `packages/` | Cross-studio shared skills and pipelines | Active — lift point for anything two-or-more studios share |

**The placement rule:** active work → `works/`, finished work → `library/`, reusable scaffolding → `studios/`, shared code → `packages/`.

## Studios (current)

| Studio | Purpose | Path | Dashboard project |
|---|---|---|---|
| **ThesisStudio** | Academic theses, dissertations, master's papers, long-form research articles | `studios/ThesisStudio/` | `CooIu5ieQ5QXzczcQ0HL` |
| **BlogStudio** | Blog posts, voice-driven short-form writing | `studios/BlogStudio/` | `FLfcTlVUOcURie1HuXYT` |
| **WriterStudio** | Fiction — novellas, short stories, serial chapters | `studios/WriterStudio/` | `BLbTIFk07cTSLFOqomEJ` |

Each studio has its own `CLAUDE.md` with a Lead Writer persona, three pillars, and reference architecture. **Defer to those when working inside a studio** — the umbrella does not override studio-level personas.

## Packages (cross-studio, in design)

These are pipelines two or more studios will share. They don't exist as their own repos yet — tracked here so the future lift target is clear.

| Package | Source studio | Targets | Status |
|---|---|---|---|
| `audiobook-pipeline` (ElevenLabs speaker tagging → audiobook) | WriterStudio | All three studios | To-extract |
| `lay-translator` (academic-register → plain-language) | ThesisStudio | BlogStudio (today), WriterStudio (planned) | To-generalize |

**Do not lift prematurely.** Extract a package when a second studio actually needs it; shared design intent without shared code is a documentation problem, not a packaging problem.

## How to behave at each level

**At the umbrella** (`626Labs-Publishing/` itself):
- You are an **orchestrator**, not a Lead Writer.
- Answer questions about cross-studio architecture, the bucket model, where new things belong, how to lift code into `packages/`, how studios relate to works to library assets.
- **Do not draft prose at this level.** Prose work happens inside a studio.
- When a question is studio-specific, redirect or change directory into the studio so its CLAUDE.md takes over.

**Inside a studio** (`studios/<X>/`):
- The studio's `CLAUDE.md` is authoritative. This skill is background context.
- The studio's persona (Lead Writer + three pillars) is in effect.

**Inside a work** (`works/<X>/`):
- The work is bound to a studio. Read the work's `CLAUDE.md` (it inherits from the studio) for project-specific conventions, voice, and scope.
- The Lead Writer of the bound studio is in effect.

## Cross-studio sharing rules

1. **Don't fork-and-tweak.** If two studios need the same pipeline, lift to `packages/`.
2. **Studios stay genre-specific; packages stay genre-agnostic.** A "package" with hard fiction-only deps (characters, beats) is not a package — it's a WriterStudio internal.
3. **Library snapshots freeze the studio shape at publication time.** Don't reshape library assets to match new template layouts.
4. **Versioning lives at the studio level**, not the umbrella. Each studio carries its own `package.json` / `tokens.yaml`.

## Decision logging

Tag dashboard decisions to the right project ID:

- **Cross-studio architectural decisions** (bucket-model changes, new packages, reorgs) → umbrella project `Mdy4yqKsrnaubrxJXM6b`.
- **Studio-internal decisions** (persona changes, sub-skill additions, citation-discipline tweaks) → the studio's project ID.
- **Per-work decisions** (methodology, scope, advisor feedback) → the work's project ID.

Use `mcp__626labs-cloud__manage_decisions` with `action: log`.

## What NOT to do

- **Don't git-init the umbrella.** It is intentionally a folder of independent repos.
- **Don't conflate templates with works.** A studio is never bound to a single work.
- **Don't extract a package just because two studios reference the same idea.** Extract on shared *implementation*, not shared intent.
- **Don't reshape a library snapshot.** Frozen means frozen.
- **Don't draft prose at the umbrella level.** Always route into a studio.

## When invoked without specific guidance

Ask: *"What are you working on — a new piece, an existing work, lifting something to packages, or library archival?"* Then route to the right studio (and its Lead Writer persona) rather than answering at the umbrella level.
