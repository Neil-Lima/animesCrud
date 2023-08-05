import { Box, Grid, Input, Button } from "@chakra-ui/react";

const FormAnime = () => {
  return (
    <Box
      className="container"
      style={{ marginTop: "10px", padding: "20px" }}
    >
      <form>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Input
            variant="filled"
            placeholder="Titulo"
            bg="#dce0e1"
          />
          <Input
            variant="filled"
            placeholder="Imagem"
            bg="#dce0e1"
          />
          <Input
            variant="filled"
            placeholder="Categoria"
            bg="#dce0e1"
          />
          <Input
            variant="filled"
            placeholder="Criador"
            bg="#dce0e1"
          />
          <Input
            variant="filled"
            type="number"
            placeholder="Ano"
            bg="#dce0e1"
          />
        </Grid>
      </form>
      <Button colorScheme="blue" mt="10px" type="button">
        Adicionar
      </Button>
    </Box>
  );
};

export default FormAnime;
