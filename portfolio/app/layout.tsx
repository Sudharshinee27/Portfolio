import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

/**
 * Font Configuration
 * - Inter: Used for body text and general content
 * - Poppins: Used for headings and emphasis
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

/**
 * Metadata Configuration
 * Defines SEO metadata, Open Graph tags, and social sharing information
 */
export const metadata: Metadata = {
  title: {
    default: 'Sudharshinee S K - Pre-Final Year CSE Student | Front-End Developer',
    template: '%s | Sudharshinee S K',
  },
  description:
    'Professional portfolio of Sudharshinee S K - Pre-Final Year CSE Student and Front-End Developer with expertise in HTML, CSS, JavaScript, and Node.js. Experienced in building interactive web applications.',
  keywords: [
    'Front-End Developer',
    'CSE Student',
    'Web Development',
    'HTML',
    'CSS',
    'JavaScript',
    'Node.js',
    'Portfolio',
    'Sudharshinee S K',
    'Python',
    'Java',
  ],
  authors: [{ name: 'Sudharshinee S K' }],
  creator: 'Sudharshinee S K',
  publisher: 'Sudharshinee S K',
  metadataBase: new URL('https://sudharshinee.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sudharshinee.dev',
    title: 'Sudharshinee S K - Pre-Final Year CSE Student | Front-End Developer',
    description:
      'Professional portfolio showcasing skills, projects, and experience in web development.',
    siteName: 'Sudharshinee S K Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sudharshinee S K - Front-End Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudharshinee S K - Front-End Developer',
    description: 'Professional portfolio showcasing skills and projects',
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
 * Viewport Configuration
 * Moved from metadata as per Next.js 15 requirements
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root Layout Component
 * 
 * Provides the base HTML structure for the entire portfolio application
 * - Configures fonts using Next.js font optimization
 * - Sets up smooth scroll behavior via globals.css
 * - Applies responsive viewport settings
 * - Includes accessibility attributes
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        {/* Skip to main content link for keyboard navigation accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
