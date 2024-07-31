const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.get('/animes', animeController.getAllAnimes);
router.post('/animes', animeController.addAnime);
router.put('/animes/:id', animeController.updateAnime);
router.delete('/animes/:id', animeController.deleteAnime);

module.exports = router;
