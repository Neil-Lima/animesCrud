const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagem: { type: String, required: true },
  categoria: { type: String, required: true },
  criador: { type: String, required: true },
  ano: { type: Number, required: true },
});

module.exports = mongoose.model("animes_tb", animeSchema);
