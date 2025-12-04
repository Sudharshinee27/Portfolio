# Performance Optimization Quick Reference

Quick reference for the performance optimizations implemented in Task 18.

---

## 🖼️ Using Next.js Image Component

```tsx
import Image from 'next/image';

// Above-the-fold (priority)
<Image src="/hero.jpg" alt="Hero" width={1200} height={630} priority />

// Below-the-fold (lazy)
<Image src="/project.jpg" alt="Project" width={600} height={400} loading="lazy" />

// Responsive with fill
<Image src="/bg.jpg" alt="Background" fill sizes="100vw" />
```

**See:** `portfolio/app/components/OptimizedImage.example.tsx` for 10 detailed examples

---

## 🔄 Lazy Loading Components

```tsx
import { useLazyLoad } from '@/lib/performance';
import { LazyLoadWrapper } from '@/components/LazyLoadWrapper';

// Hook approach
const { ref, isVisible } = useLazyLoad(0.1, '50px');
<div ref={ref}>{isVisible && <HeavyComponent />}</div>

// Wrapper approach
<LazyLoadWrapper threshold={0.1} fallback={<Skeleton />}>
  <HeavyComponent />
</LazyLoadWrapper>
```

---

## ⚡ CSS Performance (will-change)

```css
/* Animated elements */
.hero {
  animation: gradientShift 8s infinite;
  will-change: background-position;
}

.card {
  transition: transform 0.3s;
  will-change: transform, opacity;
}

/* Remove after animation */
element.style.willChange = 'auto';
```

**Rule:** Only use on elements that will actually animate!

---

## 🎨 Animation Best Practices

```css
/* ✅ Good - GPU accelerated */
.element {
  transform: translateY(-8px);
  opacity: 0.8;
}

/* ❌ Bad - Forces layout recalculation */
.element {
  top: -8px;
  width: 102%;
}
```

---

## 📦 Code Splitting

```tsx
import dynamic from 'next/dynamic';

// Lazy load component
const Heavy = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

---

## 🛠️ Utility Functions

```tsx
import { debounce, throttle, preloadImage } from '@/lib/performance';

// Debounce (wait for pause)
const search = debounce((q) => performSearch(q), 300);

// Throttle (limit frequency)
const scroll = throttle(() => handleScroll(), 100);

// Preload images
await preloadImage('/critical-image.jpg');
```

---

## 📊 Performance Checklist

### Images
- [ ] Use Next.js Image component
- [ ] Set priority for above-the-fold images
- [ ] Use loading="lazy" for below-the-fold
- [ ] Provide appropriate sizes attribute

### Animations
- [ ] Use transform and opacity only
- [ ] Add will-change to animated elements
- [ ] Support prefers-reduced-motion
- [ ] Remove will-change after animation

### Loading
- [ ] Lazy load below-the-fold content
- [ ] Use Intersection Observer
- [ ] Provide loading states
- [ ] Disconnect observers after use

### Bundle
- [ ] Use dynamic imports for heavy components
- [ ] Enable production optimizations in next.config.js
- [ ] Monitor bundle size
- [ ] Split by route

---

## 📚 Full Documentation

- **Portfolio Guide:** `portfolio/PERFORMANCE_OPTIMIZATION_GUIDE.md`
- **Blog Guide:** `blog/PERFORMANCE_OPTIMIZATION_GUIDE.md`
- **Image Examples:** `portfolio/app/components/OptimizedImage.example.tsx`
- **Utilities:** `portfolio/app/lib/performance.ts` & `blog/lib/performance.ts`
- **Summary:** `TASK_18_PERFORMANCE_OPTIMIZATION_SUMMARY.md`

---

## 🎯 Expected Results

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Image size reduction:** 30-50%
- **Smooth 60fps animations**

---

## 🧪 Testing

```bash
# Build and check bundle size
npm run build

# Run Lighthouse audit
# Chrome DevTools > Lighthouse > Generate report

# Test on slow network
# Chrome DevTools > Network > Slow 3G
```

---

## 🚀 Quick Wins

1. **Add priority to hero images** - Instant LCP improvement
2. **Lazy load below-the-fold** - Faster initial load
3. **Use will-change on animations** - Smoother animations
4. **Enable production config** - Smaller bundles

---

**Last Updated:** Task 18 Implementation
**Status:** ✅ Complete
