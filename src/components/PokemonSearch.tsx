
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemonName.trim()) {
      console.log('Buscando Pokemon:', pokemonName);
      // Aquí podrás agregar la lógica de búsqueda más tarde
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Escribe el nombre de un Pokémon..."
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-2 border-white/20 bg-white/90 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 shadow-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
        <Button
          type="submit"
          className="w-full mt-4 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Buscar Pokémon
        </Button>
      </form>
      
      {/* Sugerencias de ejemplo */}
      <div className="mt-6 text-center">
        <p className="text-white/80 text-sm mb-3">Prueba con:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Pikachu', 'Charizard', 'Blastoise', 'Venusaur'].map((name) => (
            <button
              key={name}
              onClick={() => setPokemonName(name)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
