import React, { useRef, useState, useEffect } from 'react'
import { getLocalPokemon, getLocalPokemonData, getPokemon } from '../ViewModel/RequestVM';
import { setupCanvas, draw } from '../ViewModel/CanvasVM';

function Canvas() {
    const [canvasReady, setCanvasReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
    const [pokeData, setPokeData] = useState([]);
    const canvas = useRef();

    useEffect(() => {
		const localPokemonList = getLocalPokemon();
		setupCanvas(canvas, setCanvasReady);

		if (localPokemonList == null) {
			getPokemon();
		} else {
			setPokemonList(localPokemonList);
			const localPokemonData = getLocalPokemonData();

			if (localPokemonData) {
				setPokeData(localPokemonData);
			}
		}
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