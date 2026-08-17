"use client";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import AutoComplete from './modules/autocomplete';
import AutoresPorLetra from "./modules/searchPoetas";
import Login from "./modules/login";
import { ClickAwayListener } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// Importa tu acción de Redux (ajusta la ruta del import según tu proyecto)
import { setOpen, setActiveButton } from "@/lib/store/searchSlice"; 

export default function NavActions() {
  const dispatch = useDispatch();
  const params = useParams();

  // Obtenemos open, activeBtn, selectedTema y query directamente de Redux
  const { open, activeBtn, selectedTema, query } = useSelector((state) => state.search);

  const handleClick = (btnId) => {
    // Si intentamos cerrar el buscador (clic en "search" estando activo) y se cumple la regla de protección
    if (open && activeBtn === "search" && btnId === "search" && selectedTema && !query.trim()) {
      return; 
    }

    // Si la capa está abierta Y el botón clicado es el mismo, cerramos
    if (open && activeBtn === btnId) {
      dispatch(setOpen(false));
      dispatch(setActiveButton(null));
    } else {
      dispatch(setOpen(true));
      dispatch(setActiveButton(btnId));
    }
  };

  const reset = () => {
    // REGLA DE PROTECCIÓN AL HACER CLIC FUERA
    if (open && activeBtn === "search" && selectedTema && !query.trim()) {
      return;
    }
    dispatch(setOpen(false));
    dispatch(setActiveButton(null));
  };

  useEffect(() => {
    reset();
  }, [params]);

  return (
    <ClickAwayListener onClickAway={reset}>
      <div className={'relative ms-auto'}>
        <nav id={"OrfeoActions"}>
          <Button onClick={() => handleClick("door")} 
            className={`min-w-0 p-2 border-2 transition-all duration-300 ${
              activeBtn === "door" 
                ? "!border-onyx !text-onyx !bg-white" 
                : "!border-transparent !text-gold !bg-marble"
            }`}>
            <img src={'/img/icons/soplo.svg'} style={{width:50}}/>
          </Button>
          
          <Button onClick={() => handleClick("search")} className={`min-w-0 p-2 border-2 transition-all duration-300 ${
              activeBtn === "search" 
                ? "!border-onyx !text-onyx !bg-white" 
                : "!border-transparent !text-gold !bg-marble"
            }`}>
             <img src={'/img/icons/lira.svg'} style={{width:50}}/>
          </Button>
          
          <Button onClick={() => handleClick("list")} className={`min-w-0 p-2 min-h-[70px] border-2 transition-all duration-300 ${
              activeBtn === "list" 
                ? "!border-onyx !text-onyx !bg-white" 
                : "!border-transparent !text-gold !bg-marble"
            }`}>
            <img src={`/img/icons/puerta_${activeBtn==='list'?'abierta':'cerrada'}.svg`} style={{width:50}}/>
          </Button>
        </nav>

        {open && (
          <nav className={'shadow-lg bg-white fixed min-h-[10vh] left-0 w-full top-[69px]'}>
            {activeBtn === 'search' ? <AutoComplete /> : null}
            {activeBtn === 'door' ? <AutoresPorLetra /> : null}
                {activeBtn === 'list' ? <Login /> : null}
          </nav>
        )}
      </div>
    </ClickAwayListener>
  );
}