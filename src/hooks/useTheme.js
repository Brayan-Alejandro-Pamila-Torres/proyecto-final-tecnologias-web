import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage('devprofile-theme', LIGHT_THEME);
  const currentTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  const isDarkMode = currentTheme === DARK_THEME;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setTheme((selectedTheme) => (selectedTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  };

  const setLightTheme = () => setTheme(LIGHT_THEME);
  const setDarkTheme = () => setTheme(DARK_THEME);

  return {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}
