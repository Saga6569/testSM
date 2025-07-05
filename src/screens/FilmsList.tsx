import React from 'react';
import { View, Text } from 'react-native';

import { Movie, fetchMovies } from '../api';
import { useState, useEffect } from 'react';
import RenderItemsList from './RenderItemsList';

const FilmsList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies(page, 'FILM')
      .then(data => {
        setMovies(data.items);
        setPage(page + 1);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
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
        data={movies}
        isLoading={isLoading}
        error={error}
        fetchNextPage={() => {
          fetchMovies(page, 'FILM')
            .then(data => {
              setMovies([...movies, ...data.items]);
              setPage(page + 1);
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
        }}
      />
    </View>
  );
};

export default FilmsList;
