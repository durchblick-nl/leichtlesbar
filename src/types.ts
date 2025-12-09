export type Difficulty = 'sehr-schwer' | 'schwer' | 'mittelschwer' | 'mittel' | 'leicht' | 'sehr-leicht' | 'extrem-leicht';

export type SupportedLanguage = 'de' | 'en' | 'fr' | 'it' | 'es' | 'nl';

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

export interface ParagraphAnalysis {
    sentences: SentenceAnalysis[];
}

export interface FullAnalysisResult {
    flesch: FleschResult;
    fleschKincaid: FleschKincaidResult;
    wiener: WienerResult;
    gunningFog: GunningFogResult;
    lix: LixResult;
    sentences: SentenceAnalysis[];
    paragraphs: ParagraphAnalysis[];
}
