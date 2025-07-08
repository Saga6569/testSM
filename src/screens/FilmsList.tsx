import React from 'react';
import { View } from 'react-native';

import { clearMovies, fetchMovies } from '../store/slices/moviesSlice';
import { useEffect } from 'react';
import RenderItemsList from '../components/RenderItemsList';
import { useAppDispatch } from '../store/hooks';
import { useThemeClasses } from '../hooks/useThemeClasses';

const FilmsList = () => {
  const dispatch = useAppDispatch();

  const { bgDef } = useThemeClasses();
  useEffect(() => {
    dispatch(clearMovies());
    dispatch(fetchMovies(1));
  }, [dispatch]);

  return (
    <View className={`flex-1 p-4 ${bgDef}`}>
      <RenderItemsList />
    </View>
  );
};

export default FilmsList;
