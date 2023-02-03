import * as Dex from "./PokedexVM";
import * as Circle from "./CirclesVM";
const dpr = window.devicePixelRatio || 1;

export const getPokemon = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(data => data.json())
    .then(data => {
        const allPokemonSerialized = JSON.stringify(data.results);
        localStorage.setItem("pokemonList", allPokemonSerialized);

        data.results.forEach(async pokemon => {
            await getPokemonData(pokemon);
        })
    })
}

const getPokemonData = async (pokemon) => {
    let url = pokemon.url;
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        const pokemonSerialized = JSON.stringify(data);
        localStorage.setItem(`pokeID${data.id}`, pokemonSerialized);
    })
};

// Sets & scales canvas by DPR to fix blur. Returns canvas context.
export function setupCanvas(canvas, setCanvasReady) {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    canvas.current.width = rect.width * dpr;
    canvas.current.height = rect.height * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    setCanvasReady(true);
    return ctx;
}

// Clears & redraws the canvas.
export function draw(canvas) {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Draw the screen & speaker.
    Dex.screenBackground(ctx);
    Dex.screenDisplay(ctx);
    Dex.drawSpeaker(ctx);

    // Draw RYG lights & screen dots.
    Dex.drawCircle(ctx, Circle.redLight);
    Dex.drawCircle(ctx, Circle.yellowLight);
    Dex.drawCircle(ctx, Circle.greenLight);
    Dex.drawCircle(ctx, Circle.grayScreenDot1);
    Dex.drawCircle(ctx, Circle.grayScreenDot2);
    Dex.drawCircle(ctx, Circle.redScreenDot);

    // Draw the voice light, detail line, button group & thumbpad.
    Dex.detailLine(ctx);
    Dex.voiceLightCircle(ctx);
    Dex.drawButtonGroup(ctx);
    Dex.thumbPad(ctx);
};