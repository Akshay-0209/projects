# Fitness Web Application – System Architecture (SCRUM-886) 

---

## 1. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Client Side
        A[Web Browser / SPA (React)]
    end
    subgraph Server Side
        B[API Server (Node.js/Express)]
        C[Authentication Service (JWT)]
        D[Database (PostgreSQL)]
        E[File Storage (Cloud)]
    end
    subgraph External
        F[Email/SMS Provider]
        G[3rd Party Fitness APIs]
    end
    A -- REST API --> B
    B -- Auth/JWT --> C
    B -- SQL --> D
    B -- File Uploads --> E
    B -- Notification --> F
    B -- Fetch Data --> G
```

---

## 2. Components / Modules Breakdown

### 2.1 Frontend (React)
- **Pages**: Dashboard, Workouts, Nutrition, Progress, Social, Login/Register, Admin
- **Components**: Form controls, Graphs, Feed, Profile, Notifications, Settings
- **State Management**: Redux or Context API
- **API Service Layer**: Handles HTTP requests

### 2.2 Backend (Node.js/Express)
- **Auth Module**: Registration, login, JWT/session management
- **User Module**: CRUD, profile, settings
- **Workout Module**: CRUD, templates
- **Nutrition Module**: CRUD, daily logs
- **Progress Module**: Visualization, analytics
- **Social Module**: Friends, feed, comments, likes
- **Notification Module**: Email/SMS triggers
- **Admin Module**: User management, analytics

### 2.3 Database (PostgreSQL)
- Relational tables for all entities (see below)

### 2.4 Cloud Storage
- User-uploaded files, profile images, etc.

---

## 3. Proposed Folder Structure

```
fitness-app-technical-design/
  architecture.md
  README.md
frontend/
  src/
    components/
    pages/
    services/
    store/
    utils/
backend/
  src/
    controllers/
    models/
    routes/
    middleware/
    services/
    utils/
  tests/
deployment/
  docker/
  scripts/
```

---

## 4. Database Schema Overview

### Main Entities
- **User**: id, email, password_hash, name, avatar_url, created_at
- **Workout**: id, user_id, type, date, exercises, notes
- **NutritionLog**: id, user_id, date, meals, calories, macros
- **ProgressRecord**: id, user_id, date, weight, body_fat, notes
- **SocialConnection**: id, user_id, friend_id, status

### Relationships
- One user has many workouts, nutrition logs, progress records
- SocialConnection: (user_id, friend_id) pairs

### Example Table Diagram
```ascii
Users ---< Workouts
     \---< NutritionLogs
     \---< ProgressRecords
     \---< SocialConnections >--- Users
```

---

## 5. Authentication Flow

### Registration
1. User submits email & password
2. Password is hashed & saved
3. Verification email sent
4. On confirmation, user active

### Login
1. User submits credentials
2. Password verified
3. JWT issued (access + refresh tokens)
4. JWT sent to client, stored securely

### Token Verification
- Each API call: JWT checked
- Refresh handled via endpoint

---

## 6. API Architecture

### Example REST Endpoints
- **Auth**
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/refresh
- **User**
  - GET /api/user/profile
  - PUT /api/user/profile
- **Workout**
  - GET /api/workouts
  - POST /api/workouts
  - PUT /api/workouts/:id
  - DELETE /api/workouts/:id
- **Nutrition**
  - GET /api/nutrition
  - POST /api/nutrition
- **Progress**
  - GET /api/progress
  - POST /api/progress
- **Social**
  - GET /api/social/friends
  - POST /api/social/friends
- **Admin**
  - GET /api/admin/users

#### Sample Contract
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
{
  "token": "jwt...",
  "refreshToken": "jwt..."
}
```

---

## 7. Data Flow Diagrams (ASCII)

### User Registration Flow
```
User --> [POST /register] --> API --> [Create User in DB] --(send email)--> Email Provider
```

### Workout Logging Flow
```
User --> [POST /workouts] --> API --> [Store in DB] --> [Return Confirmation]
```

---

## 8. Deployment Architecture Overview

### Environments
- **Development**: Local, feature branches
- **Staging**: Pre-prod, QA, UAT
- **Production**: Live users

### CI/CD
- **GitHub Actions**
  - Lint, test, build
  - Deploy on merge to main
- **Hosting**
  - Frontend: Vercel/Netlify/AWS S3
  - Backend: AWS/GCP/Azure
  - DB: Managed PostgreSQL (RDS, CloudSQL)

---

## 9. Key Design Decisions & Justifications
- **React SPA**: Fast, scalable, component-driven development
- **Node.js/Express**: Lightweight, familiar, async support
- **PostgreSQL**: Relational data, analytics, scalability
- **JWT Auth**: Stateless, secure, mobile-friendly
- **RESTful API**: Simplicity, interoperability
- **CI/CD**: Ensures quality & fast iteration
- **Cloud-native**: Easy scaling, managed infrastructure

---

*For further details, see sub-files in this directory. Feedback welcome via SCRUM-886.*
