
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

          {/* Información adicional */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Rápido</h3>
              <p className="text-white/80">Búsquedas instantáneas con información actualizada</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Completo</h3>
              <p className="text-white/80">Información detallada de todos los Pokémon</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Preciso</h3>
              <p className="text-white/80">Datos verificados y actualizados regularmente</p>
            </div>
          </div>
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
