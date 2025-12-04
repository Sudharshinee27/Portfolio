/**
 * Sitemap Configuration for Portfolio
 * 
 * Generates a sitemap.xml file for search engine crawlers.
 * This helps search engines discover and index all pages on the site.
 * 
 * Next.js automatically generates the sitemap at build time.
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sudharshinee.dev';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
