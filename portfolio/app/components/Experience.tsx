'use client';

import TimelineItem, { TimelineItemData } from './TimelineItem';
import styles from './Experience.module.css';
import { experienceData } from '../lib/portfolioData';

/**
 * Experience Component
 * 
 * Displays professional work experience in a vertical timeline format
 * - Uses TimelineItem component for each experience entry
 * - Alternating left/right layout for visual interest
 * - Scroll-triggered animations via Intersection Observer in TimelineItem
 * - Color-coded timeline dots (experience type uses primary gradient)
 * 
 * Data Structure:
 * - Each experience item includes title, organization, period, description, and optional achievements
 * - Items are rendered in chronological order (most recent first)
 */

export default function Experience() {
  return (
    <section className={styles.experienceSection} id="experience" aria-labelledby="experience-heading">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="experience-heading" className={styles.title}>Professional Experience</h2>
          <p className={styles.subtitle}>
            My journey in software development and the roles I've held
          </p>
        </div>

        {/* Timeline Container with vertical line */}
        <div className={styles.timeline} role="list" aria-label="Professional experience timeline">
          {/* Vertical line connecting all timeline items */}
          <div className={styles.timelineLine} aria-hidden="true"></div>

          {/* Render each experience as a timeline item */}
          {experienceData.map((experience, index) => (
            <TimelineItem key={experience.id} item={experience} index={index} />
          ))}
        </div>

        {/* Empty state if no experience data */}
        {experienceData.length === 0 && (
          <div className={styles.emptyState} role="status">
            <p>No experience data available</p>
          </div>
        )}
      </div>
    </section>
  );
}
