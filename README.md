# Smart Link Shortener with Analytics

A production-ready URL shortening platform built using React.js, Node.js, Express.js and MongoDB.

The application allows users to create short URLs, manage them through a secure dashboard and analyze link performance using detailed click analytics. It includes JWT authentication, protected APIs, rate limiting, caching and a responsive SaaS-style interface.

---

## Project Overview

This project was developed to simulate a real-world URL shortening service similar to Bitly. Instead of focusing only on URL generation, the application emphasizes scalable backend architecture, secure authentication, analytics processing and a modern frontend experience.

Users can securely register, create short links, monitor click activity and manage all links from a centralized dashboard.

---

## Key Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Support
- Protected Routes
- Logout

### Link Management

- Create Short Links
- Custom Short Codes
- Link Expiration Support
- Search & Filter
- Delete Links
- Copy Short URL
- User Specific Links

### Analytics

- Total Clicks
- Daily Click Statistics
- Browser Analytics
- Operating System Analytics
- Platform Analytics
- Recent Click Activity

### Dashboard

- Statistics Cards
- Recent Links
- Analytics Overview
- Quick Actions
- Responsive Layout

### Security

- JWT Authentication
- Password Hashing
- Zod Validation
- Rate Limiting
- Protected APIs
- Error Handling

### Frontend

- Responsive Design
- Tailwind CSS
- Modern Dashboard
- Loading States
- Empty States
- Charts using Recharts
- Dark Theme

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Express Rate Limit

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

## Project Highlights

- Production-ready Backend
- RESTful API Design
- Modular Folder Structure
- Secure Authentication
- Analytics Dashboard
- Responsive SaaS UI
- Reusable React Components
- Protected Routing
- Clean Code Architecture
- Easy Deployment

---

# Project Structure

```
Smart-Link-Shortener/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── cache/
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
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── config/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Application Architecture

```
                React Frontend
                       │
                React Router DOM
                       │
                 Axios API Client
                       │
                Express REST APIs
                       │
        Authentication Middleware
                       │
              Controllers Layer
                       │
               Business Services
                       │
                 MongoDB Database
```

The application follows a layered architecture where each layer has a single responsibility. This improves maintainability, scalability and code organization.

---

# Backend Architecture

The backend is organized into independent modules.

| Module | Responsibility |
|---------|---------------|
| Config | Environment configuration |
| Routes | API endpoints |
| Controllers | Handle HTTP requests |
| Services | Business logic |
| Models | MongoDB schemas |
| Middlewares | Authentication, validation and rate limiting |
| Utils | Shared helper functions |
| Cache | Frequently accessed redirect data |

This separation keeps the codebase clean and makes future enhancements easier.

---

# Frontend Architecture

The frontend is built using reusable components and modular routing.

| Module | Responsibility |
|---------|---------------|
| Pages | Application screens |
| Components | Reusable UI components |
| API | Axios service layer |
| Context | Authentication state |
| Routes | Protected routing |
| Styles | Global styling |

This structure keeps UI logic separated from API communication and improves component reusability.

---

# Authentication Flow

```
User
 │
 ▼
Login/Register
 │
 ▼
Backend Authentication API
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

Only authenticated users can access protected pages such as Dashboard, Link Management and Analytics.

---

# URL Shortening Flow

```
Original URL
      │
      ▼
Create Link API
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

When a user creates a link, the backend generates a unique short code, stores it in MongoDB and returns the shortened URL.

---

# Redirect Flow

```
User opens Short URL
          │
          ▼
Redirect API
          │
          ▼
Validate Short Code
          │
          ▼
Store Click Analytics
          │
          ▼
Redirect to Original URL
```

Each redirect request is tracked before redirecting the user to the destination URL.

---

# Analytics Flow

```
Short URL Click
        │
        ▼
Capture Click Event
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

Analytics data is aggregated and displayed through interactive charts in the dashboard, allowing users to monitor link performance.

---

# Design Principles

