import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './global.css';
import FilmsList from './src/screens/FilmsList';

function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Main" component={FilmsList} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
