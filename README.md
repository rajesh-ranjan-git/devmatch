# DevMatch 💻❤️

**DevMatch** is a modern matchmaking app designed exclusively for software developers. Whether you're looking for coding buddies, tech collaborators, or just like-minded devs to hang out with, DevMatch helps you connect with fellow developers based on your skills, interests, and vibe.

---

## 🚀 Tech Stack

### Frontend:
- **[Next.js](https://nextjs.org/)** – React-based framework for server-side rendering and routing.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)** – Beautifully designed UI components built on top of Tailwind CSS and Radix U.
- **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight state management solution for React.

### Backend:
- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)** – Fast and minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database for scalable and flexible data storage.

---

## 🔥 Features (Planned & In Progress)

- [x] User registration & login
- [x] Developer profile creation
- [x] Swipe-based match interface
- [ ] Skill-based match suggestions
- [ ] In-app messaging between matched users
- [ ] Real-time notifications
- [ ] Block/report functionality
- [ ] Profile visibility controls
- [ ] GitHub/LinkedIn integration (future)
- [ ] Admin dashboard for moderation (future)

---

## 📁 Folder Structure (Simplified)

```bash
devmatch/
│
├── frontend/             # Next.js app
│   ├── components/       # Reusable UI components (Shadcn UI + Tailwind)
│   ├── pages/            # Next.js routes
│   ├── store/            # Zustand state management
│   ├── styles/           # Global styles
│   └── public/           # Static assets
│
├── backend/              # Node.js + Express server
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, validation, error handlers
│   └── config/           # DB connection, environment configs
│
├── .env                  # Environment variables
├── README.md             # You're here!
└── package.json
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

Create two `.env` files:

- `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- `backend/.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret
```

---

### 3. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

### 4. Run the App

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

---

## 🛠️ Dev Tools & Libraries

- **Authentication:** JSON Web Tokens (JWT)
- **Database ORM:** Mongoose
- **API Testing:** Postman
- **UI Dev:** Radix UI, Shadcn UI
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
