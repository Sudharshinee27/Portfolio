import Image from 'next/image';
import styles from './Hero.module.css';

// TypeScript interfaces for Hero component props
interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

interface HeroProps {
  name: string;
  title: string;
  description: string;
  contactInfo: ContactInfo;
}

export default function Hero({ name, title, description, contactInfo }: HeroProps) {
  return (
    // Hero section with animated gradient background
    // The gradientShift animation creates a moving gradient effect
    <section className={styles.hero} aria-label="Introduction and contact information">
      <div className={styles.heroContent}>
        {/* Main heading with fade-in animation on mount */}
        <div className={styles.heroText}>
          {/* Name appears with fade-in effect */}
          <h1 className={styles.heroName}>
            {name}
          </h1>

          {/* Title with typewriter animation effect */}
          {/* The typewriter class applies a typing animation to reveal text character by character */}
          <h2 className={styles.heroTitle}>
            <span className={styles.typewriter}>{title}</span>
          </h2>

          {/* Description with delayed fade-in for staggered appearance */}
          <p className={styles.heroDescription}>
            {description}
          </p>

          {/* Contact info with floating animation for visual interest */}
          {/* The float animation creates a gentle up-and-down motion */}
          <div className={styles.contactInfo} role="list" aria-label="Contact information">
            <a
              href={`tel:${contactInfo.phone}`}
              className={styles.contactItem}
              aria-label={`Call ${contactInfo.phone}`}
              role="listitem"
            >
              <span aria-hidden="true">📞</span> {contactInfo.phone}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className={styles.contactItem}
              aria-label={`Email ${contactInfo.email}`}
              role="listitem"
            >
              <span aria-hidden="true">✉️</span> {contactInfo.email}
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              aria-label="Visit LinkedIn profile (opens in new tab)"
              role="listitem"
            >
              <span aria-hidden="true">💼</span> LinkedIn
            </a>
            <span className={styles.contactItem} role="listitem" aria-label={`Location: ${contactInfo.location}`}>
              <span aria-hidden="true">📍</span> {contactInfo.location}
            </span>
          </div>
        </div>

        {/* Profile element with floating animation */}
        {/* This creates an engaging visual element that draws attention */}
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.profileCircle}>
            <div className={styles.profileInner}>
              <Image
                src="/image/WhatsApp Image 2025-12-03 at 17.02.15_f9562f4c.jpg"
                alt="Sudharshinee S K"
                className={styles.profileImage}
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with pulse animation to guide users */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Scroll to explore</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}
