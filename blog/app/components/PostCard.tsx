'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './PostCard.module.css';

/**
 * Post data interface defining the structure of a blog post
 */
export interface Post {
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

/**
 * PostCard Component
 * 
 * Displays a blog post preview card with:
 * - Hover lift effect using CSS transforms
 * - Fade-in animation on scroll using Intersection Observer
 * - Theme-aware category badge
 * - Smooth transitions for all interactive states
 * 
 * Requirements: 3.4, 5.1, 5.2, 5.3, 7.1
 */
export default function PostCard({ post }: PostCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Intersection Observer setup for scroll-triggered fade-in animation
   * Observes when the card enters the viewport and triggers animation
   * Disconnects after first observation for performance
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect observer after animation triggers to improve performance
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '50px', // Start animation slightly before card enters viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Format date string to readable format
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link 
      href={`/posts/${post.slug}`} 
      className={styles.cardLink}
      aria-label={`Read article: ${post.title}`}
    >
      <article
        ref={cardRef}
        className={`${styles.card} ${isVisible ? styles.visible : ''}`}
        aria-labelledby={`post-title-${post.slug}`}
      >
        {/* Category badge with theme-aware colors */}
        <div className={styles.categoryBadge} aria-label={`Category: ${post.category}`}>
          {post.category}
        </div>

        {/* Post title */}
        <h2 id={`post-title-${post.slug}`} className={styles.title}>{post.title}</h2>

        {/* Post excerpt */}
        <p className={styles.excerpt}>{post.excerpt}</p>

        {/* Post metadata: date and read time */}
        <div className={styles.metadata} role="group" aria-label="Post metadata">
          <time className={styles.date} dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className={styles.separator} aria-hidden="true">•</span>
          <span className={styles.readTime} aria-label={`Reading time: ${post.readTime}`}>
            {post.readTime}
          </span>
        </div>

        {/* Read more indicator with arrow */}
        <div className={styles.readMore} aria-hidden="true">
          Read more
          <svg
            className={styles.arrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </article>
    </Link>
  );
}
