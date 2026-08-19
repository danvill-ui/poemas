"use client";
import { Chip } from "@mui/material";
import useTermIcon from "@/components/setIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleTema, setOpen, fetchPoemas } from "@/lib/store/searchSlice";

export default function PoemChips({ temas }) {
  const dispatch = useDispatch();
  // 💡 Extraemos selectedTemas (array) del store global
  const { query, selectedTemas } = useSelector((state) => state.search);

  if (!temas?.length) return null;

  const handleChipClick = (e, el) => {
    e.stopPropagation();
    e.preventDefault();
    
    // 1. Abre el buscador de la cabecera de inmediato
    dispatch(setOpen(true));
    
    // 2. Alterna el tema (lo añade o lo quita del array de forma acumulativa)
    dispatch(toggleTema(el));
    
    // 3. Nota: Como el useEffect reactivo de tu buscador u otros componentes ya escuchan 
    // los cambios en 'selectedTemas', la petición se disparará automáticamente. 
    // Pero si quieres forzarla de inmediato asegurando el valor actualizado:
    const nuevoArrayTemas = selectedTemas.includes(el)
      ? selectedTemas.filter(t => t !== el)
      : [...selectedTemas, el];

    dispatch(fetchPoemas({ page: 1, query, temas: nuevoArrayTemas }));
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-2">
      {/* Primer tema clave (con su icono correspondiente) */}
      {(() => {
        const isSelected = selectedTemas.includes(temas[0]);
        return (
          <Chip 
            onClick={(e) => handleChipClick(e, temas[0])}
            icon={<span className={`${useTermIcon(temas[0])} text-lg !text-white`} />}
            onDelete={isSelected ? (e) => handleChipClick(e, temas[0]) : undefined}
            deleteIcon={<span className="ph ph-x text-white text-sm" />}
            className={`!text-white !cursor-pointer ${isSelected ? '!bg-gold font-bold' : '!bg-aegean'}`} 
            label={temas[0]} 
          />
        );
      })()}
      
      {/* Resto de temas clave secundarios */}
      {temas.slice(1).map((el, index) => {
        const isSelected = selectedTemas.includes(el);
        return (
          <Chip 
            key={index}
            icon={<span className={`${useTermIcon(el)} text-lg !text-white`} />}
            onClick={(e) => handleChipClick(e, el)}
            onDelete={isSelected ? (e) => handleChipClick(e, el) : undefined}
            deleteIcon={<span className="ph ph-x text-sm text-white" />}
            className={`cursor-pointer ${isSelected ? '!bg-gold !text-white font-bold border border-gold' : '!text-white fw-semibold !bg-aegean'}`} 
            label={el} 
          />
        );
      })}
    </div>
  );
}