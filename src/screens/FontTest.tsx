import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeClasses } from '../hooks/useThemeClasses';

const FontTest = () => {
  const { bgDef, textDef } = useThemeClasses();

  return (
    <ScrollView className={`flex-1 ${bgDef}`}>
      <View className="p-4">
        <Text className={`text-2xl font-bold mb-4 ${textDef}`}>
          Тест шрифтов
        </Text>

        <Text className={`text-lg mb-2 ${textDef}`}>
          Системный шрифт (по умолчанию):
        </Text>
        <Text className={`text-base mb-4 ${textDef}`}>
          Это текст с системным шрифтом
        </Text>

        <Text className={`text-lg mb-2 ${textDef}`}>
          Montserrat шрифт:
        </Text>
        <Text className={`text-base font-montserrat mb-4 ${textDef}`}>
          Это текст с шрифтом Montserrat
        </Text>

        <Text className={`text-lg mb-2 ${textDef}`}>
          Montserrat Bold:
        </Text>
        <Text className={`text-base font-montserrat font-bold mb-4 ${textDef}`}>
          Это жирный текст с шрифтом Montserrat
        </Text>

        <Text className={`text-lg mb-2 ${textDef}`}>
          Сравнение размеров:
        </Text>
        <Text className={`text-xs font-montserrat mb-1 ${textDef}`}>
          Очень маленький текст (xs)
        </Text>
        <Text className={`text-sm font-montserrat mb-1 ${textDef}`}>
          Маленький текст (sm)
        </Text>
        <Text className={`text-base font-montserrat mb-1 ${textDef}`}>
          Обычный текст (base)
        </Text>
        <Text className={`text-lg font-montserrat mb-1 ${textDef}`}>
          Большой текст (lg)
        </Text>
        <Text className={`text-xl font-montserrat mb-1 ${textDef}`}>
          Очень большой текст (xl)
        </Text>
        <Text className={`text-2xl font-montserrat mb-1 ${textDef}`}>
          Огромный текст (2xl)
        </Text>
      </View>
    </ScrollView>
  );
};

export default FontTest;