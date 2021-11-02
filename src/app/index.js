import React from 'react';
import { render } from 'react-dom';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import App from './App';

import data_es from "./translations/es/global"
import data_en from "./translations/en/global"

i18next.init({
  interpolation: {escapeValue: false},
  lng:"es",
  resources:{
    es: {
      global: data_es
    },
    en: {
      global: data_en
    }
  }
})

render (
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>
, document.getElementById('app'));