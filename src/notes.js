const express = require('express');
const router = express.Router();

let notes = [];
let nextId = 1;

function validateNote(note) {
  if (!note || typeof note.title !== 'string' || !note.title.trim()) {
    return 'Title is required and must be a non-empty string.';
  }
  if (typeof note.content !== 'string') {
    return 'Content must be a string.';
  }
  return null;
}

// Exports for business logic
function createNote(note) {
  const error = validateNote(note);
  if (error) throw new Error(error);
  const newNote = { id: nextId++, title: note.title, content: note.content };
  notes.push(newNote);
  return newNote;
}

function updateNote(id, note) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('Note not found.');
  const error = validateNote(note);
  if (error) throw new Error(error);
  notes[idx] = { ...notes[idx], title: note.title, content: note.content };
  return notes[idx];
}

function deleteNote(id) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('Note not found.');
  const [deleted] = notes.splice(idx, 1);
  return deleted;
}

function searchNotes(query) {
  if (!query) return notes;
  const q = query.toLowerCase();
  return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
}

// Express router endpoints
router.get('/', (req, res) => {
  res.json(searchNotes(req.query.q || ''));
});

router.post('/', (req, res) => {
  try {
    const note = createNote(req.body);
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const note = updateNote(parseInt(req.params.id, 10), req.body);
    res.json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const note = deleteNote(parseInt(req.params.id, 10));
    res.json(note);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

module.exports = router;
// For testing business logic
module.exports.createNote = createNote;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;
module.exports.searchNotes = searchNotes;
