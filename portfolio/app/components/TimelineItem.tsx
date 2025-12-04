'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TimelineItem.module.css';

/**
 * TimelineItem Interface
 * Defines the structure for timeline entries (experience or education)
 */
export interface TimelineItemData {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  achievements?: string[];
  type: 'experience' | 'education'; // Used for color-coding timeline dots
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number; // Used to determine left/right positioning
}

/**
 * TimelineItem Component
 * 
 * Displays a single timeline entry with:
 * - Alternating left/right layout based on index (even = left, odd = right)
 * - Scroll-triggered animations using Intersection Observer
 * - Color-coded dots based on item type (experience = primary, education = secondary)
 * - Slide-in animations from opposite sides (left items slide from left, right items from right)
 * 
 * Animation Strategy:
 * - Uses Intersection Observer to detect when item enters viewport
 * - Applies CSS animation class when visible
 * - Animations are defined in TimelineItem.module.css
 * - Respects prefers-reduced-motion for accessibility
 */
export default function TimelineItem({ item, index }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Determine if this item should be on the left or right side
  // Even indices (0, 2, 4...) = left, Odd indices (1, 3, 5...) = right
  const isLeft = index % 2 === 0;
  
  /**
   * Intersection Observer Setup
   * Triggers animation when timeline item scrolls into view
   * - threshold: 0.2 means 20% of the element must be visible
   * - Once triggered, observer disconnects to prevent re-triggering
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to avoid re-animating
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element fully enters viewport
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={itemRef}
      className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right} ${
        isVisible ? styles.visible : ''
      }`}
      data-type={item.type}
      role="listitem"
      aria-labelledby={`timeline-title-${item.id}`}
    >
      {/* Timeline Dot - Color-coded based on type */}
      <div 
        className={`${styles.timelineDot} ${styles[item.type]}`}
        aria-hidden="true"
      >
        <div className={styles.dotInner}></div>
      </div>

      {/* Content Card */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 id={`timeline-title-${item.id}`} className={styles.title}>{item.title}</h3>
          <p className={styles.organization}>{item.organization}</p>
          <time className={styles.period} dateTime={item.period}>
            {item.period}
          </time>
        </div>

        {/* Description List */}
        {item.description && item.description.length > 0 && (
          <ul className={styles.descriptionList} aria-label="Responsibilities and duties">
            {item.description.map((desc, idx) => (
              <li key={idx} className={styles.descriptionItem}>
                {desc}
              </li>
            ))}
          </ul>
        )}

        {/* Achievements (Optional) */}
        {item.achievements && item.achievements.length > 0 && (
          <div className={styles.achievements}>
            <h4 className={styles.achievementsTitle}>Key Achievements:</h4>
            <ul className={styles.achievementsList} aria-label="Key achievements">
              {item.achievements.map((achievement, idx) => (
                <li key={idx} className={styles.achievementItem}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
