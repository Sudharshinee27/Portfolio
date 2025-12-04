'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Achievements.module.css';

/**
 * Achievement Interface
 * Defines the structure for individual achievement data
 * - title: Achievement title
 * - description: Brief description of the achievement
 * - year: Year the achievement was earned
 * - icon: Optional icon/emoji to represent the achievement
 */
interface Achievement {
  title: string;
  description: string;
  year: string;
  icon?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

/**
 * Custom Hook: useScrollAnimation
 * 
 * Purpose: Triggers animations when element scrolls into viewport
 * Uses Intersection Observer API to detect when component is visible
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
 * Achievements Component
 * 
 * Displays a grid of achievement cards with animations
 * Features:
 * - Card-based layout with scaleIn animations
 * - Scroll-triggered animations using Intersection Observer
 * - Staggered fade-in animations for visual interest
 * - Hover effects with smooth transitions (scale and shadow)
 * - Responsive grid layout
 */
export default function Achievements({ achievements }: AchievementsProps) {
  // Use custom hook to detect when component scrolls into view
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className={styles.achievementsSection} ref={ref} aria-labelledby="achievements-heading">
      <div className={styles.container}>
        <h2 id="achievements-heading" className={styles.title}>Achievements</h2>
        <p className={styles.subtitle}>
          Recognition and milestones in my journey
        </p>

        <div className={styles.achievementsGrid} role="list" aria-label="Achievements list">
          {achievements.map((achievement, index) => (
            <article
              key={`${achievement.title}-${index}`}
              className={`${styles.achievementCard} ${
                isVisible ? styles.visible : ''
              }`}
              style={{
                // Staggered animation delays: each card animates 150ms after the previous
                // This creates a cascading scaleIn effect as cards appear
                animationDelay: `${index * 150}ms`,
              }}
              role="listitem"
              aria-labelledby={`achievement-title-${index}`}
            >
              {/* Optional icon display */}
              {achievement.icon && (
                <div className={styles.iconContainer} aria-hidden="true">
                  <span className={styles.icon}>{achievement.icon}</span>
                </div>
              )}

              {/* Achievement year badge */}
              <div className={styles.yearBadge} aria-label={`Year: ${achievement.year}`}>
                {achievement.year}
              </div>

              {/* Achievement title */}
              <h3 id={`achievement-title-${index}`} className={styles.achievementTitle}>
                {achievement.title}
              </h3>

              {/* Achievement description */}
              <p className={styles.achievementDescription}>
                {achievement.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
