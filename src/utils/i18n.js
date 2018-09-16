import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

// LANGUAGE FILES
import en_US from "../lang/en_US.json";

i18next.use(LngDetector).init({
  interpolation: {
    escapeValue: false
  },
  lng: 'en',
  resources: {
    en: {
      translation: en_US
    },
    pt: {
      translation: en_US
    },
    es: {
      translation: en_US
    }
  }
});

export default i18next;
