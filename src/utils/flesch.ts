import { ABBREVIATIONS } from '../data/abbreviations';
import { translations } from '../data/translations';
import type {
  Difficulty,
  SupportedLanguage,
  FleschResult,
  FleschKincaidResult,
  WienerResult,
  GunningFogResult,
  LixResult,
  SentenceAnalysis,
  ParagraphAnalysis,
  FullAnalysisResult
} from '../types';

export type {
  Difficulty,
  SupportedLanguage,
  FleschResult,
  FleschKincaidResult,
  WienerResult,
  GunningFogResult,
  LixResult,
  SentenceAnalysis,
  ParagraphAnalysis,
  FullAnalysisResult
};

/**
 * Zählt die Silben in einem Wort
 * Unterstützt alle europäischen Sprachen (DE, EN, FR, IT, ES, NL)
 * Verwendet Vokalgruppen-Ansatz: aufeinanderfolgende Vokale = 1 Silbe
 */
export function countSyllables(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-zäöüßàâéèêëïîôùûüÿçáíóúñìò]/g, '');
  if (cleanWord.length === 0) return 0;
  if (cleanWord.length <= 3) return 1;

  // Zähle Vokalgruppen - aufeinanderfolgende Vokale zählen als 1 Silbe
  // Dies behandelt automatisch Diphthonge wie "ea", "ou", "ie", etc.
  const vowelGroups = cleanWord.match(/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]+/gi) || [];
  let syllables = vowelGroups.length;

  if (syllables === 0) return 1;

  // Stummes 'e' vor finalem 's' (wie "makes", "times", "temperatures")
  if (cleanWord.endsWith('es') && cleanWord.length > 3 && syllables > 1) {
    const beforeE = cleanWord.charAt(cleanWord.length - 3);
    if (!/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(beforeE)) {
      // -les nach Konsonant: prüfen ob syllabisch
      if (beforeE === 'l' && cleanWord.length > 4) {
        const twoBeforeE = cleanWord.charAt(cleanWord.length - 4);
        if (/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(twoBeforeE)) {
          syllables -= 1; // "files", "smiles" → subtrahieren
        }
        // sonst: "tables", "apples" → nicht subtrahieren (syllabisches -les)
      } else if (!/[sxzgc]/.test(beforeE) && !cleanWord.endsWith('ches') && !cleanWord.endsWith('shes')) {
        // Nicht subtrahieren wenn -es eine Silbe hinzufügt (Zischlaute)
        // s, x, z: "buses", "boxes", "fizzes"
        // g, c: "changes", "places" (weiches g/c vor e)
        // ch, sh: "churches", "wishes"
        syllables -= 1;
      }
    }
  }
  // Stummes 'e' am Ende (wie "make", "time", "climate")
  else if (cleanWord.endsWith('e') && cleanWord.length > 2 && syllables > 1) {
    const beforeE = cleanWord.charAt(cleanWord.length - 2);
    if (!/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(beforeE)) {
      // -le nach Konsonant: prüfen ob syllabisch
      if (beforeE === 'l' && cleanWord.length > 3) {
        const twoBeforeE = cleanWord.charAt(cleanWord.length - 3);
        if (/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(twoBeforeE)) {
          syllables -= 1; // "file", "smile" → subtrahieren
        }
        // sonst: "table", "apple" → nicht subtrahieren (syllabisches -le)
      } else {
        syllables -= 1; // "make", "time", "change" → subtrahieren
      }
    }
  }

  // Spezielle englische Endungen die oft überzählt werden
  // -ed Endung ist oft stumm (außer nach t/d)
  if (cleanWord.endsWith('ed') && cleanWord.length > 4 && syllables > 1) {
    const beforeEd = cleanWord.charAt(cleanWord.length - 3);
    if (!/[td]/.test(beforeEd) && !/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(beforeEd)) {
      // "changed", "walked" → 1 Silbe, nicht 2
      // aber "wanted", "needed" → 2 Silben (nach t/d)
      syllables -= 1;
    }
  }

  return Math.max(1, syllables);
}

/**
 * Ersetzt Zahlen mit Punkten (z.B. "1." oder ".5") um sie vor Satz-Splitting zu schützen
 */
