module.exports = (db) => {
  db.run(`CREATE TABLE IF NOT EXISTS NoteTags (
    noteId INTEGER NOT NULL,
    tagId INTEGER NOT NULL,
    PRIMARY KEY (noteId, tagId),
    FOREIGN KEY (noteId) REFERENCES Notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES Tags(id) ON DELETE CASCADE
  )`);
};
