import { useState, useEffect } from 'react';
import Link from 'next/link';
import obtenerColorEmocionalPersonalizado from '@/components/functions/poemColor';

export default function AutoresPorLetra() {
  const [letraSeleccionada, setLetraSeleccionada] = useState('A');
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Abecedario clásico en español
  const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  // Manejo de búsqueda por letra o por texto libre del input
  useEffect(() => {
    const fetchAutores = async () => {
      // Si no hay ni letra ni texto en el input, limpiamos los autores y salimos
      if (!letraSeleccionada && !busquedaTexto.trim()) {
        setAutores([]);
        return;
      }

      setLoading(true);
      try {
        // Determinamos el query string a enviar a la API
        const queryVal = letraSeleccionada || busquedaTexto;
        const host = await fetch('/api/getURL');
        const { orfeoApiUrl } = await host.json();
        const res = await fetch(`${orfeoApiUrl}/poeta/search?q=${encodeURIComponent(queryVal)}`);
        const data = await res.json();
        
        // Si se seleccionó una letra, filtramos estrictamente por los que comiencen con ella
        if (letraSeleccionada) {
          const filtrados = data.filter(autor => 
            autor.nombre.toUpperCase().startsWith(letraSeleccionada)
          );
          setAutores(filtrados);
        } else {
          // Si es por texto libre del input, mostramos los resultados que traiga la API directamente
          setAutores(data);
        }
      } catch (err) {
        console.error("Error al buscar autores:", err);
      } finally {
        setLoading(false);
      }
    };

    // Un pequeño debounce opcional o ejecución directa
    const timeoutId = setTimeout(fetchAutores, 300);
    return () => clearTimeout(timeoutId);
  }, [letraSeleccionada, busquedaTexto]);

  // Al hacer clic en una letra, limpiamos el input de texto y asignamos la letra
  const handleSelectLetra = (letra) => {
    setBusquedaTexto('');
    setLetraSeleccionada(letra);
  };

  // Al escribir en el input, limpiamos la letra seleccionada
  const handleInputChange = (e) => {
    setLetraSeleccionada(null);
    setBusquedaTexto(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-2xl font-bold text-center mb-6 font-serif">Índice de Autores</h2>
      
      {/* Input de búsqueda por texto */}
      <div className="max-w-md mx-auto mb-6">
        <input 
          type="text"
          value={busquedaTexto}
          onChange={handleInputChange}
          placeholder="Buscar autor por nombre..."
          className="w-full px-4 py-2 border border-gold/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-gold/5 text-onyx"
        />
      </div>

      {/* Barra del abecedario */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-8">
        {abecedario.map((letra) => {
          const isActive = letraSeleccionada === letra;
          return (
            <button
              key={letra}
              onClick={() => handleSelectLetra(letra)}
              className={`w-9 h-9 rounded-md font-bold transition-all duration-200 text-sm md:text-base ${
                isActive 
                  ? 'bg-gold text-white shadow-md scale-105' 
                  : 'bg-gray-100 hover:bg-gold/20 text-onyx'
              }`}
            >
              {letra}
            </button>
          );
        })}
      </div>

      {/* Resultados de la búsqueda */}
      <div>
        {loading && (
          <p className="text-center text-gray-500 py-6">Buscando autores...</p>
        )}

        {!loading && (letraSeleccionada || busquedaTexto) && autores.length === 0 && (
          <p className="text-center text-gray-500 py-6">No se encontraron autores.</p>
        )}

        {!loading && autores.length > 0 && (
          <div 
            className="flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 sm:pb-0 scrollbar-thin scrollbar-thumb-gold/30 items-stretch"
            style={{ maxHeight: 'none' }}
          >
            {autores.map((autor) => (
              <Link 
                key={autor.id} 
                href={`/poetas/${autor.id}`}
                className="border border-gold/30 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gold/5 flex flex-col items-center text-center gap-3 flex-shrink-0 sm:flex-shrink w-[40vw] sm:w-auto snap-start relative"
              >
                {/* Indicador de color emocional (absoluto en la esquina superior izquierda o integrado) */}
                <span 
                  className="absolute top-3 left-3 w-3 h-3 rounded-full" 
                  style={{ backgroundColor: obtenerColorEmocionalPersonalizado(autor.media_eco, autor.media_transgresion, autor.media_katarsis) }}
                />

                {autor.imagen_url && (
                  <img 
                    src={autor.imagen_url} 
                    alt={autor.nombre} 
                    className="w-16 h-16 rounded-full object-cover border border-gold mt-2" 
                  />
                )}
                
                <div className="w-full">
                  <h3 className="font-bold text-onyx font-serif text-sm sm:text-base line-clamp-2">{autor.nombre}</h3>
                  {autor.nombre_pais && (
                    <span className="text-xs text-gray-600 block mt-1">{autor.nombre_pais}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}