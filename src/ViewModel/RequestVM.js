/**
 * Fetches list of the first 151 Pokemon from PokeAPI, stores list in 
 * local storage, and calls getPokemonData for each Pokemon in the list.
 */
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

/**
 * Fetches data for a single Pokemon and stores it in local storage.
 * @param {Object} pokemon - Contains name & url for a single Pokemon.
 */
const getPokemonData = async (pokemon) => {
    let url = pokemon.url;
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        const pokemonSerialized = JSON.stringify(data);
        localStorage.setItem(`pokeID${data.id}`, pokemonSerialized);
    })
};

/**
 * Returns a list of all Pokemon from local storage.
 * @returns {Array}
 */
export const getLocalPokemon = () => {
    const localList = JSON.parse(localStorage.getItem("pokemonList"));
    return localList;
};

/**
 * Returns all Pokemon data from local storage.
 * @returns {Array}
 */
export const getLocalPokemonData = () => {
    const localList = JSON.parse(localStorage.getItem("pokemonList"));
    let allPokemonData = [];

    localList.forEach(mon => {
        const id = mon.url.substring(mon.url, mon.url.length - 1).match(/\d+$/)[0];
        const pokemon = JSON.parse(localStorage.getItem(`pokeID${id}`));
        if (pokemon) {
            allPokemonData.push(pokemon);
        }
    });

    return allPokemonData;
};