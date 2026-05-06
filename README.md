# 626 Labs Plugin

Two skills for working across the 626 Labs portfolio:

- **`/626labs:design`** — brand tokens, type stack, UI kit, editorial layer. Use for any 626 surface (hub, admin, widgets, slides, social cards, longform reading).
- **`/626labs:publishing`** — orients to the `626Labs-Publishing/` umbrella (studios / works / library / packages) and routes to the right Lead Writer persona. Use when starting a new piece, deciding where something belongs, or lifting code into shared packages.

## Install (local)

From this repo's parent:

```bash
/plugin marketplace add C:\Users\estev\Projects\626labs-plugin
/plugin install 626labs@626labs
```

After install, restart Claude Code. The two skills become available as `/626labs:design` and `/626labs:publishing`.

## Update

When the design system source (`626labs-hub/Design/`) or publishing umbrella conventions change, sync them in:

```bash
# Sync design assets from hub repo
cp 626labs-hub/Design/*.css 626labs-plugin/skills/design/
cp -r 626labs-hub/Design/{assets,preview,ui_kits} 626labs-plugin/skills/design/

# Then bump version in .claude-plugin/plugin.json + marketplace.json
```

## Layout

```
626labs-plugin/                # marketplace root
├── .claude-plugin/
│   └── marketplace.json       # marketplace manifest, points at ./plugins/626labs
├── plugins/
│   └── 626labs/               # the plugin itself
│       ├── .claude-plugin/
│       │   └── plugin.json
│       └── skills/
│           ├── design/
│           │   ├── SKILL.md
│           │   ├── colors_and_type.css
│           │   ├── editorial.css
│           │   ├── assets/, preview/, ui_kits/
│           │   └── README.md
│           └── publishing/
│               └── SKILL.md
└── README.md
```

## Source of truth

- **Design system canonical source:** `626labs-hub/Design/` — the `colors_and_type.css` and `editorial.css` here are mirrors. When tokens change, update the hub copy first, then re-mirror.
- **Publishing umbrella:** `C:\Users\estev\Projects\626Labs-Publishing\CLAUDE.md` is canonical for the bucket model. The publishing SKILL.md is a working summary; defer to the umbrella CLAUDE.md when in doubt.
