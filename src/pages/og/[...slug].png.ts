import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGImage } from '@/lib/og';
import siteConfig from '@/config/site.config';

// Define static pages that need OG images
const STATIC_PAGES = [
  { slug: 'index', title: siteConfig.name, description: siteConfig.description },
  { slug: 'about', title: 'About', description: `Learn more about ${siteConfig.name}` },
  { slug: 'contact', title: 'Contact', description: `Get in touch with ${siteConfig.name}` },
  { slug: 'blog', title: 'Blog', description: `Latest articles and updates from ${siteConfig.name}` },
  { slug: 'components', title: 'Component Library', description: 'UI component showcase' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all blog posts
  const blogPosts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // Generate paths for blog posts
  const blogPaths = blogPosts.map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: 'article' as const,
    },
  }));

  // Generate paths for static pages
  const staticPaths = STATIC_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: {
      title: page.title,
      description: page.description,
      type: 'website' as const,
    },
  }));

  return [...staticPaths, ...blogPaths];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, type } = props as {
    title: string;
    description?: string;
    type: 'website' | 'article';
  };

  const png = await generateOGImage({
    title,
    description,
    type,
  });

  // Convert Buffer to Uint8Array for Response compatibility
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