export function protectNumbers(text: string): string {
  // Schütze Dezimalzahlen (z.B. "3.14")
  let result = text.replace(/(\d)\.(\d)/g, '$1###DECIMAL###$2');
  // Schütze Ordinalzahlen (z.B. "1." am Anfang)
  result = result.replace(/(\d)\./g, '$1###ORDINAL###');
  // Schütze Punkte vor Zahlen (z.B. ".5")
  result = result.replace(/\.(\d)/g, '###DOTNUM###$1');
  return result;
}

/**
 * Stellt Zahlen mit Punkten wieder her
 */
export function restoreNumbers(text: string): string {
  return text
    .replace(/###DECIMAL###/g, '.')
    .replace(/###ORDINAL###/g, '.')
    .replace(/###DOTNUM###/g, '.');
}

/**
 * Schützt Abkürzungen vor Satz-Splitting durch Ersetzen der Punkte
 */
export function protectAbbreviations(text: string): string {
  let protected_text = text;
  // Sortiere nach Länge (längste zuerst) um Überlappungen zu vermeiden
  const sortedAbbrs = Object.keys(ABBREVIATIONS).sort((a, b) => b.length - a.length);

  for (const abbr of sortedAbbrs) {
    // Ersetze Punkte in Abkürzungen durch Platzhalter
    const placeholder = abbr.replace(/\./g, '###DOT###');
    let pattern = abbr.replace(/\./g, '\\.');

    // Wenn die Abkürzung mit einem Wort-Zeichen beginnt, erzwinge Wortgrenze davor
    // Dies verhindert falsche Matches wie "st." in "Dienst."
    if (/^[\w]/.test(abbr)) {
      pattern = '\\b' + pattern;
    }

    protected_text = protected_text.replace(new RegExp(pattern, 'g'), placeholder);
  }
  return protected_text;
}

/**
 * Stellt die Punkte in Abkürzungen wieder her
 */
export function restoreAbbreviations(text: string): string {
  return text.replace(/###DOT###/g, '.');
}

/**
 * Normalisiert Abkürzungen im Text (für Silbenzählung)
 */
export function normalizeAbbreviations(text: string): string {
  let normalized = text;
  // Sortiere nach Länge (längste zuerst)
  const sortedAbbrs = Object.keys(ABBREVIATIONS).sort((a, b) => b.length - a.length);

  for (const abbr of sortedAbbrs) {
    const full = ABBREVIATIONS[abbr];
    normalized = normalized.replace(new RegExp(abbr.replace(/\./g, '\\.'), 'gi'), full);
  }
  return normalized;
}

/**
 * Zählt die Sätze im Text
 */
export function countSentences(text: string): number {
  // Schütze Abkürzungen vor dem Splitting
  const protected_text = protectAbbreviations(text);
  const sentences = protected_text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return Math.max(1, sentences.length);
}

/**
 * Teilt Text in Sätze auf, unter Berücksichtigung von Abkürzungen und Zahlen
 */
export function splitIntoSentences(text: string): string[] {
  // Normalisiere Whitespace (inkl. non-breaking spaces, etc.)
  let normalized = text.replace(/[\s\u00A0\u2000-\u200B\u202F\u205F\u3000]+/g, ' ');

  // Schütze Abkürzungen und Zahlen vor dem Splitting
  let protected_text = protectAbbreviations(normalized);
  protected_text = protectNumbers(protected_text);
  // Schütze auch "..." (Ellipsis)
  protected_text = protected_text.replace(/\.\.\./g, '###ELLIPSIS###');

  // Teile an Satzenden (. ! ?) gefolgt von Leerzeichen UND einem Großbuchstaben/Zahl.
  // Das schützt unbekannte Abkürzungen, die klein weitergehen (z.B. "usw. und so").
  const sentences = protected_text.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9])/).filter(s => s.trim().length > 0);

  // Stelle alles wieder her
  return sentences.map(s => {
    let restored = restoreAbbreviations(s);
    restored = restoreNumbers(restored);
    restored = restored.replace(/###ELLIPSIS###/g, '...');
    return restored;
  });
}

/**
 * Extrahiert Wörter aus dem Text
 * Unterstützt alle europäischen Sprachen (DE, EN, FR, IT, ES, NL)
 */
export function getWords(text: string): string[] {
  return text
    .replace(/[^\wäöüÄÖÜßàâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇáéíóúñÁÉÍÓÚÑìòÌÒ\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Zählt Wörter mit mehr als 6 Buchstaben (für Wiener Sachtextformel)
 * Unterstützt alle europäischen Sprachen
 */
export function countLongWords(words: string[]): number {
  return words.filter(word => word.replace(/[^a-zäöüßA-ZÄÖÜàâéèêëïîôùûüÿçÀÂÉÈÊËÏÎÔÙÛÜŸÇáéíóúñÁÉÍÓÚÑìòÌÒ]/g, '').length > 6).length;
}

/**
 * Zählt Wörter mit 3+ Silben (für Gunning-Fog)
 */
export function countComplexWords(words: string[]): number {
  return words.filter(word => countSyllables(word) >= 3).length;
}

/**
 * Holt Übersetzungen für eine Sprache
 */
export function getTranslations(lang: SupportedLanguage) {
  return translations[lang] || translations.de;
}

/**
 * Interpretiert den Flesch-Wert (englische Skala)
 */
export function interpretFleschScore(score: number, lang: SupportedLanguage = 'de'): { interpretation: string; difficulty: Difficulty } {
  const t = getTranslations(lang);
  if (score < 30) {
    return { interpretation: t.fleschVeryHard, difficulty: 'sehr-schwer' };
  } else if (score < 50) {
    return { interpretation: t.fleschHard, difficulty: 'schwer' };
  } else if (score < 60) {
    return { interpretation: t.fleschFairlyHard, difficulty: 'mittelschwer' };
  } else if (score < 70) {
    return { interpretation: t.fleschMedium, difficulty: 'mittel' };
  } else if (score < 80) {
    return { interpretation: t.fleschEasy, difficulty: 'leicht' };
  } else if (score < 90) {
    return { interpretation: t.fleschVeryEasy, difficulty: 'sehr-leicht' };
  } else {
    return { interpretation: t.fleschExtremelyEasy, difficulty: 'extrem-leicht' };
  }
}

/**
 * Interpretiert den Amstad-Wert (deutsche Skala)
 * Die Amstad-Formel liefert andere Werte als die englische Flesch-Formel
 */
export function interpretAmstadScore(score: number, lang: SupportedLanguage = 'de'): { interpretation: string; difficulty: Difficulty } {
  const t = getTranslations(lang);
  if (score < 0) {
    return { interpretation: t.amstadExtremelyHard, difficulty: 'sehr-schwer' };
  } else if (score < 30) {
    return { interpretation: t.amstadVeryHard, difficulty: 'sehr-schwer' };
  } else if (score < 50) {
    return { interpretation: t.amstadHard, difficulty: 'schwer' };
  } else if (score < 60) {
    return { interpretation: t.amstadFairlyHard, difficulty: 'mittelschwer' };
  } else if (score < 70) {
    return { interpretation: t.amstadMedium, difficulty: 'mittel' };
  } else if (score < 80) {
    return { interpretation: t.amstadEasy, difficulty: 'leicht' };
  } else if (score < 90) {
    return { interpretation: t.amstadVeryEasy, difficulty: 'sehr-leicht' };
  } else {
    return { interpretation: t.amstadExtremelyEasy, difficulty: 'extrem-leicht' };
  }
}

/**
 * Berechnet den sprachspezifischen Flesch-Lesbarkeitsindex
 *
 * Formeln nach Sprache:
 * - EN: Original Flesch (1948): 206.835 - 1.015×ASL - 84.6×ASW
 * - DE: Amstad (1978): 180 - ASL - 58.5×ASW
 * - NL: Douma: 206.835 - 0.93×ASL - 77×ASW
 * - FR: Kandel-Moles: 207 - 1.015×ASL - 73.6×ASW
 * - ES: Fernández Huerta: 206.84 - 1.02×ASL - 60×ASW
 * - IT: Franchina-Vacca: 217 - 1.3×ASL - 60×ASW
 */
export function calculateFlesch(text: string, lang: SupportedLanguage = 'de'): FleschResult {
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  let syllableCount = 0;
  const uniqueWordsSet = new Set<string>();

  for (const word of words) {
    syllableCount += countSyllables(word);
    uniqueWordsSet.add(word.toLowerCase());
  }

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  // Sprachspezifische Formeln
  let score: number;
  let scoreAmstad: number;

  switch (lang) {
    case 'en':
      // Englische Flesch-Formel (Rudolf Flesch, 1948)
      score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
      scoreAmstad = score; // Für EN ist Flesch = primäre Formel
      break;
    case 'de':
      // Deutsche Amstad-Formel (Toni Amstad, 1978)
      score = 180 - avgWordsPerSentence - (58.5 * avgSyllablesPerWord);
      scoreAmstad = score;
      break;
    case 'nl':
      // Niederländische Flesch-Douma-Formel (Wouter Douma)
      score = 206.835 - (0.93 * avgWordsPerSentence) - (77 * avgSyllablesPerWord);
      scoreAmstad = score;
      break;
    case 'fr':
      // Französische Kandel-Moles-Formel
      score = 207 - (1.015 * avgWordsPerSentence) - (73.6 * avgSyllablesPerWord);
      scoreAmstad = score;
      break;
    case 'es':
      // Spanische Fernández-Huerta-Formel
      score = 206.84 - (1.02 * avgWordsPerSentence) - (60 * avgSyllablesPerWord);
      scoreAmstad = score;
      break;
    case 'it':
      // Italienische Franchina-Vacca-Formel
      score = 217 - (1.3 * avgWordsPerSentence) - (60 * avgSyllablesPerWord);
      scoreAmstad = score;
      break;
    default:
      // Fallback auf englische Formel
      score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
      scoreAmstad = score;
  }

  const { interpretation, difficulty } = interpretFleschScore(score, lang);
  const { interpretation: interpretationAmstad, difficulty: difficultyAmstad } = interpretAmstadScore(scoreAmstad, lang);

  return {
    score: Math.round(score * 10) / 10,
    scoreAmstad: Math.round(scoreAmstad * 10) / 10,
    wordCount,
    sentenceCount,
    syllableCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    uniqueWords: uniqueWordsSet.size,
    interpretation,
    interpretationAmstad,
    difficulty,
    difficultyAmstad,
  };
}

/**
 * Flesch-Kincaid Grade Level
 * Gibt die benötigten Schuljahre an (US-System)
 * Formel: FKGL = (0.39 × ASL) + (11.8 × ASW) - 15.59
 */
export function calculateFleschKincaid(text: string, lang: SupportedLanguage = 'de'): FleschKincaidResult {
  const t = getTranslations(lang);
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { gradeLevel: 0, interpretation: t.tooLittleText };
  }

  let syllableCount = 0;
  for (const word of words) {
    syllableCount += countSyllables(word);
  }

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / wordCount;

  // Flesch-Kincaid Grade Level Formel
  const gradeLevel = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  const roundedGrade = Math.round(gradeLevel * 10) / 10;

  let interpretation: string;
  if (gradeLevel < 1) {
    interpretation = t.preschool;
  } else if (gradeLevel < 6) {
    interpretation = t.elementary(Math.round(gradeLevel));
  } else if (gradeLevel < 9) {
    interpretation = t.middleSchool(Math.round(gradeLevel));
  } else if (gradeLevel < 13) {
    interpretation = t.highSchool(Math.round(gradeLevel));
  } else {
    interpretation = t.university;
  }

  return {
    gradeLevel: roundedGrade,
    interpretation,
  };
}

/**
 * Wiener Sachtextformel (WSTF) - speziell für deutsche Texte
 * Entwickelt von Richard Bamberger und Erich Vanecek
 * Formel: 0.1935 × MS + 0.1672 × SL + 0.1297 × IW - 0.0327 × ES - 0.875
 * MS = Prozent Wörter mit 3+ Silben
 * SL = durchschnittliche Satzlänge
 * IW = Prozent Wörter mit 6+ Buchstaben
 * ES = Prozent einsilbige Wörter
 */
export function calculateWiener(text: string, lang: SupportedLanguage = 'de'): WienerResult {
  const t = getTranslations(lang);
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, schoolYear: 1, interpretation: t.tooLittleText };
  }

  const threeOrMoreSyllables = words.filter(w => countSyllables(w) >= 3).length;
  const sixOrMoreLetters = countLongWords(words);
  const oneSyllable = words.filter(w => countSyllables(w) === 1).length;

  const MS = (threeOrMoreSyllables / wordCount) * 100;
  const SL = wordCount / sentenceCount;
  const IW = (sixOrMoreLetters / wordCount) * 100;
  const ES = (oneSyllable / wordCount) * 100;

  const score = 0.1935 * MS + 0.1672 * SL + 0.1297 * IW - 0.0327 * ES - 0.875;
  const schoolYear = Math.max(1, Math.min(15, Math.round(score)));

  let interpretation: string;
  if (schoolYear <= 4) {
    interpretation = t.elementary(schoolYear);
  } else if (schoolYear <= 6) {
    interpretation = t.lowerGrades(schoolYear);
  } else if (schoolYear <= 9) {
    interpretation = t.middleSchool(schoolYear);
  } else if (schoolYear <= 12) {
    interpretation = t.highSchool(schoolYear);
  } else {
    interpretation = t.academic;
  }

  return {
    score: Math.round(score * 10) / 10,
    schoolYear,
    interpretation,
  };
}

/**
 * Gunning-Fog-Index
 * Entwickelt von Robert Gunning (1952)
 * Formel: 0.4 × (ASL + PHW)
 * ASL = durchschnittliche Satzlänge
 * PHW = Prozent "harter" Wörter (3+ Silben)
 */
export function calculateGunningFog(text: string, lang: SupportedLanguage = 'de'): GunningFogResult {
  const t = getTranslations(lang);
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, schoolYears: 0, interpretation: t.tooLittleText };
  }

  const complexWords = countComplexWords(words);
  const ASL = wordCount / sentenceCount;
  const PHW = (complexWords / wordCount) * 100;

  const score = 0.4 * (ASL + PHW);
  const schoolYears = Math.round(score);

  let interpretation: string;
  if (score < 6) {
    interpretation = t.fogVerySimple;
  } else if (score < 8) {
    interpretation = t.fogSimple;
  } else if (score < 10) {
    interpretation = t.fogStandard;
  } else if (score < 12) {
    interpretation = t.fogDemanding;
  } else if (score < 14) {
    interpretation = t.fogDifficult;
  } else {
    interpretation = t.fogVeryDifficult;
  }

  return {
    score: Math.round(score * 10) / 10,
    schoolYears,
    interpretation,
  };
}

