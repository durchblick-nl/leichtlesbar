/**
 * Zählt die Silben in einem Wort
 * Unterstützt alle europäischen Sprachen (DE, EN, FR, IT, ES, NL)
 */
export function countSyllables(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-zäöüßàâéèêëïîôùûüÿçáíóúñìò]/g, '');
  if (cleanWord.length === 0) return 0;
  if (cleanWord.length <= 3) return 1;

  // Vokale inkl. Umlaute und Akzente (alle europäischen Sprachen)
  const vowels = /[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/gi;
  const matches = cleanWord.match(vowels);

  if (!matches) return 1;

  let syllables = matches.length;

  // Doppelvokale/Diphthonge zählen als eine Silbe
  // z.B. "oiseaux" hat "oi" (2 Vokale) + "eau" (3 Vokale) = 2 Silben, nicht 5
  const diphthongs = /[aeiouyäöüàâéèêëïîôùûÿáíóúìò]{2,}/gi;
  const diphthongMatches = cleanWord.match(diphthongs);
  if (diphthongMatches) {
    for (const d of diphthongMatches) {
      // Jeder Diphthong zählt als 1 Silbe, nicht als d.length Silben
      syllables -= (d.length - 1);
    }
  }

  // Stummes 'e' am Ende (für Französisch: "belle" = 1 Silbe, nicht 2)
  if (cleanWord.endsWith('e') && cleanWord.length > 2) {
    const beforeE = cleanWord.charAt(cleanWord.length - 2);
    if (!/[aeiouyäöüàâéèêëïîôùûÿáíóúìò]/.test(beforeE)) {
      syllables -= 1;
    }
  }

  return Math.max(1, syllables);
}

/**
 * Liste von deutschen Abkürzungen die nicht als Satzende zählen
 */
const ABBREVIATIONS: Record<string, string> = {
  // Häufige Abkürzungen
  'z.B.': 'zum Beispiel',
  'z. B.': 'zum Beispiel',
  'z.b.': 'zum beispiel',
  'z. b.': 'zum beispiel',
  'd.h.': 'das heisst',
  'd. h.': 'das heisst',
  'u.a.': 'unter anderem',
  'u. a.': 'unter anderem',
  'u.A.': 'unter Anderem',
  'usw.': 'und so weiter',
  'etc.': 'et cetera',
  'u.U.': 'unter Umständen',
  'u. U.': 'unter Umständen',
  'z.T.': 'zum Teil',
  'z. T.': 'zum Teil',
  'z.z.': 'zur zeit',
  'z. z.': 'zur zeit',
  'z.Z.': 'zur Zeit',
  'z. Z.': 'zur Zeit',
  'i.d.R.': 'in der Regel',
  'i. d. R.': 'in der Regel',
  'o.g.': 'oben genannt',
  'o. g.': 'oben genannt',
  'o.ä.': 'oder ähnlich',
  'o. ä.': 'oder ähnlich',
  'u.v.m.': 'und vieles mehr',
  's.o.': 'siehe oben',
  's. o.': 'siehe oben',
  's.u.': 'siehe unten',
  's. u.': 'siehe unten',
  'v.a.': 'vor allem',

  // Titel und Anreden
  'Dr.': 'Doktor',
  'dr.': 'doktor',
  'Prof.': 'Professor',
  'prof.': 'professor',
  'Hr.': 'Herr',
  'Fr.': 'Frau',
  'Dipl.': 'Diplomiert',
  'dipl.': 'diplomiert',

  // Allgemeine Abkürzungen
  'Nr.': 'Nummer',
  'ca.': 'circa',
  'bzw.': 'beziehungsweise',
  'ggf.': 'gegebenenfalls',
  'evtl.': 'eventuell',
  'ev.': 'eventuell',
  'inkl.': 'inklusive',
  'exkl.': 'exklusive',
  'max.': 'maximal',
  'min.': 'minimal',
  'vgl.': 'vergleiche',
  'sog.': 'sogenannt',
  'bes.': 'besonders',
  'allg.': 'allgemein',
  'eigentl.': 'eigentlich',
  'ehem.': 'ehemalig',
  'entspr.': 'entsprechend',
  'etw.': 'etwas',
  'spez.': 'spezial',

  // Orte und Richtungen
  'St.': 'Sankt',
  'st.': 'sankt',
  'Sta.': 'Santa',
  'Str.': 'Strasse',

  // Masseinheiten und Zahlen
  'Mio.': 'Millionen',
  'Mrd.': 'Milliarden',
  'Tsd.': 'Tausend',
  't.': 'tonne',
  'c.': 'cent',

  // Kommunikation
  'Tel.': 'Telefon',
  'Fax.': 'Fax',
  'Fa.': 'Firma',
  'fa.': 'firma',

  // Akademisch
  'Abs.': 'Absatz',
  'Abb.': 'Abbildung',
  'Abk.': 'Abkürzung',
  'abk.': 'abkurzung',
  'Anm.': 'Anmerkung',
  'anm.': 'anmerkung',
  'Art.': 'Artikel',
  'Aufl.': 'Auflage',
  'Bd.': 'Band',
  'Bsp.': 'Beispiel',
  'bzgl.': 'bezüglich',
  'Kap.': 'Kapitel',
  'S.': 'Seite',
  's.': 'seite',
  'Sp.': 'Spalte',
  'sp.': 'spalte',
  'f.': 'folgend',
  'ff.': 'fortfolgend',

  // Sprachen und Herkunft
  'dt.': 'deutsch',
  'lat.': 'lateinisch',
  'franz.': 'französisch',
  'ital.': 'italienisch',
  'amer.': 'amerikanisch',
  'europ.': 'europäisch',
  'schweiz.': 'schweizerisch',
  'eidg.': 'eidgenössisch',

  // Wissenschaft
  'med.': 'medizinisch',
  'Med.': 'Medizin',
  'phil.': 'philosophisch',
  'iur.': 'iuris',
  'jur.': 'juris',
  'stud.': 'studiosus',
  'h.c.': 'honoris causa',

  // Religion und Zeit
  'Chr.': 'Christus',
  'hl.': 'heilig',
  'Jh.': 'Jahrhundert',
  'geb.': 'geboren',
  'gest.': 'gestorben',
  'Fam.': 'Familie',
  'fam.': 'familie',

  // Internationale
  'U.S.': 'United States',
  'L.P.': 'Limited Partnership',

  // Einbuchstabige mit Punkt (Vorsicht!)
  ' a.': ' am',
  ' b.': ' bei',
  ' d.': ' dies',
  ' e.': ' ein',
  ' f.': ' folgend',
  ' g.': ' gegen',
  ' i.': ' in',
  ' l.': ' links',
  ' m.': ' mit',
  ' n.': ' nicht',
  ' o.': ' oder',
  ' p.': ' per',
  ' q.': ' quod',
  ' r.': ' rechts',
  ' s.': ' sieh',
  ' t.': ' tonne',
  ' u.': ' und',
  ' v.': ' von',
  ' w.': ' wie',
  ' z.': ' zu',
  'od.': 'oder',
  'gg.': 'gegen',
  'ggs.': 'gegensatz',
};

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
    protected_text = protected_text.replace(new RegExp(abbr.replace(/\./g, '\\.'), 'g'), placeholder);
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
  // Schütze Abkürzungen und Zahlen vor dem Splitting
  let protected_text = protectAbbreviations(text);
  protected_text = protectNumbers(protected_text);
  // Schütze auch "..." (Ellipsis)
  protected_text = protected_text.replace(/\.\.\./g, '###ELLIPSIS###');

  // Teile an Satzenden
  const sentences = protected_text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

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

