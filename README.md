# Smart Link Shortener with Analytics

A production-ready URL shortening platform built using React.js, Node.js, Express.js and MongoDB.

The application enables users to create secure short URLs, manage them through a responsive dashboard and monitor detailed click analytics. It combines modern frontend development with a scalable backend architecture, secure authentication and real-world software engineering practices.

---

# Project Overview

Smart Link Shortener is a full-stack web application inspired by modern URL shortening platforms like Bitly. The project goes beyond basic URL shortening by providing a complete link management system with authentication, analytics, security and an intuitive SaaS-style dashboard.

Users can register securely, create and manage shortened links, monitor click performance, analyze browser and platform statistics and track recent activity through interactive visualizations.

The application follows a modular architecture where the frontend and backend are cleanly separated, making the project scalable, maintainable and production-ready.

---

# Project Structure

```text
Smart-Link-Shortener/
│
├── backend/
│   ├── src/
│   │   ├── cache/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── test/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
```

The project is divided into two independent applications:

- **Backend** handles authentication, URL shortening, analytics and database operations.
- **Frontend** provides a responsive SaaS dashboard for users to manage links and view analytics.

This separation keeps the codebase modular, scalable and easy to maintain.

---

# Environment Variables

## Backend (.env)

```env
# Application server port
PORT=5000

# Running environment
NODE_ENV=development

# MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# Frontend application URL
CLIENT_URL=http://localhost:5173

# JWT access token secret key
JWT_ACCESS_SECRET=your_access_secret

# JWT refresh token secret key
JWT_REFRESH_SECRET=your_refresh_secret

# Access token expiration time
JWT_ACCESS_EXPIRES_IN=15m

# Refresh token expiration time
JWT_REFRESH_EXPIRES_IN=7d

# Rate limit window for creating short links (milliseconds)
RL_CREATE_WINDOW_MS=60000

# Maximum links allowed within the create window
RL_CREATE_MAX=10

# Burst rate limit window (milliseconds)
RL_BURST_WINDOW_MS=10000

# Maximum requests allowed during burst window
RL_BURST_THRESHOLD=30
```

## Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# How to Setup & Run

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/Smart-Link-Shortener.git

cd Smart-Link-Shortener
```

---

## 2. Install Backend Dependencies

```bash
cd backend

npm install
```

---

## 3. Configure Backend Environment

Create a `.env` file inside the backend folder and add the required environment variables.

```env
PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_EXPIRES_IN=7d
```

---

## 4. Start the Backend Server

```bash
npm run dev
```

Backend will start at:

```
http://localhost:5000
```

---

## 5. Install Frontend Dependencies

Open another terminal.

```bash
cd frontend

npm install
```

---

## 6. Configure Frontend Environment

Create a `.env` file inside the frontend folder.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 7. Start the Frontend

```bash
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

## 8. Open the Application

Visit the following URL in your browser:

```
http://localhost:5173
```
# Application Architecture

```
                    React Frontend
                           │
                           ▼
                 React Router DOM
                           │
                           ▼
                  Axios API Service
                           │
                           ▼
                  Express REST APIs
                           │
          Authentication Middleware
                           │
                           ▼
                   Controller Layer
                           │
                           ▼
                    Service Layer
                           │
                           ▼
                  MongoDB Database
```

The application follows a layered architecture where every layer has a clearly defined responsibility.

- **Frontend** handles the user interface and user interactions.
- **Axios** acts as the communication layer between the frontend and backend.
- **Express APIs** receive and process client requests.
- **Authentication Middleware** secures protected routes using JWT.
- **Controllers** handle request validation and response formatting.
- **Services** contain business logic such as URL generation and analytics processing.
- **MongoDB** stores users, links and click analytics.

This architecture improves maintainability, scalability and separation of concerns.

---
### Screenshots / Demo 

<img width="1917" height="975" alt="Screenshot 2026-07-13 001331" src="https://github.com/user-attachments/assets/5abba969-19d1-4fe0-ba39-094cf49a5609" />

<img width="1917" height="968" alt="Screenshot 2026-07-13 001340" src="https://github.com/user-attachments/assets/b1b6ba8c-2b6f-410e-99d2-f96ae9d98924" />

<img width="1917" height="980" alt="Screenshot 2026-07-13 001401" src="https://github.com/user-attachments/assets/7dbe87bb-3d20-4885-af83-c32945cf322e" />

<img width="1916" height="962" alt="Screenshot 2026-07-13 001441" src="https://github.com/user-attachments/assets/b1f7cd7b-6111-4b35-97dd-28755e367c77" />

<img width="1917" height="972" alt="Screenshot 2026-07-13 001511" src="https://github.com/user-attachments/assets/f0dc1557-50e7-44a7-8963-f4a90d203568" />

<img width="1916" height="966" alt="Screenshot 2026-07-13 001522" src="https://github.com/user-attachments/assets/5b482c0a-096c-4280-a8d7-10644334d2be" />

