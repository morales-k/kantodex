import React, { useRef, useState, useEffect } from 'react'
import { getPokemon } from '../ViewModel/RequestVM';
import { setupCanvas, draw } from '../ViewModel/CanvasVM';

function Canvas() {
    const [canvasReady, setCanvasReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
    const [pokeData, setPokeData] = useState([]);
    const canvas = useRef();

    useEffect(() => {
		const localPokemonList = JSON.parse(localStorage.getItem("pokemonList"));
		setupCanvas(canvas, setCanvasReady);
		
		if (localPokemonList) {
			let allPokemonData = [];
			setPokemonList(localPokemonList);

			localPokemonList.forEach(mon => {
				const id = mon.url.substring(mon.url, mon.url.length - 1).match(/\d+$/)[0];
				const pokemon = JSON.parse(localStorage.getItem(`pokeID${id}`));
				if (pokemon) {
					allPokemonData.push(pokemon);
				}
			});

			setPokeData(allPokemonData);
		} else {
			getPokemon();
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