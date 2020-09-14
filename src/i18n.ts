import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationFI from './translations/fi.json'
import translationEN from './translations/en.json'

// the translations
const resources = {
  fi: {
    translation: translationFI,
  },
  en: {
    translation: translationEN,
  },
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fi',
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safe from xss
    },
  })

export default i18n
