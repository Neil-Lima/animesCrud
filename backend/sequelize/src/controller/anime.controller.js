// src/controller/anime.controller.js
const Anime = require('../model/anime.model');

// Criar um novo anime
async function criarAnime(req, res) {
  try {
    const { titulo, imagem, criador, ano, categoria } = req.body;
    const novoAnime = await Anime.create({ titulo, imagem, criador, ano, categoria });
    return res.status(201).json(novoAnime);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

// Listar todos os animes
async function listarAnimes(req, res) {
  try {
    const animes = await Anime.findAll();
    return res.status(200).json(animes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

// Buscar um anime por ID
async function buscarAnimePorId(req, res) {
  const { id } = req.params;
  try {
    const anime = await Anime.findByPk(id);
    if (!anime) {
      return res.status(404).json({ mensagem: 'Anime não encontrado' });
    }
    return res.status(200).json(anime);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

// Atualizar um anime por ID
async function atualizarAnime(req, res) {
  const { id } = req.params;
  try {
    const [atualizacoes] = await Anime.update(req.body, {
      where: { id },
    });
    if (atualizacoes === 0) {
      return res.status(404).json({ mensagem: 'Anime não encontrado' });
    }
    const animeAtualizado = await Anime.findByPk(id);
    return res.status(200).json(animeAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

// Excluir um anime por ID
async function excluirAnime(req, res) {
  const { id } = req.params;
  try {
    const anime = await Anime.findByPk(id);
    if (!anime) {
      return res.status(404).json({ mensagem: 'Anime não encontrado' });
    }
    await anime.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

module.exports = {
  criarAnime,
  listarAnimes,
  buscarAnimePorId,
  atualizarAnime,
  excluirAnime,
};
