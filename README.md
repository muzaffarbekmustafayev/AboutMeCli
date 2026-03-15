# Muzaffarbek Mustafayev — Portfolio

A personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Fully multilingual (UZ / EN / RU), dark/light theme, and production-ready.

🔗 **Live:** [muzaffarbek.vercel.app](https://muzaffarbek.vercel.app)

---

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Routing | React Router v6 |
| i18n | i18next, react-i18next |
| Animation | Framer Motion |
| Contact | EmailJS |
| Deploy | Vercel |

---

## Features

- 🌐 3 languages — Uzbek, English, Russian (auto-detected by IP)
- 🌗 Dark / Light theme
- 📁 Projects with search & tech filter
- 📜 Certificates gallery with image preview
- 📬 Contact form with EmailJS integration
- ⚡ Lazy loading & code splitting
- 🔍 SEO meta tags per page
- 📱 Fully responsive

---

## Getting Started

```bash
git clone https://github.com/muzaffarbekmustafayev/AboutMeCli.git
cd AboutMeCli
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

VITE_APP_TITLE=Muzaffarbek Mustafayev
VITE_APP_DESCRIPTION=Software Engineer Portfolio
VITE_APP_URL=https://yourwebsite.com
```

> EmailJS is optional — the contact form works in demo mode without it.

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # Theme & Toast contexts
├── data/             # Projects, skills, social links
├── hooks/            # Custom hooks
├── i18n/             # i18next config + locales (uz/en/ru)
├── pages/            # Route pages
└── config/           # App-wide config
```

---

## Customization

| What | Where |
|---|---|
| Projects | `src/data/projects.js` + `src/i18n/locales/*/translation.json` |
| Skills | `src/data/skillsData.js` |
| Social links | `src/data/socialMedias.js` |
| Photo | `src/assets/USER.jpg` |
| CV | `public/cv/Muzaffarbek_Mustafayev_CV.pdf` |
| Certificates | `public/certificates/certificates.json` |

---

## Certificates Setup

Add entries to `public/certificates/certificates.json`:

```json
[
  {
    "id": "cert1",
    "image": "certificate1.jpg",
    "title": "Certificate Title",
    "issuer": "Issuing Organization",
    "date": "2024-01-15"
  }
]
```

Place certificate images in `public/certificates/`.

---

## Deployment

```bash
# Vercel
npm i -g vercel && vercel

# Netlify — upload the dist/ folder after:
npm run build
```

---

## License

MIT © [Muzaffarbek Mustafayev](https://github.com/muzaffarbekmustafayev)
