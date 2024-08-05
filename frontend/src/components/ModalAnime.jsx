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
  VStack,
  HStack,
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            <VStack spacing={4} align="stretch">
              <Image src={anime.imagem} alt={anime.titulo} objectFit="cover" maxHeight="300px" width="100%" />
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl">{anime.titulo}</Text>
                <Text fontWeight="bold" color="blue.500">{anime.ano}</Text>
              </HStack>
              <Text><strong>Categoria:</strong> {anime.categoria}</Text>
              <Text><strong>Criador:</strong> {anime.criador}</Text>
              <Text><strong>Descrição:</strong> {anime.descricao || "Sem descrição disponível"}</Text>
            </VStack>
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

