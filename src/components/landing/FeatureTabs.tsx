import { useState } from 'react';
import {
  Palette,
  Search,
  Zap,
  LayoutGrid,
  Globe,
  Copy,
  Check,
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
  design: {
    title: 'CSS-First Design Tokens',
    content:
      "Velocity implements a complete design system using Tailwind v4's new CSS-first configuration. No messy JavaScript config files for theme values.",
  },
  seo: {
    title: 'Automated SEO Handling',
    content:
      "Astro's content collections power strictly typed metadata injection for every page. Social share images are generated automatically.",
  },
  perf: {
    title: 'Zero JS by Default',
    content:
      "We utilize Astro's island architecture to ensure your marketing pages ship 0kb of JavaScript to the client unless explicitly interactive.",
  },
  components: {
    title: 'Type-Safe Components',
    content:
      'Build with confidence using TypeScript-first components. Full prop validation and IDE autocompletion out of the box.',
  },
  i18n: {
    title: 'Built-in Internationalization',
    content:
      'First-class support for multi-language sites with type-safe translations, automatic locale detection, and SEO-friendly URL structures.',
  },
};

const codeExamples: Record<
  string,
  { code: string; filename: string; lang: 'css' | 'astro' | 'typescript' | 'javascript' }
> = {
  design: {
    lang: 'css',
    code: `/* src/styles/theme.css */
@theme {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Manrope', sans-serif;

  --color-brand-500: oklch(0.623 0.214 25.667);
  --color-brand-600: oklch(0.553 0.201 25.667);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Usage in components */
.btn-primary {
  background: var(--color-brand-500);
  font-family: var(--font-display);
}`,
    filename: 'src/styles/theme.css',
  },
  seo: {
    lang: 'astro',
    code: `---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <title>{title} | Velocity</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  <meta property="og:image" content={image} />
</head>`,
    filename: 'src/layouts/Layout.astro',
  },
  perf: {
    lang: 'astro',
    code: `---
// src/pages/index.astro
import Hero from '../components/Hero.astro';
import Calculator from '../components/Calculator.tsx';
---

<!-- Static HTML (0kb JS) -->
<Hero />

<!-- Hydrates only when visible -->
<Calculator client:visible />

<script>
  // Optional: Performance observer
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(console.log);
  });
  observer.observe({ entryTypes: ['lcp'] });
</script>`,
    filename: 'src/pages/index.astro',
  },
  components: {
    lang: 'typescript',
    code: `// src/components/ui/Button.tsx
import { cn } from '@/lib/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'font-medium rounded-md transition-colors',
        variants[variant],
        sizes[size]
      )}
    >
      {children}
    </button>
  );
}`,
    filename: 'src/components/ui/Button.tsx',
  },
  i18n: {
    lang: 'typescript',
    code: `// src/i18n/config.ts
export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
} as const;

export const defaultLang = 'en';

// src/i18n/translations.ts
export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'hero.title': 'Ship faster with Velocity',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'hero.title': 'Envía más rápido con Velocity',
  },
} as const;

// Usage: t('hero.title') → "Ship faster..."`,
    filename: 'src/i18n/config.ts',
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
        addToken(boolMatch[0], 'text-orange-600 dark:text-orange-400');
        remaining = remaining.slice(boolMatch[0].length);
        matched = true;
        continue;
      }

      // Numbers
      const numberMatch = remaining.match(/^(\d+\.?\d*)/);
      if (numberMatch) {
        addToken(numberMatch[0], 'text-orange-600 dark:text-orange-400');
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
        addToken(cssFuncMatch[1], 'text-yellow-600 dark:text-yellow-400');
        addToken(cssFuncMatch[2], 'text-foreground-secondary');
        remaining = remaining.slice(cssFuncMatch[0].length);
        matched = true;
        continue;
      }

      // Function calls
      const funcMatch = remaining.match(/^([\w]+)(\()/);
      if (funcMatch) {
        addToken(funcMatch[1], 'text-yellow-600 dark:text-yellow-400');
        addToken(funcMatch[2], 'text-foreground-secondary');
        remaining = remaining.slice(funcMatch[0].length);
        matched = true;
        continue;
      }

      // Type annotations after colon
      const typeMatch = remaining.match(/^(:\s*)([\w<>[\]|&]+)/);
      if (typeMatch) {
        addToken(typeMatch[1], 'text-foreground-secondary');
        addToken(typeMatch[2], 'text-cyan-600 dark:text-cyan-400');
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
  const [activeTab, setActiveTab] = useState('design');

  const tabs: Tab[] = [
    { id: 'design', label: 'Design System', desc: 'Global tokens & typography', icon: Palette },
    { id: 'seo', label: 'SEO & Meta', desc: 'OpenGraph & sitemaps', icon: Search },
    { id: 'perf', label: 'Performance', desc: '100/100 Core Web Vitals', icon: Zap },
    { id: 'components', label: 'Components', desc: 'Reusable UI primitives', icon: LayoutGrid },
    { id: 'i18n', label: 'Internationalization', desc: 'Multi-language support', icon: Globe },
  ];

  const activeTabContent = tabContent[activeTab];
  const activeCodeExample = codeExamples[activeTab];

  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
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
