import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Authorization: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  // const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!isLogin) {
      await AsyncStorage.setItem('myToken', `${password} ${email}`);
      Alert.alert('Успешно', 'Вы успешно зарегистрировались');
      navigation.navigate('Main' as never);
      return;
    }

    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const token = await AsyncStorage.getItem('myToken');

    if (token !== null) {
      Alert.alert('Ошибка', 'Такого пользователя не существует');
      return;
    }

    await AsyncStorage.setItem(password + email, 'great');
    navigation.navigate('Main' as never);
  };

  return (
    <View className="flex-1 bg-gray-900 justify-center px-6">
      <View className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <Text className="text-3xl font-bold text-white text-center mb-8">
          {isLogin ? 'Вход' : 'Регистрация'}
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-white text-sm mb-2">Email</Text>
            <TextInput
              className="bg-gray-700 text-white p-4 rounded-lg border border-gray-600"
              placeholder="Введите email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-white text-sm mb-2">Пароль</Text>
            <TextInput
              className="bg-gray-700 text-white p-4 rounded-lg border border-gray-600"
              placeholder="Введите пароль"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-lg mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-blue-400 text-center">
              {isLogin
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Есть аккаунт? Войти'}
            </Text>
          </TouchableOpacity>

          {/* Кнопка для очистки AsyncStorage */}
          <TouchableOpacity
            className="mt-6 bg-red-600 p-4 rounded-lg"
            onPress={async () => {
              await AsyncStorage.clear();
              setEmail('');
              setPassword('');
              Alert.alert('Готово', 'Данные успешно удалены');
            }}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Очистить данные
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Authorization;
