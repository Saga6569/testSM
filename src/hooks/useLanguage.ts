import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@app_language';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const loadSavedLanguage = useCallback(async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }, [i18n]);

  // Загрузка сохраненного языка при инициализации
  useEffect(() => {
    loadSavedLanguage();
  }, [loadSavedLanguage]);

  const changeLanguage = async (language: 'ru' | 'en') => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
      setCurrentLanguage(language);
      i18n.changeLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    changeLanguage(newLanguage);
  };

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    isRussian: currentLanguage === 'ru',
    isEnglish: currentLanguage === 'en',
  };
};