'use client';

import { useState } from 'react';
import styles from './Blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Web Development',
    excerpt: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript basics.',
    date: '2024-01-15',
    category: 'Web Development',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Building Responsive Websites',
    excerpt: 'Best practices for creating mobile-friendly and responsive web designs.',
    date: '2024-01-20',
    category: 'Design',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Introduction to Node.js',
    excerpt: 'Understanding server-side JavaScript and building backend applications.',
    date: '2024-02-01',
    category: 'Backend',
    readTime: '6 min read'
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Web Development', 'Design', 'Backend'];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className={styles.blogSection} id="blog" aria-labelledby="blog-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="blog-heading" className={styles.title}>Blog & Articles</h2>
          <p className={styles.subtitle}>
            Sharing my knowledge and experiences in web development
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              
              <div className={styles.postFooter}>
                <time className={styles.date} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <button className={styles.readMore}>Read More →</button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
