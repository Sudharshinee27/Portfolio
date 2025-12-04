/**
 * Performance Optimization Utilities
 * 
 * This module provides utilities for optimizing performance:
 * - Lazy loading components and content
 * - Intersection Observer hooks
 * - Image optimization helpers
 * - Code splitting utilities
 */

'use client';

import React, { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Custom Hook: useLazyLoad
 * 
 * Implements lazy loading using Intersection Observer API
 * Triggers callback when element enters viewport
 * 
 * @param threshold - Percentage of element that must be visible (0.0 to 1.0)
 * @param rootMargin - Margin around root (e.g., '50px' to trigger earlier)
 * @param triggerOnce - Whether to disconnect observer after first trigger
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 * 
 * @example
 * const { ref, isVisible } = useLazyLoad(0.1, '50px', true);
 * return <div ref={ref}>{isVisible && <HeavyComponent />}</div>;
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
): { ref: RefObject<T>; isVisible: boolean } {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create Intersection Observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Disconnect observer after first trigger if triggerOnce is true
          // This improves performance by removing unnecessary observations
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // If not triggerOnce, allow element to become invisible again
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup: disconnect observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Custom Hook: useIntersectionObserver
 * 
 * More flexible Intersection Observer hook with callback support
 * Useful for triggering custom actions when element enters viewport
 * 
 * @param callback - Function to call when intersection state changes
 * @param options - IntersectionObserver options
 * @returns ref - Ref to attach to the observed element
 * 
 * @example
 * const ref = useIntersectionObserver(
 *   (entry) => {
 *     if (entry.isIntersecting) {
 *       console.log('Element is visible!');
 *     }
 *   },
 *   { threshold: 0.5 }
 * );
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return ref;
}

/**
 * Debounce function for performance optimization
 * Delays execution of a function until after a specified time has elapsed
 * since the last time it was invoked
 * 
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait before executing
 * @returns Debounced function
 * 
 * @example
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query);
 * }, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Ensures a function is called at most once in a specified time period
 * 
 * @param func - Function to throttle
 * @param limit - Milliseconds between allowed executions
 * @returns Throttled function
 * 
 * @example
 * const throttledScroll = throttle(() => {
 *   handleScroll();
 * }, 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Preload image utility
 * Preloads an image to improve perceived performance
 * 
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 * 
 * @example
 * await preloadImage('/hero-image.jpg');
 * // Image is now cached and will load instantly
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Check if user prefers reduced motion
 * Respects accessibility preferences for animations
 * 
 * @returns boolean - True if user prefers reduced motion
 * 
 * @example
 * const shouldAnimate = !prefersReducedMotion();
 * if (shouldAnimate) {
 *   element.classList.add('animate');
 * }
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimal image sizes for responsive images
 * Calculates appropriate sizes attribute for Next.js Image component
 * 
 * @param breakpoints - Object mapping breakpoints to sizes
 * @returns sizes string for Next.js Image component
 * 
 * @example
 * const sizes = getImageSizes({
 *   mobile: '100vw',
 *   tablet: '50vw',
 *   desktop: '33vw'
 * });
 * <Image src="..." sizes={sizes} />
 */
export function getImageSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { mobile = '100vw', tablet = '50vw', desktop = '33vw' } = breakpoints;
  
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

/**
 * Lazy load component wrapper
 * Higher-order component for lazy loading
 * 
 * Note: For JSX usage, import from a component file instead.
 * This is a utility function that returns the necessary hooks.
 * 
 * @example
 * // Create a wrapper component:
 * 'use client';
 * import { useLazyLoad } from '@/lib/performance';
 * 
 * export function LazyLoadWrapper({ children, threshold, rootMargin, fallback }) {
 *   const { ref, isVisible } = useLazyLoad(threshold, rootMargin);
 *   return <div ref={ref}>{isVisible ? children : fallback}</div>;
 * }
 */

/**
 * Performance monitoring utilities
 */

/**
 * Measure component render time
 * Useful for identifying performance bottlenecks
 * 
 * @param componentName - Name of component being measured
 * @param callback - Function to execute and measure
 * 
 * @example
 * measureRenderTime('HeavyComponent', () => {
 *   // Component render logic
 * });
 */
export function measureRenderTime(
  componentName: string,
  callback: () => void
): void {
  if (typeof window === 'undefined' || !window.performance) return;

  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  
  console.log(
    `[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`
  );
}

/**
 * Report Web Vitals
 * Logs Core Web Vitals for performance monitoring
 * 
 * @param metric - Web Vitals metric object
 * 
 * @example
 * // In app/layout.tsx or _app.tsx
 * export function reportWebVitals(metric) {
 *   reportWebVitals(metric);
 * }
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }
  
  // In production, you might want to send to analytics
  // Example: sendToAnalytics(metric);
}
