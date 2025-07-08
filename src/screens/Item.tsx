import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import { useThemeClasses } from '../hooks/useThemeClasses';

// Компонент прелоадера для экрана фильма
const ItemPreloader = () => {
  const { t } = useTranslation();
  const { bgDef, textDef } = useThemeClasses();

  return (
    <View className={`flex-1 items-center justify-center ${bgDef}`}>
      <View className="items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className={`text-lg mt-4 font-montserrat ${textDef}`}>{t('movieDetails.loadingInfo')}</Text>
        <Text className="text-gray-400 text-sm mt-2">{t('movies.pleaseWait')}</Text>
      </View>
    </View>
  );
};

const Item = () => {
  const { currentElement } = useAppSelector(state => state.movies);
  const { t } = useTranslation();
  const { bgDef, textDef } = useThemeClasses();

  // Функция показа информации о фильме
  const showMovieInfo = () => {
    Alert.alert(
      t('notifications.movieInfo'),
      `${t('notifications.title')}: ${currentElement?.nameRu || currentElement?.nameOriginal}\n\n${t('movies.rating')}: ${currentElement?.ratingKinopoisk}\n${t('movies.year')}: ${currentElement?.year}\n\n${t('movieDetails.countries')}: ${currentElement?.countries?.map(c => c.country).join(', ') || t('movieDetails.notSpecified')}\n\n${t('movieDetails.genres')}: ${currentElement?.genres?.map(g => g.genre).join(', ') || t('movieDetails.notSpecifiedPlural')}`,
      [
        {
          text: t('common.ok'),
          style: 'default',
        },
      ]
    );
  };

  // Функция добавления в избранное
  const addToFavorites = () => {
    Alert.alert(
      t('notifications.addedToFavorites'),
      t('notifications.addedToFavoritesSuccess', { title: currentElement?.nameRu || currentElement?.nameOriginal }),
      [
        {
          text: t('notifications.excellent'),
          style: 'default',
        },
      ]
    );
  };

  // Функция поделиться фильмом
  const shareMovie = () => {
    Alert.alert(
      t('notifications.shareMovie'),
      t('notifications.shareMovieConfirm', { title: currentElement?.nameRu || currentElement?.nameOriginal }),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.share'),
          onPress: () => {
            Alert.alert(
              t('notifications.shareSuccess'),
              t('notifications.shareSuccessMessage'),
              [
                {
                  text: t('common.ok'),
                  style: 'default',
                },
              ]
            );
          },
        },
      ]
    );
  };

  if (!currentElement) {
    return <ItemPreloader />;
  }

  return (
    <ScrollView className={`flex-1 ${bgDef}`}>
      <View className="p-4 ">
        {currentElement.posterUrlPreview ? (
          <Image
            source={{ uri: currentElement.posterUrlPreview }}
            className="w-full h-96 rounded-lg mb-4  bgDef, textDef"
            resizeMode="contain"
          />
        ) : (
          <View className="w-full h-96 rounded-lg mb-4 bg-gray-600 items-center justify-center">
            <Text className="text-white text-center px-2">
              {t('movies.noPoster')}
            </Text>
          </View>
        )}

        <Text className={`text-2xl text-center font-bold mb-2 ${textDef}`}>
          {currentElement.nameRu ?? currentElement.nameOriginal}
        </Text>

        <View className="flex-row justify-between mb-4">
          <Text className={`${textDef} opacity-70`}>
            {t('movies.rating')}: {currentElement.ratingKinopoisk}
          </Text>
          <Text className={`${textDef} opacity-70`}>
            {t('movies.year')}: {currentElement.year}
          </Text>
        </View>

        <Text className={`text-lg mb-1 ${textDef}`}>
          {t('movieDetails.description')}:
        </Text>
        <Text className={`mb-4 ${textDef} opacity-70`}>
          {currentElement.description ?? t('movieDetails.noDescription')}
        </Text>

        <View className="flex-row items-center mb-4">
          <Text className={`text-lg mb-1 ${textDef}`}>
            {t('movieDetails.country')} :
          </Text>
          <Text className={`ml-2 ${textDef} opacity-70`}>
            {currentElement.countries
              ?.map(country => country.country)
              .join(', ')}
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-6">
          {currentElement.genres?.map((genre, index) => (
            <View key={index} className="bg-blue-500 px-3 py-1 rounded-full">
              <Text className="text-white">{genre.genre}</Text>
            </View>
          ))}
        </View>

        {/* Кнопки действий */}
        <View className="space-y-3">
          <TouchableOpacity
            className="bg-blue-500 py-3 px-4 rounded-lg"
            onPress={showMovieInfo}
          >
            <Text className="text-white text-center font-semibold">
              {t('actions.movieInfo')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 py-3 px-4 rounded-lg"
            onPress={addToFavorites}
          >
            <Text className="text-white text-center font-semibold">
              {t('actions.addToFavorites')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 py-3 px-4 rounded-lg"
            onPress={shareMovie}
          >
            <Text className="text-white text-center font-semibold">
              {t('actions.shareMovie')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Item;
