'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

/**
 * Skill Interface
 * Defines the structure for individual skill data
 * - name: Display name of the skill
 * - level: Proficiency level (0-100)
 * - category: Skill category for color-coding
 */
interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'other';
}

interface SkillsProps {
  skills: Skill[];
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
    // Create observer that triggers when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if element is intersecting with viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to avoid re-triggering
          observer.disconnect();
        }
      },
      { 
        threshold, // How much of the element must be visible
        rootMargin: '0px' // No margin adjustment
      }
    );

    // Start observing the element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/**
 * Skills Component
 * 
 * Displays an interactive list of skills with animated progress bars
 * Features:
 * - Scroll-triggered animations using Intersection Observer
 * - Staggered animation delays for visual interest
 * - Color-coded categories with gradient fills
 * - Hover effects with scale transforms
 * - Responsive design
 */
export default function Skills({ skills }: SkillsProps) {
  // Use custom hook to detect when component scrolls into view
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className={styles.skillsSection} ref={ref} aria-labelledby="skills-heading">
      <div className={styles.container}>
        <h2 id="skills-heading" className={styles.title}>Skills & Expertise</h2>
        <p className={styles.subtitle}>
          Technologies and tools I work with
        </p>

        <div className={styles.skillsGrid} role="list" aria-label="Skills list">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`${styles.skillItem} ${
                isVisible ? styles.visible : ''
              }`}
              style={{
                // Staggered animation delays: each skill animates 100ms after the previous
                // This creates a cascading effect as skills appear
                animationDelay: `${index * 100}ms`,
              }}
              role="listitem"
            >
              {/* Skill name and level percentage */}
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel} aria-label={`Proficiency: ${skill.level} percent`}>
                  {skill.level}%
                </span>
              </div>

              {/* Animated progress bar container */}
              <div 
                className={styles.skillBarContainer}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} skill level`}
              >
                {/* 
                  Progress bar fill - animates width from 0 to level%
                  Color-coded by category using CSS classes
                  The animation is triggered when isVisible becomes true
                */}
                <div
                  className={`${styles.skillBarFill} ${
                    styles[`category-${skill.category}`]
                  } ${isVisible ? styles.animate : ''}`}
                  style={{
                    // Set the final width based on skill level
                    '--skill-level': `${skill.level}%`,
                    // Stagger the bar fill animation slightly after the card appears
                    animationDelay: `${index * 100 + 200}ms`,
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