/**
 * LIX Lesbarkeitsindex (schwedische Formel, gut für viele Sprachen)
 * Formel: (Wörter / Sätze) + (lange Wörter × 100 / Wörter)
 */
export function calculateLix(text: string, lang: SupportedLanguage = 'de'): LixResult {
  const t = getTranslations(lang);
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, interpretation: t.tooLittleText, difficulty: 'mittel' };
  }

  const longWords = countLongWords(words);
  const score = (wordCount / sentenceCount) + (longWords * 100 / wordCount);

  let interpretation: string;
  let difficulty: Difficulty;

  if (score < 25) {
    interpretation = t.lixVerySimple;
    difficulty = 'extrem-leicht';
  } else if (score < 35) {
    interpretation = t.lixSimple;
    difficulty = 'sehr-leicht';
  } else if (score < 45) {
    interpretation = t.lixMedium;
    difficulty = 'leicht';
  } else if (score < 55) {
    interpretation = t.lixDifficult;
    difficulty = 'mittelschwer';
  } else if (score < 65) {
    interpretation = t.lixVeryDifficult;
    difficulty = 'schwer';
  } else {
    interpretation = t.lixExtremelyDifficult;
    difficulty = 'sehr-schwer';
  }

  return {
    score: Math.round(score * 10) / 10,
    interpretation,
    difficulty,
  };
}

