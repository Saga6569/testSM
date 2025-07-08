import { useTheme } from '../contexts/ThemeContext';

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();

  const bgDefColor = isDarkMode ? '#000' : '#fff';
  const textDefColor = isDarkMode ? '#fff' : '#000';

  return {
    bgDefColor,
    textDefColor,
    isDarkMode,
  };
};