# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sophon Blog — the React frontend for the Sophon generative-AI blogging platform (a [RealWorld](https://realworld-docs.netlify.app/)-style app), talking to the separate NestJS backend in `sophon-api`. Built with Vite, TypeScript, Mantine, TanStack Router/Query, TipTap.

Node.js **v22.11.0** is required (see `.nvmrc`).

## Commands

```bash
npm install

npm run dev              # dev server, http://localhost:5173
npm run build             # tsc && vite build -> dist/
npm run preview           # preview production build, http://localhost:4173

npm run typecheck         # tsc --noEmit
npm run prettier          # check formatting
npm run prettier:write    # auto-format
npm run lint              # eslint + stylelint
npm run vitest             # unit tests (vitest run)
npm run vitest:watch       # watch mode / TDD
npm test                  # typecheck -> prettier -> lint -> vitest -> build (what CI runs)

npm run storybook          # Storybook dev server, http://localhost:6006
npm run storybook:build    # -> storybook-static/
```

To run a single test file or test name: `npx vitest run path/to/File.test.tsx` or `npx vitest run -t "test name"`.

CI (`.github/workflows/npm_test.yml`) runs on every PR: install → `npm run build` → `npm test`. There is no separate CI test job — `npm test` itself chains typecheck/prettier/lint/vitest/build, so a failure in any of those fails CI.

Requires `VITE_API_URL` (backend base URL, e.g. `http://localhost:3000/api/v1`) via `.env.local`. `src/shared/api.config.ts` also references `VITE_API_BASE_URL`/`VITE_API_VERSION`, but the client code (`src/shared/client.ts`, all `src/api/**/*.api.ts`) actually reads `API_URL` sourced from `VITE_API_URL` — set `VITE_API_URL` for real usage.

## Architecture

**Two parallel HTTP client layers exist — only one is live.** `src/shared/client.ts` is a thin `fetch` wrapper (JSON in/out, `credentials: 'include'`) and is what every real API call goes through (`src/auth/auth.api.ts`, `src/api/{article,comment,profile,user}/*.api.ts`). `src/shared/api.client.ts` is an unused Axios instance with a Bearer-token interceptor and a `/auth/refresh` 401-retry flow — nothing imports it. Don't extend or "fix" the Axios client without first checking whether the intent is to migrate onto it (the `TODO` in `client.ts` suggests that was the plan) — as of now it's dead code.

**Auth is cookie-session, not JWT-bearer, despite the JWT-shaped scaffolding.** The backend (`sophon-api`) authenticates via a signed session cookie; every fetch call passes `credentials: 'include'` for this reason. `useAuthStore` (Zustand, `src/auth/auth.store.ts`, persisted to localStorage as `auth-state`) stores `user` and an `accessToken` field populated from the login response's `token`, but that token is never attached to outgoing requests (only the dead Axios client would do that) — its only live use is as a truthy gate (`enabled: !!accessToken`) on the `whoami` query in `src/auth/auth.queries.ts`. Treat `useAuthStore().user` as the source of truth for "who is logged in" in components; treat `accessToken` as a login-state flag only, not a real bearer token.

**Data layer**: TanStack Query throughout. Each domain folder under `src/api/<domain>/` and `src/auth/` splits into `*.api.ts` (raw fetch calls), `*.queries.ts` (`queryOptions(...)` factories), `*.mutations.ts` (`mutationFn` + `onSuccess` wiring, e.g. login writes into `useAuthStore`). Route loaders integrate with this via router context (see below) rather than component-level `useEffect` fetching.

**Routing**: TanStack Router, file-based (`src/routes/**`, code-split via `@tanstack/router-plugin`'s Vite plugin), with the generated `src/routeTree.gen.ts` — do not hand-edit that file, it's regenerated on `dev`/`build`. `src/router.ts` creates the router with `context: { queryClient }` (so loaders can call `queryClient.ensureQueryData(...)`) and `defaultPreloadStaleTime: 0` so preloaded loaders never serve stale data. `src/routes/__root.tsx` provides the app shell (Mantine `AppShell` with `Header`/`Footer`) and `notFoundComponent`. Route-level auth gating uses `AuthModalGuard`/`AuthShow` components rather than router `beforeLoad` redirects — check existing usages before introducing a new gating pattern.

**Article editing**: `ArticleEditor` (`src/components/ArticleEditor/`) wraps TipTap (`use-article-editor.tsx`) with extensions for highlight/link/underline/subscript/superscript/text-align. `ArticleGenerator` (`components/ArticleEditor/components/`) drives the AI draft-generation flow against the backend's `/articles/generate` endpoint (`generateArticle` in `src/api/article/article.api.ts`), which returns a structured `GeneratedArticle` object for the editor to populate.

**State**: Zustand for auth/client state (`useAuthStore`), TanStack Query for all server state — there is no other global client-state store.

**Testing**: Vitest + Testing Library + jsdom. Setup file `vitest.setup.mjs` stubs `matchMedia`/`ResizeObserver`/`scrollIntoView` for Mantine components. Tests live next to their component (`ComponentName.test.tsx`). `test-utils/` provides a custom `render` (wraps components with the same providers as `App.tsx` — Mantine/QueryClient/Router as needed) that tests should use instead of raw RTL `render`. Path aliases `@/*` → `src/*` and `@test-utils` are defined in `tsconfig.json` and mirrored in `vite.config.mjs` via `vite-tsconfig-paths`.

**Styling**: CSS Modules co-located per component (`Component.module.css`) plus Mantine's theme (`src/theme.ts`) and `postcss-preset-mantine`/`postcss-simple-vars`. Stylelint (`stylelint-config-standard-scss`) lints `src/**/*.css` separately from ESLint — both run under `npm run lint`.