/**
 * Berechnet die Schwierigkeit eines einzelnen Satzes
 * Verwendet einfache Heuristiken basierend auf Satzlänge und Wortkomplexität
 * Kurze Sätze werden nie als "schwer" eingestuft, da sie schnell erfassbar sind
 */
function getSentenceDifficulty(wordCount: number, avgSyllablesPerWord: number): Difficulty {
  const isVeryShort = wordCount <= 5;
  const isShort = wordCount <= 10;
  const isMedium = wordCount <= 18;
  const isSimpleWords = avgSyllablesPerWord < 1.5;
  const isMediumWords = avgSyllablesPerWord < 2.0;
  const isComplexWords = avgSyllablesPerWord >= 2.0;

  // Sehr kurze Sätze (≤5 Wörter) sind maximal "mittel"
  if (isVeryShort) {
    if (isSimpleWords) return 'sehr-leicht';
    if (isMediumWords) return 'leicht';
    return 'mittel'; // auch bei komplexen Wörtern max "mittel"
  }

  // Kurze Sätze (6-10 Wörter)
  if (isShort) {
    if (isSimpleWords) return 'sehr-leicht';
    if (isMediumWords) return 'leicht';
    return 'mittelschwer'; // komplexe Wörter = mittelschwer, nicht schwer
  }

  // Mittlere Sätze (11-18 Wörter)
  if (isMedium) {
    if (isSimpleWords) return 'leicht';
    if (isMediumWords) return 'mittel';
    return 'schwer';
  }

  // Lange Sätze (>18 Wörter)
  if (isSimpleWords) return 'mittel';
  if (isMediumWords) return 'mittelschwer';
  return 'sehr-schwer';
}

