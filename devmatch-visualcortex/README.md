# DevMatch 💻❤️

**DevMatch** is a modern matchmaking app designed exclusively for software developers. Whether you're looking for coding buddies, tech collaborators, or just like-minded devs to hang out with, DevMatch helps you connect with fellow developers based on your skills, interests, and vibe.

---

## 🚀 Tech Stack

### Frontend (devmatch-visualcortex):

- **[Next.js](https://nextjs.org/)** – React-based framework for server-side rendering and routing.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Motion](https://motion.dev/)** Web (UI) animation library for React, JavaScript and Vue.
- **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight state management solution for React.

### Backend (devmatch-brainbox):

- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)** – Fast and minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database for scalable and flexible data storage.

---

## 🔥 Features (Planned & In Progress)

### 🎨 Frontend (devmatch-visualcortex):

- [x] User registration & login
- [x] Developer profile creation
- [x] Swipe-based match interface
- [ ] In-app messaging between matched users
- [ ] In-app calling between matched users
- [x] Real-time notifications
- [x] Block functionality
- [ ] Report functionality
- [x] Profile visibility controls
- [x] Profile update controls
- [ ] GitHub/Linkedin integration
- [ ] Admin dashboard for moderation

### 🤖 Backend (devmatch-brainbox):

- [x] User registration, login, logout, forgot password
- [x] Authentication
- [x] Real-time notifications
- [x] Explore and connect with fellow developers
- [x] Block functionality
- [ ] Report functionality
- [x] Profile visibility controls
- [x] Profile update controls
- [ ] Google Authentication integration
- [ ] In-app messaging between matched users
- [ ] In-app calling between matched users
- [ ] GitHub/LinkedIn integration
- [ ] Admin dashboard for moderation

---

## 🪲 Known Bugs

- Explore page seems like it keeps refreshing till toast notification is active.
- While logging in the submit button when changes state from normal to loading or vice-versa, animation is not smooth.
- When connection action is taken, the item removes in flash, it should be removed smoothly to the left with opacity transition.
- Sometimes after login, the page is not moving explore, upon refresh the page sometimes still stays on login and does not move to explore.
- Repeated code blocks related to connection actions.
- Unnecessary multiple api calls in explore, profile and connection actions probably because of proxy.
- When connection request is already sent, either it should not show that user's card on explore or it should allow to send the interested request again and should not throw error.
- Notifications gets removed abruptly, it should have a sliding effect to the left and get removed.
- Requests and connections gets removed abruptly, it should have a sliding effect to the left and get removed.
- Upon submitting form if the token gets expired, it throws error but it should just redirect to login.
- When password is expired, it stays on login window, there should be a new window to get user to reset the password.
- Pagination is not working on explore.
- Conflicts has happened, need to check.

---

## 📁 Folder Structure

