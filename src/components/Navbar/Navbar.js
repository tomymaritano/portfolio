import React from "react";

import {
  Flex,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Navbar = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyItems={"center"}
      justifyContent={"space-between"}
      p={2}
      bgColor={"#1A202C"}
    >
      <Box pl={4}>
        <Text color={"white"} as={"b"}>
          TomyDEV.
        </Text>
      </Box>
      <Box pr={4}>
        <Menu>
          <MenuButton
            size={"sm"}
            as={IconButton}
            aria-label="Options"
            color={"white"}
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘T">
              New Tab
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
              New Window
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
