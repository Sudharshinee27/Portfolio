/**
 * LazyLoadWrapper Component
 * 
 * A reusable wrapper component for lazy loading content using Intersection Observer.
 * Renders children only when they scroll into view, improving initial page load performance.
 * 
 * @example
 * <LazyLoadWrapper threshold={0.1} fallback={<Skeleton />}>
 *   <HeavyComponent />
 * </LazyLoadWrapper>
 */

'use client';

import { useLazyLoad } from '@/lib/performance';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export function LazyLoadWrapper({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
}: LazyLoadWrapperProps) {
  const { ref, isVisible } = useLazyLoad(threshold, rootMargin);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
}
