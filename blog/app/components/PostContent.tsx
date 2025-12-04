'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './PostContent.module.css';

/**
 * PostContent Component
 * 
 * Renders the full blog post content with:
 * - Fade-in animation on mount
 * - Formatted markdown-style content
 * - Theme-aware styling
 * - Responsive layout
 * 
 * Requirements: 5.4, 5.5, 7.1
 */

interface PostContentProps {
  title: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
}

export default function PostContent({
  title,
  content,
  date,
  category,
  readTime,
  author,
  tags,
}: PostContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  /**
   * Trigger fade-in animation on component mount
   * Uses a small delay to ensure smooth page transition
   */
  useEffect(() => {
    // Small delay for smooth page transition animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
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

  /**
   * Process content to convert markdown-style formatting to HTML
   * This is a simple implementation - in production, use a proper markdown parser
   */
  const processContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className={styles.h1}>{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className={styles.h2}>{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className={styles.h3}>{line.slice(4)}</h3>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return null; // Handle in a more sophisticated way in production
        }
        
        // Bold text
        const boldRegex = /\*\*(.*?)\*\*/g;
        if (boldRegex.test(line)) {
          const parts = line.split(boldRegex);
          return (
            <p key={index} className={styles.paragraph}>
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          );
        }
        
        // Regular paragraphs
        if (line.trim()) {
          return <p key={index} className={styles.paragraph}>{line}</p>;
        }
        
        // Empty lines
        return <br key={index} />;
      });
  };

  return (
    <article
      ref={contentRef}
      className={`${styles.article} ${isVisible ? styles.visible : ''}`}
    >
      {/* Post Header */}
      <header className={styles.header}>
        {/* Category Badge */}
        <div className={styles.categoryBadge}>{category}</div>
        
        {/* Post Title */}
        <h1 className={styles.title}>{title}</h1>
        
        {/* Post Metadata */}
        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4V8L10.5 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          
          <span className={styles.separator}>•</span>
          
          <div className={styles.metadataItem}>
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 8H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 12H8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>{readTime}</span>
          </div>
          
          <span className={styles.separator}>•</span>
          
          <div className={styles.metadataItem}>
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{author}</span>
          </div>
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      {/* Post Content */}
      <div className={styles.content}>
        {processContent(content)}
      </div>
    </article>
  );
}
