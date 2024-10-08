"use client";
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';  // Elegant star icon
import { FiArrowRight } from 'react-icons/fi';  // Arrow icon for the link
import { useState } from 'react';
import { motion } from 'framer-motion';  // Framer Motion for animations

export default function PokemonCard({ pokemon, index }) {
  const [imageSrc, setImageSrc] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`
  );

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}  // Scale slightly on hover
      initial={{ opacity: 0, y: 20 }}  // Starting position and opacity
      animate={{ opacity: 1, y: 0 }}  // Animate into view
      transition={{ 
        duration: 0.5,  // Each card animation lasts 0.5 seconds
        ease: 'easeInOut', 
        delay: index * 0.5 // Delay based on index to stagger cards
      }}
    >
      {/* Pokémon Image */}
      <img
        src={imageSrc}
        alt={pokemon.name}
        className="w-32 h-32 mb-4 flex justify-center object-cover"
        onError={() => setImageSrc('https://via.placeholder.com/96')} // Fallback image
      />
      {/* Pokémon Name */}
      <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-700">
        <AiOutlineStar className="mr-2 text-yellow-500" /> {pokemon.name}
      </h3>
      {/* Pokémon Types */}
      <div className="text-sm text-gray-500 mb-4">
        {pokemon.types.map((type) => (
          <span key={type.type.name} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2">
            {type.type.name}
          </span>
        ))}
      </div>
      {/* Details Link */}
      <Link href={`/pokemon/${pokemon.name}`}>
        <span className="text-blue-500 hover:underline flex items-center text-lg">
          Details <FiArrowRight className="ml-2" />
        </span>
      </Link>
    </motion.div>
  );
}
