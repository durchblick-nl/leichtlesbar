# Plan: Mehrsprachige Version von Readability.ch

## Übersicht

Erweiterung der Webseite um vollständige Unterstützung für mehrere Sprachen, jeweils mit:
- Sprachspezifische Lesbarkeitsformeln
- Lokalisierte UI (Navigation, Labels, Buttons)
- Übersetzte Inhalte (FAQ, Tipps, Interpretationstabelle)
- Sprachspezifische Beispieltexte
- Angepasste Silbenzählung
- Lokale Abkürzungslisten

---

## Unterstützte Sprachen

| Sprache | Code | URL | Priorität |
|---------|------|-----|-----------|
| Deutsch | `de` | `/` (Standard) | ✅ Existiert |
| Englisch | `en` | `/en/` | 1 - Höchste |
| Französisch | `fr` | `/fr/` | 2 - Hoch |
| Italienisch | `it` | `/it/` | 3 - Mittel |
| Spanisch | `es` | `/es/` | 4 - Mittel |
| Niederländisch | `nl` | `/nl/` | 5 - Optional |

---

## Formeln pro Sprache

### Deutsch (de) - Bereits implementiert
| Formel | Entwickler | Jahr | Verwendung |
|--------|-----------|------|------------|
| **Flesch-Amstad** | Toni Amstad | 1978 | Primär |
| Wiener Sachtextformel | Bamberger & Vanecek | 1984 | Sachtexte |
| Flesch-Kincaid | Kincaid | 1975 | Schulklasse |
| Gunning-Fog | Gunning | 1952 | Sekundär |
| LIX | Björnsson | 1968 | Sprachunabhängig |

**Formel Flesch-Amstad:**
```
FRE = 180 - ASL - (58.5 × ASW)
```

### Englisch (en)
| Formel | Entwickler | Jahr | Korrelation | Verwendung |
|--------|-----------|------|-------------|------------|
| **Flesch Reading Ease** | Rudolf Flesch | 1948 | .88 | Primär |
| Flesch-Kincaid Grade | Kincaid | 1975 | .91 | Schulklasse |
| Gunning Fog | Robert Gunning | 1952 | .91 | Business |
| Dale-Chall | Dale & Chall | 1948 | .93 | Höchste Genauigkeit |
| SMOG | McLaughlin | 1969 | .88 | Healthcare |
| LIX | Björnsson | 1968 | - | Vergleich |

**Formel Flesch Reading Ease:**
```
FRE = 206.835 - (1.015 × ASL) - (84.6 × ASW)
```

**Formel Gunning Fog:**
```
FOG = 0.4 × (ASL + PHW)
PHW = Prozent Wörter mit 3+ Silben
```

**Formel SMOG:**
```
SMOG = 3 + √(Anzahl Wörter mit 3+ Silben in 30 Sätzen)
```

**Formel Dale-Chall:**
```
Score = 0.1579 × PDW + 0.0496 × ASL + 3.6365
PDW = Prozent Wörter NICHT auf der Dale-Chall-Liste (3000 Wörter)
```

### Französisch (fr)
| Formel | Entwickler | Jahr | Verwendung |
|--------|-----------|------|------------|
| **Kandel-Moles** | Kandel & Moles | 1958 | Primär |
| Henry | Henry | 1975 | Alternative |
| LIX | Björnsson | 1968 | Vergleich |

**Formel Kandel-Moles:**
```
FRE = 207 - (1.015 × ASL) - (73.6 × ASW)
```

**Hinweis:** Frankophone Länder nutzen Lesbarkeitstests kulturell weniger als angelsächsische Länder.

### Italienisch (it)
| Formel | Entwickler | Jahr | Verwendung |
|--------|-----------|------|------------|
| **GULPEASE** | Gruppo Universitario | 1988 | Primär |
| Flesch-Vacca | Vacca | - | Alternative |
| LIX | Björnsson | 1968 | Vergleich |

**Formel GULPEASE (Besonderheit: verwendet Buchstaben statt Silben!):**
```
GULPEASE = 89 + ((300 × Sätze - 10 × Buchstaben) / Wörter)
```

**Interpretation GULPEASE:**
| Score | Schwierigkeit |
|-------|---------------|
| < 80 | Schwer für Grundschule |
| < 60 | Schwer für Mittelstufe |
| < 40 | Schwer für Oberstufe |