/**
 * Extrahiert und analysiert einzelne Sätze
 * Verwendet einfache Heuristiken für die Satzanalyse
 * Berücksichtigt Abkürzungen beim Satz-Splitting
 */
export function analyzeSentences(text: string): SentenceAnalysis[] {
  // Sätze aufteilen mit Abkürzungs-Schutz
  const sentenceTexts = splitIntoSentences(text);

  return sentenceTexts.map(sentenceText => {
    const normalizedSentence = normalizeAbbreviations(sentenceText);
    const words = getWords(normalizedSentence);
    const wordCount = words.length;

    let syllableCount = 0;
    for (const word of words) {
      syllableCount += countSyllables(word);
    }

    const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

    // Einfache Heuristik statt Flesch-Formel
    const difficulty = getSentenceDifficulty(wordCount, avgSyllablesPerWord);

    // Score nur zur Anzeige (100 = sehr leicht, 0 = sehr schwer)
    const score = Math.max(0, Math.min(100, 100 - (wordCount * 2) - ((avgSyllablesPerWord - 1) * 30)));

    return {
      text: sentenceText,
      wordCount,
      syllableCount,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      score: Math.round(score * 10) / 10,
      difficulty,
    };
  });
}

/**
 * Analysiert Text absatzweise
 * Behält die Absatzstruktur für die Darstellung bei
 * Berücksichtigt Abkürzungen beim Satz-Splitting
 */
