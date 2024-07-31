const db = require('./database');
const fs = require('fs');
const path = require('path');

function seedDatabase() {
  const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db.json'), 'utf8'));
  const animes = jsonData.animes;

  db.serialize(() => {
    db.run("DELETE FROM animes");

    const stmt = db.prepare("INSERT INTO animes (id, titulo, imagem, categoria, criador, ano) VALUES (?, ?, ?, ?, ?, ?)");
  
    animes.forEach((anime) => {
      stmt.run(anime.id, anime.titulo, anime.imagem, anime.categoria, anime.criador, anime.ano);
      console.log(`Inserido: ${anime.titulo}`);
    });

    stmt.finalize();

    console.log(`${animes.length} animes inseridos com sucesso no banco SQLite.`);
  });
}

module.exports = seedDatabase;
