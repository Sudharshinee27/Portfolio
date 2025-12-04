# Performance Optimization Guide - Blog Application

This document outlines the performance optimizations implemented in the blog application and provides examples for using them effectively.

## Table of Contents

1. [Next.js Image Component](#nextjs-image-component)
2. [Lazy Loading with Intersection Observer](#lazy-loading-with-intersection-observer)
3. [CSS Performance with will-change](#css-performance-with-will-change)
4. [Animation Optimization](#animation-optimization)
5. [Code Splitting](#code-splitting)
6. [Performance Utilities](#performance-utilities)

---

## Next.js Image Component

### Blog Post Featured Images

```tsx
import Image from 'next/image';
import { getImageSizes } from '@/lib/performance';

interface PostHeaderProps {
  title: string;
  featuredImage: string;
}

export default function PostHeader({ title, featuredImage }: PostHeaderProps) {
  return (
    <div className="post-header">
      <div className="featured-image">
        <Image
          src={featuredImage}
          alt={title}
          width={1200}
          height={630}
          sizes={getImageSizes({
            mobile: '100vw',
            tablet: '100vw',
            desktop: '1200px'
          })}
          priority // Above-the-fold image
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h1>{title}</h1>
    </div>
  );
}
```

### Post Card Thumbnails

```tsx
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  thumbnail: string;
}

export default function PostCard({ slug, title, thumbnail }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="post-card">
        <div className="thumbnail">
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={250}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            loading="lazy"
          />
        </div>
        <h2>{title}</h2>
      </article>
    </Link>
  );
}
```

### Author Avatar

```tsx
import Image from 'next/image';

interface AuthorProps {
  name: string;
  avatar: string;
}

export default function Author({ name, avatar }: AuthorProps) {
  return (
    <div className="author">
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        className="avatar"
        loading="lazy"
      />
      <span>{name}</span>
    </div>
  );
}
```

---

## Lazy Loading with Intersection Observer

### Lazy Load Post Content

```tsx
'use client';

import { useLazyLoad } from '@/lib/performance';
import PostContent from './PostContent';

export default function LazyPostContent({ content }: { content: string }) {
  const { ref, isVisible } = useLazyLoad(0.1, '100px');

  return (
    <div ref={ref}>
      {isVisible ? (
        <PostContent content={content} />
      ) : (
        <div style={{ minHeight: '500px' }}>Loading content...</div>
      )}
    </div>
  );
}
```

### Lazy Load Comments Section

```tsx
'use client';

import dynamic from 'next/dynamic';
import { LazyLoadWrapper } from '@/app/components/LazyLoadWrapper';

const Comments = dynamic(() => import('./Comments'), {
  loading: () => <div>Loading comments...</div>,
});

export default function CommentsSection() {
  return (
    <LazyLoadWrapper threshold={0.1} rootMargin="200px">
      <Comments />
    </LazyLoadWrapper>
  );
}
```

---

## CSS Performance with will-change

### PostCard Animations

The PostCard component already uses `will-change` for optimal performance:

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  /* Optimize hover animations */
  will-change: transform, box-shadow;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px var(--shadow-lg);
}
```

### Theme Toggle Animation

```css
.themeToggle {
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  /* Optimize rotation animation */
  will-change: transform;
}

.themeToggle:hover {
  transform: rotate(180deg);
}
```

---

## Animation Optimization

### Smooth Theme Transitions

```css
/* Global theme transition */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease;
}

/* Optimize specific animated elements */
.navbar {
  transition: background-color 0.3s ease,
              backdrop-filter 0.3s ease;
  will-change: background-color;
}
```

### Respect Reduced Motion

```tsx
'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/performance';

export default function AnimatedPost() {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion());
  }, []);

  return (
    <article className={shouldAnimate ? 'animate-fade-in' : ''}>
      Content
    </article>
  );
}
```

---

## Code Splitting

### Dynamic Import for Heavy Components

```tsx
import dynamic from 'next/dynamic';

// Lazy load code syntax highlighter
const CodeBlock = dynamic(() => import('./CodeBlock'), {
  loading: () => <pre>Loading code...</pre>,
  ssr: false,
});

// Lazy load chart components
const DataVisualization = dynamic(() => import('./DataVisualization'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,
});

export default function BlogPost({ content }: { content: string }) {
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <CodeBlock code="const example = 'code';" language="typescript" />
      <DataVisualization data={[]} />
    </article>
  );
}
```

### Conditional Feature Loading

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ShareButtons = dynamic(() => import('./ShareButtons'));
const RelatedPosts = dynamic(() => import('./RelatedPosts'));

export default function PostFooter() {
  const [showShare, setShowShare] = useState(false);

  return (
    <footer>
      <button onClick={() => setShowShare(true)}>Share</button>
      {showShare && <ShareButtons />}
      <RelatedPosts />
    </footer>
  );
}
```