export function analyzeByParagraphs(text: string): ParagraphAnalysis[] {
  // Text in Absätze aufteilen (doppelte Zeilenumbrüche oder einzelne)
  const paragraphs = text.split(/\n\s*\n|\n/).filter(p => p.trim().length > 0);

  return paragraphs.map(paragraph => {
    // Sätze im Absatz aufteilen mit Abkürzungs-Schutz
    const sentenceTexts = splitIntoSentences(paragraph);

    const sentences = sentenceTexts.map(sentenceText => {
      const normalizedSentence = normalizeAbbreviations(sentenceText);
      const words = getWords(normalizedSentence);
      const wordCount = words.length;

      let syllableCount = 0;
      for (const word of words) {
        syllableCount += countSyllables(word);
      }

      const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

      // Einfache Heuristik statt Flesch-Formel
      const difficulty = getSentenceDifficulty(wordCount, avgSyllablesPerWord);

      // Score nur zur Anzeige (100 = sehr leicht, 0 = sehr schwer)
      const score = Math.max(0, Math.min(100, 100 - (wordCount * 2) - ((avgSyllablesPerWord - 1) * 30)));

      return {
        text: sentenceText,
        wordCount,
        syllableCount,
        avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
        score: Math.round(score * 10) / 10,
        difficulty,
      };
    });

    return { sentences };
  });
}

/**
 * Vollständige Textanalyse mit allen Metriken
 */
export function analyzeText(text: string, lang: SupportedLanguage = 'de'): FullAnalysisResult {
  return {
    flesch: calculateFlesch(text, lang),
    fleschKincaid: calculateFleschKincaid(text, lang),
    wiener: calculateWiener(text, lang),
    gunningFog: calculateGunningFog(text, lang),
    lix: calculateLix(text, lang),
    sentences: analyzeSentences(text),
    paragraphs: analyzeByParagraphs(text),
  };
}
