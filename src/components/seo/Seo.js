import { useEffect } from 'react';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, buildLocalizedPath } from '../../i18n';

const upsertMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
};

const upsertLink = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
};

export const Seo = ({ lang = DEFAULT_LANGUAGE, routePath = '', title, description }) => {
  useEffect(() => {
    document.title = title;

    const origin = window.location.origin;
    const canonical = `${origin}${buildLocalizedPath(lang, routePath)}`;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: lang });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });

    SUPPORTED_LANGUAGES.forEach((candidate) => {
      upsertLink(`link[rel="alternate"][hreflang="${candidate}"]`, {
        rel: 'alternate',
        hreflang: candidate,
        href: `${origin}${buildLocalizedPath(candidate, routePath)}`,
      });
    });

    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${origin}${buildLocalizedPath(DEFAULT_LANGUAGE, routePath)}`,
    });
  }, [description, lang, routePath, title]);

  return null;
};
