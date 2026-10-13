# Blog Management API

A RESTful Blog Management API built using Node.js, Express.js and MongoDB.

## Features

- User Registration
- User Login
- User Logout
- JWT Authentication
- Role-Based Authorization (User & Author)
- Create Blog
- Update Blog
- Delete Blog
- Get All Blogs
- Get Blog By ID
- Search Blogs
- Blog Pagination
- Cover Image Upload using ImageKit
- Request Validation using express-validator

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- Multer
- ImageKit
- Express Validator

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a .env file

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Run the server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |

### Blogs

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/blog             |
| GET    | /api/blog/search      |
| GET    | /api/blog/:id         |
| POST   | /api/blog/create-blog |
| PATCH  | /api/blog/:id         |
| DELETE | /api/blog/:id         |

---

## Folder Structure

```
src
├── controllers
├── db
├── middleware
├── models
├── routes
├── services
└── app.js
```

---

## Author

Uzair
