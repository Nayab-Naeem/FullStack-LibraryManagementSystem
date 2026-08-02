# 📚 Librariea — Full Stack Library Management System

A modern full-stack Library Management System built to simplify library operations. It includes secure admin authentication, book/author/member management, borrow & return tracking with inventory control, and an interactive admin dashboard.

**Tech Stack:** React • Tailwind CSS • Node.js • Express.js • PostgreSQL • JWT

---

## ✨ Features

### Authentication & Security
- Admin registration and login
- JWT-based authentication
- Protected frontend and backend routes
- Password hashing with bcrypt

### Admin Dashboard
- Overview statistics (books, authors, members, borrowed books)
- Book availability visualization
- Interactive charts
- Responsive and animated UI

### Book Management
- Add, update, and delete books
- View detailed book information
- Search by title / ISBN
- Filter by category
- Track total quantity and available quantity

### Author Management
- Add, update, and delete authors
- View author details and associated books

### Member Management
- Add, update, and delete library members
- View member borrowing history

### Borrow & Return System
- Borrow books with availability checks
- Return books with automatic inventory updates
- Prevent double returns
- Track borrow/return dates and status

---

## 🛠️ Tech Stack

| Layer       | Technologies                                      |
|-------------|---------------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, Recharts, React Hot Toast |
| Backend     | Node.js, Express.js, PostgreSQL (`pg`), JWT, bcrypt |
| Tools       | Git, VS Code, Thunder Client                      |

---

## 📁 Project Structure

FullStack-LibraryManagementSystem/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── api/               # API service functions
│   │   ├── components/        # Reusable UI components
│   │   ├── layouts/           # Dashboard layout
│   │   ├── pages/             # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
│
└── backend/                   # Express.js REST API
├── config/                # Database configuration
├── controllers/           # Business logic
├── middleware/            # Auth, response & error handlers
├── routes/                # API routes
├── index.js
└── ...


---

## 🗄️ Database Design

PostgreSQL relational database with the following main entities:

- **admins** — Admin authentication
- **books** — Book inventory (title, ISBN, quantity, available quantity, etc.)
- **authors** — Author information
- **categories** — Book categories
- **members** — Library members
- **borrow_records** — Borrow/return transactions and status

Relationships are handled with foreign keys and JOIN queries.

---

## 🔌 API Endpoints

All management routes (except authentication and some public endpoints) are protected with JWT.

| Module          | Base Path            | Description                     |
|-----------------|----------------------|---------------------------------|
| Authentication  | `/auth`              | Register & Login                |
| Books           | `/books`             | CRUD + search + details         |
| Authors         | `/authors`           | CRUD                            |
| Categories      | `/categories`        | CRUD                            |
| Members         | `/members`           | CRUD                            |
| Borrow Records  | `/borrow-records`    | Borrow, return, list, delete    |
| Dashboard       | `/dashboard`         | Statistics & overview data      |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Git

### Clone the repository

```bash
git clone https://github.com/Nayab-Naeem/FullStack-LibraryManagementSystem.git
```

- cd FullStack-LibraryManagementSystem

- cd backend
 npm install
 npm run dev

- cd frontend
 npm install
 npm run dev


## 👨‍💻 Author

Nayab Naeem
Computer Science Student | Full Stack Developer | AI Enthusiast
GitHub: https://github.com/Nayab-Naeem
LinkedIn: https://www.linkedin.com/in/nayabnaeemcs/