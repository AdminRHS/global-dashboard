/**
 * Theme Toggle Component
 * Button to switch between light and dark themes
 */

import { useEffect } from 'react';
import useAppStore from '../../store/useAppStore.js';

function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const initTheme = useAppStore((state) => state.initTheme);

  // Initialize theme on mount
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: 'var(--spacing-sm) var(--spacing-md)',
        backgroundColor: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--button-radius)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        color: 'var(--text-primary)',
        fontSize: 'var(--font-size-lg)',
        transition: 'all var(--transition-fast)',
      }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        e.currentTarget.style.borderColor = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
