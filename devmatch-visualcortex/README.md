# DevMatch VisualCortex

`devmatch-visualcortex` is the Next.js frontend for DevMatch. It provides the public landing page, auth screens, protected app shell, discovery flow, profile editor, conversation UI, admin sections, subscription/payment screens, push notification registration, and PWA assets.

## Live Deployment

- Frontend URL: `https://devmatch-indol-seven.vercel.app`
- Backend URL: `https://devmatch-brainbox.onrender.com`
- Production API base URL: `https://devmatch-brainbox.onrender.com/api/v1`

## Stack

- Next.js 16 App Router.
- React 19.
- TypeScript 6.
- Tailwind CSS 4 through `@tailwindcss/postcss`.
- Zustand for app state.
- Motion for UI animations.
- Socket.IO client.
- React OAuth helpers.
- IndexedDB helper utilities.
- React Webcam for camera-based image capture flows.
- Recharts for admin/analytics charts.
- React Icons.
- Next proxy middleware for route protection.

## Scripts

```bash
npm run dev          # Start the frontend on port 1997
npm run build        # Build the Next.js app
npm start            # Start the frontend in production mode on port 1997
npm run lint         # Run ESLint
npm run seed         # Run backend RBAC seed
npm run seed-users   # Run backend user seed
npm run seed-connect # Run backend connection seed
```

## Environment

Create `env/.env-development` from `env/env-example.txt`. For production, create `env/.env-production`.

Default local values:

```env
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_HOST_PORT=1995
NEXT_PUBLIC_CLIENT_PORT=1997
NEXT_PUBLIC_HOST_VERSION=v1
NEXT_PUBLIC_CLIENT_VERSION=v1
NEXT_PUBLIC_HOST_URL=http://localhost:1995
NEXT_PUBLIC_CLIENT_URL=http://localhost:1997
```

The frontend builds `HOST_API_URL` as:

```text
NEXT_PUBLIC_HOST_URL + /api/ + NEXT_PUBLIC_HOST_VERSION
```

With the defaults above, API requests go to `http://localhost:1995/api/v1`.

Production values should point to the deployed apps:

```env
NEXT_PUBLIC_NODE_ENV=production
NEXT_PUBLIC_HOST_URL=https://devmatch-brainbox.onrender.com
NEXT_PUBLIC_CLIENT_URL=https://devmatch-indol-seven.vercel.app
NEXT_PUBLIC_HOST_VERSION=v1
NEXT_PUBLIC_CLIENT_VERSION=v1
```

With those values, API requests go to `https://devmatch-brainbox.onrender.com/api/v1`.

Public OAuth client IDs can also be provided for Google, GitHub, Facebook, and LinkedIn.

## Routes

```text
/                         Landing page
/register                 Registration
/login                    Login
/forgot-password          Forgot password
/reset-password           Reset password
/verify-email             Email verification
/oauth                    OAuth popup/callback UI
/discover                 Developer discovery
/profile                  Current user's profile
/profile/[userName]       Public profile
/conversation             Conversation list/page
/conversation/[userName]  Direct conversation entry
/subscription             Subscription plans
/subscription/payment     Payment flow
/admin/[type]             Admin dashboard, users, analytics, reports, settings
```

## Authentication And Route Protection

- `src/proxy.ts` protects authenticated routes using the `refreshToken` cookie.
- Auth routes redirect to `/` when a refresh token is already present.
- Protected routes redirect to `/login` when no refresh token is present.
- `/verify-email` and `/reset-password` are allowed without a refresh token.
- API calls use `credentials: "include"` and can attach a Bearer token from the Zustand store when `requireAuth` is set.

## Feature Areas

- `src/components/landing`: public homepage sections.
- `src/components/auth` and `src/components/forms/auth`: auth layouts and forms.
- `src/components/layout`: header, sidebar, bottom navigation, and app chrome.
- `src/components/discover`: swipe/discovery cards and action controls.
- `src/components/profile`: profile display and profile editing components.
- `src/components/forms/profile`: focused profile update forms.
- `src/components/conversation`: conversation list, message window, message bubbles, composer, and empty states.
- `src/components/subscription`: pricing, billing toggle, comparison, order summary, and payment form.
- `src/components/admin`: admin wrapper, sidebar, stat cards, charts, and activity feed.
- `src/components/push`: push notification UI.
- `src/components/service-worker`: service worker registration.
- `src/components/theme`: theme manager and toggle.

## Client Architecture

- `src/lib/api`: typed API client, cookie helpers, and API utilities.
- `src/lib/actions`: frontend action modules for auth, OAuth, profile, discover, connections, conversations, and common actions.
- `src/lib/routes`: centralized route constants.
- `src/services`: client-side service modules.
- `src/store`: Zustand app store.
- `src/socket`: Socket.IO client setup.
- `src/hooks`: reusable hooks for toast, OAuth listener, network actions, sheet state, outside click, storage, screen width, and field validation.
- `src/helpers` and `src/utils`: shared frontend helpers and utilities.
- `src/validators`: auth/profile/common validation helpers.
- `src/types`: shared type and prop definitions.
- `src/config` and `src/constants`: app config, forms, profile fields, OAuth config, fonts, HTTP status config, regex, and env constants.

## PWA And Assets

- `public/manifest/manifest.json` defines the PWA manifest.
- `public/serviceWorker/serviceWorker.js` is registered by the root layout.
- Android, iOS, Windows, favicon, app logo, avatar, cover, error, and font assets live under `public/assets`.

## Local Development

From the repository root, install all package dependencies and start both apps together:

```bash
npm install
cd devmatch-brainbox
npm install
cd ../devmatch-visualcortex
npm install
cd ..
npm run dev
```

From this frontend package only:

```bash
npm install
npm run dev
```

Open `http://localhost:1997`.

The backend must have its own `env/.env-development` configured when running the full workspace dev script from the root.

## Build

```bash
npm run build
npm run lint
```
