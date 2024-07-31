const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3334;

app.use(cors());
app.use(express.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Inicialização do banco de dados
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

// Rotas da API

// Obter todos os animes com paginação
app.get('/api/animes', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM animes LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    db.get(`SELECT COUNT(*) as count FROM animes`, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const totalItems = result.count;
      const totalPages = Math.ceil(totalItems / limit);
      res.json({
        data: rows,
        currentPage: page,
        totalPages: totalPages
      });
    });
  });
});

// Adicionar um novo anime
app.post('/api/animes', (req, res) => {
  const { titulo, imagem, categoria, criador, ano } = req.body;
  db.run(`INSERT INTO animes (titulo, imagem, categoria, criador, ano) VALUES (?, ?, ?, ?, ?)`,
    [titulo, imagem, categoria, criador, ano],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: "Anime adicionado com sucesso" });
    }
  );
});

// Atualizar um anime existente
app.put('/api/animes/:id', (req, res) => {
  const { titulo, imagem, categoria, criador, ano } = req.body;
  db.run(`UPDATE animes SET titulo = ?, imagem = ?, categoria = ?, criador = ?, ano = ? WHERE id = ?`,
    [titulo, imagem, categoria, criador, ano, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes, message: "Anime atualizado com sucesso" });
    }
  );
});

// Excluir um anime
app.delete('/api/animes/:id', (req, res) => {
  db.run(`DELETE FROM animes WHERE id = ?`, req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Anime excluído com sucesso" });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
