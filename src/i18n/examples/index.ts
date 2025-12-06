import type { Language } from '../index';
import { examplesDE } from './de';
import { examplesEN } from './en';
import { examplesFR } from './fr';
import { examplesIT } from './it';
import { examplesES } from './es';
import { examplesNL } from './nl';

export interface ExampleTexts {
  easy: string;
  medium: string;
  hard: string;
}

export const examples: Record<Language, ExampleTexts> = {
  de: examplesDE,
  en: examplesEN,
  fr: examplesFR,
  it: examplesIT,
  es: examplesES,
  nl: examplesNL,
};

export function getExamples(lang: Language): ExampleTexts {
  return examples[lang] || examples.en;
}
