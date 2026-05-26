# Porfolio_CLG

A professional 2D Artist / Concept Artist portfolio built with **React + Vite**.

## Tech Stack

- React 18 + Vite 5
- React Router v6
- CSS Modules
- yet-another-react-lightbox
- Framer Motion
- i18n (EN / TH / JA)

## Project Structure

```
src/
├── assets/
├── components/
│   ├── UI/           # Button, Badge, Tag, Lightbox, ImageViewer, LanguageSwitcher
│   ├── Portfolio/    # WorkCard, FilterBar, WorkGrid
│   └── Shared/       # Navbar, Footer, ProcessSlider
├── sections/         # HeroSection, FeaturedSection, SkillsSection, ...
├── pages/            # Home, Portfolio, ProjectDetail, About, Contact, Resume
├── layouts/          # MainLayout
├── data/             # works.js, skills.js, profile.js
├── hooks/            # useFilter, useLightbox, useScrollReveal
├── i18n/             # EN / TH / JA translations
├── router/
├── styles/
└── utils/
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customisation

- **Profile info** → `src/data/profile.js`
- **Add works**    → `src/data/works.js`
- **Skills**       → `src/data/skills.js`
- **Translations** → `src/i18n/translations/`
