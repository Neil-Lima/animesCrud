require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const animeRoutes = require('./src/routes/animeRoutes');

const app = express();
const PORT = process.env.PORT || 3334;

connectDB();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://seu-app-react.netlify.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Animes!' });
});

app.use('/api', animeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
