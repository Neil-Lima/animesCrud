const db = require('../config/database');

const Anime = {
  getAll: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM animes LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  count: () => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) as count FROM animes`, (err, result) => {
        if (err) reject(err);
        else resolve(result.count);
      });
    });
  },

  add: (anime) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO animes (titulo, imagem, categoria, criador, ano) VALUES (?, ?, ?, ?, ?)`,
        [anime.titulo, anime.imagem, anime.categoria, anime.criador, anime.ano],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  update: (id, anime) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE animes SET titulo = ?, imagem = ?, categoria = ?, criador = ?, ano = ? WHERE id = ?`,
        [anime.titulo, anime.imagem, anime.categoria, anime.criador, anime.ano, id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM animes WHERE id = ?`, id, function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
};

module.exports = Anime;
