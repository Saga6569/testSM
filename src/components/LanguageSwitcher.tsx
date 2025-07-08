import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <View className="flex-row items-center bg-gray-600 rounded-lg p-1">
      <TouchableOpacity
        className={`px-3 py-2 rounded-md ${
          currentLanguage === 'ru' ? 'bg-blue-500' : 'bg-transparent'
        }`}
        onPress={() => currentLanguage !== 'ru' && toggleLanguage()}
      >
        <Text
          className={`font-semibold ${
            currentLanguage === 'ru' ? 'text-white' : 'text-gray-300'
          }`}
        >
          RU
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-3 py-2 rounded-md ${
          currentLanguage === 'en' ? 'bg-blue-500' : 'bg-transparent'
        }`}
        onPress={() => currentLanguage !== 'en' && toggleLanguage()}
      >
        <Text
          className={`font-semibold ${
            currentLanguage === 'en' ? 'text-white' : 'text-gray-300'
          }`}
        >
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitcher;
