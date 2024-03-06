import React from 'react';
import Slider from 'react-slick';

const CryptoTicker = ({ cryptos }) => {
  // Configuración para el carrusel
  const settings = {
    infinite: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    arrows: false,
  };

  return (
    <div style={{ overflow: 'hidden', maxWidth: '100%' }}>
      <Slider {...settings}>
        {cryptos.map(crypto => (
          <div key={crypto.id} style={{ whiteSpace: 'nowrap', marginRight: '20px' }}>
            {crypto.name}: ${crypto.current_price}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CryptoTicker;