export type Difficulty = 'sehr-schwer' | 'schwer' | 'mittelschwer' | 'mittel' | 'leicht' | 'sehr-leicht' | 'extrem-leicht';

export type SupportedLanguage = 'de' | 'en' | 'fr' | 'it' | 'es' | 'nl';

/**
 * Übersetzungen für alle unterstützten Sprachen
 */
const translations: Record<SupportedLanguage, {
  tooLittleText: string;
  preschool: string;
  elementary: (grade: number) => string;
  middleSchool: (grade: number) => string;
  highSchool: (grade: number) => string;
  university: string;
  academic: string;
  lowerGrades: (grade: number) => string;
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
    fogStandard: 'Standard - Zeitungsniveau',
    fogDemanding: 'Anspruchsvoll - Fachliteratur',
    fogDifficult: 'Schwierig - Wissenschaftliche Texte',
    fogVeryDifficult: 'Sehr schwierig - Expertenniveau',
    lixVerySimple: 'Sehr einfach - Kinderbücher',
    lixSimple: 'Einfach - Belletristik',
    lixMedium: 'Mittel - Zeitungen',
    lixDifficult: 'Schwierig - Fachliteratur',
    lixVeryDifficult: 'Sehr schwierig - Wissenschaft',
    lixExtremelyDifficult: 'Extrem schwierig - Bürokratie',
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
    lixExtremelyDifficult: 'Extremadamente difícil - Burocracia',
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
  },
};

/**
 * Holt Übersetzungen für eine Sprache
 */
export function getTranslations(lang: SupportedLanguage) {
  return translations[lang] || translations.de;
}

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
  paragraphs: ParagraphAnalysis[];
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
 * Berechnet den Flesch-Lesbarkeitsindex
 * Enthält sowohl die englische Originalformel als auch die deutsche Amstad-Formel
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

  // Englische Flesch-Formel (Rudolf Flesch, 1948)
  // FRE = 206.835 - (1.015 × ASL) - (84.6 × ASW)
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  // Deutsche Amstad-Formel (Toni Amstad, 1978)
  // FRE_deutsch = 180 - ASL - (58.5 × ASW)
  const scoreAmstad = 180 - avgWordsPerSentence - (58.5 * avgSyllablesPerWord);

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

export interface ParagraphAnalysis {
  sentences: SentenceAnalysis[];
}

/**
 * Berechnet die Schwierigkeit eines einzelnen Satzes
 * Verwendet einfache Heuristiken basierend auf Satzlänge und Wortkomiplexität
 */
function getSentenceDifficulty(wordCount: number, avgSyllablesPerWord: number): Difficulty {
  // Einfache Heuristik:
  // - Kurze Sätze (≤ 8 Wörter) mit einfachen Wörtern (< 1.6 Silben) = leicht
  // - Mittlere Sätze (≤ 15 Wörter) oder mittlere Wörter = mittel
  // - Lange Sätze (> 15 Wörter) oder komplexe Wörter (> 2 Silben) = schwer

  const isShort = wordCount <= 8;
  const isMedium = wordCount <= 15;
  const isSimpleWords = avgSyllablesPerWord < 1.6;
  const isMediumWords = avgSyllablesPerWord < 2.0;

  if (isShort && isSimpleWords) {
    return 'sehr-leicht';
  } else if (isShort && isMediumWords) {
    return 'leicht';
  } else if (isMedium && isSimpleWords) {
    return 'leicht';
  } else if (isMedium && isMediumWords) {
    return 'mittel';
  } else if (!isMediumWords) {
    return 'schwer';
  } else {
    return 'mittelschwer';
  }
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
