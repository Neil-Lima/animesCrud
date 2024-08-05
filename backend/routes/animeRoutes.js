const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.get('/animes', animeController.getAnimes);
router.post('/animes', animeController.createAnime);
router.put('/animes/:id', animeController.updateAnime);
router.delete('/animes/:id', animeController.deleteAnime);
router.get('/animes/:id', animeController.getAnimeById);

module.exports = router;
