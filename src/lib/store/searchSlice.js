// lib/store/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPoemas = createAsyncThunk(
  'search/fetchPoemas',
  async ({ page, query, tema }, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * 20;
      const host=  await fetch('/api/getURL')
      const { orfeoApiUrl } = await host.json();
      let url = `${orfeoApiUrl}/poema/search?limit=20&offset=${offset}`;
      if (query) url += `&q=${encodeURIComponent(query)}`;
      if (tema) url += `&tema=${encodeURIComponent(tema)}`;

      const response = await fetch(url);
      const data = await response.json();
      
      return {
        data: Array.isArray(data.data) ? data.data : [],
        totalItems: data.meta?.totalItems ?? null,
        isNewSearch: page === 1
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    selectedTema: null,
    options: [],
    totalCount: 0,
    loading: false,
    open: false,
    activeBtn: null,
    page: 1,
    hasMore: true,
    sortBy: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      if (!action.payload && !state.selectedTema) {
        state.options = [];
        state.totalCount = 0;
      }
    },
    setSelectedTema: (state, action) => {
      // Si pulsa el mismo tema, lo deselecciona (se vuelve null); si es distinto, lo selecciona
      const isSameTema = state.selectedTema === action.payload;
      state.selectedTema = isSameTema ? null : action.payload;
      state.page = 1;
      
      // 💡 Solo abrimos y activamos si se HA SELECCIONADO un tema (no si se ha deseleccionado)
      if (state.selectedTema) {
        state.open = true;
        state.activeBtn = 'search';
      }
    },
    setOpen: (state, action) => {
      state.open = action.payload;
      if (!action.payload) {
        state.activeBtn = null;
      }
    },
    setActiveButton: (state, action) => {
      state.activeBtn = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.selectedTema = null;
      state.options = [];
      state.totalCount = 0;
      state.page = 1;
      state.open = false;
      state.activeBtn = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoemas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPoemas.fulfilled, (state, action) => {
        state.loading = false;
        const { data, totalItems, isNewSearch } = action.payload;

        if (isNewSearch) {
          state.options = data;
          state.totalCount = totalItems !== null ? totalItems : data.length;
        } else {
          state.options = [...state.options, ...data];
          if (totalItems !== null) {
            state.totalCount = totalItems;
          } else {
            state.totalCount = state.options.length;
          }
        }

        state.hasMore = data.length === 20;
        state.open = true;
        state.activeBtn = 'search';
      })
      .addCase(fetchPoemas.rejected, (state) => {
        state.loading = false;
        console.error("🔥 Error capturado en fetchPoemas:", action.payload || action.error);
      });
  },
});

export const { 
  setQuery, 
  setSelectedTema, 
  setOpen, 
  setActiveButton, 
  setPage, 
  setSortBy, 
  clearSearch 
} = searchSlice.actions;

export default searchSlice.reducer;