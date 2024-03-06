import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  ListItem,
  HStack,
  UnorderedList,
  Image,
  Code,
  Button,
} from "@chakra-ui/react";

import Atropos from "atropos/react";
import "atropos/atropos.css";
import { FaGithub } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { IoLogoFirebase, IoLogoJavascript } from "react-icons/io5";

import { FaCss3Alt } from "react-icons/fa";
import LottieServer from "../Lottie/server";
import ParticlesJS from "../Particles/Particles";

const Main = () => {
  return (
    <>
      <ParticlesJS />
      <Flex
        minH={"100vh"}
        flexDir={"column"}
        bgColor={"#20252C"}
        alignItems={"center"}
        alignContent={"center"}
        justifyItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Box
          minw={"100vh"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyItems={"space-evenly"}
        >
          <Box w={"42vh"} p={5} bgColor={"transparent"}>
            <Atropos
              activeOffset={40}
              shadowScale={1.05}
              rotate={true}
              data-atropos-opacity="0atr"
            >
              {" "}
              <Image
                data-atropos-offset="1"
                borderRadius={"full"}
                border={"1rem solid #171717"}
                src={
                  "https://media.licdn.com/dms/image/D4D03AQH0MyoFc_QYOw/profile-displayphoto-shrink_800_800/0/1706897249816?e=1715212800&v=beta&t=CONbb6C7YLYmyLFzR7BPp56S5u1XspHzCpsD7RqwUM8"
                }
              ></Image>
            </Atropos>
          </Box>
          <Box p={5} w={"65vh"}>
            <Text fontFamily={"Poppins"} color={"gray"}>
              Full stack developer
            </Text>
            <Heading
              sx={{
                background:
                  "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent", // Para navegadores que no soportan background-clip en texto
              }}
              size="2xl"
            >
              Tomas Maritano
            </Heading>
            <HStack pt={2} color={"white"} spacing={1} borderRadius={"full"}>
              <Text fontFamily={"Poppins"} fontSize={"23px"}>
                Techstack
              </Text>
              <UnorderedList
                fontSize={"21px"}
                display={"flex"}
                justifyContent={"space-evenly"}
                textDecoration={"none"}
                listStyleType={"none"}
                gap={4}
              >
                <ListItem _hover={{ color: "red" }}>
                  <DiMongodb />
                </ListItem>
                <ListItem _hover={{ color: "yellow" }}>
                  <IoLogoJavascript />
                </ListItem>
                <ListItem _hover={{ color: "red" }}>
                  <FaReact />
                </ListItem>
                <ListItem _hover={{ color: "red" }}>
                  <FaCss3Alt />
                </ListItem>
                <ListItem _hover={{ color: "red" }}>
                  <FaHtml5 />
                </ListItem>
                <ListItem _hover={{ color: "red" }}>
                  <IoLogoFirebase />
                </ListItem>
              </UnorderedList>
            </HStack>
            <Text fontFamily={"Poppins"} as={"h2"} size={"md"} color={"gray"}>
              <></>
              Passion for cryptocurrencies and innovative technology. I
              specialize in building web applications using the React.
              Hardworker asdfasdf fasdfasdfasfasdfasdfasdf afasdfasdf asdfasdf
            </Text>

            <HStack pt={6}>
              <Button
                fontFamily={"Poppins"}
                borderRadius={"100px"}
                border={"2px solid #Dbf227"}
                _hover={{ background: "#Dbf227" }}
              >
                DownloadCV
              </Button>
              <Button
                fontFamily={"Poppins"}
                borderRadius={"100px"}
                border={"2px solid gray"}
                _hover={{ background: "gray" }}
              >
                Contact
              </Button>
            </HStack>
          </Box>
        </Box>

        <Box></Box>
      </Flex>
    </>
  );
};

export default Main;
