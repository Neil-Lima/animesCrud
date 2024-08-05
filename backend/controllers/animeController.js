const Anime = require('../models/animeModel');

exports.getAnimes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  try {
    const animes = await Anime.find().skip(skip).limit(limit);
    const total = await Anime.countDocuments();
    res.json({
      data: animes,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnime = async (req, res) => {
  const anime = new Anime(req.body);
  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAnime = async (req, res) => {
  try {
    const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAnime = async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: 'Anime deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime não encontrado' });
    }
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
