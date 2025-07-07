import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useAppSelector } from '../store/hooks';

const Item = () => {
  const { currentElement } = useAppSelector(state => state.movies);

  if (!currentElement) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-700">
      <View className="p-4">
        {currentElement.posterUrlPreview ? (
          <Image
            source={{ uri: currentElement.posterUrlPreview }}
            className="w-full h-96 rounded-lg mb-4"
            resizeMode="contain"
          />
        ) : (
          <View className="w-full h-96 rounded-lg mb-4 bg-gray-600 items-center justify-center">
            <Text className="text-white text-center px-2">Нет постера</Text>
          </View>
        )}

        <Text className="text-2xl text-center font-bold text-white mb-2">
          {currentElement.nameRu ?? currentElement.nameOriginal}
        </Text>

        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-300">
            Рейтинг: {currentElement.ratingKinopoisk}
          </Text>
          <Text className="text-gray-300 tex ">Год: {currentElement.year}</Text>
        </View>

        <Text className="text-white text-lg mb-1">Описание:</Text>
        <Text className="text-gray-300 mb-4">
          {currentElement.description ?? 'Нет описания'}
        </Text>

        <View className="flex-row items-center mb-4">
          <Text className="text-white text-lg mb-1">Страна :</Text>
          <Text className="text-gray-300 ml-2">
            {currentElement.countries
              ?.map(country => country.country)
              .join(', ')}
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {currentElement.genres?.map((genre, index) => (
            <View key={index} className="bg-blue-500 px-3 py-1 rounded-full">
              <Text className="text-white">{genre.genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Item;
