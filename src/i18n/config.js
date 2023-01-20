import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from "./locales/ar/translations.json";
import en from "./locales/en/translations.json";
import LanguageDetector from 'i18next-browser-languagedetector';

const lang = localStorage.getItem("i18nextLng");

i18n
    .use(initReactI18next)
    .use(LanguageDetector) // add selected language in localStorage
    .init({
        fallbackLng: "en",
        lng: lang,
        // language resources
        resources: {
            en: {
                translations: en,
            },
            ar: {
                translations: ar,
            },
        },
        ns: ["translations"],
        defaultNS: "translations",
    });
i18n.languages = ["en", "ar"];

export default i18n;