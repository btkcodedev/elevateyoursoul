import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Supported languages
export const languages = {
  en: { nativeName: 'English' },
  hi: { nativeName: 'हिंदी' },
  bn: { nativeName: 'বাংলা' },
  te: { nativeName: 'తెలుగు' },
  ta: { nativeName: 'தமிழ்' },
  mr: { nativeName: 'मराठी' },
  gu: { nativeName: 'ગુજરાતી' },
  kn: { nativeName: 'ಕನ್ನಡ' },
  ml: { nativeName: 'മലയാളം' },
  pa: { nativeName: 'ਪੰਜਾਬੀ' }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    ns: ['common', 'mental-health', 'exercises'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;