# Repository Guidelines

## General Instructions

- ALWAYS run `npm run format` AFTER you're done with your task and you edited all files that needed editing
- ALWAYS run `npm run lint` after making any changes => fix any linting errors you get
- ALWAYS check for type errors via `npm tsc --noEmit`
- ALWAYS run unit tests via `npm run test`
- ALWAYS run e2e tests via `npm run test:e2e`
- ALWAYS use the Playwright MCP to verify changes that have an impact on the UI or user experience

## Project Structure & Module Organization

This is a Next.js 14 App Router project for the Benji Bakes storefront. Route entry points live in `app/`, including page layouts and server routes under `app/api/*`. Reusable UI lives in `components/`, with Radix/shadcn-style primitives in `components/ui/` and feature-specific pieces such as `components/Catering/`. Shared state and helpers live in `store.ts`, `context/`, `providers/`, `hooks/`, `utils/`, and `lib/`. Static images and brand assets live in `public/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local development server at `http://localhost:3000`.
- `npm run build`: create a production build and catch compile-time issues.
- `npm run start`: serve the production build locally after `npm run build`.
- `npm run lint`: run the Next.js ESLint checks defined by `next/core-web-vitals`.

## Coding Style & Naming Conventions

Use TypeScript with strict typing and the `@/*` path alias from `tsconfig.json`. Follow the existing code style: double quotes, semicolons, and 4-space indentation. Name React components and context providers in `PascalCase` (`Hero.tsx`, `ThemeProvider.tsx`), hooks in `camelCase` with a `use` prefix (`use-toast.ts`), and utility modules by behavior (`calculateOrderAmount.ts`, `getStripeProducts.ts`). Keep route handlers in `app/api/**/route.ts`.

## Testing Guidelines

There is no dedicated automated test suite in the repo today. At minimum, run `npm run lint` before opening a PR. For behavior changes, manually verify the affected flow in the browser, especially cart state, checkout, catering requests, and success pages. If you add tests, keep them close to the feature and use clear names like `ComponentName.test.tsx`.

## Commit & Pull Request Guidelines

Recent history uses short, descriptive commit subjects such as `modal updates`, `SEO v1`, and `spring update`. Keep commits focused and easy to scan; one change set per commit is preferred. PRs should include a concise summary, note any environment or API changes, link the related issue when applicable, and include screenshots or a short video for visible UI updates.

## Security & Configuration Tips

Secrets belong in `.env.local`, which is gitignored. Do not commit Stripe, email, or other credential values. When working on payment or email routes, verify the required environment variables before testing.
