// src/notes.js
// Business logic for Notes Manager

function validateNoteInput(input) {
  if (!input || typeof input !== 'object') throw new Error('Invalid input.');
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const content = typeof input.content === 'string' ? input.content.trim() : '';
  if (!title) throw new Error('Title is required.');
  if (title.length > 100) throw new Error('Title too long (max 100 chars).');
  if (content.length > 1000) throw new Error('Content too long (max 1000 chars).');
  return { title, content };
}

function createNote(notesStore, input, nextId) {
  const { title, content } = validateNoteInput(input);
  const note = {
    id: nextId,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return note;
}

function updateNote(notesStore, id, input) {
  const idx = notesStore.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('Note not found.');
  const { title, content } = validateNoteInput(input);
  notesStore[idx] = {
    ...notesStore[idx],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  return notesStore[idx];
}

function deleteNote(notesStore, id) {
  const idx = notesStore.findIndex(n => n.id === id);
  if (idx === -1) throw new Error('Note not found.');
  notesStore.splice(idx, 1);
}

function searchNotes(notesStore, query) {
  if (!query) return notesStore;
  const q = query.toLowerCase();
  return notesStore.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
}

module.exports = { createNote, updateNote, deleteNote, searchNotes };
