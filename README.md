# AboutMeCli

Personal portfolio website built with React + Vite.

## 🚀 New Features

### ✨ Enhancements Added:
- **Toast Notifications** - Success/error messages
- **Error Boundary** - Graceful error handling
- **Back to Top Button** - Smooth scroll to top
- **SEO Optimization** - Meta tags for all pages
- **Image Modal** - Click to preview certificates
- **Search & Filter** - Portfolio projects filtering
- **Form Validation** - Contact form with EmailJS
- **Custom Hooks** - useLocalStorage, useFetch, useScrollToTop
- **Lazy Loading** - Code splitting for better performance
- **Custom Animations** - Smooth transitions

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router
- i18next + react-i18next
- EmailJS
- Framer Motion

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

### 1. Create `.env` file:
```bash
cp .env.example .env
```

### 2. Configure EmailJS (Optional):
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email service and template
3. Add credentials to `.env`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Update site info in `.env`:
```env
VITE_APP_TITLE=Your Name
VITE_APP_DESCRIPTION=Your Description
VITE_APP_URL=https://yourwebsite.com
```

## 🏃 Run Locally
```bash
npm run dev
```

## 🏗️ Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure
```
src/
├── components/      # Reusable components
│   ├── BackToTop.jsx
│   ├── ErrorBoundary.jsx
│   ├── ImageModal.jsx
│   └── SEO.jsx
├── contexts/        # React contexts
│   ├── ThemeContext.jsx
│   └── ToastContext.jsx
├── hooks/           # Custom hooks
│   ├── useLocalStorage.js
│   ├── useFetch.js
│   └── useScrollToTop.js
├── pages/           # Page components
├── config/          # Configuration
└── data/            # Static data
```

## 🌐 Multilingual Support
Project uses `i18next` with 3 languages:
- `uz` - O'zbek
- `en` - English
- `ru` - Русский

Main i18n config:
- `src/i18n/index.js`

Translations:
- `src/i18n/locales/uz/translation.json`
- `src/i18n/locales/en/translation.json`
- `src/i18n/locales/ru/translation.json`

## 📜 Certificates Setup

Add your certificates to `public/certificates/certificates.json`:

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

Place certificate images in `public/certificates/` folder.

## 🎨 Customization

### Update Personal Info:
- Edit `src/data/socialMedias.js`
- Edit `src/data/projects.js`
- Edit `src/data/skillsData.js`
- Replace `src/assets/USER.jpg` with your photo
- Replace `public/cv/Muzaffarbek_Mustafayev_CV.pdf` with your CV

### Update Contact Info:
Edit email and phone in `src/pages/Contact.jsx`:
```jsx
<a href="mailto:your@email.com">
<a href="tel:+998901234567">
```

## 🚀 Deployment

### Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

### Netlify:
```bash
npm run build
# Upload dist folder to Netlify
```

## 📝 License
MIT

## 👤 Author
Muzaffarbek Mustafayev
