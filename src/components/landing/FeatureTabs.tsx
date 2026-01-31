import { useState } from 'react';
import {
  Palette,
  Search,
  Zap,
  LayoutGrid,
  Globe,
  Copy,
  Check,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}

interface TabContent {
  title: string;
  content: string;
}

const tabContent: Record<string, TabContent> = {
  theming: {
    title: 'Design Tokens & Dark Mode',
    content:
      "Complete design system using Tailwind v4's CSS-first configuration with built-in dark mode. Semantic color tokens, system preference detection, and localStorage persistence.",
  },
  seo: {
    title: 'Automated SEO Handling',
    content:
      "Strictly typed metadata injection for every page with automatic OG image generation. Includes sitemap, robots.txt, and JSON-LD structured data.",
  },
  perf: {
    title: 'Zero JS by Default',
    content:
      "Astro's island architecture ensures your pages ship 0kb of JavaScript unless explicitly interactive. Optimized for Core Web Vitals.",
  },
  components: {
    title: 'Type-Safe Components',
    content:
      'TypeScript-first UI primitives with full prop validation and IDE autocompletion. Includes buttons, inputs, cards, modals, and more.',
  },
  i18n: {
    title: 'i18n Ready',
    content:
      'Add multi-language support with the --i18n flag. Includes type-safe translations, automatic locale detection, and SEO-friendly URL structures.',
  },
  content: {
    title: 'Content & Search',
    content:
      'Type-safe content collections with Zod schemas, MDX support, RSS feeds, and Pagefind integration for lightning-fast static search.',
  },
};

const codeExamples: Record<
  string,
  { code: string; filename: string; lang: 'css' | 'astro' | 'typescript' | 'javascript' }
> = {
  theming: {
    lang: 'css',
    code: `/* src/styles/tokens/colors.css */
:root {
  /* Brand Scale - International Orange */
  --brand-500: oklch(62.5% 0.22 38);
  --brand-600: oklch(53.2% 0.19 38);

  /* Semantic Tokens - Light Mode */
  --background: var(--gray-0);
  --foreground: var(--gray-900);
  --border: var(--gray-200);
  --primary: var(--gray-900);
  --accent: var(--brand-500);
}

/* Dark Mode */
.dark {
  --background: var(--gray-950);
  --foreground: var(--gray-50);
  --border: var(--gray-800);
  --primary: var(--gray-0);
}`,
    filename: 'src/styles/tokens/colors.css',
  },
  seo: {
    lang: 'astro',
    code: `---
// src/components/seo/SEO.astro
import { SEO as AstroSEO } from 'astro-seo';
import siteConfig from '@/config/site.config';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);

// Auto-generate OG image if none provided
const ogImage = image || \`/og/\${Astro.url.pathname}.png\`;
---

<AstroSEO
  title={title}
  description={description}
  canonical={canonicalURL.toString()}
  openGraph={{ basic: { title, image: ogImage } }}
/>`,
    filename: 'src/components/seo/SEO.astro',
  },
  perf: {
    lang: 'astro',
    code: `---
// src/pages/index.astro
import Hero from '../components/landing/Hero.astro';
import PricingCalculator from '../components/PricingCalculator.tsx';
---

<!-- Static HTML - ships 0kb JS -->
<Hero />

<!-- Hydrates only when visible in viewport -->
<PricingCalculator client:visible />

<!-- Hydrates only on user interaction -->
<Newsletter client:idle />

<!-- Hydrates only on specific media query -->
<MobileMenu client:media="(max-width: 768px)" />`,
    filename: 'src/pages/index.astro',
  },
  components: {
    lang: 'typescript',
    code: `// src/components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children }, ref) => (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size])}
      disabled={loading}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
);`,
    filename: 'src/components/ui/Button.tsx',
  },
  i18n: {
    lang: 'typescript',
    code: `// src/i18n/config.ts (with --i18n flag)
export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
} as const;

export const defaultLang = 'en';

// src/i18n/translations/en.ts
export default {
  'nav.home': 'Home',
  'nav.about': 'About',
  'hero.title': 'Ship faster with Velocity',
  'hero.subtitle': 'The modern Astro starter',
} as const;

// Usage in components
import { t } from '@/i18n';
const title = t('hero.title'); // "Ship faster..."`,
    filename: 'src/i18n/config.ts',
  },
  content: {
    lang: 'typescript',
    code: `// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      author: z.string().default('Team'),
      image: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
// + Pagefind indexes all content at build time`,
    filename: 'src/content.config.ts',
  },
};

