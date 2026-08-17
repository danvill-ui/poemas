// lib/store/Slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  poema: null,
  loading: false,
  error: null
};

const poemaSlice = createSlice({
  name: 'poema',
  initialState,
  reducers: {
    setPoemaLoading(state, action) {
      state.loading = action.payload; // true o false según corresponda
      if (action.payload) {
        state.error = null; // Limpiamos errores previos al iniciar un nuevo cargado
      }
    },
    setPoema(state, action) {
      state.poema = action.payload; // guarda el JSON completo
      state.loading = false;
      state.error = null;
    },
    setPoemaError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearPoema(state) {
      state.poema = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setPoemaLoading, setPoema, setPoemaError, clearPoema } = poemaSlice.actions;
export default poemaSlice.reducer;