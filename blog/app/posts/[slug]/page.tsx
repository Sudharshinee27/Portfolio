import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import PostContent from '@/app/components/PostContent';
import styles from './page.module.css';

/**
 * Generate static params for all blog posts
 * This enables static generation of post pages at build time
 * 
 * Requirements: 6.2, 6.6
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for each post page
 * Improves SEO and social sharing with comprehensive meta tags
 * 
 * Requirements: 6.6, 7.4, 7.5
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category, 'blog', 'article'],
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Sudharshinee S K',
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `/posts/${slug}`,
      siteName: 'Blog - Sudharshinee S K',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  };
}

/**
 * Blog Post Detail Page
 * 
 * Features:
 * - Dynamic routing based on post slug
 * - Page transition animations when navigating to posts
 * - Fade-in animations for post content
 * - Theme switching works correctly (inherited from layout)
 * - Static generation for optimal performance
 * - SEO-optimized with metadata
 * 
 * Requirements: 3.3, 5.4, 5.5, 6.2
 */
export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Fetch post data by slug
  const post = getPostBySlug(slug);
  
  // Show 404 if post not found
  if (!post) {
    notFound();
  }
  
  return (
    <main className={styles.main}>
      {/* Page transition wrapper with animation */}
      <div className={styles.pageTransition}>
        {/* Render post content with all metadata */}
        <PostContent
          title={post.title}
          content={post.content}
          date={post.date}
          category={post.category}
          readTime={post.readTime}
          author={post.author}
          tags={post.tags}
        />
      </div>
    </main>
  );
}
