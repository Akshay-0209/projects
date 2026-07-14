# Notes Manager Web Application

A modern, responsive web app for managing notes, implemented in [PR #55](https://github.com/Akshay-0209/projects/pull/55) (see [Issue #48](https://github.com/Akshay-0209/projects/issues/48)).

## Features
- Node.js + Express backend
- RESTful API (CRUD: create, read, update, delete notes)
- Validation and error handling (title/content length, required fields)
- Responsive, modern UI (HTML, CSS, JS)
- Real-time search/filtering
- Jest test suite for business logic
- In-memory storage (easy DB swap)

## Setup

```bash
npm install
npm start
# App runs at: http://localhost:3000
```

## Usage
- Browse to http://localhost:3000
- Create, edit, search, and delete notes
- All actions update UI in real time

## API Endpoints
- `GET /api/notes?q=search` — List/search notes (optional query)
- `POST /api/notes` — Create a note (JSON: `{title, content}`)
- `PUT /api/notes/:id` — Update a note
- `DELETE /api/notes/:id` — Delete a note

Errors returned as JSON.

## Testing

```bash
npm test
```
- Runs Jest tests in `__tests__/notes.test.js` covering create, update, delete, search, and validation

## License
MIT
