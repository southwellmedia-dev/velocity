<p align="center">
  <img src="public/velocity-lightmode.svg" alt="Velocity" width="370" />
</p>

<p align="center">
  <strong>Astro 6 Boilerplate</strong> — A production-ready starter template built on Astro 6 and Tailwind CSS v4.
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-6.0-bc52ee?logo=astro&logoColor=white" alt="Astro" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e" alt="License" /></a>
</p>

---

## Overview

Velocity accelerates Astro project delivery with a comprehensive foundation that includes a design token system, 24 UI components, SEO optimization, dynamic OG image generation, and content management — built on Astro 6 (beta) and Tailwind CSS v4.

### Key Features

| Feature | Description |
|---------|-------------|
| **Astro 6** | Latest version with Content Layer API, security features, and performance optimizations |
| **Tailwind CSS v4** | CSS-first configuration with OKLCH color system and fluid typography |
| **Design Tokens** | Three-tier token architecture (reference → semantic → component) |
| **24 UI Components** | Accessible, composable primitives with TypeScript support |
| **SEO Toolkit** | Meta tags, JSON-LD structured data, sitemap, and robots.txt |
| **Dynamic OG Images** | Auto-generated Open Graph images using Satori |
| **Dark Mode** | System preference detection with localStorage persistence |
| **Content Collections** | Type-safe blog, pages, authors, and FAQs with Zod validation |
| **API Routes** | Contact form and newsletter endpoints with validation |
| **React Islands** | Optional client-side interactivity where needed |

### Internationalization (i18n)

