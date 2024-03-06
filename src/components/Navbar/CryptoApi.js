import React, { useEffect, useState } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import './styles.css'

const CryptoApi = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Definir la función asincrónica dentro de useEffect
    const fetchData = async () => {
      try {
        // Utiliza la URL de la API de CoinGecko para obtener las criptomonedas
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        if (!response.ok) {
          throw new Error('Error al obtener datos de la API');
        }
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // El arreglo vacío asegura que el efecto se ejecute una vez al montar el componente

  return (
    <Box overflow="hidden" whiteSpace="nowrap">
      <Box className="crypto-ticker" display="flex">
        {cryptos.map((crypto) => (
          <Box key={crypto.id} mx="4" display="flex" alignItems="center" justifyContent={'space-between'}>
            <Image src={crypto.image} boxSize="20px" mr="2" />
            <Text as={'b'} fontSize="sm"> ${crypto.current_price}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default CryptoApi;
