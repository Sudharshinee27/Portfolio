# Design Document

## Overview

This design outlines the architecture and implementation approach for two Next.js 14+ applications: a vibrant portfolio website and a blog with theme-switching capabilities. Both applications will be built using the App Router, React Server Components where appropriate, and modern CSS animations. The portfolio will showcase professional work with interactive elements, while the blog will provide a comfortable reading experience with persistent light/dark mode switching.

## Architecture

### Project Structure

```
nextjs-portfolio-blog/
├── portfolio/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── components/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Projects.tsx
│   │       ├── Experience.tsx
│   │       ├── Education.tsx
│   │       ├── Achievements.tsx
│   │       └── Contact.tsx
│   ├── public/
│   ├── package.json
│   └── next.config.js
│
└── blog/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── posts/
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── globals.css
    │   └── components/
    │       ├── Navbar.tsx
    │       ├── ThemeToggle.tsx
    │       ├── PostCard.tsx
    │       └── PostContent.tsx
    ├── lib/
    │   ├── posts.ts
    │   └── theme.ts
    ├── public/
    ├── package.json
    └── next.config.js
```

### Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS with CSS Variables
- **State Management:** React Context API (for theme)
- **Animations:** CSS Transitions, Keyframes, and Intersection Observer API
- **Storage:** localStorage (for theme persistence)

## Components and Interfaces

### Portfolio Website Components

#### 1. Hero Component
```typescript
interface HeroProps {
  name: string;
  title: string;
  description: string;
  contactInfo: ContactInfo;
}

interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}
```

**Design Decisions:**
- Full-viewport hero section with animated gradient background
- Typewriter effect for the title
- Floating animation for profile elements
- Vibrant color scheme: Primary (#6366f1 - Indigo), Secondary (#ec4899 - Pink), Accent (#8b5cf6 - Purple)

#### 2. Skills Component
```typescript
interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'other';
}

interface SkillsProps {
  skills: Skill[];
}
```

**Design Decisions:**
- Interactive skill bars that animate on scroll into view
- Color-coded categories with gradient fills
- Hover effects that scale and highlight individual skills
- Staggered animation delays for visual interest

#### 3. Projects Component
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

interface ProjectsProps {
  projects: Project[];
}
```

**Design Decisions:**
- Card-based layout with 3D flip animation on hover
- Front side shows title and brief description
- Back side reveals detailed information and technologies
- Smooth scale and shadow transitions

#### 4. Experience/Education Components
```typescript
interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  achievements?: string[];
}
```

**Design Decisions:**
- Vertical timeline with alternating left/right layout
- Slide-in animations from opposite sides
- Color-coded timeline dots based on item type
- Expandable sections for detailed information

### Blog Website Components

#### 1. Navbar Component
```typescript
interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
}
```

**Design Decisions:**
- Sticky positioning with backdrop blur effect
- Smooth underline animation on hover
- Mobile-responsive hamburger menu with slide-in animation
- Integrated theme toggle button

#### 2. ThemeToggle Component
```typescript
interface ThemeToggleProps {
  initialTheme?: 'light' | 'dark';
}

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Design Decisions:**
- Sun/moon icon with rotation and scale animation
- Smooth color transitions using CSS variables
- Context-based theme management for global access
- localStorage persistence with SSR-safe hydration

#### 3. PostCard Component
```typescript
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

interface PostCardProps {
  post: Post;
}
```

**Design Decisions:**
- Card layout with hover lift effect
- Fade-in animation on scroll
- Category badge with theme-aware colors
- Smooth transition to post detail page

## Data Models

### Portfolio Data Structure
```typescript
interface PortfolioData {
  profile: {
    name: string;
    title: string;
    summary: string;
    contact: ContactInfo;
  };
  skills: Skill[];
  projects: Project[];
  experience: TimelineItem[];
  education: TimelineItem[];
  achievements: Achievement[];
  certifications: Certification[];
}

interface Achievement {
  title: string;
  description: string;
  year: string;
  icon?: string;
}

interface Certification {
  name: string;
  issuer: string;
  description: string;
  date: string;
}
```

