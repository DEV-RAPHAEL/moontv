# Moon TV mobile

Expo (TypeScript) app for Android and iOS, built with `expo-router`. It reads the
public site's JSON API, so there is no separate mobile backend.

## Screens

- **Home** — featured carousel, live/up-next, categories, programme rails, and
  today's schedule, with pull-to-refresh.
- **Programmes** — searchable, category-grouped rails. Each category opens a
  three-column grid.
- **Schedule** — day selector and timeline, defaulting to today in Nigeria time,
  with pull-to-refresh.
- **Programme detail** — synopsis, talent, known airings, related programmes,
  and sharing by web URL.
- **Watch Live** — raised center action in the five-slot tab bar. Shows the
  configured `EXPO_PUBLIC_STREAM_URL` in a WebView, or a "Stream coming soon"
  state when no valid HTTP(S) URL is configured.
- **More** — links to the site's About, Contact, Advertise, and waitlist pages.

## Requirements

- Node.js 20 or newer
- The Expo Go app on your phone (same Expo SDK as this project), or an Android
  emulator / iOS simulator
- A deployed Moon TV web app that exposes `/api/programmes` and `/api/schedule`

## Run with Expo Go

```bash
cd mobile
npm install
cp .env.example .env
# Windows PowerShell: Copy-Item .env.example .env
```

Edit `.env`:

```bash
EXPO_PUBLIC_API_URL=https://your-deployed-site.example
EXPO_PUBLIC_STREAM_URL=
```

Use the origin where `/api/programmes` returns JSON, with no trailing slash.
Check it in a browser first. On a real phone, `localhost` points at the phone,
so local development needs your computer's LAN IP (for example
`http://192.168.1.10:3000`); the Android emulator uses `http://10.0.2.2:3000`.
Then start the dev server:

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). `npm start`,
`npm run android` and `npm run ios` are aliases for the same server.

`EXPO_PUBLIC_*` values are inlined when the bundle is built. After changing
`.env`, restart with `npx expo start -c` (or reload the app) to pick up the new
values.

## Build a preview APK with EAS

EAS builds run in the cloud; this repository does not run one for you.

```bash
cd mobile
npx eas-cli login
npx eas-cli init          # first time only: links the app to an EAS project
npx eas-cli build -p android --profile preview
```

The `preview` profile in `eas.json` sets `android.buildType` to `apk`,
`distribution` to `internal`, and `environment` to `preview`. When the build
finishes, EAS prints a download link for the APK. Install it on an Android
device (you may need to allow installing from unknown sources).

EAS Build does **not** read your local `.env` (it is gitignored), so create the
variables in the `preview` environment before building:

```bash
npx eas-cli env:create --name EXPO_PUBLIC_API_URL --value https://your-deployed-site.example --environment preview --visibility plaintext
npx eas-cli env:create --name EXPO_PUBLIC_STREAM_URL --value https://your-stream.example/embed --environment preview --visibility plaintext
```

Without them, the APK opens but every screen shows the "EXPO_PUBLIC_API_URL is
not set" error.

To run the build command with a global install instead:

```bash
npm install -g eas-cli
eas build -p android --profile preview
```

## Checks

```bash
cd mobile
npx expo-doctor
npx tsc --noEmit
```

## API notes and known limitations

- Verify the base URL before building. If `https://your-site/api/programmes`
  returns 404 or a TLS certificate error, the web app is not deployed at that
  origin yet, and the mobile app will show a network error.
- `/api/programmes` returns every programme in one response. The detail screen
  fetches that list and finds the matching `slug`, because the web app has no
  single-programme API route.
- `/api/schedule` currently returns only **today's remaining slots** (`day`,
  `nigeriaTime`, `slots`). The day tabs remain available, but other days show
  an empty state until the web app exposes a weekly schedule endpoint.
- Images are Sanity CDN URLs already returned by the API. If a programme has no
  thumbnail, the API falls back to `/hero_bg.jpg`, which this app resolves
  against `EXPO_PUBLIC_API_URL`.

## Project layout

```text
mobile/
  app/                 # expo-router tabs, stack screens, and layouts
  components/          # shared streaming UI and loading/error states
  lib/
    api.ts             # fetchers, env handling, image/text helpers
    schedule-now.ts    # Africa/Lagos current/next slot and progress helper
    types.ts           # exact response shapes from the web API routes
    theme.ts           # colours and spacing from the web brand
    useRequest.ts      # loading / error / refresh state
  app.json
  eas.json
  .env.example
```
