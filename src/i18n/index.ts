/**
 * i18n System für Readability.ch
 */

export type Language = 'de' | 'en' | 'fr' | 'it' | 'es' | 'nl';

export const LANGUAGES: Record<Language, { name: string; nativeName: string; flag: string }> = {
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
};

export const DEFAULT_LANGUAGE: Language = 'en';

export interface Translations {
  // Meta
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  // Navigation
  nav: {
    test: string;
    formula: string;
    faq: string;
    tips: string;
    privacy: string;
  };
  // Hero
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    privacy: string;
  };
  // Analyzer
  analyzer: {
    placeholder: string;
    exampleTexts: string;
    exampleEasy: string;
    exampleMedium: string;
    exampleHard: string;
    wordCount: string;
    sentenceCount: string;
    syllableCount: string;
    avgWordsPerSentence: string;
    avgSyllablesPerWord: string;
    showSentences: string;
    hideSentences: string;
  };
  // Results
  results: {
    score: string;
    interpretation: string;
    difficulty: {
      veryHard: string;
      hard: string;
      mediumHard: string;
      medium: string;
      easy: string;
      veryEasy: string;
      extremelyEasy: string;
    };
  };
  // Formulas
  formulas: {
    title: string;
    fleschOriginal: string;
    fleschOriginalDesc: string;
    fleschAmstad: string;
    fleschAmstadDesc: string;
    recommended: string;
    otherFormulas: string;
    wiener: string;
    wienerDesc: string;
    fleschKincaid: string;
    fleschKincaidDesc: string;
    gunningFog: string;
    gunningFogDesc: string;
    lix: string;
    lixDesc: string;
    smog: string;
    smogDesc: string;
    daleChall: string;
    daleChallDesc: string;
    moreInfo: string;
  };
  // Interpretation table
  table: {
    title: string;
    score: string;
    difficulty: string;
    audience: string;
    example: string;
    academic: string;
    college: string;
    qualityNews: string;
    tabloid: string;
    advertising: string;
    comics: string;
    elementary: string;
  };
  // FAQ
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  // Tips
  tips: {
    title: string;
    tip1Title: string;
    tip1Desc: string;
    tip2Title: string;
    tip2Desc: string;
    tip3Title: string;
    tip3Desc: string;
    tip4Title: string;
    tip4Desc: string;
    tip5Title: string;
    tip5Desc: string;
    tip6Title: string;
    tip6Desc: string;
    tip7Title: string;
    tip7Desc: string;
    tip8Title: string;
    tip8Desc: string;
  };
  // Advantages & Disadvantages
  advantages: {
    title: string;
    items: string[];
  };
  disadvantages: {
    title: string;
    items: string[];
  };
  // Privacy
  privacy: {
    title: string;
    headline: string;
    intro: string;
    meaning: string;
    items: string[];
    conclusion: string;
  };
  // Footer
  footer: {
    copyright: string;
    authors: string;
  };
  // Language selector
  languageSelector: {
    choose: string;
    current: string;
  };
}

// Import translations
import { de } from './translations/de';
import { en } from './translations/en';
import { fr } from './translations/fr';
import { it } from './translations/it';
import { es } from './translations/es';
import { nl } from './translations/nl';

export const translations: Record<Language, Translations> = {
  de,
  en,
  fr,
  it,
  es,
  nl,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

export function getLanguageFromPath(path: string): Language {
  const match = path.match(/^\/(de|en|fr|it|es|nl)(\/|$)/);
  if (match) {
    return match[1] as Language;
  }
  return DEFAULT_LANGUAGE;
}
