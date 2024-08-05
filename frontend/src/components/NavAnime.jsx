import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavAnime = () => {
  return (
    <Box
      as="nav"
      bg="black"
      py={3}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 8 }}
      >
        <IconButton
          icon={<FaFire />}
          fontSize="40px"
          color="red" // Define a cor vermelha para o ícone do react-icons
          aria-label="Toggle navigation"
          variant="unstyled"
          onClick={() => {            
          }}
        />

      </Flex>
    </Box>
  );
};

export default NavAnime;
