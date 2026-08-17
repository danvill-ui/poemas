// lib/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import poemaReducer from './Slice';
import palabraReducer from './palabraSlice';
import searchReducer from './searchSlice'; // 👈 1. Importa el reducer del buscador (ajusta la ruta si es necesario)

export const store = configureStore({
  reducer: {
    poema: poemaReducer,   // estado para poema
    palabra: palabraReducer, // estado para palabra
    search: searchReducer  // 👈 2. Añade el estado para la búsqueda
  }
});