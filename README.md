# Leichtlesbar.ch

Kostenloser Online-Lesbarkeitstest für deutsche Texte. Analysieren Sie die Verständlichkeit Ihrer Texte mit der Flesch-Formel und weiteren Lesbarkeitsindizes.

**Live-Demo:** [leichtlesbar.ch](https://leichtlesbar.ch)

## Features

- **Echtzeit-Analyse** - Sofortige Berechnung während der Texteingabe
- **Mehrere Lesbarkeitsindizes** - Flesch-Amstad, Flesch-Kincaid, Wiener Sachtextformel, Gunning-Fog, LIX
- **Satzanalyse** - Farbliche Markierung einzelner Sätze nach Schwierigkeit
- **Datenschutz** - Alle Berechnungen erfolgen lokal im Browser
- **Dark Mode** - Automatische Erkennung der Systemeinstellung
- **Responsive** - Optimiert für Desktop und Mobile

## Implementierte Formeln

| Formel | Entwickler | Jahr | Optimiert für |
|--------|-----------|------|---------------|
| Flesch-Amstad | Toni Amstad | 1978 | Deutsche Texte |
| Flesch-Kincaid | J.P. Kincaid | 1975 | Englische Texte (Schulklasse) |
| Wiener Sachtextformel | Bamberger & Vanecek | 1984 | Deutsche Sachtexte |
| Gunning-Fog | Robert Gunning | 1952 | Englische Texte |
| LIX | Carl-Hugo Björnsson | 1968 | Sprachunabhängig |

## Tech Stack

- [Astro](https://astro.build/) 5.x - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com/) 4.x - Utility-first CSS
- TypeScript - Typsicherheit
- Cloudflare Pages - Hosting

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

## Deployment

Das Projekt ist für Cloudflare Pages konfiguriert:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js version:** 20.x

## Lizenz

MIT
