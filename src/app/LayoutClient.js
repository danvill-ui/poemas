'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { SessionProvider } from 'next-auth/react'; // 1. Importar el SessionProvider
import Link from "next/link";
import NavActions from '@/components/navActions/NavActions';
import AuthAside from '@/components/auth/AuthAside'

// Definimos el tema fuera del componente para evitar recrearlo en cada render
const theme = createTheme({
  palette: {
    primary: {
      main: '#B89D66', // Gold
      contrastText: '#F2EFE9', // Marble
    },
    secondary: {
      main: '#1C1C1C', // Onyx
    },
    background: {
      default: '#F2EFE9', // Marble
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1C', // Onyx
      secondary: '#B89D66', // Gold
    },
  },
});

export default function LayoutClient({ children }) {
  return (
    // 2. Envolver la aplicación con el SessionProvider
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <header className="shadow-lg bg-marble fixed top-0 w-full z-[200] text-primary" style={{height:'var(--height-header)'}} >
            <div className="container flex items-center">
              <Link href={'/'}>
                <h1 className="flex-grow-0 font-serif uppercase text-xl text-onyx text-center fw-bold tracking-wider">
                  <img src={'/img/logo.svg'} style={{height:50}} alt="Logo" />
                </h1>
              </Link>
              <NavActions />
            </div>
          </header>

          <main 
            className="flex justify-start flex-col flex-1 relative mt-[var(--height-header)] z-[1]" 
          
          >
            <AuthAside/>
            
            {children}
          </main>

          <footer className="bg-onyx text-white text-center text-sm py-3">
            <small>Proyecto Creado por Daniel Villagrán</small>
          </footer>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}