The project was developed with the following principles:

- Modular Architecture
- Separation of Concerns
- Reusable Components
- RESTful API Design
- Responsive UI
- Secure Authentication
- Scalable Backend Structure
- Clean Folder Organization
- Maintainable Codebase
- Production-Oriented Development

---

---

# REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Generate new access token |
| POST | `/api/auth/logout` | Logout user |

---

## Link Management

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/links` | Create a short link |
| GET | `/api/links` | Get all user links |
| GET | `/api/links/:id` | Get a specific link |
| PATCH | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Delete link |

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
| GET | `/:shortCode` | Redirect to original URL |

---

# Database Models

### User

| Field | Type |
|-------|------|
| Name | String |
| Email | String |
| Password | String (Hashed) |
| Refresh Token | String |
| Created At | Date |

---

### Link

| Field | Type |
|-------|------|
| Original URL | String |
| Short Code | String |
| User ID | ObjectId |
| Total Clicks | Number |
| Expiry Date | Date |
| Created At | Date |

---

### Click Event

| Field | Type |
|-------|------|
| Link ID | ObjectId |
| Browser | String |
| Platform | String |
| Device | String |
| IP Hash | String |
| Country | String |
| Clicked At | Date |

---

# Security Features

- JWT Authentication
- Refresh Token Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Request Validation using Zod
- Rate Limiting
- Error Handling Middleware
- Secure Environment Variables
- MongoDB Schema Validation

---

# Frontend Features

- React Context Authentication
- Protected Routes
- Axios API Layer
- Responsive Dashboard
- Reusable UI Components
- Analytics Charts
- Search & Filter
- Loading Skeletons
- Toast Notifications
- Dark Theme
- Mobile Responsive Layout

---

# Environment Variables

### Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/Smart-Link-Shortener.git

cd Smart-Link-Shortener
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Technologies Used

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

# Performance Optimizations

- Route Protection
- Modular API Design
- Cached Redirects
- Rate Limiting
- Optimized MongoDB Queries
- Aggregation Pipelines
- Reusable Components
- Lazy Loaded Pages
- Responsive Layout
- Clean Code Architecture

---

---

# Future Enhancements

The following improvements can be added in future releases:

- QR Code Generation
- Custom Domain Support
- Team Workspaces
- Link Password Protection
- Email Notifications
- Public Analytics Dashboard
- Docker Support
- CI/CD Pipeline
- Redis Integration
- AWS Deployment

---

# Testing

The application was tested for the following scenarios:

### Authentication

- User Registration
- User Login
- Invalid Credentials
- Protected Routes
- Logout

### Link Management

- Create Link
- Delete Link
- Search Links
- Copy Short URL
- Redirect

### Analytics

- Click Tracking
- Dashboard Statistics
- Browser Analytics
- Platform Analytics
- Recent Click Activity

---

# Project Outcome

This project demonstrates practical implementation of:

- REST API Development
- JWT Authentication
- Full Stack Development
- React Dashboard Development
- MongoDB Data Modeling
- Analytics Processing
- Secure Backend Architecture
- Responsive UI Design
- Modular Code Structure

---

# Learning Outcomes

Through this project, I gained hands-on experience in:

- Designing scalable REST APIs
- Implementing secure authentication
- Building reusable React components
- Managing application state
- Working with MongoDB and Mongoose
- Developing analytics features
- Structuring production-ready applications
- Following clean code practices

---

# Contributing

Contributions, suggestions and improvements are welcome.

If you find any issues or have ideas to improve the project, feel free to open an issue or submit a pull request.

---

# License

This project is developed for educational and learning purposes.

---

# Author

**Tanmay Hingankar**

**Rohan Thakur**

---

## Project Summary

Smart Link Shortener is a production-ready full-stack application that combines secure authentication, URL shortening, analytics and a modern React dashboard into a single scalable solution.

The project follows a modular architecture with a strong focus on maintainability, clean code and real-world software engineering practices.

---
