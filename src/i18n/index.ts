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

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;
