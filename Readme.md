# Contacts Management System - Backend

A high-performance Node.js/Express API designed for multi-user contact management. This backend serves as the core engine for the Contacts Management Application, providing secure data persistence and robust authentication.

## 📋 Description

This repository houses the API layer for a multi-user contacts system. It features a sophisticated dual-authentication system (JWT & Cookies) and is architected for seamless deployment on serverless platforms like Vercel.

## 🚀 Features

- **Multi-user Isolation**: Secure workspace for each user to manage private contacts.
- **Advanced Auth**: Seamless authentication via `Bearer` tokens or `HTTP-only` cookies.
- **Encrypted Security**: Industry-standard password hashing using Bcrypt.
- **Live Deployment**: Fully optimized for Vercel's serverless environment.
- **Error Resilience**: Centralized middleware for elegant error handling.
- **RESTful Design**: Standardized API endpoints for easy integration.

---

## 🔌 API Reference (Live Usage)

Use these endpoints to interact with the service. All protected routes require a valid JWT token.

### User Management (`/api/users`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new account | Public |
| `POST` | `/login` | Authenticate & get session | Public |
| `GET` | `/profile` | Fetch authenticated user details | Private |
| `GET` | `/logout` | Terminate session & clear cookies | Private |

### Contact Management (`/api/contacts`)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all your contacts | Private |
| `POST` | `/` | Add a new contact | Private |
| `GET` | `/:id` | View contact details | Private |
| `PUT` | `/:id` | Update contact information | Private |
| `DELETE` | `/:id` | Remove a contact | Private |

---

## 🌍 Deployment

This project is built to live on **Vercel**. To deploy your own instance:

1. **Push to GitHub**: Initialize a repo and push this code.
2. **Connect to Vercel**: Import the repository in your Vercel dashboard.
3. **Environment Variables**: Add the following in Vercel settings:
   - `CONNECTION_STRING`: Your MongoDB Atlas URI.
   - `ACCESS_TOKEN_SECRET`: A secure random string for JWT signing.
   - `NODE_ENV`: Set to `production`.

---

## 🛠️ Tech Stack

- **Core**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JsonWebToken) & Bcrypt
- **Deployment**: Vercel (Serverless)

---

## 👨‍💻 Development Setup (Local)

*Recommended for developers looking to contribute or test locally.*

1. **Clone & Install**
   ```bash
   git clone https://github.com/Swadesh-c0de/contacts-management-system-backend.git
   cd contacts-management-system-backend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file:
   ```env
   PORT=3000
   CONNECTION_STRING=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_secret
   NODE_ENV=development
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

---

## 📂 Internal Structure

```text
├── config/           # Database connection
├── controllers/      # API business logic
├── models/           # MongoDB schemas
├── routes/           # Route definitions
├── middleware/       # Auth & Error handlers
├── server.js         # App entry point
└── package.json      # Dependencies
```

---
Developed by [Swadesh-c0de](https://github.com/Swadesh-c0de)