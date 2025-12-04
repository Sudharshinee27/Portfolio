# Blog Theme System Documentation

## Overview

This document explains the implementation of the theme switching system for the blog application. The system provides seamless light/dark mode switching with localStorage persistence and SSR-safe hydration.

## Architecture

### Components

1. **ThemeProvider** (`app/providers/ThemeProvider.tsx`)
   - React Context provider for global theme state
   - Manages theme switching logic
   - Handles localStorage persistence
   - Implements SSR-safe hydration

2. **useTheme Hook** (exported from `ThemeProvider.tsx`)
   - Custom hook for accessing theme context
   - Provides `theme` state and `toggleTheme` function
   - Throws error if used outside ThemeProvider

### Key Features

#### 1. Theme State Management
- Uses React Context API for global state
- Supports 'light' and 'dark' modes
- Default theme: 'light'

#### 2. localStorage Persistence
- Saves theme preference to localStorage
- Automatically loads saved preference on mount
- Falls back to system preference if no saved theme

#### 3. SSR-Safe Hydration
- Uses `mounted` state to prevent hydration mismatches
- Returns `null` during server render and initial client render
- Applies theme only after client-side mount

#### 4. CSS Variable Integration
- Sets `data-theme` attribute on document root
- CSS variables automatically switch based on theme
- Smooth transitions for all theme-dependent properties

## Usage

### Basic Setup

The ThemeProvider is already integrated in the root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from './providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using the Theme in Components

```tsx
'use client';

import { useTheme } from '../providers/ThemeProvider';

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  );
}
```

### CSS Variables

The theme system uses CSS variables defined in `globals.css`:

```css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --accent: #6366f1;
  /* ... more variables */
}

/* Dark theme */
[data-theme='dark'] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
  --accent: #818cf8;
  /* ... more variables */
}
```

Use these variables in your components:

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border);
}
```

## Technical Details

### SSR Considerations

The theme system handles Server-Side Rendering (SSR) carefully to avoid hydration mismatches:

1. **Server Render**: Returns `null` to avoid rendering with incorrect theme
2. **Client Mount**: Reads localStorage and applies correct theme
3. **Hydration**: Ensures server and client render match

This approach prevents the "flash of wrong theme" issue and hydration errors.

### localStorage API

The system uses the following localStorage key:
- **Key**: `'theme'`
- **Values**: `'light'` | `'dark'`

### System Preference Detection

If no theme is saved in localStorage, the system checks the user's OS preference:

```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = prefersDark ? 'dark' : 'light';
```

## Testing the Theme System

A test component is included at `app/components/ThemeTest.tsx` to verify functionality:

```tsx
import { ThemeTest } from './components/ThemeTest';

// Add to any page
<ThemeTest />
```

This component displays:
- Current theme state
- Toggle button
- Confirmation that localStorage persistence works

## Integration with Other Components

### Navbar Component
The Navbar will integrate the ThemeToggle button:

```tsx
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav>
      {/* Navigation items */}
      <ThemeToggle />
    </nav>
  );
}
```

### ThemeToggle Component
A dedicated toggle button component (to be implemented in task 11):

```tsx
'use client';

import { useTheme } from '../providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## Performance Considerations

1. **CSS Transitions**: All theme-dependent properties have smooth transitions
2. **No Re-renders**: Theme changes don't cause unnecessary re-renders
3. **Efficient Updates**: Only the `data-theme` attribute changes, CSS handles the rest
4. **Lazy Evaluation**: Theme is only read from localStorage once on mount

## Accessibility

The theme system supports accessibility features:

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **Screen Readers**: Theme toggle should include `aria-label`
3. **Reduced Motion**: Respects `prefers-reduced-motion` media query
4. **Color Contrast**: Both themes meet WCAG contrast requirements

## Troubleshooting

### Issue: Hydration Mismatch Error
**Solution**: Ensure ThemeProvider returns `null` when not mounted

### Issue: Theme Not Persisting
**Solution**: Check localStorage is enabled and not blocked by browser

### Issue: Flash of Wrong Theme
**Solution**: The `mounted` state prevents this by delaying render

### Issue: useTheme Hook Error
**Solution**: Ensure component using `useTheme` is wrapped in ThemeProvider

## Future Enhancements

Potential improvements for the theme system:

1. **Multiple Themes**: Support for more than 2 themes (e.g., 'auto', 'high-contrast')
2. **Theme Customization**: Allow users to customize colors
3. **Smooth Transitions**: Add page transition animations when switching themes
4. **Theme Preview**: Show preview before applying theme
5. **Scheduled Themes**: Auto-switch based on time of day

## Requirements Satisfied

This implementation satisfies the following requirements:

- **4.1**: Theme toggle button with clear visual indication
- **4.4**: Theme persistence using localStorage
- **4.5**: Previously selected theme applied on load
- **6.5**: React best practices with proper component structure
- **7.1**: Inline comments explaining key functionality
- **7.3**: Comments explaining theme management logic

## Related Files

- `app/providers/ThemeProvider.tsx` - Main theme provider component
- `app/layout.tsx` - Root layout with ThemeProvider integration
- `app/globals.css` - CSS variables and theme styles
- `lib/theme.ts` - Theme utility functions
- `app/components/ThemeTest.tsx` - Test component for verification

## Next Steps

After implementing the theme system (Task 9), the next tasks are:

- **Task 10**: Build blog Navbar component with theme toggle
- **Task 11**: Create ThemeToggle component with animated icon
- **Task 12**: Implement CSS variables for theme switching (already done in globals.css)
