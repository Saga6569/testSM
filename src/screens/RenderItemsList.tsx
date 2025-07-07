import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../store/slices/moviesSlice';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMovies, setCurrentElement } from '../store/slices/moviesSlice';
import { useNavigation } from '@react-navigation/native';

const MovieCard = React.memo(
  ({ item, onPress }: { item: Movie; onPress: () => void }) => {
    return (
      <TouchableOpacity
        className="flex-1 items-center mb-4 p-2"
        onPress={onPress}
      >
        {item.posterUrl ? (
          <Image
            source={{ uri: item.posterUrl }}
            className="w-40 h-60 rounded-lg mb-2 border-4 border-blue-500"
            resizeMode="cover"
          />
        ) : (
          <View className="w-40 h-60 rounded-lg mb-2 border-4 border-blue-500 bg-gray-600 items-center justify-center">
            <Text className="text-white text-center px-2">Нет постера</Text>
          </View>
        )}
        <Text className="text-base text-white text-center mb-1">
          {item.nameRu ?? item.nameOriginal}
        </Text>
        <Text className="text-sm text-gray-300">
          Рейтинг: {item.ratingKinopoisk}
        </Text>
        <Text className="text-sm text-gray-300">Год: {item.year}</Text>
      </TouchableOpacity>
    );
  },
);

const RenderItemsList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { movies, isLoading, error, currentPage, totalPages } = useAppSelector(
    (state: any) => state.movies,
  );

  // Оптимизированный renderItem
  const renderItem = React.useCallback(
    ({ item, onPress }: { item: Movie; onPress: () => void }) => (
      <MovieCard item={item} onPress={onPress} />
    ),
    [],
  );

  // Оптимизированный keyExtractor
  const keyExtractor = (item: Movie, index: number) =>
    `${item.kinopoiskId}_${index}`;

  const handleUpdate = React.useCallback(() => {
    if (currentPage <= totalPages) {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, totalPages]);

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
      <Text className="text-xl font-bold text-center mb-4 text-blue-400 font-montserrat">
        Галерея фильмов ({movies.length} фильмов)
      </Text>
      <FlashList
        onEndReached={handleUpdate}
        onEndReachedThreshold={3}
        data={movies}
        keyExtractor={keyExtractor}
        renderItem={({ item }) =>
          renderItem({
            item,
            onPress: () => {
              dispatch(setCurrentElement(item));
              navigation.navigate('Item' as never);
            },
          })
        }
        numColumns={2}
        estimatedItemSize={316}
        removeClippedSubviews={true}
        ListFooterComponent={
          isLoading ? (
            <View className="py-4">
              <Text className="text-white text-center">Загрузка...</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RenderItemsList;
