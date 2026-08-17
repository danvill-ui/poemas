"use client";
import { Chip } from "@mui/material";
import useTermIcon from "@/components/setIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTema, setOpen, fetchPoemas } from "@/lib/store/searchSlice";

export default function PoemChips({ temas }) {
  const dispatch = useDispatch();
  const { query, selectedTema } = useSelector((state) => state.search);

  if (!temas?.length) return null;

  const handleChipClick = (e, el) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Si ya estaba seleccionado, lo deselecciona; si no, lo marca de forma exclusiva
    const nuevoTema = selectedTema === el ? null : el;
    
    // 1. Abre el buscador de la cabecera de inmediato
    dispatch(setOpen(true));
    
    // 2. Actualiza el tema activo en el store global
    dispatch(setSelectedTema(nuevoTema));
    
    // 3. Lanza la búsqueda con el nuevo filtro
    dispatch(fetchPoemas({ page: 1, query, tema: nuevoTema }));
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-full  gap-2">
      {/* Primer tema clave (con su icono correspondiente) */}
      <Chip 
        onClick={(e) => handleChipClick(e, temas[0])}
        icon={<span className={`${useTermIcon(temas[0])} text-lg !text-white`} />}
        onDelete={selectedTema === temas[0] ? (e) => handleChipClick(e, temas[0]) : undefined}
        deleteIcon={<span className="ph ph-x text-white text-sm" />}
        className={`!text-white !cursor-pointer ${selectedTema === temas[0] ? '!bg-gold font-bold' : '!bg-aegean'}`} 
        label={temas[0]} 
      />
      
      {/* Resto de temas clave secundarios */}
      {temas.slice(1).map((el, index) => {
        const isSelected = selectedTema === el;
        return (
          <Chip 
            key={index}
            icon={<span className={`${useTermIcon(el)} text-lg !text-white`} />}
            onClick={(e) => handleChipClick(e, el)}
            onDelete={isSelected ? (e) => handleChipClick(e, el) : undefined}
            deleteIcon={<span className="ph ph-x text-sm" />}
            className={`cursor-pointer ${isSelected ? '!bg-gold !text-white font-bold border border-gold' : '!text-white fw-semibold !bg-aegean'}`} 
            label={el} 
          />
        );
      })}
    </div>
  );
}