import Link from 'next/link';
import styles from './not-found.module.css';

/**
 * Not Found Page for Blog Posts
 * 
 * Displayed when a post slug doesn't match any existing posts
 * Provides a user-friendly error message and navigation back to home
 * 
 * Requirements: 3.3, 5.5
 */
export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 404 Icon */}
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>
          
          {/* Error Message */}
          <h1 className={styles.title}>Post Not Found</h1>
          <p className={styles.description}>
            Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
            It may have been moved or deleted.
          </p>
          
          {/* Back to Home Link */}
          <Link href="/" className={styles.homeLink}>
            <svg
              className={styles.arrowIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
