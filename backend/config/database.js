const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE animes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    imagem TEXT,
    categoria TEXT,
    criador TEXT,
    ano INTEGER
  )`);
});

module.exports = db;
