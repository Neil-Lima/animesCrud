// src/routes/anime.route.js
const express = require('express');
const router = express.Router();
const animeController = require('../controller/anime.controller');

// Rotas para animes
router.post('/', animeController.criarAnime);
router.get('/', animeController.listarAnimes);
router.get('/:id', animeController.buscarAnimePorId);
router.put('/:id', animeController.atualizarAnime);
router.delete('/:id', animeController.excluirAnime);

module.exports = router;
