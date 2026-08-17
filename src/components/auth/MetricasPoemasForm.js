'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Button, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const MetricasPoemaForm = ({ valoresIniciales, onGuardar }) => {
  const pathname = usePathname();
  const {data:session} =useSession();
  
  const match = pathname?.match(/\/poema\/([^\/]+)/);
  const isEnPoema = Boolean(match);
  const poemaId = match ? match[1] : null;

  const [poemaInfo, setPoemaInfo] = useState({ titulo: '', autor: '' });
  const [metricas, setMetricas] = useState({
    eco: 0,
    transgresion: 0,
    katarsis: 0,
  });

  useEffect(() => {
    if (isEnPoema && poemaId) {
      const urlPeticion = `/api/poema/${poemaId}/info`;
      fetch(urlPeticion)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setPoemaInfo({
            titulo: data.titulo_poema || '',
            autor: data.autor_nombre || '',
          });
        })
        .catch((err) => console.error('🔥 Error en el fetch del cliente:', err));
    } else {
      setPoemaInfo({ titulo: '', autor: '' });
    }
  }, [isEnPoema, poemaId, pathname]);

  useEffect(() => {
    if (valoresIniciales) {
      setMetricas({
        eco: valoresIniciales.eco || 0,
        transgresion: valoresIniciales.transgresion || 0,
        katarsis: valoresIniciales.katarsis || 0,
      });
    }
  }, [valoresIniciales]);

  // Manejador para el Slider
  const handleSliderChange = (prop) => (event, newValue) => {
    if (!isEnPoema) return;
    setMetricas({ ...metricas, [prop]: newValue });
  };

  // Manejador para el TextField (permite escribir números de 0 a 100)
  const handleInputChange = (prop) => (event) => {
    if (!isEnPoema) return;
    const value = event.target.value;
    
    // Permitir borrar el campo temporalmente
    if (value === '') {
      setMetricas({ ...metricas, [prop]: '' });
      return;
    }

    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setMetricas({ ...metricas, [prop]: numValue });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (isEnPoema && poemaId) {
    try {
      const response = await fetch(`/api/poema/${poemaId}/metricas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eco: Number(metricas.eco) || 0,
          transgresion: Number(metricas.transgresion) || 0,
          katarsis: Number(metricas.katarsis) || 0,
          userId: session?.user?.id || session?.user?.email, // Mandamos el identificador del usuario
        }),
      });

      if (!response.ok) throw new Error('Error al guardar');
      
      const resultado = await response.json();
      console.log("✅ Percepción guardada correctamente:", resultado);
      
    } catch (error) {
      console.error("🔥 Error al enviar la percepción:", error);
    }
  }
};

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      className={`w-full max-w-md p-6 rounded-lg shadow-sm transition-opacity bg-marble ${!isEnPoema ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >

      {isEnPoema && poemaInfo.titulo && (
        <div className="mb-4">
          <Typography variant="subtitle1" className="font-serif italic text-gold">
            &ldquo;{poemaInfo.titulo}&rdquo;
          </Typography>
          {poemaInfo.autor && (
            <Typography variant="body2" className="text-aegean">
              de {poemaInfo.autor}
            </Typography>
          )}
        </div>
      )}

      {!isEnPoema && (
        <Typography variant="body2" className="text-gray-500 mb-4">
          Selecciona un poema para calificar
        </Typography>
      )}

      {/* BLOQUE ECO */}
      <Box className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <Typography variant="body2" className="text-onyx font-medium">
            Eco:
          </Typography>
          <TextField
            type="number"
            value={metricas.eco}
            onChange={handleInputChange('eco')}
            disabled={!isEnPoema}
            size="small"
            inputProps={{ min: 0, max: 100, style: { textAlign: 'center', padding: '4px 8px' } }}
            sx={{ width: '70px' }}
          />
        </div>
        <Slider
          value={typeof metricas.eco === 'number' ? metricas.eco : 0}
          onChange={handleSliderChange('eco')}
          disabled={!isEnPoema}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            color: 'var(--orfeo-eco)',
            '& .MuiSlider-thumb': { backgroundColor: 'var(--orfeo-eco)' },
          }}
        />
      </Box>

      {/* BLOQUE TRANSGRESIÓN */}
      <Box className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <Typography variant="body2" className="text-onyx font-medium">
            Transgresión:
          </Typography>
          <TextField
            type="number"
            value={metricas.transgresion}
            onChange={handleInputChange('transgresion')}
            disabled={!isEnPoema}
            size="small"
            inputProps={{ min: 0, max: 100, style: { textAlign: 'center', padding: '4px 8px' } }}
            sx={{ width: '70px' }}
          />
        </div>
        <Slider
          value={typeof metricas.transgresion === 'number' ? metricas.transgresion : 0}
          onChange={handleSliderChange('transgresion')}
          disabled={!isEnPoema}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            color: 'var(--orfeo-transgresion)',
            '& .MuiSlider-thumb': { backgroundColor: 'var(--orfeo-transgresion)' },
          }}
        />
      </Box>

      {/* BLOQUE KATARSIS */}
      <Box className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <Typography variant="body2" className="text-onyx font-medium">
            Katarsis (Kaos):
          </Typography>
          <TextField
            type="number"
            value={metricas.katarsis}
            onChange={handleInputChange('katarsis')}
            disabled={!isEnPoema}
            size="small"
            inputProps={{ min: 0, max: 100, style: { textAlign: 'center', padding: '4px 8px' } }}
            sx={{ width: '70px' }}
          />
        </div>
        <Slider
          value={typeof metricas.katarsis === 'number' ? metricas.katarsis : 0}
          onChange={handleSliderChange('katarsis')}
          disabled={!isEnPoema}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            color: 'var(--orfeo-katarsis)',
            '& .MuiSlider-thumb': { backgroundColor: 'var(--orfeo-katarsis)' },
          }}
        />
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
        disabled={!isEnPoema}
        sx={{ 
          backgroundColor: 'var(--color-gold)', 
          fontFamily: 'serif',
          textTransform: 'none',
          '&:hover': { backgroundColor: 'var(--terracotta)' } 
        }}
      >
        Guardar Percepción
      </Button>
    </Box>
  );
};

export default MetricasPoemaForm;