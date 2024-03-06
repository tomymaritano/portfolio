import {
  Flex,
  Box,
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";
import SpotifyPlayer from "../Spotify/Spotify";

const AboutMe = () => {
  return (
    <>
      <Flex bgColor={'#20252C'} minH={'100vh'} flexDir={"column"} p={4}>
        <Heading color={'white'}>About Me</Heading>
    </Flex>
    </>
  );
};

export default AboutMe;
