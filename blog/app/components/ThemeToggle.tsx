'use client';

/**
 * ThemeToggle Component
 * 
 * An interactive button that toggles between light and dark themes with smooth animations.
 * 
 * Features:
 * - Sun/moon icon that rotates and scales during theme transitions
 * - Smooth color transitions using CSS variables from the theme system
 * - Clear visual feedback for current theme state
 * - Accessible with proper ARIA labels and keyboard support
 * - Hover and active states for enhanced interactivity
 * 
 * Animation Logic:
 * - Icons use absolute positioning to overlay each other in the same space
 * - When theme changes, the outgoing icon rotates 180deg and scales down to 0.5
 * - Simultaneously, the incoming icon rotates from 180deg to 0deg and scales from 0.5 to 1
 * - This creates a smooth spinning transition effect between sun and moon
 * - The button itself scales slightly on hover (1.05x) and press (0.95x) for tactile feedback
 * - All transitions use CSS variables for duration and easing, ensuring consistency
 * 
 * Requirements Satisfied:
 * - 4.1: Theme toggle button with clear visual indication
 * - 4.2: Smooth animated transitions between themes
 * - 4.6: Clear visual feedback through icon change and animation
 * - 7.1: Inline comments explaining animation logic
 * - 7.3: Comments describing theme management integration
 */

import { useTheme } from '../providers/ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  /**
   * Access theme context using the useTheme hook
   * - theme: Current theme state ('light' or 'dark')
   * - toggleTheme: Function to switch between themes
   * 
   * The useTheme hook connects to ThemeProvider's context, which manages:
   * - Theme state persistence in localStorage
   * - Applying theme to document root via data-theme attribute
   * - Triggering CSS variable updates for smooth color transitions
   */
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* 
        Sun Icon - Visible in Light Mode
        
        Represents the current light theme state. When visible:
        - Opacity: 1 (fully visible)
        - Rotation: 0deg (upright position)
        - Scale: 1 (normal size)
        
        When transitioning to dark mode:
        - Rotates 180deg clockwise while fading out
        - Scales down to 0.5x for a smooth disappearing effect
        - Transition duration controlled by --duration-normal (300ms)
      */}
      <svg
        className={`${styles.icon} ${styles.sunIcon} ${theme === 'light' ? styles.visible : styles.hidden}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Sun center circle */}
        <circle cx="12" cy="12" r="5" />
        {/* Sun rays - 8 lines radiating from center */}
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* 
        Moon Icon - Visible in Dark Mode
        
        Represents the current dark theme state. When visible:
        - Opacity: 1 (fully visible)
        - Rotation: 0deg (upright position)
        - Scale: 1 (normal size)
        
        When transitioning to light mode:
        - Rotates 180deg clockwise while fading out
        - Scales down to 0.5x for a smooth disappearing effect
        - Transition duration controlled by --duration-normal (300ms)
        
        The crescent moon shape is created using an SVG path that represents
        the visible portion of the moon during a crescent phase.
      */}
      <svg
        className={`${styles.icon} ${styles.moonIcon} ${theme === 'dark' ? styles.visible : styles.hidden}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Crescent moon path */}
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
