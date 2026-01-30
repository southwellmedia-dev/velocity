export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'nav.home', href: '/' },
  { label: 'nav.about', href: '/about' },
  { label: 'nav.blog', href: '/blog' },
  { label: 'nav.contact', href: '/contact' },
];

export const footerNav: NavItem[] = [
  { label: 'footer.privacy', href: '/privacy' },
  { label: 'footer.terms', href: '/terms' },
];

export const socialNav = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/yourhandle',
    icon: 'twitter',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourorg',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/yourcompany',
    icon: 'linkedin',
  },
];
