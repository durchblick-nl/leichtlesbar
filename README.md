# Readability.ch

Kostenloser Online-Lesbarkeitstest für Texte in 6 Sprachen. Analysieren Sie die Verständlichkeit Ihrer Texte mit sprachspezifischen Lesbarkeitsformeln.

**Live:** [readability.ch](https://readability.ch)

Online seit 2003. Ein Projekt von Christian Bachmann und Roger Gösele.

## Unterstützte Sprachen

| Sprache | URL | Primäre Formel |
|---------|-----|----------------|
| Deutsch | [/de/](https://readability.ch/de/) | Flesch-Amstad |
| English | [/en/](https://readability.ch/en/) | Flesch Reading Ease |
| Français | [/fr/](https://readability.ch/fr/) | Kandel-Moles |
| Italiano | [/it/](https://readability.ch/it/) | GULPEASE |
| Español | [/es/](https://readability.ch/es/) | INFLESZ |
| Nederlands | [/nl/](https://readability.ch/nl/) | Flesch-Douma |

Die Startseite erkennt automatisch die Browsersprache und leitet entsprechend weiter.

## Features

- **6 Sprachen** – Sprachspezifische Formeln für optimale Analyse
- **Echtzeit-Analyse** – Sofortige Berechnung während der Texteingabe
- **Mehrere Lesbarkeitsindizes** – Je nach Sprache bis zu 5 verschiedene Formeln
- **Satzanalyse** – Farbliche Markierung einzelner Sätze nach Schwierigkeit
- **Beispieltexte** – Vordefinierte Texte in 3 Schwierigkeitsstufen pro Sprache
- **URL-Parameter** – Text via `?text=...` übergeben für Integrationen
- **Datenschutz** – 100% client-seitig, keine Datenübertragung
- **Dark Mode** – Automatische Erkennung der Systemeinstellung
- **Responsive** – Optimiert für Desktop und Mobile

## Sprachspezifische Formeln

### Deutsch
| Formel | Entwickler | Jahr |
|--------|-----------|------|
| Flesch-Amstad | Toni Amstad | 1978 |
| Flesch-Kincaid | J.P. Kincaid | 1975 |
| Wiener Sachtextformel | Bamberger & Vanecek | 1984 |
| Gunning-Fog | Robert Gunning | 1952 |
| LIX | Carl-Hugo Björnsson | 1968 |

### English
| Formula | Developer | Year |
|---------|-----------|------|
| Flesch Reading Ease | Rudolf Flesch | 1948 |
| Flesch-Kincaid Grade | J.P. Kincaid | 1975 |
| SMOG | G. Harry McLaughlin | 1969 |
| Gunning-Fog | Robert Gunning | 1952 |
| LIX | Carl-Hugo Björnsson | 1968 |

### Français
| Formule | Développeur | Année |
|---------|-------------|-------|
| Kandel-Moles | Kandel & Moles | 1958 |
| LIX | Carl-Hugo Björnsson | 1968 |

### Italiano
| Formula | Sviluppatore | Anno |
|---------|--------------|------|
| GULPEASE | Gruppo Universitario Linguistico Pedagogico | 1988 |
| LIX | Carl-Hugo Björnsson | 1968 |

### Español
| Fórmula | Desarrollador | Año |
|---------|---------------|-----|
| INFLESZ | Barrio-Cantalejo | 2008 |
| Flesch-Szigriszt | Szigriszt | 1993 |
| LIX | Carl-Hugo Björnsson | 1968 |

### Nederlands
| Formule | Ontwikkelaar | Jaar |
|---------|--------------|------|
| Flesch-Douma | W.H. Douma | 1960 |
| LIX | Carl-Hugo Björnsson | 1968 |

## Tech Stack

- [Astro](https://astro.build/) 5.x – Static Site Generator
- [Tailwind CSS](https://tailwindcss.com/) 4.x – Utility-first CSS
- TypeScript – Typsicherheit
- Cloudflare Pages – Hosting

## Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktion-Build erstellen
npm run build

# Build lokal testen
npm run preview
```

## Projektstruktur

```
src/
├── components/
│   └── LanguageSwitcher.astro
├── data/
│   ├── abbreviations.ts     # Abkürzungen
│   └── translations.ts      # Logik-Übersetzungen
├── i18n/
│   ├── examples/            # Beispieltexte
│   ├── translations/        # UI-Übersetzungen
│   └── index.ts             # Helper
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro          # Landing Page
│   ├── de/index.astro       # Deutsche Version
│   ├── en/index.astro       # English Version
│   ├── fr/index.astro       # Version française
│   ├── it/index.astro       # Versione italiana
│   ├── es/index.astro       # Versión española
│   └── nl/index.astro       # Nederlandse versie
├── types.ts                 # Type Definitions
└── utils/
    └── flesch.ts            # Algorithmen

```

## SEO

- Open Graph und Twitter Card Meta-Tags
- Schema.org JSON-LD (WebApplication, FAQPage)
- Sitemap.xml mit hreflang-Tags für alle Sprachen
- FAQ-Sektion pro Sprache

## Deployment

Das Projekt ist für Cloudflare Pages konfiguriert:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js version:** 20.x

## Lizenz

MIT

## Autoren

- Christian Bachmann
- Roger Gösele
