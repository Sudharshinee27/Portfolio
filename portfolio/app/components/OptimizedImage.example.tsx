/**
 * Optimized Image Component Examples
 * 
 * This file demonstrates best practices for using Next.js Image component
 * with various use cases in the portfolio application.
 * 
 * Copy and adapt these examples for your specific needs.
 */

import Image from 'next/image';
import { getImageSizes } from '../lib/performance';

/**
 * Example 1: Profile/Avatar Image
 * 
 * Use case: Small, circular profile images
 * - Fixed dimensions
 * - Priority loading (above the fold)
 * - High quality
 */
export function ProfileImage() {
  return (
    <div className="profile-image-container">
      <Image
        src="/images/profile.jpg"
        alt="Profile picture"
        width={200}
        height={200}
        priority // Load immediately (above the fold)
        quality={90} // Higher quality for profile
        className="profile-image"
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

/**
 * Example 2: Hero Background Image
 * 
 * Use case: Full-width hero section background
 * - Responsive sizing
 * - Priority loading
 * - Cover entire container
 */
export function HeroBackgroundImage() {
  return (
    <div className="hero-container" style={{ position: 'relative', height: '100vh' }}>
      <Image
        src="/images/hero-background.jpg"
        alt="Hero background"
        fill // Fill parent container
        priority // Critical above-the-fold image
        quality={85}
        sizes="100vw" // Full viewport width
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Welcome</h1>
      </div>
    </div>
  );
}

/**
 * Example 3: Project Thumbnail
 * 
 * Use case: Project card images in a grid
 * - Lazy loading (below the fold)
 * - Responsive sizes
 * - Consistent aspect ratio
 */
export function ProjectThumbnail({ 
  src, 
  alt, 
  title 
}: { 
  src: string; 
  alt: string; 
  title: string;
}) {
  return (
    <div className="project-card">
      <div className="project-thumbnail">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          loading="lazy" // Lazy load below-the-fold images
          quality={80}
          sizes={getImageSizes({
            mobile: '100vw',
            tablet: '50vw',
            desktop: '33vw'
          })}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <h3>{title}</h3>
    </div>
  );
}

/**
 * Example 4: Skill Icon/Logo
 * 
 * Use case: Small technology logos or icons
 * - Fixed small size
 * - Lazy loading
 * - Transparent backgrounds
 */
export function SkillIcon({ 
  src, 
  name 
}: { 
  src: string; 
  name: string;
}) {
  return (
    <div className="skill-icon">
      <Image
        src={src}
        alt={`${name} logo`}
        width={64}
        height={64}
        loading="lazy"
        quality={90} // Higher quality for small images
        style={{
          objectFit: 'contain', // Preserve aspect ratio
        }}
      />
      <span>{name}</span>
    </div>
  );
}

/**
 * Example 5: Certificate/Achievement Image
 * 
 * Use case: Certificate or achievement images
 * - Lazy loading
 * - Click to enlarge
 * - Placeholder while loading
 */
export function CertificateImage({ 
  src, 
  title 
}: { 
  src: string; 
  title: string;
}) {
  return (
    <div className="certificate-card">
      <Image
        src={src}
        alt={`${title} certificate`}
        width={400}
        height={300}
        loading="lazy"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
      />
      <p>{title}</p>
    </div>
  );
}

/**
 * Example 6: Gallery/Lightbox Image
 * 
 * Use case: Image gallery with thumbnails
 * - Lazy loading thumbnails
 * - High quality for full view
 * - Responsive sizing
 */
export function GalleryImage({ 
  src, 
  alt, 
  onClick 
}: { 
  src: string; 
  alt: string;
  onClick?: () => void;
}) {
  return (
    <button 
      className="gallery-item"
      onClick={onClick}
      style={{ border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        loading="lazy"
        quality={75} // Lower quality for thumbnails
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
      />
    </button>
  );
}

/**
 * Example 7: External Image (from CDN or API)
 * 
 * Use case: Images from external sources
 * - Configure remotePatterns in next.config.js first
 * - Lazy loading
 * - Error handling
 */
export function ExternalImage({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string;
}) {
  return (
    <div className="external-image">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        loading="lazy"
        quality={80}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
        // Add error handling
        onError={(e) => {
          console.error('Image failed to load:', src);
          // Optionally set a fallback image
          e.currentTarget.src = '/images/fallback.jpg';
        }}
      />
    </div>
  );
}

/**
 * Example 8: Responsive Art Direction
 * 
 * Use case: Different images for different screen sizes
 * - Mobile-optimized image
 * - Desktop-optimized image
 * - Uses picture element approach
 */
export function ResponsiveArtDirection() {
  return (
    <div className="responsive-image">
      {/* Mobile image */}
      <div className="mobile-only">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Hero image"
          width={640}
          height={800}
          priority
          quality={85}
        />
      </div>
      
      {/* Desktop image */}
      <div className="desktop-only">
        <Image
          src="/images/hero-desktop.jpg"
          alt="Hero image"
          width={1920}
          height={1080}
          priority
          quality={85}
        />
      </div>
    </div>
  );
}

/**
 * Example 9: Lazy Loading with Intersection Observer
 * 
 * Use case: Manual control over when images load
 * - Custom lazy loading logic
 * - Load when scrolled into view
 */
'use client';

import { useState } from 'react';
import { useLazyLoad } from '../lib/performance';

export function ManualLazyImage({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string;
}) {
  const { ref, isVisible } = useLazyLoad(0.1, '100px');
  const [shouldLoad, setShouldLoad] = useState(false);

  // Load image when visible
  if (isVisible && !shouldLoad) {
    setShouldLoad(true);
  }

  return (
    <div ref={ref} className="lazy-image-container">
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          loading="lazy"
          quality={80}
        />
      ) : (
        <div 
          className="image-placeholder"
          style={{
            width: '800px',
            height: '600px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}

/**
 * Example 10: Optimized Background Pattern
 * 
 * Use case: Repeating background patterns
 * - Small file size
 * - High quality
 * - CSS background approach
 */
export function BackgroundPattern() {
  return (
    <div 
      className="pattern-background"
      style={{
        position: 'relative',
        minHeight: '400px',
      }}
    >
      <Image
        src="/images/pattern.svg"
        alt=""
        fill
        quality={100}
        style={{
          objectFit: 'repeat', // Tile the pattern
          opacity: 0.1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        Content over pattern
      </div>
    </div>
  );
}

/**
 * Configuration Example for next.config.js
 * 
 * Add this to your next.config.js to enable external images:
 * 
 * module.exports = {
 *   images: {
 *     formats: ['image/avif', 'image/webp'],
 *     remotePatterns: [
 *       {
 *         protocol: 'https',
 *         hostname: 'example.com',
 *         pathname: '/images/**',
 *       },
 *       {
 *         protocol: 'https',
 *         hostname: 'cdn.example.com',
 *       },
 *     ],
 *     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
 *     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
 *   },
 * };
 */