### Blog Data Structure
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  author: string;
}

interface BlogMetadata {
  totalPosts: number;
  categories: string[];
  recentPosts: BlogPost[];
}
```

## Animation Strategy

### Animation Types

#### 1. Fade-In Animation
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Usage:** Page load, section reveals, content appearance

#### 2. Slide Animation
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```
**Usage:** Timeline items, navigation menu, modal dialogs

#### 3. Scale Transform Animation
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
**Usage:** Cards, buttons, skill bars, theme toggle

#### 4. Gradient Animation (Portfolio Background)
```css
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```
**Usage:** Hero section background, accent elements

### Intersection Observer Implementation

```typescript
// Custom hook for scroll-triggered animations
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

## Theme System Design

### CSS Variables Structure

```css
:root {
  /* Light theme */
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent: #6366f1;
  --border: #e5e7eb;
  --shadow: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  /* Dark theme */
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent: #818cf8;
  --border: #374151;
  --shadow: rgba(0, 0, 0, 0.3);
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

### Theme Context Implementation

```typescript
// app/providers/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

## Color Schemes

### Portfolio Color Palette
- **Primary:** #6366f1 (Indigo) - Main brand color
- **Secondary:** #ec4899 (Pink) - Accent and highlights
- **Tertiary:** #8b5cf6 (Purple) - Interactive elements
- **Success:** #10b981 (Green) - Achievements, positive indicators
- **Background:** Linear gradient from #6366f1 to #ec4899
- **Text:** #1f2937 (Dark gray) on light backgrounds

### Blog Color Palette

**Light Mode:**
- Background: #ffffff
- Secondary Background: #f3f4f6
- Text: #111827
- Accent: #6366f1
- Border: #e5e7eb

**Dark Mode:**
- Background: #111827
- Secondary Background: #1f2937
- Text: #f9fafb
- Accent: #818cf8
- Border: #374151

## Error Handling

### Client-Side Error Boundaries
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Theme Hydration Mismatch Prevention
- Use `mounted` state to prevent SSR/client mismatch
- Apply theme class only after client-side hydration
- Provide fallback UI during hydration

### Animation Performance
- Use `will-change` CSS property sparingly
- Prefer `transform` and `opacity` for animations
- Implement `prefers-reduced-motion` media query support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Strategy

### Component Testing
- Test theme toggle functionality and persistence
- Verify animation triggers on scroll
- Test responsive behavior across breakpoints
- Validate navigation and routing

### Accessibility Testing
- Ensure sufficient color contrast in both themes
- Test keyboard navigation
- Verify screen reader compatibility
- Test with reduced motion preferences

### Performance Testing
- Measure First Contentful Paint (FCP)
- Monitor animation frame rates
- Test theme switching performance
- Validate image optimization

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Test CSS animation support
- Verify localStorage functionality

## Responsive Design Strategy

### Breakpoints
```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */

@media (max-width: 640px) {
  /* Mobile styles */
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet styles */
}

@media (min-width: 1025px) {
  /* Desktop styles */
}
```

### Mobile Considerations
- Hamburger menu for blog navigation
- Stacked layout for portfolio sections
- Touch-friendly button sizes (min 44x44px)
- Optimized animations for mobile performance

## Performance Optimizations

1. **Image Optimization:** Use Next.js Image component with proper sizing
2. **Code Splitting:** Leverage Next.js automatic code splitting
3. **CSS Optimization:** Use CSS Modules to scope styles and reduce bundle size
4. **Animation Performance:** Use GPU-accelerated properties (transform, opacity)
5. **Lazy Loading:** Implement Intersection Observer for scroll-triggered content
6. **Font Loading:** Use next/font for optimized font loading

## Deployment Considerations

- Build both projects as separate Next.js applications
- Configure environment variables for any API endpoints
- Set up proper meta tags for SEO
- Implement Open Graph tags for social sharing
- Configure robots.txt and sitemap.xml
- Enable static generation where possible for better performance
