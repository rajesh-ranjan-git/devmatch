# DevMatch

DevMatch is a full-stack social discovery app for developers and engineers. It helps users create a developer profile, discover other profiles, send and manage connection requests, chat with accepted connections, receive notifications, and manage account/profile settings from a modern web client.

The repository is split into two apps:

- `devmatch-brainbox`: Express/MongoDB backend API, realtime socket server, auth, RBAC, conversations, push notifications, email, and media upload services.
- `devmatch-visualcortex`: Next.js frontend, app shell, protected routes, discovery UI, profile management, conversation UI, admin screens, subscription screens, and PWA assets.

## Current Feature Set

- Landing page for the DevMatch product.
- Email/password authentication with registration, login, logout, token refresh, email verification, forgot password, reset password, and password update flows.
- OAuth entry points for Google, GitHub, Facebook, and LinkedIn.
- Access and refresh token based sessions with active session listing and session revocation.
- Role-based access control with seeded roles and permissions.
- User account controls including account summary, email update, soft delete, admin status changes, and force logout.
- Developer profile management with username, personal details, gender, phone, DOB, bio, skills, interests, experience, avatar, and cover uploads.
- Social links and address management.
- Discover feed for browsing developer profiles.
- Connection workflow with interested, not-interested, accepted, rejected, and blocked states.
- Direct and group conversations with message send, edit, delete, search, delivery/seen receipts, reactions, pinned messages, and read state.
- Socket.IO integration for realtime app events.
- Push notification subscription support through Web Push/VAPID.
- Email delivery through Resend.
- Media upload support through Cloudinary and Google Drive service modules.
- Admin screens and APIs for users, roles, activity, analytics, reports, and settings.
- PWA manifest, service worker registration, mobile/desktop app icons, theme manager, and responsive app chrome.

## Tech Stack

### Backend: `devmatch-brainbox`

- Node.js with native ES modules.
- Express 5 for REST APIs.
- MongoDB with Mongoose 9.
- Socket.IO for realtime events.
- JSON Web Tokens, cookies, session documents, bcryptjs, and OAuth provider support.
- Resend and React Email rendering for transactional email.
- Web Push for browser notifications.
- Cloudinary, Multer, and Google Drive service helpers for images/uploads.
- Custom logger, response wrapper, request middleware, validation layer, and centralized error service.

### Frontend: `devmatch-visualcortex`

- Next.js 16 App Router with React 19.
- TypeScript 6.
- Tailwind CSS 4 via `@tailwindcss/postcss`.
- Zustand 5 for client state.
- Motion for UI animation.
- Socket.IO client for realtime events.
- React OAuth helpers, IndexedDB helper utilities, React Webcam, React Icons, and Recharts.
- Next proxy middleware for route protection based on the `refreshToken` cookie.

## Repository Layout

```text
devmatch/
  README.md
  devmatch-brainbox/
    src/server.js
    routes/
    controllers/
    middlewares/
    models/
    services/
    validators/
    seed/
    env/env-example.txt
    package.json
    README.md
  devmatch-visualcortex/
    src/app/
    src/components/
    src/lib/
    src/hooks/
    src/store/
    src/socket/
    src/types/
    public/
    env/env-example.txt
    package.json
    README.md
```

## Prerequisites

- Node.js 20 or newer is recommended for the current Next.js/React toolchain.
- npm.
- MongoDB, either local or Atlas.
- Optional service credentials for OAuth providers, Resend, Web Push, Google Drive, and Cloudinary.

## Environment Setup

Each app reads environment files from its own `env` directory. Create these files from the examples:

```bash
cp devmatch-brainbox/env/env-example.txt devmatch-brainbox/env/.env-development
cp devmatch-visualcortex/env/env-example.txt devmatch-visualcortex/env/.env-development
```

For production, create matching `.env-production` files in the same directories.

Default local ports used by the examples:

- Backend API: `http://localhost:1995`
- Frontend app: `http://localhost:1997`
- API base URL: `http://localhost:1995/api/v1`

Important backend variables include `HOST_PORT`, `HOST_URL`, `CLIENT_URL`, token secrets, MongoDB settings, VAPID keys, Resend settings, OAuth credentials, Google Drive settings, and Cloudinary settings.

Important frontend variables include `NEXT_PUBLIC_HOST_URL`, `NEXT_PUBLIC_HOST_VERSION`, `NEXT_PUBLIC_CLIENT_URL`, and public OAuth client IDs.

## Install

Install dependencies in both apps:

```bash
cd devmatch-brainbox
npm install

cd ../devmatch-visualcortex
npm install
```

## Run Locally

The easiest local workflow starts both apps from the frontend package:

```bash
cd devmatch-visualcortex
npm run dev
```

That command starts:

- Next.js on port `1997`.
- The backend server from `../devmatch-brainbox/src/server.js`.

You can also run the backend by itself:

```bash
cd devmatch-brainbox
npm run dev
```

## Seed Data

Seed scripts live in the backend and are also exposed from the frontend package:

```bash
cd devmatch-brainbox
npm run seed
npm run seed-users
npm run seed-connect
```

`seed` initializes RBAC data. The other scripts create sample users and sample connection data.

## Build And Checks

Backend syntax check:

```bash
cd devmatch-brainbox
npm run build
```

Frontend production build:

```bash
cd devmatch-visualcortex
npm run build
```

Frontend lint:

```bash
cd devmatch-visualcortex
npm run lint
```

## API Overview

All backend routes are mounted under `/api/v1`.

- `/auth`: registration, login, logout, refresh, current user, email verification, password reset, password update.
- `/oauth`: OAuth provider callback/linking endpoints.
- `/user`: account, dashboard summary, sessions, activity, profile, social links, and addresses.
- `/admin`: users, roles, activity, and stats.
- `/discover`: discoverable profile feed.
- `/connection`: connection actions, connections list, and requests list.
- `/conversation`: direct/group conversations and messages.
- `/push-notifications`: browser push subscription.

See [devmatch-brainbox/README.md](devmatch-brainbox/README.md) for endpoint details.

## Frontend Routes

- `/`: landing page.
- `/register`, `/login`, `/forgot-password`, `/reset-password`, `/verify-email`, `/oauth`: auth flows.
- `/discover`: profile discovery.
- `/profile` and `/profile/[userName]`: own and public profile views.
- `/conversation` and `/conversation/[userName]`: messaging.
- `/subscription` and `/subscription/payment`: subscription and payment UI.
- `/admin/[type]`: admin sections such as dashboard, users, analytics, reports, and settings.

See [devmatch-visualcortex/README.md](devmatch-visualcortex/README.md) for frontend details.

## Notes

- The frontend uses a `refreshToken` cookie in proxy middleware to protect authenticated routes.
- The API also accepts Bearer tokens from the frontend API handler when `requireAuth` is used.
- API responses go through a shared response service, and errors go through a centralized error service.
- Some service integrations are optional for local development, but related features will need credentials to work end to end.
