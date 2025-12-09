# Readability.ch

Webseite zur Messung der Lesbarkeit von Texten mittels verschiedener Lesbarkeitsformeln.
Online seit 2003, erstellt von Christian Bachmann und Roger Gösele.

## Tech Stack

- **Framework**: Astro 5.x (Static Site Generation)
- **Styling**: Tailwind CSS 4.x
- **Hosting**: Cloudflare Pages
- **Sprache**: TypeScript (strict mode)

## Projektstruktur

```
src/
├── components/     # Wiederverwendbare Astro/UI-Komponenten
│   └── LanguageSwitcher.astro  # Sprachumschalter
├── data/           # Daten und Konstanten
│   ├── abbreviations.ts      # Abkürzungen für Satz-Erkennung
│   └── translations.ts       # Übersetzungen für Formel-Interpretationen
├── i18n/           # Internationalisierung
│   ├── examples/             # Beispieltexte pro Sprache
│   ├── translations/         # UI-Texte pro Sprache
│   └── index.ts              # Typsichere i18n-Funktionen
├── layouts/        # Seiten-Layouts
│   └── Layout.astro          # Basis-Layout mit Navigation, SEO und Dark Mode
├── pages/          # Astro-Seiten (File-based Routing)
│   ├── [lang]/index.astro    # Hauptseiten logik (de, en, fr, etc.)
│   └── index.astro           # Landing Page mit Routing
├── styles/         # Globale CSS-Dateien
│   └── global.css            # Tailwind-Import und Dark Mode Variant
├── types.ts        # TypeScript Typ-Definitionen
└── utils/          # TypeScript Utilities
    └── flesch.ts             # Alle Lesbarkeitsberechnungen

```

## Entwicklung

```bash
npm run dev      # Entwicklungsserver starten
npm run build    # Produktion-Build erstellen
npm run preview  # Produktion-Build lokal testen
```

## Implementierte Lesbarkeitsformeln

### Flesch-Amstad (Deutsche Formel, Hauptmetrik)
Entwickelt von Toni Amstad 1978 für deutsche Texte:
```
FRE = 180 - ASL - (58.5 × ASW)
```
- ASL = durchschnittliche Satzlänge (Wörter pro Satz)
- ASW = durchschnittliche Silben pro Wort

### Flesch-Kincaid Grade Level
US-Schulklassenstufe (J.P. Kincaid, 1975):
```
FKGL = (0.39 × ASL) + (11.8 × ASW) - 15.59
```

### Wiener Sachtextformel
Für deutsche Sachtexte entwickelt (Bamberger & Vanecek, 1984):
```
WSTF = 0.1935 × MS + 0.1672 × SL + 0.1297 × IW - 0.0327 × ES - 0.875
```

### Gunning-Fog-Index
Von Robert Gunning (1952):
```
FOG = 0.4 × (ASL + (komplexe Wörter / Wörter × 100))
```

### LIX Lesbarkeitsindex
Schwedischer Index von Carl-Hugo Björnsson (1968):
```
LIX = (Wörter / Sätze) + (lange Wörter × 100 / Wörter)
```

## Flesch-Wert Interpretation

| Score | Schwierigkeit | Beispiel | Zielgruppe |
|-------|---------------|----------|------------|
| 0-30 | Sehr schwer | Akademische Texte | Akademiker |
| 30-50 | Schwer | Wissenschaftliche Texte | Studenten |
| 50-60 | Mittelschwer | Qualitätszeitungen | 16+ Jahre |
| 60-70 | Mittel | Boulevardzeitungen | 13-15 Jahre |
| 70-80 | Leicht | Werbetexte | 11-12 Jahre |
| 80-90 | Sehr leicht | Comics | 10-11 Jahre |
| 90-100 | Extrem leicht | Grundschulniveau | Unter 10 Jahre |

## Features

- **Echtzeit-Analyse**: Automatische Berechnung während der Texteingabe (debounced, 300ms)
- **Multi-Metrik**: 5 verschiedene Lesbarkeitsindizes
- **Satzanalyse**: Farbliche Markierung einzelner Sätze nach Schwierigkeit (mit Absatzerhaltung)
- **Beispieltexte**: Dropdown mit 3 Schwierigkeitsstufen (leicht/mittel/schwer)
- **URL-Parameter**: Text kann via `?text=...` übergeben werden
- **Dark Mode**: System-Präferenz mit Toggle und localStorage-Persistenz
- **Datenschutz**: Alle Berechnungen erfolgen client-seitig im Browser
- **Responsive**: Mobile-first Design
- **Gauge-Visualisierung**: SVG-Gauge mit Farbverlauf von Rot nach Grün
- **Intelligente Satz-Erkennung**: Über 100 deutsche Abkürzungen (z. B., d. h., Dr., etc.) und Zahlen (3.14, 1.) werden korrekt behandelt

## SEO

- Open Graph und Twitter Card Meta-Tags
- Schema.org JSON-LD (WebApplication, FAQPage)
- Sitemap.xml und robots.txt
- Canonical URL
- FAQ-Sektion für Featured Snippets

## Design-Prinzipien

- Mobile-first responsive Design
- Minimalistisch und benutzerfreundlich
- Barrierefreiheit (WCAG 2.1 AA, ARIA-Labels)
- Deutsche Sprache als Primärsprache
- Client-seitige Verarbeitung (keine Server-Übertragung)
- System-Fonts für optimale Performance

## Cloudflare Pages Deployment

Build-Einstellungen:
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 20.x
