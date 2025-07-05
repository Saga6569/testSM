import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../api';
import { FlashList } from '@shopify/flash-list';


const MovieCard = React.memo(({ item }: { item: Movie }) => {
  return (
    <TouchableOpacity className="flex-1 items-center mb-4 p-2">
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
});

const RenderItemsList = (props: any) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = props;

  console.log(data, 'render1 ');

  // Получаем все фильмы из всех страниц


  // Оптимизированный renderItem
  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => <MovieCard item={item} />,
    [],
  );

  // Оптимизированный keyExtractor
  const keyExtractor = (item: Movie, index: number) =>
    `${item.kinopoiskId}_${index}`;

  const handleUpdate = React.useCallback(() => {
    // if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
    // }
  }, [fetchNextPage]);

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
      <Text className="text-xl font-bold text-center mb-4 text-blue-400">
        Галерея фильмов ({data.length} фильмов)
      </Text>
      <FlashList
        onEndReached={handleUpdate}
        onEndReachedThreshold={3}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
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
