# LitShelf – Online Bookstore Backend

A robust Node.js + Express + TypeScript backend for LitShelf, an online bookstore. This application powers user and entity management, secure authentication & authorization, admin analytics, notifications, and optional file upload support, all backed by MongoDB.

## Features

- **User Management**: CRUD operations for users (create, read, update, delete).
- **Entity Management**: CRUD operations for bookstore entities (products/items, customers, orders, payment details).
- **Authentication & Authorization**: Secure JWT-based authentication. Only authenticated users can access the API, with granular permissions based on user roles.
- **Admin Dashboard & Analytics**: Endpoints for business analytics and monitoring.
- **Notifications**: Email or push notifications (e.g., payment confirmation emails).
- **File Uploads** *(Optional)*: API support for uploading files (product images, documents, etc.).

## Tech Stack

- **Node.js**: Backend runtime
- **Express**: RESTful API framework
- **TypeScript**: Type safety
- **MongoDB**: NoSQL database
- **JWT**: Authentication & Authorization
- **Nodemailer / Push Services**: Notifications
- **Multer**: File uploads

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

```bash
git clone https://github.com/LakhiniVoshadee/LitShelf--Online-BookStore--Backend.git
cd LitShelf--Online-BookStore--Backend
npm install
```

### Configuration

Edit environment variables in `.env` for:

- `MONGO_URI`
- `JWT_SECRET`
- Email service credentials
- Other relevant settings

### Running the App

```bash
npm run dev
# or
yarn dev
```

## Folder Structure

```
LitShelf--Online-BookStore--Backend/
 ├── src/
 │   ├── controllers/       # Route handlers for users, products, orders, etc.
 │   ├── models/            # Mongoose models for MongoDB
 │   ├── routes/            # Express route definitions
 │   ├── middleware/        # JWT auth, error handling, role checks, etc.
 │   ├── services/          # Business logic, email, notifications, analytics
 │   ├── utils/             # Utility functions
 │   ├── types/             # TypeScript types/interfaces
 │   └── app.ts             # Express app entry
 ├── uploads/               # Uploaded files (if enabled)
 ├── .env                   # Environment variables
 └── package.json
```

## Key Modules

### Authentication & Authorization

- JWT issued on login, verified in protected routes.
- Role-based access: Admin, Customer, etc.
- Middleware for authorization.

### User & Entity Management

- RESTful endpoints for users, products/items, customers, orders, payments.
- MongoDB for persistent storage.

### Admin Analytics

- Endpoints for business metrics, sales analytics, user statistics.

### Notifications

- Nodemailer integration for email confirmations (e.g., payment success).
- Support for push notifications (optional).

### File Uploads *(Optional)*

- Multer middleware for handling uploads.
- Validation and storage.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**Contact:** [LakhiniVoshadee](https://github.com/LakhiniVoshadee)