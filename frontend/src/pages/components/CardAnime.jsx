import React from "react";
import { Image, Badge, Box, Flex, IconButton, Button, Grid, GridItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Container, Pagination } from "react-bootstrap";
import useApi from "../../hooks/useApi";

const CardAnime = () => {
  const {
    dados,
    carregando,
    erro,
    paginaAtual,
    totalPaginas,
    paginacao,
    excluirItem,
    editarItem
  } = useApi("http://localhost:3333/animes", 6);

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
                    onClick={() => editarItem(anime)} // Implemente a função editarItem, se necessário
                  />
                  <Button colorScheme="blue">Mostrar Detalhes</Button>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
      <Flex justifyContent="center" mt={3}>
        <Pagination>
          <Pagination.Prev disabled={paginaAtual === 1} onClick={() => paginacao(paginaAtual - 1)}/>
          {Array.from({ length: totalPaginas }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === paginaAtual} onClick={() => paginacao(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => paginacao(paginaAtual + 1)}/>
        </Pagination>
      </Flex>
    </Container>
  );
};

export default CardAnime;