### Spanisch (es)
| Formel | Entwickler | Jahr | Verwendung |
|--------|-----------|------|------------|
| **Flesch-Szigriszt (INFLESZ)** | Szigriszt | 1993 | Primär |
| Crawford | Crawford | 1985 | Alternative |
| LIX | Björnsson | 1968 | Vergleich |

**Formel Flesch-Szigriszt:**
```
INFLESZ = 206.84 - (1.02 × ASL) - (60 × ASW)
```

### Niederländisch (nl)
| Formel | Entwickler | Jahr | Verwendung |
|--------|-----------|------|------------|
| **Flesch-Douma** | Douma | 1960 | Primär |
| Leesindex-A (LiA) | - | - | Alternative |
| LIX | Björnsson | 1968 | Vergleich |

**Formel Flesch-Douma:**
```
FRE = 206.84 - (0.93 × ASL) - (77 × ASW)
```

---

## Koeffizienten-Vergleich

| Sprache | Basis | ASL-Koeff. | ASW-Koeff. | Grund |
|---------|-------|------------|------------|-------|
| Englisch | 206.835 | 1.015 | 84.6 | Original |
| Deutsch | 180 | 1.0 | 58.5 | Längere Wörter |
| Französisch | 207 | 1.015 | 73.6 | Mittlere Wortlänge |
| Spanisch | 206.84 | 1.02 | 60.0 | Mehr Silben |
| Niederländisch | 206.84 | 0.93 | 77.0 | Ähnlich wie DE |

---

## Projektstruktur (neu)

```
src/
├── i18n/
│   ├── index.ts              # i18n Setup & Hilfsfunktionen
│   ├── translations/
│   │   ├── de.ts             # Deutsche Übersetzungen
│   │   ├── en.ts             # Englische Übersetzungen
│   │   ├── fr.ts             # Französische Übersetzungen
│   │   ├── it.ts             # Italienische Übersetzungen
│   │   ├── es.ts             # Spanische Übersetzungen
│   │   └── nl.ts             # Niederländische Übersetzungen
│   └── examples/
│       ├── de.ts             # Deutsche Beispieltexte
│       ├── en.ts             # Englische Beispieltexte
│       ├── fr.ts             # Französische Beispieltexte
│       ├── it.ts             # Italienische Beispieltexte
│       ├── es.ts             # Spanische Beispieltexte
│       └── nl.ts             # Niederländische Beispieltexte
│
├── utils/
│   └── readability/
│       ├── index.ts          # Exports & gemeinsame Typen
│       ├── core.ts           # Gemeinsame Funktionen
│       ├── formulas/
│       │   ├── flesch.ts     # Alle Flesch-Varianten (DE, EN, FR, ES, NL)
│       │   ├── wiener.ts     # Wiener Sachtextformel (DE)
│       │   ├── fog.ts        # Gunning Fog (EN, DE)
│       │   ├── lix.ts        # LIX (alle Sprachen)
│       │   ├── smog.ts       # SMOG (EN)
│       │   ├── dale-chall.ts # Dale-Chall (EN)
│       │   └── gulpease.ts   # GULPEASE (IT)
│       ├── syllables/
│       │   ├── index.ts      # Dispatcher nach Sprache
│       │   ├── de.ts         # Deutsche Silbenzählung
│       │   ├── en.ts         # Englische Silbenzählung
│       │   ├── fr.ts         # Französische Silbenzählung
│       │   ├── it.ts         # Italienische Silbenzählung
│       │   ├── es.ts         # Spanische Silbenzählung
│       │   └── nl.ts         # Niederländische Silbenzählung
│       ├── abbreviations/
│       │   ├── index.ts      # Dispatcher nach Sprache
│       │   ├── de.ts         # Deutsche Abkürzungen (existiert)
│       │   ├── en.ts         # Englische Abkürzungen
│       │   ├── fr.ts         # Französische Abkürzungen
│       │   ├── it.ts         # Italienische Abkürzungen
│       │   ├── es.ts         # Spanische Abkürzungen
│       │   └── nl.ts         # Niederländische Abkürzungen
│       └── wordlists/
│           └── dale-chall.ts # 3000-Wörter-Liste für Dale-Chall
│
├── components/
│   ├── FleschAnalyzer.astro  # Angepasst für Mehrsprachigkeit
│   ├── LanguageSwitcher.astro # Neu: Sprachauswahl
│   └── FormulaCard.astro     # Neu: Wiederverwendbare Formel-Karte
│
├── layouts/
│   └── Layout.astro          # Angepasst mit lang-Attribut & hreflang
│
└── pages/
    ├── index.astro           # Deutsch (Standard)
    ├── en/
    │   └── index.astro       # Englisch
    ├── fr/
    │   └── index.astro       # Französisch
    ├── it/
    │   └── index.astro       # Italienisch
    ├── es/
    │   └── index.astro       # Spanisch
    └── nl/
        └── index.astro       # Niederländisch

public/
├── sitemap.xml               # Aktualisiert mit allen Sprachen
└── og-image-[lang].svg       # OG-Images pro Sprache (optional)
```

