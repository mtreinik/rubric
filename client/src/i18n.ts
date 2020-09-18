import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationFI from './translations/fi.json'
import translationEN from './translations/en.json'

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
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fi',
    fallbackLng: 'en',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  })
  .then()

export default i18n
