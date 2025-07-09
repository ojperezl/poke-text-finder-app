import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemonName.trim()) {
      setIsLoading(true);
      setWebhookResponse(''); // Limpiar respuesta anterior
      console.log('Enviando Pokemon al webhook:', pokemonName);
      
      try {
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

      {/* Información adicional - Estadísticas Base */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
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
