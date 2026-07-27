# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm start        # run production build
npm run lint     # next lint
```

No test suite exists in this repo.

## Architecture

Single-page Next.js 15 (App Router) portfolio site. There is exactly one route: `app/page.tsx` renders all sections in order inside `app/layout.tsx` — no other pages/routes exist.

- **`app/layout.tsx`** — root shell: wraps everything in `ThemeProvider` (`components/context.tsx`), renders global `Header`/`Footer`, and a `ToastContainer` (react-toastify) used app-wide for notifications.
- **`app/page.tsx`** — the entire page body: loading-screen animation, then `About → Projects → Education → Experience → Skills → Contact`, plus a global `Terminal` overlay, a resume PDF modal, and a `FloatingWhatsApp` widget. State for the resume modal and terminal visibility lives here and is passed down as props (no global store).
- **`components/context.tsx`** — `ThemeContext`/`useDarkMode()` is the only global state (dark/light mode), persisted to `localStorage` under the key `darkmode`. Components read `isDarkMode` directly and hand-roll conditional Tailwind classes (no `dark:` variant convention) — follow that same pattern when touching styling.
- **`components/Terminal.tsx`** — a fake interactive CLI (not a real shell) simulating commands like `help`, `about`, `skills`, `contact`, `projects` etc. described in the README. It can float as a minimized icon and be dragged around the screen; state (`showTerminal`, `isTerminalFloating`) is lifted to `page.tsx`.
- **`public/data/profile_faq.json`** — structured Q&A content (name, skills, resume link, etc.) used as the data source for terminal/about content — update this instead of hardcoding bio facts in components.
- **i18n**: `i18n.js` (root) configures `react-i18next` directly from imported JSON (`public/locales/{en,fr}/*.json`) rather than `next-i18next`'s file-based routing — despite `next-i18next` being a dependency, translations are wired manually. Add new strings to both locale files.
- **Path alias**: `@/*` maps to repo root (see `tsconfig.json`).
- **UI primitives**: `components/ui/` holds shadcn-style primitives (see `components.json`); `lib/utils.ts` has the `cn()` class-merge helper (`clsx` + `tailwind-merge`).
- Styling is Tailwind CSS with a custom `iosevka` font family and a signature accent color `#00BD95` used consistently across components for highlights/CTAs.
- `scripts/svg-to-png.js` is a standalone asset-generation script (uses `sharp`), not part of the Next.js build.