<img width="1917" height="970" alt="Screenshot 2026-07-13 001534" src="https://github.com/user-attachments/assets/7a27c233-d549-4aad-a185-8f8d8a3a633e" />

<img width="1916" height="976" alt="Screenshot 2026-07-13 001554" src="https://github.com/user-attachments/assets/31259916-7bb8-40a2-998a-8fce2e54e76a" />

<img width="1917" height="967" alt="Screenshot 2026-07-13 001608" src="https://github.com/user-attachments/assets/cd22aabd-7793-4b9d-8bf3-989df6875870" />

<img width="1905" height="950" alt="Screenshot 2026-07-13 001624" src="https://github.com/user-attachments/assets/ba8b56c0-27b0-49d3-b811-29b8d7ad4e10" />


# Backend Architecture

The backend follows a modular structure where every feature is separated into independent layers.

| Module | Responsibility |
|---------|---------------|
| Config | Environment configuration and application settings |
| Routes | Defines all REST API endpoints |
| Controllers | Handles incoming HTTP requests and responses |
| Services | Contains business logic and application rules |
| Models | MongoDB schemas and database interaction |
| Middlewares | Authentication, validation and rate limiting |
| Validations | Request validation using Zod |
| Utils | Shared helper functions |
| Cache | Redirect caching and performance optimization |

### Backend Workflow

```
HTTP Request
      │
      ▼
Express Router
      │
      ▼
Authentication Middleware
      │
      ▼
Validation Middleware
      │
      ▼
Controller
      │
      ▼
Service Layer
      │
      ▼
MongoDB
      │
      ▼
HTTP Response
```

This layered approach keeps the backend clean, reusable and easy to extend.

---

# Frontend Architecture

The frontend is built using reusable React components and follows a modular folder structure.

| Module | Responsibility |
|---------|---------------|
| Pages | Application screens |
| Components | Reusable UI components |
| Context | Authentication state management |
| API | Axios service layer |
| Routes | Protected routing |
| Config | Application configuration |
| Styles | Global styling |

### Frontend Workflow

```
User
 │
 ▼
React Pages
 │
 ▼
Reusable Components
 │
 ▼
Axios API Layer
 │
 ▼
Backend APIs
 │
 ▼
Updated UI
```

The modular structure makes the frontend scalable and simplifies future feature development.

---

# Authentication Flow

```
User
 │
 ▼
Register / Login
 │
 ▼
Authentication API
 │
 ▼
JWT Access Token
 │
 ▼
Protected Routes
 │
 ▼
Dashboard Access
```

### Authentication Process

1. User registers or logs in.
2. Backend validates the credentials.
3. JWT Access Token and Refresh Token are generated.
4. Protected routes verify the access token.
5. Authorized users can access Dashboard, Links and Analytics.
6. Refresh tokens allow seamless session renewal.

---

# URL Shortening Flow

```
Original URL
      │
      ▼
Create Link Request
      │
      ▼
Validate URL
      │
      ▼
Generate Short Code
      │
      ▼
Store in MongoDB
      │
      ▼
Return Short URL
```

### Process

- User submits a long URL.
- Backend validates the request.
- A unique short code is generated.
- Link information is stored in MongoDB.
- The generated short URL is returned to the user.

---

# Redirect Flow

```
User Opens Short URL
          │
          ▼
Receive Short Code
          │
          ▼
Validate Link
          │
          ▼
Record Click Analytics
          │
          ▼
Increase Click Count
          │
          ▼
Redirect to Original URL
```

### Process

Whenever a visitor opens a shortened URL:

- The short code is validated.
- Link status is verified.
- Click analytics are captured.
- Browser and platform information are stored.
- Total click count is updated.
- The visitor is redirected to the original destination.

---

# Analytics Flow

```
User Click
     │
     ▼
Capture Event
     │
     ▼
Store Analytics
     │
     ▼
Aggregate Statistics
     │
     ▼
Dashboard Charts
```

### Analytics Captured

- Total Clicks
- Daily Click Statistics
- Browser Distribution
- Operating System Distribution
- Platform Analytics
- Recent Click Activity

The analytics dashboard aggregates this data and presents it using interactive charts and summary cards, allowing users to monitor link performance efficiently.

---

# Design Principles

The project was designed using modern software engineering principles.

### Architecture

- Modular Folder Structure
- Separation of Concerns
- Layered Backend Architecture
- Reusable React Components

### Backend

- RESTful API Design
- Secure Authentication
- Request Validation
- Rate Limiting
- Error Handling
- Clean Business Logic

### Frontend

- Responsive UI
- Reusable Components
- Protected Routing
- Modern Dashboard Design
- Interactive Charts
- Clean User Experience

### Development

- Scalable Codebase
- Maintainable Structure
- Production-Oriented Development
- Readable and Consistent Code
- Easy Future Enhancements

These principles ensure that the application remains secure, maintainable and easy to extend as new features are added.

---

# REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Generate a new access token |
| POST | `/api/auth/logout` | Logout user |

