import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Input, Button, Alert, AlertIcon, Container } from "@chakra-ui/react";

const FormAnime = ({ onAnimeAdded }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    imagem: '',
    categoria: '',
    criador: '',
    ano: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAdicionarClick = async () => {
    try {
      await axios.post('https://animes-crud.vercel.app/api/animes', formData);
      setMensagem('Anime adicionado com sucesso!');
      setAlertVisible(true);
      setFormData({
        titulo: '',
        imagem: '',
        categoria: '',
        criador: '',
        ano: ''
      });
      onAnimeAdded();
    } catch (error) {
      setMensagem('Erro ao adicionar anime: ' + error.message);
      setAlertVisible(true);
    }
  };

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  return (
    <Container maxWidth="container.xl" marginTop="10px" padding="20px">
      <form>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <Input
            variant="filled"
            placeholder="Titulo"
            backgroundColor="#dce0e1"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            placeholder="Imagem"
            backgroundColor="#dce0e1"
            name="imagem"
            value={formData.imagem}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            placeholder="Categoria"
            backgroundColor="#dce0e1"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            placeholder="Criador"
            backgroundColor="#dce0e1"
            name="criador"
            value={formData.criador}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            type="number"
            placeholder="Ano"
            backgroundColor="#dce0e1"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </Grid>
      </form>
      <Button colorScheme="blue" marginTop="10px" type="button" onClick={handleAdicionarClick}>
        Adicionar
      </Button>
      {alertVisible && (
        <Alert status={mensagem.includes('Erro') ? "error" : "success"} marginTop="4">
          <AlertIcon />
          {mensagem}
        </Alert>
      )}
    </Container>
  );
};

export default FormAnime;
