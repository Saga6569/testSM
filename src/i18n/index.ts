import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // язык по умолчанию
    fallbackLng: 'en', // резервный язык
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    compatibilityJSON: 'v3', // для React Native
  });

export default i18n;