import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';

import { Switch, View } from 'react-native';
import './global.css';
import './src/i18n'; // Инициализация i18n
import FilmsList from './src/screens/FilmsList';
import Item from './src/screens/Item';
import Authorization from './src/screens/Authorization';
import FontTest from './src/screens/FontTest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { useThemeClasses } from './src/hooks/useThemeClasses';
import LanguageSwitcher from './src/components/LanguageSwitcher';

const Stack = createNativeStackNavigator();

// Вынесенный компонент для headerRight
const HeaderSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { bgDef, textDef } = useThemeClasses();
  const navigation = useNavigation();

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <View className="flex items-center justify-center mr-2">
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? '#000' : '#fff'}
          trackColor={{ false: '#767577', true: '#374151' }}
        />
      </View>
      <View className="mr-2">
        <LanguageSwitcher />
      </View>
      <TouchableOpacity
        className="mr-2"
        onPress={() => {
          AsyncStorage.removeItem('token');
          navigation.navigate('Authorization' as never);
        }}
      >
        <Text className={`${bgDef}, ${textDef} text-2xl`}>выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const RootStack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const pass = await AsyncStorage.getItem(`password`);
      const email = await AsyncStorage.getItem(`email`);
      const token = await AsyncStorage.getItem(`${pass} ${email}`);
      if (token === 'great') {
        navigation.navigate('Main' as never);
      }
    };
    fetchToken();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat' },
      }}
      initialRouteName={'Authorization'}
    >
      <Stack.Screen
        name="Authorization"
        component={Authorization}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main"
        component={FilmsList}
        options={{
          headerBackVisible: false,
          headerRight: () => <HeaderSwitch />,
        }}
      />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen
        name="FontTest"
        component={FontTest}
        options={{ title: 'Тест шрифтов' }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
