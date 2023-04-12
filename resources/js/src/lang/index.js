import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import ptBR from './translations/pt-BR.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'pt-BR',
        interpolation: { escapeValue: false },
        resources: {
            en: { translation: en },
            'pt-BR': { translation: ptBR },
        },
    });

export default i18n;