```bash
devmatch
│
├── 📁 .vscode
│
├── 🤖 devmatch-brainbox 🤖
│    ├── 📁 banner
│    │    └── banner.js
│    │
│    ├── 📁 config
│    │    ├── config.js
│    │    ├── constants.js
│    │    └── dbConfig.js
│    │
│    ├── 📁 controllers
│    │    ├── connection.js
│    │    ├── explore.js
│    │    ├── notification.js
│    │    ├── profile.js
│    │    └── user.js
│    │
│    ├── 📁 db
│    │    ├── connectDB.js
│    │    ├── sample_user.js
│    │    └── seedDb.js
│    │
│    ├── 📁 env
│    │    ├── .env-development
│    │    └── .env-production
│    │
│    ├── 📁 errors
│    │    └── CustomError.js
│    │
│    ├── 📁 middleware
│    │    ├── auth.js
│    │    └── request.js
│    │
│    ├── 📁 models
│    │    ├── connection.js
│    │    ├── notification.js
│    │    └── user.js
│    │
│    ├── 📁 routes
│    │    ├── connection.js
│    │    ├── explore.js
│    │    ├── notification.js
│    │    ├── profile.js
│    │    └── user.js
│    │
│    ├── 📁 socket
│    │    └── socket.js
│    │
│    ├── 📁 src
│    │    └── server.js
│    │
│    ├── 📁 utils
│    │    ├── authUtils.js
│    │    └── utils.js
│    │
│    ├── 📁 validations
│    │    └── validation.js
│    │
│    ├── .gitignore
│    ├── package-lock.json
│    ├── package.json
│    └── README.md
│
├── 🧩 devmatch-visualcortex 🧩
│    ├── 📁 .next
│    │
│    ├── 📁 public
│    │    └── 📁 assets
│    │         ├── 📁 avatar
│    │         │    └── user.webp
│    │         │
│    │         ├── 📁 error
│    │         │    └── 404-error.webp
│    │         │
│    │         ├── 📁 fonts
│    │         │    └── ansi_shadow.flf
│    │         │
│    │         └── 📁 logo
│    │              ├── devmatch-logo-transparent-circular.png
│    │              ├── devmatch-logo-transparent-circular.webp
│    │              ├── devmatch-logo-transparent.png
│    │              ├── devmatch-logo-transparent.webp
│    │              ├── devmatch-logo-white-circular.png
│    │              ├── devmatch-logo-white-circular.webp
│    │              ├── devmatch-logo-white.png
│    │              ├── devmatch-logo-white.webp
│    │              └── favicon.ico
│    │
│    ├── 📁 src
│    │    ├── 📁 app
│    │    │    ├── 📁 (auth)
│    │    │    │    ├── 📁 forgot-password
│    │    │    │    │    └── page.tsx
│    │    │    │    │
│    │    │    │    ├── 📁 login
│    │    │    │    │    └── page.tsx
│    │    │    │    │
│    │    │    │    ├── 📁 register
│    │    │    │    │    └── page.tsx
│    │    │    │    │
│    │    │    │    ├── layout.tsx
│    │    │    │    └── loading.tsx
│    │    │    │
│    │    │    ├── 📁 explore
│    │    │    │    └── page.tsx
│    │    │    │
│    │    │    ├── 📁 profile
│    │    │    │    │
│    │    │    │    ├── 📁 [id]
│    │    │    │    │    └── page.tsx
│    │    │    │    │
│    │    │    │    └── page.tsx
│    │    │    │
│    │    │    ├── favicon.ico
│    │    │    ├── global-error.tsx
│    │    │    ├── globals.css
│    │    │    ├── layout.tsx
│    │    │    ├── not-found.tsx
│    │    │    └── page.tsx
│    │    │
│    │    ├── 📁 components
│    │    │    ├── 📁 auth
│    │    │    │    ├── authForm.tsx
│    │    │    │    ├── authFormWrapper.tsx
│    │    │    │    └── checkAuth.tsx
│    │    │    │
│    │    │    ├── 📁 background
│    │    │    │    ├── animatedBackground.tsx
│    │    │    │    ├── animatedFloatingSquares.tsx
│    │    │    │    └── defaultAnimatedBackground.tsx
│    │    │    │
│    │    │    ├── 📁 banner
│    │    │    │    └── consoleBanner.tsx
│    │    │    │
│    │    │    ├── 📁 connections
│    │    │    │    ├── connections.tsx
│    │    │    │    └── sheetItem.tsx
│    │    │    │
│    │    │    ├── 📁 errors
│    │    │    │    ├── errorWrapper.tsx
│    │    │    │    └── formErrorMessage.tsx
│    │    │    │
│    │    │    ├── 📁 explore
│    │    │    │    ├── nameCardContent.tsx
│    │    │    │    ├── singleUserCard.tsx
│    │    │    │    ├── userCard.tsx
│    │    │    │    └── userDetailsCardContent.tsx
│    │    │    │
│    │    │    ├── 📁 flash
│    │    │    │    └── flash.tsx
│    │    │    │
│    │    │    ├── 📁 header
│    │    │    │    ├── 📁 navbar
│    │    │    │    │    ├── navbar.tsx
│    │    │    │    │    └── navbarRight.tsx
│    │    │    │    │
│    │    │    │    ├── 📁 notifications
│    │    │    │    │    ├── notifications.tsx
│    │    │    │    │    ├── notificationsHeading.tsx
│    │    │    │    │    └── notificationsItem.tsx
│    │    │    │    │
│    │    │    │    ├── header.tsx
│    │    │    │    └── logo.tsx
│    │    │    │
│    │    │    ├── 📁 main
│    │    │    │    ├── defaultMainContent.tsx
│    │    │    │    └── main.tsx
│    │    │    │
│    │    │    ├── 📁 profile
│    │    │    │    ├── deleteAccountContext.tsx
│    │    │    │    ├── profileCover.tsx
│    │    │    │    ├── profileDetails.tsx
│    │    │    │    ├── profileDetailsUpdateContext.tsx
│    │    │    │    ├── profileDetailsUpdateDropdown.tsx
│    │    │    │    ├── profileTabularData.tsx
│    │    │    │    ├── singleProfileDetailsUpdateContext.tsx
│    │    │    │    └── updatePasswordContext.tsx
│    │    │    │
│    │    │    ├── 📁 socialMedia
│    │    │    │    ├── socialMedia.tsx
│    │    │    │    └── socialMediaItem.tsx
│    │    │    │
│    │    │    ├── 📁 theme
│    │    │    │    ├── themeManager.tsx
│    │    │    │    └── themeToggle.tsx
│    │    │    │
│    │    │    └── 📁 ui
│    │    │         ├── 📁 buttons
│    │    │         │    ├── buttonDestructive.tsx
│    │    │         │    ├── buttonNormal.tsx
│    │    │         │    ├── buttonSuccess.tsx
│    │    │         │    ├── buttonWarning.tsx
│    │    │         │    ├── connectionsButton.tsx
│    │    │         │    ├── notificationsButton.tsx
│    │    │         │    ├── profileCoverEditButton.tsx
│    │    │         │    ├── profilePhotoEditButton.tsx
│    │    │         │    ├── submitButton.tsx
│    │    │         │    └── userInfoButton.tsx
│    │    │         │
│    │    │         ├── 📁 chips
│    │    │         │    └── chips.tsx
│    │    │         │
│    │    │         ├── 📁 contextMenu
│    │    │         │    └── contextMenu.tsx
│    │    │         │
│    │    │         ├── 📁 dropdown
│    │    │         │    └── dropdown.tsx
│    │    │         │
│    │    │         ├── 📁 inputs
│    │    │         │    ├── input.tsx
│    │    │         │    ├── radio.tsx
│    │    │         │    └── textarea.tsx
│    │    │         │
│    │    │         ├── 📁 loaders
│    │    │         │    └── initialLoader.tsx
│    │    │         │
│    │    │         ├── 📁 separators
│    │    │         │    ├── horizontalSeparator.tsx
│    │    │         │    └── verticalSeparator.tsx
│    │    │         │
│    │    │         └── 📁 sheet
│    │    │              └── sheet.tsx
│    │    │
│    │    ├── 📁 config
│    │    │    ├── config.tsx
│    │    │    └── constants.ts
│    │    │
│    │    ├── 📁 hooks
│    │    │    ├── toast.tsx
│    │    │    ├── useContextMenu.tsx
│    │    │    ├── useOutsideClick.tsx
│    │    │    ├── useSheet.tsx
│    │    │    └── useWebStorage.tsx
│    │    │
│    │    ├── 📁 lib
│    │    │    │
│    │    │    ├── 📁 actions
│    │    │    │    ├── actions.ts
│    │    │    │    ├── authActions.ts
│    │    │    │    └── profileActions.ts
│    │    │    │
│    │    │    ├── 📁 api
│    │    │    │    ├── api.ts
│    │    │    │    ├── apiHandler.ts
│    │    │    │    ├── apiUtils.ts
│    │    │    │    └── cookiesHandler.ts
│    │    │    │
│    │    │    ├── 📁 routes
│    │    │    │    └── routes.ts
│    │    │    │
│    │    │    ├── 📁 utils
│    │    │    │    └── utils.ts
│    │    │    │
│    │    │    └── 📁 validations
│    │    │         └── validations.ts
│    │    │
│    │    ├── 📁 socket
│    │    │    └── socket.tsx
│    │    │
│    │    ├── 📁 store
│    │    │    └── store.tsx
│    │    │
│    │    └── 📁 types
│    │         ├── propTypes.ts
│    │         └── types.ts
│    │
│    ├── .gitignore
│    ├── eslint.config.mjs
│    ├── next.config.ts
│    ├── package-lock.json
│    ├── package.json
│    ├── postcss.config.mjs
│    ├── README.md
│    └── tsconfig.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18.x
- MongoDB (Atlas or local instance)

---

### 1. Clone the Repository

```bash
git clone https://github.com/rajesh-ranjan-git/devmatch.git
cd devmatch
```

---

### 2. Setup Environment Variables

Create `.env` files:

- `devmatch-visualcortex/env/.env-development`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- `devmatch-brainbox/env/.env-development`

```env
# Environment
NODE_ENV=development

