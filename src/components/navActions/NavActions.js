'use client';

import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import AutoComplete from './modules/autocomplete';
import AutoresPorLetra from "./modules/searchPoetas";
import Login from "./modules/login";
import { ClickAwayListener } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpen, setActiveButton } from "@/lib/store/searchSlice"; 

export default function NavActions() {
  const dispatch = useDispatch();
  const params = useParams();

  const { open, activeBtn, selectedTema, query } = useSelector((state) => state.search);

  const handleClick = (btnId) => {
    if (open && activeBtn === "search" && btnId === "search" && selectedTema && !query.trim()) {
      return; 
    }

    if (open && activeBtn === btnId) {
      dispatch(setOpen(false));
      dispatch(setActiveButton(null));
    } else {
      dispatch(setOpen(true));
      dispatch(setActiveButton(btnId));
    }
  };

  const reset = () => {
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
        {/* Contenedor de botones adaptado a móvil */}
        <nav id={"OrfeoActions"} className="flex items-center gap-1 sm:gap-2">
          <Button onClick={() => handleClick("door")} 
            className={`min-w-0 p-1.5 sm:p-2 border-2 transition-all duration-300 ${
              activeBtn === "door" 
                ? "!border-onyx !text-onyx !bg-white" 
                : "!border-transparent !text-gold !bg-marble"
            }`}>
            <img src={'/img/icons/soplo.svg'} className="w-8 sm:w-[50px] h-auto" alt="Soplo" />
          </Button>
          
          <Button onClick={() => handleClick("search")} className={`min-w-0 p-1.5 sm:p-2 border-2 transition-all duration-300 ${
            activeBtn === "search" 
              ? "!border-onyx !text-onyx !bg-white" 
              : "!border-transparent !text-gold !bg-marble"
            }`}>
             <img src={'/img/icons/lira.svg'} className="w-8 sm:w-[50px] h-auto" alt="Lira" />
          </Button>
          
          <Button onClick={() => handleClick("list")} className={`min-w-0 p-1.5 sm:p-2 min-h-[auto] sm:min-h-[70px] border-2 transition-all duration-300 ${
            activeBtn === "list" 
              ? "!border-onyx !text-onyx !bg-white" 
              : "!border-transparent !text-gold !bg-marble"
            }`}>
            <img src={`/img/icons/puerta_${activeBtn==='list'?'abierta':'cerrada'}.svg`} className="w-8 sm:w-[50px] h-auto" alt="Puerta" />
          </Button>
        </nav>

        {/* Panel desplegable */}
        {open && (
          <nav className={'shadow-lg bg-white fixed min-h-[80vh] md:min-h-[50vh] max-h-[80vh] overflow-y-auto left-0 w-full top-[var(--height-header,69px)] px-4 py-4 z-50'}>
            
            {/* Contenedor superior exclusivo para móvil que alinea el botón a la derecha */}
            <div className="md:hidden flex justify-end mb-2">
              <Button 
                onClick={reset}
                className="min-w-0 p-2 text-onyx bg-marble rounded-full shadow z-10"
                aria-label="Cerrar menú"
              >
                 <span className="ph ph-x text-xl"/>
              </Button>
            </div>

            {activeBtn === 'search' ? <AutoComplete /> : null}
            {activeBtn === 'door' ? <AutoresPorLetra /> : null}
            {activeBtn === 'list' ? <Login /> : null}
          </nav>
        )}
      </div>
    </ClickAwayListener>
  );
}