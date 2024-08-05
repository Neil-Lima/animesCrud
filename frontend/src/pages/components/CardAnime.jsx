import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  Badge,
  Box,
  Flex,
  IconButton,
  Button,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Container, Pagination } from "react-bootstrap";

const CardAnime = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [editando, setEditando] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  const fetchDados = async (pagina) => {
    try {
      setCarregando(true);
      const response = await axios.get(`http://localhost:3334/api/animes?page=${pagina}&limit=6`);
      setDados(response.data.data);
      setPaginaAtual(response.data.currentPage);
      setTotalPaginas(response.data.totalPages);
      setCarregando(false);
    } catch (error) {
      setErro(error.message);
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchDados(paginaAtual);
  }, [paginaAtual]);

  const excluirItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3334/api/animes/${id}`);
      fetchDados(paginaAtual);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };

  const editarItem = (anime) => {
    setItemEditando(anime);
    setEditando(true);
  };

  const salvarItemEditado = async () => {
    try {
      await axios.put(`http://localhost:3334/api/animes/${itemEditando.id}`, itemEditando);
      setEditando(false);
      setItemEditando(null);
      fetchDados(paginaAtual);
      window.alert("Item editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar item:", error);
      window.alert(`Erro ao editar o item: ${error.message}`);
    }
  };

  const cancelarEdicao = () => {
    setEditando(false);
    setItemEditando(null);
  };

  const handleInputChange = (e) => {
    setItemEditando({ ...itemEditando, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p>Ocorreu um erro ao carregar os dados.</p>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {dados.map((anime) => (
            <GridItem key={anime.id} borderWidth="1px" rounded="md">
              <Box>
                <Image src={anime.imagem} alt={`Imagem do anime ${anime.titulo}`} w="100%" height="250" d="block" />
                <Box>
                  <Badge colorScheme="blue">{anime.categoria}</Badge>
                  {editando && itemEditando?.id === anime.id ? (
                    <>
                      <Input
                        type="text"
                        value={itemEditando?.titulo || ""}
                        onChange={handleInputChange}
                        name="titulo"
                        placeholder="Novo título"
                      />
                      <Input
                        type="text"
                        value={itemEditando?.imagem || ""}
                        onChange={handleInputChange}
                        name="imagem"
                        placeholder="Nova imagem"
                      />
                      <Input
                        type="text"
                        value={itemEditando?.categoria || ""}
                        onChange={handleInputChange}
                        name="categoria"
                        placeholder="Nova categoria"
                      />
                      <Input
                        type="text"
                        value={itemEditando?.criador || ""}
                        onChange={handleInputChange}
                        name="criador"
                        placeholder="Novo criador"
                      />
                      <Input
                        type="number"
                        value={itemEditando?.ano || ""}
                        onChange={handleInputChange}
                        name="ano"
                        placeholder="Novo ano"
                      />
                      <Button
                        colorScheme="green"
                        mr={2}
                        onClick={salvarItemEditado}
                      >
                        Salvar
                      </Button>
                      <Button colorScheme="red" onClick={cancelarEdicao}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <h4 style={{ margin: "5px" }}>{anime.titulo}</h4>
                      <IconButton
                        icon={<FontAwesomeIcon icon={faTrashAlt} />}
                        colorScheme="red"
                        mr={2}
                        onClick={() => excluirItem(anime.id)}
                      />
                      <IconButton
                        icon={<FontAwesomeIcon icon={faPencilAlt} />}
                        colorScheme="green"
                        mr={2}
                        onClick={() => editarItem(anime)}
                      />
                      <Button colorScheme="blue">Mostrar Detalhes</Button>
                    </>
                  )}
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
      <Flex justifyContent="center" mt={3}>
        <Pagination>
          <Pagination.Prev disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)} />
          {Array.from({ length: totalPaginas }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginaAtual}
              onClick={() => setPaginaAtual(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)} />
        </Pagination>
      </Flex>
    </Container>
  );
};

export default CardAnime;
