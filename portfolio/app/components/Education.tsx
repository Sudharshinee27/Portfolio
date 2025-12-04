'use client';

import TimelineItem, { TimelineItemData } from './TimelineItem';
import styles from './Education.module.css';
import { educationData } from '../lib/portfolioData';

/**
 * Education Component
 * 
 * Displays educational background in a vertical timeline format
 * - Uses TimelineItem component for each education entry
 * - Alternating left/right layout for visual interest
 * - Scroll-triggered animations via Intersection Observer in TimelineItem
 * - Color-coded timeline dots (education type uses secondary gradient)
 * 
 * Data Structure:
 * - Each education item includes title (degree), organization (institution), period, description, and optional achievements
 * - Items are rendered in chronological order (most recent first)
 */

export default function Education() {
  return (
    <section className={styles.educationSection} id="education" aria-labelledby="education-heading">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="education-heading" className={styles.title}>Education</h2>
          <p className={styles.subtitle}>
            My academic journey and qualifications
          </p>
        </div>

        {/* Timeline Container with vertical line */}
        <div className={styles.timeline} role="list" aria-label="Education timeline">
          {/* Vertical line connecting all timeline items */}
          <div className={styles.timelineLine} aria-hidden="true"></div>

          {/* Render each education entry as a timeline item */}
          {educationData.map((education, index) => (
            <TimelineItem key={education.id} item={education} index={index} />
          ))}
        </div>

        {/* Empty state if no education data */}
        {educationData.length === 0 && (
          <div className={styles.emptyState} role="status">
            <p>No education data available</p>
          </div>
        )}
      </div>
    </section>
  );
}
