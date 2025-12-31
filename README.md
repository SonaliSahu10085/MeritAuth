# MeritAuth – Mini User Management System

## 📌 Project Overview & Purpose

**MeritAuth** is a full-stack **Mini User Management System** designed to manage users with **role-based access control (RBAC)**.

The application supports **secure authentication**, **authorization**, and **user lifecycle management**.

This project was built as part of the **Backend Developer Intern Assessment for Purple Merit Technologies**, focusing on:

- Authentication flows
- API security
- Role-based permissions
- Clean backend architecture
- Real-world admin & user scenarios
- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access:
  - **Admin:** Manage all users and their account status
  - **User:** Manage own profile only
- Protected routes for authenticated users
- Admin-only access to admin dashboard

---

## 🛠 Tech Stack Used

### Backend

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT Authentication
- bcrypt (Password hashing)

### Frontend

- React.js (Hooks)
- Daisy UI
- Tailwind CSS
- Fetch
- React Router

### Deployment

- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

### Tools

- Postman (API testing)
- Git & GitHub
- dotenv (Environment variables)

---

## ⚙️ Setup Instructions

### 🔹 Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account
- Git

---

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```
NODE_ENV=development
PORT=3434
DB_URL=
JWT_SECRET=
BACKEND_ORIGIN_URL=
```

Run backend server:

```bash
npm run server
```

Backend will run on:

```
http://localhost:3434
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (.env)

- `NODE_ENV`
- `PORT`
- `DB_URL`
- `JWT_SECRET`
- `BACKEND_ORIGIN_URL`

### Frontend (.env)

- `VITE_API_URL`

---

## 🌐 Deployment Instructions

### Backend Deployment (Render)

1. Push backend code to GitHub.
2. Create a new Web Service on Render.
3. Select the `/backend` folder.
4. Set the build command (e.g., `npm install`) and server running command (`npm start`).
5. Add your environment variables in the Environment tab.
6. Deploy.

### Frontend Deployment (Vercel)

1. Import your GitHub repository into Vercel.
2. Select the `/frontend` folder as the root.
3. Vercel will automatically detect the Vite build settings.
4. Add `VITE_API_URL` to the Environment Variables settings.
5. Build & deploy.

---

## 🌐 Live Deployment Links

- **Frontend:** https://merit-auth.vercel.app
- **Backend API:** https://meritauth.onrender.com
- **API Documentation:** https://documenter.getpostman.com/view/40074400/2sBXVbJDtt
- **Admin Credentials:**
```bash
email: admin@meritauth.com
password: @Meritauth31
```

---

## 📡 API Documentation

### Authentication APIs

### Signup

```
POST /api/auth/signup
```

**Request Body**

```json
{
  "fullName": "Sonali Sahu",
  "email": "sonali@example.com",
  "password": "StrongPass@123"
}
```

**Response**

```json
{
  "token": "jwt_token_here",
  "user": {
    "key": "value"
  }
}
```

---

### Login

```
POST /api/auth/login
```

---

### Auth APIs

| Method | Endpoint                        | Access |
| ------ | ------------------------------- | ------ |
| POST   | /api/auth/signup                | Admin / User |
| POST   | /api/auth/login                 | Admin / User |
| GET    | /api/auth/logout                | Admin / User |
---

### User APIs

| Method | Endpoint                  | Access |
| ------ | ------------------------- | ------ |
| PATCH  | /api/users/myProfile      | User   |
| PATCH  | /api/users/changePassword | User   |

---

### Admin APIs

| Method | Endpoint                        | Access |
| ------ | ------------------------------- | ------ |
| GET    | /api/admin/users                | Admin  |
| PATCH  | /api/admin/users/:userId/status | Admin  |

---

## 🎥 Walkthrough Video

📌 **Video Link:**

https://drive.google.com/file/d/1Yrv-PQ4cubUSEzXOvWc-v2huykJd-kMe/view?usp=sharing

The video demonstrates:

- Login & role-based access
- Admin user management
- Profile update & password change
- Responsive UI
- Live deployment demo

---

## 👩‍💻 Author

**Sonali Sahu**

Backend Developer Intern Applicant

📧 Email: sonali@example.com

🔗 GitHub: https://github.com/SonaliSahu10085

🔗 Linkedin: https://linkedin.com/in/sonalisahu246
