// __tests__/notes.test.js
const { createNote, updateNote, deleteNote, searchNotes } = require('../src/notes');

describe('Notes Business Logic', () => {
  let notes;
  let nextId;

  beforeEach(() => {
    notes = [];
    nextId = 1;
  });

  describe('createNote', () => {
    it('creates a note with valid input', () => {
      const note = createNote(notes, { title: 'Test', content: 'Hello' }, nextId);
      expect(note.title).toBe('Test');
      expect(note.content).toBe('Hello');
      expect(note.id).toBe(1);
      expect(typeof note.createdAt).toBe('string');
    });
    it('trims title/content and increments id', () => {
      const note = createNote(notes, { title: '  t  ', content: '  c  ' }, 2);
      expect(note.title).toBe('t');
      expect(note.content).toBe('c');
      expect(note.id).toBe(2);
    });
    it('throws if title is missing', () => {
      expect(() => createNote(notes, { content: 'a' }, nextId)).toThrow();
    });
    it('throws if title too long', () => {
      expect(() => createNote(notes, { title: 'A'.repeat(101), content: 'a' }, nextId)).toThrow();
    });
    it('throws if content too long', () => {
      expect(() => createNote(notes, { title: 'a', content: 'A'.repeat(1001) }, nextId)).toThrow();
    });
  });

  describe('updateNote', () => {
    beforeEach(() => {
      notes.push(createNote(notes, { title: 'A', content: 'B' }, nextId++));
    });
    it('updates a note', () => {
      const updated = updateNote(notes, 1, { title: 'X', content: 'Y' });
      expect(updated.title).toBe('X');
      expect(updated.content).toBe('Y');
      expect(updated.updatedAt).not.toBe(updated.createdAt);
    });
    it('throws if note not found', () => {
      expect(() => updateNote(notes, 99, { title: 't', content: 'c' })).toThrow('Note not found');
    });
    it('throws for invalid input', () => {
      expect(() => updateNote(notes, 1, { title: '', content: 'c' })).toThrow();
    });
  });

  describe('deleteNote', () => {
    beforeEach(() => {
      notes.push(createNote(notes, { title: 'A', content: 'B' }, nextId++));
    });
    it('deletes a note', () => {
      deleteNote(notes, 1);
      expect(notes.length).toBe(0);
    });
    it('throws if note not found', () => {
      expect(() => deleteNote(notes, 123)).toThrow('Note not found');
    });
  });

  describe('searchNotes', () => {
    beforeEach(() => {
      notes.push(createNote(notes, { title: 'Alpha', content: 'Beta' }, nextId++));
      notes.push(createNote(notes, { title: 'Gamma', content: 'Delta' }, nextId++));
    });
    it('returns all notes if query is empty', () => {
      expect(searchNotes(notes, '').length).toBe(2);
    });
    it('filters by title or content (case-insensitive)', () => {
      expect(searchNotes(notes, 'alpha').length).toBe(1);
      expect(searchNotes(notes, 'delta').length).toBe(1);
      expect(searchNotes(notes, 'a').length).toBe(2);
    });
    it('returns empty if no match', () => {
      expect(searchNotes(notes, 'zzz').length).toBe(0);
    });
  });
});
