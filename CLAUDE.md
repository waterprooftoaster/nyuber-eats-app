# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (opens QR code for Expo Go)
npx expo start --ios    # Start on iOS simulator
npx expo start --android
npm run lint            # ESLint via expo preset
npx tsc --noEmit        # Type-check (no test runner configured yet)
```

## Architecture

**Stack:** React Native + Expo (~54) + expo-router v6 (file-based routing) + TypeScript strict mode.

**Routing** (`app/` directory):
- `app/_layout.tsx` — root Stack navigator, `headerShown: false`
- `app/index.tsx` — home screen (horizontal restaurant carousel)
- `app/restaurant/[id].tsx` — detail screen (hero + 2-column menu grid)
- Dynamic params accessed via `useLocalSearchParams<{ id: string }>()`

**Data layer** (`data/mock-restaurants.ts`):
- Two exported types: `Restaurant` and `MenuItem`
- One exported constant: `RESTAURANTS` (array of 10 mock restaurants)
- `image` fields are empty strings — all images rendered as placeholder `View` elements
- This is the only data source; there is no API or state management yet

**Styling conventions:**
- All styles are inline objects (no stylesheet abstraction, no CSS-in-JS library)
- Each screen defines its own `const COLORS` object at the top of the file
- `SIDE_PADDING = 16` and similar layout constants are local to each screen

**Path alias:** `@/*` resolves to the repo root (configured in `tsconfig.json`).

**Safe area:** `SafeAreaView` from `react-native-safe-area-context` (not the RN built-in) is used for the top inset on the home screen. Detail screen uses `ScrollView` which handles its own insets.
