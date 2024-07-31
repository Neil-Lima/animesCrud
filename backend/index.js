const express = require('express');
const cors = require('cors');
const animeRoutes = require('./routes/animeRoutes');
const seedDatabase = require('./config/seedDatabase');

const app = express();
const port = process.env.PORT || 3334;

app.use(cors());
app.use(express.json());

// Seed the database
seedDatabase();

app.use('/api', animeRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
