'use client';

/**
 * ThemeTest Component
 * 
 * A simple test component to verify the theme system is working correctly.
 * This can be removed once the full blog UI is implemented.
 */

import { useTheme } from '../providers/ThemeProvider';

export function ThemeTest() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Theme System Test</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <button 
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: '2px solid currentColor',
          background: 'transparent',
        }}
      >
        Toggle Theme
      </button>
      <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.7 }}>
        The theme preference is saved to localStorage and will persist across page reloads.
      </p>
    </div>
  );
}
