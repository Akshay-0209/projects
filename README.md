# Notes Manager Web Application

A modern, responsive web app for managing notes. Features full CRUD, search, validation, and real-time UI updates.

## Features
- Node.js + Express backend
- RESTful API with validation and error handling
- Responsive UI (HTML/CSS/JS)
- Client-side CRUD & search with real-time updates
- Jest tests for business logic

## Quick Start
```bash
npm install
npm start
# Visit http://localhost:3000
```

## API
- `GET /api/notes?q=search` - List/search notes
- `POST /api/notes` - Create note `{title, content}`
- `PUT /api/notes/:id` - Update
- `DELETE /api/notes/:id` - Delete

## Testing
```bash
npm test
```

## License
MIT
