'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Certifications.module.css';

/**
 * Certification Interface
 * Defines the structure for individual certification data
 * - name: Certification name/title
 * - issuer: Organization that issued the certification
 * - description: Brief description of the certification
 * - date: Date when certification was obtained
 * - verified: Optional flag to show verification badge
 */
interface Certification {
  name: string;
  issuer: string;
  description: string;
  date: string;
  verified?: boolean;
}

interface CertificationsProps {
  certifications: Certification[];
}

/**
 * Custom Hook: useScrollAnimation
 * 
 * Purpose: Triggers animations when element scrolls into viewport
 * Uses Intersection Observer API to detect when component is visible
 * 
 * How it works:
 * 1. Creates an IntersectionObserver that watches the referenced element
 * 2. When element intersects viewport (based on threshold), sets isVisible to true
 * 3. Disconnects observer after first trigger to prevent re-animations
 * 
 * @param threshold - Percentage of element that must be visible (0.0 to 1.0)
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 */
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

/**
 * Certifications Component
 * 
 * Displays a grid of certification cards with animations
 * Features:
 * - Card-based layout with scaleIn animations
 * - Scroll-triggered animations using Intersection Observer
 * - Staggered fade-in animations for visual interest
 * - Hover effects with smooth transitions (scale, shadow, and border)
 * - Decorative gradient accent bar that expands on hover
 * - Responsive grid layout
 */
export default function Certifications({ certifications }: CertificationsProps) {
  // Use custom hook to detect when component scrolls into view
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className={styles.certificationsSection} ref={ref}>
      <div className={styles.container}>
        <h2 className={styles.title}>Certifications</h2>
        <p className={styles.subtitle}>
          Professional credentials and qualifications
        </p>

        <div className={styles.certificationsGrid}>
          {certifications.map((certification, index) => (
            <div
              key={`${certification.name}-${index}`}
              className={`${styles.certificationCard} ${
                isVisible ? styles.visible : ''
              }`}
              style={{
                // Staggered animation delays: each card animates 150ms after the previous
                // This creates a cascading scaleIn effect as cards appear
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Certification header with name and date */}
              <div className={styles.certificationHeader}>
                <h3 className={styles.certificationName}>
                  {certification.name}
                </h3>
                <div className={styles.dateBadge}>{certification.date}</div>
              </div>

              {/* Issuing organization */}
              <div className={styles.issuer}>{certification.issuer}</div>

              {/* Certification description */}
              <p className={styles.certificationDescription}>
                {certification.description}
              </p>

              {/* Optional verification badge */}
              {certification.verified && (
                <div className={styles.verificationBadge}>Verified</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
