# LitShelf – Online Bookstore Frontend

A modern React + TypeScript + Tailwind CSS frontend for LitShelf, an online bookstore. This application provides robust user and entity management, secure authentication & authorization, admin analytics dashboard, notifications, and optional file upload support.

## Features

- **User Management**: CRUD operations for users (create, read, update, delete).
- **Entity Management**: CRUD operations for bookstore entities (products/items, customers, orders, payment details).
- **Authentication & Authorization**: Secure JWT-based authentication. Only authenticated users can access the app, with granular permissions based on user roles.
- **Admin Dashboard & Analytics**: Admin users can view business analytics and monitor current direction.
- **Notifications**: Email or push notifications (e.g., payment confirmation emails).
- **File Uploads** *(Optional)*: Upload files as required by the application.

## Tech Stack

- **React**: UI development
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **JWT**: Authentication & Authorization
- **Axios/Fetch**: API communication

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or yarn

### Installation

```bash
git clone https://github.com/LakhiniVoshadee/LitShelf--Online-BookStore--Frontend.git
cd LitShelf--Online-BookStore--Frontend/lit-shelf-front
npm install
```

### Configuration

Edit environment variables in `.env` for API endpoints, JWT secret, email configuration, etc.

### Running the App

```bash
npm start
# or
yarn start
```

## Folder Structure

```
lit-shelf-front/
 ├── src/
 │   ├── components/        # Reusable UI components
 │   ├── pages/             # Route-based pages (Home, Login, Dashboard, etc.)
 │   ├── services/          # API services (users, entities, auth)
 │   ├── hooks/             # Custom React hooks
 │   ├── utils/             # Utility functions
 │   ├── types/             # TypeScript types/interfaces
 │   └── App.tsx
 ├── public/
 └── tailwind.config.js
```

## Key Modules

### Authentication & Authorization

- JWT stored in httpOnly cookies or localStorage.
- Role-based access: Admin, Customer, etc.
- Protected routes using custom hooks (e.g., `useAuth`).

### User & Entity Management

- CRUD screens for users, products/items, customers, orders, payments.
- API integration for backend operations.

### Admin Dashboard

- View business metrics, sales analytics, user statistics.
- Responsive charts and tables.

### Notifications

- Email confirmation for payments.
- Push notifications (optional, if supported).

### File Uploads *(Optional)*

- Upload product images, documents, etc.
- Preview & validation.

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