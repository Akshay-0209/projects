const express = require('express');
const path = require('path');
const app = express();
const notesRouter = require('./src/notes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
