import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button size={'sm'} onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon/>}
    </Button>
  );
};

export default ThemeToggleButton;