---

## Link Management

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/links` | Create a short link |
| GET | `/api/links` | Get all user links |
| GET | `/api/links/:id` | Get a specific link |
| PATCH | `/api/links/:id` | Update an existing link |
| DELETE | `/api/links/:id` | Delete a link |

---

## Analytics

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/analytics/overview` | Dashboard statistics |
| GET | `/api/analytics/:id` | Analytics for a specific link |
| GET | `/api/analytics/recent` | Recent click activity |

---

## Redirect

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/:shortCode` | Redirect user to the original URL |

---

# Database Models

## User

| Field | Type |
|--------|------|
| Name | String |
| Email | String |
| Password | String (Hashed) |
| Refresh Token | String |
| Created At | Date |

---

## Link

| Field | Type |
|--------|------|
| Original URL | String |
| Short Code | String |
| User ID | ObjectId |
| Total Clicks | Number |
| Expiry Date | Date |
| Created At | Date |

---

## Click Event

| Field | Type |
|--------|------|
| Link ID | ObjectId |
| Browser | String |
| Platform | String |
| Device | String |
| IP Hash | String |
| Country | String |
| Clicked At | Date |

---

# Security Features

The application follows modern security practices to protect user data and APIs.

- JWT Authentication
- Refresh Token Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Request Validation using Zod
- Rate Limiting
- Error Handling Middleware
- Secure Environment Variables
- MongoDB Schema Validation
- Input Sanitization
- Authentication Middleware
- Secure Password Storage

---

# Frontend Features

The frontend provides a clean and responsive SaaS dashboard with reusable components.

- User Authentication
- Protected Routes
- Dashboard Overview
- Statistics Cards
- Link Management
- URL Shortening
- Search & Filter
- Copy Short URL
- Analytics Dashboard
- Browser Analytics
- Platform Analytics
- Recent Click Activity
- Responsive Design
- Loading States
- Empty States
- Toast Notifications
- Dark Theme Support

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation
- Express Rate Limit

---

## Development Tools

- Git
- GitHub
- Visual Studio Code
- Postman
- npm

---

# Performance Optimizations

The project includes multiple optimizations for scalability and performance.

- Route Protection
- Cached Redirects
- Modular API Design
- Optimized MongoDB Queries
- Aggregation Pipelines
- Rate Limiting
- Reusable React Components
- Lazy Loaded Pages
- Efficient State Management
- Responsive Layout
- Clean Folder Structure

---

# Future Enhancements

The following features can be added in future releases.

- QR Code Generation
- Custom Domains
- Team Workspaces
- Link Password Protection
- Public Analytics Dashboard
- Email Notifications
- Redis Caching
- Docker Support
- CI/CD Pipeline
- AWS Deployment
- Export Analytics Reports
- Custom Themes

---

# Testing

The application was tested for the following scenarios.

## Authentication

- User Registration
- User Login
- Invalid Credentials
- Protected Routes
- Logout

---

## Link Management

- Create Link
- Update Link
- Delete Link
- Search Links
- Copy Short URL
- Redirect Validation

---

## Analytics

- Click Tracking
- Dashboard Statistics
- Browser Analytics
- Platform Analytics
- Recent Click Activity
- Chart Rendering

---

# Project Outcome

This project demonstrates practical implementation of modern full-stack application development.

Key outcomes include:

- REST API Development
- JWT Authentication
- URL Shortening System
- Analytics Processing
- React Dashboard Development
- MongoDB Data Modeling
- Responsive UI Design
- Production-Ready Architecture
- Modular Code Structure
- Secure Backend Development

---

# Learning Outcomes

Through this project, I gained hands-on experience in:

- Building scalable REST APIs
- Implementing JWT Authentication
- Designing reusable React components
- Managing application state
- Working with MongoDB and Mongoose
- Creating analytics dashboards
- Implementing secure backend architecture
- Following clean code principles
- Structuring production-ready applications
- Developing responsive SaaS interfaces

---

# Contributing

Contributions, suggestions and improvements are welcome.

If you discover any bugs or have ideas for enhancements, feel free to fork the repository, create a feature branch and submit a pull request.

---

# License

This project is developed for educational and learning purposes.

---

# Authors

**Tanmay Hingankar**

**Rohan Thakur**
---

# Project Summary

Smart Link Shortener with Analytics is a production-ready full-stack application that combines secure authentication, intelligent URL shortening, real-time analytics and a modern SaaS dashboard into a scalable solution.

The project demonstrates industry-standard software engineering practices including modular architecture, reusable components, secure authentication, RESTful API development, analytics processing and responsive UI design.

Built using React.js, Node.js, Express.js and MongoDB, the application showcases how modern web applications are designed with scalability, maintainability and performance in mind.

Whether creating shortened links, monitoring click analytics or managing user-specific URLs, the application provides a complete end-to-end experience similar to real-world URL shortening platforms.

---
Register a new account or login with existing credentials to access the dashboard and begin creating short links.

---
