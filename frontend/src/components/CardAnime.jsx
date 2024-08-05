import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Image,
  Badge,
  Box,
  Flex,
  IconButton,
  Button,
  SimpleGrid,
  Input,
  Container,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "react-bootstrap";

const CardAnime = ({ refreshTrigger }) => {
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
      const response = await axios.get(`https://animes-crud.vercel.app/api/animes?page=${pagina}&limit=6`);
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
  }, [paginaAtual, refreshTrigger]);

  const excluirItem = async (id) => {
    try {
      await axios.delete(`https://animes-crud.vercel.app/api/animes/${id}`);
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
      await axios.put(`https://animes-crud.vercel.app/api/animes/${itemEditando._id}`, itemEditando);
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
    <Container maxWidth="container.xl">
      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p>Ocorreu um erro ao carregar os dados.</p>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {dados.map((anime) => (
            <Box key={anime._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image 
                src={anime.imagem} 
                alt={`Imagem do anime ${anime.titulo}`} 
                width="100%" 
                height={{ base: "200px", md: "250px" }} 
                objectFit="cover"
              />
              <Box padding={4}>
                <Badge colorScheme="blue" marginBottom={2}>{anime.categoria}</Badge>
                {editando && itemEditando?._id === anime._id ? (
                  <Flex direction="column" gap={2}>
                    <Input
                      value={itemEditando?.titulo || ""}
                      onChange={handleInputChange}
                      name="titulo"
                      placeholder="Novo título"
                    />
                    <Input
                      value={itemEditando?.imagem || ""}
                      onChange={handleInputChange}
                      name="imagem"
                      placeholder="Nova imagem"
                    />
                    <Input
                      value={itemEditando?.categoria || ""}
                      onChange={handleInputChange}
                      name="categoria"
                      placeholder="Nova categoria"
                    />
                    <Input
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
                    <Button colorScheme="green" onClick={salvarItemEditado}>Salvar</Button>
                    <Button colorScheme="red" onClick={cancelarEdicao}>Cancelar</Button>
                  </Flex>
                ) : (
                  <Flex direction="column" gap={2}>
                    <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                      {anime.titulo}
                    </Box>
                    <Flex>
                      <IconButton
                        icon={<FontAwesomeIcon icon={faTrashAlt} />}
                        colorScheme="red"
                        marginRight={2}
                        onClick={() => excluirItem(anime._id)}
                        size="sm"
                      />
                      <IconButton
                        icon={<FontAwesomeIcon icon={faPencilAlt} />}
                        colorScheme="green"
                        marginRight={2}
                        onClick={() => editarItem(anime)}
                        size="sm"
                      />
                      <Button colorScheme="blue" size="sm">Mostrar Detalhes</Button>
                    </Flex>
                  </Flex>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Flex justifyContent="center" marginTop={6}>
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
