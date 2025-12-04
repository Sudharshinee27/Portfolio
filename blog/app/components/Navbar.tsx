'use client';

/**
 * Navbar Component
 * 
 * A responsive navigation bar with:
 * - Sticky positioning with backdrop blur
 * - Smooth underline hover animations on links
 * - Mobile-responsive hamburger menu with slide-in animation
 * - Integrated theme toggle button
 */

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Toggle mobile menu open/closed state
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu when a link is clicked
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        {/* Logo/Brand */}
        <Link href="/" className={styles.logo} aria-label="Blog home">
          <span className={styles.logoText}>Blog</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={styles.navLinks} role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={styles.navLink}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Theme Toggle + Mobile Menu Button */}
        <div className={styles.navActions}>
          {/* Theme Toggle - visible on all screen sizes */}
          <ThemeToggle />

          {/* Hamburger Menu Button - visible only on mobile */}
          <button
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - slides in from right when open */}
      <div 
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className={styles.mobileNavLinks} role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay - darkens background when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </nav>
  );
}
