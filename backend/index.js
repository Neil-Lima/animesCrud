require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const animeRoutes = require('./routes/animeRoutes');

const app = express();
const PORT = process.env.PORT || 3334;

connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://animescrud.netlify.app', 'https://animes-crud.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Animes!' });
});

app.use('/api', animeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
