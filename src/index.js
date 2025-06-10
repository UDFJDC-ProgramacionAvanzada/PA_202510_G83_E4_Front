import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl'; // 👈 Importar IntlProvider
import localeEsMessages from './locales/es.json'; // 👈 Importar español
import localeEnMessages from './locales/en.json'; // 👈 Importar inglés

// 👇 Aquí defines el idioma (puedes usar el navegador o dejarlo fijo)
const userLang = navigator.language || navigator.userLanguage;
const locale = userLang.startsWith('es') ? 'es' : 'en';
const messages = locale === 'es' ? localeEsMessages : localeEnMessages;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

reportWebVitals();
