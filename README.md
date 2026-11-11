# Moon TV

Public website for Moon TV, a Nigerian cultural and entertainment broadcaster. The site shows programmes, a weekly schedule, a live stream, and contact/advertising/waitlist forms, with all editorial content managed in Sanity Studio.

## Tech stack

- Next.js 16 (App Router) and React 19
- Sanity CMS, embedded at `/studio`
- Resend for transactional email (called with `fetch`, no SDK)
- Vitest for unit tests
- Plain CSS (`src/app/globals.css`, `src/app/home.css`)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site builds and renders without any environment variables, but content, forms and the live stream stay empty or disabled until the matching services are configured.

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | `https://moontvonline.com` | Canonical URL, sitemap, robots and social previews |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes, for content | none | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | `production` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | `2025-01-01` | Sanity API version |
| `RESEND_API_KEY` | Yes, for forms | none | Resend API key |
| `CONTACT_TO_EMAIL` | Yes, for forms | none | Inbox that receives form submissions |
| `CONTACT_FROM_EMAIL` | Yes, for forms | none | Verified Resend sender address |
| `NEXT_PUBLIC_STREAM_URL` | Yes, for live TV | none | Embeddable live stream URL (http/https) |

`NEXT_PUBLIC_*` values are baked in at build time. Changing them requires a rebuild.

Forms return `503` when the Resend variables are missing, so a submission never appears to succeed when no email was sent.

## Sanity content

1. Create a project at <https://www.sanity.io/manage>.
2. Put its project ID and dataset in `.env.local`.
3. Start the app and open <http://localhost:3000/studio> to edit content directly.
4. To import the legacy programmes and weekly schedule from `scripts/legacy-programmes.ts` and `scripts/legacy-schedule.ts`:

```bash
npx sanity exec scripts/seed.ts --with-user-token
```

The seed script links every schedule slot to a programme by reference. It skips playlist/movie slots that have no programme slug, and skips slots whose slug has no matching programme, printing both counts and any missing slugs. Thumbnails are not imported; upload them in Studio.

Run the seed before editing content in Studio: it uses `createOrReplace`, so re-running it overwrites programme fields such as thumbnail, description and featured.

Some legacy EPG entries reference programmes that were never part of the legacy programme list (`comfort-zone`, `crossed-roads`, `enu-ofe`, `get-to-know`, `hello-nigeria`, `the-stem-show`, `youth-network`). Those slots are not seeded and must be recreated in Studio.

## Forms

Contact, advertising and waitlist submissions are sent through Resend to `CONTACT_TO_EMAIL` from `CONTACT_FROM_EMAIL`. The sending domain must be verified in Resend. Each form includes a hidden honeypot field, and the three API routes share an in-memory per-IP limit of 10 requests per 10 minutes. The limiter resets on redeploy and is per server instance; use a shared store if the site runs on multiple instances.

## Live stream

Set `NEXT_PUBLIC_STREAM_URL` to an embeddable player URL and rebuild. When it is unset or invalid, Watch Live buttons are disabled and `/watch` shows an empty state. Providers that send `X-Frame-Options` or a restrictive CSP will not embed; use the provider's embed URL.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm start        # production server
npm run lint     # ESLint
npm test         # Vitest unit tests
```

## Known limitations

- Accounts, favourites and other signed-in features are not implemented.
- The rate limiter is in-memory and not shared between instances.
- Programme thumbnails and the seven missing EPG programmes need manual work in Studio.
- Real Sanity, Resend and stream integrations require live credentials and have not been exercised by the test suite.
