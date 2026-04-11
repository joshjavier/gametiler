# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run oxlint
npm run lint:fix     # Auto-fix lint issues
npm run fmt          # Format with oxfmt
npm run fmt:check    # Check formatting without modifying
```

There are no tests currently defined in this project.

## Architecture

GameTiler is a Next.js 16 (App Router) application that aggregates casino game metadata from external casino APIs and re-exposes it through a normalized API.

### API Endpoint

`app/api/v1/games/route.ts` — the only API route. Uses **Edge Runtime** (`export const runtime = 'edge'`) to avoid CORS issues. Accepts query params:

- `b` (brand): `betmgm` | `borgata` | `wof` | `partycasino`
- `s` (state): `nj` | `pa` | `mi` | `wv` | `on`

It calls the external casino API twice in parallel (desktop + mobile user-agents), deduplicates results by `sid`, and returns `{ d: Game[], m: Game[] }`. Responses are cached for 5 minutes (`revalidate: 300`).

### Data Layer

`lib/casino/index.ts` — all casino API logic:

- `buildBaseUrl(brand, state)` — constructs the casino domain from brand/state (special cases: Borgata NJ, WOF NJ have no state subdomain)
- `fetchGames(url, isMobile)` — fetches `GameMetaData[]` from the external API with required custom headers
- `metadataToGame()` — normalizes `GameMetaData` → `Game`
- `isValidBrand()` / `isValidState()` — type predicate validators

`types/index.ts` — `GameMetaData` (raw external API shape) and `Game` (normalized output shape).

`utils/index.ts` — `requireEnv(name)` throws at startup if an env var is missing.

### Required Environment Variables

Set in `.env.local`:

- `GAME_METADATA_ENDPOINT` — API path on the casino domain
- `SPECIAL_HEADER_NAME` / `SPECIAL_HEADER_VALUE` — custom auth header for the external API
- `MOBILE_UA` — user-agent string for mobile requests

### Tooling

- **Linter**: oxlint (Rust-based, configured in `.oxlintrc.json`)
- **Formatter**: oxfmt (configured in `.oxfmtrc.json` — single quotes, auto import sorting, Tailwind class sorting)
- **Pre-commit hook**: Husky + lint-staged runs formatting and linting automatically on staged files
- **CI**: `.github/workflows/oxlint.yml` runs linting on PRs and pushes to main
- **Path alias**: `@/*` maps to the project root (defined in `tsconfig.json`)
