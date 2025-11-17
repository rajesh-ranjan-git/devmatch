# 📁 Folder Structure

![Folder Structure](https://img.shields.io/badge/Folder-Structure-blue?style=for-the-badge&logo=fastapi)

```bash
devmatch/
│
└── 📁 devmatch-visualcortex
     ├── 📁 .next
     │
     ├── 📁 public
     │    └── 📁 assets
     │         ├── 📁 avatar
     │         │    └── default-avatar-profile-picture-male-icon.webp
     │         │
     │         ├── 📁 error
     │         │    └── 404-error.webp
     │         │
     │         ├── 📁 logo
     │         │    ├── devmatch-logo-transparent-circular.png
     │         │    ├── devmatch-logo-transparent-circular.webp
     │         │    ├── devmatch-logo-transparent.png
     │         │    ├── devmatch-logo-transparent.webp
     │         │    ├── devmatch-logo-white-circular.png
     │         │    ├── devmatch-logo-white-circular.webp
     │         │    ├── devmatch-logo-white.png
     │         │    ├── devmatch-logo-white.webp
     │         │    └── favicon.ico
     │         │
     │         ├── IMG_8.JPG
     │         └── profile_photo_square.png
     │
     ├── 📁 src
     │    ├── 📁 app
     │    │    ├── 📁 (auth)
     │    │    │    ├── 📁 forgot-password
     │    │    │    │    └── page.tsx
     │    │    │    │
     │    │    │    ├── 📁 login
     │    │    │    │    └── page.tsx
     │    │    │    │
     │    │    │    ├── 📁 register
     │    │    │    │    └── page.tsx
     │    │    │    │
     │    │    │    ├── layout.tsx
     │    │    │    └── loading.tsx
     │    │    │
     │    │    ├── 📁 explore
     │    │    │    └── page.tsx
     │    │    │
     │    │    ├── 📁 profile
     │    │    │     └── page.tsx
     │    │    │
     │    │    ├── favicon.ico
     │    │    ├── global-error.tsx
     │    │    ├── globals.css
     │    │    ├── layout.tsx
     │    │    ├── not-found.tsx
     │    │    └── page.tsx
     │    │
     │    ├── 📁 components
     │    │    ├── 📁 auth
     │    │    │    ├── authForm.tsx
     │    │    │    ├── authFormWrapper.tsx
     │    │    │    ├── checkAuthWrapper.tsx
     │    │    │    └── input.tsx
     │    │    │
     │    │    ├── 📁 background
     │    │    │    ├── animatedBackground.tsx
     │    │    │    ├── animatedFloatingSquares.tsx
     │    │    │    └── defaultAnimatedBackground.tsx
     │    │    │
     │    │    ├── 📁 connections
     │    │    │    ├── connections.tsx
     │    │    │    ├── connectionsSheetItem.tsx
     │    │    │    └── requestsSheetItem.tsx
     │    │    │
     │    │    ├── 📁 errors
     │    │    │    └── errorWrapper.tsx
     │    │    │
     │    │    ├── 📁 explore
     │    │    │    ├── explore.tsx
     │    │    │    ├── nameCardContent.tsx
     │    │    │    ├── userCard.tsx
     │    │    │    └── userDetailsCardContent.tsx
     │    │    │
     │    │    ├── 📁 header
     │    │    │    ├── header.tsx
     │    │    │    ├── logo.tsx
     │    │    │    ├── navbar.tsx
     │    │    │    ├── navbarRight.tsx
     │    │    │    └── notificationsDropdownItems.tsx
     │    │    │
     │    │    ├── 📁 main
     │    │    │    ├── defaultMainContent.tsx
     │    │    │    └── main.tsx
     │    │    │
     │    │    ├── 📁 profile
     │    │    │    ├── profileCover.tsx
     │    │    │    ├── profileDetails.tsx
     │    │    │    └── profileWrapper.tsx
     │    │    │
     │    │    ├── 📁 socialMedia
     │    │    │    ├── socialMedia.tsx
     │    │    │    └── socialMediaItem.tsx
     │    │    │
     │    │    ├── 📁 theme
     │    │    │    ├── themeManager.tsx
     │    │    │    └── themeToggle.tsx
     │    │    │
     │    │    └── 📁 ui
     │    │         ├── 📁 buttons
     │    │         │    ├── accountOptionsButton.tsx
     │    │         │    ├── buttonDestructive.tsx
     │    │         │    ├── buttonNormal.tsx
     │    │         │    ├── buttonSuccess.tsx
     │    │         │    ├── buttonWarning.tsx
     │    │         │    ├── connectionsButton.tsx
     │    │         │    ├── notificationsButton.tsx
     │    │         │    ├── profileCoverEditButton.tsx
     │    │         │    ├── profilePhotoEditButton.tsx
     │    │         │    ├── submitButton.tsx
     │    │         │    └── userInfoButton.tsx
     │    │         │
     │    │         ├── 📁 contextMenu
     │    │         │    └── contextMenu.tsx
     │    │         │
     │    │         ├── 📁 dropdown
     │    │         │    └── dropdown.tsx
     │    │         │
     │    │         ├── 📁 loaders
     │    │         │    └── initialLoader.tsx
     │    │         │
     │    │         ├── 📁 separators
     │    │         │    ├── horizontalSeparator.tsx
     │    │         │    └── verticalSeparator.tsx
     │    │         │
     │    │         └── 📁 sheet
     │    │              └── sheet.tsx
     │    │
     │    ├── 📁 config
     │    │    ├── config.tsx
     │    │    └── constants.ts
     │    │
     │    ├── 📁 hooks
     │    │    ├── useContextMenu.tsx
     │    │    ├── useOutsideClick.tsx
     │    │    ├── useSheet.tsx
     │    │    └── useWebStorage.tsx
     │    │
     │    ├── 📁 lib
     │    │    └── utils.ts
     │    │
     │    ├── 📁 store
     │    │    └── store.tsx
     │    │
     │    └── 📁 types
     │         ├── propTypes.ts
     │         └── types.ts
     │
     ├── .gitignore
     ├── eslint.config.mjs
     ├── next.config.ts
     ├── package-lock.json
     ├── package.json
     ├── postcss.config.mjs
     ├── README.md
     └── tsconfig.json
```
