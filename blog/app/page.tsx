'use client';

import { useEffect, useRef, useState } from 'react';
import PostCard, { Post } from './components/PostCard';
import styles from './page.module.css';

/**
 * Sample blog post data
 * In a real application, this would be fetched from a CMS or database
 */
const samplePosts: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and the App Router. This comprehensive guide covers everything from setup to deployment.',
    date: '2024-01-15',
    category: 'Tutorial',
    readTime: '5 min read',
  },
  {
    slug: 'mastering-css-animations',
    title: 'Mastering CSS Animations',
    excerpt: 'Discover the power of CSS animations and how to create smooth, performant animations that enhance user experience without sacrificing performance.',
    date: '2024-01-20',
    category: 'Design',
    readTime: '8 min read',
  },
  {
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks: A Deep Dive',
    excerpt: 'Explore advanced React Hooks patterns and learn how to build custom hooks that make your components more reusable and maintainable.',
    date: '2024-01-25',
    category: 'Development',
    readTime: '10 min read',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for 2024',
    excerpt: 'Discover the latest TypeScript best practices and patterns that will help you write more maintainable and type-safe code.',
    date: '2024-02-01',
    category: 'Development',
    readTime: '7 min read',
  },
  {
    slug: 'responsive-design-principles',
    title: 'Modern Responsive Design Principles',
    excerpt: 'Learn how to create responsive designs that work seamlessly across all devices using modern CSS techniques and best practices.',
    date: '2024-02-05',
    category: 'Design',
    readTime: '6 min read',
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization Guide',
    excerpt: 'A comprehensive guide to optimizing web performance, from image optimization to code splitting and lazy loading strategies.',
    date: '2024-02-10',
    category: 'Tutorial',
    readTime: '12 min read',
  },
];

/**
 * Blog Home Page Component
 * 
 * Features:
 * - Responsive post grid layout that adapts to different screen sizes
 * - Staggered fade-in animations for post cards
 * - Scroll-triggered animations for content sections
 * - Hero section with animated introduction
 * - Category filtering capability (UI ready)
 * 
 * Requirements: 3.4, 5.1, 5.2, 5.5, 6.2
 */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  /**
   * Intersection Observer for hero section animation
   * Triggers fade-in animation when hero section enters viewport
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section with animated introduction */}
      <section
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.visible : ''}`}
        aria-labelledby="hero-title"
      >
        <div className={styles.heroContent}>
          <h1 id="hero-title" className={styles.heroTitle}>Welcome to Our Blog</h1>
          <p className={styles.heroDescription}>
            Discover insights, tutorials, and best practices on web development,
            design, and modern technologies. Stay updated with the latest trends
            and learn from practical examples.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className={styles.container}>
        {/* Featured Posts Section */}
        <section className={styles.section} aria-labelledby="latest-posts-heading">
          <div className={styles.sectionHeader}>
            <h2 id="latest-posts-heading" className={styles.sectionTitle}>Latest Posts</h2>
            <p className={styles.sectionDescription}>
              Explore our most recent articles and tutorials
            </p>
          </div>

          {/* Responsive Post Grid with staggered animations */}
          <div className={styles.postGrid} role="list" aria-label="Blog posts">
            {samplePosts.map((post, index) => (
              <div
                key={post.slug}
                className={styles.postGridItem}
                style={{
                  // Staggered animation delay for each card
                  animationDelay: `${index * 100}ms`,
                }}
                role="listitem"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section (Optional - for future enhancement) */}
        <section 
          className={styles.categoriesSection}
          aria-labelledby="categories-heading"
        >
          <h3 id="categories-heading" className={styles.categoriesTitle}>Browse by Category</h3>
          <nav className={styles.categories} aria-label="Category filters">
            <button 
              className={styles.categoryButton}
              aria-label="Show all posts"
              aria-pressed="true"
            >
              All Posts
            </button>
            <button 
              className={styles.categoryButton}
              aria-label="Filter by Tutorial category"
              aria-pressed="false"
            >
              Tutorial
            </button>
            <button 
              className={styles.categoryButton}
              aria-label="Filter by Design category"
              aria-pressed="false"
            >
              Design
            </button>
            <button 
              className={styles.categoryButton}
              aria-label="Filter by Development category"
              aria-pressed="false"
            >
              Development
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}
