// Utility functions for theme management

export type Theme = 'light' | 'dark';

/**
 * Get the stored theme from localStorage
 * @returns The stored theme or 'light' as default
 */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme');
  return (stored === 'dark' ? 'dark' : 'light') as Theme;
}

/**
 * Save theme to localStorage
 * @param theme - The theme to save
 */
export function saveTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('theme', theme);
}

/**
 * Apply theme to document
 * @param theme - The theme to apply
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Toggle between light and dark themes
 * @param currentTheme - The current theme
 * @returns The new theme
 */
export function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light';
}
