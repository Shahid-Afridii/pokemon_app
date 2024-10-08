import axios from 'axios';
import PokemonSearch from './components/PokemonSearch'; // Import the client component

// Server-side component for fetching Pokémon and types
export default async function Home() {
  let resultsWithTypes = [];
  let types = [];
  let error = null;

  // Fetch Pokémon and Types on the server-side using Axios
  try {
    const [pokemonRes, typesRes] = await Promise.all([
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=150'),
      axios.get('https://pokeapi.co/api/v2/type')
    ]);

    types = typesRes.data.results; // Store the types for the select filter

    // Fetch types for each individual Pokémon
    resultsWithTypes = await Promise.all(
      pokemonRes.data.results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url); // Fetch individual Pokémon data to get types
        return {
          ...pokemon,
          types: res.data.types,
        };
      })
    );
  } catch (err) {
    error = 'Failed to fetch Pokémon data.';
  }

  if (!resultsWithTypes.length && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Pass the fetched data to the client-side component
  return <PokemonSearch resultsWithTypes={resultsWithTypes} types={types} />;
}
