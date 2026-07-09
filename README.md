# CRM Dashboard

A production-ready Node.js CRM Dashboard (Express, SQLite, JWT, modern SaaS frontend).

## Tech Stack
- Node.js (Express)
- SQLite3
- JWT Auth
- bcrypt password hashing
- Modern SaaS-style frontend (HTML/CSS/JS, Chart.js, drag-and-drop, responsive)
- Jest, ESLint (Airbnb base)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and update values.
3. `npm run dev` or `npm start`

Runs on `process.env.PORT || 3000`. All API endpoints require authentication except /api/auth/login and /register.
