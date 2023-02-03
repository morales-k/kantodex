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