/**
 * Zählt die Silben in einem deutschen Wort
 */
export function countSyllables(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-zäöüß]/g, '');
  if (cleanWord.length === 0) return 0;
  if (cleanWord.length <= 3) return 1;

  // Deutsche Vokale inkl. Umlaute
  const vowels = /[aeiouyäöü]/gi;
  const matches = cleanWord.match(vowels);

  if (!matches) return 1;

  let syllables = matches.length;

  // Doppelvokale zählen als eine Silbe
  const diphthongs = /[aeiouäöü]{2,}/gi;
  const diphthongMatches = cleanWord.match(diphthongs);
  if (diphthongMatches) {
    syllables -= diphthongMatches.length;
    syllables += diphthongMatches.length; // Jeder Doppelvokal = 1 Silbe
  }

  // Stummes 'e' am Ende
  if (cleanWord.endsWith('e') && cleanWord.length > 2) {
    const beforeE = cleanWord.charAt(cleanWord.length - 2);
    if (!/[aeiouäöü]/.test(beforeE)) {
      // Behalte Silbe für -le, -ne, -re etc.
    }
  }

  return Math.max(1, syllables);
}

/**
 * Normalisiert Abkürzungen im Text
 */
export function normalizeAbbreviations(text: string): string {
  const abbreviations: Record<string, string> = {
    'z.B.': 'zum Beispiel',
    'z. B.': 'zum Beispiel',
    'd.h.': 'das heisst',
    'd. h.': 'das heisst',
    'u.a.': 'unter anderem',
    'u. a.': 'unter anderem',
    'usw.': 'und so weiter',
    'etc.': 'et cetera',
    'Dr.': 'Doktor',
    'Prof.': 'Professor',
    'Nr.': 'Nummer',
    'ca.': 'circa',
    'bzw.': 'beziehungsweise',
    'ggf.': 'gegebenenfalls',
    'evtl.': 'eventuell',
    'inkl.': 'inklusive',
    'exkl.': 'exklusive',
    'max.': 'maximal',
    'min.': 'minimal',
  };

  let normalized = text;
  for (const [abbr, full] of Object.entries(abbreviations)) {
    normalized = normalized.replace(new RegExp(abbr.replace(/\./g, '\\.'), 'gi'), full);
  }
  return normalized;
}

/**
 * Zählt die Sätze im Text
 */
export function countSentences(text: string): number {
  const normalized = normalizeAbbreviations(text);
  const sentences = normalized.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return Math.max(1, sentences.length);
}

/**
 * Extrahiert Wörter aus dem Text
 */
