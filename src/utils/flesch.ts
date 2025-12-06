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
  // Satzzeichen die einen Satz beenden
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

export interface FleschResult {
  score: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  uniqueWords: number;
  interpretation: string;
  difficulty: 'sehr-schwer' | 'schwer' | 'mittelschwer' | 'mittel' | 'leicht' | 'sehr-leicht' | 'extrem-leicht';
}

/**
 * Interpretiert den Flesch-Wert
 */
export function interpretFleschScore(score: number): { interpretation: string; difficulty: FleschResult['difficulty'] } {
  if (score < 30) {
    return { interpretation: 'Sehr schwer - Akademische Texte, schwer verständlich', difficulty: 'sehr-schwer' };
  } else if (score < 50) {
    return { interpretation: 'Schwer - Wissenschaftliche Texte', difficulty: 'schwer' };
  } else if (score < 60) {
    return { interpretation: 'Mittelschwer - Qualitätszeitungen', difficulty: 'mittelschwer' };
  } else if (score < 70) {
    return { interpretation: 'Mittel - Boulevardzeitungen', difficulty: 'mittel' };
  } else if (score < 80) {
    return { interpretation: 'Leicht - Werbetexte, gut verständlich', difficulty: 'leicht' };
  } else if (score < 90) {
    return { interpretation: 'Sehr leicht - Comics, sehr gut verständlich', difficulty: 'sehr-leicht' };
  } else {
    return { interpretation: 'Extrem leicht - Grundschulniveau', difficulty: 'extrem-leicht' };
  }
}

/**
 * Berechnet den Flesch-Lesbarkeitsindex für deutschen Text
 * Formel: 206.835 - (1.015 × ASL) - (84.6 × ASW)
 * ASL = Average Sentence Length (Wörter pro Satz)
 * ASW = Average Syllables per Word (Silben pro Wort)
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

  // Flesch-Formel (angepasst für Deutsch)
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  const { interpretation, difficulty } = interpretFleschScore(score);

  return {
    score: Math.round(score * 10) / 10,
    wordCount,
    sentenceCount,
    syllableCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    uniqueWords: uniqueWordsSet.size,
    interpretation,
    difficulty,
  };
}
