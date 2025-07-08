import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { isDarkMode } = useTheme();

  const bgDef = isDarkMode ? 'bg-black' : 'bg-white';
  const textDef = isDarkMode ? 'text-white' : 'text-black';

  return {
    bgDef,
    textDef,
    isDarkMode,
  };
};