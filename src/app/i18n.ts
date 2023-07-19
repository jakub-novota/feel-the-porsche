"use client"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translate/en.json'
import skTranslation from './translate/sk.json';
import { setCookie, getCookie } from 'cookies-next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
const resources = {
    en: {
        translation: enTranslation
    },
    es: {
        translation: skTranslation
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        debug: true,
        lng: undefined,
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'navigator'],
            caches: ['cookie'],
            lookupCookie: 'language',
        },
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });


export default i18n;
