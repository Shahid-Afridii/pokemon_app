"use client";
import { useState } from 'react';
import Card from './Card'; // Assuming you have a Card component
import { motion } from 'framer-motion'; // Added for animations

// Client-side component for search and filtering
export default function PokemonSearch({ resultsWithTypes, types }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState(resultsWithTypes);

  // Filter Pokémon when the search term or type changes
  const handleSearch = () => {
    const filtered = resultsWithTypes.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        !selectedType || pokemon.types.some((type) => type.type.name === selectedType);

      return matchesName && matchesType;
    });

    setFilteredPokemons(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 capitalize">
     <motion.h1
  className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-wider"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Discover Your Next <span className="text-yellow-500">Pokémon</span> Adventure!
</motion.h1>


      {/* Filter and Search Section */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Type Select Dropdown */}
        <div className="relative w-full md:w-1/3">
          <select
            className="appearance-none border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out bg-gray-50"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option className="capitalize" key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name..."
          className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out placeholder-gray-500 text-gray-900 bg-gray-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Search Button */}
        <button
          className="bg-gray-800 text-white p-3 rounded-md w-full md:w-auto shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
          onClick={handleSearch}
        >
          Search
        </button>
      </motion.div>

      {/* Pokémon Card Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <div className="text-center text-red-500 font-semibold">No Data found.</div>
        )}
      </motion.div>
    </div>
  );
}
