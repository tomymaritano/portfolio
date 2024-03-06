import React from "react";

import { Flex } from "@chakra-ui/react";
import CryptoApi from "./CryptoApi";

const CryptoNav = () => {
    return(
            <Flex minW={'100vh'} minH={'30px'} bgColor={'white'}  justifyContent='center' alignItems={'center'}>
            <CryptoApi />
        </Flex>
    )
}

export default CryptoNav;