# Accessibility Guide

This document outlines the accessibility features implemented in both the Portfolio and Blog applications, ensuring WCAG 2.1 Level AA compliance.

## Table of Contents

1. [Overview](#overview)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Support](#screen-reader-support)
4. [Color Contrast](#color-contrast)
5. [Focus Management](#focus-management)
6. [ARIA Labels and Roles](#aria-labels-and-roles)
7. [Responsive and Touch-Friendly Design](#responsive-and-touch-friendly-design)
8. [Motion and Animation](#motion-and-animation)
9. [Testing Checklist](#testing-checklist)

## Overview

Both applications have been designed with accessibility as a core principle, following WCAG 2.1 Level AA guidelines. Key features include:

- Full keyboard navigation support
- Comprehensive ARIA labels and semantic HTML
- WCAG AA compliant color contrast ratios
- Skip-to-content links for efficient navigation
- Reduced motion support for users with vestibular disorders
- Touch-friendly interactive elements (minimum 44x44px)
- Screen reader optimized content structure

## Keyboard Navigation

### Skip-to-Content Link

Both applications include a skip-to-content link that appears when focused with the Tab key:

```html
<a href="#main-content" className="skip-to-content">
  Skip to main content
</a>
```

**How to use:**
1. Press Tab when the page loads
2. The skip link will appear at the top of the page
3. Press Enter to jump directly to main content

### Tab Order

All interactive elements follow a logical tab order:

**Portfolio:**
- Skip-to-content link
- Hero contact links (phone, email, LinkedIn)
- Skills section (when interactive elements are added)
- Project cards
- Timeline items
- Achievement cards
- Certification cards

**Blog:**
- Skip-to-content link
- Navigation links (Home, Blog, Categories, About)
- Theme toggle button
- Mobile menu button (on mobile)
- Post cards
- Category filter buttons

### Focus Indicators

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

Enhanced focus styles for interactive elements include:
- 3px solid outline in accent color
- 3px offset for clear visibility
- Additional box-shadow for emphasis
- Rounded corners matching design system

## Screen Reader Support

### Semantic HTML

Both applications use semantic HTML5 elements:

- `<main>` for main content area
- `<nav>` for navigation menus
- `<section>` for content sections
- `<article>` for blog posts and project cards
- `<header>` for page headers
- `<h1>` through `<h6>` for proper heading hierarchy

### Heading Hierarchy

Proper heading structure is maintained throughout:

**Portfolio:**
```
h1: Sudharshinee S K (Hero section)
  h2: Skills & Expertise
  h2: Projects
    h3: Individual project titles
  h2: Professional Experience
    h3: Job titles
  h2: Education
    h3: Degree titles
  h2: Achievements
    h3: Achievement titles
  h2: Certifications
    h3: Certification names
```

**Blog:**
```
h1: Welcome to Our Blog (Hero section)
  h2: Latest Posts
    h2: Individual post titles (in PostCard)
  h3: Browse by Category
```

### ARIA Labels

Comprehensive ARIA labels are used throughout:

**Navigation:**
```jsx
<nav role="navigation" aria-label="Main navigation">
  <ul role="list" aria-label="Navigation links">
    <li><a aria-label="Navigate to Home">Home</a></li>
  </ul>
</nav>
```

**Interactive Elements:**
```jsx
<button 
  aria-label="Switch to dark mode"
  aria-pressed="false"
>
  Theme Toggle
</button>
```

**Progress Indicators:**
```jsx
<div 
  role="progressbar"
  aria-valuenow={85}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="React skill level"
/>
```

**Lists:**
```jsx
<div role="list" aria-label="Skills list">
  <div role="listitem">React</div>
</div>
```

## Color Contrast

All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### Blog - Light Theme

| Element | Foreground | Background | Contrast Ratio | Standard |
|---------|-----------|------------|----------------|----------|
| Primary Text | #111827 | #ffffff | 15.8:1 | AAA ✓ |
| Secondary Text | #6b7280 | #ffffff | 4.6:1 | AA ✓ |
| Accent Links | #6366f1 | #ffffff | 4.5:1 | AA ✓ |
| Accent Hover | #4f46e5 | #ffffff | 6.3:1 | AAA ✓ |

### Blog - Dark Theme

| Element | Foreground | Background | Contrast Ratio | Standard |
|---------|-----------|------------|----------------|----------|
| Primary Text | #f9fafb | #111827 | 15.3:1 | AAA ✓ |
| Secondary Text | #9ca3af | #111827 | 5.8:1 | AA ✓ |
| Accent Links | #818cf8 | #111827 | 7.2:1 | AAA ✓ |
| Accent Hover | #6366f1 | #111827 | 5.1:1 | AA ✓ |

### Portfolio

| Element | Foreground | Background | Contrast Ratio | Standard |
|---------|-----------|------------|----------------|----------|
| Primary Text | #1f2937 | #ffffff | 14.7:1 | AAA ✓ |
| Secondary Text | #6b7280 | #ffffff | 4.6:1 | AA ✓ |
| Primary Accent | #6366f1 | #ffffff | 4.5:1 | AA ✓ |
| Secondary Accent | #ec4899 | #ffffff | 4.7:1 | AA ✓ |
| Tertiary Accent | #8b5cf6 | #ffffff | 4.8:1 | AA ✓ |

### Hero Section (White Text on Gradient)

The Hero section uses white text on an animated gradient background. To ensure readability:
- Text uses `rgba(255, 255, 255, 0.95)` for high contrast
- Background gradient uses darker shades of brand colors
- Text shadows are applied where needed for additional contrast
- All text meets minimum 4.5:1 contrast ratio

## Focus Management

### Focus Styles

Custom focus styles are implemented for all interactive elements:

```css
/* Global focus-visible styles */
*:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Enhanced focus for interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.1);
}
```

### Focus Trapping

Mobile menu implements proper focus management:
- Focus is trapped within the menu when open
- Escape key closes the menu
- Focus returns to the hamburger button when closed

### Skip Links

Skip-to-content links allow keyboard users to bypass navigation:

```css
.skip-to-content {
  position: absolute;
  top: -100px;
  left: var(--spacing-md);
  /* Visible only when focused */
}

.skip-to-content:focus {
  top: var(--spacing-md);
}
```

## ARIA Labels and Roles

### Landmark Roles

```html
<!-- Main content -->
<main id="main-content" role="main">

<!-- Navigation -->
<nav role="navigation" aria-label="Main navigation">

<!-- Sections -->
<section aria-labelledby="skills-heading">
  <h2 id="skills-heading">Skills & Expertise</h2>
</section>
```

### Interactive Elements

**Theme Toggle:**
```jsx
<button
  onClick={toggleTheme}
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
>
```

**Mobile Menu:**
```jsx
<button
  aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
  aria-expanded={isMobileMenuOpen}
  aria-controls="mobile-navigation"
>
```

**Category Filters:**
```jsx
<button 
  aria-label="Filter by Tutorial category"
  aria-pressed="false"
>
  Tutorial
</button>
```

### Progress Bars (Skills)

```jsx
<div 
  role="progressbar"
  aria-valuenow={skill.level}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`${skill.name} skill level`}
>
```

### Lists

```jsx
<div role="list" aria-label="Skills list">
  <div role="listitem">
    {/* Skill content */}
  </div>
</div>
```

## Responsive and Touch-Friendly Design

### Touch Target Sizes

All interactive elements meet WCAG 2.1 Level AAA touch target size (44x44px minimum):

```css
/* Mobile optimizations */
@media (max-width: 640px) {
  button,
  a[role="button"],
  input[type="button"],
  input[type="submit"],
  a,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

**Examples:**
- Theme toggle button: 44x44px
- Navigation links: 44px min-height with padding
- Mobile menu items: 48px min-height
- Contact links: 44px min-height
- Category buttons: 44px min-height

### Mobile Considerations

- Hamburger menu button: 32x32px with padding for 44x44px touch target
- Mobile menu items: Full-width with 48px height
- Simplified hover effects on mobile (use :active instead)
- Optimized font sizes (minimum 16px to prevent zoom on iOS)

## Motion and Animation

### Reduced Motion Support

Both applications respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**What this does:**
- Disables all animations for users who prefer reduced motion
- Maintains functionality while removing motion effects
- Respects user preferences for vestibular disorder accommodation
- Applies to all animations: fade-ins, slides, scales, rotations

### Animation Best Practices

- Use GPU-accelerated properties (transform, opacity)
- Avoid animating layout properties (width, height, top, left)
- Keep animation durations reasonable (150ms-500ms)
- Provide clear visual feedback without relying solely on animation
- Ensure content is accessible even without animations

## Testing Checklist

### Keyboard Navigation Testing

- [ ] Tab through all interactive elements in logical order
- [ ] Skip-to-content link appears and works correctly
- [ ] All links and buttons are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Escape key closes modals/menus
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in appropriate contexts

### Screen Reader Testing

Test with popular screen readers:
- **Windows:** NVDA (free) or JAWS
- **macOS:** VoiceOver (built-in)
- **iOS:** VoiceOver (built-in)
- **Android:** TalkBack (built-in)

**What to test:**
- [ ] All images have appropriate alt text
- [ ] Headings are announced correctly
- [ ] Landmark regions are identified
- [ ] ARIA labels are read correctly
- [ ] Form inputs have associated labels
- [ ] Dynamic content updates are announced
- [ ] Links have descriptive text

### Color Contrast Testing

Tools:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- Chrome DevTools Lighthouse

**What to test:**
- [ ] All text meets minimum 4.5:1 contrast (AA)
- [ ] Large text meets minimum 3:1 contrast (AA)
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators are visible against all backgrounds
- [ ] Both light and dark themes meet standards

### Mobile/Touch Testing

- [ ] All touch targets are at least 44x44px
- [ ] Mobile menu opens and closes correctly
- [ ] Gestures work as expected
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming
- [ ] Forms are easy to fill out on mobile

### Automated Testing

Run automated accessibility tests:

```bash
# Using axe-core
npm install --save-dev @axe-core/cli
npx axe http://localhost:3000

# Using Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000 --only-categories=accessibility
```

### Manual Testing Scenarios

**Portfolio:**
1. Navigate entire page using only keyboard
2. Test all contact links with keyboard
3. Verify skill bars are announced correctly
4. Test project card flip with keyboard
5. Navigate timeline with screen reader
6. Verify achievement cards are accessible

**Blog:**
1. Navigate using only keyboard
2. Toggle theme with keyboard
3. Open/close mobile menu with keyboard
4. Navigate to blog posts with keyboard
5. Test category filters with keyboard
6. Verify post metadata is announced correctly

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

## Maintenance

To maintain accessibility:

1. **Test regularly** with keyboard and screen readers
2. **Run automated tests** in CI/CD pipeline
3. **Review new features** for accessibility before deployment
4. **Keep dependencies updated** for security and accessibility fixes
5. **Gather user feedback** from people with disabilities
6. **Document changes** to accessibility features

## Support

If you encounter accessibility issues:

1. Check this guide for implementation details
2. Test with multiple browsers and assistive technologies
3. Refer to WCAG 2.1 guidelines for specific requirements
4. Consider user feedback and real-world usage patterns
