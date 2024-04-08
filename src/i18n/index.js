import { createI18n } from 'vue-i18n';
import zhLocale from './lang/zh.js';
import enLocale from './lang/en.js';
import { LANG } from '@/constant';
import { getItem } from '@/utils/storage';
import store from '@/store';

const messages = {
  en: enLocale,
  zh: zhLocale
};

function getLanguage() {
  return store && store.getters && store.getters.language;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLanguage(),
  messages
});

export default i18n;
