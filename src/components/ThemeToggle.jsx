import { useTheme } from '../hooks/useTheme';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
    </button>
  );
}

export default ThemeToggle;
