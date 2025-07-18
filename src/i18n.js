import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const assetsPath = document.getElementById('root')?.getAttribute('data-assetsurl');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true, // Enable this to check loading errors
    backend: {
      loadPath: assetsPath + "locales/{{lng}}.json" // Ensure the path is correct
    },
    interpolation: {
      escapeValue: false // React already escapes output
    }
  });

export default i18n;
