import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

function ModalAnime({ isOpen, onClose, animeId }) {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && animeId) {
      fetchAnimeDetails();
    }
  }, [isOpen, animeId]);

  const fetchAnimeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://animes-crud.vercel.app/api/animes/${animeId}`);
      setAnime(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar detalhes do anime');
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Anime</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Text>Carregando...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : anime ? (
            <>
              <Image src={anime.imagem} alt={anime.titulo} mb={4} />
              <Text fontWeight="bold">Título: {anime.titulo}</Text>
              <Text>Categoria: {anime.categoria}</Text>
              <Text>Criador: {anime.criador}</Text>
              <Text>Ano: {anime.ano}</Text>
            </>
          ) : (
            <Text>Nenhum detalhe disponível</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalAnime;
