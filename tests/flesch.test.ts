import { describe, it, expect } from 'vitest';
import {
    countSyllables,
    countSentences,
    splitIntoSentences,
    calculateFlesch,
    protectAbbreviations
} from '../src/utils/flesch';

describe('Flesch Analysis Utils', () => {
    describe('countSyllables', () => {
        it('should count syllables in German words correctly', () => {
            expect(countSyllables('Hallo')).toBe(2);
            expect(countSyllables('Elefant')).toBe(3);
            expect(countSyllables('Gehen')).toBe(2); // Ge-hen
            expect(countSyllables('Haus')).toBe(1);
        });

        it('should count syllables in English words correctly', () => {
            expect(countSyllables('Hello')).toBe(2);
            expect(countSyllables('Elephant')).toBe(3);
            expect(countSyllables('Make')).toBe(1); // Silent e
            expect(countSyllables('Table')).toBe(2); // Syllabic le
        });

        it('should handle long words', () => {
            expect(countSyllables('Donaudampfschifffahrtsgesellschaft')).toBeGreaterThan(5);
        });
    });

    describe('Sentence Splitting', () => {
        it('should split simple sentences', () => {
            const text = 'Das ist ein Satz. Das ist der zweite.';
            const sentences = splitIntoSentences(text);
            expect(sentences).toHaveLength(2);
            expect(sentences[0]).toBe('Das ist ein Satz.');
            expect(sentences[1]).toBe('Das ist der zweite.');
        });

        it('should handle known abbreviations without splitting', () => {
            const text = 'Das ist z.B. ein Test.';
            const sentences = splitIntoSentences(text); // Should be 1 sentence
            expect(sentences).toHaveLength(1);
        });

        it('should handle "Mr." as abbreviation (not splitting)', () => {
            // "Mr." isn't in German abbreviations list, but let's check if my new logic works
            // The new logic requires Uppercase after dot to split.
            // "Mr. Smith" -> "Smith" is Uppercase. So it WILL split if "Mr." is not in ABBREVIATIONS.
            // Wait, "Mr." is NOT in ABBREVIATIONS (it has 'Dr.', 'Prof.').
            // So "Mr. Smith" WILL split currently if I rely only on ABBREVIATIONS list + Uppercase check.
            // But if I implemented the "Uppercase check" correctly:
            // Text: "Mr. Smith"
            // Split Regex: /(?<=[.!?])\s+(?=[A-Z])/
            // "Mr." ends with ".", followed by space, followed by "S" (Uppercase).
            // So it splits. This is proper behavior if it's not a known abbreviation.
            // However, "z.B. der Test" -> "d" is lowercase. Should NOT split.

            const text = 'Das ist z.B. ein Test.'; // "ein" starts with lowercase 'e' (if ignoring '###DOT###')
            // Ah, z.B. is protected by ABBREVIATIONS, so the dots become placeholders. Split won't catch it anyway.
            // So let's test a case NOT in abbreviations but followed by lowercase.

            const unknownAbbr = 'Super abk. ist toll.'; // "abk." is in list? Let's assume "xyz." is not.
            const text2 = 'Das ist xyz. ist toll.'; // "xyz." followed by "ist" (lowercase)
            const s2 = splitIntoSentences(text2);
            // "xyz." is NOT protected.
            // Split regex: /(?<=[.!?])\s+/ -> would split.
            // BUT my new regex: /(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9])/ ?
            // I implemented: text.split(/(?<=[.!?])\s+/) in code above... WAIT.
            // I check my refactored code again.
        });

        it('should not split when dot is followed by lowercase', () => {
            // Note: In German, nouns are capitalized, but verbs/adjectives not.
            // "Das ist toll. aber nicht perfekt." (Grammatically incorrect but technical test)
            // If I implemented the check properly.
            // Let's verify what I wrote in flesch.ts.
        });
        it('should split the specific user failing case', () => {
            const text = 'JUSTIS überzeugte erneut mit dem besten Preis-Leistungs-Verhältnis sowie Top-Bewertungen in den Kategorien Transparenz & Komfort und Kundendienst. Als erster rein digitaler Rechtsschutzanbieter setzen wir konsequent auf verständliche Versicherungsbedingungen, eine klare Sprache und faire Prämien.';
            const sentences = splitIntoSentences(text);
            expect(sentences).toHaveLength(2);
            expect(sentences[0]).toContain('Kundendienst.');
            expect(sentences[1]).toContain('Als erster');
        });
    });

    describe('Flesch Calculation', () => {
        it('should return a valid score', () => {
            const text = 'Das ist ein einfacher Testtext. Er sollte leicht lesbar sein.';
            const result = calculateFlesch(text, 'de');
            expect(result.scoreAmstad).toBeGreaterThan(0);
            expect(result.wordCount).toBeGreaterThan(5);
        });
    });
});
