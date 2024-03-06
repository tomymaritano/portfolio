import React, { useEffect, useState } from "react";

const CLIENT_ID = "tu_client_id"; // Reemplaza con tu Client ID
const REDIRECT_URI = "tu_redirect_uri"; // La URI de redirección configurada en tu Dashboard de Spotify
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = ["streaming", "user-read-email", "user-read-private"]; // Añade más scopes según necesites

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
  " "
)}&response_type=token&show_dialog=true`;

const SpotifyPlayer = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Verifica el hash de la URL para obtener el token
    if (window.location.hash) {
      const token = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      setToken(token);
      window.localStorage.setItem("token", token);
      window.location.hash = ""; // Limpia el hash de la URL
    } else {
      // Intenta recuperar el token desde localStorage
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Tu Reproductor Web de Spotify",
          getOAuthToken: cb => cb(token),
          volume: 0.5,
        });

        player.addListener("ready", ({ device_id }) => {
          console.log("Listo con Device ID", device_id);
        });

        player.connect();
      };
    };

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, [token]); // Dependencia: se vuelve a ejecutar este efecto cuando el token cambia

  return (
    <div>
      {!token && (
        <a href={loginUrl}>Login con Spotify</a>
      )}
      {/* Aquí podrías añadir más UI relacionado con el estado del reproductor, etc. */}
    </div>
  );
};

export default SpotifyPlayer;