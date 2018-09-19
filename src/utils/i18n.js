import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

// LANGUAGE FILES
import en_US from "../lang/en_US.json";
import pt_BR from "../lang/pt_BR.json";

i18next.use(LngDetector).init({
  interpolation: {
    escapeValue: false
  },
  lng: "en",
  resources: {
    en: {
      translation: en_US
    },
    pt: {
      translation: pt_BR
    },
    es: {
      translation: en_US
    }
  }
});

export default i18next;
