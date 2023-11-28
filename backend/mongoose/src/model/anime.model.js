// backend/src/model/anime.model.js

const mongoose = require('../database/db');

const animeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagem: { type: String, required: true },
  ano: { type: Number, required: true },
  criador: { type: String, required: true },
  categoria: { type: String, required: true },
}, { collection: 'animes_tb' });

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
