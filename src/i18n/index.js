import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import en from './en';
import pl from './pl';
import lt from './lt';
import de from './de';
import fr from './fr';
import it from './it';
import es from './es';

export const SUPPORTED_LANGUAGES = ['en', 'lt', 'de', 'fr', 'pl', 'it', 'es'];
export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGE_LABELS = {
  en: 'EN',
  lt: 'LT',
  de: 'DE',
  fr: 'FR',
  pl: 'PL',
  it: 'IT',
  es: 'ES',
};
export const ROUTE_SEGMENTS = { home: '', about: 'about', preOrder: 'pre-order', contacts: 'contacts' };

const dictionaries = { en, lt, de, fr, pl, it, es };

export const buildLocalizedPath = (lang, path = '') => {
  const normalized = String(path || '').replace(/^\/+|\/+$/g, '');
  return normalized ? `/${lang}/${normalized}` : `/${lang}`;
};

export const getPreferredLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const saved = window.localStorage.getItem('site-language');
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;

  const browserCandidates = [window.navigator.language, ...(window.navigator.languages || [])]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase().split('-')[0]);

  return browserCandidates.find((value) => SUPPORTED_LANGUAGES.includes(value)) || DEFAULT_LANGUAGE;
};

export const getPathWithoutLanguage = (pathname = '/') => {
  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length) return '';
  return SUPPORTED_LANGUAGES.includes(parts[0]) ? parts.slice(1).join('/') : parts.join('/');
};

const I18nContext = createContext({ lang: DEFAULT_LANGUAGE, t: (key) => key, changeLanguage: () => {} });

const getByPath = (source, key) =>
  String(key).split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), source);

export const I18nProvider = ({ lang, changeLanguage, children }) => {
  const currentLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;

  useEffect(() => {
    document.documentElement.lang = currentLang;
    window.localStorage.setItem('site-language', currentLang);
  }, [currentLang]);

  const t = useCallback(
    (key, fallback = '') => {
      const local = getByPath(dictionaries[currentLang], key);
      if (local !== undefined) return local;
      const defaultValue = getByPath(dictionaries[DEFAULT_LANGUAGE], key);
      if (defaultValue !== undefined) return defaultValue;
      return fallback || key;
    },
    [currentLang]
  );

  const value = useMemo(() => ({ lang: currentLang, t, changeLanguage }), [changeLanguage, currentLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
