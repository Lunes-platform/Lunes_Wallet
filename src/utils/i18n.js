import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

// LANGUAGE FILES
import en_US from "../lang/en_US.json";
import pt_BR from "../lang/pt_BR.json";

i18next.use(LngDetector).init({
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: en_US
    },
    "pt-BR": {
      translation: pt_BR
    },
    es: {
      translation: en_US
    }
  }
});

export default i18next;
