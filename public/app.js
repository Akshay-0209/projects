// public/app.js
// Client-side logic for Notes Manager
const notesList = document.getElementById('notes-list');
const form = document.getElementById('note-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const formMessage = document.getElementById('form-message');
const searchInput = document.getElementById('search');

let editingId = null;

function renderNotes(notes) {
  notesList.innerHTML = '';
  if (!notes.length) {
    notesList.innerHTML = '<p style="color:#888;text-align:center;margin-top:28px;">No notes found.</p>';
    return;
  }
  notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-title">${escapeHTML(note.title)}</div>
      <div class="card-content">${escapeHTML(note.content)}</div>
      <div class="card-meta">Created: ${fmtDate(note.createdAt)}<br>Updated: ${fmtDate(note.updatedAt)}</div>
      <div class="card-actions">
        <button class="btn primary" onclick="editNote(${note.id})">Edit</button>
        <button class="btn danger" onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
    notesList.appendChild(card);
  });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}
function fmtDate(dateStr) {
  try { return new Date(dateStr).toLocaleString(); } catch { return dateStr; }
}

async function fetchNotes(q='') {
  try {
    const url = '/api/notes' + (q ? `?q=${encodeURIComponent(q)}` : '');
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch notes.');
    const notes = await res.json();
    renderNotes(notes);
  } catch (e) {
    notesList.innerHTML = `<div style="color:var(--danger);">${e.message}</div>`;
  }
}

window.editNote = function(id) {
  fetch(`/api/notes`)
    .then(res => res.json())
    .then(notes => {
      const note = notes.find(n => n.id === id);
      if (!note) return;
      editingId = id;
      formTitle.textContent = 'Edit Note';
      titleInput.value = note.title;
      contentInput.value = note.content;
      saveBtn.textContent = 'Update';
      cancelBtn.style.display = '';
    });
};

window.deleteNote = async function(id) {
  if (!confirm('Delete this note?')) return;
  try {
    const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed.');
    fetchNotes(searchInput.value);
    if (editingId === id) resetForm();
  } catch (e) {
    alert(e.message);
  }
};

function resetForm() {
  editingId = null;
  titleInput.value = '';
  contentInput.value = '';
  formTitle.textContent = 'Create Note';
  saveBtn.textContent = 'Save';
  cancelBtn.style.display = 'none';
  formMessage.textContent = '';
}

form.onsubmit = async function(e) {
  e.preventDefault();
  formMessage.textContent = '';
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title) { formMessage.textContent = 'Title is required.'; return; }
  if (title.length > 100) { formMessage.textContent = 'Title too long.'; return; }
  if (content.length > 1000) { formMessage.textContent = 'Content too long.'; return; }
  try {
    if (editingId) {
      // update
      const res = await fetch(`/api/notes/${editingId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, content})
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Update failed.');
      }
    } else {
      // create
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, content})
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Create failed.');
      }
    }
    fetchNotes(searchInput.value);
    resetForm();
  } catch (e) {
    formMessage.textContent = e.message;
  }
};

cancelBtn.onclick = function() {
  resetForm();
};

searchInput.oninput = function() {
  fetchNotes(this.value);
};

// Real-time: fetch notes on load and after every change
fetchNotes();