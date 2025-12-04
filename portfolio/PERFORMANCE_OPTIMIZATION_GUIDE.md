# Performance Optimization Guide

This document outlines the performance optimizations implemented in the portfolio application and provides examples for using them effectively.

## Table of Contents

1. [Next.js Image Component](#nextjs-image-component)
2. [Lazy Loading with Intersection Observer](#lazy-loading-with-intersection-observer)
3. [CSS Performance with will-change](#css-performance-with-will-change)
4. [Animation Optimization](#animation-optimization)
5. [Code Splitting](#code-splitting)
6. [Performance Utilities](#performance-utilities)

---

## Next.js Image Component

The Next.js Image component provides automatic image optimization, lazy loading, and responsive images.

### Basic Usage

```tsx
import Image from 'next/image';

export default function ProfileImage() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={400}
      height={400}
      priority // Use for above-the-fold images
    />
  );
}
```

### Responsive Images

```tsx
import Image from 'next/image';
import { getImageSizes } from '@/lib/performance';

export default function HeroImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero banner"
      fill
      sizes={getImageSizes({
        mobile: '100vw',
        tablet: '80vw',
        desktop: '1200px'
      })}
      priority
      style={{ objectFit: 'cover' }}
    />
  );
}
```

### Project Card with Image

```tsx
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
}

export default function ProjectCard({ title, image, description }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="image-container">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy" // Lazy load below-the-fold images
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Optional blur placeholder
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### External Images

For external images, configure `next.config.js`:

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },
};
```

---

## Lazy Loading with Intersection Observer

### Using the useLazyLoad Hook

```tsx
'use client';

import { useLazyLoad } from '@/lib/performance';
import HeavyComponent from './HeavyComponent';

export default function LazySection() {
  const { ref, isVisible } = useLazyLoad(0.1, '50px', true);

  return (
    <section ref={ref}>
      {isVisible ? (
        <HeavyComponent />
      ) : (
        <div style={{ minHeight: '400px' }}>Loading...</div>
      )}
    </section>
  );
}
```

### Using LazyLoadWrapper

```tsx
import { LazyLoadWrapper } from '@/components/LazyLoadWrapper';
import Achievements from './Achievements';
import Skeleton from './Skeleton';

export default function AchievementsSection() {
  return (
    <LazyLoadWrapper
      threshold={0.1}
      rootMargin="100px"
      fallback={<Skeleton />}
    >
      <Achievements />
    </LazyLoadWrapper>
  );
}
```

### Lazy Loading Images

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useLazyLoad } from '@/lib/performance';
import Image from 'next/image';

export default function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isVisible } = useLazyLoad(0.1, '50px');
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldLoad(true);
    }
  }, [isVisible]);

  return (
    <div ref={ref}>
      {shouldLoad && (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          loading="lazy"
        />
      )}
    </div>
  );
}
```

---

## CSS Performance with will-change

The `will-change` CSS property hints to the browser which properties will change, enabling GPU acceleration.

### Strategic Usage

**✅ Good - Animated elements:**

```css
.hero {
  background: linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  
  /* Optimize animated background-position */
  will-change: background-position;
}

.profileCircle {
  animation: float 3s ease-in-out infinite;
  
  /* Optimize transform for floating animation */
  will-change: transform;
}
```

**✅ Good - Interactive elements:**

```css
.skillItem {
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  /* Prepare for animation on scroll */
  will-change: transform, opacity;
}

.skillItem.visible {
  animation: fadeIn 0.5s ease forwards;
}
```

**❌ Bad - Overuse:**

```css
/* Don't use will-change on everything */
* {
  will-change: transform, opacity; /* BAD! */
}

/* Don't use will-change on static elements */
.static-text {
  will-change: color; /* BAD! */
}
```

### Best Practices

1. **Only use on animated elements** - Elements that will actually animate
2. **Limit properties** - Specify only the properties that will change
3. **Remove when done** - Use JavaScript to add/remove will-change dynamically
4. **Prefer transform and opacity** - These are GPU-accelerated

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function OptimizedAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add will-change before animation
    element.style.willChange = 'transform, opacity';

    // Trigger animation
    element.classList.add('animate');

    // Remove will-change after animation completes
    const handleAnimationEnd = () => {
      element.style.willChange = 'auto';
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  return <div ref={elementRef} className="animated-element">Content</div>;
}
```

