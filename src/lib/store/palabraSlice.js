




// lib/store/palabraSlice.js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// 1. Definir el adaptador
const palabraAdapter = createEntityAdapter({
  selectId: (palabra) => palabra.normalizado, // cómo identificar cada entidad
  sortComparer: (a, b) => a.normalizado.localeCompare(b.normalizado), // orden opcional
});

// 2. Estado inicial
const initialState = palabraAdapter.getInitialState();

// 3. Slice con reducers generados automáticamente
const palabraSlice = createSlice({
  name: 'palabra',
  initialState,
  reducers: {
    addPalabra: palabraAdapter.addOne,
    attachMany: palabraAdapter.addMany,
    updatePalabra: palabraAdapter.updateOne,
    removePalabra: palabraAdapter.removeOne,
    clearPalabras: palabraAdapter.removeAll,
     // 👇 Nuevo reducer para actualizar el campo `rae`
    setDataRae: (state, action) => {
      const { normalizado, rae } = action.payload;
      palabraAdapter.updateOne(state, {
        id: normalizado,
        changes: { rae },
      });
    },
  },
});

// 4. Exportar acciones y reducer
export const {
  addPalabra,
  attachMany,
  updatePalabra,
  removePalabra,
  clearPalabras,
  setDataRae
} = palabraSlice.actions;

export default palabraSlice.reducer;

// 5. Selectores para acceder a los datos
export const {
  selectAll: selectAllPalabras,
  selectById: selectPalabraById,
  selectIds: selectPalabraIds,
} = palabraAdapter.getSelectors((state) => state.palabra);
