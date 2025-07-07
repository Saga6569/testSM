import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useState, useEffect } from 'react';
import { Switch, View } from 'react-native';
import './global.css';
import FilmsList from './src/screens/FilmsList';
import Item from './src/screens/Item';
import Authorization from './src/screens/Authorization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { useThemeClasses } from './src/hooks/useThemeClasses';

const Stack = createNativeStackNavigator();

// Вынесенный компонент для headerRight
const HeaderSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { bgDef } = useThemeClasses();

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <View className="flex items-center justify-center ">
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? '#fbbf24' : '#fff'}
          trackColor={{ false: '#767577', true: '#374151' }}
        />
        <Text>{isDarkMode ? 'Dark mode' : 'Light mode'}</Text>
      </View>
      <View>
        <Text className={`${bgDef} text-white text-2xl`}>
          выйти
        </Text>
      </View>
    </View>
  );
};

const RootStack = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token === null) {
      navigation.navigate('Main' as never);
    }
  }, [token, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Montserrat' },
      }}
      initialRouteName={token !== null ? 'Main' : 'Authorization'}
    >
      <Stack.Screen
        name="Authorization"
        component={Authorization}
        options={{ headerShown: false }}
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
