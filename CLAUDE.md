# Leichtlesbar.ch

Webseite zur Messung der Lesbarkeit von Texten mittels Flesch-Formel.

## Tech Stack

- **Framework**: Astro 5.x (Static Site Generation)
- **Styling**: Tailwind CSS 4.x
- **Hosting**: Cloudflare Pages
- **Sprache**: TypeScript (strict mode)

## Projektstruktur

```
src/
├── components/     # Wiederverwendbare Astro/UI-Komponenten
├── layouts/        # Seiten-Layouts
├── pages/          # Astro-Seiten (File-based Routing)
├── styles/         # Globale CSS-Dateien
└── utils/          # TypeScript Utilities (Flesch-Berechnung etc.)
```

## Entwicklung

```bash
npm run dev      # Entwicklungsserver starten
npm run build    # Produktion-Build erstellen
npm run preview  # Produktion-Build lokal testen
```

## Kernfunktionalität

Die Flesch-Lesbarkeitsformel berechnet sich wie folgt:
```
Flesch-Wert = 206.835 - (1.015 × Wörter/Sätze) - (84.6 × Silben/Wörter)
```

### Flesch-Wert Interpretation
- 0-30: Sehr schwer (Akademische Texte)
- 30-50: Schwer (Wissenschaftliche Texte)
- 50-60: Mittelschwer (Qualitätszeitungen)
- 60-70: Mittel (Boulevardzeitungen)
- 70-80: Leicht (Werbetexte)
- 80-90: Sehr leicht (Comics)
- 90-100: Extrem leicht (Grundschulniveau)

## Design-Prinzipien

- Mobile-first responsive Design
- Minimalistisch und benutzerfreundlich
- Barrierefreiheit (WCAG 2.1 AA)
- Deutsche Sprache als Primärsprache

## Cloudflare Pages Deployment

Build-Einstellungen:
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 20.x
