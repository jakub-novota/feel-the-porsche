"use client"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translate/en.json';
import skTranslation from './translate/sk.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslation,
        },
        sk: {
            translation: skTranslation,
        },
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;
