// index.js
const express = require('express');
const cors = require('cors'); // Importe o módulo cors

const sequelize = require('./src/database/db');
const animeRoutes = require('./src/routes/anime.route');

const app = express();
const PORT = 3334;

// Configuração do CORS
app.use(cors());

// Conectar ao banco de dados usando Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Sincronizar os modelos com o banco de dados (isso cria as tabelas, se não existirem)
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu servidor Node.js com Sequelize e MySQL!');
});

// Rotas relacionadas a animes
app.use('/api/animes', animeRoutes); // Ajuste o caminho da rota para '/api/animes'

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
