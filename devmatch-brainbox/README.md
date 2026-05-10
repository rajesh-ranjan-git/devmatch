# DevMatch Brainbox

`devmatch-brainbox` is the backend for DevMatch. It exposes the REST API, owns MongoDB persistence, handles auth and authorization, powers realtime socket events, and integrates with external services for email, push notifications, OAuth, and media storage.

## Live Deployment

- Backend URL: `https://devmatch-brainbox.onrender.com`
- API base URL: `https://devmatch-brainbox.onrender.com/api/v1`
- Frontend client URL: `https://devmatch-indol-seven.vercel.app`

## Stack

- Node.js with ES modules.
- Express 5.
- MongoDB with Mongoose 9.
- Socket.IO.
- JWT access/refresh tokens, cookies, sessions, bcryptjs, and OAuth provider support.
- RBAC with roles, permissions, hierarchy checks, and ownership checks.
- Resend plus React Email rendering.
- Web Push with VAPID keys.
- Multer, Cloudinary, and Google Drive service helpers for image upload/storage.
- Custom middleware for authentication, authorization, request validation, rate limiting, uploads, OAuth, and conversation access checks.

## Scripts

```bash
npm run dev          # Start the API in development with nodemon
npm start            # Start the API in production mode
npm run seed         # Seed roles and permissions
npm run seed-users   # Seed sample users
npm run seed-connect # Seed sample connections
npm run check        # Syntax-check src/server.js
npm run build        # Alias for npm run check
```

## Environment

Create `env/.env-development` from `env/env-example.txt`. For production, create `env/.env-production`.

Common local values:

```env
NODE_ENV=development
HOST_PORT=1995
CLIENT_PORT=1997
HOST_VERSION=v1
CLIENT_VERSION=v1
HOST_URL=http://localhost:1995
CLIENT_URL=http://localhost:1997
DB_LOCAL_URI=mongodb://localhost:27017
DB_LOCAL_NAME=devmatch-local
```

Production should point the client and host values at the live apps:

```env
NODE_ENV=production
HOST_URL=https://devmatch-brainbox.onrender.com
CLIENT_URL=https://devmatch-indol-seven.vercel.app
HOST_VERSION=v1
CLIENT_VERSION=v1
```

You will also need secrets for access/refresh tokens, JWT metadata, and any service you want to enable: Resend, VAPID, OAuth providers, Google Drive, and Cloudinary.

## App Entry

The server starts from `src/server.js`.

It configures:

- JSON body parsing.
- CORS for `HOST_URL` and `CLIENT_URL` with credentials.
- Cookie parsing.
- API route mounts under `/api/v1`.
- A favicon no-content handler.
- A route-not-found handler.
- Centralized error response handling.
- HTTP server creation.
- Socket.IO initialization.
- MongoDB connection.
- Database-backed logging adapter.

## Route Map

All endpoints are mounted under `/api/v1`.

### Auth: `/auth`

```text
GET    /me
POST   /register
POST   /login
POST   /logout
POST   /refresh
POST   /email/verify
POST   /email/verification/resend
POST   /password/forgot
POST   /password/reset
PUT    /password
```

### OAuth: `/oauth`

```text
POST   /provider/:provider
GET    /provider/:provider
GET    /provider
DELETE /provider/unlink
```

Supported provider config exists for Google, GitHub, Facebook, and LinkedIn.

### User Account, Sessions, And Activity: `/user`

```text
GET    /account
GET    /dashboard/summary
PUT    /email
DELETE /account

GET    /session
GET    /session/count
DELETE /session/revoke/:sessionId
DELETE /session/revoke/other

GET    /activity
GET    /activity/types
DELETE /activity/clear
```

### Profile, Social Links, And Addresses: `/user`

```text
GET    /profile
GET    /profile/:userName
PATCH  /profile
PUT    /profile/userName
POST   /profile/gender
POST   /profile/phone
POST   /profile/dob
POST   /profile/:provider/upload/:type
POST   /profile/skills
POST   /profile/experience

GET    /social
GET    /social/:userId
PATCH  /social
DELETE /social/:platform

GET    /address
GET    /address/:addressId
POST   /address/create
PATCH  /address/:addressId
DELETE /address/:addressId
DELETE /address
POST   /address/default/:addressId
```

### Admin: `/admin`

```text
GET    /user/list
GET    /user/:userId
PATCH  /user/:userId/status
POST   /user/:userId/logout
DELETE /user/:userId

GET    /role/list
POST   /role/create
POST   /role/assign/:userId
PATCH  /role/:roleId
DELETE /role/:roleId

GET    /activity/:userId
GET    /stats
```

### Discover And Connections

```text
GET    /discover/profiles

POST   /connection/connect/:userId
GET    /connection/connections
GET    /connection/requests
```

### Conversations And Messages: `/conversation`

```text
POST   /direct/:userName
POST   /group
PATCH  /group/:conversationId
POST   /group/:conversationId/members
DELETE /group/:conversationId/members/:memberId
PATCH  /group/:conversationId/members/:memberId/role
GET    /
GET    /:conversationId
DELETE /:conversationId
PATCH  /:conversationId/read

POST   /message/:conversationId/message
GET    /message/:conversationId/messages
GET    /message/:conversationId/messages/search
PATCH  /message/:conversationId/messages/:messageId
DELETE /message/:conversationId/messages/:messageId
PATCH  /message/:conversationId/messages/:messageId/delivered
PATCH  /message/:conversationId/messages/:messageId/seen
POST   /message/:conversationId/messages/:messageId/reactions
POST   /message/:conversationId/pinned/:messageId
DELETE /message/:conversationId/pinned/:messageId
```

### Push Notifications

```text
POST   /push-notifications/subscribe
```

## Data Model Overview

- `User`: account shell with status, email/phone verification flags, last seen, soft-delete timestamp, and virtual links to account/profile.
- `Account`: credential/account data used by auth flows.
- `AuthProvider`: linked OAuth providers.
- `Session`: refresh/session tracking and revocation.
- `VerificationToken`: email verification and password reset tokens.
- `ActivityLog`: user account/security events.
- `Role`, `Permission`, `UserRole`: RBAC data.
- `Profile`: username, name, gender, phone, DOB, marital status, bio, avatar/cover, experiences, skills, interests, and computed virtuals.
- `Address`: user address records.
- `Social`: social profile links.
- `Connection`: sender/receiver relationship with interested, not-interested, accepted, rejected, and blocked states.
- `Conversation`: direct/group/channel conversations with participants, last message, pinned messages, group settings, and call history.
- `Message`: text/media/location/call messages, replies, forwards, receipts, reactions, deletion, and edit history.
- `Notification`: connection/chat notifications.
- `PushNotification`: browser push subscriptions.
- `Log`: application log records.

## Project Structure

```text
controllers/   Request handlers grouped by domain
routes/        Express route definitions
middlewares/   Auth, authorization, validation, uploads, OAuth, rate limiting
models/        Mongoose schemas
services/      Auth, RBAC, socket, email, logger, response, OAuth, drive, banner
validators/    Request validation helpers
utils/         Domain utilities
db/            MongoDB connection and model setup
seed/          RBAC, sample users, and sample connection seeders
constants/     Env, roles, permissions, regex, common constants
config/        App, HTTP, logger, Cloudinary, role/permission config
```

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

From this backend package only:

```bash
npm install
npm run dev
```

The API should be available at `HOST_URL`, usually `http://localhost:1995`, with routes under `/api/v1`.
