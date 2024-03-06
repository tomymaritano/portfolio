import { Box, Flex, Heading } from "@chakra-ui/react";
import Atropos from "atropos/react";
import "atropos/atropos.css";

import React from "react";

const Projects = () => {
  return (
    <>
      <Flex
        bgColor={"#20252C"}
        minH={"100vh"}
        flexDir={"column"}
        justifyContent={"center"}
        p={4}
      >
        <Heading>Projects</Heading>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Atropos
            activeOffset={40}
            shadowScale={1.05}
            onEnter={() => console.log("Enter")}
            onLeave={() => console.log("Leave")}
            onRotate={(x, y) => console.log("Rotate", x, y)}
            className="my-atropos"
          >
            {" "}
            <Box minH={"20vh"} minW={"20vh"} bgColor={"red"}></Box>
          </Atropos>
          <Atropos
            activeOffset={40}
            shadowScale={1.05}
            onEnter={() => console.log("Enter")}
            onLeave={() => console.log("Leave")}
            onRotate={(x, y) => console.log("Rotate", x, y)}
            className="my-atropos"
          >
            {" "}
            <Box minH={"20vh"} minW={"20vh"} bgColor={"red"}></Box>
          </Atropos>
          <Atropos
            activeOffset={40}
            shadowScale={1.05}
            onEnter={() => console.log("Enter")}
            onLeave={() => console.log("Leave")}
            onRotate={(x, y) => console.log("Rotate", x, y)}
            className="my-atropos"
          >
            {" "}
            <Box minH={"20vh"} minW={"20vh"} bgColor={"red"}></Box>
          </Atropos>
          <Atropos
            activeOffset={40}
            shadowScale={1.05}
            onEnter={() => console.log("Enter")}
            onLeave={() => console.log("Leave")}
            onRotate={(x, y) => console.log("Rotate", x, y)}
            className="my-atropos"
          >
            {" "}
            <Box minH={"20vh"} minW={"20vh"} bgColor={"red"}></Box>
          </Atropos>
        </Box>
      </Flex>
    </>
  );
};
export default Projects;