---

## Animation Optimization

### Use Transform and Opacity

**✅ Good - GPU-accelerated:**

```css
/* Use transform for movement */
.card:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Use opacity for fade effects */
.fadeIn {
  animation: fadeIn 0.5s ease;
}

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

**❌ Bad - Forces layout recalculation:**

```css
/* Avoid animating top/left/width/height */
.card:hover {
  top: -8px; /* BAD! */
  width: 102%; /* BAD! */
}
```

### Respect Reduced Motion

Always respect user preferences for reduced motion:

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

```tsx
import { prefersReducedMotion } from '@/lib/performance';

export default function AnimatedComponent() {
  const shouldAnimate = !prefersReducedMotion();

  return (
    <div className={shouldAnimate ? 'animate' : 'no-animate'}>
      Content
    </div>
  );
}
```

---

## Code Splitting

Next.js automatically code-splits by route. For additional optimization:

### Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Disable SSR if not needed
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  );
}
```

### Conditional Loading

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('./AdminPanel'));

export default function ConditionalComponent({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div>
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

---

## Performance Utilities

### Debounce

```tsx
import { debounce } from '@/lib/performance';

export default function SearchInput() {
  const handleSearch = debounce((query: string) => {
    // Expensive search operation
    performSearch(query);
  }, 300);

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Throttle

```tsx
import { throttle } from '@/lib/performance';
import { useEffect } from 'react';

export default function ScrollTracker() {
  useEffect(() => {
    const handleScroll = throttle(() => {
      // Track scroll position
      console.log('Scroll position:', window.scrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Content</div>;
}
```

### Preload Images

```tsx
import { preloadImage } from '@/lib/performance';
import { useEffect } from 'react';

export default function ImagePreloader() {
  useEffect(() => {
    // Preload critical images
    const images = [
      '/hero-image.jpg',
      '/profile.jpg',
      '/project-1.jpg',
    ];

    Promise.all(images.map(preloadImage))
      .then(() => console.log('Images preloaded'))
      .catch((err) => console.error('Preload failed:', err));
  }, []);

  return <div>Content</div>;
}
```

---

## Performance Checklist

### Images
- ✅ Use Next.js Image component for all images
- ✅ Set appropriate `width` and `height` or use `fill`
- ✅ Use `priority` for above-the-fold images
- ✅ Use `loading="lazy"` for below-the-fold images
- ✅ Provide appropriate `sizes` attribute
- ✅ Use modern formats (AVIF, WebP) via Next.js config

### Animations
- ✅ Use `transform` and `opacity` for animations
- ✅ Add `will-change` strategically to animated elements
- ✅ Respect `prefers-reduced-motion`
- ✅ Remove `will-change` after animations complete
- ✅ Use CSS animations over JavaScript when possible

### Lazy Loading
- ✅ Lazy load below-the-fold content
- ✅ Use Intersection Observer for scroll-triggered content
- ✅ Provide loading states/skeletons
- ✅ Disconnect observers after triggering

### Code Splitting
- ✅ Use dynamic imports for heavy components
- ✅ Split by route (automatic in Next.js)
- ✅ Lazy load admin/conditional features
- ✅ Use `ssr: false` for client-only components

### General
- ✅ Debounce expensive operations (search, API calls)
- ✅ Throttle high-frequency events (scroll, resize)
- ✅ Minimize bundle size
- ✅ Monitor Web Vitals (LCP, FID, CLS)
- ✅ Use production builds for testing

---

## Measuring Performance

### Web Vitals

Add to `app/layout.tsx`:

```tsx
import { reportWebVitals } from '@/lib/performance';

export function reportWebVitals(metric: any) {
  reportWebVitals(metric);
}
```

### Chrome DevTools

1. **Performance Tab**: Record and analyze runtime performance
2. **Lighthouse**: Run audits for performance, accessibility, SEO
3. **Network Tab**: Check image sizes and loading times
4. **Coverage Tab**: Identify unused CSS/JS

### Next.js Analytics

```bash
npm install @vercel/analytics
```

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/vitals/)
- [CSS will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
