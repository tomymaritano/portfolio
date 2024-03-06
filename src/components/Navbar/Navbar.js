import React from "react";
import {
  Flex,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  SunIcon,
} from "@chakra-ui/icons";
import ThemeToggleButton from "../../ThemeToggleButton";
import { DiGithub } from "react-icons/di";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <Flex
      top={0}
      position={"sticky"}
      w={"full"}
      alignItems="center"
      justifyContent="space-between"
      p={2}
      bgColor="rgb(32, 37, 44, 0.8)" // Usar un color de fondo con transparencia
      backdropFilter="blur(20px)" // Aplicar el efecto de desenfoque
      zIndex="docked" // Asegurarse de que la barra de navegación se muestre sobre otros contenidos
    >
      <Box pl={4}>
        <Text color="white" as="b">
          TDEV.
        </Text>
      </Box>
      <Box display={"flex"} gap={1} pr={4}>
        <Box>
          <Button size={'sm'} bgColor="none"><FaGithub /></Button>
        </Box>
        <Box>
          <ThemeToggleButton />
        </Box>
        <Box>
          <Menu>
            <MenuButton
              size={"sm"}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              color="white"
            />
            <MenuList>
              <MenuItem icon={<AddIcon />}>New Tab</MenuItem>
              <MenuItem icon={<ExternalLinkIcon />}>New Window</MenuItem>
              <MenuItem icon={<RepeatIcon />}>Open Closed Tab</MenuItem>
              <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
