import React, { useRef, useState, useEffect } from 'react'
import { setupCanvas, draw } from '../ViewModel/CanvasVM';

function Canvas() {
    const [canvasReady, setCanvasReady] = useState(false);
    const canvas = useRef();

    useEffect(() => {
        setupCanvas(canvas, setCanvasReady);
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