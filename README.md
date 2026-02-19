# AboutMeCli

Personal portfolio website built with React + Vite.

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router
- i18next + react-i18next

## Run Locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Multilingual Support
Project uses `i18next` with 3 languages:
- `uz`
- `en`
- `ru`

Main i18n config:
- `src/i18n/index.js`

Translations:
- `src/i18n/locales/uz/translation.json`
- `src/i18n/locales/en/translation.json`
- `src/i18n/locales/ru/translation.json`

## Portfolio Page i18n
`src/pages/Portfolio.jsx` is fully connected to translation keys.

Texts and project content are read from:
- `portfolio.pageTitle`
- `portfolio.pageSubtitle`
- `portfolio.projectLabel`
- `portfolio.github`
- `portfolio.downloadZip`
- `portfolio.liveDemo`
- `portfolio.details`
- `portfolio.close`
- `portfolio.items.<projectId>.*`

Project ids are defined in:
- `src/data/projects.js`

Current localized project ids:
- `jsCompiler`
- `wormGPT`
- `infinityFlower`
