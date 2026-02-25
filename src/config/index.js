export const config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Portfolio',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Personal Portfolio',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  }
};