---

## Inhalte pro Sprache

### 1. Navigation & UI

| Element | DE | EN | FR | IT | ES | NL |
|---------|----|----|----|----|----|----|
| Testen | Test | Tester | Testa | Probar | Testen |
| Formel | Formula | Formule | Formula | Fórmula | Formule |
| FAQ | FAQ | FAQ | FAQ | FAQ | FAQ |
| Tipps | Tips | Conseils | Consigli | Consejos | Tips |
| Datenschutz | Privacy | Confidentialité | Privacy | Privacidad | Privacy |
| Beispieltext | Example text | Texte d'exemple | Testo di esempio | Texto de ejemplo | Voorbeeldtekst |

### 2. Hero-Sektion

**DE:** "Testen Sie die Lesbarkeit Ihrer Texte"
**EN:** "Test the Readability of Your Texts"
**FR:** "Testez la lisibilité de vos textes"
**IT:** "Verifica la leggibilità dei tuoi testi"
**ES:** "Comprueba la legibilidad de tus textos"
**NL:** "Test de leesbaarheid van uw teksten"

### 3. Beispieltexte (3 pro Sprache)

#### Deutsch (existiert)
- Leicht: Kinderbuch-Stil
- Mittel: Zeitungsartikel
- Schwer: Wissenschaftlicher Text

#### Englisch
- **Easy:** "The sun rises in the east. Birds sing in the trees. Children play in the park. Life is simple and good."
- **Medium:** News article about technology or current events
- **Hard:** Scientific or legal text (e.g., from academic journal)

