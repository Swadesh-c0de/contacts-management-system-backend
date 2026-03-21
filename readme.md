# Contacts Management System - Backend

A versatile and secure Node.js/Express API built to manage private contacts across multiple user accounts. Whether you're building a personal CRM or a collaborative tool, this backend provides the essential engine for secure data handling, authentication, and reliable performance.

## 📋 Project Overview

This API is designed with security and scalability in mind. It features a robust multi-user isolation system, ensuring that every user's data remains private. We've implemented a dual-authentication strategy using both JWT tokens and HTTP-only cookies, making it flexible for various frontend implementations while keeping it production-ready for platforms like Vercel.

## 🚀 Key Features

- **Multi-user Isolation**: Each user manages their own private contact list, completely isolated from others.
- **Enhanced Security**: 
    - **Authentication**: Supports both `Bearer` tokens and secure `HTTP-only` cookies.
    - **Password Security**: Uses industry-standard `Bcrypt` for salt-and-peppered hashing.
    - **Rate Limiting**: Protects your server from brute-force and spam attacks with both global and route-specific limits.
    - **Secure Error Handling**: Automatically hides sensitive stack traces in production to prevent information leaks.
- **Account Management**: 
    - **Profile Updates**: Users can easily update their username and email.
    - **Account Deletion**: Users can permanently delete their account and all associated contacts.
    - **Secure Password Changes**: Integrated logic for users to safely change their passwords autonomously.
- **Improved Data Model**:
    - **Per-User Uniqueness**: Contact uniqueness (email/phone) is enforced **per user**, allowing different users to save the same contact information in their private lists.
- **Developer Friendly**:
    - **Centralized Validation**: Improved code quality by moving all validation logic into a dedicated utility module.
    - **Error Handling**: Centralized middleware that translates complex errors into readable, actionable JSON responses.
    - **Serverless Ready**: Fully optimized for deployment on Vercel or similar serverless architectures.
    - **RESTful Architecture**: Clean, predictable endpoint naming for smooth integration.

---

## 🔌 API Documentation

All protected routes require a valid JWT token. In production, sensitive routes are rate-limited to ensure system stability.

### User Endpoints (`/api/users`)

| Method   | Endpoint           | Description                      | Auth    | Rate Limit |
| :------- | :----------------- | :------------------------------- | :------ | :--------- |
| `POST`   | `/register`        | Sign up for a new account        | Public  | Strict     |
| `POST`   | `/login`           | Authenticate and start a session | Public  | Strict     |
| `PUT`    | `/profile`         | Update username or email         | Private | Global     |
| `DELETE` | `/profile`         | Permanently delete account       | Private | Global     |
| `PUT`    | `/change-password` | Update account password          | Private | Strict     |
| `GET`    | `/profile`         | Get current user details         | Private | Global     |
| `GET`    | `/logout`          | End session and clear cookies    | Private | Global     |

### Contact Endpoints (`/api/contacts`)

| Method   | Endpoint | Description                        | Auth    | Rate Limit |
| :------- | :------- | :--------------------------------- | :------ | :--------- |
| `GET`    | `/`      | Retrieve all your contacts         | Private | Global     |
| `POST`   | `/`      | Create a new contact               | Private | Strict     |
| `GET`    | `/:id`   | Get details for a specific contact | Private | Global     |
| `PUT`    | `/:id`   | Update contact information         | Private | Global     |
| `DELETE` | `/:id`   | Permanently remove a contact       | Private | Global     |

---

## 🌏 Deployment (Vercel)

This project is tailored for **Vercel**. Follow these simple steps to go live:

1. **GitHub Setup**: Push your code to a GitHub repository.
2. **Vercel Integration**: Import your repo from the Vercel dashboard.
3. **Environment Variables**: Make sure to set these in your project settings:
   - `CONNECTION_STRING`: Your MongoDB connection URI.
   - `ACCESS_TOKEN_SECRET`: A strong, random string for JWT encryption.
   - `NODE_ENV`: Set to `production` to enable secure error handling and cookie security.

---

## 🛠️ Stack Summary

- **Backend**: Node.js & Express.js
- **Database**: MongoDB with Mongoose
- **Security**: JWT, Bcrypt, and Express-Rate-Limit
- **Infrastructure**: Vercel (Serverless ready)

---

## 👨‍💻 Local Development

Setting up for local testing or contribution is straightforward:

1. **Clone the repo**
   ```bash
   git clone https://github.com/Swadesh-c0de/contacts-management-system-backend.git
   cd contacts-management-system-backend
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   CONNECTION_STRING=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_secret_string
   NODE_ENV=development
   ```

3. **Launch**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── config/           # Database configuration
├── controllers/      # Core business logic for users & contacts
├── models/           # Mongoose schemas (User & Contact)
├── routes/           # API route mappings
├── utils/            # Helper functions and shared utilities (e.g., Validation)
├── middleware/       # Auth, Rate limiting & Error handlers
├── server.js         # Main entry point
└── package.json      # Dependencies and scripts
```

---
Developed with care by [Swadesh-c0de](https://github.com/Swadesh-c0de)