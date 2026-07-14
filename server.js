// server.js
const express = require('express');
const path = require('path');
const notes = require('./src/notes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store (could be replaced by DB)
let notesStore = [];
let nextId = 1;

// Helpers for error formatting
function apiError(res, status, message) {
  return res.status(status).json({ error: message });
}

app.get('/api/notes', (req, res) => {
  const q = req.query.q ? req.query.q.trim() : '';
  try {
    const result = notes.searchNotes(notesStore, q);
    res.json(result);
  } catch (e) {
    apiError(res, 400, e.message);
  }
});

app.post('/api/notes', (req, res) => {
  try {
    const note = notes.createNote(notesStore, req.body, nextId);
    notesStore.push(note);
    nextId++;
    res.status(201).json(note);
  } catch (e) {
    apiError(res, 400, e.message);
  }
});

app.put('/api/notes/:id', (req, res) => {
  try {
    const note = notes.updateNote(notesStore, parseInt(req.params.id, 10), req.body);
    res.json(note);
  } catch (e) {
    apiError(res, 400, e.message);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  try {
    notes.deleteNote(notesStore, parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (e) {
    apiError(res, 400, e.message);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Notes Manager app listening on port ${PORT}`);
});