#### Französisch
- **Facile:** Simple narrative text (children's book style)
- **Moyen:** Article from Le Monde or similar
- **Difficile:** Philosophical or legal text

#### Italienisch
- **Facile:** Simple story or description
- **Medio:** Newspaper article (La Repubblica style)
- **Difficile:** Academic or bureaucratic text

#### Spanisch
- **Fácil:** Simple narrative
- **Medio:** News article (El País style)
- **Difícil:** Legal or academic text

#### Niederländisch
- **Makkelijk:** Simple text
- **Gemiddeld:** Newspaper article
- **Moeilijk:** Legal or scientific text

### 4. FAQ-Sektion (6 Fragen pro Sprache)

1. Was ist der [Formelname]-Index?
2. Welche Formel wird für [Sprache] Texte verwendet?
3. Werden meine Texte gespeichert?
4. Welcher Wert ist optimal?
5. Warum werden mehrere Indizes angezeigt?
6. Kann ich einen Link teilen?

### 5. Tipps für verständliche Texte (8 pro Sprache)

1. Kurze Sätze
2. Einfache Wörter
3. Aktiv statt Passiv
4. Verben statt Substantive
5. Fremdwörter erklären
6. Kurze Absätze
7. Füllwörter streichen
8. Laut lesen

### 6. Interpretationstabelle

Angepasst pro Sprache mit lokalen Beispielen:

| Wert | DE Beispiel | EN Beispiel | FR Beispiel |
|------|-------------|-------------|-------------|
| 0-30 | Wissenschaft | Academic papers | Textes juridiques |
| 30-50 | Fachbücher | Technical docs | Littérature classique |
| 50-60 | NZZ | The Economist | Le Monde |
| 60-70 | Blick | USA Today | Paris Match |
| 70-80 | Werbung | Advertising | Publicité |
| 80+ | Comics | Children's books | BD pour enfants |

### 7. Datenschutz-Sektion

Gleicher Inhalt, übersetzt:
- Keine Datenübertragung
- Keine Server-Speicherung
- Keine Cookies
- Offline nutzbar

---

## Silbenzählung pro Sprache

### Deutsch (existiert)
- Vokale: a, e, i, o, u, ä, ö, ü, y
- Diphthonge: ei, au, eu, äu, ie
- Besonderheiten: Komposita, stummes e

### Englisch
```typescript
// Besonderheiten:
// - Stummes 'e' am Ende: make, take, love → 1 Silbe
// - Suffixe: -ed oft stumm (walked = 1, wanted = 2)
// - Diphthonge: oo, ea, ou, oi, ow
// - Ausnahmen: -le am Ende zählt (table = 2)
```

### Französisch
```typescript
// Besonderheiten:
// - Stummes 'e' am Ende: faire, vivre → zählt nicht
// - Aber: née, café → é zählt
// - Nasalvokale: an, en, in, on, un = 1 Silbe
// - Diphthonge: oi, ou, ai, eau, au = 1 Silbe
// - Liaison (zwischen Wörtern) - ignorieren wir
```

### Italienisch
```typescript
// Besonderheiten:
// - Klare Vokalstruktur: a, e, i, o, u
// - Diphthonge: ia, ie, io, iu, ua, ue, uo
// - Hiatus: zwei Vokale = 2 Silben (poeta = 3)
// - GULPEASE verwendet Buchstaben statt Silben!
```

### Spanisch
```typescript
// Besonderheiten:
// - Vokale: a, e, i, o, u (+ Akzente á, é, í, ó, ú)
// - Diphthonge: ai, au, ei, eu, oi, ou, ia, ie, io, iu, ua, ue, uo
// - Hiatus mit Akzent: día = 2 Silben (di-a)
```

### Niederländisch
```typescript
// Besonderheiten:
// - Ähnlich wie Deutsch
// - Vokale: a, e, i, o, u + Doppelvokale aa, ee, oo, uu
// - Diphthonge: ij, ei, ou, au, ui, oe, eu, ie
// - ij zählt als ein Vokal
```

---

## Abkürzungen pro Sprache

### Deutsch (existiert)
~100 Abkürzungen inkl. z.B., d.h., Dr., Prof., etc.

### Englisch
```typescript
const ABBREVIATIONS_EN = {
  'Mr.': 'Mister',
  'Mrs.': 'Missus',
  'Ms.': 'Miss',
  'Dr.': 'Doctor',
  'Prof.': 'Professor',
  'Jr.': 'Junior',
  'Sr.': 'Senior',
  'vs.': 'versus',
  'etc.': 'et cetera',
  'e.g.': 'for example',
  'i.e.': 'that is',
  'Inc.': 'Incorporated',
  'Ltd.': 'Limited',
  'Corp.': 'Corporation',
  'St.': 'Saint',
  'Ave.': 'Avenue',
  'Blvd.': 'Boulevard',
  'approx.': 'approximately',
  'govt.': 'government',
  // ... ~50 weitere
};
```

### Französisch
```typescript
const ABBREVIATIONS_FR = {
  'M.': 'Monsieur',
  'Mme': 'Madame',
  'Mlle': 'Mademoiselle',
  'Dr': 'Docteur',
  'Pr': 'Professeur',
  'Me': 'Maître',
  'etc.': 'et caetera',
  'c.-à-d.': 'c\'est-à-dire',
  'p. ex.': 'par exemple',
  'cf.': 'confer',
  'env.': 'environ',
  'éd.': 'édition',
  'n°': 'numéro',
  'vol.': 'volume',
  'chap.': 'chapitre',
  'fig.': 'figure',
  'apr. J.-C.': 'après Jésus-Christ',
  'av. J.-C.': 'avant Jésus-Christ',
  'MM.': 'Messieurs',
  'Mmes': 'Mesdames',
  // ... ~50 weitere
};
```

### Italienisch
```typescript
const ABBREVIATIONS_IT = {
  'Sig.': 'Signor',
  'Sig.ra': 'Signora',
  'Dott.': 'Dottore',
  'Prof.': 'Professore',
  'Avv.': 'Avvocato',
  'Ing.': 'Ingegnere',
  'Arch.': 'Architetto',
  'ecc.': 'eccetera',
  'es.': 'esempio',
  'pag.': 'pagina',
  'vol.': 'volume',
  'cap.': 'capitolo',
  'fig.': 'figura',
  'n.': 'numero',
  'tel.': 'telefono',
  'c.a.': 'circa',
  // ... ~40 weitere
};
```

### Spanisch
```typescript
const ABBREVIATIONS_ES = {
  'Sr.': 'Señor',
  'Sra.': 'Señora',
  'Srta.': 'Señorita',
  'Dr.': 'Doctor',
  'Dra.': 'Doctora',
  'Prof.': 'Profesor',
  'Lic.': 'Licenciado',
  'Ing.': 'Ingeniero',
  'etc.': 'etcétera',
  'p. ej.': 'por ejemplo',
  'pág.': 'página',
  'vol.': 'volumen',
  'cap.': 'capítulo',
  'fig.': 'figura',
  'núm.': 'número',
  'tel.': 'teléfono',
  'aprox.': 'aproximadamente',
  'Ud.': 'Usted',
  'Uds.': 'Ustedes',
  // ... ~50 weitere
};
```

### Niederländisch
```typescript
const ABBREVIATIONS_NL = {
  'dhr.': 'de heer',
  'mevr.': 'mevrouw',
  'dr.': 'doctor',
  'prof.': 'professor',
  'mr.': 'meester',
  'ing.': 'ingenieur',
  'enz.': 'enzovoort',
  'etc.': 'et cetera',
  'bijv.': 'bijvoorbeeld',
  'd.w.z.': 'dat wil zeggen',
  'n.a.v.': 'naar aanleiding van',
  'o.a.': 'onder andere',
  't.a.v.': 'ter attentie van',
  'i.v.m.': 'in verband met',
  'blz.': 'bladzijde',
  'nr.': 'nummer',
  'tel.': 'telefoon',
  'ca.': 'circa',
  // ... ~50 weitere
};
```

---

## SEO pro Sprache

### Meta-Tags
```html
<!-- Deutsch -->
<html lang="de">
<title>Lesbarkeitstest | Leichtlesbar.ch</title>
<meta name="description" content="Kostenloser Lesbarkeitstest für deutsche Texte...">

<!-- Englisch -->
<html lang="en">
<title>Readability Test | Leichtlesbar.ch</title>
<meta name="description" content="Free readability test for English texts...">

<!-- etc. für alle Sprachen -->
```

### Hreflang-Tags
```html
<link rel="alternate" hreflang="de" href="https://readability.ch/" />
<link rel="alternate" hreflang="en" href="https://readability.ch/en/" />
<link rel="alternate" hreflang="fr" href="https://readability.ch/fr/" />
<link rel="alternate" hreflang="it" href="https://readability.ch/it/" />
<link rel="alternate" hreflang="es" href="https://readability.ch/es/" />
<link rel="alternate" hreflang="nl" href="https://readability.ch/nl/" />
<link rel="alternate" hreflang="x-default" href="https://readability.ch/" />
```

### Sitemap (aktualisiert)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://readability.ch/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://readability.ch/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://readability.ch/en/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://readability.ch/fr/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://readability.ch/it/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://readability.ch/es/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://readability.ch/nl/"/>
    <lastmod>2025-12-06</lastmod>
  </url>
  <!-- Repeat for each language URL -->
</urlset>
```

### JSON-LD pro Sprache
- WebApplication Schema angepasst
- FAQPage Schema übersetzt

---

## Implementierungsreihenfolge

### Phase 1: Refactoring & Infrastruktur
1. [ ] Projektstruktur erstellen (neue Ordner)
2. [ ] i18n-System aufsetzen
3. [ ] `flesch.ts` aufteilen in Module
4. [ ] Gemeinsame Typen definieren
5. [ ] LanguageSwitcher-Komponente erstellen
6. [ ] Layout.astro anpassen (lang, hreflang)

### Phase 2: Englisch (EN)
1. [ ] Englische Silbenzählung implementieren
2. [ ] Englische Abkürzungen hinzufügen
3. [ ] Flesch Reading Ease (Original) aktivieren
4. [ ] SMOG-Formel implementieren
5. [ ] Dale-Chall Wortliste & Formel (optional)
6. [ ] UI-Übersetzungen (en.ts)
7. [ ] Englische Beispieltexte
8. [ ] Englische FAQ
9. [ ] Englische Tipps
10. [ ] `/en/index.astro` erstellen
11. [ ] SEO (Meta, OG, JSON-LD)
12. [ ] Testen

### Phase 3: Französisch (FR)
1. [ ] Französische Silbenzählung implementieren
2. [ ] Französische Abkürzungen hinzufügen
3. [ ] Kandel-Moles Formel implementieren
4. [ ] UI-Übersetzungen (fr.ts)
5. [ ] Französische Beispieltexte
6. [ ] Französische FAQ
7. [ ] Französische Tipps
8. [ ] `/fr/index.astro` erstellen
9. [ ] SEO
10. [ ] Testen

### Phase 4: Italienisch (IT)
1. [ ] Italienische Silbenzählung implementieren
2. [ ] GULPEASE-Formel implementieren (Buchstaben statt Silben!)
3. [ ] Italienische Abkürzungen hinzufügen
4. [ ] UI-Übersetzungen (it.ts)
5. [ ] Italienische Beispieltexte, FAQ, Tipps
6. [ ] `/it/index.astro` erstellen
7. [ ] SEO
8. [ ] Testen

### Phase 5: Spanisch (ES)
1. [ ] Spanische Silbenzählung implementieren
2. [ ] Flesch-Szigriszt (INFLESZ) implementieren
3. [ ] Spanische Abkürzungen hinzufügen
4. [ ] UI-Übersetzungen (es.ts)
5. [ ] Spanische Beispieltexte, FAQ, Tipps
6. [ ] `/es/index.astro` erstellen
7. [ ] SEO
8. [ ] Testen

### Phase 6: Niederländisch (NL) - Optional
1. [ ] Niederländische Silbenzählung implementieren
2. [ ] Flesch-Douma implementieren
3. [ ] Niederländische Abkürzungen hinzufügen
4. [ ] UI-Übersetzungen (nl.ts)
5. [ ] Niederländische Beispieltexte, FAQ, Tipps
6. [ ] `/nl/index.astro` erstellen
7. [ ] SEO
8. [ ] Testen

### Phase 7: Finalisierung
1. [ ] Sitemap aktualisieren
2. [ ] robots.txt prüfen
3. [ ] Alle Sprachen cross-testen
4. [ ] Performance-Check
5. [ ] Dokumentation aktualisieren
6. [ ] Deployment

---

## Geschätzter Aufwand

| Phase | Beschreibung | Komplexität |
|-------|--------------|-------------|
| 1 | Refactoring & Infrastruktur | Mittel |
| 2 | Englisch | Mittel (Originalformeln) |
| 3 | Französisch | Mittel |
| 4 | Italienisch | Hoch (GULPEASE anders) |
| 5 | Spanisch | Mittel |
| 6 | Niederländisch | Niedrig (ähnlich DE) |
| 7 | Finalisierung | Niedrig |

---

## Offene Fragen

1. **Dale-Chall Wortliste**: 3000 Wörter einbinden oder weglassen?
2. **Automatische Spracherkennung**: Browser-Sprache nutzen?
3. **URL-Struktur**: Subdomain (en.readability.ch) oder Pfad (/en/)? → Entschieden: Pfad
4. **Separate OG-Images**: Pro Sprache oder eines für alle?
5. **Domain-Name**: ✅ Entschieden: readability.ch für alle Sprachen

---

## Referenzen

- Wikipedia: Lesbarkeitsindex (DE)
- Wikipedia: Readability (EN)
- Wikipedia: Test de lisibilité (FR)
- Wikipedia: Leesbaarheidstest (NL)
- Flesch, R. (1948). A new readability yardstick.
- Amstad, T. (1978). Wie verständlich sind unsere Zeitungen?
- Kandel, L. & Moles, A. (1958). Application de l'indice de Flesch.
- GULPEASE: Gruppo Universitario Linguistico Pedagogico (1988)
