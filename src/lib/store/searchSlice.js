// lib/store/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPoemas = createAsyncThunk(
  'search/fetchPoemas',
  async ({ page, query, temas }, { rejectWithValue, signal }) => {
    try {
      const offset = (page - 1) * 20;
      const host = await fetch('/api/getURL', { signal });
      const { orfeoApiUrl } = await host.json();
      let url = `${orfeoApiUrl}/poema/search?limit=20&offset=${offset}`;
      
      if (query) url += `&q=${encodeURIComponent(query)}`;
      
      if (temas && temas.length > 0) {
        const temasString = Array.isArray(temas) ? temas.join(',') : temas;
        url += `&temas=${encodeURIComponent(temasString)}`;
      }

      // 💡 Pasamos la señal del thunk al fetch para cancelar peticiones pendientes automáticamente
      const response = await fetch(url, { signal });
      const data = await response.json();
      
      return {
        data: Array.isArray(data.data) ? data.data : [],
        totalItems: data.meta?.totalItems ?? null,
        isNewSearch: page === 1
      };
    } catch (error) {
      // Si la petición fue abortada por escribir rápido, la ignoramos de forma limpia
      if (error.name === 'AbortError') {
        return rejectWithValue({ aborted: true });
      }
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    selectedTemas: [],
    options: [],
    totalCount: 0,
    loading: false,
    open: false,
    activeBtn: null,
    page: 1,
    hasMore: true,
    sortBy: null,
    currentRequestId: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.loading = true;
      if (!action.payload && state.selectedTemas.length === 0) {
        state.options = [];
        state.totalCount = 0;
        state.loading = false;
      }
    },
    toggleTema: (state, action) => {
      const tema = action.payload;
      if (state.selectedTemas.includes(tema)) {
        state.selectedTemas = state.selectedTemas.filter(t => t !== tema);
      } else {
        state.selectedTemas.push(tema);
      }
      state.page = 1;
      state.loading = true;

      if (state.selectedTemas.length > 0) {
        state.open = true;
        state.activeBtn = 'search';
      }
    },
    setSelectedTemas: (state, action) => {
      state.selectedTemas = action.payload;
      state.page = 1;
      state.loading = true;
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
      state.loading = true;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.selectedTemas = [];
      state.options = [];
      state.totalCount = 0;
      state.page = 1;
      state.open = false;
      state.activeBtn = null;
      state.loading = false;
      state.currentRequestId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoemas.pending, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchPoemas.fulfilled, (state, action) => {
        if (action.meta.requestId !== state.currentRequestId) {
          return; 
        }

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
      .addCase(fetchPoemas.rejected, (state, action) => {
        // Si el error fue porque se abortó la petición al escribir otra letra, no hacemos nada con el loading
        if (action.payload?.aborted) {
          return;
        }

        if (action.meta.requestId !== state.currentRequestId) {
          return;
        }

        state.loading = false;
        console.error("🔥 Error capturado en fetchPoemas:", action.payload || action.error);
      });
  },
});

export const { 
  setQuery, 
  toggleTema,
  setSelectedTemas, 
  setOpen, 
  setActiveButton, 
  setPage, 
  setSortBy, 
  clearSearch 
} = searchSlice.actions;

export default searchSlice.reducer;