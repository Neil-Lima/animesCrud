const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const animeRoutes = require('./src/routes/anime.routes');
const db = require('./src/database/db');

const app = express();
const PORT = process.env.PORT || 3333;

// Configuração do cors
app.use(cors());

// Configuração do body-parser
app.use(bodyParser.json());

// Configuração das rotas
app.use('/api', animeRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
