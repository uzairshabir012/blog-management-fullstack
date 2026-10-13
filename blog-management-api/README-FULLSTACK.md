# Papertrail Blog Management Full Stack

The original Express/MongoDB backend remains unchanged. The React frontend is in `frontend/` and calls the existing API routes through a Vite development proxy.

## Requirements
- Node.js 20.19+ recommended
- MongoDB connection configured for the backend
- Existing ImageKit private key if you want cover-image uploads

## 1. Keep your existing backend environment
Create/keep `blog-management-api/.env` with your own values (this ZIP intentionally does not include secrets):

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

The supplied backend `server.js` listens on port **3000**. The frontend dev proxy expects that port.

## 2. Start the backend
Open a terminal in the project root (the folder containing `server.js`):

```bash
npm install
npm run dev
```

Keep this terminal running. Confirm the MongoDB connection succeeds in the terminal.

## 3. Start the React frontend
Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173`.

## Features
- Browse paginated blogs, search stories, and open a single story
- Register and log in with the existing API
- Select `author` at signup to create/publish blogs
- Create and edit a story, optionally upload a cover image, and delete your own stories
- Responsive layout for desktop and mobile

## Important notes
- The backend sets JWT authentication in a cookie. Requests use `credentials: 'include'` and Vite proxies `/api` to the backend, so local development does not require adding CORS middleware to the backend.
- Regular `user` accounts can read stories. Only `author` accounts can create/update/delete, according to the existing backend.
- The API does not return a complete user profile/session endpoint. The frontend remembers the non-sensitive username/role response in the current browser tab; after a full session reset, log in again if the UI no longer shows your account.
- For production deployment, configure a reverse proxy to serve `/api` on the same origin as the frontend, or deliberately configure CORS and cookie settings in the backend. Backend changes were not made here.
- `frontend/.env.example` is a note only; local development works without frontend environment variables.
