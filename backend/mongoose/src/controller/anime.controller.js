// backend/src/controller/anime.controller.js

const Anime = require('../model/anime.model');

// Controller para listar todos os animes
const listarAnimes = async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller para obter um anime pelo ID
const obterAnimePorId = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json(anime);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller para adicionar um novo anime
const adicionarAnime = async (req, res) => {
  try {
    const { titulo, imagem, ano, criador, categoria } = req.body;
    const novoAnime = new Anime({ titulo, imagem, ano, criador, categoria });
    const animeSalvo = await novoAnime.save();
    res.json(animeSalvo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller para atualizar um anime pelo ID
const atualizarAnime = async (req, res) => {
  try {
    const { titulo, imagem, ano, criador, categoria } = req.body;
    const animeAtualizado = await Anime.findByIdAndUpdate(
      req.params.id,
      { titulo, imagem, ano, criador, categoria },
      { new: true }
    );
    if (!animeAtualizado) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json(animeAtualizado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller para excluir um anime pelo ID
const excluirAnime = async (req, res) => {
  try {
    const animeExcluido = await Anime.findByIdAndDelete(req.params.id);
    if (!animeExcluido) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json({ message: 'Anime excluído com sucesso' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  listarAnimes,
  obterAnimePorId,
  adicionarAnime,
  atualizarAnime,
  excluirAnime,
};
