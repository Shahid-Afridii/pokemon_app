
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa'; 
import axios from 'axios';  // Import Axios


export default async function PokemonDetail({ params }) {
  const { name } = params;

  // Fetch Pokémon data using Axios
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = res.data;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 capitalize">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaChevronLeft className="mr-2" />
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{pokemon.name}</span>
      </div>

      {/* Main Container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        
        {/* Pokémon Image Section */}
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-6 md:p-8 flex justify-center rounded-t-lg">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-lg shadow-sm transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="p-6 md:p-8 text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 capitalize mb-4 md:mb-6">
            {pokemon.name}
          </h1>

          {/* Type Information */}
          <p className="text-lg text-gray-700 mb-4 md:mb-6">
            <strong className="font-bold">Type : </strong> 
            {pokemon.types.map((type, index) => (
              <span
                key={type.type.name}
                className={`inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold ml-${index > 0 ? '2' : '0'}`}
              >
                {type.type.name}
              </span>
            ))}
          </p>

          {/* Height, Weight, and Other Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 font-medium">Height</p>
              <p className="text-2xl font-bold text-gray-900">{pokemon.height / 10} m</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 font-medium">Weight</p>
              <p className="text-2xl font-bold text-gray-900">{pokemon.weight / 10} kg</p>
            </div>
          </div>

          {/* Abilities Section */}
          <div className="mb-4 md:mb-6">
            <p className="text-lg text-gray-700 font-medium">Abilities:</p>
            <p className="text-md text-gray-900">
              {pokemon.abilities.map((ability, index) => (
                <span key={ability.ability.name}>
                  {ability.ability.name}
                  {index < pokemon.abilities.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-4 md:mb-6">
            <p className="text-lg text-gray-700 font-medium">Base Stats:</p>
            <div className="grid grid-cols-2 gap-4 text-gray-900">
              {pokemon.stats.map((stat) => (
                <p key={stat.stat.name} className="text-md capitalize">
                  <strong>{stat.stat.name}:</strong> {stat.base_stat}
                </p>
              ))}
            </div>
          </div>

          {/* Moves Section */}
          <div>
            <p className="text-lg text-gray-700 font-medium">Top Moves:</p>
            <p className="text-md text-gray-900">
              {pokemon.moves.slice(0, 6).map((move, index) => (
                <span key={move.move.name}>
                  {move.move.name}
                  {index < pokemon.moves.slice(0, 6).length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
