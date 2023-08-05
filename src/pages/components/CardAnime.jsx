import { Box, Image, Badge, Heading } from "@chakra-ui/react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import { Button } from "react-bootstrap";

const CardAnime = () => {
  return (
    <Box mt="10px" maxWidth="400px">
      <Box bg="white" p="11px" borderRadius="md" boxShadow="sm">
        <Image src="/path/to/image" alt="CardAnime Image" w="100%" d="block" />
        <Box margin="0px" p="10px">
          <Badge bg="primary" color="white">
            Categoria
          </Badge>
          <Heading size="md" mt="5px">
            Título
          </Heading>
          <FaTrashAlt style={{ cursor: "pointer", marginRight: "6px", marginTop: "6px", color: "red" }} />
          <FaPencilAlt style={{ cursor: "pointer", marginRight: "6px", marginTop: "6px", color: "green" }} />
          <Button colorScheme="primary" mt="6px">
            Mostrar Detalhes
          </Button>
        </Box>
      </Box>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev>«</Pagination.Prev>
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next>»</Pagination.Next>
      </Pagination>
    </Box>
  );
};

export default CardAnime;
