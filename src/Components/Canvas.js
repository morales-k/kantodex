import React, { useRef, useState, useEffect } from 'react'
import { setupCanvas, getPokemon, draw } from '../ViewModel/CanvasVM';

function Canvas() {
    const [canvasReady, setCanvasReady] = useState(false);
    const [pokeData, setPokeData] = useState(null);
    const canvas = useRef();

    useEffect(() => {
        setupCanvas(canvas, setCanvasReady);
		getPokemon(setPokeData);
      }, []);
    
      useEffect(() => {
        if (canvasReady) {
          draw(canvas);
        }
      }, [canvasReady]);

    return (
        <canvas ref={canvas} />
    )
}

export default Canvas;