i18n support is available through the **[create-velocity-astro](https://github.com/southwellmedia/create-velocity-astro)** CLI. The base boilerplate is i18n-ready with locale-aware content collection schemas — run the CLI with the i18n option to add full translation support, language routing, and the LanguageSwitcher component.

---

## Quick Start

### Prerequisites

- **Node.js 22.12.0+** (required for Astro 6)
- **pnpm 9.x** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/southwellmedia/velocity.git my-project
cd my-project

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

Visit `http://localhost:4321` to see your site.

### Using the CLI (Recommended)

For the full experience including i18n support:

```bash
pnpm create velocity-astro my-project
```

The CLI provides interactive prompts for optional features like i18n, additional components, and deployment configurations.

---

## Project Structure

```
velocity/
├── public/                  # Static assets (fonts, favicon)
├── src/
│   ├── assets/              # Images and icons (processed by Astro)
│   ├── components/
│   │   ├── ui/              # Primitive components (Button, Input, Card...)
│   │   ├── patterns/        # Composed components (Forms, Cards)
│   │   ├── layout/          # Header, Footer, Navigation, ThemeToggle
│   │   ├── seo/             # SEO, JsonLd, Breadcrumbs
│   │   ├── blog/            # Blog-specific components
│   │   └── landing/         # Landing page components
│   ├── content/             # Content collections
│   │   ├── blog/            # Blog posts (en/, es/, fr/)
│   │   ├── authors/         # Author profiles
│   │   └── faqs/            # FAQ entries
│   ├── layouts/             # Page layouts
│   ├── lib/                 # Utilities (schema, cn, og)
│   ├── pages/               # Routes and API endpoints
│   │   ├── api/             # Contact, newsletter endpoints
│   │   ├── og/              # Dynamic OG image generation
│   │   └── blog/            # Blog routes
│   ├── styles/              # Global CSS and design tokens
│   │   └── tokens/          # colors.css, typography.css, spacing.css
│   └── config/              # Site and navigation configuration
├── astro.config.mjs         # Astro configuration
├── package.json
└── tsconfig.json
```

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run Astro type checker |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm test` | Run Vitest tests |
| `pnpm test:e2e` | Run Playwright E2E tests |

---

## Configuration

### Site Configuration

Edit `src/config/site.config.ts`:

```typescript
const siteConfig = {
  name: 'Your Site Name',
  description: 'Your site description for SEO',
  url: 'https://yoursite.com',
  ogImage: '/og/index.png',
  author: 'Your Name',
  email: 'hello@yoursite.com',
  twitter: {
    site: '@yourhandle',
    creator: '@yourhandle',
  },
};
```

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
# Required
SITE_URL=https://yoursite.com

# Optional - Analytics
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-XXXXXXX

# Optional - Verification
GOOGLE_SITE_VERIFICATION=your-code
BING_SITE_VERIFICATION=your-code
```

---

## Design System

Velocity uses a three-tier design token system with OKLCH colors for perceptual uniformity.

### Customizing Brand Colors

Edit `src/styles/tokens/colors.css`:

```css
:root {
  /* Change the hue (250) to shift your entire brand palette */
  --ref-brand-500: oklch(58% 0.18 250);

  /* Full palette from 50-950 updates automatically */
}
```

Use [oklch.com](https://oklch.com) to generate palettes.

### Using Design Tokens

```astro
<!-- Tailwind utilities (recommended) -->
<div class="bg-background text-foreground">
  <h1 class="text-primary font-display">Hello</h1>
</div>

<!-- CSS custom properties -->
<style>
  .custom {
    background: var(--sem-bg-primary);
  }
</style>
```

### Dark Mode

Dark mode toggles automatically with the `.dark` class. Use the included `ThemeToggle` component:

```astro
---
import ThemeToggle from '@/components/layout/ThemeToggle.astro';
---

<ThemeToggle />
```

---

## Components

Velocity includes 24 accessible, composable UI components.

### Core Components

| Component | Variants | Description |
|-----------|----------|-------------|
| Button | primary, secondary, outline, ghost, destructive | Interactive button with loading state |
| Input | text, email, password, search | Form input with label, error, hint |
| Textarea | - | Multi-line text input |
| Select | - | Dropdown selection |
| Checkbox | - | Boolean toggle with indeterminate |
| Radio | - | Single selection from group |
| Card | - | Content container with padding/shadow |
| Badge | default, success, warning, error | Status indicators |
| Alert | info, success, warning, error | Dismissible notifications |
| Dialog | - | Modal overlay |
| Dropdown | - | Menu with trigger |
| Tabs | - | Tabbed content panels |
| Tooltip | top, bottom, left, right | Contextual hints |
| Avatar | - | User images with fallback |
| Skeleton | - | Loading placeholders |

### Usage Example

```astro
---
import { Button, Input, Card } from '@/components/ui';
---

<Card>
  <Input label="Email" type="email" name="email" required />
  <Button variant="primary">Submit</Button>
</Card>
```

View all components at `/components` in development.

---

## Content Management

### Blog Posts

Create posts in `src/content/blog/[locale]/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO"
publishedAt: 2026-01-30
author: "Author Name"
tags: ["astro", "tutorial"]
locale: en
---

Your content here...
```

### Querying Content

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
---
```

---

## SEO

### Automatic Features

- **Meta tags**: Title, description, canonical URL
- **Open Graph**: Complete OG tags for social sharing
- **Twitter Cards**: Large image cards
- **JSON-LD**: WebSite, Organization, BlogPosting, Breadcrumb, FAQ schemas
- **Sitemap**: Auto-generated at `/sitemap-index.xml`
- **robots.txt**: Dynamic generation with sitemap reference
- **OG Images**: Auto-generated for all pages and blog posts

### Using the SEO Component

```astro
---
import SEO from '@/components/seo/SEO.astro';
---

<head>
  <SEO
    title="Page Title"
    description="Page description"
  />
</head>
```

### Dynamic OG Images

OG images are automatically generated at `/og/[slug].png`. The SEO component references these automatically. Customize the design in `src/lib/og.ts`.

---

## API Routes

### Contact Form

**POST** `/api/contact`

```typescript
// Request (FormData)
{
  name: string,      // 2-100 chars
  email: string,     // Valid email
  subject: string,   // Required
  message: string,   // 10-5000 chars
  honeypot: string   // Must be empty (spam check)
}

// Response
{ success: true }
// or
{ success: false, errors: { field: ["message"] } }
```

### Newsletter

**POST** `/api/newsletter`

```typescript
// Request (FormData)
{ email: string }

// Response
{ success: true }
// or
{ success: false, error: "message" }
```

---

## Deployment

Configuration files included for major platforms.

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Cloudflare Pages

```bash
wrangler pages deploy dist
```

### Static Export

Build outputs to `dist/` for any static host:

```bash
pnpm build
```

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## Performance

Velocity is optimized for Core Web Vitals:

- **Lighthouse Score**: 95+ across all categories
- **Zero JavaScript** by default (islands architecture)
- **Optimized fonts** with `font-display: swap`
- **Image optimization** via Astro's built-in processing
- **Prefetching** for instant page transitions

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting (`pnpm lint`) and type checking (`pnpm check`) before submitting.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Links

- [CLI Tool](https://github.com/southwellmedia/create-velocity-astro)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

**Built & maintained by [Southwell Media](https://southwellmedia.com)**
