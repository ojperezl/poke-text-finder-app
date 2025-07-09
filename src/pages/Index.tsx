
import React from 'react';
import PokemonSearch from '@/components/PokemonSearch';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-red-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          {/* Logo/Título */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Pokédex
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-4"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-2">
              Descripciones de Pokémon
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Descubre información detallada sobre tus Pokémon favoritos. 
              Simplemente escribe el nombre y explora su mundo.
            </p>
          </div>

          {/* Componente de búsqueda */}
          <PokemonSearch />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white/60 text-sm">
          © 2024 Pokédex - Descripciones de Pokémon
        </p>
      </div>
    </div>
  );
};

export default Index;
