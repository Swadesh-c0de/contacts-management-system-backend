# Contacts Management System - Backend

A robust Node.js/Express backend API for a multi-user contacts management system with authentication and MongoDB integration.

## 📋 Description

This repository contains the backend code for a contacts management system that supports multiple users.  The system provides secure authentication using JWT tokens and allows users to manage their contacts efficiently.

## 🚀 Features

- **Multi-user Support**: Each user can manage their own contacts
- **JWT Authentication**: Secure token-based authentication system
- **Password Encryption**: Bcrypt-based password hashing for security
- **RESTful API**: Clean and intuitive API endpoints
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Error Handling**: Comprehensive error handling middleware
- **Environment Configuration**: Support for environment variables

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.0.2
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcrypt 6.0.0
- **Development**:  Nodemon for hot-reloading
- **Configuration**: dotenv for environment variables

## 📁 Project Structure
```
├── config/           # Database connection
├── controllers/      # Route handlers
├── models/          # Database schemas (User, Contact)
├── routes/          # API routes
├── middleware/      # Auth & error handling
├── server.js        # Main server file
└── package.json
```

## Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Swadesh-c0de/contacts-management-system-backend.git
   cd contacts-management-system-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=3000
   CONNECTION_STRING=mongodb://localhost:27017/contacts-db
   ACCESS_TOKEN_SECRET=your_secret_key
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:3000`

## 🔌 API Routes

### User Routes (`/api/users`)
- `POST /register` - Create new user
- `POST /login` - Login & get JWT token
- `GET /profile` - Get user profile (protected)

### Contact Routes (`/api/contacts`)
- `GET /` - Get all contacts (protected)
- `POST /` - Create contact (protected)
- `GET /:id` - Get single contact (protected)
- `PUT /:id` - Update contact (protected)
- `DELETE /:id` - Delete contact (protected)

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "express-async-handler": "^1.2.0",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.2",
  "nodemon": "^3.1.11"
}
```