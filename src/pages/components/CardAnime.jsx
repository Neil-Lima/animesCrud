import React from "react";
import { Image, Badge, Box, Flex, IconButton, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {Container, Pagination } from "react-bootstrap";

const CardAnime = () => {
  return (
    <Container>
      <Box borderWidth="1px" rounded="md">
        <Image src="https://exemplo.com/naruto.jpg" alt="Imagem do anime" w="100%" d="block" />
        <Box>
          <Badge colorScheme="blue">Categoria</Badge>
          <h4 style={{ margin: "5px" }}>Título</h4>
          <IconButton icon={<FontAwesomeIcon icon={faTrashAlt} />} colorScheme="red" mr={2} />
          <IconButton icon={<FontAwesomeIcon icon={faPencilAlt} />} colorScheme="green" mr={2} />
          <Button>Mostrar Detalhes</Button>
        </Box>
      </Box>
      <Flex justifyContent="center" mt={3}>
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </Flex>
    </Container>
  );
};

export default CardAnime;
