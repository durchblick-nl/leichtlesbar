import type { SupportedLanguage } from '../types';

export const translations: Record<SupportedLanguage, {
    tooLittleText: string;
    preschool: string;
    elementary: (grade: number) => string;
    middleSchool: (grade: number) => string;
    highSchool: (grade: number) => string;
    university: string;
    academic: string;
    lowerGrades: (grade: number) => string;
    // UI New
    emptyState: {
        title: string;
        subtitle: string;
    };
    tooltip: {
        readability: string;
        words: string;
        syllables: string;
    };
    // Flesch interpretations
    fleschVeryHard: string;
    fleschHard: string;
    fleschFairlyHard: string;
    fleschMedium: string;
    fleschEasy: string;
    fleschVeryEasy: string;
    fleschExtremelyEasy: string;
    // Amstad interpretations
    amstadExtremelyHard: string;
    amstadVeryHard: string;
    amstadHard: string;
    amstadFairlyHard: string;
    amstadMedium: string;
    amstadEasy: string;
    amstadVeryEasy: string;
    amstadExtremelyEasy: string;
    // Gunning Fog interpretations
    fogVerySimple: string;
    fogSimple: string;
    fogStandard: string;
    fogDemanding: string;
    fogDifficult: string;
    fogVeryDifficult: string;
    // LIX interpretations
    lixVerySimple: string;
    lixSimple: string;
    lixMedium: string;
    lixDifficult: string;
    lixVeryDifficult: string;
    lixExtremelyDifficult: string;
}> = {
    de: {
        tooLittleText: 'Zu wenig Text',
        preschool: 'Vorschule',
        elementary: (grade) => `Grundschule (${grade}. Klasse)`,
        middleSchool: (grade) => `Mittelstufe (${grade}. Klasse)`,
        highSchool: (grade) => `Oberstufe (${grade}. Klasse)`,
        university: 'Universitätsniveau',
        academic: 'Akademisches Niveau',
        lowerGrades: (grade) => `Unterstufe (${grade}. Klasse)`,
        fleschVeryHard: 'Sehr schwer - Akademiker',
        fleschHard: 'Schwer - Studium',
        fleschFairlyHard: 'Mittelschwer - 16+ Jahre',
        fleschMedium: 'Mittel - 13-15 Jahre',
        fleschEasy: 'Leicht - 12 Jahre',
        fleschVeryEasy: 'Sehr leicht - 11 Jahre',
        fleschExtremelyEasy: 'Extrem leicht - 10 Jahre',
        amstadExtremelyHard: 'Extrem schwer - Akademiker',
        amstadVeryHard: 'Sehr schwer - Studium',
        amstadHard: 'Schwer - Matura/Abitur',
        amstadFairlyHard: 'Mittelschwer - 16+ Jahre',
        amstadMedium: 'Mittel - 13-15 Jahre',
        amstadEasy: 'Leicht - 12 Jahre',
        amstadVeryEasy: 'Sehr leicht - 11 Jahre',
        amstadExtremelyEasy: 'Extrem leicht - 10 Jahre',
        fogVerySimple: 'Sehr einfach - für jeden verständlich',
        fogSimple: 'Einfach - Alltagssprache',
        fogStandard: 'Standaard - Zeitungsniveau',
        fogDemanding: 'Anspruchsvoll - Fachliteratur',
        fogDifficult: 'Schwierig - Wissenschaftliche Texte',
        fogVeryDifficult: 'Sehr schwierig - Expertenniveau',
        lixVerySimple: 'Sehr einfach - Kinderbücher',
        lixSimple: 'Einfach - Belletristik',
        lixMedium: 'Mittel - Zeitungen',
        lixDifficult: 'Schwierig - Fachliteratur',
        lixVeryDifficult: 'Sehr schwierig - Wissenschaft',
        lixExtremelyDifficult: 'Extrem schwierig - Bürokratie',
        emptyState: {
            title: 'Beginne mit der Eingabe',
            subtitle: 'Oder wähle einen Beispieltext aus',
        },
        tooltip: {
            readability: 'Lesbarkeit',
            words: 'Wörter',
            syllables: 'Silben',
        },
    },
    en: {
        tooLittleText: 'Too little text',
        preschool: 'Preschool',
        elementary: (grade) => `Elementary school (Grade ${grade})`,
        middleSchool: (grade) => `Middle school (Grade ${grade})`,
        highSchool: (grade) => `High school (Grade ${grade})`,
        university: 'University level',
        academic: 'Academic level',
        lowerGrades: (grade) => `Lower grades (Grade ${grade})`,
        fleschVeryHard: 'Very hard - Academic',
        fleschHard: 'Hard - University',
        fleschFairlyHard: 'Fairly hard - 16+ years',
        fleschMedium: 'Medium - 13-15 years',
        fleschEasy: 'Easy - 12 years',
        fleschVeryEasy: 'Very easy - 11 years',
        fleschExtremelyEasy: 'Extremely easy - 10 years',
        amstadExtremelyHard: 'Extremely hard - Academic',
        amstadVeryHard: 'Very hard - University',
        amstadHard: 'Hard - High school diploma',
        amstadFairlyHard: 'Fairly hard - 16+ years',
        amstadMedium: 'Medium - 13-15 years',
        amstadEasy: 'Easy - 12 years',
        amstadVeryEasy: 'Very easy - 11 years',
        amstadExtremelyEasy: 'Extremely easy - 10 years',
        fogVerySimple: 'Very simple - Understandable by everyone',
        fogSimple: 'Simple - Everyday language',
        fogStandard: 'Standard - Newspaper level',
        fogDemanding: 'Demanding - Technical literature',
        fogDifficult: 'Difficult - Scientific texts',
        fogVeryDifficult: 'Very difficult - Expert level',
        lixVerySimple: 'Very simple - Children\'s books',
        lixSimple: 'Simple - Fiction',
        lixMedium: 'Medium - Newspapers',
        lixDifficult: 'Difficult - Technical literature',
        lixVeryDifficult: 'Very difficult - Scientific',
        lixExtremelyDifficult: 'Extremely difficult - Bureaucracy',
        emptyState: {
            title: 'Start typing',
            subtitle: 'Or choose an example text',
        },
        tooltip: {
            readability: 'Readability',
            words: 'Words',
            syllables: 'Syllables',
        },
    },
    fr: {
        tooLittleText: 'Texte trop court',
        preschool: 'Préscolaire',
        elementary: (grade) => `École primaire (${grade}e année)`,
        middleSchool: (grade) => `Collège (${grade}e année)`,
        highSchool: (grade) => `Lycée (${grade}e année)`,
        university: 'Niveau universitaire',
        academic: 'Niveau académique',
        lowerGrades: (grade) => `Cycle primaire (${grade}e année)`,
        fleschVeryHard: 'Très difficile - Académique',
        fleschHard: 'Difficile - Université',
        fleschFairlyHard: 'Assez difficile - 16+ ans',
        fleschMedium: 'Moyen - 13-15 ans',
        fleschEasy: 'Facile - 12 ans',
        fleschVeryEasy: 'Très facile - 11 ans',
        fleschExtremelyEasy: 'Extrêmement facile - 10 ans',
        amstadExtremelyHard: 'Extrêmement difficile - Académique',
        amstadVeryHard: 'Très difficile - Université',
        amstadHard: 'Difficile - Baccalauréat',
        amstadFairlyHard: 'Assez difficile - 16+ ans',
        amstadMedium: 'Moyen - 13-15 ans',
        amstadEasy: 'Facile - 12 ans',
        amstadVeryEasy: 'Très facile - 11 ans',
        amstadExtremelyEasy: 'Extrêmement facile - 10 ans',
        fogVerySimple: 'Très simple - Compréhensible par tous',
        fogSimple: 'Simple - Langage courant',
        fogStandard: 'Standard - Niveau journal',
        fogDemanding: 'Exigeant - Littérature technique',
        fogDifficult: 'Difficile - Textes scientifiques',
        fogVeryDifficult: 'Très difficile - Niveau expert',
        lixVerySimple: 'Très simple - Livres pour enfants',
        lixSimple: 'Simple - Fiction',
        lixMedium: 'Moyen - Journaux',
        lixDifficult: 'Difficile - Littérature technique',
        lixVeryDifficult: 'Très difficile - Scientifique',
        lixExtremelyDifficult: 'Extrêmement difficile - Bureaucratie',
        emptyState: {
            title: 'Commencez à écrire',
            subtitle: 'Ou choisissez un texte d\'exemple',
        },
        tooltip: {
            readability: 'Lisibilité',
            words: 'Mots',
            syllables: 'Syllabes',
        },
    },
    it: {
        tooLittleText: 'Testo troppo breve',
        preschool: 'Prescolare',
        elementary: (grade) => `Scuola elementare (${grade}° anno)`,
        middleSchool: (grade) => `Scuola media (${grade}° anno)`,
        highSchool: (grade) => `Scuola superiore (${grade}° anno)`,
        university: 'Livello universitario',
        academic: 'Livello accademico',
        lowerGrades: (grade) => `Ciclo primario (${grade}° anno)`,
        fleschVeryHard: 'Molto difficile - Accademico',
        fleschHard: 'Difficile - Università',
        fleschFairlyHard: 'Abbastanza difficile - 16+ anni',
        fleschMedium: 'Medio - 13-15 anni',
        fleschEasy: 'Facile - 12 anni',
        fleschVeryEasy: 'Molto facile - 11 anni',
        fleschExtremelyEasy: 'Estremamente facile - 10 anni',
        amstadExtremelyHard: 'Estremamente difficile - Accademico',
        amstadVeryHard: 'Molto difficile - Università',
        amstadHard: 'Difficile - Diploma superiore',
        amstadFairlyHard: 'Abbastanza difficile - 16+ anni',
        amstadMedium: 'Medio - 13-15 anni',
        amstadEasy: 'Facile - 12 anni',
        amstadVeryEasy: 'Molto facile - 11 anni',
        amstadExtremelyEasy: 'Estremamente facile - 10 anni',
        fogVerySimple: 'Molto semplice - Comprensibile a tutti',
        fogSimple: 'Semplice - Linguaggio quotidiano',
        fogStandard: 'Standard - Livello giornale',
        fogDemanding: 'Impegnativo - Letteratura tecnica',
        fogDifficult: 'Difficile - Testi scientifici',
        fogVeryDifficult: 'Molto difficile - Livello esperto',
        lixVerySimple: 'Molto semplice - Libri per bambini',
        lixSimple: 'Semplice - Narrativa',
        lixMedium: 'Medio - Giornali',
        lixDifficult: 'Difficile - Letteratura tecnica',
        lixVeryDifficult: 'Molto difficile - Scientifico',
        lixExtremelyDifficult: 'Estremamente difficile - Burocrazia',
        emptyState: {
            title: 'Inizia a scrivere',
            subtitle: 'O scegli un testo di esempio',
        },
        tooltip: {
            readability: 'Leggibilità',
            words: 'Parole',
            syllables: 'Sillabe',
        },
    },
    es: {
        tooLittleText: 'Texto demasiado corto',
        preschool: 'Preescolar',
        elementary: (grade) => `Escuela primaria (${grade}° grado)`,
        middleSchool: (grade) => `Secundaria (${grade}° grado)`,
        highSchool: (grade) => `Bachillerato (${grade}° grado)`,
        university: 'Nivel universitario',
        academic: 'Nivel académico',
        lowerGrades: (grade) => `Ciclo primario (${grade}° grado)`,
        fleschVeryHard: 'Muy difícil - Académico',
        fleschHard: 'Difícil - Universidad',
        fleschFairlyHard: 'Bastante difícil - 16+ años',
        fleschMedium: 'Medio - 13-15 años',
        fleschEasy: 'Fácil - 12 años',
        fleschVeryEasy: 'Muy fácil - 11 años',
        fleschExtremelyEasy: 'Extremadamente fácil - 10 años',
        amstadExtremelyHard: 'Extremadamente difícil - Académico',
        amstadVeryHard: 'Muy difícil - Universidad',
        amstadHard: 'Difícil - Bachillerato',
        amstadFairlyHard: 'Bastante difícil - 16+ años',
        amstadMedium: 'Medio - 13-15 años',
        amstadEasy: 'Fácil - 12 años',
        amstadVeryEasy: 'Muy fácil - 11 años',
        amstadExtremelyEasy: 'Extremadamente fácil - 10 años',
        fogVerySimple: 'Muy simple - Comprensible por todos',
        fogSimple: 'Simple - Lenguaje cotidiano',
        fogStandard: 'Estándar - Nivel periódico',
        fogDemanding: 'Exigente - Literatura técnica',
        fogDifficult: 'Difícil - Textos científicos',
        fogVeryDifficult: 'Muy difícil - Nivel experto',
        lixVerySimple: 'Muy simple - Libros infantiles',
        lixSimple: 'Simple - Ficción',
        lixMedium: 'Medio - Periódicos',
        lixDifficult: 'Difícil - Literatura técnica',
        lixVeryDifficult: 'Muy difícil - Científico',
        lixExtremelyDifficult: 'Extremadamente difícil - Burocrazia',
        emptyState: {
            title: 'Empieza a escribir',
            subtitle: 'O elige un texto de ejemplo',
        },
        tooltip: {
            readability: 'Legibilidad',
            words: 'Palabras',
            syllables: 'Sílabas',
        },
    },
    nl: {
        tooLittleText: 'Te weinig tekst',
        preschool: 'Kleuterschool',
        elementary: (grade) => `Basisschool (groep ${grade})`,
        middleSchool: (grade) => `Middelbare school (klas ${grade})`,
        highSchool: (grade) => `Bovenbouw (klas ${grade})`,
        university: 'Universitair niveau',
        academic: 'Academisch niveau',
        lowerGrades: (grade) => `Onderbouw (groep ${grade})`,
        fleschVeryHard: 'Zeer moeilijk - Academisch',
        fleschHard: 'Moeilijk - Universiteit',
        fleschFairlyHard: 'Vrij moeilijk - 16+ jaar',
        fleschMedium: 'Gemiddeld - 13-15 jaar',
        fleschEasy: 'Makkelijk - 12 jaar',
        fleschVeryEasy: 'Zeer makkelijk - 11 jaar',
        fleschExtremelyEasy: 'Extreem makkelijk - 10 jaar',
        amstadExtremelyHard: 'Extreem moeilijk - Academisch',
        amstadVeryHard: 'Zeer moeilijk - Universiteit',
        amstadHard: 'Moeilijk - VWO/Gymnasium',
        amstadFairlyHard: 'Vrij moeilijk - 16+ jaar',
        amstadMedium: 'Gemiddeld - 13-15 jaar',
        amstadEasy: 'Makkelijk - 12 jaar',
        amstadVeryEasy: 'Zeer makkelijk - 11 jaar',
        amstadExtremelyEasy: 'Extreem makkelijk - 10 jaar',
        fogVerySimple: 'Zeer eenvoudig - Begrijpelijk voor iedereen',
        fogSimple: 'Eenvoudig - Alledaagse taal',
        fogStandard: 'Standaard - Krantenniveau',
        fogDemanding: 'Veeleisend - Vakliteratuur',
        fogDifficult: 'Moeilijk - Wetenschappelijke teksten',
        fogVeryDifficult: 'Zeer moeilijk - Expertniveau',
        lixVerySimple: 'Zeer eenvoudig - Kinderboeken',
        lixSimple: 'Eenvoudig - Fictie',
        lixMedium: 'Gemiddeld - Kranten',
        lixDifficult: 'Moeilijk - Vakliteratuur',
        lixVeryDifficult: 'Zeer moeilijk - Wetenschappelijk',
        lixExtremelyDifficult: 'Extreem moeilijk - Bureaucratie',
        emptyState: {
            title: 'Begin met typen',
            subtitle: 'Of kies een voorbeeldtekst',
        },
        tooltip: {
            readability: 'Leesbaarheid',
            words: 'Woorden',
            syllables: 'Lettergrepen',
        },
    },
};
