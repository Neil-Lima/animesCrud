const Anime = require('../models/animeModel');

exports.getAllAnimes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const animes = await Anime.getAll(limit, offset);
    const totalItems = await Anime.count();
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      data: animes,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAnime = async (req, res) => {
  try {
    const id = await Anime.add(req.body);
    res.json({ id: id, message: "Anime adicionado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnime = async (req, res) => {
  try {
    const changes = await Anime.update(req.params.id, req.body);
    res.json({ changes: changes, message: "Anime atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnime = async (req, res) => {
  try {
    await Anime.delete(req.params.id);
    res.json({ message: "Anime excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
