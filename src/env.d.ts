// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly CONTACT_FORM_ENDPOINT?: string;
  readonly NEWSLETTER_API_KEY?: string;
  readonly GOOGLE_SITE_VERIFICATION?: string;
  readonly BING_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
