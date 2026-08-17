import { useSession } from "next-auth/react";
import { Drawer, Chip, ClickAwayListener,Button } from "@mui/material";
import { useState } from "react";
import MetricasPoemaForm from "./MetricasPoemasForm";

export default function AuthAside() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // Si no hay sesión o no hay autor, no pintamos nada
  if (!session?.user?.autor) {
    return null;
  }

  return (
    <>
      { !open ? <div 
          style={{
            position: 'fixed',
            top: 'calc(var(--header-height, 64px)+30)',
            left: '0px',
            zIndex: 1300 // Por encima de la mayoría de elementos pero debajo de los modales de MUI
          }}
        >
          <Button 
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ 
              backgroundColor: 'var(--color-gold)', 
              fontFamily: 'serif',
              textTransform: 'none',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              boxShadow: 2,
              '&:hover': { backgroundColor: 'var(--terracotta)' } 
            }}
          >
           Orfeo
          </Button>
        </div> : (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Drawer  open={open} onClose={() => setOpen(false)}>
            <div className="p-4 w-64 relative">
            
              Ayuda a Orfeo <span 
  className="ph ph-bold ph-x-circle text-sm ms-auto cursor-pointer text-gray-500 hover:text-onyx transition-colors p-1"
  onClick={() => {
   setOpen(false)
  }}
/>
              <div className="mt-4">
                
<MetricasPoemaForm/>
                 
              </div>
            </div>
          </Drawer> 
        </ClickAwayListener>
      )}
    </>
  );
}