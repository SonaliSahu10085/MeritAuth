# MeritAuth – Mini User Management System

---

## 📌 Project Overview & Purpose

**MeritAuth** is a full-stack **Mini User Management System** designed to manage users with **role-based access control (RBAC)**.

The application supports **secure authentication**, **authorization**, and **user lifecycle management**.

This project was built as part of the **Backend Developer Intern Assessment for Purple Merit Technologies**, focusing on:

- Authentication flows
- API security
- Role-based permissions
- Clean backend architecture
- Real-world admin & user scenarios

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
- Axios
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

## 📂 Project Structure

```
root/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── tests/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
└── README.md

```

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
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=

```

Run backend server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000

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

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

⚠️ **Note:**

All environment files are excluded using `.gitignore`.

---

## 🚀 Deployment Instructions

### Backend Deployment (Render)

1. Push backend code to GitHub
2. Create a new Web Service on Render
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Import GitHub repository
2. Select `/frontend` folder
3. Build & deploy

---

## 🌐 Live Deployment Links

- **Frontend:** https://your-frontend-url.vercel.app
- **Backend API:** https://your-backend-url.onrender.com
- **API Documentation:** Postman Collection / Swagger Link

*(Replace with actual links before submission)*

---

## 🔑 Authentication & Authorization

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access:
    - **Admin:** Manage all users
    - **User:** Manage own profile only
- Protected routes for authenticated users
- Admin-only access to admin dashboard

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
  "success": true,
  "token": "jwt_token_here"
}

```

---

### Login

```
POST /api/auth/login

```

---

### User APIs

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | /api/users/me | User |
| PUT | /api/users/update | User |
| PUT | /api/users/change-password | User |

---

### Admin APIs

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | /api/admin/users | Admin |
| PATCH | /api/admin/activate/:id | Admin |
| PATCH | /api/admin/deactivate/:id | Admin |

---

## 🧪 Testing

- Backend unit tests written using **Jest**
- Minimum **5 unit tests** covering:
    - Authentication logic
    - User access control
    - Admin actions

---

## 🎥 Walkthrough Video

📌 **Video Link:**

https://your-video-link-here

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

🔗 GitHub: https://github.com/your-github
