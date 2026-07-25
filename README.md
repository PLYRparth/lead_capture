# LeadDesk Mini

## Project Overview
LeadDesk Mini is a lead capture application built for the Digital Heroes Training Task. It features a public-facing landing page for capturing leads and a protected admin dashboard for managing them.

## Tech Stack
- **Frontend**: React, React Router, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt, cookie-parser

## Architecture
The application follows a standard client-server architecture. The frontend is a React Single Page Application (SPA) communicating with a Node.js REST API. Data is stored in MongoDB.

## Folder Structure
```
/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context (Auth)
│   │   ├── pages/      # Route pages
│   │   └── ...
├── server/          # Node.js backend
│   ├── src/
│   │   ├── config/     # Database and app config
│   │   ├── controllers/# API logic
│   │   ├── middleware/ # Express middleware (Auth)
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   ├── validators/ # Request validation
│   │   └── server.js   # App entry point
└── README.md
```

## Data Model
**User**:
- `username`: String, unique
- `email`: String, unique
- `password`: String (hashed)
- `role`: String (default: 'admin')
- `createdAt`: Date
- `updatedAt`: Date

**Lead**:
- `name`: String
- `email`: String
- `budget`: String
- `message`: String
- `status`: String (New, Contacted, Closed)
- `createdAt`: Date
- `updatedAt`: Date

## Authentication Flow
1. User logs in with email and password at `/login`.
2. Backend verifies credentials and generates a JWT.
3. JWT is sent back in an `HttpOnly` cookie.
4. Frontend updates `AuthContext` to reflect logged-in state.
5. Secure routes (e.g., `/api/leads`) verify the JWT cookie via `authMiddleware` (`protect`).
6. Unauthenticated users are redirected to `/login` when trying to access `/admin`.

## JWT Strategy
Tokens are generated using `jsonwebtoken` and stored in `HttpOnly` cookies. This prevents cross-site scripting (XSS) attacks from accessing the token. The token expires in 30 days. In production, the cookie is set to `secure` and `sameSite: strict`.

## API Endpoints

### Auth
- `POST /api/auth/login` - Authenticate user & get token
- `POST /api/auth/logout` - Logout user & clear cookie
- `GET /api/auth/me` - Get current authenticated user

### Leads
- `POST /api/leads` - Create a new lead (Public)
- `GET /api/leads` - Get all leads (Protected)
- `PATCH /api/leads/:id/status` - Update lead status (Protected)

## Environment Variables

### Server (`server/.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/digital-heroes-lead-capture
NODE_ENV=development
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

## Running Locally

1. **Install Dependencies**:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. **Start Backend Server**:
   Ensure MongoDB is running.
   ```bash
   cd server
   npm run dev
   ```

3. **Start Frontend Dev Server**:
   ```bash
   cd client
   npm run dev
   ```

4. **Seed Admin User**:
   ```bash
   cd server
   node seedUser.js
   ```

## Deployment Steps
1. Create a MongoDB Atlas cluster and get the connection string.
2. Set up environment variables on your hosting provider (e.g., Vercel, Heroku, Render).
3. Ensure `NODE_ENV=production` on the backend.
4. Deploy the backend API.
5. Update the `CLIENT_URL` on the backend to match the frontend domain, and the `API_URL` on the frontend.
6. Deploy the frontend.

## Test Credentials
- **Email**: admin@leaddesk.com
- **Password**: password123

## Future Improvements
- Add password reset functionality.
- Implement rate limiting to prevent brute-force attacks.
- Add pagination to the admin leads table.
- Implement more granular role-based access control (RBAC).
