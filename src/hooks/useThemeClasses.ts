import { useTheme } from '../contexts/ThemeContext';

export const useThemeClasses = () => {
  const { isDarkMode } = useTheme();

  const bgDef = isDarkMode ? 'bg-def-dark' : 'bg-def';
  const textDef = isDarkMode ? 'text-white' : 'text-black';

  return {
    bgDef,
    textDef,
    isDarkMode,
  };
};