import React, { useState, useEffect } from "react";
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
import useApi from "../../hooks/useApi";

const CardAnime = () => {
  // Obtém a página inicial armazenada localmente ou define como 1
  const paginaInicial = parseInt(localStorage.getItem("paginaAtual")) || 1;

  // Utiliza o hook useApi para obter dados da API
  const {
    dados,
    carregando,
    erro,
    paginaAtual,
    totalPaginas,
    paginacao,
    excluirItem, 
    editarItem,
    salvarItemEditado,
    itemEditando,
    cancelarEdicao,
    lidarComMudancaFormularioEditar,
  } = useApi("http://localhost:3334/api/animes", 6, paginaInicial);

  // Estado para controlar o modo de edição
  const [editando, setEditando] = useState(false);

  // Função para alternar entre o modo de edição e exibição normal
  const toggleModoEdicao = () => {
    setEditando((prevState) => !prevState);
  };

  // Função para recarregar a página
  const recarregarPagina = () => {
    paginacao(paginaAtual);
  };

  // Função para exibir alerta de sucesso ao editar item
  const exibirAlertaEditado = () => {
    window.alert("Item editado com sucesso!");
    localStorage.setItem("paginaAtual", paginaAtual);
    window.location.reload(); // Recarregar a página
  };

  // Função para exibir alerta de erro ao editar item
  const exibirAlertaErroEdicao = (erro) => {
    window.alert(`Erro ao editar o item: ${erro}`);
  };

  // Efeito para chamar a função de paginacao na montagem inicial
  useEffect(() => {
    paginacao(paginaInicial);
  }, [paginacao, paginaInicial]);

  return (
    <Container>
      {/* Verifica se está carregando os dados */}
      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        // Exibe mensagem de erro, caso ocorra algum problema
        <p>Ocorreu um erro ao carregar os dados.</p>
      ) : (
        // Exibe a grade de animes e controles de paginação
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {/* Mapeia os dados para criar os itens da grade */}
          {dados.map((anime) => (
            <GridItem key={anime.id} borderWidth="1px" rounded="md">
              <Box>
                {/* Exibe a imagem do anime */}
                <Image src={anime.imagem} alt={`Imagem do anime ${anime.titulo}`} w="100%" height="250" d="block" />
                <Box>
                  {/* Exibe a categoria do anime */}
                  <Badge colorScheme="blue">{anime.categoria}</Badge>
                  {/* Verifica se está no modo de edição */}
                  {editando && itemEditando?.id === anime.id ? (
                    <>
                      {/* Campos de edição */}
                      <Input
                        type="text"
                        value={itemEditando?.titulo || ""}
                        onChange={(e) => lidarComMudancaFormularioEditar(e)}
                        name="titulo"
                        placeholder="Novo título"
                      />
                      {/* (Repita para os outros campos de edição) */}
                      {/* Botões de ação na edição */}
                      <Button
                        colorScheme="green"
                        mr={2}
                        onClick={() => {
                          salvarItemEditado()
                            .then(() => {
                              toggleModoEdicao();
                              exibirAlertaEditado();
                            })
                            .catch((erro) => {
                              exibirAlertaErroEdicao(erro);
                              toggleModoEdicao();
                            });
                        }}
                      >
                        Salvar
                      </Button>
                      <Button colorScheme="red" onClick={cancelarEdicao}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Exibição normal */}
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
                        onClick={() => {
                          editarItem(anime);
                          toggleModoEdicao();
                        }}
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
      {/* Controles de paginação */}
      <Flex justifyContent="center" mt={3}>
        <Pagination>
          <Pagination.Prev disabled={paginaAtual === 1} onClick={() => paginacao(paginaAtual - 1)} />
          {Array.from({ length: totalPaginas }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginaAtual}
              onClick={() => paginacao(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => paginacao(paginaAtual + 1)} />
        </Pagination>
      </Flex>
    </Container>
  );
};

export default CardAnime;
