import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import global_en from './translations/en/global.json';
import global_ar from './translations/ar/global.json';

i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: { global: global_en },
        ar: { global: global_ar }
    }
})

createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
)
