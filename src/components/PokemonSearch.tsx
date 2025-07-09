
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState('');
  const [pokemonData, setPokemonData] = useState<any>(null);

  const fetchPokemonData = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
    return null;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemonName.trim()) {
      setIsLoading(true);
      setWebhookResponse('');
      setPokemonData(null);
      console.log('Enviando Pokemon al webhook:', pokemonName);
      
      try {
        // Fetch Pokemon data from PokeAPI
        const pokemonInfo = await fetchPokemonData(pokemonName.trim());
        if (pokemonInfo) {
          setPokemonData(pokemonInfo);
        }

        const response = await fetch('http://localhost:5678/webhook/bf09fd43-9a01-4d9d-a91a-57330c158cfa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pokemon: pokemonName.trim()
          })
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Pokemon enviado exitosamente al webhook');
          console.log('Respuesta del webhook:', jsonResponse);
          
          // Extraer solo el texto legible de la respuesta
          const readableText = jsonResponse.response || 'No se recibió respuesta del servidor';
          setWebhookResponse(readableText);
        } else {
          console.error('Error al enviar Pokemon al webhook:', response.status);
          setWebhookResponse(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error de conexión con el webhook:', error);
        setWebhookResponse(`Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      electric: 'bg-yellow-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      poison: 'bg-purple-500',
      flying: 'bg-indigo-400',
      bug: 'bg-green-400',
      normal: 'bg-gray-400',
      ground: 'bg-yellow-600',
      fairy: 'bg-pink-400',
      fighting: 'bg-red-700',
      psychic: 'bg-pink-500',
      rock: 'bg-yellow-800',
      steel: 'bg-gray-500',
      ice: 'bg-blue-300',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800'
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="max-w-md mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Escribe el nombre de un Pokémon..."
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-2 border-white/20 bg-white/90 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? 'Enviando...' : 'Buscar Pokémon'}
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
                disabled={isLoading}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Información del Pokémon */}
      {pokemonData && (
        <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold capitalize mb-2">{pokemonData.name}</h2>
            <p className="text-lg opacity-80">#{pokemonData.id.toString().padStart(3, '0')}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-6">
              <img 
                src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-3">Tipos</h3>
            <div className="flex justify-center gap-2">
              {pokemonData.types.map((typeInfo: any) => (
                <span
                  key={typeInfo.type.name}
                  className={`px-4 py-2 rounded-full text-white font-medium ${getTypeColor(typeInfo.type.name)}`}
                >
                  {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-200/20 rounded-xl p-4 text-center">
              <h4 className="text-sm opacity-80 mb-1">Altura</h4>
              <p className="text-2xl font-bold">{(pokemonData.height / 10).toFixed(1)} m</p>
            </div>
            <div className="bg-green-200/20 rounded-xl p-4 text-center">
              <h4 className="text-sm opacity-80 mb-1">Peso</h4>
              <p className="text-2xl font-bold">{(pokemonData.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {pokemonData.abilities.map((abilityInfo: any, index: number) => (
                <span
                  key={abilityInfo.ability.name}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-gray-800 text-white' : 'bg-white/20 text-white'
                  }`}
                >
                  {abilityInfo.ability.name.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  {abilityInfo.is_hidden && ' (Oculta)'}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Estadísticas Base</h3>
            <div className="space-y-3">
              {pokemonData.stats.map((stat: any) => {
                const statNames: { [key: string]: string } = {
                  'hp': 'HP',
                  'attack': 'Ataque',
                  'defense': 'Defensa',
                  'special-attack': 'Ataque Esp.',
                  'special-defense': 'Defensa Esp.',
                  'speed': 'Velocidad'
                };
                const percentage = (stat.base_stat / 255) * 100;
                
                return (
                  <div key={stat.stat.name} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">
                      {statNames[stat.stat.name] || stat.stat.name}
                    </div>
                    <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm font-bold text-right">
                      {stat.base_stat}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Caja de respuesta del webhook */}
      {webhookResponse && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Descripción del Pokémon</h3>
          <Textarea
            value={webhookResponse}
            readOnly
            className="w-full min-h-[200px] bg-white/90 text-gray-800 resize-none"
            placeholder="La respuesta del webhook aparecerá aquí..."
          />
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
