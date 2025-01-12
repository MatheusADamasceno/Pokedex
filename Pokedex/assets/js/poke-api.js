const pokeApi = {};

function pokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon ()
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [ type ] = types
    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.other.home.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(pokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 2) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))

}