'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';

// Interface defining the structure of a project
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className={styles.projectsSection} id="projects" aria-labelledby="projects-heading">
      <div className={styles.container}>
        <h2 id="projects-heading" className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsGrid} role="list" aria-label="Project portfolio">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual project card component with 3D flip animation
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer to trigger fade-in animation when card enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect observer after animation triggers to improve performance
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.cardWrapper} ${isVisible ? styles.visible : ''}`}
      style={{
        // Staggered animation delay based on card index for visual interest
        animationDelay: `${index * 0.1}s`,
      }}
      role="listitem"
    >
      {/* 
        3D flip card structure:
        - cardInner: Container that rotates on hover
        - cardFront: Visible by default, shows title and brief description
        - cardBack: Hidden by default, rotates into view on hover with details
      */}
      <article 
        className={styles.card}
        tabIndex={0}
        aria-labelledby={`project-title-${project.id}`}
        aria-describedby={`project-desc-${project.id}`}
      >
        <div className={styles.cardInner}>
          {/* Front side of the card */}
          <div className={styles.cardFront}>
            <h3 id={`project-title-${project.id}`} className={styles.projectTitle}>{project.title}</h3>
            <p id={`project-desc-${project.id}`} className={styles.projectDescription}>{project.description}</p>
            <div className={styles.hoverHint} aria-hidden="true">Hover to see details</div>
          </div>

          {/* Back side of the card - revealed on hover */}
          <div className={styles.cardBack} aria-label="Project details">
            <h3 className={styles.projectTitle}>{project.title}</h3>
            
            <div className={styles.detailsSection}>
              <h4 className={styles.detailsHeading}>Technologies</h4>
              <div className={styles.techTags} role="list" aria-label="Technologies used">
                {project.technologies.map((tech, i) => (
                  <span key={i} className={styles.techTag} role="listitem">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4 className={styles.detailsHeading}>Highlights</h4>
              <ul className={styles.highlightsList} aria-label="Project highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
