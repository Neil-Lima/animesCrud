// backend/src/routes/anime.routes.js

const express = require('express');
const router = express.Router();
const animeController = require('../controller/anime.controller');

// Rota para listar todos os animes
router.get('/animes', animeController.listarAnimes);

// Rota para obter um anime pelo ID
router.get('/animes/:id', animeController.obterAnimePorId);

// Rota para adicionar um novo anime
router.post('/animes', animeController.adicionarAnime);

// Rota para atualizar um anime pelo ID
router.put('/animes/:id', animeController.atualizarAnime);

// Rota para excluir um anime pelo ID
router.delete('/animes/:id', animeController.excluirAnime);

module.exports = router;