export function getWords(text: string): string[] {
  return text
    .replace(/[^\wäöüÄÖÜß\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Zählt Wörter mit mehr als 6 Buchstaben (für Wiener Sachtextformel)
 */
export function countLongWords(words: string[]): number {
  return words.filter(word => word.replace(/[^a-zäöüßA-ZÄÖÜ]/g, '').length > 6).length;
}

/**
 * Zählt Wörter mit 3+ Silben (für Gunning-Fog)
 */
export function countComplexWords(words: string[]): number {
  return words.filter(word => countSyllables(word) >= 3).length;
}

export type Difficulty = 'sehr-schwer' | 'schwer' | 'mittelschwer' | 'mittel' | 'leicht' | 'sehr-leicht' | 'extrem-leicht';

export interface SentenceAnalysis {
  text: string;
  wordCount: number;
  syllableCount: number;
  avgSyllablesPerWord: number;
  score: number;
  difficulty: Difficulty;
}

export interface FleschResult {
  score: number;
  scoreAmstad: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  uniqueWords: number;
  interpretation: string;
  interpretationAmstad: string;
  difficulty: Difficulty;
  difficultyAmstad: Difficulty;
}

export interface FleschKincaidResult {
  gradeLevel: number;
  interpretation: string;
}

export interface WienerResult {
  score: number;
  schoolYear: number;
  interpretation: string;
}

export interface GunningFogResult {
  score: number;
  schoolYears: number;
  interpretation: string;
}

export interface LixResult {
  score: number;
  interpretation: string;
  difficulty: Difficulty;
}

export interface FullAnalysisResult {
  flesch: FleschResult;
  fleschKincaid: FleschKincaidResult;
  wiener: WienerResult;
  gunningFog: GunningFogResult;
  lix: LixResult;
  sentences: SentenceAnalysis[];
}

/**
 * Interpretiert den Flesch-Wert (englische Skala)
 */
export function interpretFleschScore(score: number): { interpretation: string; difficulty: Difficulty } {
  if (score < 30) {
    return { interpretation: 'Sehr schwer - Akademiker', difficulty: 'sehr-schwer' };
  } else if (score < 50) {
    return { interpretation: 'Schwer - Studium', difficulty: 'schwer' };
  } else if (score < 60) {
    return { interpretation: 'Mittelschwer - 16+ Jahre', difficulty: 'mittelschwer' };
  } else if (score < 70) {
    return { interpretation: 'Mittel - 13-15 Jahre', difficulty: 'mittel' };
  } else if (score < 80) {
    return { interpretation: 'Leicht - 12 Jahre', difficulty: 'leicht' };
  } else if (score < 90) {
    return { interpretation: 'Sehr leicht - 11 Jahre', difficulty: 'sehr-leicht' };
  } else {
    return { interpretation: 'Extrem leicht - 10 Jahre', difficulty: 'extrem-leicht' };
  }
}

/**
 * Interpretiert den Amstad-Wert (deutsche Skala)
 * Die Amstad-Formel liefert andere Werte als die englische Flesch-Formel
 */
export function interpretAmstadScore(score: number): { interpretation: string; difficulty: Difficulty } {
  if (score < 0) {
    return { interpretation: 'Extrem schwer - Akademiker', difficulty: 'sehr-schwer' };
  } else if (score < 30) {
    return { interpretation: 'Sehr schwer - Studium', difficulty: 'sehr-schwer' };
  } else if (score < 50) {
    return { interpretation: 'Schwer - Matura/Abitur', difficulty: 'schwer' };
  } else if (score < 60) {
    return { interpretation: 'Mittelschwer - 16+ Jahre', difficulty: 'mittelschwer' };
  } else if (score < 70) {
    return { interpretation: 'Mittel - 13-15 Jahre', difficulty: 'mittel' };
  } else if (score < 80) {
    return { interpretation: 'Leicht - 12 Jahre', difficulty: 'leicht' };
  } else if (score < 90) {
    return { interpretation: 'Sehr leicht - 11 Jahre', difficulty: 'sehr-leicht' };
  } else {
    return { interpretation: 'Extrem leicht - 10 Jahre', difficulty: 'extrem-leicht' };
  }
}

/**
 * Berechnet den Flesch-Lesbarkeitsindex
 * Enthält sowohl die englische Originalformel als auch die deutsche Amstad-Formel
 */
export function calculateFlesch(text: string): FleschResult {
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

  // Englische Flesch-Formel (Rudolf Flesch, 1948)
  // FRE = 206.835 - (1.015 × ASL) - (84.6 × ASW)
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  // Deutsche Amstad-Formel (Toni Amstad, 1978)
  // FRE_deutsch = 180 - ASL - (58.5 × ASW)
  const scoreAmstad = 180 - avgWordsPerSentence - (58.5 * avgSyllablesPerWord);

  const { interpretation, difficulty } = interpretFleschScore(score);
  const { interpretation: interpretationAmstad, difficulty: difficultyAmstad } = interpretAmstadScore(scoreAmstad);

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
export function calculateFleschKincaid(text: string): FleschKincaidResult {
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { gradeLevel: 0, interpretation: 'Zu wenig Text' };
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
    interpretation = 'Vorschule';
  } else if (gradeLevel < 6) {
    interpretation = `Grundschule (${Math.round(gradeLevel)}. Klasse)`;
  } else if (gradeLevel < 9) {
    interpretation = `Mittelstufe (${Math.round(gradeLevel)}. Klasse)`;
  } else if (gradeLevel < 13) {
    interpretation = `Oberstufe (${Math.round(gradeLevel)}. Klasse)`;
  } else {
    interpretation = 'Universitätsniveau';
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
export function calculateWiener(text: string): WienerResult {
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, schoolYear: 1, interpretation: 'Zu wenig Text' };
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
    interpretation = `Grundschule (${schoolYear}. Klasse)`;
  } else if (schoolYear <= 6) {
    interpretation = `Unterstufe (${schoolYear}. Klasse)`;
  } else if (schoolYear <= 9) {
    interpretation = `Mittelstufe (${schoolYear}. Klasse)`;
  } else if (schoolYear <= 12) {
    interpretation = `Oberstufe (${schoolYear}. Klasse)`;
  } else {
    interpretation = 'Akademisches Niveau';
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
export function calculateGunningFog(text: string): GunningFogResult {
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, schoolYears: 0, interpretation: 'Zu wenig Text' };
  }

  const complexWords = countComplexWords(words);
  const ASL = wordCount / sentenceCount;
  const PHW = (complexWords / wordCount) * 100;

  const score = 0.4 * (ASL + PHW);
  const schoolYears = Math.round(score);

  let interpretation: string;
  if (score < 6) {
    interpretation = 'Sehr einfach - für jeden verständlich';
  } else if (score < 8) {
    interpretation = 'Einfach - Alltagssprache';
  } else if (score < 10) {
    interpretation = 'Standard - Zeitungsniveau';
  } else if (score < 12) {
    interpretation = 'Anspruchsvoll - Fachliteratur';
  } else if (score < 14) {
    interpretation = 'Schwierig - Wissenschaftliche Texte';
  } else {
    interpretation = 'Sehr schwierig - Expertenniveau';
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
export function calculateLix(text: string): LixResult {
  const normalizedText = normalizeAbbreviations(text);
  const words = getWords(normalizedText);
  const wordCount = words.length;
  const sentenceCount = countSentences(text);

  if (wordCount === 0) {
    return { score: 0, interpretation: 'Zu wenig Text', difficulty: 'mittel' };
  }

  const longWords = countLongWords(words);
  const score = (wordCount / sentenceCount) + (longWords * 100 / wordCount);

  let interpretation: string;
  let difficulty: Difficulty;

  if (score < 25) {
    interpretation = 'Sehr einfach - Kinderbücher';
    difficulty = 'extrem-leicht';
  } else if (score < 35) {
    interpretation = 'Einfach - Belletristik';
    difficulty = 'sehr-leicht';
  } else if (score < 45) {
    interpretation = 'Mittel - Zeitungen';
    difficulty = 'leicht';
  } else if (score < 55) {
    interpretation = 'Schwierig - Fachliteratur';
    difficulty = 'mittelschwer';
  } else if (score < 65) {
    interpretation = 'Sehr schwierig - Wissenschaft';
    difficulty = 'schwer';
  } else {
    interpretation = 'Extrem schwierig - Bürokratie';
    difficulty = 'sehr-schwer';
  }

  return {
    score: Math.round(score * 10) / 10,
    interpretation,
    difficulty,
  };
}

/**
 * Extrahiert und analysiert einzelne Sätze
 * Verwendet die deutsche Amstad-Formel für die Satzanalyse
 */
export function analyzeSentences(text: string): SentenceAnalysis[] {
  // Sätze aufteilen, aber Satzzeichen für Anzeige behalten
  const sentenceTexts = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

  return sentenceTexts.map(sentenceText => {
    const normalizedSentence = normalizeAbbreviations(sentenceText);
    const words = getWords(normalizedSentence);
    const wordCount = words.length;

    let syllableCount = 0;
    for (const word of words) {
      syllableCount += countSyllables(word);
    }

    const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

    // Deutsche Amstad-Formel für einzelnen Satz
    const score = 180 - wordCount - (58.5 * avgSyllablesPerWord);

    const { difficulty } = interpretAmstadScore(score);

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
 * Vollständige Textanalyse mit allen Metriken
 */
export function analyzeText(text: string): FullAnalysisResult {
  return {
    flesch: calculateFlesch(text),
    fleschKincaid: calculateFleschKincaid(text),
    wiener: calculateWiener(text),
    gunningFog: calculateGunningFog(text),
    lix: calculateLix(text),
    sentences: analyzeSentences(text),
  };
}
