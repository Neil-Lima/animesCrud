import React, { useState, useEffect } from 'react';
import { Box, Grid, Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import useApi from '../../hooks/useApi';

const FormAnime = () => {
  const apiUrl = 'http://localhost:3334/api/animes';
  const { AdicionarForm, atualizarValorCampo, valoresCamposAdicionar, mensagemAdicionar, buscarDados } = useApi(apiUrl);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (mensagemAdicionar) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [mensagemAdicionar]);

  const handleInputChange = (nomeCampo, valorCampo) => {
    atualizarValorCampo(nomeCampo, valorCampo);
  };

  const handleAdicionarClick = async () => {
    await AdicionarForm();
    buscarDados(); // Atualiza a lista após adicionar um item
  };

  return (
    <Box className="container" style={{ marginTop: "10px", padding: "20px" }}>
      <form>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Input
            variant="filled"
            placeholder="Titulo"
            bg="#dce0e1"
            value={valoresCamposAdicionar.titulo || ''}
            onChange={(e) => handleInputChange('titulo', e.target.value)}
          />
          <Input
            variant="filled"
            placeholder="Imagem"
            bg="#dce0e1"
            value={valoresCamposAdicionar.imagem || ''}
            onChange={(e) => handleInputChange('imagem', e.target.value)}
          />
          <Input
            variant="filled"
            placeholder="Categoria"
            bg="#dce0e1"
            value={valoresCamposAdicionar.categoria || ''}
            onChange={(e) => handleInputChange('categoria', e.target.value)}
          />
          <Input
            variant="filled"
            placeholder="Criador"
            bg="#dce0e1"
            value={valoresCamposAdicionar.criador || ''}
            onChange={(e) => handleInputChange('criador', e.target.value)}
          />
          <Input
            variant="filled"
            type="number"
            placeholder="Ano"
            bg="#dce0e1"
            value={valoresCamposAdicionar.ano || ''}
            onChange={(e) => handleInputChange('ano', e.target.value)}
          />
        </Grid>
      </form>
      <Button colorScheme="blue" mt="10px" type="button" onClick={handleAdicionarClick}>
        Adicionar
      </Button>
      {alertVisible && (
        <Alert status="success" mt="4">
          <AlertIcon />
          {mensagemAdicionar}
        </Alert>
      )}
    </Box>
  );
};

export default FormAnime;
