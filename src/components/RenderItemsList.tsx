import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Movie } from '../store/slices/moviesSlice';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchMovies,
  setCurrentElement,
  clearMovies,
} from '../store/slices/moviesSlice';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeClasses } from '../hooks/useThemeClasses';

const MovieCard = React.memo(
  ({ item, onPress }: { item: Movie; onPress: () => void }) => {
    const { t } = useTranslation();
    const { textDef } = useThemeClasses();
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
          <View
            className={`w-40 h-60 rounded-lg mb-2 border-4 border-blue-500 bg-gray-600 items-center justify-center ${textDef}`}
          >
            <Text className={`${textDef}`}>{t('movies.noPoster')}</Text>
          </View>
        )}
        <Text
          className={`${textDef} text-xl font-montserrat mb-1 text-center`}
        >
          {item.nameRu ?? item.nameOriginal}
        </Text>
        <Text className={`${textDef}`}>
          {t('movies.rating')}: {item.ratingKinopoisk}
        </Text>
        <Text className={`${textDef}`}>
          {t('movies.year')}: {item.year}
        </Text>
      </TouchableOpacity>
    );
  },
);

// Компонент прелоадера
const Preloader = () => {
  const { t } = useTranslation();
  const { bgDef, textDef } = useThemeClasses();

  return (
    <View className={`flex-1 items-center justify-center ${bgDef}`}>
      <View className="items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className={`text-lg mt-4 font-montserrat ${textDef}`}>
          {t('movies.gallery')}...
        </Text>
        <Text className="text-gray-400 text-sm mt-2">
          {t('movies.pleaseWait')}
        </Text>
      </View>
    </View>
  );
};

const RenderItemsList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { bgDef, textDef } = useThemeClasses();
  const { movies, isLoading, error, currentPage, totalPages } = useAppSelector(
    (state: any) => state.movies,
  );

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = React.useState('');

  // Состояние для RefreshControl
  const [refreshing, setRefreshing] = React.useState(false);

  // Фильтрация фильмов по поисковому запросу
  const filteredMovies = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return movies;
    }
    return movies.filter(
      (movie: Movie) =>
        movie.nameRu?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameOriginal?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [movies, searchQuery]);

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

  // Функция обновления данных
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      setSearchQuery('');
      dispatch(clearMovies());
      await dispatch(fetchMovies(1));
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  // Функция показа уведомления о фильме
  const showMovieNotification = (movie: Movie) => {
    Alert.alert(
      t('notifications.movieSelected'),
      `${movie.nameRu || movie.nameOriginal}\n\n${t('movies.rating')}: ${movie.ratingKinopoisk}\n${t('movies.year')}: ${movie.year}\n\n${t('notifications.openDetails')}`,
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('notifications.open'),
          onPress: () => {
            dispatch(setCurrentElement(movie));
            navigation.navigate('Item' as never);
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (isLoading && movies.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return (
      <View className={`flex-1 items-center justify-center ${bgDef}`}>
        <Text className="text-red-500 text-lg">
          {t('notifications.loadingError')}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => dispatch(fetchMovies(1))}
        >
          <Text className="text-white font-semibold">{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-4 ${bgDef}`}>
      {/* Кнопка тестирования шрифтов */}
      <TouchableOpacity
        className="mb-4 bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => navigation.navigate('FontTest' as never)}
      >
        <Text className="text-white font-montserrat text-center">
          Тест шрифтов
        </Text>
      </TouchableOpacity>

      <View className="mb-4">
        <TextInput
          className={`${bgDef} ${textDef} px-4 py-3 rounded-lg border border-gray-500`}
          placeholder={t('movies.searchPlaceholder')}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text
        className={`text-xl font-bold text-center mb-4 text-blue-400 font-montserrat ${textDef}`}
      >
        {filteredMovies.length > 0
          ? `${t('movies.gallery')} (${t('movies.moviesCount', { count: filteredMovies.length })})`
          : t('movies.noMoviesFound')}
      </Text>
      <FlashList
        className={`${bgDef} ${textDef}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
            title={t('movies.refreshing')}
          />
        }
        onEndReached={handleUpdate}
        onEndReachedThreshold={3}
        data={filteredMovies}
        keyExtractor={keyExtractor}
        renderItem={({ item }) =>
          renderItem({
            item,
            onPress: () => {
              showMovieNotification(item);
            },
          })
        }
        numColumns={2}
        estimatedItemSize={316}
        removeClippedSubviews={true}
        ListFooterComponent={
          isLoading ? (
            <View className="py-4 items-center">
              <ActivityIndicator size="small" color="#3B82F6" />
              <Text className={`text-center mt-2 ${textDef}`}>
                {t('movies.loadingMore')}
              </Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RenderItemsList;
