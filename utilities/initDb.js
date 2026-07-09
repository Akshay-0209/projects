const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const userModel = require('../models/user');
const noteModel = require('../models/note');
const tagModel = require('../models/tag');
const noteTagModel = require('../models/noteTag');

const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

userModel(db);
noteModel(db);
tagModel(db);
noteTagModel(db);

module.exports = db;
