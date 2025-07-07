import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем определенные пути для сериализации
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['some.path.to.ignore'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;