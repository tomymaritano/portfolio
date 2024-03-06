import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  List,
  ListItem,
  HStack,
  UnorderedList,
} from "@chakra-ui/react";

import Atropos from "atropos/react";
import "atropos/atropos.css";

import { FaGithub } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { IoLogoFirebase, IoLogoJavascript } from "react-icons/io5";

import { FaCss3Alt } from "react-icons/fa";

const Main = () => {
  return (
    <>
      <Flex minH={"50vh"} flexDir={'column'} bgColor={"#20252C"} alignItems={'center'} justifyContent={'space-evenly'}>
        <Box w={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
          <Box p={5}>
            <Heading color={"white"} as={"h1"} size={"xl"}>
              Full Stack Developer
            </Heading>
            <Text as={"h2"} size={"md"} color={"white"}>
              Hey, Im tomy!
            </Text>
          </Box>
          <Box p={5}>
            <Atropos
              activeOffset={40}
              shadowScale={1.05}
              onEnter={() => console.log("Enter")}
              onLeave={() => console.log("Leave")}
              onRotate={(x, y) => console.log("Rotate", x, y)}
              className="my-atropos"
            >
              {" "}
              <Image
                width={"200px"}
                borderRadius={"20px"}
                src={
                  "https://media.licdn.com/dms/image/D4D03AQH0MyoFc_QYOw/profile-displayphoto-shrink_800_800/0/1706897249816?e=1715212800&v=beta&t=CONbb6C7YLYmyLFzR7BPp56S5u1XspHzCpsD7RqwUM8"
                }
              ></Image>
            </Atropos>
          </Box>
        </Box>

        <Box>
          <HStack minW={'80vh'} color={"white"} spacing={7}>
            <Text fontSize={'20px'}>Techstack </Text>
            <UnorderedList
            fontSize={'20px'}
              display={"flex"}
              justifyContent={"space-around"}
              alignContent={"center"}
              textDecoration={"none"}
              listStyleType={"none"}
              gap={4}
            >
              <ListItem _hover={{color: "red"}} >
                <DiMongodb />
              </ListItem>
              <ListItem _hover={{color: "yellow"}}>
                <IoLogoJavascript />
              </ListItem>
              <ListItem _hover={{color: "red"}} >
                <FaReact />
              </ListItem>
              <ListItem _hover={{color: "red"}} >
                <FaCss3Alt />
              </ListItem>
              <ListItem _hover={{color: "red"}} >
                <FaHtml5 />
              </ListItem>
              <ListItem _hover={{color: "red"}} >
                <IoLogoFirebase />
              </ListItem>
            </UnorderedList>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Main;
