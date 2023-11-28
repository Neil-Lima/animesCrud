// backend/src/databases/db.js

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/animes_db';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Conectado ao banco de dados');
});

db.on('error', (err) => {
  console.error(`Erro de conexão ao banco de dados: ${err}`);
});

module.exports = mongoose;
