export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
}

const siteConfig: SiteConfig = {
  name: 'Velocity',
  description: 'A modern website built with Astro and Tailwind CSS',
  url: import.meta.env.SITE_URL || 'https://example.com',
  ogImage: '/og-default.png',
  author: 'Southwell Media',
  // Demo contact info - replace with your actual business details
  email: 'hello@example.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'Dallas',
    state: 'TX',
    zip: '75001',
    country: 'US',
  },
  socialLinks: [
    'https://github.com/southwellmedia',
  ],
  // Twitter metadata - update with your actual handles or remove
  // twitter: {
  //   site: '@yourhandle',
  //   creator: '@yourhandle',
  // },
  verification: {
    google: import.meta.env.GOOGLE_SITE_VERIFICATION,
    bing: import.meta.env.BING_SITE_VERIFICATION,
  },
};

export default siteConfig;
