'use client';

import { TextField, InputAdornment, Box, Avatar, Typography, CircularProgress, Chip, Skeleton } from "@mui/material";
import useTermIcon from "@/components/setIcon";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, toggleTema, setSelectedTemas, setOpen, setPage, setSortBy, fetchPoemas } from "@/lib/store/searchSlice";
import { obtenerColorEmocionalOrfeo } from "@/components/Poema/TarjetaPoemaEmocional";

export default function CustomSearchDropdown() {
  const dispatch = useDispatch();
  const { query, selectedTemas, options, totalCount, loading, open, page, hasMore, sortBy } = useSelector((state) => state.search);

  const router = useRouter();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const debounceRef = useRef(null);

  // Autoenfocar el input al montar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 💡 Búsqueda explícita solo cuando cambia la página (Scroll Infinito)
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchPoemas({ page, query, temas: selectedTemas }));
    }
  }, [page, dispatch]);

  const handleChipClick = (e, el) => {
    e.stopPropagation();
    e.preventDefault();
    
    dispatch(toggleTema(el));
    dispatch(setPage(1));
    dispatch(setOpen(true)); 

    // Calculamos de forma inmediata los temas que se enviarán
    const nuevosTemas = selectedTemas.includes(el)
      ? selectedTemas.filter(t => t !== el)
      : [...selectedTemas, el];

    // Búsqueda explícita por cambio de tema
    dispatch(fetchPoemas({ page: 1, query, temas: nuevosTemas }));
  };

  const handleScroll = (e) => {
    const node = e.currentTarget;
    if (
      node.scrollTop + node.clientHeight >= node.scrollHeight - 100 &&
      !loading &&
      hasMore
    ) {
      dispatch(setPage(page + 1));
    }
  };

  const sortedOptions = [...options].sort((a, b) => {
    if (!sortBy) return 0;
    return (b[sortBy] || 0) - (a[sortBy] || 0);
  });

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        dispatch(setOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="container w-full relative" ref={containerRef}>
      
      {selectedTemas.length > 0 && (
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="caption" className="text-gray-500 font-medium">
            Temas activos:
          </Typography>
          {selectedTemas.map((tema) => (
            <Chip 
              key={tema}
              onClick={(e) => handleChipClick(e, tema)}
              onDelete={(e) => handleChipClick(e, tema)}
              deleteIcon={<span className="ph ph-x text-white text-sm" />}
              className="!bg-gold !text-white font-bold cursor-pointer shadow-sm"
              label={tema} 
            />
          ))}
        </Box>
      )}

      <TextField
        inputRef={inputRef}
        variant="outlined"
        placeholder="Encuentra poesía"
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          dispatch(setQuery(val));
          dispatch(setPage(1));
          dispatch(setOpen(true)); 

          // 💡 Debounce manual para evitar llamadas excesivas al escribir en el input
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            if (val.trim() || selectedTemas.length > 0) {
              dispatch(fetchPoemas({ page: 1, query: val, temas: selectedTemas }));
            }
          }, 300);
        }}
        onFocus={() => {
          dispatch(setOpen(true));
        }}
        fullWidth
        InputProps={{
          className: "!font-sans text-onyx border-2 !border-gold rounded-full py-1 px-4 my-3 bg-white",
          endAdornment: (
            <InputAdornment position="end">
              {loading && page === 1 ? <CircularProgress size={20} color="inherit" /> : <span className="ph ph-magnifying-glass text-gold text-2xl" />}
            </InputAdornment>
          ),
        }}
      />

      {open && (
        <Box sx={{ position: 'absolute', left: 0, right: 0, zIndex: 1300, borderRadius: '12px', overflow: 'hidden', boxShadow: 3, backgroundColor: '#ffffff', mt: 0.5 }}>
          <Box sx={{ px: 2, py: 1.5, backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
            <Typography variant="caption" className="font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
              Resultados {selectedTemas.length > 0 && `(${selectedTemas.length} tema${selectedTemas.length > 1 ? 's' : ''})`}
              {loading && <CircularProgress size={12} sx={{ color: '#D4AF37' }} />}
            </Typography>
            <Typography variant="caption" className="font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              {loading && page === 1 ? <CircularProgress size={14} sx={{ color: '#D4AF37' }} /> : `${options.length} / ${totalCount}`}
            </Typography>
          </Box>
          
          <Box ref={scrollContainerRef} onScroll={handleScroll} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {/* Skeletons SOLO si está cargando la primera página */}
            {loading && page === 1 ? (
              <Box sx={{ p: 0 }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box 
                    key={`skeleton-part-${item}`}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      gap: 2, 
                      padding: '12px 16px', 
                      borderBottom: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      pointerEvents: 'none'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, minWidth: 0 }}>
                      <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
                      <Box sx={{ minWidth: 0, width: '100%' }}>
                        <Skeleton variant="text" width="80%" height={24} />
                        <Skeleton variant="text" width="40%" height={16} />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : sortedOptions.length === 0 && !loading ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" className="text-gray-500">No se encontraron versos...</Typography>
              </Box>
            ) : (
              <>
                {sortedOptions.map((option) => (
                  <Box 
                    key={option.poema_id}
                    onClick={() => {
                      if (option.enlace_poema) {
                        dispatch(setOpen(false));
                        router.push(option.enlace_poema);
                      }
                    }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, padding: '12px 16px', borderBottom: '1px solid #e0e0e0', cursor: 'pointer', '&:hover': { backgroundColor: '#f3f4f6' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, minWidth: 0 }}>
                      <Avatar src={option.autor_imagen} alt={option.autor_nombre} sx={{ width: 40, height: 40, flexShrink: 0 }} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body1" className="font-serif truncate">{option.titulo_poema}</Typography>
                        <Typography variant="caption" className="text-gray-500 truncate block">{option.autor_nombre}</Typography>
                      </Box>
                    </Box>

                    <Box className="hidden md:flex ms-auto me-2 content-center">
                      {option?.temas_clave?.length ? (
                        <div className="flex flex-wrap justify-center items-center py-3 gap-2 my-auto">
                          {option.temas_clave.map((el, index) => {
                            const isSelected = selectedTemas.includes(el);
                            return (
                              <Chip 
                                key={index}
                                onClick={(e) => handleChipClick(e, el)}
                                icon={index === 0 ? <span className={`${useTermIcon(el)} text-lg !text-white`} /> : undefined}
                                onDelete={isSelected ? (e) => handleChipClick(e, el) : undefined}
                                deleteIcon={<span className={`ph ph-x text-sm ${isSelected ? 'text-white' : ''}`} />}
                                className={`cursor-pointer ${
                                  isSelected 
                                    ? '!bg-gold !text-white font-bold border border-gold' 
                                    : index === 0 ? '!bg-aegean !text-white' : 'bg-gray-100 text-onyx'
                                }`} 
                                label={el} 
                              />
                            );
                          })}
                        </div>
                      ) : null}
                    </Box>

                    <Box 
                      sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, textAlign: 'center', flexShrink: 0, backgroundColor: obtenerColorEmocionalOrfeo(option.eco, option.transgresion, option.katarsis) }} 
                      className="mx-auto rounded-lg shadow-lg p-4 bg-opacity-60"
                    >
                    </Box>
                  </Box>
                ))}

                {/* Indicador de carga para scroll infinito */}
                {loading && page > 1 && (
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
                    <CircularProgress size={20} sx={{ color: '#D4AF37' }} />
                    <Typography variant="caption" className="text-gray-500 font-medium">
                      Cargando más resultados...
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
}