// Simple syntax highlighter
function highlightCode(code: string, lang: string): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;

    const addToken = (text: string, className?: string) => {
      if (text) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className={className}>
            {text}
          </span>
        );
      }
    };

    // Process the line character by character with regex patterns
    while (remaining.length > 0) {
      let matched = false;

      // Comments (// and /* */)
      const commentMatch = remaining.match(/^(\/\/.*|\/\*[\s\S]*?\*\/)/);
      if (commentMatch) {
        addToken(commentMatch[0], 'text-foreground-muted italic');
        remaining = remaining.slice(commentMatch[0].length);
        matched = true;
        continue;
      }

      // HTML comments
      const htmlCommentMatch = remaining.match(/^(<!--[\s\S]*?-->)/);
      if (htmlCommentMatch) {
        addToken(htmlCommentMatch[0], 'text-foreground-muted italic');
        remaining = remaining.slice(htmlCommentMatch[0].length);
        matched = true;
        continue;
      }

      // Strings (single, double, template)
      const stringMatch = remaining.match(/^(['"`])(?:(?!\1)[^\\]|\\.)*\1/);
      if (stringMatch) {
        addToken(stringMatch[0], 'text-green-600 dark:text-green-400');
        remaining = remaining.slice(stringMatch[0].length);
        matched = true;
        continue;
      }

      // Astro frontmatter delimiters
      if (remaining.startsWith('---')) {
        addToken('---', 'text-purple-600 dark:text-purple-400 font-semibold');
        remaining = remaining.slice(3);
        matched = true;
        continue;
      }

      // HTML/JSX tags
      const tagMatch = remaining.match(/^(<\/?[\w-]+|>|\/>)/);
      if (tagMatch) {
        addToken(tagMatch[0], 'text-pink-600 dark:text-pink-400');
        remaining = remaining.slice(tagMatch[0].length);
        matched = true;
        continue;
      }

      // CSS at-rules (@theme, @import, etc.)
      const atRuleMatch = remaining.match(/^(@[\w-]+)/);
      if (atRuleMatch) {
        addToken(atRuleMatch[0], 'text-purple-600 dark:text-purple-400 font-semibold');
        remaining = remaining.slice(atRuleMatch[0].length);
        matched = true;
        continue;
      }

      // Keywords
      const keywordMatch = remaining.match(
        /^(const|let|var|function|return|import|export|from|interface|type|class|extends|implements|new|async|await|if|else|for|while|switch|case|break|default|try|catch|finally|throw|typeof|instanceof|in|of|as|readonly|public|private|protected)\b/
      );
      if (keywordMatch) {
        addToken(keywordMatch[0], 'text-purple-600 dark:text-purple-400 font-semibold');
        remaining = remaining.slice(keywordMatch[0].length);
        matched = true;
        continue;
      }

      // Boolean/null
      const boolMatch = remaining.match(/^(true|false|null|undefined)\b/);
      if (boolMatch) {
        addToken(boolMatch[0], 'text-orange-700 dark:text-orange-300');
        remaining = remaining.slice(boolMatch[0].length);
        matched = true;
        continue;
      }

      // Numbers
      const numberMatch = remaining.match(/^(\d+\.?\d*)/);
      if (numberMatch) {
        addToken(numberMatch[0], 'text-orange-700 dark:text-orange-300');
        remaining = remaining.slice(numberMatch[0].length);
        matched = true;
        continue;
      }

      // CSS properties (word followed by colon)
      const cssPropMatch = remaining.match(/^([\w-]+)(:)/);
      if (cssPropMatch && (lang === 'css' || line.includes('{'))) {
        addToken(cssPropMatch[1], 'text-blue-600 dark:text-blue-400');
        addToken(cssPropMatch[2], 'text-foreground-secondary');
        remaining = remaining.slice(cssPropMatch[0].length);
        matched = true;
        continue;
      }

      // CSS functions (var, oklch, etc.)
      const cssFuncMatch = remaining.match(
        /^(var|oklch|rgb|rgba|hsl|hsla|calc|url|clamp|min|max)(\()/
      );
      if (cssFuncMatch) {
        addToken(cssFuncMatch[1], 'text-amber-700 dark:text-amber-300');
        addToken(cssFuncMatch[2], 'text-foreground-secondary');
        remaining = remaining.slice(cssFuncMatch[0].length);
        matched = true;
        continue;
      }

      // Function calls
      const funcMatch = remaining.match(/^([\w]+)(\()/);
      if (funcMatch) {
        addToken(funcMatch[1], 'text-amber-700 dark:text-amber-300');
        addToken(funcMatch[2], 'text-foreground-secondary');
        remaining = remaining.slice(funcMatch[0].length);
        matched = true;
        continue;
      }

      // Type annotations after colon
      const typeMatch = remaining.match(/^(:\s*)([\w<>[\]|&]+)/);
      if (typeMatch) {
        addToken(typeMatch[1], 'text-foreground-secondary');
        addToken(typeMatch[2], 'text-cyan-700 dark:text-cyan-300');
        remaining = remaining.slice(typeMatch[0].length);
        matched = true;
        continue;
      }

      // Default: single character
      if (!matched) {
        addToken(remaining[0], 'text-foreground-secondary');
        remaining = remaining.slice(1);
      }
    }

    return tokens.length > 0 ? tokens : [<span key={lineIndex}> </span>];
  });
}

function CodeBlock({ code, filename, lang }: { code: string; filename: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const highlightedLines = highlightCode(code.trim(), lang);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border-border bg-background-secondary relative w-full overflow-hidden rounded-md border font-mono text-xs shadow-sm">
      {/* Header */}
      <div className="border-border bg-background flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="bg-border-strong h-2 w-2 rounded-full" />
            <div className="bg-border-strong h-2 w-2 rounded-full" />
            <div className="bg-border-strong h-2 w-2 rounded-full" />
          </div>
          <span className="text-foreground-muted font-sans text-[10px] font-medium">
            {filename}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-foreground-muted hover:bg-secondary hover:text-foreground flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-600" strokeWidth={2} />
              <span className="text-green-600">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" strokeWidth={2} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="bg-background overflow-x-auto p-3">
        <pre className="flex flex-col leading-5">
          {highlightedLines.map((lineTokens, i) => (
            <div key={i} className="table-row">
              <span className="text-foreground-subtle table-cell w-6 pr-3 text-right text-[10px] select-none">
                {i + 1}
              </span>
              <span className="table-cell whitespace-pre">{lineTokens}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('theming');

  const tabs: Tab[] = [
    { id: 'theming', label: 'Theming', desc: 'Design tokens & dark mode', icon: Palette },
    { id: 'seo', label: 'SEO & Meta', desc: 'OG images & structured data', icon: Search },
    { id: 'perf', label: 'Performance', desc: 'Zero JS by default', icon: Zap },
    { id: 'components', label: 'Components', desc: 'Type-safe UI primitives', icon: LayoutGrid },
    { id: 'i18n', label: 'i18n Ready', desc: 'Optional multi-language', icon: Globe },
    { id: 'content', label: 'Content', desc: 'Blog, MDX & search', icon: Newspaper },
  ];

  const activeTabContent = tabContent[activeTab];
  const activeCodeExample = codeExamples[activeTab];

  return (
    <section id="features" className="bg-background relative overflow-hidden py-24">
      {/* Decorative logomark watermark */}
      <div
        className="pointer-events-none absolute -top-8 right-8 hidden h-[28rem] w-[28rem] opacity-[0.04] grayscale md:block lg:-top-12 lg:right-24 lg:h-[44rem] lg:w-[44rem] dark:opacity-[0.06]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 90 101" fill="none" className="h-full w-full">
          <path d="M35.1288 23.8398L45.1667 49.4151L56.2482 23.8398H87.1082C86.5647 23.3764 85.9776 22.9637 85.3616 22.5944L48.6165 0.704798C46.377 -0.0699896 43.4273 -0.439281 41.2675 0.842377L3.36286 23.3692C3.13819 23.5067 2.92801 23.666 2.72508 23.8326H35.1288V23.8398Z" fill="currentColor"/>
          <path d="M0.144951 28.8578C0.079723 29.2851 0.0434853 29.7123 0.0434853 30.1323L0 72.036C0 76.1778 1.95684 78.3936 5.26172 80.3631L39.4919 100.703L0.144951 28.8578Z" fill="currentColor"/>
          <path d="M89.9203 28.7058L50.0588 101L86.6661 79.1539C88.7027 77.9374 90 75.0265 90 72.6442L89.9783 29.6037C89.9783 29.2923 89.9493 28.9954 89.913 28.6985L89.9203 28.7058Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">
            Everything you need.
            <br />
            <span className="text-brand-500">Nothing you don't.</span>
          </h2>
          <p className="text-foreground-muted mt-4 max-w-2xl text-lg">
            We stripped away the bloat and kept the primitives that actually speed up development
            for agencies and freelancers.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-2 lg:col-span-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex flex-col items-start rounded-md p-4 text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-secondary ring-border shadow-sm ring-1'
                    : 'hover:bg-background-secondary hover:pl-5'
                }`}
              >
                <span
                  className={`font-display flex items-center gap-2 text-base font-bold ${
                    activeTab === tab.id
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400'
                  }`}
                >
                  <tab.icon
                    className={`h-5 w-5 ${activeTab === tab.id ? 'text-brand-500' : 'text-foreground-subtle group-hover:text-brand-500'}`}
                    strokeWidth={2}
                  />
                  {tab.label}
                </span>
                <span className="text-foreground-muted mt-1 pl-7 text-sm">{tab.desc}</span>
              </button>
            ))}
          </div>

          {/* Content Preview */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <h3 className="text-foreground text-xl font-bold">{activeTabContent.title}</h3>
              <p className="text-foreground-muted mt-2">{activeTabContent.content}</p>
            </div>
            <CodeBlock
              code={activeCodeExample.code}
              filename={activeCodeExample.filename}
              lang={activeCodeExample.lang}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureTabs;
