# DevMatch 💻❤️

**DevMatch** is a modern matchmaking app designed exclusively for software developers. Whether you're looking for coding buddies, tech collaborators, or just like-minded devs to hang out with, DevMatch helps you connect with fellow developers based on your skills, interests, and vibe.

---

## 🚀 Tech Stack

### Frontend (devmatch-visualcortex):

- **[Next.js](https://nextjs.org/)** – React-based framework for server-side rendering and routing.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)** – Beautifully designed UI components built on top of Tailwind CSS and Radix UI.
- **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight state management solution for React.

### Backend (devmatch-brainbox):

- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)** – Fast and minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database for scalable and flexible data storage.

---

## 🔥 Features (Planned & In Progress)

### Frontend (devmatch-visualcortex):

- [ ] User registration & login
- [ ] Developer profile creation
- [ ] Swipe-based match interface
- [ ] Skill-based match suggestions
- [ ] In-app messaging between matched users
- [ ] Real-time notifications
- [ ] Block/report functionality
- [ ] Profile visibility controls
- [ ] GitHub/LinkedIn integration (future)
- [ ] Admin dashboard for moderation (future)

### Backend (devmatch-brainbox):

- [x] User registration, login, logout, forgot password
- [x] Authentication
- [x] Real-time notifications
- [x] Explore and connect with fellow developers
- [x] Block/report functionality
- [x] Profile visibility controls
- [ ] Google Authentication integration
- [ ] Skill-based match suggestions
- [ ] In-app messaging between matched users
- [ ] GitHub/LinkedIn integration (future)
- [ ] Admin dashboard for moderation (future)

---

## 📁 Folder Structure

```bash
devmatch/
│
├── .vscode
│
├── devmatch-brainbox/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── env/
│   ├── errors/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── src/
│   ├── utils/
│   ├── validations/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── devmatch-visualcortex/
│   ├── public
│   │   └── assets
│   │       ├── avatar
│   │       ├── error
│   │       └── logo
│   │
│   ├── src
│   │   ├── app
│   │   │   ├── (auth)
│   │   │   │   ├── forgot-password
│   │   │   │   ├── login
│   │   │   │   └── register
│   │   │   │
│   │   │   ├── explore
│   │   │   └── profile
│   │   │
│   │   ├── components
│   │   │   ├── auth
│   │   │   ├── background
│   │   │   ├── cards
│   │   │   ├── connections
│   │   │   ├── errors
│   │   │   ├── explore
│   │   │   ├── header
│   │   │   ├── main
│   │   │   ├── profile
│   │   │   ├── socialMedia
│   │   │   ├── theme
│   │   │   └── ui
│   │   │       ├── buttons
│   │   │       ├── contextMenu
│   │   │       ├── loaders
│   │   │       ├── separators
│   │   │       └── sheet
│   │   │
│   │   ├── config
│   │   ├── helpers
│   │   ├── lib
│   │   ├── store
│   │   ├── style
│   │   └── types
│   │
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tsconfig.json
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
git clone https://github.com/yourusername/devmatch.git
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
- **UI Dev:** Shadcn UI
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
