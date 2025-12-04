// Utility functions for managing blog posts

export interface Post {
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

// Sample posts data (will be replaced with actual data later)
const samplePosts: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and the App Router. This comprehensive guide covers everything from setup to deployment.',
    content: `
# Getting Started with Next.js 14

Next.js 14 represents a significant leap forward in web development, bringing powerful features and optimizations that make building modern web applications easier than ever.

## What's New in Next.js 14

The latest version of Next.js introduces several groundbreaking features:

### Server Actions
Server Actions allow you to write server-side code directly in your components, eliminating the need for separate API routes for simple operations. This streamlines development and reduces boilerplate code.

### Turbopack
The new Rust-based bundler provides up to 700x faster updates than Webpack, dramatically improving the development experience.

### Partial Prerendering
This experimental feature combines the benefits of static and dynamic rendering, allowing you to have static shells with dynamic content.

## Getting Started

To create a new Next.js 14 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## App Router Benefits

The App Router introduces a new paradigm for building Next.js applications:

- **Layouts**: Share UI between routes while preserving state
- **Server Components**: Reduce JavaScript bundle size by default
- **Streaming**: Progressively render UI from the server
- **Data Fetching**: Simplified data fetching with async/await

## Conclusion

Next.js 14 is a powerful framework that continues to push the boundaries of what's possible in web development. Whether you're building a simple blog or a complex application, Next.js provides the tools you need to succeed.
    `,
    date: '2024-01-15',
    category: 'Tutorial',
    tags: ['nextjs', 'react', 'web-development'],
    readTime: '5 min read',
    author: 'Sudharshinee S K',
  },
  {
    slug: 'mastering-css-animations',
    title: 'Mastering CSS Animations',
    excerpt: 'Discover the power of CSS animations and how to create smooth, performant animations that enhance user experience without sacrificing performance.',
    content: `
# Mastering CSS Animations

CSS animations are a powerful tool for creating engaging user experiences. When used correctly, they can guide users, provide feedback, and make your application feel more polished and professional.

## The Fundamentals

CSS animations are built on two core concepts: **transitions** and **keyframes**.

### Transitions

Transitions allow you to smoothly change property values over a specified duration:

\`\`\`css
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darkblue;
}
\`\`\`

### Keyframes

Keyframes give you more control over the animation sequence:

\`\`\`css
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

.element {
  animation: fadeIn 0.5s ease-out;
}
\`\`\`

## Performance Best Practices

For smooth 60fps animations, stick to animating these properties:
- **transform**: translate, scale, rotate
- **opacity**: fade effects

These properties are GPU-accelerated and won't trigger layout recalculations.

## Accessibility Considerations

Always respect user preferences for reduced motion:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

## Conclusion

CSS animations are an essential skill for modern web developers. By following best practices and considering performance and accessibility, you can create delightful experiences that work for everyone.
    `,
    date: '2024-01-20',
    category: 'Design',
    tags: ['css', 'animations', 'performance'],
    readTime: '8 min read',
    author: 'Sudharshinee S K',
  },
  {
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks: A Deep Dive',
    excerpt: 'Explore advanced React Hooks patterns and learn how to build custom hooks that make your components more reusable and maintainable.',
    content: `
# React Hooks: A Deep Dive

React Hooks revolutionized how we write React components, allowing us to use state and other React features without writing classes. Let's explore some advanced patterns and best practices.

## Understanding useState

The useState hook is the foundation of state management in functional components:

\`\`\`javascript
const [count, setCount] = useState(0);

// Functional updates for complex state logic
setCount(prevCount => prevCount + 1);
\`\`\`

## useEffect Mastery

useEffect is powerful but can be tricky. Here are key concepts:

### Dependency Arrays
Always specify dependencies to avoid bugs:

\`\`\`javascript
useEffect(() => {
  fetchData(userId);
}, [userId]); // Only re-run when userId changes
\`\`\`

### Cleanup Functions
Clean up subscriptions and timers:

\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
\`\`\`

## Custom Hooks

Custom hooks let you extract component logic into reusable functions:

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
\`\`\`

## Advanced Patterns

### useCallback and useMemo
Optimize performance by memoizing functions and values:

\`\`\`javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\`

## Conclusion

React Hooks provide a powerful and flexible way to build components. By understanding these patterns and best practices, you can write cleaner, more maintainable code.
    `,
    date: '2024-01-25',
    category: 'Development',
    tags: ['react', 'hooks', 'javascript'],
    readTime: '10 min read',
    author: 'Sudharshinee S K',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for 2024',
    excerpt: 'Discover the latest TypeScript best practices and patterns that will help you write more maintainable and type-safe code.',
    content: `
# TypeScript Best Practices for 2024

TypeScript has become the de facto standard for building large-scale JavaScript applications. Here are the best practices you should follow in 2024.

## Type Safety First

Always prefer explicit types over implicit any:

\`\`\`typescript
// Bad
function processData(data: any) {
  return data.value;
}

// Good
interface Data {
  value: string;
}

function processData(data: Data): string {
  return data.value;
}
\`\`\`

## Utility Types

TypeScript provides powerful utility types:

\`\`\`typescript
// Partial - make all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Record - create object types
type UserRoles = Record<string, Role>;
\`\`\`

## Discriminated Unions

Use discriminated unions for type-safe state management:

\`\`\`typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };

function handleState(state: LoadingState) {
  switch (state.status) {
    case 'success':
      // TypeScript knows state.data exists here
      return state.data;
    case 'error':
      // TypeScript knows state.error exists here
      throw state.error;
  }
}
\`\`\`

## Generic Constraints

Use generic constraints for flexible, type-safe functions:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Strict Mode

Always enable strict mode in tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Conclusion

TypeScript is a powerful tool that can significantly improve code quality and developer experience. By following these best practices, you'll write more maintainable and bug-free code.
    `,
    date: '2024-02-01',
    category: 'Development',
    tags: ['typescript', 'javascript', 'best-practices'],
    readTime: '7 min read',
    author: 'Sudharshinee S K',
  },
  {
    slug: 'responsive-design-principles',
    title: 'Modern Responsive Design Principles',
    excerpt: 'Learn how to create responsive designs that work seamlessly across all devices using modern CSS techniques and best practices.',
    content: `
# Modern Responsive Design Principles

Creating responsive designs is no longer optional—it's essential. Let's explore modern techniques for building websites that work beautifully on any device.

## Mobile-First Approach

Start with mobile designs and progressively enhance for larger screens:

\`\`\`css
/* Mobile styles (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
\`\`\`

## Fluid Typography

Use clamp() for responsive typography without media queries:

\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
\`\`\`

## CSS Grid and Flexbox

Modern layout techniques make responsive design easier:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Container Queries

The future of responsive design is here:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

## Responsive Images

Optimize images for different screen sizes:

\`\`\`html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>
\`\`\`

## Touch-Friendly Design

Ensure interactive elements are large enough for touch:
- Minimum 44x44px for buttons
- Adequate spacing between clickable elements
- Consider thumb zones on mobile devices

## Conclusion

Responsive design is about creating flexible, adaptable experiences. By using modern CSS techniques and following best practices, you can build websites that work beautifully everywhere.
    `,
    date: '2024-02-05',
    category: 'Design',
    tags: ['css', 'responsive-design', 'web-design'],
    readTime: '6 min read',
    author: 'Sudharshinee S K',
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization Guide',
    excerpt: 'A comprehensive guide to optimizing web performance, from image optimization to code splitting and lazy loading strategies.',
    content: `
# Web Performance Optimization Guide

Performance is crucial for user experience and SEO. Let's explore strategies to make your website blazingly fast.

## Core Web Vitals

Focus on these key metrics:

### Largest Contentful Paint (LCP)
Target: < 2.5 seconds
- Optimize images and videos
- Minimize render-blocking resources
- Use CDN for static assets

### First Input Delay (FID)
Target: < 100 milliseconds
- Minimize JavaScript execution time
- Break up long tasks
- Use web workers for heavy computations

### Cumulative Layout Shift (CLS)
Target: < 0.1
- Set dimensions for images and videos
- Avoid inserting content above existing content
- Use transform animations instead of layout-triggering properties

## Image Optimization

Images often account for most of a page's weight:

\`\`\`html
<!-- Use modern formats -->
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

## Code Splitting

Split your JavaScript bundles for faster initial loads:

\`\`\`javascript
// Dynamic imports
const Component = lazy(() => import('./Component'));

// Route-based splitting
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./Dashboard'))
  }
];
\`\`\`

## Lazy Loading

Load resources only when needed:

\`\`\`javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
\`\`\`

## Caching Strategies

Implement effective caching:

\`\`\`javascript
// Service Worker caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

## Resource Hints

Help browsers prioritize resources:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://analytics.com">
<link rel="preload" href="critical.css" as="style">
\`\`\`

## Conclusion

Web performance optimization is an ongoing process. By focusing on Core Web Vitals and implementing these strategies, you can create fast, responsive websites that delight users.
    `,
    date: '2024-02-10',
    category: 'Tutorial',
    tags: ['performance', 'optimization', 'web-development'],
    readTime: '12 min read',
    author: 'Sudharshinee S K',
  },
];

/**
 * Get all blog posts
 * @returns Array of all blog posts
 */
export function getAllPosts(): Post[] {
  return samplePosts;
}

/**
 * Get a single post by slug
 * @param slug - The post slug
 * @returns The post or undefined if not found
 */
export function getPostBySlug(slug: string): Post | undefined {
  return samplePosts.find((post) => post.slug === slug);
}

/**
 * Get posts by category
 * @param category - The category to filter by
 * @returns Array of posts in the category
 */
export function getPostsByCategory(category: string): Post[] {
  return samplePosts.filter((post) => post.category === category);
}

/**
 * Get all unique categories
 * @returns Array of unique category names
 */
export function getAllCategories(): string[] {
  const categories = samplePosts.map((post) => post.category);
  return Array.from(new Set(categories));
}
