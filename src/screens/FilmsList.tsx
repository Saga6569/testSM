import React from 'react';
import { View, Text } from 'react-native';

import { fetchMovies } from '../store/slices/moviesSlice';
import { useEffect } from 'react';
import RenderItemsList from './RenderItemsList';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const FilmsList = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading, error } = useAppSelector(
    (state: any) => state.movies,
  );

  console.log(movies, 'movies');

  useEffect(() => {
    // Загружаем первую страницу при монтировании компонента
    dispatch(fetchMovies(1));
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-white text-lg">Загрузка...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-red-500 text-lg">Ошибка загрузки</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-700 p-4">
      <RenderItemsList
      />
    </View>
  );
};

export default FilmsList;
