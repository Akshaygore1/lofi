import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { gifs } from "./gif";

function Background() {
  const [currentGif, setCurrentGif] = useState<(typeof gifs)[number] | null>(
    null
  );

  const getRandomGif = useCallback(() => {
    setCurrentGif(gifs[Math.floor(Math.random() * gifs.length)]);
  }, []);

  useEffect(() => {
    // Set an initial random GIF
    getRandomGif();

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "r") {
        getRandomGif();
      }
    };

    // Add event listener for key press
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [getRandomGif]);

  return (
    <>
      {currentGif && (
        <img
          src={currentGif.url}
          alt={currentGif.name}
          className="landscape"
          key={currentGif.url}
        />
      )}
    </>
  );
}

export default Background;
