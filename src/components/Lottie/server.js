import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../animationServer.json'; // Asegúrate de importar tu archivo JSON

const LottieServer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Lottie options={defaultOptions} height={300} width={300} />
    </>
  );
};

export default LottieServer;
