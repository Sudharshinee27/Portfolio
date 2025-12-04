/**
 * Root Layout Component for Blog Application
 * 
 * This is the main layout wrapper for the entire blog application.
 * It sets up:
 * - Font configuration using next/font for optimized font loading
 * - Global metadata for SEO
 * - Theme provider for light/dark mode switching
 * - Navigation bar component
 * - Proper HTML structure with theme data attribute support
 */

import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/ThemeProvider';
import Navbar from './components/Navbar';

/**
 * Font Configuration
 * 
 * Using next/font for automatic font optimization:
 * - Inter: Primary font for body text (clean, readable)
 * - Poppins: Secondary font for headings (modern, bold)
 * 
 * Benefits of next/font:
 * - Automatic self-hosting of fonts
 * - Zero layout shift with font-display: swap
 * - Optimized loading performance
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

/**
 * Metadata Configuration
 * 
 * Defines metadata for SEO and social sharing.
 * This will be inherited by all pages unless overridden.
 */
export const metadata: Metadata = {
  title: {
    default: 'Blog - Sudharshinee S K',
    template: '%s | Blog - Sudharshinee S K',
  },
  description: 'A modern blog with theme switching capabilities, featuring articles on web development, technology, and more.',
  keywords: [
    'blog',
    'web development',
    'technology',
    'programming',
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'tutorials',
    'tech articles',
  ],
  authors: [{ name: 'Sudharshinee S K' }],
  creator: 'Sudharshinee S K',
  publisher: 'Sudharshinee S K',
  metadataBase: new URL('https://blog.sudharshinee.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.sudharshinee.dev',
    siteName: 'Blog - Sudharshinee S K',
    title: 'Blog - Sudharshinee S K',
    description: 'A modern blog with theme switching capabilities, featuring articles on web development and technology',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog - Sudharshinee S K',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Sudharshinee S K',
    description: 'A modern blog with theme switching capabilities',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

/**
 * Root Layout Component
 * 
 * This component wraps all pages in the application.
 * 
 * Structure:
 * - <html>: Root element with lang attribute and font CSS variables
 * - <body>: Contains font classes for proper font application
 * - <ThemeProvider>: Provides theme context to all child components
 * - <Navbar>: Persistent navigation bar across all pages
 * - {children}: Page-specific content
 * 
 * Note: The theme data attribute is managed by ThemeProvider and applied
 * to the document root dynamically on the client side.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
        {/* Skip to main content link for keyboard navigation accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