# Ports
BRAINBOX_PORT=5000
VISUALCORTEX_PORT=3000

# Host URLs
BRAINBOX_HOST_URL=http://localhost:5000
VISUALCORTEX_HOST_URL=http://localhost:3000

# Secret Keys
BRAINBOX_SESSION_SECRET_KEY=
BRAINBOX_JWT_SECRET_KEY=

# Database Configurations
DB_LOCAL_URI=mongodb://localhost:27017
DB_LOCAL_NAME=devmatch-local
DB_BASE_URI=
DB_CLUSTER=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

### 3. Install Dependencies

```bash
# Backend
cd ../devmatch-brainbox
npm install

# Frontend
cd devmatch-visualcortex
npm install
```

---

### 4. Run the App

```bash
# Start backend
cd devmatch-brainbox
npm run dev

# Start frontend
cd ../devmatch-visualcortex
npm run dev
```

---

## 🛠️ Dev Tools & Libraries

- **Authentication:** JSON Web Tokens (JWT), Bcrypt JS
- **Database ORM:** Mongoose
- **API Testing:** Postman
- **UI Dev:** Next JS., Tailwind CSS
- **UI Animations:** Motion
- **State Management:** Zustand
- **Future Upgrades:** WebSockets for chat, Docker, CI/CD pipelines

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 🧠 Inspiration

Built with passion for the dev community. Why swipe left or right on strangers when you can swipe on someone who knows what a merge conflict is?
