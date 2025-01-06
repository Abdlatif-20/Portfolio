import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EnLang  from "./public/locales/en/en.json";
import FrLang  from "./public/locales/fr/fr.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EnLang,
      },
      fr: {
        translation: FrLang,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;