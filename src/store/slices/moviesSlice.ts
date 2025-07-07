import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
const API_TOKEN_KINOPOISK = '4ff407cd-7125-4ca1-abcd-0686523ed773';
const API_URL_KINOPOISK = 'https://kinopoiskapiunofficial.tech/api/v2.2';
// Типы
export interface Movie {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: Array<{ country: string }>;
  genres: Array<{ genre: string }>;
  ratingKinopoisk: number;
  ratingImdb: number | null;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  description: string | null;
}

export interface MoviesResponse {
  items: Movie[];
  total: number;
  totalPages: number;
  page: number;
}

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  hasNextPage: boolean;
  currentElement: Movie | null;
}

const initialState: MoviesState = {
  movies: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
  hasNextPage: false,
  currentElement: null,
};

// Асинхронные действия
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL_KINOPOISK}/films?order=RATING&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Ошибка при загрузке фильмов');
      }

      const data: MoviesResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Неизвестная ошибка',
      );
    }
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: state => {
      state.movies = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.error = null;
      state.currentElement = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentElement: (state, action: PayloadAction<Movie>) => {
      state.currentElement = action.payload;
    },

  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        if (state.currentPage === 1) {
          state.isLoading = true;
        }

        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        console.log(action.payload, 'action.payload');
        state.isLoading = false;
        if (action.payload.page === 1) {
          // Первая страница - заменяем фильмы
          state.movies = action.payload.items;
        } else {
          // Следующие страницы - добавляем к существующим
          state.movies = [...state.movies, ...action.payload.items];
        }
        state.currentPage += 1;

        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.page < action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovies, setCurrentPage, setCurrentElement } = moviesSlice.actions;
export default moviesSlice.reducer;
