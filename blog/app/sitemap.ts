/**
 * Sitemap Configuration for Blog
 * 
 * Generates a sitemap.xml file for search engine crawlers.
 * This helps search engines discover and index all pages on the site.
 * 
 * Next.js automatically generates the sitemap at build time.
 * In a production environment, you would dynamically generate URLs
 * for all blog posts by reading from your data source.
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog.sudharshinee.dev';
  
  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];
  
  // In production, you would add dynamic blog post URLs here
  // Example:
  // const posts = await getAllPosts();
  // const postUrls = posts.map(post => ({
  //   url: `${baseUrl}/posts/${post.slug}`,
  //   lastModified: new Date(post.date),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));
  
  return routes;
}
