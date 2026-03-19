# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

nyuber-eats is a meal-swipe marketplace for college students built with Expo (React Native). Buyers pay 50% of menu price + $1 platform fee; swipers get paid via Stripe Connect. The app targets iOS, Android, and web from a single codebase.

## Commands

```bash
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run web version
npm run lint       # ESLint (flat config via eslint-config-expo)
```

**Note:** Stripe requires a custom dev client (not Expo Go). Use `npx expo run:ios` or `npx expo run:android` for native builds.

## Architecture

### Routing (Expo Router — file-based)

```
app/
├── _layout.tsx        # Root Stack + ThemeProvider
├── (tabs)/
│   ├── _layout.tsx    # Bottom tab navigator (Home, Explore)
│   ├── index.tsx      # Home tab
│   └── explore.tsx    # Explore tab
└── modal.tsx          # Modal screen
```

Typed routes are enabled (`experiments.typedRoutes`). The React 19 compiler is also on (`experiments.reactCompiler`).

### Supabase Client (`utils/supabase.ts`)

Single exported `supabase` client. Auth tokens stored in native keychain via `expo-secure-store` (not AsyncStorage). Session auto-refreshes and persists across app restarts. `detectSessionInUrl: false` since this is a native app.

Env vars in `.env.local` (gitignored):
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_KEY` (anon key only — never put `service_role` key here)

### Database Schema

Migrations live in `supabase/migrations/` (run in Supabase SQL Editor in order). Entity model:

```
auth.users → profiles → schools
                          ↓
                     restaurants → menu_items
```

- `profiles` auto-created on signup via `handle_new_user` trigger on `auth.users`
- `schools` ← `restaurants` ← `menu_items` cascade on delete
- Prices are **integer cents** (`price_cents`). Buyer math: `floor(price_cents / 2) + 100`
- `is_active` / `is_available` soft-toggle rows; RLS policies enforce these filters
- RLS enabled on all tables. Authenticated users: read catalog, read/write own profile only. No client-side write access to schools, restaurants, or menu_items.

Verification queries: `supabase/verify.sql` (not a migration — run manually).

### Theming

Light/dark auto-detected via `useColorScheme` hook. Colors in `constants/theme.ts`. Components use `ThemedText` and `ThemedView` wrappers.

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/components/...`, `@/hooks/...`, etc.

## Key Constraints

- **Immutability**: Always create new objects, never mutate. See `.claude/rules/common/coding-style.md`.
- **TDD required**: Write tests first (RED → GREEN → REFACTOR). 80%+ coverage target.
- **File size**: 200-400 lines typical, 800 max. Functions under 50 lines.
- **Commit format**: `<type>: <description>` where type is feat/fix/refactor/docs/test/chore/perf/ci.
