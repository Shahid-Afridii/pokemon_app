import axios from 'axios';
import PokemonSearch from './components/PokemonSearch'; // Import the client component


export default async function Home() {
  let resultsWithTypes = [];
  let types = [];
  let error = null;

  
  try {
    const [pokemonRes, typesRes] = await Promise.all([
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=150'),
      axios.get('https://pokeapi.co/api/v2/type')
    ]);

    types = typesRes.data.results; 

    
    resultsWithTypes = await Promise.all(
      pokemonRes.data.results.map(async (pokemon) => {
        const res = await axios.get(pokemon.url); 
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

  
  return <PokemonSearch resultsWithTypes={resultsWithTypes} types={types} />;
}
