# DevMatch 💻❤️

**DevMatch** is a modern matchmaking app designed exclusively for software developers. Whether you're looking for coding buddies, tech collaborators, or just like-minded devs to hang out with, DevMatch helps you connect with fellow developers based on your skills, interests, and vibe.

---

## 🚀 Tech Stack

### Frontend (devmatch-visualcortex):

- **[Next.js](https://nextjs.org/)** – React-based framework for server-side rendering and routing.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Motion](https://motion.dev/)** Web (UI) animation library for React, JavaScript and Vue.
- **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight state management solution for React.

---

## 📁 Folder Structure

```bash
devmatch
│
├── 📁 .vscode
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

## 🛠️ Dev Tools & Libraries

- **Authentication:** JSON Web Tokens (JWT), Bcrypt JS
- **Database ORM:** Mongoose
- **API Testing:** Postman
- **UI Dev:** Next JS., Tailwind CSS
- **UI Animations:** Motion
- **State Management:** Zustand
- **Future Upgrades:** WebSockets for chat, Docker, CI/CD pipelines

---
