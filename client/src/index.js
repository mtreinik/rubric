import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import App from './App'
import './main.css'

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