---

## Performance Utilities

### Debounced Search

```tsx
'use client';

import { useState } from 'react';
import { debounce } from '@/lib/performance';

export default function SearchBar() {
  const [results, setResults] = useState([]);

  const handleSearch = debounce(async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, 300);

  return (
    <div>
      <input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
      />
      <ul>
        {results.map((result: any) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Throttled Scroll Progress

```tsx
'use client';

import { useEffect, useState } from 'react';
import { throttle } from '@/lib/performance';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalScroll) * 100;
      
      setProgress(Math.min(currentProgress, 100));
    }, 100);

    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## Blog-Specific Optimizations

### Optimize Post Loading

```tsx
// app/posts/[slug]/page.tsx
import { Suspense } from 'react';
import PostContent from '@/components/PostContent';
import PostSkeleton from '@/components/PostSkeleton';

export default async function PostPage({ params }: { params: { slug: string } }) {
  return (
    <article>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>
    </article>
  );
}
```

### Optimize Post List

```tsx
// app/page.tsx
import { Suspense } from 'react';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/posts';

export default async function BlogHome() {
  const posts = await getPosts();

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <Suspense key={post.slug} fallback={<div>Loading...</div>}>
          <PostCard post={post} />
        </Suspense>
      ))}
    </div>
  );
}
```

### Preload Critical Posts

```tsx
'use client';

import { useEffect } from 'react';
import { preloadImage } from '@/lib/performance';

export default function PostPreloader({ featuredPosts }: { featuredPosts: any[] }) {
  useEffect(() => {
    // Preload featured post images
    const images = featuredPosts.map(post => post.thumbnail);
    Promise.all(images.map(preloadImage));
  }, [featuredPosts]);

  return null;
}
```

---

## Performance Checklist for Blog

### Images
- ✅ Use Next.js Image for all post images
- ✅ Optimize featured images (1200x630 recommended)
- ✅ Lazy load post thumbnails
- ✅ Use appropriate sizes for avatars (48x48 or 64x64)
- ✅ Provide alt text for accessibility

### Content Loading
- ✅ Use Suspense for async content
- ✅ Lazy load comments section
- ✅ Lazy load related posts
- ✅ Implement skeleton loaders
- ✅ Preload featured/popular posts

### Theme Performance
- ✅ Smooth theme transitions (0.3s)
- ✅ Persist theme preference in localStorage
- ✅ Avoid flash of unstyled content (FOUC)
- ✅ Use CSS variables for theme colors

### Animations
- ✅ Use transform/opacity for animations
- ✅ Add will-change to animated elements
- ✅ Respect prefers-reduced-motion
- ✅ Optimize hover effects

### Code Splitting
- ✅ Dynamic import for syntax highlighters
- ✅ Lazy load share buttons
- ✅ Split by route (automatic)
- ✅ Conditional feature loading

---

## Measuring Blog Performance

### Key Metrics

1. **Time to First Byte (TTFB)**: < 200ms
2. **First Contentful Paint (FCP)**: < 1.8s
3. **Largest Contentful Paint (LCP)**: < 2.5s
4. **Cumulative Layout Shift (CLS)**: < 0.1
5. **First Input Delay (FID)**: < 100ms

### Testing Tools

- Chrome DevTools Lighthouse
- WebPageTest
- Google PageSpeed Insights
- Vercel Analytics

---

## Additional Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
