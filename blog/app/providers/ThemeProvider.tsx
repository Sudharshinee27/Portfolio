'use client';

/**
 * ThemeProvider Component
 * 
 * This component provides theme management functionality across the entire blog application.
 * It uses React Context API to make theme state and toggle function available to all child components.
 * 
 * Key Features:
 * - Manages 'light' and 'dark' theme states
 * - Persists theme preference in localStorage
 * - Handles SSR-safe hydration to prevent mismatch errors
 * - Provides useTheme hook for easy theme access in components
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the shape of our theme context
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context with undefined as initial value
// This ensures we catch cases where useTheme is used outside of ThemeProvider
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider Component
 * 
 * Wraps the application to provide theme context to all child components.
 * Must be used in a Client Component due to useState and useEffect usage.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // State to track current theme (defaults to 'light')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // State to track if component has mounted on client
  // This prevents hydration mismatches between server and client rendering
  const [mounted, setMounted] = useState(false);

  /**
   * Effect: Initialize theme on client-side mount
   * 
   * This runs only once after the component mounts on the client.
   * We use the 'mounted' state to prevent hydration mismatches because:
   * 1. Server-side rendering doesn't have access to localStorage
   * 2. The initial server render might differ from client render if we read localStorage immediately
   * 3. By waiting until mounted, we ensure consistent rendering
   */
  useEffect(() => {
    setMounted(true);
    
    // Retrieve stored theme preference from localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (storedTheme) {
      // Apply stored theme if it exists
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Optional: Check user's system preference if no stored theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Toggle Theme Function
   * 
   * Switches between light and dark themes and persists the choice.
   * This function is exposed through context so any component can trigger theme changes.
   */
  const toggleTheme = () => {
    // Determine the new theme (opposite of current)
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Update state
    setTheme(newTheme);
    
    // Persist to localStorage for future visits
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document root for CSS variable access
    // This allows CSS to use [data-theme='dark'] selectors
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  /**
   * SSR-Safe Rendering
   * 
   * Return null during server-side rendering and initial client render.
   * This prevents hydration mismatches by ensuring the server and client
   * render the same content initially. Once mounted, we render with the correct theme.
   * 
   * Alternative approach: You could render children immediately but with a default theme,
   * then update after mount. We chose null to avoid any flash of incorrect theme.
   */
  if (!mounted) {
    // Return a placeholder that matches server-rendered content
    // This prevents hydration mismatch errors
    return null;
  }

  // Provide theme context to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 * 
 * Custom hook to access theme context in any component.
 * This hook must be used within a component that's a child of ThemeProvider.
 * 
 * Usage example:
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Current: {theme}</button>;
 * }
 * ```
 * 
 * @throws Error if used outside of ThemeProvider
 * @returns ThemeContextValue containing theme state and toggleTheme function
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  // Throw error if hook is used outside of ThemeProvider
  // This helps catch mistakes during development
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
